import { NextRequest } from "next/server";
import { buildSystemPrompt } from "@/lib/content";
import { checkRateLimit, maybeSweep } from "@/lib/rate-limit";

// Next 16 开启 cacheComponents 后不允许路由段配置（runtime / dynamic / maxDuration），
// 默认即 Node runtime；POST 处理器本身不会被静态缓存。
const API_URL = "https://api.deepseek.com/chat/completions";
const MODEL = process.env.DEEPSEEK_MODEL || "deepseek-chat";

const MAX_TURNS = 12; // 最多带 12 条历史
const MAX_USER_CHARS = 800; // 单条用户输入上限
const MAX_TOTAL_CHARS = 6000; // 全部历史字符上限
const MAX_TOKENS = 700;
const UPSTREAM_TIMEOUT_MS = 45_000;

type ChatMessage = { role: "user" | "assistant"; content: string };

function clientIP(req: NextRequest): string {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  return req.headers.get("x-real-ip") || "local";
}

/** 把历史清洗成模型能接受的最小集合 */
function sanitize(input: unknown): ChatMessage[] {
  if (!Array.isArray(input)) return [];

  const out: ChatMessage[] = [];
  for (const raw of input) {
    if (!raw || typeof raw !== "object") continue;
    const role = (raw as ChatMessage).role;
    const content = (raw as ChatMessage).content;
    if (role !== "user" && role !== "assistant") continue;
    if (typeof content !== "string") continue;

    const text = content.trim().slice(0, MAX_USER_CHARS);
    if (!text) continue;
    out.push({ role, content: text });
  }

  const recent = out.slice(-MAX_TURNS);
  // 从头累加，超总长就丢弃最早的消息
  let total = 0;
  const kept: ChatMessage[] = [];
  for (let i = recent.length - 1; i >= 0; i -= 1) {
    total += recent[i].content.length;
    if (total > MAX_TOTAL_CHARS) break;
    kept.unshift(recent[i]);
  }
  // 必须从 user 开始，避免 assistant 开头
  while (kept.length && kept[0].role !== "user") kept.shift();
  return kept;
}

function jsonError(status: number, message: string, extra?: object) {
  return new Response(JSON.stringify({ error: message, ...extra }), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
}

/** 没有 key 时的降级：吐一段说明，让 UI 链路依然可验证 */
function mockStream(text: string): Response {
  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      for (const ch of text) {
        controller.enqueue(encoder.encode(ch));
        await new Promise((r) => setTimeout(r, 18));
      }
      controller.close();
    },
  });
  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}

export async function POST(req: NextRequest) {
  maybeSweep();

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return jsonError(400, "请求格式不对。");
  }

  const messages = sanitize((body as { messages?: unknown })?.messages);
  if (!messages.length) return jsonError(400, "没有收到有效的问题。");

  // 先校验再计数：无效请求不消耗配额，避免误伤正常访客
  const ip = clientIP(req);
  const rl = checkRateLimit(ip);
  if (!rl.ok) {
    return jsonError(
      429,
      rl.reason === "day"
        ? "今天问得有点多了，明天再来吧。"
        : "说得太快了，等一分钟再试。",
      { retryAfter: rl.retryAfter ?? null },
    );
  }

  const apiKey = process.env.DEEPSEEK_API_KEY;
  if (!apiKey) {
    return mockStream(
      "（演示模式）模型密钥还没配好，所以这条是固定话术。链路本身是通的：你可以看到流式输出、可以中途停止。配好密钥后代码不用改，回答就变成真的了。",
    );
  }

  const abort = new AbortController();
  const timer = setTimeout(() => abort.abort(), UPSTREAM_TIMEOUT_MS);

  let upstream: Response;
  try {
    upstream = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      signal: abort.signal,
      body: JSON.stringify({
        model: MODEL,
        stream: true,
        temperature: 0.6,
        max_tokens: MAX_TOKENS,
        messages: [
          { role: "system", content: buildSystemPrompt() },
          ...messages,
        ],
      }),
    });
  } catch {
    clearTimeout(timer);
    return jsonError(504, "模型响应超时，稍后再试一次。");
  }

  if (!upstream.ok || !upstream.body) {
    clearTimeout(timer);
    // 不把上游原文透给前端，避免泄漏账号信息
    const status = upstream.status;
    if (status === 401 || status === 403)
      return jsonError(502, "模型服务鉴权失败，请联系站长。");
    if (status === 402) return jsonError(502, "模型额度用完了，请联系站长。");
    if (status === 429) return jsonError(429, "模型侧限流了，等一分钟再试。");
    return jsonError(502, "模型服务暂时不可用。");
  }

  const encoder = new TextEncoder();
  const decoder = new TextDecoder();

  const stream = new ReadableStream({
    async start(controller) {
      const reader = upstream.body!.getReader();
      let buffer = "";

      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() || "";

          for (const line of lines) {
            const trimmed = line.trim();
            if (!trimmed.startsWith("data:")) continue;
            const payload = trimmed.slice(5).trim();
            if (!payload || payload === "[DONE]") continue;
            try {
              const parsed = JSON.parse(payload);
              const delta = parsed?.choices?.[0]?.delta?.content;
              if (typeof delta === "string" && delta) {
                controller.enqueue(encoder.encode(delta));
              }
            } catch {
              // 半截 JSON，跳过
            }
          }
        }
      } catch {
        controller.enqueue(
          encoder.encode("\n\n（回答中断了，可能是网络问题，再问一次试试。）"),
        );
      } finally {
        clearTimeout(timer);
        controller.close();
      }
    },
    cancel() {
      clearTimeout(timer);
      abort.abort();
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
      "X-Accel-Buffering": "no",
    },
  });
}

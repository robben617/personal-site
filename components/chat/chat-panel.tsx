"use client";

import { useEffect, useRef, useState } from "react";

type Msg = { role: "user" | "assistant"; content: string };

const SUGGESTIONS = [
  "你做过哪些作品？",
  "为什么用 RRF 融合，而不是加权求和？",
  "Recall@5 0.90 是怎么测出来的？",
  "怎么联系你？",
];

export function ChatPanel() {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [failedQuestion, setFailedQuestion] = useState<string | null>(null);

  const abortRef = useRef<AbortController | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const taRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, error]);

  function grow() {
    const ta = taRef.current;
    if (!ta) return;
    ta.style.height = "auto";
    ta.style.height = `${Math.min(ta.scrollHeight, 132)}px`;
  }

  async function send(text: string) {
    const question = text.trim();
    if (!question || busy) return;

    setError(null);
    setFailedQuestion(null);
    setInput("");
    if (taRef.current) taRef.current.style.height = "auto";

    const history: Msg[] = [
      ...messages,
      { role: "user", content: question.slice(0, 800) },
    ];
    setMessages([...history, { role: "assistant", content: "" }]);
    setBusy(true);

    const ac = new AbortController();
    abortRef.current = ac;

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history }),
        signal: ac.signal,
      });

      if (!res.ok) {
        let msg = "服务暂时不可用，稍后再试。";
        try {
          const data = await res.json();
          if (typeof data?.error === "string") msg = data.error;
        } catch {
          /* 响应体不是 JSON，用默认文案 */
        }
        setError(msg);
        setFailedQuestion(question);
        setMessages(history);
        return;
      }

      const reader = res.body?.getReader();
      if (!reader) throw new Error("no-stream");

      const decoder = new TextDecoder();
      let acc = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        acc += decoder.decode(value, { stream: true });
        setMessages([...history, { role: "assistant", content: acc }]);
      }

      if (!acc.trim()) {
        setError("模型没有返回内容，换个问法试试。");
        setFailedQuestion(question);
        setMessages(history);
      }
    } catch (err) {
      if ((err as Error).name === "AbortError") {
        // 用户主动停止：保留已经生成的部分
        return;
      }
      setError("网络好像断了，再试一次。");
      setFailedQuestion(question);
    } finally {
      setBusy(false);
      abortRef.current = null;
    }
  }

  function stop() {
    abortRef.current?.abort();
    setBusy(false);
  }

  function reset() {
    stop();
    setMessages([]);
    setError(null);
    setFailedQuestion(null);
    setInput("");
  }

  const empty = messages.length === 0;

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div
        ref={scrollRef}
        className="min-h-0 flex-1 overflow-y-auto px-6 lg:px-14"
      >
        {empty ? (
          <div className="flex h-full flex-col justify-center py-4">
            <p className="text-[13px] leading-7 text-ink-2">
              问点什么？比如下面这些。
            </p>
            <div className="mt-4 flex flex-col items-start gap-2">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => send(s)}
                  className="rounded-lg border border-line px-3 py-2 text-left text-[12.5px] text-ink-2 transition-colors hover:border-brand/40 hover:bg-brand-soft/60 hover:text-brand"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-6 pb-6 pt-1">
            {messages.map((m, i) => {
              const isLast = i === messages.length - 1;
              if (m.role === "user") {
                return (
                  <div key={i} className="flex justify-end">
                    <p className="max-w-[85%] whitespace-pre-wrap rounded-2xl rounded-br-md bg-brand px-3.5 py-2 text-[13px] leading-6 text-white">
                      {m.content}
                    </p>
                  </div>
                );
              }
              const streaming = busy && isLast;
              return (
                <div key={i} className="flex gap-2.5">
                  <span className="mt-[7px] flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-brand-soft font-mono text-[9px] font-medium text-brand">
                    AI
                  </span>
                  <div
                    className={`min-w-0 max-w-[94%] whitespace-pre-wrap text-[13.5px] leading-7 text-ink ${
                      streaming ? "typing-caret" : ""
                    }`}
                  >
                    {m.content || (
                      <span className="text-ink-3">正在想…</span>
                    )}
                  </div>
                </div>
              );
            })}

            {error ? (
              <div className="flex flex-wrap items-center gap-3 rounded-lg border border-amber-200 bg-amber-50 px-3.5 py-2.5">
                <p className="text-[12.5px] leading-6 text-amber-900">{error}</p>
                {failedQuestion ? (
                  <button
                    onClick={() => send(failedQuestion)}
                    className="text-[12px] font-medium text-amber-900 underline underline-offset-2 hover:text-amber-700"
                  >
                    重试
                  </button>
                ) : null}
              </div>
            ) : null}
          </div>
        )}
      </div>

      <div className="shrink-0 border-t border-line px-6 pb-5 pt-3 lg:px-14">
        <div className="flex items-end gap-2 rounded-xl border border-line bg-paper p-1.5 transition-colors focus-within:border-brand/50">
          <textarea
            ref={taRef}
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              grow();
            }}
            onKeyDown={(e) => {
              if (
                e.key === "Enter" &&
                !e.shiftKey &&
                !e.nativeEvent.isComposing
              ) {
                e.preventDefault();
                send(input);
              }
            }}
            rows={1}
            maxLength={800}
            placeholder="问点关于他的事…"
            className="max-h-[132px] min-h-[36px] flex-1 resize-none bg-transparent px-2 py-2 text-[13px] leading-6 text-ink outline-none placeholder:text-ink-3"
          />

          {busy ? (
            <button
              onClick={stop}
              className="mb-0.5 shrink-0 rounded-lg border border-line px-3 py-2 text-[12px] text-ink-2 transition-colors hover:border-ink/30 hover:text-ink"
            >
              停止
            </button>
          ) : (
            <button
              onClick={() => send(input)}
              disabled={!input.trim()}
              className="mb-0.5 shrink-0 rounded-lg bg-ink px-3.5 py-2 text-[12px] font-medium text-white transition-opacity disabled:opacity-25"
            >
              发送
            </button>
          )}
        </div>

        <div className="mt-2 flex items-center justify-between gap-3">
          <p className="text-[10.5px] leading-5 text-ink-3">
            回答由模型生成，可能不准确；关键信息以页面内容为准。
          </p>
          {messages.length > 0 ? (
            <button
              onClick={reset}
              className="shrink-0 text-[10.5px] text-ink-3 transition-colors hover:text-ink"
            >
              重新开始
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}

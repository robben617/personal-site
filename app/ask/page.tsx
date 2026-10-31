import type { Metadata } from "next";
import { ChatPanel } from "@/components/chat/chat-panel";

export const metadata: Metadata = {
  title: "AI 分身",
  description: "直接向读过站内资料的个人 AI 分身提问。",
};

export default function AskPage() {
  return (
    <div className="flex h-[calc(100svh-var(--nav-h))] min-h-[500px] flex-col">
      <header className="shrink-0 px-6 pb-4 pt-7 lg:px-14 lg:pb-5 lg:pt-9">
        <div className="mx-auto w-full max-w-[700px]">
          <div className="flex items-center justify-between gap-4">
            <p className="kicker">
              <span className="text-brand/75">05</span>
              <span aria-hidden="true" className="h-px w-3 bg-ink/20" />
              Assistant
            </p>
            <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-ink-3">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-60" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
              </span>
              在线
            </span>
          </div>

          <h1 className="mt-2.5 text-[24px] font-semibold leading-tight tracking-[-0.03em] text-ink lg:text-[28px]">
            AI 分身
          </h1>
          <p className="mt-2 max-w-[52ch] text-[12.5px] leading-6 text-ink-2">
            它读过我的经历、技能和每个作品的技术细节。资料里没有的内容，它会直接说没有。
          </p>
        </div>
      </header>

      <ChatPanel />
    </div>
  );
}

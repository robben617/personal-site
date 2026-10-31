import type { Metadata } from "next";
import { ChatPanel } from "@/components/chat/chat-panel";

export const metadata: Metadata = {
  title: "AI 分身",
  description: "直接向读过站内资料的个人 AI 分身提问。",
};

export default function AskPage() {
  return (
    <div className="flex h-[calc(100svh-var(--nav-h))] min-h-[460px] flex-col">
      <header className="shrink-0 px-6 pb-4 pt-8 lg:px-14 lg:pb-5 lg:pt-10">
        <div className="flex items-center gap-2">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-70" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
          </span>
          <h2 className="text-[14px] font-medium text-ink">AI 分身</h2>
          <span className="text-[11px] text-ink-3">只按站内资料回答</span>
        </div>
        <p className="mt-2 max-w-[520px] text-[12.5px] leading-6 text-ink-2">
          它读过我的经历、技能和每个作品的技术细节。资料里没有的内容，它会直接说没有。
        </p>
      </header>

      <ChatPanel />
    </div>
  );
}

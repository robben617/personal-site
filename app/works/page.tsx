import type { Metadata } from "next";
import { works } from "@/lib/content";
import { WorkCard, AskEntry } from "@/components/work-card";
import { Skills } from "@/components/skills";

export const metadata: Metadata = {
  title: "作品",
  description: "归档的项目：校园制度检索问答系统、电商客服问答，以及进行中的项目。",
};

export default function WorksPage() {
  return (
    <div className="mx-auto w-full max-w-[1180px] px-6 pb-16 pt-10 lg:px-14 lg:pb-24 lg:pt-16">
      <header className="rise">
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-3">
          Works
        </p>
        <div className="mt-2.5 flex items-baseline justify-between gap-4 border-b border-ink/[0.07] pb-4">
          <h1 className="text-[26px] font-semibold tracking-[-0.02em] text-ink lg:text-[32px]">
            作品
          </h1>
          <span className="text-[11px] text-ink-3">共 {works.length} 个</span>
        </div>
      </header>

      {/* 技术栈置顶：先给能力面，再列具体项目 */}
      <Skills />

      <div className="mt-9 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {works.map((work, i) => (
          <WorkCard key={work.slug} work={work} index={i} />
        ))}
      </div>

      <section className="mt-12 lg:mt-14">
        <AskEntry />
      </section>

      <footer className="mt-12 border-t border-ink/[0.07] pt-5">
        <p className="text-[11px] leading-6 text-ink-3">
          本站用 Next.js 构建，AI 分身由 DeepSeek 驱动，回答只基于站内资料。
        </p>
      </footer>
    </div>
  );
}

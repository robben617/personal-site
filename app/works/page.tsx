import type { Metadata } from "next";
import { works } from "@/lib/content";
import { WorkCard, AskEntry } from "@/components/work-card";

export const metadata: Metadata = {
  title: "作品",
  description: "归档的项目：校园制度检索问答系统、电商客服问答，以及进行中的项目。",
};

function RetrievalFlow() {
  return (
    <svg
      viewBox="0 0 320 170"
      fill="none"
      className="h-auto w-full max-w-[300px]"
      role="img"
      aria-label="双路召回、RRF 融合与重排的流程示意"
    >
      <defs>
        <linearGradient id="flowLine" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#818cf8" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.85" />
        </linearGradient>
        <linearGradient id="flowLine2" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#a78bfa" stopOpacity="0.75" />
          <stop offset="100%" stopColor="#818cf8" stopOpacity="0.7" />
        </linearGradient>
      </defs>

      <circle cx="26" cy="40" r="4" fill="#818cf8" />
      <circle cx="26" cy="126" r="4" fill="#a78bfa" />
      <circle cx="26" cy="83" r="2.5" fill="#c7d2fe" opacity="0.7" />

      <path
        d="M32 40 C 74 40, 96 83, 140 83"
        stroke="url(#flowLine)"
        strokeWidth="1.4"
        className="flow-line"
      />
      <path
        d="M32 126 C 74 126, 96 83, 140 83"
        stroke="url(#flowLine2)"
        strokeWidth="1.4"
        className="flow-line"
        style={{ animationDelay: "-1.1s" }}
      />
      <path
        d="M32 83 C 74 83, 96 83, 140 83"
        stroke="#cbd5e1"
        strokeWidth="1.1"
        strokeOpacity="0.55"
        strokeDasharray="3 7"
      />

      <circle cx="146" cy="83" r="6.5" fill="#eef2ff" stroke="#818cf8" strokeWidth="1.3" />
      <circle cx="146" cy="83" r="2.5" fill="#6366f1" className="pulse-node" />

      <path
        d="M153 83 L 196 83"
        stroke="url(#flowLine)"
        strokeWidth="1.6"
        className="flow-line"
        style={{ animationDelay: "-0.6s" }}
      />

      <rect
        x="198"
        y="68"
        width="52"
        height="30"
        rx="7"
        fill="#eef2ff"
        fillOpacity="0.92"
        stroke="#818cf8"
        strokeWidth="1.3"
      />
      <path
        d="M256 83 L 276 83"
        stroke="#22d3ee"
        strokeWidth="1.6"
        className="flow-line"
        style={{ animationDelay: "-0.3s" }}
      />
      <circle cx="284" cy="83" r="5" fill="#22d3ee" opacity="0.9" />
      <circle cx="284" cy="83" r="10" stroke="#22d3ee" strokeOpacity="0.25" strokeWidth="1" />

      <g
        fill="#6b7280"
        fontSize="11.5"
        fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
      >
        <text x="10" y="26">jieba</text>
        <text x="10" y="150">bge</text>
        <text x="200" y="58">RRF</text>
        <text x="264" y="62">rerank</text>
      </g>
    </svg>
  );
}

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

      {/* ============ 检索链路（横向细卡） ============ */}
      <section
        id="chain"
        className="glass mt-6 scroll-mt-[calc(var(--nav-h)+16px)] rounded-2xl px-5 py-4 lg:flex lg:items-center lg:gap-8 lg:py-5"
        style={{ animationDelay: "60ms" }}
      >
        <div className="lg:min-w-0 lg:flex-1">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-3">
            检索链路
          </p>
          <p className="mt-1.5 text-[12.5px] leading-6 text-ink-2 lg:max-w-[430px]">
            jieba 与 BGE 双路召回，RRF 融合后重排，答案带原文出处。
          </p>
        </div>
        <div className="mt-2 shrink-0 lg:mt-0 lg:w-[300px]">
          <RetrievalFlow />
        </div>
      </section>

      <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {works.map((work, i) => (
          <WorkCard key={work.slug} work={work} index={i} />
        ))}
      </div>

      <section className="mt-12 lg:mt-16">
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

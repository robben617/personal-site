import { profile, works, getHeadlineMetrics } from "@/lib/content";
import { WorkCard, AskEntry } from "@/components/work-card";
import { IntroCurtain } from "@/components/intro";

function RetrievalFlow() {
  return (
    <svg
      viewBox="0 0 320 170"
      fill="none"
      className="w-full max-w-[330px]"
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

export default function HomePage() {
  const { tagline, intro } = profile.basics;
  const metrics = getHeadlineMetrics();

  return (
    <>
      <IntroCurtain />

      <div className="px-6 pb-16 pt-10 lg:px-14 lg:pb-24 lg:pt-20">
      <section className="rise">
        <div className="flex items-center gap-3">
          <span className="h-px w-9 bg-[linear-gradient(90deg,#6366f1,transparent)]" />
          <span className="text-[11px] uppercase tracking-[0.24em] text-ink-3">
            Portfolio
          </span>
        </div>

        <div className="mt-5 flex items-start justify-between gap-10">
          <div className="max-w-[560px]">
            <h2 className="text-[28px] font-semibold leading-[1.38] tracking-[-0.025em] text-ink lg:text-[40px]">
              {tagline}
            </h2>
            <p className="mt-5 text-[14px] leading-7 text-ink-2">{intro}</p>
          </div>

          <div className="hidden shrink-0 lg:block">
            <div className="glass rounded-2xl px-5 pb-5 pt-4">
              <p className="mb-1 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-3">
                检索链路
              </p>
              <RetrievalFlow />
            </div>
          </div>
        </div>

        <dl className="mt-9 flex flex-wrap items-end gap-x-14 gap-y-6 border-t border-ink/[0.07] pt-7">
          {metrics.map((m, i) => (
            <div key={m.label}>
              <dd
                className={`font-mono font-medium tabular-nums leading-none ${
                  i === 0
                    ? "grad-text text-[34px] lg:text-[46px]"
                    : "text-[26px] text-ink lg:text-[32px]"
                }`}
              >
                {m.value}
              </dd>
              <dt className="mt-2 text-[11px] tracking-wide text-ink-3">
                {m.label}
              </dt>
            </div>
          ))}
        </dl>
      </section>

      <section className="mt-14 lg:mt-20">
        <div className="flex items-baseline justify-between border-b border-ink/[0.07] pb-3">
          <h2 className="text-[14px] font-medium text-ink">作品</h2>
          <span className="text-[11px] text-ink-3">共 {works.length} 个</span>
        </div>

        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {works.map((work, i) => (
            <WorkCard
              key={work.slug}
              work={work}
              index={i}
              wide={works.length % 2 === 1 && i === works.length - 1}
            />
          ))}
        </div>
      </section>

      <section className="mt-14 lg:mt-20">
        <AskEntry />
      </section>

      <footer className="mt-12 border-t border-ink/[0.07] pt-5">
        <p className="text-[11px] leading-6 text-ink-3">
          本站用 Next.js 构建，AI 分身由 DeepSeek 驱动，回答只基于站内资料。
        </p>
      </footer>
      </div>
    </>
  );
}

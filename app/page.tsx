import Image from "next/image";
import { profile, works, getHeadlineMetrics } from "@/lib/content";
import { WorkCard, AskEntry } from "@/components/work-card";
import { IntroCurtain } from "@/components/intro";

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

export default function HomePage() {
  const { tagline, intro } = profile.basics;
  const metrics = getHeadlineMetrics();

  return (
    <>
      <IntroCurtain />

      {/* ============ 封面 ============ */}
      <section className="relative -mt-[var(--nav-h)] lg:min-h-svh">
        {/*
          窄屏：图片自成一段（62svh），文案落到下方浅色区，
          否则 390px 宽下 3:2 的图只能取到 31% 宽度，文案必然压住插画主体。
          桌面：图片绝对铺满整个首屏，文案压在星空区。
        */}
        <div className="relative h-[62svh] min-h-[360px] w-full overflow-hidden lg:absolute lg:inset-0 lg:h-full lg:min-h-0">
          <Image
            src="/bg-dusk-2560.webp"
            alt=""
            fill
            priority
            sizes="100vw"
            quality={82}
            className="object-cover object-[52%_46%] lg:object-[50%_58%]"
          />
          <div className="hero-scrim" />
          <div className="hero-fade" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-[1180px] px-6 pb-9 pt-7 lg:px-14 lg:pb-28 lg:pt-[calc(var(--nav-h)+72px)]">
          <div className="lg:max-w-[760px]">
            <div className="flex items-center gap-3">
              <span className="h-px w-9 bg-[linear-gradient(90deg,#6366f1,transparent)] lg:bg-[linear-gradient(90deg,#c7d2fe,rgba(199,210,254,0))]" />
              <span className="text-[11px] uppercase tracking-[0.24em] text-ink-3 lg:text-white/60">
                Portfolio
              </span>
            </div>

            <h1 className="mt-4 text-[26px] font-semibold leading-[1.38] tracking-[-0.02em] text-ink lg:mt-5 lg:text-[38px] lg:leading-[1.34] lg:text-white lg:[text-shadow:0_2px_30px_rgba(4,6,20,0.55)]">
              {tagline}
            </h1>

            <p className="mt-4 max-w-[560px] text-[13.5px] leading-7 text-ink-2 lg:mt-5 lg:text-[14px] lg:text-white/75 lg:[text-shadow:0_1px_18px_rgba(4,6,20,0.6)]">
              {intro}
            </p>

            <dl className="mt-7 flex flex-wrap items-end gap-x-12 gap-y-5 border-t border-ink/[0.07] pt-6 lg:mt-9 lg:border-white/[0.18] lg:pt-7">
              {metrics.map((m, i) => (
                <div key={m.label}>
                  <dd
                    className={`font-mono font-medium tabular-nums leading-none ${
                      i === 0
                        ? "grad-text text-[30px] lg:text-[44px]"
                        : "text-[24px] text-ink lg:text-[30px] lg:text-white"
                    }`}
                  >
                    {m.value}
                  </dd>
                  <dt className="mt-2 text-[11px] tracking-wide text-ink-3 lg:text-white/55">
                    {m.label}
                  </dt>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* ============ 检索链路（横向细卡） ============ */}
      <div className="mx-auto w-full max-w-[1180px] px-6 lg:px-14">
        <section
          id="chain"
          className="glass mt-6 scroll-mt-[calc(var(--nav-h)+16px)] rounded-2xl px-5 py-4 lg:-mt-16 lg:flex lg:items-center lg:gap-8 lg:py-5"
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
      </div>

      <div className="mx-auto w-full max-w-[1180px] px-6 pb-16 lg:px-14 lg:pb-24">
        <section className="mt-12 lg:mt-16">
          <div className="flex items-baseline justify-between border-b border-ink/[0.07] pb-3">
            <h2 className="text-[14px] font-medium text-ink">作品</h2>
            <span className="text-[11px] text-ink-3">共 {works.length} 个</span>
          </div>

          <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {works.map((work, i) => (
              <WorkCard key={work.slug} work={work} index={i} />
            ))}
          </div>
        </section>

        <section className="mt-12 lg:mt-16">
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

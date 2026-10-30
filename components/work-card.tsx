import Link from "next/link";
import type { Work } from "@/lib/content";

const BARS = [
  "bg-[linear-gradient(90deg,#6366f1,#22d3ee)]",
  "bg-[linear-gradient(90deg,#a855f7,#ec4899)]",
  "bg-[linear-gradient(90deg,#0ea5e9,#34d399)]",
];

export function WorkCard({
  work,
  index,
  wide = false,
}: {
  work: Work;
  index: number;
  wide?: boolean;
}) {
  const ordinal = String(index + 1).padStart(2, "0");
  const ongoing = work.status !== "已交付";

  const meta = (
    <div className="flex items-start justify-between gap-3">
      <span className="font-mono text-[11px] tabular-nums text-ink-3/70">
        {ordinal}
      </span>
      <div className="flex items-center gap-2">
        {ongoing ? (
          <span className="rounded-full bg-ink/[0.05] px-2 py-0.5 text-[11px] text-ink-2">
            {work.status}
          </span>
        ) : null}
        <span className="text-[11px] text-ink-3">
          {work.year} · {work.role}
        </span>
      </div>
    </div>
  );

  const head = (
    <>
      <h3 className="mt-3 text-[17px] font-semibold leading-7 text-ink">
        {work.title}
      </h3>
      <p className="mt-1.5 text-[13px] leading-6 text-ink-2">{work.oneLiner}</p>

      {work.metrics.length > 0 ? (
        <dl
          className={`mt-4 grid grid-cols-3 gap-2 border-y border-ink/[0.07] py-3 ${
            wide ? "md:max-w-[380px]" : ""
          }`}
        >
          {work.metrics.map((m, i) => (
            <div key={m.label}>
              <dd
                className={`font-mono text-[19px] font-medium tabular-nums ${
                  i === 0 ? "grad-text" : "text-ink"
                }`}
              >
                {m.value}
              </dd>
              <dt className="mt-0.5 text-[11px] text-ink-3">{m.label}</dt>
            </div>
          ))}
        </dl>
      ) : null}
    </>
  );

  const tail = (
    <>
      <ul
        className={`space-y-1.5 ${wide ? "md:grid md:grid-cols-2 md:gap-x-6 md:space-y-0" : ""}`}
      >
        {work.highlights.map((h) => (
          <li
            key={h}
            className="relative pl-3.5 text-[12.5px] leading-6 text-ink-2 before:absolute before:left-0 before:top-[11px] before:h-1 before:w-1 before:rounded-full before:bg-ink-3/50"
          >
            {h}
          </li>
        ))}
      </ul>

      <div className="mt-4 flex flex-wrap items-center gap-1.5">
        {work.stack.map((s) => (
          <span
            key={s}
            className="rounded-md bg-ink/[0.045] px-1.5 py-0.5 font-mono text-[10.5px] text-ink-2"
          >
            {s}
          </span>
        ))}
        {work.links.length > 0 ? (
          <span className="ml-auto flex gap-3">
            {work.links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                target="_blank"
                rel="noreferrer noopener"
                className="text-[12px] text-brand hover:underline"
              >
                {l.label} ↗
              </a>
            ))}
          </span>
        ) : null}
      </div>
    </>
  );

  return (
    <article
      className={`glass glass-hover rise group relative flex flex-col overflow-hidden rounded-2xl p-5 lg:p-6 ${
        wide ? "md:col-span-2" : ""
      }`}
      style={{ animationDelay: `${index * 70}ms` }}
    >
      <div
        aria-hidden="true"
        className={`absolute inset-x-0 top-0 h-[3px] opacity-80 ${
          BARS[index % BARS.length]
        }`}
      />

      {wide ? (
        <div className="md:flex md:items-start md:gap-10">
          <div className="md:w-[44%] md:shrink-0">
            {meta}
            {head}
          </div>
          <div className="mt-4 md:mt-3 md:flex-1">{tail}</div>
        </div>
      ) : (
        <>
          {meta}
          {head}
          <div className="mt-4">{tail}</div>
        </>
      )}
    </article>
  );
}

export function AskEntry() {
  return (
    <Link
      href="/ask"
      className="rise group relative block overflow-hidden rounded-2xl bg-[linear-gradient(135deg,#0d0e14_0%,#15172a_48%,#1b1430_100%)] p-6 text-white shadow-[0_20px_60px_-28px_rgba(24,26,45,0.85)] transition-all duration-300 hover:shadow-[0_28px_70px_-26px_rgba(49,46,129,0.75)] lg:p-8"
      style={{ animationDelay: "240ms" }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.35),transparent)]"
      />
      <div className="relative z-10">
        <div className="flex items-center gap-2">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
          </span>
          <span className="text-[11px] tracking-wide text-white/60">
            在线 · 读过这个站的全部内容
          </span>
        </div>

        <h2 className="mt-4 text-[20px] font-semibold leading-8 lg:text-[23px]">
          有问题直接问它，比翻简历快
        </h2>
        <p className="mt-2 max-w-[460px] text-[13px] leading-6 text-white/65">
          站内有一个 AI 分身，读过我的经历、技能和每个作品的技术细节。它只按资料回答，
          资料里没有的会直接说没有。
        </p>

        <span className="mt-5 inline-flex items-center gap-1.5 rounded-lg bg-white px-3.5 py-2 text-[12.5px] font-medium text-ink transition-transform group-hover:translate-x-0.5">
          开始对话
          <svg
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            aria-hidden="true"
          >
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </span>
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full bg-indigo-500/30 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 right-6 h-44 w-44 rounded-full bg-fuchsia-500/20 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-10 bottom-0 h-40 w-40 rounded-full bg-cyan-400/10 blur-3xl"
      />
    </Link>
  );
}

import Link from "next/link";
import type { Work } from "@/lib/content";

export function WorkCard({ work, index }: { work: Work; index: number }) {
  const ordinal = String(index + 1).padStart(2, "0");
  const ongoing = work.status !== "已交付";

  return (
    <article className="print-avoid-break group relative flex flex-col rounded-xl border border-line bg-paper p-5 transition-all duration-300 hover:border-brand/35 hover:shadow-[0_10px_40px_-24px_rgba(79,70,229,0.45)] lg:p-6">
      <div className="flex items-start justify-between gap-3">
        <span className="font-mono text-[11px] tabular-nums text-ink-3/70">
          {ordinal}
        </span>
        <div className="flex items-center gap-2">
          {ongoing ? (
            <span className="rounded-full bg-canvas px-2 py-0.5 text-[11px] text-ink-2">
              {work.status}
            </span>
          ) : null}
          <span className="text-[11px] text-ink-3">
            {work.year} · {work.role}
          </span>
        </div>
      </div>

      <h3 className="mt-3 text-[17px] font-semibold leading-7 text-ink">
        {work.title}
      </h3>
      <p className="mt-1.5 text-[13px] leading-6 text-ink-2">{work.oneLiner}</p>

      {work.metrics.length > 0 ? (
        <dl className="mt-4 grid grid-cols-3 gap-2 border-y border-line py-3">
          {work.metrics.map((m) => (
            <div key={m.label}>
              <dd className="font-mono text-[17px] font-medium tabular-nums text-ink">
                {m.value}
              </dd>
              <dt className="mt-0.5 text-[11px] text-ink-3">{m.label}</dt>
            </div>
          ))}
        </dl>
      ) : null}

      <ul className="mt-4 space-y-1.5">
        {work.highlights.map((h) => (
          <li
            key={h}
            className="relative pl-3.5 text-[12.5px] leading-6 text-ink-2 before:absolute before:left-0 before:top-[11px] before:h-1 before:w-1 before:rounded-full before:bg-ink-3/50"
          >
            {h}
          </li>
        ))}
      </ul>

      <div className="mt-4 flex flex-wrap gap-1.5 pt-1">
        {work.stack.map((s) => (
          <span
            key={s}
            className="rounded bg-canvas px-1.5 py-0.5 font-mono text-[10.5px] text-ink-2"
          >
            {s}
          </span>
        ))}
      </div>

      {work.links.length > 0 ? (
        <div className="mt-4 flex gap-3 border-t border-line pt-3">
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
        </div>
      ) : null}
    </article>
  );
}

export function AskEntry() {
  return (
    <Link
      href="/ask"
      className="group relative block overflow-hidden rounded-xl bg-ink p-6 text-white transition-all duration-300 hover:shadow-[0_16px_50px_-24px_rgba(22,24,29,0.7)] lg:p-8"
    >
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

        <span className="mt-5 inline-flex items-center gap-1.5 rounded-md bg-white px-3.5 py-2 text-[12.5px] font-medium text-ink transition-transform group-hover:translate-x-0.5">
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
        className="pointer-events-none absolute -right-16 -top-16 h-52 w-52 rounded-full bg-brand/25 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-20 right-4 h-40 w-40 rounded-full bg-brand/10 blur-3xl"
      />
    </Link>
  );
}

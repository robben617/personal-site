import type { Metadata } from "next";
import { profile, works } from "@/lib/content";
import { PrintButton } from "@/components/print-button";

export const metadata: Metadata = {
  title: "简历",
  description: `${profile.basics.name}的线上简历：教育背景、技能栈与作品经历。`,
};

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="print-avoid-break mt-8 border-t border-line pt-5 first:mt-0 first:border-t-0 first:pt-0">
      <h3 className="text-[11px] uppercase tracking-[0.16em] text-ink-3">
        {title}
      </h3>
      <div className="mt-3">{children}</div>
    </section>
  );
}

export default function ResumePage() {
  const b = profile.basics;

  return (
    <div className="px-6 pb-16 pt-10 lg:px-14 lg:pb-24 lg:pt-16">
      <div className="no-print mb-8 flex items-center justify-between">
        <h2 className="text-[14px] font-medium text-ink">线上简历</h2>
        <PrintButton />
      </div>

      <article className="mx-auto max-w-[680px]">
        <header className="print-avoid-break">
          <div className="flex flex-wrap items-baseline gap-x-3">
            <h1 className="text-[26px] font-semibold tracking-tight text-ink">
              {b.name}
            </h1>
            <span className="text-[14px] text-ink-3">{b.alias}</span>
          </div>
          <p className="mt-2 text-[12.5px] leading-6 text-ink-2">
            {b.school} · {b.major} · {b.degree} · {b.graduation} 年毕业
          </p>
          <p className="mt-0.5 text-[12.5px] leading-6 text-ink-2">
            {b.location} ·{" "}
            <a href={`mailto:${b.email}`} className="text-brand hover:underline">
              {b.email}
            </a>{" "}
            ·{" "}
            {b.github ? (
              <a
                href={b.github}
                target="_blank"
                rel="noreferrer noopener"
                className="text-brand hover:underline"
              >
                github.com/robben617
              </a>
            ) : null}
          </p>
        </header>

        <Section title="简介">
          <p className="text-[13px] leading-7 text-ink-2">{b.intro}</p>
        </Section>

        <Section title="教育背景">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <div>
              <p className="text-[13.5px] font-medium text-ink">{b.school}</p>
              <p className="mt-0.5 text-[12.5px] text-ink-2">
                {b.major} · {b.degree}
              </p>
            </div>
            <span className="font-mono text-[11.5px] text-ink-3">
              {b.graduation}
            </span>
          </div>
        </Section>

        <Section title="技能">
          <dl className="space-y-2.5">
            {profile.skills.map((g) => (
              <div key={g.group} className="flex gap-4">
                <dt className="w-[86px] shrink-0 text-[12.5px] text-ink-3">
                  {g.group}
                </dt>
                <dd className="flex flex-wrap gap-x-2 gap-y-1 text-[12.5px] leading-6 text-ink-2">
                  {g.items.map((it, i) => (
                    <span key={it}>
                      {it}
                      {i < g.items.length - 1 ? (
                        <span className="ml-2 text-ink-3/40">/</span>
                      ) : null}
                    </span>
                  ))}
                </dd>
              </div>
            ))}
          </dl>
        </Section>

        <Section title="项目经历">
          <div className="space-y-5">
            {works.map((w) => (
              <div key={w.slug} className="print-avoid-break">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <p className="text-[13.5px] font-medium text-ink">
                    {w.title}
                    <span className="ml-2 text-[11.5px] font-normal text-ink-3">
                      {w.role}
                    </span>
                  </p>
                  <span className="font-mono text-[11.5px] text-ink-3">
                    {w.year}
                  </span>
                </div>
                <p className="mt-1 text-[12.5px] leading-6 text-ink-2">
                  {w.oneLiner}
                </p>
                <ul className="mt-1.5 space-y-0.5">
                  {w.highlights.map((h) => (
                    <li
                      key={h}
                      className="relative pl-3 text-[12.5px] leading-6 text-ink-2 before:absolute before:left-0 before:top-[10px] before:h-1 before:w-1 before:rounded-full before:bg-ink-3/50"
                    >
                      {h}
                    </li>
                  ))}
                </ul>
                <p className="mt-1.5 font-mono text-[11px] text-ink-3">
                  {w.stack.join(" · ")}
                </p>
              </div>
            ))}
          </div>
        </Section>

        {profile.awards.length > 0 ? (
          <Section title="奖项与经历">
            <ul className="space-y-1">
              {profile.awards.map((a) => (
                <li
                  key={a.title}
                  className="flex flex-wrap items-baseline justify-between gap-2 text-[12.5px] text-ink-2"
                >
                  <span>{a.title}</span>
                  <span className="font-mono text-[11.5px] text-ink-3">
                    {a.year}
                  </span>
                </li>
              ))}
            </ul>
          </Section>
        ) : null}

        <p className="no-print mt-10 border-t border-line pt-4 text-[11px] leading-6 text-ink-3">
          这份页面按 A4 排版，用浏览器打印即可导出 PDF。站内还有个 AI
          分身，想追问某个项目的细节可以直接去问它。
        </p>
      </article>
    </div>
  );
}

import { profile, works, getHeadlineMetrics } from "@/lib/content";
import { WorkCard, AskEntry } from "@/components/work-card";

export default function HomePage() {
  const { tagline, intro } = profile.basics;
  const metrics = getHeadlineMetrics();

  return (
    <div className="px-6 pb-16 pt-10 lg:px-14 lg:pb-24 lg:pt-20">
      <section>
        <p className="text-[11px] uppercase tracking-[0.2em] text-ink-3">
          Portfolio
        </p>
        <h2 className="mt-4 max-w-[620px] text-[24px] font-semibold leading-[1.45] tracking-tight text-ink lg:text-[32px]">
          {tagline}
        </h2>
        <p className="mt-5 max-w-[560px] text-[14px] leading-7 text-ink-2">
          {intro}
        </p>

        <dl className="mt-9 flex flex-wrap gap-x-12 gap-y-5 border-t border-line pt-6">
          {metrics.map((m) => (
            <div key={m.label}>
              <dd className="font-mono text-[21px] font-medium tabular-nums text-ink">
                {m.value}
              </dd>
              <dt className="mt-1 text-[11px] text-ink-3">{m.label}</dt>
            </div>
          ))}
        </dl>
      </section>

      <section className="mt-14 lg:mt-20">
        <div className="flex items-baseline justify-between border-b border-line pb-3">
          <h2 className="text-[14px] font-medium text-ink">作品</h2>
          <span className="text-[11px] text-ink-3">共 {works.length} 个</span>
        </div>

        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {works.map((work, i) => (
            <WorkCard key={work.slug} work={work} index={i} />
          ))}
        </div>
      </section>

      <section className="mt-14 lg:mt-20">
        <AskEntry />
      </section>

      <footer className="mt-12 border-t border-line pt-5">
        <p className="text-[11px] leading-6 text-ink-3">
          本站用 Next.js 构建，AI 分身由 DeepSeek 驱动，回答只基于站内资料。
        </p>
      </footer>
    </div>
  );
}

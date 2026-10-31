import { profile } from "@/lib/content";

/** 每组一个色点，跟极光的靛蓝/青/紫三色对应，只是标记，不参与主视觉 */
const ACCENTS = ["#6366f1", "#22d3ee", "#a855f7"];

export function Skills() {
  const groups = profile.skills;
  const total = groups.reduce((n, g) => n + g.items.length, 0);

  return (
    <section className="mt-6" aria-labelledby="skills-title">
      <div className="flex items-baseline justify-between gap-3">
        <h2
          id="skills-title"
          className="flex items-baseline gap-2 text-[13px] font-medium text-ink"
        >
          技术栈
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-3">
            Skills
          </span>
        </h2>
        <span className="text-[11px] text-ink-3">共 {total} 项</span>
      </div>

      <div className="mt-3.5 space-y-2.5 lg:space-y-3">
        {groups.map((group, gi) => (
          <div key={group.group} className="lg:flex lg:items-start lg:gap-6">
            <p className="flex items-center gap-2 text-[12px] font-medium text-ink lg:w-[100px] lg:shrink-0 lg:pt-[20px]">
              <span
                aria-hidden="true"
                className="h-1.5 w-1.5 shrink-0 rounded-full"
                style={{ backgroundColor: ACCENTS[gi % ACCENTS.length] }}
              />
              {group.group}
            </p>

            <ul className="mt-2.5 grid flex-1 grid-cols-3 gap-2 sm:grid-cols-4 lg:mt-0 lg:grid-cols-6">
              {group.items.map((item) => (
                <li
                  key={item}
                  className="flex h-[54px] items-center justify-center rounded-[10px] border border-ink/[0.08] bg-white/70 px-2 text-center text-[11.5px] font-medium leading-[1.35] tracking-[-0.01em] text-ink-2 transition-[transform,border-color,background-color,box-shadow,color] duration-200 hover:border-brand/30 hover:bg-white hover:text-ink hover:shadow-[0_12px_22px_-16px_rgba(49,46,129,0.55)] motion-safe:hover:-translate-y-0.5 lg:h-[58px] lg:text-[12.5px]"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

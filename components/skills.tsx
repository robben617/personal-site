import { profile } from "@/lib/content";

/**
 * 技术栈 = 一张规格表。
 *
 * 以前是 6 列等宽白框 × 3 行，18 个一模一样的小方块，读起来像一份表单，
 * 而且末行总会空一格。现在改成：左侧组名（配一根组色竖条），
 * 右侧标签自然换行——宽度不再被网格强行拉齐，行数由内容决定。
 */
const ACCENTS = ["#6366f1", "#22d3ee", "#a855f7"];

export function Skills() {
  const groups = profile.skills;
  const total = groups.reduce((n, g) => n + g.items.length, 0);

  return (
    <section className="mt-10" aria-labelledby="skills-title">
      <div className="flex items-baseline justify-between gap-4">
        <h2
          id="skills-title"
          className="flex items-baseline gap-2.5 text-[13px] font-medium tracking-tight text-ink"
        >
          技术栈
          <span className="font-mono text-[9.5px] uppercase tracking-[0.22em] text-ink-3">
            Skills
          </span>
        </h2>
        <span className="font-mono text-[10.5px] tabular-nums tracking-wide text-ink-3">
          {total} 项 / 3 组
        </span>
      </div>

      <ul className="mt-4 divide-y divide-ink/[0.07] border-y border-ink/[0.07]">
        {groups.map((group, gi) => (
          <li
            key={group.group}
            className="flex flex-col gap-2.5 py-3.5 sm:flex-row sm:items-start sm:gap-7 sm:py-4"
          >
            <p className="flex shrink-0 items-center gap-2.5 sm:w-[108px] sm:pt-[3px]">
              <span
                aria-hidden="true"
                className="h-[11px] w-[2px] rounded-full"
                style={{ backgroundColor: ACCENTS[gi % ACCENTS.length] }}
              />
              <span className="text-[12px] font-medium tracking-tight text-ink">
                {group.group}
              </span>
            </p>

            <ul className="flex flex-1 flex-wrap gap-1.5">
              {group.items.map((item) => (
                <li key={item} className="chip">
                  {item}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </section>
  );
}

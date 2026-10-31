/**
 * 内页统一头部。
 *
 * 之前四个页面各写各的：作品/博客是 kicker + 大标题，简历是"线上简历 + 打印按钮"，
 * AI 分身是一颗绿点。放在一起像三个人做的。这里收成一套：
 *   眉标 + 右侧 meta  →  主标题 + 右侧操作  →  发丝线
 * 序号直接复用顶部导航的 01–05，让"封面—导航—内页"是同一套编号。
 */
export function PageHeader({
  no,
  kicker,
  title,
  meta,
  desc,
  aside,
  as: Heading = "h1",
}: {
  no: string;
  kicker: string;
  title: string;
  /** 挂在眉标行右侧的当前状态，例如「共 3 个」「A4 · 可导出 PDF」 */
  meta?: React.ReactNode;
  desc?: React.ReactNode;
  /** 挂在标题行右侧的操作，例如打印按钮 */
  aside?: React.ReactNode;
  /** 简历页正文里已有姓名做 h1，这里降一级避免一页两个 h1 */
  as?: "h1" | "h2";
}) {
  return (
    <header className="rise">
      <div className="flex items-center justify-between gap-4">
        <p className="kicker">
          <span className="text-brand/75">{no}</span>
          <span aria-hidden="true" className="h-px w-3 bg-ink/20" />
          {kicker}
        </p>
        {meta ? (
          <span className="shrink-0 font-mono text-[10.5px] tabular-nums tracking-[0.08em] text-ink-3">
            {meta}
          </span>
        ) : null}
      </div>

      <div className="mt-3.5 flex flex-wrap items-end justify-between gap-x-6 gap-y-3">
        <Heading className="page-h">{title}</Heading>
        {aside ? <div className="shrink-0 pb-1">{aside}</div> : null}
      </div>

      {desc ? (
        <p className="mt-3 max-w-[56ch] text-[13px] leading-7 text-ink-2">
          {desc}
        </p>
      ) : null}

      <div className="rule mt-5 lg:mt-6" />
    </header>
  );
}

/** 四页共用的页脚：换页时位置与文案都不跳 */
export function PageFooter({ note }: { note?: string }) {
  return (
    <footer className="mt-14 border-t border-ink/[0.07] pt-5">
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
        <p className="max-w-[46ch] text-[11px] leading-6 text-ink-3">
          {note ??
            "本站用 Next.js 构建，AI 分身由 DeepSeek 驱动，回答只基于站内资料。"}
        </p>
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-3/70">
          Dong Hao / Robben · 2026
        </p>
      </div>
    </footer>
  );
}

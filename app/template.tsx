/**
 * 路由级转场：每次换页内容轻微上浮淡入。
 * 只动 opacity / transform，不触发重排；reduced-motion 下直接不动。
 * 放在 template 而不是 layout，是因为 template 会在每次导航时重新挂载，
 * layout 只在首次挂载——放 layout 里就只播一次了。
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-enter">{children}</div>;
}

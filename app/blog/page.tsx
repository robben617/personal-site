import type { Metadata } from "next";
import Link from "next/link";
import { posts } from "@/lib/content";

export const metadata: Metadata = {
  title: "个人博客",
  description: "关于检索、大模型接入与工程实践的技术笔记。",
};

export default function BlogPage() {
  return (
    <div className="mx-auto w-full max-w-[1180px] px-6 pb-16 pt-10 lg:px-14 lg:pb-24 lg:pt-16">
      <header className="rise">
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-3">
          Notes
        </p>
        <div className="mt-2.5 flex items-baseline justify-between gap-4 border-b border-ink/[0.07] pb-4">
          <h1 className="text-[26px] font-semibold tracking-[-0.02em] text-ink lg:text-[32px]">
            个人博客
          </h1>
          <span className="text-[11px] text-ink-3">
            {posts.length > 0 ? `共 ${posts.length} 篇` : "整理中"}
          </span>
        </div>
      </header>

      {posts.length > 0 ? (
        <ul className="mt-2">
          {posts.map((post) => (
            <li
              key={post.slug}
              className="border-b border-ink/[0.07] py-5 transition-colors hover:border-ink/15"
            >
              <div className="flex items-baseline gap-4">
                <time
                  dateTime={post.date}
                  className="w-[74px] shrink-0 font-mono text-[11px] tabular-nums text-ink-3"
                >
                  {post.date.replace(/-/g, ".")}
                </time>
                <div className="min-w-0">
                  <h2 className="text-[15px] font-medium leading-6 tracking-[-0.01em] text-ink">
                    {post.title}
                  </h2>
                  <p className="mt-1.5 text-[12.5px] leading-6 text-ink-2">
                    {post.summary}
                  </p>
                  {post.tags.length > 0 ? (
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-md bg-ink/[0.04] px-1.5 py-0.5 text-[10.5px] text-ink-3"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  ) : null}
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        /* 空状态：还没写文章时，别让页面变成一个死胡同 */
        <section className="mt-8 rounded-2xl border border-dashed border-ink/[0.14] px-6 py-14 text-center">
          <p className="text-[13.5px] font-medium text-ink">还没有发布文章</p>
          <p className="mx-auto mt-2 max-w-[36ch] text-[12px] leading-6 text-ink-2">
            正在把项目里的技术细节整理成笔记。这之前，作品页有结构化说明，AI 分身也能直接回答。
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2.5">
            <Link
              href="/works"
              className="rounded-full bg-ink px-4 py-1.5 text-[12px] font-medium text-white transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
            >
              看作品
            </Link>
            <Link
              href="/ask"
              className="rounded-full border border-ink/[0.12] px-4 py-1.5 text-[12px] font-medium text-ink-2 transition-colors hover:border-ink/25 hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
            >
              问 AI 分身
            </Link>
          </div>
        </section>
      )}
    </div>
  );
}

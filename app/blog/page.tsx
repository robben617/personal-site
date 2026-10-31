import type { Metadata } from "next";
import Link from "next/link";
import { posts } from "@/lib/content";
import { PageHeader, PageFooter } from "@/components/page-header";

export const metadata: Metadata = {
  title: "个人博客",
  description: "关于检索、大模型接入与工程实践的技术笔记。",
};

/**
 * 还没写正文时，不摆一个大虚线框了事——那会把整页变成死胡同。
 * 改成一张"选题计划"：写清这个栏目要写什么、先写哪三篇，
 * 读者知道会看到什么，页面也有内容可看。
 */
const PLANNED = [
  {
    title: "为什么用 RRF 融合，而不是加权求和",
    tags: ["检索", "融合排序"],
    note: "两路召回的分数量纲不同，加权求和的权重几乎不可解释。",
  },
  {
    title: "自建 55 题评测集：Recall@5 0.90 是怎么测出来的",
    tags: ["评测", "方法论"],
    note: "题目怎么出、什么算命中、每次改动怎么判断有没有白改。",
  },
  {
    title: "客服问答里，为什么不让模型兜底食品安全问题",
    tags: ["工程", "边界"],
    note: "命中关键词直接转人工，是产品决策而不是技术妥协。",
  },
];

export default function BlogPage() {
  return (
    <div className="mx-auto w-full max-w-[1180px] px-6 pb-16 pt-10 lg:px-14 lg:pb-24 lg:pt-14">
      <PageHeader
        no="04"
        kicker="Notes"
        title="个人博客"
        meta={posts.length > 0 ? `共 ${posts.length} 篇` : "0 篇 / 整理中"}
      />

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
        <>
          <p className="mt-7 max-w-[54ch] text-[13px] leading-7 text-ink-2">
            这个栏目放检索与大模型的工程笔记：踩过的坑、做过的取舍、以及那些
            只有自己写过一遍才知道的细节。
          </p>

          <div className="mt-8 flex items-baseline justify-between gap-4">
            <h2 className="flex items-baseline gap-2.5 text-[13px] font-medium tracking-tight text-ink">
              待发布
              <span className="font-mono text-[9.5px] uppercase tracking-[0.22em] text-ink-3">
                Upcoming
              </span>
            </h2>
            <span className="font-mono text-[10.5px] tabular-nums text-ink-3">
              {PLANNED.length} 篇
            </span>
          </div>

          <ul className="mt-4 border-t border-ink/[0.07]">
            {PLANNED.map((p, i) => (
              <li
                key={p.title}
                className="group flex flex-col gap-2 border-b border-ink/[0.07] py-4 sm:flex-row sm:items-baseline sm:gap-5"
              >
                <span className="shrink-0 font-mono text-[10.5px] tabular-nums tracking-[0.16em] text-ink-3/80 sm:w-7 sm:pt-1">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <h3 className="text-[14.5px] font-medium leading-6 tracking-[-0.01em] text-ink">
                      {p.title}
                    </h3>
                    <span className="flex gap-1.5">
                      {p.tags.map((t) => (
                        <span
                          key={t}
                          className="rounded-md bg-ink/[0.04] px-1.5 py-0.5 text-[10px] text-ink-3"
                        >
                          {t}
                        </span>
                      ))}
                    </span>
                  </div>
                  <p className="mt-1 text-[12.5px] leading-6 text-ink-2">
                    {p.note}
                  </p>
                </div>
                <span className="shrink-0 self-start rounded-full border border-dashed border-ink/15 px-2 py-[3px] font-mono text-[9.5px] uppercase tracking-[0.12em] text-ink-3 sm:mt-0.5">
                  计划中
                </span>
              </li>
            ))}
          </ul>

          {/* 空栏目也得给出下一步，而不是让读者停在这里 */}
          <div className="mt-8 flex flex-wrap items-center gap-2.5">
            <Link
              href="/works"
              className="rounded-full bg-ink px-4 py-1.5 text-[12px] font-medium text-white transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
            >
              先看作品
            </Link>
            <Link
              href="/ask"
              className="rounded-full border border-ink/[0.12] px-4 py-1.5 text-[12px] font-medium text-ink-2 transition-colors hover:border-ink/25 hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
            >
              直接问 AI 分身
            </Link>
            <span className="text-[11.5px] text-ink-3">
              想先听哪个？问 AI 分身，它可以展开讲。
            </span>
          </div>
        </>
      )}

      <PageFooter />
    </div>
  );
}

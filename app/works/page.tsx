import type { Metadata } from "next";
import { works } from "@/lib/content";
import { WorkCard, AskEntry } from "@/components/work-card";
import { Skills } from "@/components/skills";
import { PageHeader, PageFooter } from "@/components/page-header";

export const metadata: Metadata = {
  title: "作品",
  description: "归档的项目：校园制度检索问答系统、电商客服问答，以及进行中的项目。",
};

export default function WorksPage() {
  return (
    <div className="mx-auto w-full max-w-[1180px] px-6 pb-16 pt-10 lg:px-14 lg:pb-24 lg:pt-14">
      <PageHeader
        no="02"
        kicker="Works"
        title="作品"
        meta={`共 ${works.length} 个`}
      />

      {/* 技术栈置顶：先给能力面，再列具体项目 */}
      <Skills />

      <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {works.map((work, i) => (
          <WorkCard key={work.slug} work={work} index={i} />
        ))}
      </div>

      <section className="mt-12 lg:mt-14">
        <AskEntry />
      </section>

      <PageFooter />
    </div>
  );
}

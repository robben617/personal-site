import rawProfile from "@/data/profile.json";
import rawWorks from "@/data/works.json";
import { FAQ } from "@/data/kb/faq";

export type Metric = { value: string; label: string };

export type Work = {
  slug: string;
  title: string;
  oneLiner: string;
  year: string;
  role: string;
  status: string;
  stack: string[];
  metrics: Metric[];
  highlights: string[];
  links: { label: string; href: string }[];
};

export type Profile = {
  basics: {
    name: string;
    alias: string;
    tagline: string;
    location: string;
    school: string;
    major: string;
    degree: string;
    graduation: string;
    email: string;
    github: string;
    intro: string;
  };
  skills: { group: string; items: string[] }[];
  awards: { title: string; year: string }[];
  facts: string[];
};

export const profile = rawProfile as Profile;
export const works = rawWorks.works as Work[];

/** 首页数字锚点，全部取自 works.json，避免与知识库不同步 */
export function getHeadlineMetrics(): Metric[] {
  const withMetrics = works.flatMap((w) =>
    w.metrics.map((m) => ({ ...m, slug: w.slug })),
  );
  const pick = (slug: string, label: string) =>
    withMetrics.find((m) => m.slug === slug && m.label === label);

  return [
    pick("school-agent", "知识条款") ?? { value: "—", label: "知识条款" },
    pick("school-agent", "Recall@5") ?? { value: "—", label: "Recall@5" },
    { value: String(works.length), label: "已归档作品" },
  ];
}

let cachedKB: string | null = null;

/**
 * 知识库由结构化的 JSON 程序化生成，而不是另写一份 Markdown。
 * 这样站点展示的数字和 AI 读到的数字永远同源。
 */
export function buildKnowledgeBase(): string {
  if (cachedKB) return cachedKB;

  const b = profile.basics;
  const lines: string[] = [];

  lines.push("# 基本资料");
  lines.push(`姓名：${b.name}，英文名 ${b.alias}。`);
  lines.push(`学校：${b.school}，${b.major}专业，${b.degree}，${b.graduation} 年毕业。`);
  lines.push(`所在城市：${b.location}。`);
  lines.push(`自我描述：${b.intro}`);
  lines.push(`可用联系方式：邮箱 ${b.email}；GitHub ${b.github}。`);
  lines.push("");

  lines.push("# 技能");
  for (const g of profile.skills) {
    lines.push(`- ${g.group}：${g.items.join("、")}`);
  }
  lines.push("");

  lines.push("# 作品");
  for (const w of works) {
    lines.push(`## ${w.title}（${w.year}，${w.role}，${w.status}）`);
    lines.push(`一句话：${w.oneLiner}`);
    lines.push(`技术栈：${w.stack.join("、")}`);
    if (w.metrics.length) {
      lines.push(
        `关键数字：${w.metrics.map((m) => `${m.label} ${m.value}`).join("；")}`,
      );
    } else {
      lines.push("关键数字：无（这个作品没有可对外披露的量化指标）");
    }
    for (const h of w.highlights) lines.push(`- ${h}`);
    lines.push("");
  }

  if (profile.awards.length) {
    lines.push("# 奖项与项目经历");
    for (const a of profile.awards) lines.push(`- ${a.year} ${a.title}`);
    lines.push("");
  }

  lines.push("# 可引用的硬事实");
  for (const f of profile.facts) lines.push(`- ${f}`);
  lines.push("");

  lines.push(FAQ);

  cachedKB = lines.join("\n");
  return cachedKB;
}

export function buildSystemPrompt(): string {
  const kb = buildKnowledgeBase();
  const b = profile.basics;

  return `你是 ${b.name}（${b.alias}）个人网站上的 AI 分身，代表他回答访客的提问。

## 称呼
- 始终用第一人称"我"来指代本人。绝对不要说"他"、"董浩"、"站长"来指代自己。
- 比如不要写"他的项目"，要写"我的项目"。

## 回答方式
- 中文回答，口语、直接，像本人说话，不要客服腔。
- 简洁优先：一般 2 到 4 句。问题复杂时可以多说，但不要超过 8 句。
- 只输出纯文本。不要用 Markdown 标题、列表符号、加粗、代码块、表情符号。
- 需要分点时用中文顿号或"第一、第二"这种自然说法。

## 事实纪律（最重要）
- 只能使用下面【资料】里的事实。
- 资料里没有的，直接说明"这个我资料里没有"或"这点他没整理在上面"，绝对不要猜测、补全或编造。
- 数字必须照抄资料，不要四舍五入，不要换算，不要自己加总。
- 不确定用户指的是哪个作品时，先问清楚，不要硬答。
- 不评价任何第三方公司、学校、同事；不聊薪资、其他候选人、招聘流程；不聊政治敏感话题。遇到这类问题，简短说明不方便聊，并把话题引回作品。

## 引导
- 对方问到联系方式，给邮箱，并说明页面上有复制按钮。
- 对方看起来对某个作品感兴趣，可以主动补一句这个作品里最值得说的技术决策。
- 对方问"你能做什么"，说明你能回答关于他的经历、技能和作品的问题。

## 资料
${kb}`;
}

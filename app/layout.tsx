import type { Metadata } from "next";
import "./globals.css";
import { Sidebar } from "@/components/sidebar";
import { profile } from "@/lib/content";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
const { name, alias, tagline } = profile.basics;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${name} ${alias} · 作品集`,
    template: `%s · ${name} ${alias}`,
  },
  description: `${name}（${alias}）的个人作品集与线上简历。站内内置一个读过本人资料的 AI 分身，可以直接向它提问。`,
  keywords: [name, alias, "作品集", "个人网站", "检索增强", "RAG", "校园知识问答"],
  authors: [{ name, url: SITE_URL }],
  creator: name,
  openGraph: {
    type: "website",
    locale: "zh_CN",
    url: SITE_URL,
    siteName: `${name} ${alias}`,
    title: `${name} ${alias} · 作品集`,
    description: tagline,
  },
  twitter: {
    card: "summary_large_image",
    title: `${name} ${alias} · 作品集`,
    description: tagline,
  },
  robots: { index: true, follow: true },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name,
  alternateName: alias,
  description: tagline,
  url: SITE_URL,
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: profile.basics.school,
  },
  knowsAbout: profile.skills.flatMap((g) => g.items),
  sameAs: [profile.basics.github].filter(Boolean),
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="zh-CN" className="h-full antialiased">
      <body className="min-h-full">
        {/*
          片头开关：必须在 body 内容解析之前同步执行。
          默认不加 data-intro = 片头不显示；任何一步失败都退化成"没有片头"。
          用 sessionStorage 而非 localStorage：同标签页只播一次，
          换设备/重开浏览器仍会播，评委在自己的机器上能正常看到。
        */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){
  try{
    if(!/^\\/?$/.test(location.pathname)) return;
    if(window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if(sessionStorage.getItem('wb-intro')==='1') return;
    sessionStorage.setItem('wb-intro','1');
    document.documentElement.setAttribute('data-intro','on');
  }catch(e){}
})();`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <div className="mx-auto w-full max-w-[1180px] lg:flex">
          <Sidebar
            name={name}
            alias={alias}
            tagline={tagline}
            email={profile.basics.email}
            github={profile.basics.github}
          />
          <main className="min-w-0 flex-1 lg:h-dvh lg:overflow-y-auto">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}

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

"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

type Props = {
  name: string;
  alias: string;
  tagline: string;
  email: string;
  github: string;
};

const NAV = [
  { href: "/", label: "作品", no: "01" },
  { href: "/resume", label: "简历", no: "02" },
  { href: "/ask", label: "AI 分身", no: "03" },
];

export function Sidebar({ name, alias, tagline, email, github }: Props) {
  const pathname = usePathname();
  const [copied, setCopied] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  }

  return (
    <aside className="flex shrink-0 flex-col justify-between gap-6 border-b border-ink/[0.07] px-6 py-7 lg:sticky lg:top-0 lg:h-dvh lg:w-[300px] lg:gap-0 lg:border-b-0 lg:border-r lg:px-9 lg:py-12">
      <div>
        <div className="flex items-center gap-3.5 lg:flex-col lg:items-start lg:gap-5">
          <div className="avatar-ring h-11 w-11 shrink-0 rounded-full shadow-[0_6px_18px_-6px_rgba(99,102,241,0.55)] lg:h-[58px] lg:w-[58px]">
            <Image
              src="/avatar.jpg"
              alt={name}
              width={116}
              height={116}
              className="h-full w-full rounded-full object-cover"
            />
          </div>

          <Link href="/" className="group inline-block">
            <div className="flex items-baseline gap-2">
              <h1 className="text-[22px] font-semibold tracking-tight text-ink transition-colors group-hover:text-brand">
                {name}
              </h1>
              <span className="text-[13px] text-ink-3">{alias}</span>
            </div>
          </Link>
        </div>

        <p className="mt-3 max-w-[240px] text-[13px] leading-6 text-ink-2 lg:mt-5">
          {tagline}
        </p>

        <nav className="mt-6 lg:mt-11">
          <ul className="flex gap-1 overflow-x-auto lg:flex-col lg:gap-0">
            {NAV.map((item) => {
              const active = isActive(item.href);
              return (
                <li key={item.href} className="shrink-0">
                  <Link
                    href={item.href}
                    className={`group flex items-center gap-3 rounded-md px-3 py-2 text-[13px] transition-colors lg:px-0 lg:py-2.5 ${
                      active
                        ? "bg-brand-soft text-brand lg:bg-transparent"
                        : "text-ink-3 hover:text-ink"
                    }`}
                  >
                    <span
                      className={`font-mono text-[11px] tabular-nums ${
                        active ? "text-brand" : "text-ink-3/70"
                      }`}
                    >
                      {item.no}
                    </span>
                    <span className="lg:hidden">{item.label}</span>
                    <span className="hidden items-center gap-3 lg:flex">
                      <span
                        className={`h-px transition-all duration-300 ${
                          active
                            ? "w-6 bg-brand shadow-[0_0_8px_rgba(79,70,229,0.65)]"
                            : "w-3 bg-ink-3/40 group-hover:w-6"
                        }`}
                      />
                      <span className={active ? "font-medium" : ""}>
                        {item.label}
                      </span>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      <div className="flex items-center gap-3 lg:flex-col lg:items-start lg:gap-3">
        {email ? (
          <button
            onClick={copyEmail}
            className="glass glass-hover inline-flex items-center gap-2 rounded-lg px-3 py-2 text-[12px] text-ink-2"
            title={email}
          >
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="m2 7 10 6 10-6" />
            </svg>
            {copied ? "已复制" : "复制邮箱"}
          </button>
        ) : null}

        {github ? (
          <a
            href={github}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center gap-2 text-[12px] text-ink-3 transition-colors hover:text-ink"
          >
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M12 .5a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1-.7 0-.7 0-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.4 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-6 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0C17.3 4.7 18.3 5 18.3 5c.6 1.7.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.7-2.8 5.7-5.5 6 .4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .5Z" />
            </svg>
            GitHub
          </a>
        ) : null}
      </div>
    </aside>
  );
}

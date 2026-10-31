"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

type Props = {
  name: string;
  alias: string;
  email: string;
  github: string;
};

const NAV: { href: string; label: string; short?: string; no: string }[] = [
  { href: "/", label: "首页", no: "01" },
  { href: "/works", label: "作品", no: "02" },
  { href: "/resume", label: "简历", no: "03" },
  { href: "/blog", label: "个人博客", short: "博客", no: "04" },
  { href: "/ask", label: "AI 分身", no: "05" },
];

export function TopNav({ name, email, github }: Props) {
  const pathname = usePathname();
  const [copied, setCopied] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const isHome = pathname === "/";

  useEffect(() => {
    if (!isHome) {
      setScrolled(true);
      return;
    }
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  /* 深色文字模式：非首页，或首页已经滚过首屏顶部 */
  const onLight = !isHome || scrolled;

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
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-[background-color,box-shadow,backdrop-filter] duration-300 ${
        onLight
          ? "border-b border-ink/[0.07] bg-canvas/80 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-[var(--nav-h)] max-w-[1180px] items-center gap-4 px-6 lg:px-14">
        <Link
          href="/"
          className="group flex shrink-0 items-center rounded-full focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
          aria-label={`${name} · 首页`}
        >
          {/* 左上角只留头像当 logo：名字放在首页正中间 */}
          <span className="avatar-ring h-8 w-8 rounded-full transition-transform duration-300 group-hover:scale-[1.06] sm:h-9 sm:w-9">
            <Image
              src="/avatar.jpg"
              alt=""
              width={64}
              height={64}
              priority
              className="h-full w-full rounded-full object-cover"
            />
          </span>
        </Link>

        <nav aria-label="主导航" className="ml-auto">
          <ul className="flex items-center gap-0.5 sm:gap-1">
            {NAV.map((item) => {
              const active = isActive(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`flex items-center gap-1.5 rounded-full px-2 py-1.5 text-[12px] max-[360px]:px-1.5 sm:px-3 sm:text-[12.5px] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand ${
                      active
                        ? onLight
                          ? "bg-brand-soft font-medium text-brand"
                          : "bg-white/14 font-medium text-white"
                        : onLight
                          ? "text-ink-3 hover:text-ink"
                          : "text-white/60 hover:text-white"
                    }`}
                  >
                    <span
                      className={`hidden font-mono text-[10.5px] tabular-nums sm:inline ${
                        active ? "opacity-70" : "opacity-45"
                      }`}
                    >
                      {item.no}
                    </span>
                    {item.short ? (
                      <>
                        <span className="sm:hidden">{item.short}</span>
                        <span className="hidden sm:inline">{item.label}</span>
                      </>
                    ) : (
                      item.label
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div
          className={`hidden shrink-0 items-center gap-1 border-l pl-2 sm:flex ${
            onLight ? "border-ink/[0.08]" : "border-white/15"
          }`}
        >
          {email ? (
            <button
              onClick={copyEmail}
              title={email}
              aria-label={copied ? "邮箱已复制" : "复制邮箱"}
              className={`grid h-8 w-8 place-items-center rounded-full transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand ${
                onLight
                  ? "text-ink-3 hover:bg-ink/[0.05] hover:text-ink"
                  : "text-white/65 hover:bg-white/12 hover:text-white"
              }`}
            >
              {copied ? (
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              ) : (
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  aria-hidden="true"
                >
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="m2 7 10 6 10-6" />
                </svg>
              )}
            </button>
          ) : null}

          {github ? (
            <a
              href={github}
              target="_blank"
              rel="noreferrer noopener"
              aria-label="GitHub"
              className={`grid h-8 w-8 place-items-center rounded-full transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand ${
                onLight
                  ? "text-ink-3 hover:bg-ink/[0.05] hover:text-ink"
                  : "text-white/65 hover:bg-white/12 hover:text-white"
              }`}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M12 .5a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1-.7 0-.7 0-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.4 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-6 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0C17.3 4.7 18.3 5 18.3 5c.6 1.7.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.7-2.8 5.7-5.5 6 .4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .5Z" />
              </svg>
            </a>
          ) : null}
        </div>
      </div>
    </header>
  );
}

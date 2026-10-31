import Image from "next/image";
import { profile } from "@/lib/content";
import { IntroCurtain } from "@/components/intro";

/**
 * 首页 = 纯封面。
 *
 * 刻意不写任何介绍、学校、专业、联系方式：
 * 这一版只做视觉，名字是唯一的主角。
 * 作品在 /works，简历在 /resume，AI 在 /ask。
 */
export default function HomePage() {
  const { name, alias } = profile.basics;

  return (
    <>
      <IntroCurtain />

      <section
        className="relative -mt-[var(--nav-h)] flex min-h-svh items-center justify-center overflow-hidden"
        aria-label="封面"
      >
        <Image
          src="/bg-dusk-2560.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          quality={82}
          className="cover-img object-cover object-[54%_40%]"
        />
        <div className="cover-scrim" />

        {/* 上下细线：给封面一个"画框"，避免只剩一张照片 */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-[calc(var(--nav-h)+18px)] mx-auto hidden h-px max-w-[1180px] bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.16),transparent)] lg:block"
        />

        <div className="relative z-10 flex w-full -translate-y-[5vh] flex-col items-center px-6 text-center lg:-translate-y-[9vh]">
          <p className="cover-kicker">Portfolio · 2026</p>

          <h1 className="cover-name mt-6 lg:mt-7">
            {Array.from(name).map((c, i) => (
              <span key={`${c}-${i}`}>{c}</span>
            ))}
          </h1>

          <p className="cover-alias mt-5">{alias}</p>
        </div>

        {/* 版面角标：像一本册子的版权页，只放真实信息，不做装饰性填充 */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-6 bottom-7 flex items-end justify-between font-mono text-[9.5px] uppercase tracking-[0.24em] text-white/38 lg:inset-x-14 lg:bottom-9"
        >
          <span className="flex items-center gap-2">
            <span className="h-2.5 w-px bg-white/30" />
            Nanjing, CN
          </span>
          <span>2026</span>
        </div>
      </section>
    </>
  );
}

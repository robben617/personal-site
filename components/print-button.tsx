"use client";

export function PrintButton() {
  return (
    <button
      onClick={() => window.print()}
      className="glass glass-hover inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[12px] text-ink-2"
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
        <path d="M6 9V2h12v7M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
        <rect x="6" y="14" width="12" height="8" />
      </svg>
      打印 / 存为 PDF
    </button>
  );
}

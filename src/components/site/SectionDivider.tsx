export function SectionDivider({ className = "" }: { className?: string }) {
  return (
    <div
      className={`flex items-center justify-center gap-4 py-2 text-[color:var(--gold)] ${className}`}
      aria-hidden
    >
      <span className="h-px w-16 bg-current opacity-40 sm:w-24" />
      <svg
        width="46"
        height="14"
        viewBox="0 0 46 14"
        fill="none"
        className="opacity-90"
      >
        <path
          d="M1 7h10M35 7h10M23 1l3.5 6L23 13l-3.5-6L23 1z"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="14.5" cy="7" r="1" fill="currentColor" />
        <circle cx="31.5" cy="7" r="1" fill="currentColor" />
      </svg>
      <span className="h-px w-16 bg-current opacity-40 sm:w-24" />
    </div>
  );
}

export function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-center gap-3 text-[11px] font-medium uppercase tracking-[0.28em] text-[color:var(--gold)]">
      <span className="h-px w-8 bg-current opacity-60" />
      <span>{children}</span>
      <span className="h-px w-8 bg-current opacity-60" />
    </div>
  );
}

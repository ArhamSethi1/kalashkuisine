/**
 * Traditional Rajasthani-inspired border — a horizontal band of repeating
 * jharokha arches with paisley motifs, rendered as an inline SVG so it
 * scales crisply and picks up brand colors via currentColor.
 */
export function RajasthaniBorder({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`relative w-full text-[color:var(--gold)] ${className}`}
    >
      {/* twin hairlines */}
      <div className="mx-auto h-px w-full max-w-6xl bg-gradient-to-r from-transparent via-current to-transparent opacity-40" />
      <div className="relative mx-auto flex h-14 max-w-6xl items-center justify-center overflow-hidden">
        <svg
          viewBox="0 0 1200 56"
          preserveAspectRatio="xMidYMid meet"
          className="h-full w-full"
        >
          <defs>
            <pattern
              id="raj-arch"
              x="0"
              y="0"
              width="80"
              height="56"
              patternUnits="userSpaceOnUse"
            >
              {/* arch */}
              <path
                d="M8 44 C 8 22, 32 12, 40 12 C 48 12, 72 22, 72 44"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.1"
                strokeLinecap="round"
              />
              {/* inner arch */}
              <path
                d="M16 44 C 16 28, 32 20, 40 20 C 48 20, 64 28, 64 44"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.8"
                opacity="0.7"
              />
              {/* finial drop */}
              <circle cx="40" cy="9" r="1.6" fill="currentColor" />
              <path
                d="M40 11 v4"
                stroke="currentColor"
                strokeWidth="0.8"
                strokeLinecap="round"
              />
              {/* paisley between arches */}
              <path
                d="M80 44 c -3 -6, -8 -6, -8 0"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.8"
                opacity="0.55"
              />
              {/* base dots */}
              <circle cx="8" cy="44" r="1.2" fill="currentColor" />
              <circle cx="72" cy="44" r="1.2" fill="currentColor" />
              <circle cx="40" cy="44" r="1.6" fill="currentColor" />
            </pattern>
          </defs>
          <rect width="1200" height="56" fill="url(#raj-arch)" />
        </svg>
        {/* center medallion */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <svg width="46" height="46" viewBox="0 0 46 46" className="text-[color:var(--primary)]">
            <circle cx="23" cy="23" r="9" fill="none" stroke="currentColor" strokeWidth="1.1" />
            <circle cx="23" cy="23" r="4" fill="currentColor" opacity="0.9" />
            <g stroke="currentColor" strokeWidth="0.9" strokeLinecap="round">
              <path d="M23 4 v6" />
              <path d="M23 36 v6" />
              <path d="M4 23 h6" />
              <path d="M36 23 h6" />
            </g>
          </svg>
        </div>
        {/* fade edges to blend into cream bg */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[color:var(--background)] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[color:var(--background)] to-transparent" />
      </div>
      <div className="mx-auto h-px w-full max-w-6xl bg-gradient-to-r from-transparent via-current to-transparent opacity-40" />
    </div>
  );
}

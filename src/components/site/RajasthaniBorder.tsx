import { useReveal } from "@/hooks/useReveal";

/**
 * Traditional Rajasthani border — a richly ornamented band inspired by
 * jharokha arches, mango (keri) paisleys, lotus finials and toran hangings
 * seen in Jaipur/Udaipur haveli architecture. Expands from its center when
 * scrolled into view.
 */
export function RajasthaniBorder({ className = "" }: { className?: string }) {
  const { ref, visible } = useReveal<HTMLDivElement>(0.2);

  return (
    <div
      ref={ref}
      aria-hidden
      className={`relative w-full py-6 text-[color:var(--gold)] ${className}`}
    >
      {/* twin hairlines with diamond punctuation */}
      <div
        className={`relative mx-auto flex max-w-6xl items-center ${visible ? "raj-expand" : "opacity-0"}`}
      >
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-current to-current opacity-70" />
        <svg viewBox="0 0 12 12" className="mx-1 h-2.5 w-2.5">
          <path d="M6 0 L12 6 L6 12 L0 6 Z" fill="currentColor" />
        </svg>
        <div className="h-px flex-1 bg-current opacity-70" />
        <svg viewBox="0 0 12 12" className="mx-1 h-2.5 w-2.5">
          <path d="M6 0 L12 6 L6 12 L0 6 Z" fill="currentColor" />
        </svg>
        <div className="h-px flex-1 bg-gradient-to-l from-transparent via-current to-current opacity-70" />
      </div>

      {/* ornamental band */}
      <div
        className={`relative mx-auto mt-3 flex h-20 max-w-6xl items-center justify-center overflow-hidden ${visible ? "raj-expand" : "opacity-0"}`}
        style={{ animationDelay: visible ? "120ms" : undefined }}
      >
        <svg
          viewBox="0 0 1200 80"
          preserveAspectRatio="xMidYMid meet"
          className="h-full w-full"
        >
          <defs>
            {/* Repeating jharokha + mango unit */}
            <pattern
              id="raj-jharokha"
              x="0"
              y="0"
              width="120"
              height="80"
              patternUnits="userSpaceOnUse"
            >
              {/* base scallop line */}
              <path
                d="M0 66 Q 15 58 30 66 T 60 66 T 90 66 T 120 66"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.9"
                opacity="0.75"
              />

              {/* main cusped arch (jharokha) */}
              <path
                d="M20 62
                   C 20 46, 28 40, 32 44
                   C 34 40, 38 36, 42 40
                   C 46 36, 50 36, 52 40
                   C 56 36, 60 40, 60 44
                   C 60 40, 64 36, 68 40
                   C 70 36, 74 36, 78 40
                   C 82 36, 86 40, 88 44
                   C 92 40, 100 46, 100 62"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.1"
                strokeLinejoin="round"
              />
              {/* inner cusped arch */}
              <path
                d="M30 62
                   C 30 50, 36 46, 40 48
                   C 44 44, 48 44, 52 48
                   C 56 44, 60 44, 60 48
                   C 60 44, 64 44, 68 48
                   C 72 44, 76 44, 80 48
                   C 84 46, 90 50, 90 62"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.7"
                opacity="0.6"
              />

              {/* lotus finial + drop */}
              <path
                d="M60 20 Q 56 26 60 30 Q 64 26 60 20 Z"
                fill="currentColor"
                opacity="0.9"
              />
              <path
                d="M60 30 v10"
                stroke="currentColor"
                strokeWidth="0.8"
                strokeLinecap="round"
              />
              <circle cx="60" cy="42" r="1.6" fill="currentColor" />

              {/* mango (keri) paisleys flanking the arch */}
              <path
                d="M10 60 C 4 54, 4 46, 10 44 C 16 44, 18 52, 14 58 C 12 60, 11 60, 10 60 Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.9"
                opacity="0.75"
              />
              <circle cx="10" cy="52" r="1" fill="currentColor" opacity="0.7" />
              <path
                d="M110 60 C 116 54, 116 46, 110 44 C 104 44, 102 52, 106 58 C 108 60, 109 60, 110 60 Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.9"
                opacity="0.75"
              />
              <circle cx="110" cy="52" r="1" fill="currentColor" opacity="0.7" />

              {/* hanging toran beads under scallop */}
              <circle cx="15" cy="72" r="1" fill="currentColor" opacity="0.8" />
              <circle cx="30" cy="74" r="1.3" fill="currentColor" opacity="0.85" />
              <circle cx="45" cy="72" r="1" fill="currentColor" opacity="0.8" />
              <circle cx="60" cy="74" r="1.5" fill="currentColor" />
              <circle cx="75" cy="72" r="1" fill="currentColor" opacity="0.8" />
              <circle cx="90" cy="74" r="1.3" fill="currentColor" opacity="0.85" />
              <circle cx="105" cy="72" r="1" fill="currentColor" opacity="0.8" />

              {/* tiny dots decorating the arch base */}
              <circle cx="20" cy="62" r="1.1" fill="currentColor" />
              <circle cx="100" cy="62" r="1.1" fill="currentColor" />
            </pattern>
          </defs>

          <rect width="1200" height="80" fill="url(#raj-jharokha)" />
        </svg>

        {/* center lotus medallion */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <svg
            viewBox="0 0 72 72"
            className={`h-16 w-16 text-[color:var(--primary)] ${visible ? "raj-bloom" : "opacity-0"}`}
            style={{ animationDelay: visible ? "260ms" : undefined }}
          >
            {/* outer petal ring */}
            <g fill="currentColor" opacity="0.9">
              {Array.from({ length: 12 }).map((_, i) => (
                <ellipse
                  key={i}
                  cx="36"
                  cy="12"
                  rx="2.6"
                  ry="8"
                  transform={`rotate(${i * 30} 36 36)`}
                />
              ))}
            </g>
            {/* inner ring */}
            <circle
              cx="36"
              cy="36"
              r="11"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
            />
            <circle cx="36" cy="36" r="6.5" fill="currentColor" />
            <circle cx="36" cy="36" r="2.4" fill="var(--cream, #f7efe0)" />
          </svg>
        </div>

        {/* fade edges to blend into cream bg */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[color:var(--background)] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[color:var(--background)] to-transparent" />
      </div>

      {/* bottom twin hairlines */}
      <div
        className={`relative mx-auto mt-3 flex max-w-6xl items-center ${visible ? "raj-expand" : "opacity-0"}`}
        style={{ animationDelay: visible ? "200ms" : undefined }}
      >
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-current to-current opacity-70" />
        <svg viewBox="0 0 12 12" className="mx-1 h-2 w-2">
          <path d="M6 0 L12 6 L6 12 L0 6 Z" fill="currentColor" />
        </svg>
        <div className="h-px flex-1 bg-gradient-to-l from-transparent via-current to-current opacity-70" />
      </div>
    </div>
  );
}

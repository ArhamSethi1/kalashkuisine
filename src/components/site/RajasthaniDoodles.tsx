/**
 * Decorative Rajasthani doodles — subtle maroon silhouettes of an elephant,
 * peacock, and royal motifs, absolutely positioned. Desktop-only (lg+) so
 * they don't crowd mobile layouts. Purely aesthetic; aria-hidden.
 */

export function ElephantDoodle({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 140"
      aria-hidden
      className={className}
      fill="currentColor"
    >
      {/* Ornate caparisoned elephant silhouette */}
      <path d="M40 100 c 0 -28, 22 -46, 52 -46 c 24 0, 42 12, 50 30 l 14 0 c 6 0, 10 4, 10 10 l 0 8 l -8 0 l 0 -4 l -10 0 c -2 8, -8 14, -18 14 l -4 0 l 0 12 l -8 0 l 0 -12 l -50 0 l 0 12 l -8 0 l 0 -12 c -12 -2, -20 -6, -20 -12 z" />
      {/* howdah on top */}
      <path d="M78 54 l 30 0 l -4 -10 l -22 0 z" />
      <circle cx="93" cy="40" r="2.5" />
      {/* trunk */}
      <path d="M148 88 c 8 4, 14 12, 12 22 c -2 6, -8 8, -12 4 c -3 -3, -3 -8, 0 -12" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
      {/* tusk */}
      <path d="M150 96 l 10 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      {/* eye */}
      <circle cx="138" cy="80" r="1.6" fill="var(--cream)" />
      {/* decorative anklets */}
      <circle cx="70" cy="118" r="4" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="120" cy="118" r="4" fill="none" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export function PeacockDoodle({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 180 200"
      aria-hidden
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* body */}
      <path d="M90 60 c -6 0, -10 6, -10 12 c 0 8, 6 14, 10 14 c 4 0, 10 -6, 10 -14 c 0 -6, -4 -12, -10 -12 z" fill="currentColor" />
      {/* crown */}
      <path d="M86 56 l -2 -8 M90 54 l 0 -10 M94 56 l 2 -8" />
      <circle cx="84" cy="46" r="1.4" fill="currentColor" />
      <circle cx="90" cy="42" r="1.4" fill="currentColor" />
      <circle cx="96" cy="46" r="1.4" fill="currentColor" />
      {/* neck */}
      <path d="M90 86 c -4 20, -4 40, -20 70" />
      <path d="M90 86 c 4 20, 4 40, 20 70" />
      {/* fan feathers */}
      {[0, 1, 2, 3, 4, 5, 6].map((i) => {
        const angle = -70 + i * 24;
        const rad = (angle * Math.PI) / 180;
        const x = 90 + Math.sin(rad) * 80;
        const y = 90 - Math.cos(rad) * 80;
        return (
          <g key={i}>
            <path d={`M90 90 Q ${(90 + x) / 2 + Math.cos(rad) * 8} ${(90 + y) / 2}, ${x} ${y}`} />
            <circle cx={x} cy={y} r="4" fill="currentColor" opacity="0.35" />
            <circle cx={x} cy={y} r="1.6" fill="currentColor" />
          </g>
        );
      })}
    </svg>
  );
}

export function PaisleyDoodle({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 160" aria-hidden className={className} fill="currentColor">
      <path d="M60 8 c 30 20, 44 50, 32 82 c -10 26, -34 40, -56 34 c -18 -5, -28 -22, -22 -40 c 5 -14, 22 -20, 34 -12 c 8 5, 10 16, 4 22 c -4 4, -12 4, -14 -2 c -1 -3, 1 -6, 4 -6" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <circle cx="60" cy="24" r="2" />
      <circle cx="72" cy="40" r="1.6" />
      <circle cx="80" cy="60" r="1.4" />
    </svg>
  );
}

/**
 * Decorative Rajasthani doodles — hand-drawn maroon silhouettes inspired by
 * haveli murals: caparisoned elephants, dancing peacocks, mango paisleys,
 * lotus mandalas, camels and jharokha windows. Purely aesthetic; aria-hidden.
 * `currentColor` — parent sets the maroon tone via text color.
 */

type DoodleProps = { className?: string };

/* ---------- Elephant with howdah ---------- */
export function ElephantDoodle({ className = "" }: DoodleProps) {
  return (
    <svg viewBox="0 0 240 180" aria-hidden className={className} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      {/* body */}
      <path d="M40 130 c 0 -38, 30 -60, 70 -60 c 32 0, 56 16, 66 40 l 22 0 c 8 0, 14 6, 14 14 l 0 10 l -12 0 l 0 -6 l -14 0 c -2 12, -12 18, -24 18 l -6 0 l 0 18 l -12 0 l 0 -18 l -66 0 l 0 18 l -12 0 l 0 -18 c -16 -2, -26 -8, -26 -16 z" fill="currentColor" fillOpacity="0.85" />
      {/* howdah */}
      <path d="M92 70 l 44 0 l -6 -16 l -32 0 z" fill="currentColor" />
      <path d="M108 54 l 0 -10 M120 54 l 0 -10" />
      <circle cx="114" cy="42" r="3" fill="currentColor" />
      {/* trunk */}
      <path d="M188 118 c 12 6, 20 18, 16 32 c -4 10, -14 12, -18 4 c -3 -6, 0 -12, 6 -14" strokeWidth="4" />
      {/* tusk */}
      <path d="M190 128 l 14 8" strokeWidth="2.5" />
      {/* eye */}
      <circle cx="176" cy="104" r="2.2" fill="currentColor" />
      {/* caparison patterns */}
      <path d="M70 96 l 90 0" strokeDasharray="4 4" opacity="0.55" />
      <path d="M70 108 q 8 -6 16 0 t 16 0 t 16 0 t 16 0 t 16 0" opacity="0.6" />
      {/* anklets */}
      <circle cx="80" cy="154" r="5" />
      <circle cx="144" cy="154" r="5" />
      {/* tail */}
      <path d="M40 118 c -8 4, -12 12, -6 18" />
    </svg>
  );
}

/* ---------- Peacock with fanned tail ---------- */
export function PeacockDoodle({ className = "" }: DoodleProps) {
  return (
    <svg viewBox="0 0 220 240" aria-hidden className={className} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      {/* body */}
      <ellipse cx="110" cy="88" rx="14" ry="18" fill="currentColor" />
      {/* head + beak */}
      <circle cx="110" cy="62" r="9" fill="currentColor" />
      <path d="M118 60 l 10 -2 l -10 4 z" fill="currentColor" />
      {/* crown */}
      <path d="M104 54 l -3 -12 M110 52 l 0 -14 M116 54 l 3 -12" />
      <circle cx="101" cy="40" r="2" fill="currentColor" />
      <circle cx="110" cy="36" r="2" fill="currentColor" />
      <circle cx="119" cy="40" r="2" fill="currentColor" />
      {/* legs */}
      <path d="M104 106 l -6 30 M116 106 l 6 30" />
      {/* fan feathers */}
      {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => {
        const angle = -80 + i * 20;
        const rad = (angle * Math.PI) / 180;
        const x = 110 + Math.sin(rad) * 96;
        const y = 100 - Math.cos(rad) * 96;
        const cx = 110 + Math.sin(rad) * 60;
        const cy = 100 - Math.cos(rad) * 60;
        return (
          <g key={i}>
            <path d={`M110 106 Q ${cx} ${cy}, ${x} ${y}`} />
            <ellipse cx={x} cy={y} rx="7" ry="10" transform={`rotate(${angle} ${x} ${y})`} fill="currentColor" fillOpacity="0.25" />
            <circle cx={x} cy={y} r="3" fill="currentColor" />
            <circle cx={x} cy={y} r="1.2" fill="var(--cream, #f7efe0)" />
          </g>
        );
      })}
    </svg>
  );
}

/* ---------- Mango paisley (Keri) ---------- */
export function PaisleyDoodle({ className = "" }: DoodleProps) {
  return (
    <svg viewBox="0 0 140 180" aria-hidden className={className} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M70 10 c 40 22, 56 62, 40 100 c -14 32, -46 46, -72 36 c -22 -8, -30 -32, -18 -50 c 10 -14, 30 -18, 42 -6 c 8 8, 8 22, -2 28 c -8 4, -18 0, -18 -8" />
      <path d="M70 24 c 26 18, 38 46, 28 76" opacity="0.6" />
      <path d="M70 40 c 18 14, 26 34, 20 56" opacity="0.4" />
      <circle cx="70" cy="20" r="3" fill="currentColor" />
      <circle cx="86" cy="46" r="2" fill="currentColor" />
      <circle cx="94" cy="68" r="1.6" fill="currentColor" />
      {/* petal base */}
      <path d="M46 158 q 24 -10 48 0" opacity="0.5" />
    </svg>
  );
}

/* ---------- Lotus mandala ---------- */
export function LotusDoodle({ className = "" }: DoodleProps) {
  return (
    <svg viewBox="0 0 200 200" aria-hidden className={className} fill="currentColor">
      {Array.from({ length: 16 }).map((_, i) => (
        <ellipse
          key={`o-${i}`}
          cx="100"
          cy="30"
          rx="6"
          ry="26"
          transform={`rotate(${i * 22.5} 100 100)`}
          opacity="0.7"
        />
      ))}
      {Array.from({ length: 12 }).map((_, i) => (
        <ellipse
          key={`i-${i}`}
          cx="100"
          cy="58"
          rx="5"
          ry="18"
          transform={`rotate(${i * 30} 100 100)`}
          opacity="0.9"
        />
      ))}
      <circle cx="100" cy="100" r="18" />
      <circle cx="100" cy="100" r="8" fill="var(--cream, #f7efe0)" />
      <circle cx="100" cy="100" r="3" />
    </svg>
  );
}

/* ---------- Camel silhouette ---------- */
export function CamelDoodle({ className = "" }: DoodleProps) {
  return (
    <svg viewBox="0 0 240 180" aria-hidden className={className} fill="currentColor">
      <path d="M30 130 c 6 -8, 6 -20, 4 -30 c -2 -8, 6 -12, 12 -6 c 4 4, 6 10, 8 16 c 4 -8, 12 -18, 22 -22 c 2 -18, 20 -30, 34 -22 c 6 -14, 22 -22, 34 -14 c 6 -12, 22 -16, 32 -6 c 12 -2, 24 8, 20 22 l -4 8 c 6 4, 6 14, -2 16 c -4 1, -8 -2, -10 -6 c -6 4, -14 4, -20 0 c -8 6, -22 8, -30 2 l -4 22 l 12 0 l 0 18 l -14 0 l 0 -14 l -50 0 l 0 14 l -14 0 l 0 -18 l 8 0 l 4 -18 c -14 -2, -24 -8, -32 -18 c -4 4, -12 6, -18 4 z" fillOpacity="0.85" />
      <circle cx="188" cy="52" r="2" fill="var(--cream, #f7efe0)" />
      {/* saddle detail */}
      <path d="M96 78 l 44 0" stroke="var(--cream, #f7efe0)" strokeWidth="1.4" strokeDasharray="3 3" fill="none" opacity="0.7" />
    </svg>
  );
}

/* ---------- Jharokha (cusped window) ---------- */
export function JharokhaDoodle({ className = "" }: DoodleProps) {
  return (
    <svg viewBox="0 0 160 220" aria-hidden className={className} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      {/* frame */}
      <rect x="14" y="60" width="132" height="150" rx="4" />
      {/* cusped arch */}
      <path d="M20 100 C 26 76, 36 68, 42 74 C 48 66, 56 66, 60 74 C 66 66, 74 66, 80 74 C 86 66, 94 66, 100 74 C 106 66, 114 66, 118 74 C 124 68, 134 76, 140 100" />
      {/* inner arch */}
      <path d="M32 100 C 36 82, 46 76, 54 82 C 60 76, 66 76, 72 82 C 78 76, 82 76, 88 82 C 94 76, 100 76, 106 82 C 114 76, 124 82, 128 100" opacity="0.6" />
      {/* dome + finial */}
      <path d="M14 60 C 40 20, 120 20, 146 60" />
      <path d="M80 20 v -14" />
      <circle cx="80" cy="4" r="3" fill="currentColor" />
      {/* base steps */}
      <path d="M6 210 h 148 M2 216 h 156" />
      {/* central pillar hint */}
      <path d="M80 100 v 100" opacity="0.35" strokeDasharray="4 6" />
    </svg>
  );
}

/* ---------- Compact scatter set for mobile ---------- */
export function MobileDoodleScatter() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0 block text-[color:var(--primary)] lg:hidden"
    >
      <PaisleyDoodle className="absolute left-[-14px] top-[560px] w-14 opacity-[0.09]" />
      <LotusDoodle className="absolute right-[-18px] top-[900px] w-16 opacity-[0.08]" />
      <ElephantDoodle className="absolute left-[-24px] top-[1400px] w-24 opacity-[0.08]" />
      <PeacockDoodle className="absolute right-[-16px] top-[1900px] w-16 opacity-[0.09]" />
      <PaisleyDoodle className="absolute left-[-10px] top-[2400px] w-12 opacity-[0.09]" />
      <JharokhaDoodle className="absolute right-[-12px] top-[2900px] w-16 opacity-[0.08]" />
      <LotusDoodle className="absolute left-[-16px] top-[3450px] w-14 opacity-[0.08]" />
      <CamelDoodle className="absolute right-[-20px] top-[4000px] w-24 opacity-[0.08]" />
      <PeacockDoodle className="absolute left-[-14px] top-[4550px] w-16 opacity-[0.09]" />
      <PaisleyDoodle className="absolute right-[-10px] top-[5100px] w-12 opacity-[0.09]" />
      <ElephantDoodle className="absolute left-[-18px] top-[5650px] w-20 opacity-[0.08]" />
      <LotusDoodle className="absolute right-[-14px] top-[6200px] w-14 opacity-[0.08]" />
    </div>
  );
}

/* ---------- Large scatter set for desktop ---------- */
export function DesktopDoodleScatter() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0 hidden text-[color:var(--primary)] lg:block"
    >
      <PeacockDoodle className="absolute left-[-60px] top-[760px] w-72 opacity-[0.10]" />
      <PaisleyDoodle className="absolute right-[40px] top-[1050px] w-40 opacity-[0.14]" />
      <ElephantDoodle className="absolute right-[-80px] top-[1550px] w-96 opacity-[0.11]" />
      <LotusDoodle className="absolute left-[60px] top-[2100px] w-52 opacity-[0.10]" />
      <JharokhaDoodle className="absolute right-[-40px] top-[2600px] w-64 opacity-[0.10]" />
      <PaisleyDoodle className="absolute left-[-30px] top-[3100px] w-44 opacity-[0.16]" />
      <CamelDoodle className="absolute right-[-60px] top-[3700px] w-[26rem] opacity-[0.10]" />
      <PeacockDoodle className="absolute left-[-40px] top-[4300px] w-72 opacity-[0.11]" />
      <LotusDoodle className="absolute right-[80px] top-[4850px] w-56 opacity-[0.10]" />
      <ElephantDoodle className="absolute left-[-90px] top-[5400px] w-96 opacity-[0.10]" />
      <JharokhaDoodle className="absolute right-[-30px] top-[5950px] w-60 opacity-[0.10]" />
      <PaisleyDoodle className="absolute left-[40px] top-[6500px] w-40 opacity-[0.16]" />
    </div>
  );
}

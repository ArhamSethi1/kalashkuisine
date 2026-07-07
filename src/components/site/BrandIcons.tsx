export function InstagramGradientIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <defs>
        <radialGradient id="ig-grad" cx="30%" cy="107%" r="150%">
          <stop offset="0%" stopColor="#FDF497" />
          <stop offset="5%" stopColor="#FDF497" />
          <stop offset="45%" stopColor="#FD5949" />
          <stop offset="60%" stopColor="#D6249F" />
          <stop offset="90%" stopColor="#285AEB" />
        </radialGradient>
      </defs>
      <rect x="2" y="2" width="20" height="20" rx="5.5" fill="url(#ig-grad)" />
      <circle cx="12" cy="12" r="4.2" fill="none" stroke="#fff" strokeWidth="1.8" />
      <circle cx="17.4" cy="6.6" r="1.2" fill="#fff" />
    </svg>
  );
}

/**
 * Swiggy brand mark — stylized italic "S" with a dot, on a white rounded tile.
 * Renders crisply at any size and reads as the Swiggy logo at button scale.
 */
export function SwiggyIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <rect width="32" height="32" rx="7" fill="#ffffff" />
      <circle cx="21.5" cy="8.2" r="2.2" fill="#FC8019" />
      <path
        d="M20.2 12.5c-1.6-1-3.5-1.6-5.5-1.6-3.9 0-7 2.6-7 6 0 2.4 1.7 4.2 4.6 5.1l3.2 1c1.7.5 2.4 1.2 2.4 2.2 0 1.3-1.4 2.2-3.3 2.2-1.9 0-3.4-.7-4.8-2l-1.8 2c1.7 1.7 3.9 2.6 6.5 2.6 4 0 6.8-2.3 6.8-5.4 0-2.4-1.6-4-4.7-4.9l-3-.9c-1.7-.5-2.5-1.2-2.5-2.2 0-1.3 1.3-2.2 3.2-2.2 1.5 0 2.8.5 4 1.6l1.9-1.5z"
        fill="#FC8019"
      />
    </svg>
  );
}

/**
 * Zomato brand mark — bold lowercase "z" wordmark on a white rounded tile.
 */
export function ZomatoIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <rect width="32" height="32" rx="7" fill="#ffffff" />
      <path
        d="M9 12h14l-9 8h9v2H7l9-8H9v-2z"
        fill="#E23744"
      />
    </svg>
  );
}

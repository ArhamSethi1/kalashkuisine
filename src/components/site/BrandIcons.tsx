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

export function SwiggyIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="currentColor">
      <path d="M12 2C7.6 2 4 5.5 4 9.9c0 5.4 6.9 11.3 7.5 11.8.3.2.7.2 1 0 .6-.5 7.5-6.4 7.5-11.8C20 5.5 16.4 2 12 2zm0 11a3.1 3.1 0 1 1 0-6.2 3.1 3.1 0 0 1 0 6.2z" />
    </svg>
  );
}

export function ZomatoIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="currentColor">
      <path d="M4 6h10.5c2.5 0 4 1.5 4 3.6 0 1.7-1 3-2.6 3.5l3.1 4.9h-3.4l-2.8-4.6H7v4.6H4V6zm3 2.4v4H14c1.2 0 2-.8 2-2s-.8-2-2-2H7z" />
    </svg>
  );
}

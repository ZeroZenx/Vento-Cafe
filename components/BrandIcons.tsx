type IconProps = {
  className?: string;
};

export function WhatsAppIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className={className} fill="currentColor">
      <path d="M16.04 3C8.86 3 3.02 8.82 3.02 15.98c0 2.3.61 4.55 1.76 6.52L3 29l6.68-1.75a13.02 13.02 0 0 0 6.35 1.62h.01c7.17 0 13.02-5.82 13.02-12.98C29.06 8.73 23.21 3 16.04 3Zm0 23.68h-.01a10.8 10.8 0 0 1-5.51-1.5l-.4-.24-3.96 1.04 1.06-3.86-.26-.4a10.73 10.73 0 0 1-1.65-5.73c0-5.95 4.84-10.79 10.8-10.79 2.88 0 5.59 1.12 7.63 3.15a10.7 10.7 0 0 1 3.16 7.63c-.01 5.95-4.85 10.7-10.86 10.7Zm5.92-8.08c-.33-.16-1.92-.95-2.22-1.06-.3-.1-.51-.16-.73.16-.22.33-.84 1.06-1.03 1.27-.19.22-.38.25-.7.08-.33-.16-1.38-.51-2.63-1.62a9.86 9.86 0 0 1-1.82-2.27c-.19-.32-.02-.5.14-.66.15-.15.33-.38.49-.57.16-.19.22-.33.33-.54.1-.22.05-.41-.03-.57-.08-.16-.73-1.76-1-2.4-.26-.64-.53-.55-.73-.56h-.62c-.22 0-.57.08-.87.41-.3.32-1.14 1.11-1.14 2.71s1.17 3.15 1.33 3.37c.16.22 2.3 3.5 5.57 4.92.78.33 1.39.53 1.86.68.78.25 1.49.21 2.05.13.63-.09 1.92-.79 2.2-1.55.27-.76.27-1.41.19-1.55-.08-.13-.3-.21-.63-.37Z" />
    </svg>
  );
}

export function BinanceIcon({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      <path d="m12 1.5 3.15 3.15L12 7.8 8.85 4.65 12 1.5Zm5.4 5.4 3.15 3.15-3.15 3.15-3.15-3.15L17.4 6.9Zm-10.8 0 3.15 3.15L6.6 13.2l-3.15-3.15L6.6 6.9Zm5.4 3.2 3.15 3.15L12 16.4l-3.15-3.15L12 10.1Zm0 6.1 3.15 3.15L12 22.5l-3.15-3.15L12 16.2Z" />
    </svg>
  );
}

export function PagoMovilIcon({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none">
      <rect x="5" y="2" width="14" height="20" rx="3" stroke="currentColor" strokeWidth="1.8" />
      <path d="M8 7h8M8 11h3m2 0h3M8 15h8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="12" cy="19" r="1" fill="currentColor" />
    </svg>
  );
}


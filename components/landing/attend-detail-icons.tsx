interface AttendIconProps {
  className?: string;
}

const iconClass = "h-5 w-5 shrink-0";

export function CalendarIcon({ className }: AttendIconProps) {
  return (
    <svg
      className={`${iconClass} ${className ?? ""}`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden
    >
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18" />
    </svg>
  );
}

export function MapPinIcon({ className }: AttendIconProps) {
  return (
    <svg
      className={`${iconClass} ${className ?? ""}`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden
    >
      <path d="M12 21s7-4.5 7-11a7 7 0 1 0-14 0c0 6.5 7 11 7 11z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

export function TrainIcon({ className }: AttendIconProps) {
  return (
    <svg
      className={`${iconClass} ${className ?? ""}`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden
    >
      <rect x="4" y="3" width="16" height="14" rx="2" />
      <path d="M4 11h16M8 21h8M10 17v4M14 17v4M8 7h.01M12 7h.01M16 7h.01" />
    </svg>
  );
}

interface ActivityIconProps {
  name: string;
  className?: string;
}

export function ActivityIcon({ name, className }: ActivityIconProps) {
  const shared = `h-8 w-8 ${className ?? ""}`;

  switch (name) {
    case "food":
      return (
        <svg
          className={shared}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          aria-hidden
        >
          <path d="M4 14h16M6 14c0-4 2-8 6-8s6 4 6 8M8 18v2M16 18v2" />
          <ellipse cx="12" cy="8" rx="4" ry="2" />
        </svg>
      );
    case "fashion":
      return (
        <svg
          className={shared}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          aria-hidden
        >
          <path d="M8 4l-2 4h12l-2-4M6 8l-1 12h14l-1-12M10 12h4" />
        </svg>
      );
    case "football":
      return (
        <svg
          className={shared}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          aria-hidden
        >
          <circle cx="12" cy="12" r="9" />
          <path d="M12 3l2 4 4 1-3 3 1 4-4-2-4 2 1-4-3-3 4-1z" />
        </svg>
      );
    case "community":
      return (
        <svg
          className={shared}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          aria-hidden
        >
          <circle cx="9" cy="8" r="3" />
          <circle cx="16" cy="9" r="2.5" />
          <path d="M4 20c0-3 2.5-5 5-5s5 2 5 5M14 20c0-2 1.5-3.5 3.5-3.5" />
        </svg>
      );
    case "family":
      return (
        <svg
          className={shared}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          aria-hidden
        >
          <path d="M4 18h16M6 18V10l6-4 6 4v8" />
          <path d="M9 14h6v4H9z" />
          <path d="M11 6h2v3h-2z" />
        </svg>
      );
    case "stage":
      return (
        <svg
          className={shared}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          aria-hidden
        >
          <path d="M12 3v12M8 7l4-4 4 4M6 19h12M9 22h6" />
          <rect x="10" y="15" width="4" height="4" rx="1" />
        </svg>
      );
    case "games":
      return (
        <svg
          className={shared}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          aria-hidden
        >
          <rect x="4" y="8" width="16" height="10" rx="2" />
          <path d="M8 12h2M9 11v2M15 11h.01M17 13h.01" />
          <path d="M9 8V6a1 1 0 011-1h4a1 1 0 011 1v2" />
        </svg>
      );
    case "wellness":
      return (
        <svg
          className={shared}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          aria-hidden
        >
          <path d="M12 4v4M12 16v4M8 8l2.5 2.5M13.5 13.5L16 16M16 8l-2.5 2.5M10.5 13.5L8 16" />
          <circle cx="12" cy="12" r="4" />
        </svg>
      );
    case "network":
      return (
        <svg
          className={shared}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          aria-hidden
        >
          <circle cx="6" cy="6" r="2.5" />
          <circle cx="18" cy="6" r="2.5" />
          <circle cx="12" cy="18" r="2.5" />
          <path d="M8 7.5l3 8M16 7.5l-3 8M8.5 6h7" />
        </svg>
      );
    case "youth":
      return (
        <svg
          className={shared}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          aria-hidden
        >
          <path d="M12 3l1.5 4.5H18l-3.5 2.5 1.5 4.5L12 12l-4 2.5 1.5-4.5L6 7.5h4.5z" />
          <path d="M8 20h8" />
        </svg>
      );
    default:
      return (
        <svg
          className={shared}
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden
        >
          <circle cx="12" cy="12" r="4" />
        </svg>
      );
  }
}

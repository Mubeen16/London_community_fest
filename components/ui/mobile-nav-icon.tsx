import { cn } from "@/lib/utils";

interface MobileNavIconProps {
  name: "about" | "programme" | "attend" | "vendors" | "faq";
  className?: string;
}

const iconProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

export function MobileNavIcon({ name, className }: MobileNavIconProps) {
  const shared = cn("size-[1.125rem] shrink-0", className);

  switch (name) {
    case "about":
      return (
        <svg className={shared} {...iconProps}>
          <circle cx="12" cy="8" r="3.25" />
          <path d="M6 19c0-3.3 2.7-5 6-5s6 1.7 6 5" />
        </svg>
      );
    case "programme":
      return (
        <svg className={shared} {...iconProps}>
          <rect x="4" y="5" width="16" height="14" rx="1.5" />
          <path d="M8 3v4M16 3v4M4 10h16" />
        </svg>
      );
    case "attend":
      return (
        <svg className={shared} {...iconProps}>
          <path d="M6 9V7a4 4 0 0 1 8 0v2" />
          <rect x="5" y="9" width="14" height="11" rx="1.5" />
          <path d="M9 14h6" />
        </svg>
      );
    case "vendors":
      return (
        <svg className={shared} {...iconProps}>
          <path d="M4 10 6 5h12l2 5" />
          <path d="M5 10v9h14v-9" />
          <path d="M9 14v5M15 14v5" />
        </svg>
      );
    case "faq":
      return (
        <svg className={shared} {...iconProps}>
          <circle cx="12" cy="12" r="8.25" />
          <path d="M9.5 9.25a2.75 2.75 0 1 1 4.35 2.24c-.9.52-1.35 1.1-1.35 2.01" />
          <circle cx="12" cy="16.75" r="0.75" fill="currentColor" stroke="none" />
        </svg>
      );
  }
}

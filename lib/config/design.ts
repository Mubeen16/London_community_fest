/**
 * Design system rules — WhatsApp poster + official logo direction.
 * All colours are Tailwind tokens from app/globals.css @theme inline.
 */
export const designConfig = {
  sections: {
    header: {
      bg: "bg-forest-950",
      text: "text-cream",
      accent: "text-gold-400",
      grain: false,
      link: "text-cream-muted",
      linkHover: "hover:text-cream",
      linkMobileHover: "hover:text-gold-400",
      border: "border-cream/5",
      bar: {
        default: "border-b border-cream/10 bg-forest-950/95 backdrop-blur-sm",
        scrolled: "border-b border-cream/15 bg-forest-950 backdrop-blur-md",
      },
      brand: {
        crimson: "text-crimson-400",
        cream: "text-cream",
        gold: "italic text-gold-400",
      },
      cta: "bg-crimson-400 text-cream hover:bg-crimson-500",
    },
    hero: {
      bg: "bg-forest-900",
      text: "text-cream",
      accent: "text-gold-400",
      grain: true,
    },
    collage: {
      bg: "bg-forest-800",
      text: "text-cream",
      accent: "text-gold-400",
      grain: true,
    },
    about: {
      bg: "bg-paper-200",
      text: "text-ink",
      accent: "text-crimson-400",
      grain: false,
    },
    whatsOn: {
      bg: "bg-paper-100",
      text: "text-ink",
      accent: "text-crimson-400",
      grain: false,
    },
    attend: {
      bg: "bg-crimson-600",
      text: "text-cream",
      accent: "text-gold-400",
      grain: true,
    },
    vendors: {
      bg: "bg-paper-200",
      text: "text-ink",
      accent: "text-crimson-400",
      grain: false,
    },
    sponsors: {
      bg: "bg-forest-900",
      text: "text-cream",
      accent: "text-gold-400",
      grain: true,
    },
    faq: {
      bg: "bg-forest-800",
      text: "text-cream",
      accent: "text-gold-400",
      grain: true,
    },
    footer: {
      bg: "bg-forest-950",
      text: "text-cream-faint",
      accent: "text-gold-400",
      grain: false,
    },
  },
  brandBar: {
    colors: ["bg-crimson-400", "bg-gold-400", "bg-forest-600", "bg-slate-500"],
    height: "h-1",
  },
} as const;

export type SectionName = keyof typeof designConfig.sections;

export type SectionTheme = (typeof designConfig.sections)[SectionName];

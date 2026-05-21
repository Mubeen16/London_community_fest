/**
 * Design system rules — WhatsApp poster + official logo direction.
 * All colours are Tailwind tokens from app/globals.css @theme inline.
 */
export const designConfig = {
  sections: {
    header: {
      bg: "bg-crimson-600",
      text: "text-cream",
      accent: "text-gold-400",
      grain: false,
      link: "text-cream-muted",
      linkHover: "hover:text-cream",
      linkMobileHover: "hover:text-gold-400",
      border: "border-cream/10",
      bar: {
        default: "border-b border-cream/10 bg-crimson-600/95 backdrop-blur-sm",
        scrolled:
          "border-b border-cream/15 bg-crimson-600 shadow-[0_10px_30px_rgba(94,12,28,0.4)] backdrop-blur-md",
      },
      brand: {
        gold: "text-gold-400",
        cream: "text-cream",
        fest: "italic text-gold-400",
      },
      cta: "bg-crimson-400 text-cream hover:bg-crimson-500",
    },
    hero: {
      bg: "bg-crimson-600",
      text: "text-cream",
      accent: "text-gold-400",
      grain: true,
    },
    collage: {
      bg: "bg-paper-100",
      text: "text-ink",
      accent: "text-crimson-400",
      grain: false,
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
    getInvolved: {
      bg: "bg-paper-200",
      text: "text-ink",
      accent: "text-crimson-400",
      grain: false,
    },
    sponsors: {
      bg: "bg-crimson-600",
      text: "text-cream",
      accent: "text-gold-400",
      grain: true,
    },
    faq: {
      bg: "bg-paper-100",
      text: "text-ink",
      accent: "text-crimson-400",
      grain: false,
    },
    footer: {
      bg: "bg-crimson-600",
      text: "text-cream-muted",
      accent: "text-gold-400",
      grain: true,
    },
  },
  brandBar: {
    colors: ["bg-crimson-400", "bg-gold-400", "bg-crimson-600", "bg-slate-500"],
    height: "h-1",
  },
} as const;

export type SectionName = keyof typeof designConfig.sections;

export type SectionTheme = (typeof designConfig.sections)[SectionName];

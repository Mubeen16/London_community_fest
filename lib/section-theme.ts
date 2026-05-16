import { designConfig, type SectionName } from "@/lib/config/design";
import { cn } from "@/lib/utils";

export function sectionClasses(name: SectionName, className?: string) {
  const theme = designConfig.sections[name];

  return cn(
    theme.bg,
    theme.text,
    theme.grain && "poster-grain",
    className,
  );
}

export function sectionAccent(name: SectionName) {
  return designConfig.sections[name].accent;
}

export function sectionHeadingTheme(name: SectionName): "light" | "dark" {
  return designConfig.sections[name].text.includes("cream") ? "dark" : "light";
}

export function headerBarClasses(scrolled: boolean) {
  const header = designConfig.sections.header;

  return cn(
    "fixed top-0 right-0 left-0 z-50 border-b transition-colors duration-200",
    scrolled ? header.bar.scrolled : header.bar.default,
  );
}

export function headerBrandClasses(part: keyof typeof designConfig.sections.header.brand) {
  return designConfig.sections.header.brand[part];
}

export function headerLinkClasses() {
  const header = designConfig.sections.header;

  return cn(header.link, header.linkHover);
}

export function headerMobileLinkClasses() {
  const header = designConfig.sections.header;

  return cn(header.text, header.linkMobileHover);
}

export function headerCtaClasses(className?: string) {
  return cn(
    "inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-semibold transition-colors duration-200",
    designConfig.sections.header.cta,
    className,
  );
}

export function headerMobilePanelClasses() {
  const header = designConfig.sections.header;

  return cn("border-t lg:hidden", header.bg, header.border);
}

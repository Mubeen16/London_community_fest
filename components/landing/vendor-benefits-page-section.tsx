import { vendorBenefits } from "@/data/vendor-benefits";
import { sectionClasses } from "@/lib/section-theme";
import { Container } from "@/components/ui/container";

export function VendorBenefitsPageSection() {
  return (
    <section className={sectionClasses("vendors", "py-8 sm:py-10")}>
      <Container>
        <p className="text-center font-sans text-xs font-bold uppercase tracking-widest text-crimson-400">
          {vendorBenefits.pageTitle}
        </p>
        <ul className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
          {vendorBenefits.items.map((benefit) => (
            <li
              key={benefit.title}
              className="rounded-lg border border-paper-300/90 bg-paper-50 px-4 py-4 shadow-sm"
            >
              <span className="text-xl leading-none" aria-hidden>
                {benefit.icon}
              </span>
              <p className="mt-2 font-sans text-sm font-bold text-ink">{benefit.title}</p>
              <p className="mt-1 font-sans text-xs leading-snug text-ink-muted">
                {benefit.description}
              </p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

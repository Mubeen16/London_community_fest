import Link from "next/link";
import { vendorMarketing } from "@/data/vendors";
import { vendorStallTypes } from "@/data/vendor-stall-types";
import { VendorBenefitsGrid } from "@/components/landing/vendor-benefits-grid";
import { VendorTariffGrid } from "@/components/landing/vendor-tariff-grid";
import { eventConfig } from "@/lib/config/event";
import { sectionClasses, sectionHeadingTheme } from "@/lib/section-theme";
import { Container } from "@/components/ui/container";
import { PaperCard } from "@/components/ui/paper-card";
import { SectionHeading } from "@/components/ui/section-heading";

function SectionLabel({ children }: { children: string }) {
  return (
    <p className="font-sans text-xs font-semibold uppercase tracking-wide text-ink-muted">
      {children}
    </p>
  );
}

export function VendorsSection() {
  const { venue } = eventConfig;

  return (
    <section
      id="vendors"
      className={sectionClasses("vendors", "py-8 sm:py-10")}
    >
      <Container className="relative z-10">
        <div className="mb-6 text-center sm:mb-8">
          <SectionHeading
            compact
            className="mb-4"
            align="center"
            theme={sectionHeadingTheme("vendors")}
            label="Vendors"
            title={vendorMarketing.title}
            description="Food, fashion, market & community stalls — spaces limited."
          />
        </div>

        <div className="grid gap-6 lg:grid-cols-2 lg:items-stretch lg:gap-8">
          <PaperCard torn={false} className="flex flex-col rounded-xl p-4 sm:p-5">
            <VendorBenefitsGrid column />

            <div className="mt-6 border-t border-paper-300/80 pt-5">
              <SectionLabel>Good to know</SectionLabel>
              <ul className="mt-3 space-y-2.5">
                {vendorMarketing.highlights.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 font-sans text-sm leading-snug text-ink"
                  >
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-crimson-400" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </PaperCard>

          <PaperCard torn={false} className="flex flex-col overflow-hidden rounded-xl">
            <div className="flex flex-1 flex-col gap-5 p-4 sm:p-5">
              <div>
                <SectionLabel>Stall packages</SectionLabel>
                <div className="mt-3">
                  <VendorTariffGrid compact hideTitle />
                </div>
              </div>

              <div className="border-t border-paper-300/80 pt-5">
                <SectionLabel>Stall types we welcome</SectionLabel>
                <div className="mt-3 flex flex-wrap gap-2">
                  {vendorStallTypes.map((type) => (
                    <span
                      key={type.value}
                      className="rounded-md border border-paper-300/90 bg-paper-50 px-2.5 py-1 font-sans text-xs font-medium text-ink"
                    >
                      {type.label}
                    </span>
                  ))}
                </div>
              </div>

              <p className="mt-auto border-t border-paper-300/80 pt-4 font-sans text-sm text-ink-muted">
                <span className="font-semibold text-ink">{eventConfig.dateDisplay}</span>
                {" · "}
                {venue.name}
                {venue.postcode ? ` · London ${venue.postcode}` : ""}
              </p>
            </div>

            <div className="border-t border-paper-300/80 bg-paper-300/25 px-4 py-4 sm:px-5">
              <p className="font-sans text-xs text-ink-muted">
                Applications reviewed within 5 working days · no fee to apply
              </p>
              <Link
                href={vendorMarketing.ctaHref}
                className="mt-3 inline-flex w-full items-center justify-center rounded-lg bg-crimson-400 px-5 py-3 text-sm font-semibold text-cream transition-colors hover:bg-crimson-500"
              >
                {vendorMarketing.ctaLabel}
              </Link>
            </div>
          </PaperCard>
        </div>
      </Container>
    </section>
  );
}

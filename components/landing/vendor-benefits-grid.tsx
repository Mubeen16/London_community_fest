import { vendorBenefits } from "@/data/vendor-benefits";
import { cn } from "@/lib/utils";

interface VendorBenefitsGridProps {
  /** Stacked list layout for homepage left column */
  column?: boolean;
}

export function VendorBenefitsGrid({ column = false }: VendorBenefitsGridProps) {
  return (
    <div>
      <h3
        className={cn(
          "font-serif text-xl text-ink",
          column ? "text-left" : "text-center sm:text-2xl",
        )}
      >
        {vendorBenefits.title}
      </h3>

      {column ? (
        <ul className="mt-4 space-y-2.5">
          {vendorBenefits.items.map((benefit) => (
            <li
              key={benefit.title}
              className="flex gap-3 rounded-lg border border-paper-300/90 bg-paper-50 px-3 py-2.5"
            >
              <span
                className="flex size-9 shrink-0 items-center justify-center rounded-md bg-paper-200/80 text-lg leading-none"
                aria-hidden
              >
                {benefit.icon}
              </span>
              <div className="min-w-0 pt-0.5">
                <p className="font-sans text-sm font-bold text-ink">{benefit.title}</p>
                <p className="mt-0.5 font-sans text-xs leading-snug text-ink-muted">
                  {benefit.description}
                </p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {vendorBenefits.items.map((benefit) => (
            <li
              key={benefit.title}
              className="rounded-lg border border-paper-300/90 bg-paper-50 px-3 py-3 shadow-sm"
            >
              <span className="text-lg leading-none" aria-hidden>
                {benefit.icon}
              </span>
              <p className="mt-1.5 font-sans text-sm font-bold text-ink">{benefit.title}</p>
              <p className="mt-0.5 font-sans text-xs leading-snug text-ink-muted">
                {benefit.description}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

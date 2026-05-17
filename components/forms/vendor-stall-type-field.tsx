"use client";

import { vendorStallTypes, type VendorStallType } from "@/data/vendor-stall-types";
import { formLabelCompactClass } from "@/components/ui/form-field";
import { cn } from "@/lib/utils";

interface VendorStallTypeFieldProps {
  value: VendorStallType | "";
  onChange: (value: VendorStallType) => void;
  disabled?: boolean;
}

export function VendorStallTypeField({ value, onChange, disabled }: VendorStallTypeFieldProps) {
  return (
    <fieldset>
      <legend className={formLabelCompactClass}>Stall category</legend>
      <input
        tabIndex={-1}
        className="sr-only"
        value={value}
        required
        readOnly
        aria-hidden
        onChange={() => {}}
      />
      <div className="mt-2 flex flex-wrap gap-1.5">
        {vendorStallTypes.map((type) => {
          const selected = value === type.value;

          return (
            <button
              key={type.value}
              type="button"
              disabled={disabled}
              aria-pressed={selected}
              onClick={() => onChange(type.value)}
              className={cn(
                "rounded-md border px-2.5 py-1.5 font-sans text-xs font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-60",
                selected
                  ? "border-crimson-400 bg-crimson-400 text-cream shadow-sm"
                  : "border-paper-300/90 bg-paper-50 text-ink hover:border-crimson-400/50 hover:bg-white",
              )}
            >
              {type.label}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

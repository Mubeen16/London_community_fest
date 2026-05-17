"use client";

import { useState, type FormEvent } from "react";
import { type VendorStallType } from "@/data/vendor-stall-types";
import { useFormSuccessScroll } from "@/hooks/use-form-success-scroll";
import { apiUrl } from "@/lib/config/api";
import { Button } from "@/components/ui/button";
import { VendorStallTypeField } from "@/components/forms/vendor-stall-type-field";
import {
  FormField,
  FormFieldGroup,
  formInputClass,
  formInputCompactClass,
} from "@/components/ui/form-field";
import { cn } from "@/lib/utils";

type FormStatus = "idle" | "loading" | "success" | "error";

function formatApiErrors(data: unknown): string {
  if (!data || typeof data !== "object") {
    return "Something went wrong. Please try again.";
  }
  const body = data as Record<string, unknown>;
  if (typeof body.detail === "string") return body.detail;

  const messages: string[] = [];
  for (const [key, value] of Object.entries(body)) {
    if (Array.isArray(value) && typeof value[0] === "string") {
      messages.push(`${key.replace(/_/g, " ")}: ${value[0]}`);
    }
  }
  return messages.join(" ") || "Something went wrong. Please try again.";
}

interface VendorFormProps {
  compact?: boolean;
}

export function VendorForm({ compact = false }: VendorFormProps) {
  const [businessName, setBusinessName] = useState("");
  const [contactName, setContactName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [stallType, setStallType] = useState<VendorStallType | "">("");
  const [description, setDescription] = useState("");
  const [halalCertified, setHalalCertified] = useState(false);
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [submittedBusiness, setSubmittedBusiness] = useState("");

  const isFoodStall = stallType === "food";
  const isSuccess = status === "success";
  const disabled = status === "loading";
  const containerRef = useFormSuccessScroll(isSuccess);

  function handleStallTypeChange(value: string) {
    setStallType(value as VendorStallType | "");
    if (value !== "food") setHalalCertified(false);
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    const payload: Record<string, string | boolean> = {
      business_name: businessName.trim(),
      contact_name: contactName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      stall_type: stallType,
      description: description.trim(),
    };

    if (isFoodStall) payload.halal_certified = halalCertified;

    try {
      const res = await fetch(apiUrl("vendors"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        const data = (await res.json()) as { business_name?: string };
        setSubmittedBusiness(data.business_name ?? businessName.trim());
        setStatus("success");
        return;
      }

      setErrorMessage(formatApiErrors(await res.json()));
      setStatus("error");
    } catch {
      setErrorMessage("Something went wrong. Please try again.");
      setStatus("error");
    }
  }

  const successPanel = (
    <div
      className={cn(
        "flex flex-col justify-center py-8 text-center",
        compact ? "min-h-[14rem]" : "min-h-[22rem]",
      )}
      aria-live="polite"
      role="status"
    >
      <p className={cn("font-serif text-crimson-400", compact ? "text-xl" : "text-2xl")}>
        Thank you, {submittedBusiness}
      </p>
      <p className="mx-auto mt-3 max-w-sm font-sans text-sm leading-relaxed text-ink-muted">
        Your application is in. We&apos;ll review it and be in touch within 5 working days.
      </p>
    </div>
  );

  if (compact) {
    const inputClass = formInputCompactClass;

    return (
      <div ref={containerRef}>
        {isSuccess ? (
          successPanel
        ) : (
      <form onSubmit={handleSubmit} className="space-y-4">
        <FormFieldGroup compact title="Contact" description="We reply within 5 working days.">
          <div className="grid gap-3 sm:grid-cols-2">
            <FormField id="vendor-business-name" label="Business name" compact>
              <input
                id="vendor-business-name"
                type="text"
                required
                autoComplete="organization"
                value={businessName}
                disabled={disabled}
                onChange={(e) => setBusinessName(e.target.value)}
                className={inputClass}
              />
            </FormField>
            <FormField id="vendor-contact-name" label="Contact name" compact>
              <input
                id="vendor-contact-name"
                type="text"
                required
                autoComplete="name"
                value={contactName}
                disabled={disabled}
                onChange={(e) => setContactName(e.target.value)}
                className={inputClass}
              />
            </FormField>
            <FormField id="vendor-email" label="Email" compact>
              <input
                id="vendor-email"
                type="email"
                required
                autoComplete="email"
                value={email}
                disabled={disabled}
                onChange={(e) => setEmail(e.target.value)}
                className={inputClass}
              />
            </FormField>
            <FormField id="vendor-phone" label="Phone" compact>
              <input
                id="vendor-phone"
                type="tel"
                required
                autoComplete="tel"
                value={phone}
                disabled={disabled}
                onChange={(e) => setPhone(e.target.value)}
                className={inputClass}
              />
            </FormField>
          </div>
        </FormFieldGroup>

        <FormFieldGroup compact title="Your stall">
          <VendorStallTypeField
            value={stallType}
            disabled={disabled}
            onChange={(value) => handleStallTypeChange(value)}
          />
          <FormField id="vendor-description" label="What will you sell or offer?" compact>
            <textarea
              id="vendor-description"
              required
              rows={2}
              value={description}
              disabled={disabled}
              placeholder="e.g. grilled halloumi, abayas, children's books…"
              onChange={(e) => setDescription(e.target.value)}
              className={cn(inputClass, "min-h-[4.5rem] resize-y")}
            />
          </FormField>

          {isFoodStall && (
            <label className="flex cursor-pointer items-center gap-2 rounded-md border border-paper-300/90 bg-paper-50 px-3 py-2.5">
              <input
                type="checkbox"
                checked={halalCertified}
                disabled={disabled}
                onChange={(e) => setHalalCertified(e.target.checked)}
                className="size-4 rounded border-paper-300 text-crimson-400 focus:ring-crimson-400/30"
              />
              <span className="font-sans text-sm text-ink">My food is halal certified</span>
            </label>
          )}
        </FormFieldGroup>

        {status === "error" && (
          <p
            className="rounded-md bg-crimson-50 px-3 py-2 font-sans text-sm text-crimson-500"
            role="alert"
          >
            {errorMessage}
          </p>
        )}

        <div className="flex flex-col gap-3 rounded-md bg-paper-300/25 px-3 py-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-sans text-xs text-ink-muted">
            No fee to apply · we&apos;ll email you about your stall
          </p>
          <Button type="submit" variant="primary" disabled={disabled} className="shrink-0 sm:w-auto">
            {status === "loading" ? "Submitting…" : "Submit application"}
          </Button>
        </div>
      </form>
        )}
      </div>
    );
  }

  return (
    <div ref={containerRef}>
      {isSuccess ? (
        successPanel
      ) : (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <FormField id="vendor-business-name" label="Business name">
          <input
            id="vendor-business-name"
            type="text"
            required
            autoComplete="organization"
            value={businessName}
            disabled={disabled}
            onChange={(e) => setBusinessName(e.target.value)}
            className={formInputClass}
          />
        </FormField>
        <FormField id="vendor-contact-name" label="Contact name">
          <input
            id="vendor-contact-name"
            type="text"
            required
            autoComplete="name"
            value={contactName}
            disabled={disabled}
            onChange={(e) => setContactName(e.target.value)}
            className={formInputClass}
          />
        </FormField>
        <FormField id="vendor-email" label="Email">
          <input
            id="vendor-email"
            type="email"
            required
            autoComplete="email"
            value={email}
            disabled={disabled}
            onChange={(e) => setEmail(e.target.value)}
            className={formInputClass}
          />
        </FormField>
        <FormField id="vendor-phone" label="Phone">
          <input
            id="vendor-phone"
            type="tel"
            required
            autoComplete="tel"
            value={phone}
            disabled={disabled}
            onChange={(e) => setPhone(e.target.value)}
            className={formInputClass}
          />
        </FormField>
      </div>

      <VendorStallTypeField
        value={stallType}
        disabled={disabled}
        onChange={(value) => handleStallTypeChange(value)}
      />

      <FormField id="vendor-description" label="What will you sell or offer?">
        <textarea
          id="vendor-description"
          required
          rows={4}
          value={description}
          disabled={disabled}
          placeholder="Tell us about your products or services…"
          onChange={(e) => setDescription(e.target.value)}
          className={cn(formInputClass, "min-h-[6rem] resize-y")}
        />
      </FormField>

      {isFoodStall && (
        <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-paper-300/90 bg-paper-50 px-4 py-3">
          <input
            type="checkbox"
            checked={halalCertified}
            disabled={disabled}
            onChange={(e) => setHalalCertified(e.target.checked)}
            className="size-4 shrink-0 rounded border-paper-300 text-crimson-400 focus:ring-crimson-400/30"
          />
          <span className="font-sans text-sm text-ink">My food is halal certified</span>
        </label>
      )}

      {status === "error" && (
        <p className="rounded-lg bg-crimson-50 px-4 py-3 font-sans text-sm text-crimson-500" role="alert">
          {errorMessage}
        </p>
      )}

      <div className="border-t border-paper-300/80 pt-6">
        <Button type="submit" variant="primary" disabled={disabled} className="w-full sm:w-auto">
          {status === "loading" ? "Submitting…" : "Submit application"}
        </Button>
        <p className="mt-3 font-sans text-xs text-ink-muted">
          We&apos;ll review your application and get back to you within 5 working days.
        </p>
      </div>
    </form>
      )}
    </div>
  );
}

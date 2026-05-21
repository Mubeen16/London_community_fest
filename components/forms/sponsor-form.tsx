"use client";

import { useState, type FormEvent } from "react";
import {
  sponsorBusinessTypes,
  type SponsorBusinessType,
} from "@/data/sponsor-business-types";
import {
  sponsorContactMethods,
  type SponsorPreferredContact,
} from "@/data/sponsor-contact-methods";
import {
  sponsorTierOptions,
  type SponsorTierInterest,
} from "@/data/sponsor-tier-options";
import { isDuplicateEnquiryMessage } from "@/lib/api/format-errors";
import { postSponsorEnquiry } from "@/lib/api/post-sponsor-enquiry";
import type { SponsorEnquiryPayload } from "@/types";
import { useFormSuccessScroll } from "@/hooks/use-form-success-scroll";
import { Button } from "@/components/ui/button";
import { FormSuccessFlash } from "@/components/ui/form-success-flash";
import { FormField, formInputCompactClass } from "@/components/ui/form-field";
import { cn } from "@/lib/utils";

type FormStatus = "idle" | "loading" | "success" | "error";

const inputClass = cn(formInputCompactClass, "py-1.5 text-sm");
const selectClass = cn(inputClass, "cursor-pointer");

const fieldGridClass = "grid grid-cols-2 gap-2 lg:grid-cols-3";

export function SponsorForm() {
  const [companyName, setCompanyName] = useState("");
  const [contactName, setContactName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [businessType, setBusinessType] = useState<SponsorBusinessType | "">("");
  const [tierInterest, setTierInterest] = useState<SponsorTierInterest | "">("");
  const [preferredContact, setPreferredContact] = useState<SponsorPreferredContact | "">(
    "",
  );
  const [message, setMessage] = useState("");
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [submittedCompany, setSubmittedCompany] = useState("");

  const isSuccess = status === "success";
  const disabled = status === "loading";
  const containerRef = useFormSuccessScroll(isSuccess);

  function resetForm() {
    setCompanyName("");
    setContactName("");
    setEmail("");
    setPhone("");
    setBusinessType("");
    setTierInterest("");
    setPreferredContact("");
    setMessage("");
    setConsent(false);
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    if (!businessType) {
      setErrorMessage("Please select a business type.");
      setStatus("error");
      return;
    }

    if (!tierInterest) {
      setErrorMessage("Please select a partnership level or choose “Not sure yet”.");
      setStatus("error");
      return;
    }

    if (!consent) {
      setErrorMessage("Please agree to be contacted about sponsorship opportunities.");
      setStatus("error");
      return;
    }

    const payload: SponsorEnquiryPayload = {
      company_name: companyName.trim(),
      contact_name: contactName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      business_type: businessType,
      tier_interest: tierInterest,
      preferred_contact: preferredContact,
      message: message.trim(),
      consent: true,
    };

    const result = await postSponsorEnquiry(payload);

    if (result.ok) {
      setSubmittedCompany(result.data.company_name ?? companyName.trim());
      resetForm();
      setStatus("success");
      return;
    }

    if (result.status === 400 && isDuplicateEnquiryMessage(result.message)) {
      setErrorMessage(
        "We already have your enquiry on file — our team will be in touch within 24 hours.",
      );
    } else {
      setErrorMessage(result.message);
    }

    setStatus("error");
  }

  return (
    <div ref={containerRef} className="relative">
      <form
        onSubmit={handleSubmit}
        className={cn(
          "space-y-2 transition-opacity duration-300",
          isSuccess && "pointer-events-none opacity-25",
        )}
        noValidate
      >
        <div className={fieldGridClass}>
          <FormField id="sponsor-company" label="Company" compact>
            <input
              id="sponsor-company"
              type="text"
              required
              autoComplete="organization"
              value={companyName}
              disabled={disabled}
              onChange={(e) => setCompanyName(e.target.value)}
              className={inputClass}
            />
          </FormField>
          <FormField id="sponsor-contact" label="Contact name" compact>
            <input
              id="sponsor-contact"
              type="text"
              required
              autoComplete="name"
              value={contactName}
              disabled={disabled}
              onChange={(e) => setContactName(e.target.value)}
              className={inputClass}
            />
          </FormField>
          <FormField id="sponsor-email" label="Email" compact>
            <input
              id="sponsor-email"
              type="email"
              required
              autoComplete="email"
              value={email}
              disabled={disabled}
              onChange={(e) => setEmail(e.target.value)}
              className={inputClass}
            />
          </FormField>
          <FormField id="sponsor-phone" label="Phone" compact>
            <input
              id="sponsor-phone"
              type="tel"
              required
              autoComplete="tel"
              value={phone}
              disabled={disabled}
              onChange={(e) => setPhone(e.target.value)}
              className={inputClass}
            />
          </FormField>
          <FormField id="sponsor-business-type" label="Business type" compact>
            <select
              id="sponsor-business-type"
              required
              value={businessType}
              disabled={disabled}
              onChange={(e) => setBusinessType(e.target.value as SponsorBusinessType)}
              className={selectClass}
            >
              <option value="" disabled>
                Select
              </option>
              {sponsorBusinessTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </FormField>
          <FormField id="sponsor-tier" label="Partnership" compact>
            <select
              id="sponsor-tier"
              required
              value={tierInterest}
              disabled={disabled}
              onChange={(e) => setTierInterest(e.target.value as SponsorTierInterest)}
              className={selectClass}
            >
              <option value="" disabled>
                Select
              </option>
              {sponsorTierOptions.map((tier) => (
                <option key={tier.value} value={tier.value}>
                  {tier.label}
                </option>
              ))}
            </select>
          </FormField>
        </div>

        <details className="group rounded-md border border-paper-300/80 bg-paper-50/60">
          <summary className="cursor-pointer list-none px-3 py-2 font-sans text-xs font-semibold text-ink-muted marker:content-none [&::-webkit-details-marker]:hidden">
            <span className="text-crimson-400 group-open:hidden">+ </span>
            <span className="hidden text-crimson-400 group-open:inline">− </span>
            Optional details (contact preference &amp; message)
          </summary>
          <div className={cn(fieldGridClass, "border-t border-paper-300/70 p-3 pt-2")}>
            <FormField id="sponsor-preferred-contact" label="Preferred contact" compact>
              <select
                id="sponsor-preferred-contact"
                value={preferredContact}
                disabled={disabled}
                onChange={(e) =>
                  setPreferredContact(e.target.value as SponsorPreferredContact | "")
                }
                className={selectClass}
              >
                <option value="">No preference</option>
                {sponsorContactMethods.map((method) => (
                  <option key={method.value} value={method.value}>
                    {method.label}
                  </option>
                ))}
              </select>
            </FormField>
            <FormField
              id="sponsor-message"
              label="Message"
              compact
              className="col-span-2 lg:col-span-2"
            >
              <input
                id="sponsor-message"
                type="text"
                value={message}
                disabled={disabled}
                placeholder="Goals or questions…"
                onChange={(e) => setMessage(e.target.value)}
                className={inputClass}
              />
            </FormField>
          </div>
        </details>

        {status === "error" && (
          <p
            className="rounded-md bg-crimson-50 px-3 py-1.5 font-sans text-xs text-crimson-500 sm:text-sm"
            role="alert"
          >
            {errorMessage}
          </p>
        )}

        <div className="flex flex-col gap-2 rounded-md bg-paper-300/25 px-3 py-2.5 sm:flex-row sm:items-center sm:justify-between">
          <label className="flex cursor-pointer items-start gap-2 sm:max-w-[70%]">
            <input
              id="sponsor-consent"
              type="checkbox"
              required
              checked={consent}
              disabled={disabled}
              onChange={(e) => setConsent(e.target.checked)}
              className="mt-0.5 size-3.5 shrink-0 rounded border-paper-300 text-crimson-400 focus:ring-crimson-400/30 sm:size-4"
            />
            <span className="font-sans text-[11px] leading-snug text-ink sm:text-xs">
              I agree to be contacted about London Community Fest 2026 sponsorship.
            </span>
          </label>
          <Button
            type="submit"
            variant="primary"
            disabled={disabled}
            size="sm"
            className="w-full shrink-0 sm:w-auto"
          >
            {status === "loading" ? "Sending…" : "Send enquiry"}
          </Button>
        </div>
      </form>

      {isSuccess ? (
        <FormSuccessFlash
          overlay
          title={`Thank you, ${submittedCompany}`}
          message="Your enquiry was sent successfully. Our team will be in touch within 24 hours."
        />
      ) : null}
    </div>
  );
}

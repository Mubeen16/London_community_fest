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
import {
  FormField,
  FormFieldGroup,
  formInputClass,
} from "@/components/ui/form-field";
import { cn } from "@/lib/utils";

type FormStatus = "idle" | "loading" | "success" | "error";

const selectClass = cn(formInputClass, "cursor-pointer");

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
      setErrorMessage("Please select a sponsorship package.");
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
        "We already have your enquiry on file — our team will be in touch within 48 hours.",
      );
    } else {
      setErrorMessage(result.message);
    }

    setStatus("error");
  }

  return (
    <div ref={containerRef} className="relative min-h-[20rem]">
      <form
        onSubmit={handleSubmit}
        className={cn(
          "space-y-10 transition-opacity duration-300",
          isSuccess && "pointer-events-none opacity-25",
        )}
        noValidate
      >
          <FormFieldGroup
            title="Your company"
            description="Tell us who you are and which package interests you."
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <FormField id="sponsor-company" label="Company name">
                <input
                  id="sponsor-company"
                  type="text"
                  required
                  autoComplete="organization"
                  value={companyName}
                  disabled={disabled}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className={formInputClass}
                />
              </FormField>
              <FormField id="sponsor-contact" label="Contact name">
                <input
                  id="sponsor-contact"
                  type="text"
                  required
                  autoComplete="name"
                  value={contactName}
                  disabled={disabled}
                  onChange={(e) => setContactName(e.target.value)}
                  className={formInputClass}
                />
              </FormField>
            </div>

            <FormField id="sponsor-business-type" label="Business type">
              <select
                id="sponsor-business-type"
                required
                value={businessType}
                disabled={disabled}
                onChange={(e) => setBusinessType(e.target.value as SponsorBusinessType)}
                className={selectClass}
              >
                <option value="" disabled>
                  Select business type
                </option>
                {sponsorBusinessTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </FormField>

            <FormField id="sponsor-tier" label="Package interest">
              <select
                id="sponsor-tier"
                required
                value={tierInterest}
                disabled={disabled}
                onChange={(e) => setTierInterest(e.target.value as SponsorTierInterest)}
                className={selectClass}
              >
                <option value="" disabled>
                  Select a package
                </option>
                {sponsorTierOptions.map((tier) => (
                  <option key={tier.value} value={tier.value}>
                    {tier.label}
                  </option>
                ))}
              </select>
            </FormField>
          </FormFieldGroup>

          <FormFieldGroup
            title="Contact details"
            description="How we can reach you about your enquiry."
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <FormField id="sponsor-email" label="Email">
                <input
                  id="sponsor-email"
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  disabled={disabled}
                  onChange={(e) => setEmail(e.target.value)}
                  className={formInputClass}
                />
              </FormField>
              <FormField id="sponsor-phone" label="Phone">
                <input
                  id="sponsor-phone"
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

            <FormField id="sponsor-preferred-contact" label="Preferred contact method">
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
          </FormFieldGroup>

          <FormField
            id="sponsor-message"
            label="Additional information"
            className="border-t border-paper-300/80 pt-8"
          >
            <textarea
              id="sponsor-message"
              rows={4}
              value={message}
              disabled={disabled}
              placeholder="Tell us about your organisation, sponsorship goals, or any questions you may have."
              onChange={(e) => setMessage(e.target.value)}
              className={cn(formInputClass, "min-h-[6rem] resize-y")}
            />
          </FormField>

          <label className="flex cursor-pointer items-start gap-3 rounded-lg border border-paper-300/90 bg-paper-50 px-4 py-3.5">
            <input
              id="sponsor-consent"
              type="checkbox"
              required
              checked={consent}
              disabled={disabled}
              onChange={(e) => setConsent(e.target.checked)}
              className="mt-0.5 size-4 shrink-0 rounded border-paper-300 text-crimson-400 focus:ring-crimson-400/30"
            />
            <span className="font-sans text-sm leading-snug text-ink">
              I agree to be contacted regarding sponsorship opportunities for London Community
              Fest 2026.
            </span>
          </label>

          {status === "error" && (
            <p
              className="rounded-lg bg-crimson-50 px-4 py-3 font-sans text-sm text-crimson-500"
              role="alert"
            >
              {errorMessage}
            </p>
          )}

          <div className="border-t border-paper-300/80 pt-6">
            <Button
              type="submit"
              variant="primary"
              disabled={disabled}
              className="w-full sm:w-auto"
            >
              {status === "loading" ? "Sending…" : "Send enquiry"}
            </Button>
          </div>
        </form>

      {isSuccess ? (
        <FormSuccessFlash
          overlay
          title={`Thank you, ${submittedCompany}`}
          message="Your enquiry was sent successfully. Our team will be in touch within 48 hours."
        />
      ) : null}
    </div>
  );
}
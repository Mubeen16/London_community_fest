"use client";

import { useState, type FormEvent } from "react";
import {
  sponsorTierOptions,
  type SponsorTierInterest,
} from "@/data/sponsor-tier-options";
import { isDuplicateEnquiryMessage } from "@/lib/api/format-errors";
import { postJsonToApi } from "@/lib/api/post-json";
import { useFormSuccessScroll } from "@/hooks/use-form-success-scroll";
import { Button } from "@/components/ui/button";
import {
  FormField,
  FormFieldGroup,
  formInputClass,
} from "@/components/ui/form-field";
import { cn } from "@/lib/utils";

type FormStatus = "idle" | "loading" | "success" | "error";

export function SponsorForm() {
  const [companyName, setCompanyName] = useState("");
  const [contactName, setContactName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [tierInterest, setTierInterest] = useState<SponsorTierInterest | "">("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [submittedCompany, setSubmittedCompany] = useState("");

  const isSuccess = status === "success";
  const disabled = status === "loading";
  const containerRef = useFormSuccessScroll(isSuccess);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    if (!tierInterest) {
      setErrorMessage("Please select a sponsorship package.");
      setStatus("error");
      return;
    }

    const payload: Record<string, string> = {
      company_name: companyName.trim(),
      contact_name: contactName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      tier_interest: tierInterest,
    };

    const trimmedMessage = message.trim();
    if (trimmedMessage) {
      payload.message = trimmedMessage;
    }

    const result = await postJsonToApi<{ company_name?: string }>("sponsors", payload);

    if (result.ok) {
      setSubmittedCompany(result.data.company_name ?? companyName.trim());
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
    <div ref={containerRef}>
      {isSuccess ? (
        <div
          className="flex min-h-[26rem] flex-col justify-center py-8 text-center"
          aria-live="polite"
          role="status"
        >
          <p className="font-serif text-2xl text-crimson-400">Thank you, {submittedCompany}</p>
          <p className="mx-auto mt-3 max-w-sm font-sans text-sm leading-relaxed text-ink-muted">
            Thank you for your interest! Our team will be in touch within 48 hours.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-8" noValidate>
          <FormFieldGroup
            title="Your company"
            description="Tell us who you are and which package interests you."
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <FormField id="sponsor-company" label="Company name">
                <input
                  id="sponsor-company"
                  type="text"
                  required
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
                  value={contactName}
                  disabled={disabled}
                  onChange={(e) => setContactName(e.target.value)}
                  className={formInputClass}
                />
              </FormField>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <FormField id="sponsor-email" label="Email">
                <input
                  id="sponsor-email"
                  type="email"
                  required
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
                  value={phone}
                  disabled={disabled}
                  onChange={(e) => setPhone(e.target.value)}
                  className={formInputClass}
                />
              </FormField>
            </div>
            <FormField id="sponsor-tier" label="Package interest">
              <select
                id="sponsor-tier"
                required
                value={tierInterest}
                disabled={disabled}
                onChange={(e) => setTierInterest(e.target.value as SponsorTierInterest)}
                className={cn(formInputClass, "cursor-pointer")}
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
            <FormField id="sponsor-message" label="Message (optional)">
              <textarea
                id="sponsor-message"
                rows={3}
                value={message}
                disabled={disabled}
                onChange={(e) => setMessage(e.target.value)}
                className={cn(formInputClass, "min-h-[5rem] resize-y")}
              />
            </FormField>
          </FormFieldGroup>

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
      )}
    </div>
  );
}

"use client";

import { useState, type FormEvent } from "react";
import { volunteerFormReassurance, volunteerSubmitLabel } from "@/data/volunteer";
import { isDuplicateEnquiryMessage } from "@/lib/api/format-errors";
import { postVolunteerEnquiry } from "@/lib/api/post-volunteer-enquiry";
import type { VolunteerEnquiryPayload } from "@/types";
import { useFormSuccessScroll } from "@/hooks/use-form-success-scroll";
import { Button } from "@/components/ui/button";
import { FormSuccessFlash } from "@/components/ui/form-success-flash";
import { FormField, formInputCompactClass } from "@/components/ui/form-field";
import {
  EMAIL_VALIDATION_MESSAGE,
  isValidEmail,
  isValidUkPhone,
  UK_PHONE_VALIDATION_MESSAGE,
} from "@/lib/validate-contact";
import { cn } from "@/lib/utils";

type FormStatus = "idle" | "loading" | "success" | "error";

interface FieldErrors {
  name?: string;
  email?: string;
  phone?: string;
}

const inputClass = cn(formInputCompactClass, "py-1.5 text-sm");

export function VolunteerForm() {
  const [contactName, setContactName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [submittedName, setSubmittedName] = useState("");

  const isSuccess = status === "success";
  const disabled = status === "loading";
  const containerRef = useFormSuccessScroll(isSuccess);

  function resetForm() {
    setContactName("");
    setEmail("");
    setPhone("");
    setMessage("");
    setConsent(false);
  }

  function validateFields(): FieldErrors {
    const nextErrors: FieldErrors = {};

    if (!contactName.trim()) {
      nextErrors.name = "Please enter your full name.";
    }

    if (!isValidEmail(email)) {
      nextErrors.email = EMAIL_VALIDATION_MESSAGE;
    }

    if (!isValidUkPhone(phone)) {
      nextErrors.phone = UK_PHONE_VALIDATION_MESSAGE;
    }

    return nextErrors;
  }

  function focusFirstFieldError(errors: FieldErrors) {
    const firstId = errors.name
      ? "volunteer-name"
      : errors.email
        ? "volunteer-email"
        : errors.phone
          ? "volunteer-phone"
          : null;

    if (!firstId) return;

    requestAnimationFrame(() => {
      document.getElementById(firstId)?.focus();
      document.getElementById(firstId)?.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorMessage("");

    const nextFieldErrors = validateFields();
    if (Object.keys(nextFieldErrors).length > 0) {
      setFieldErrors(nextFieldErrors);
      setErrorMessage("Please fix the highlighted fields before submitting.");
      setStatus("error");
      focusFirstFieldError(nextFieldErrors);
      return;
    }

    setFieldErrors({});

    if (!consent) {
      setErrorMessage("Please agree to be contacted about volunteer opportunities.");
      setStatus("error");
      return;
    }

    setStatus("loading");

    const payload: VolunteerEnquiryPayload = {
      contact_name: contactName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      message: message.trim(),
      consent: true,
    };

    const result = await postVolunteerEnquiry(payload);

    if (result.ok) {
      setSubmittedName(result.data.contact_name ?? contactName.trim());
      resetForm();
      setStatus("success");
      return;
    }

    if (result.status === 400 && isDuplicateEnquiryMessage(result.message)) {
      setErrorMessage(
        "We already have your signup on file — our team will be in touch within 24 hours.",
      );
    } else if (result.status === 503) {
      setErrorMessage(
        "Online signup is temporarily unavailable. Please email us with the subject Volunteer.",
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
          "space-y-3 transition-opacity duration-300",
          isSuccess && "pointer-events-none opacity-25",
        )}
        noValidate
      >
        {status === "error" && errorMessage ? (
          <p
            className="rounded-md bg-crimson-50 px-3 py-1.5 font-sans text-xs text-crimson-500 sm:text-sm"
            role="alert"
          >
            {errorMessage}
          </p>
        ) : null}

        <FormField id="volunteer-name" label="Full name" compact error={fieldErrors.name}>
          <input
            id="volunteer-name"
            type="text"
            required
            autoComplete="name"
            value={contactName}
            disabled={disabled}
            aria-invalid={fieldErrors.name ? true : undefined}
            aria-describedby={fieldErrors.name ? "volunteer-name-error" : undefined}
            onChange={(e) => {
              setContactName(e.target.value);
              if (fieldErrors.name) {
                setFieldErrors((current) => ({ ...current, name: undefined }));
              }
              if (errorMessage) setErrorMessage("");
            }}
            className={cn(inputClass, fieldErrors.name && "border-crimson-400/70")}
          />
        </FormField>

        <FormField
          id="volunteer-email"
          label="Email address"
          compact
          error={fieldErrors.email}
        >
          <input
            id="volunteer-email"
            type="email"
            required
            autoComplete="email"
            inputMode="email"
            value={email}
            disabled={disabled}
            aria-invalid={fieldErrors.email ? true : undefined}
            aria-describedby={fieldErrors.email ? "volunteer-email-error" : undefined}
            onChange={(e) => {
              setEmail(e.target.value);
              if (fieldErrors.email) {
                setFieldErrors((current) => ({ ...current, email: undefined }));
              }
              if (errorMessage) setErrorMessage("");
            }}
            className={cn(inputClass, fieldErrors.email && "border-crimson-400/70")}
          />
        </FormField>

        <FormField
          id="volunteer-phone"
          label="Mobile number"
          compact
          error={fieldErrors.phone}
        >
          <input
            id="volunteer-phone"
            type="tel"
            required
            autoComplete="tel"
            inputMode="tel"
            placeholder="07123 456789"
            value={phone}
            disabled={disabled}
            aria-invalid={fieldErrors.phone ? true : undefined}
            aria-describedby={fieldErrors.phone ? "volunteer-phone-error" : undefined}
            onChange={(e) => {
              setPhone(e.target.value);
              if (fieldErrors.phone) {
                setFieldErrors((current) => ({ ...current, phone: undefined }));
              }
              if (errorMessage) setErrorMessage("");
            }}
            className={cn(inputClass, fieldErrors.phone && "border-crimson-400/70")}
          />
        </FormField>

        <FormField id="volunteer-message" label="Anything you'd like us to know? (optional)" compact>
          <input
            id="volunteer-message"
            type="text"
            value={message}
            disabled={disabled}
            placeholder="Accessibility needs, questions…"
            onChange={(e) => setMessage(e.target.value)}
            className={inputClass}
          />
        </FormField>

        <div className="flex flex-col gap-3 rounded-md bg-paper-300/25 px-3 py-3">
          <p className="font-sans text-[11px] leading-snug text-ink-muted sm:text-xs">
            {volunteerFormReassurance}
          </p>
          <label className="flex cursor-pointer items-start gap-2">
            <input
              id="volunteer-consent"
              type="checkbox"
              required
              checked={consent}
              disabled={disabled}
              onChange={(e) => setConsent(e.target.checked)}
              className="mt-0.5 size-3.5 shrink-0 rounded border-paper-300 text-crimson-400 focus:ring-crimson-400/30 sm:size-4"
            />
            <span className="font-sans text-[11px] leading-snug text-ink sm:text-xs">
              I agree to be contacted regarding volunteering at London Community Fest 2026.
            </span>
          </label>
          <Button
            type="submit"
            variant="primary"
            disabled={disabled}
            size="default"
            className="w-full shrink-0"
          >
            {status === "loading" ? "Registering…" : volunteerSubmitLabel}
          </Button>
        </div>
      </form>

      {isSuccess ? (
        <FormSuccessFlash
          overlay
          title={`Thank you, ${submittedName}`}
          message="Your signup was sent successfully. We look forward to seeing you between 7:00 and 8:00 AM on event day."
        />
      ) : null}
    </div>
  );
}

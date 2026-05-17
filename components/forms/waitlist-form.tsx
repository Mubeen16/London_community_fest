"use client";

import { useState, type FormEvent } from "react";
import { apiUrl } from "@/lib/config/api";
import { cn } from "@/lib/utils";

type WaitlistStatus = "idle" | "loading" | "success" | "already" | "error";

interface WaitlistFormProps {
  variant?: "default" | "panel";
}

function getApiErrorMessage(data: unknown): string {
  if (!data || typeof data !== "object") return "";
  const body = data as Record<string, unknown>;
  if (typeof body.detail === "string") return body.detail;
  if (Array.isArray(body.email) && typeof body.email[0] === "string") {
    return body.email[0];
  }
  if (typeof body.email === "string") return body.email;
  if (
    Array.isArray(body.non_field_errors) &&
    typeof body.non_field_errors[0] === "string"
  ) {
    return body.non_field_errors[0];
  }
  return "";
}

function isDuplicateWaitlistMessage(message: string) {
  return message.toLowerCase().includes("already");
}

export function WaitlistForm({ variant = "default" }: WaitlistFormProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<WaitlistStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const isPanel = variant === "panel";
  const isComplete = status === "success" || status === "already";

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (isComplete) return;

    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch(apiUrl("waitlist"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });

      if (res.ok) {
        setStatus("success");
        return;
      }

      if (res.status === 400) {
        const message = getApiErrorMessage(await res.json());
        if (isDuplicateWaitlistMessage(message)) {
          setStatus("already");
          return;
        }
        setErrorMessage(message || "Please check your email and try again.");
        setStatus("error");
        return;
      }

      setErrorMessage("Something went wrong. Please try again.");
      setStatus("error");
    } catch {
      setErrorMessage("Something went wrong. Please try again.");
      setStatus("error");
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-stretch">
          <input
            type="email"
            required
            value={email}
            disabled={isComplete}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className={cn(
              "flex-1 rounded-xl border px-4 py-3 font-sans text-sm outline-none transition-colors disabled:cursor-not-allowed disabled:opacity-60",
              isPanel
                ? "border-cream/15 bg-black/25 text-cream placeholder:text-cream/30 focus:border-cream/30"
                : "border-cream/15 bg-cream/10 text-cream placeholder:text-cream/30 focus:border-gold-400/30",
            )}
          />
          <button
            type="submit"
            disabled={status === "loading" || !email.trim() || isComplete}
            className={cn(
              "rounded-xl px-6 py-3 text-sm font-semibold whitespace-nowrap transition-colors disabled:opacity-50 sm:shrink-0",
              isPanel
                ? "border border-cream/20 bg-cream text-forest-900 hover:bg-paper-50"
                : "bg-gold-400 text-forest-900 hover:bg-gold-300",
            )}
          >
            {status === "loading" ? "Sending..." : "Notify me"}
          </button>
        </div>
      </form>
      <div className="mt-2 min-h-[1.25rem]" aria-live="polite">
        {status === "success" && (
          <p className="text-sm text-gold-400">
            You&apos;re on the list! We&apos;ll notify you when registration opens.
          </p>
        )}
        {status === "already" && (
          <p className="text-sm text-gold-400">
            You&apos;re already on the waitlist — we&apos;ll be in touch when tickets go live.
          </p>
        )}
        {status === "error" && (
          <p className="text-sm text-red-400">{errorMessage}</p>
        )}
        {status === "idle" && (
          <p className="text-xs text-cream-faint">
            We&apos;ll email you when tickets go live. No spam.
          </p>
        )}
      </div>
    </div>
  );
}

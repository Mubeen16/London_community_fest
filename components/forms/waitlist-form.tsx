"use client";

import { useState, type FormEvent } from "react";
import {
  isDuplicateWaitlistMessage,
  postWaitlist,
} from "@/lib/api/post-waitlist";
import { cn } from "@/lib/utils";

type WaitlistStatus = "idle" | "loading" | "success" | "already" | "error";

interface WaitlistFormProps {
  variant?: "default" | "panel";
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

    const result = await postWaitlist({ email: email.trim() });

    if (result.ok) {
      setStatus("success");
      return;
    }

    if (isDuplicateWaitlistMessage(result.message)) {
      setStatus("already");
      return;
    }

    setErrorMessage(result.message);
    setStatus("error");
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-2 md:flex-row md:items-stretch">
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
              "w-full rounded-xl px-6 py-3 text-sm font-semibold transition-colors disabled:opacity-50 md:w-auto md:shrink-0 md:whitespace-nowrap",
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

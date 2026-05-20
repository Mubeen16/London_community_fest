import { NextResponse } from "next/server";
import { buildWaitlistAppsScriptPayload } from "@/lib/api/build-waitlist-apps-script-payload";
import { fetchAppsScript } from "@/lib/api/fetch-apps-script";
import { isDuplicateWaitlistMessage } from "@/lib/api/waitlist-messages";
import type { WaitlistPayload } from "@/types";

type AppsScriptResponse = {
  success?: boolean;
  message?: string;
  error?: string;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Secure proxy: browser → `/api/waitlist` → Google Apps Script (server env only).
 *
 * Apps Script is temporary operational infrastructure until Django is hosted.
 * The client never receives `WAITLIST_APPS_SCRIPT_URL`; only this route reads it.
 *
 * Future migration: remove this handler and point `postWaitlist()` at
 * `postJsonToApi("waitlist", body)` → `POST /api/v1/events/london-community-fest-2026/waitlist/`
 * (see `lib/config/api.ts` — Django config stays unchanged).
 */
export async function POST(request: Request) {
  let body: WaitlistPayload;

  try {
    body = (await request.json()) as WaitlistPayload;
  } catch {
    return NextResponse.json(
      { success: false, message: "Invalid request body." },
      { status: 400 },
    );
  }

  const email = body.email?.trim().toLowerCase() ?? "";

  if (!email || !EMAIL_PATTERN.test(email)) {
    return NextResponse.json(
      { success: false, message: "Please enter a valid email address." },
      { status: 400 },
    );
  }

  const rawUrl = process.env.WAITLIST_APPS_SCRIPT_URL?.trim().replace(
    /^["']|["']$/g,
    "",
  );

  if (!rawUrl || !rawUrl.startsWith("https://")) {
    return NextResponse.json(
      { error: "Waitlist service unavailable" },
      { status: 503 },
    );
  }

  let res: Response;

  try {
    res = await fetchAppsScript(
      rawUrl,
      buildWaitlistAppsScriptPayload({ email }),
    );
  } catch {
    return NextResponse.json(
      { success: false, message: "Unable to reach the submission service." },
      { status: 502 },
    );
  }

  const text = await res.text();
  let data: AppsScriptResponse | null = null;

  try {
    data = text ? (JSON.parse(text) as AppsScriptResponse) : null;
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: "Unexpected response from submission service.",
      },
      { status: 502 },
    );
  }

  if (!res.ok || data?.success !== true) {
    const message =
      data?.message ?? data?.error ?? "Something went wrong. Please try again.";
    const status = isDuplicateWaitlistMessage(message) ? 400 : res.ok ? 400 : 502;

    return NextResponse.json({ success: false, message }, { status });
  }

  return NextResponse.json(data);
}

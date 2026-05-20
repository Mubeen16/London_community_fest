import { NextResponse } from "next/server";
import {
  APPS_SCRIPT_NOT_CONFIGURED_MESSAGE,
  getSponsorsAppsScriptUrl,
} from "@/lib/api/apps-script-urls";
import { buildSponsorAppsScriptPayload } from "@/lib/api/build-sponsor-apps-script-payload";
import type { SponsorEnquiryPayload } from "@/types";

type AppsScriptResponse = {
  success?: boolean;
  message?: string;
  error?: string;
  company_name?: string;
};

/**
 * Proxies sponsor enquiries to Google Apps Script (server-side only).
 *
 * The browser never sees `SPONSORS_APPS_SCRIPT_URL` — it only calls this route.
 * Temporary operational intake until Django is hosted (`postJsonToApi("sponsors", ...)`).
 */
export async function POST(request: Request) {
  let body: SponsorEnquiryPayload;

  try {
    body = (await request.json()) as SponsorEnquiryPayload;
  } catch {
    return NextResponse.json(
      { success: false, message: "Invalid request body." },
      { status: 400 },
    );
  }

  let scriptUrl: string;

  try {
    scriptUrl = getSponsorsAppsScriptUrl();
  } catch {
    return NextResponse.json(
      { success: false, message: APPS_SCRIPT_NOT_CONFIGURED_MESSAGE },
      { status: 503 },
    );
  }

  let res: Response;

  try {
    res = await fetch(scriptUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(buildSponsorAppsScriptPayload(body)),
      redirect: "follow",
    });
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
    return NextResponse.json(
      {
        success: false,
        message:
          data?.message ?? data?.error ?? "Something went wrong. Please try again.",
      },
      { status: res.ok ? 400 : 502 },
    );
  }

  return NextResponse.json({
    ...data,
    company_name: data.company_name ?? body.company_name,
  });
}

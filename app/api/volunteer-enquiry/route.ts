import { NextResponse } from "next/server";
import {
  APPS_SCRIPT_NOT_CONFIGURED_MESSAGE,
  getVolunteersAppsScriptUrl,
} from "@/lib/api/apps-script-urls";
import { buildVolunteerAppsScriptPayload } from "@/lib/api/build-volunteer-apps-script-payload";
import { fetchAppsScript } from "@/lib/api/fetch-apps-script";
import type { VolunteerEnquiryPayload } from "@/types";

type AppsScriptResponse = {
  success?: boolean;
  message?: string;
  error?: string;
  contact_name?: string;
};

/**
 * Proxies volunteer signups to Google Apps Script (server-side only).
 */
export async function POST(request: Request) {
  let body: VolunteerEnquiryPayload;

  try {
    body = (await request.json()) as VolunteerEnquiryPayload;
  } catch {
    return NextResponse.json(
      { success: false, message: "Invalid request body." },
      { status: 400 },
    );
  }

  let scriptUrl: string;

  try {
    scriptUrl = getVolunteersAppsScriptUrl();
  } catch {
    return NextResponse.json(
      { success: false, message: APPS_SCRIPT_NOT_CONFIGURED_MESSAGE },
      { status: 503 },
    );
  }

  let res: Response;

  try {
    res = await fetchAppsScript(
      scriptUrl,
      buildVolunteerAppsScriptPayload(body),
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
    contact_name: data.contact_name ?? body.contact_name,
  });
}

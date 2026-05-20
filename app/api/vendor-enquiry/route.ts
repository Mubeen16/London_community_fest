import { NextResponse } from "next/server";
import {
  APPS_SCRIPT_NOT_CONFIGURED_MESSAGE,
  getVendorsAppsScriptUrl,
} from "@/lib/api/apps-script-urls";
import { buildVendorAppsScriptPayload } from "@/lib/api/build-vendor-apps-script-payload";
import { fetchAppsScript } from "@/lib/api/fetch-apps-script";
import type { VendorEnquiryPayload } from "@/types";

type AppsScriptResponse = {
  success?: boolean;
  message?: string;
  error?: string;
  business_name?: string;
};

/**
 * Proxies vendor applications to Google Apps Script (server-side only).
 *
 * The browser never sees `VENDORS_APPS_SCRIPT_URL` — it only calls this route.
 * Temporary operational intake until Django is hosted (`postJsonToApi("vendors", ...)`).
 */
export async function POST(request: Request) {
  let body: VendorEnquiryPayload;

  try {
    body = (await request.json()) as VendorEnquiryPayload;
  } catch {
    return NextResponse.json(
      { success: false, message: "Invalid request body." },
      { status: 400 },
    );
  }

  let scriptUrl: string;

  try {
    scriptUrl = getVendorsAppsScriptUrl();
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
      buildVendorAppsScriptPayload(body),
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
    business_name: data.business_name ?? body.business_name,
  });
}

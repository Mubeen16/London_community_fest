import { NextResponse } from "next/server";
import { buildVendorAppsScriptPayload } from "@/lib/api/build-vendor-apps-script-payload";
import { API } from "@/lib/config/api";
import type { VendorEnquiryPayload } from "@/types";

type AppsScriptResponse = {
  success?: boolean;
  message?: string;
  error?: string;
  business_name?: string;
};

/**
 * Proxies vendor applications to Google Apps Script (server-side).
 * Avoids browser CORS/302 redirect issues with script.google.com.
 * Remove this route when switching to Django via postJsonToApi("vendors", ...).
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

  let res: Response;

  try {
    res = await fetch(API.vendorsAppsScript, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(buildVendorAppsScriptPayload(body)),
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
    business_name: data.business_name ?? body.business_name,
  });
}

import { formatApiErrors } from "@/lib/api/format-errors";
import type { PostJsonResult } from "@/lib/api/post-json";
import { API } from "@/lib/config/api";
import type { SponsorEnquiryPayload } from "@/types";

type SponsorEnquiryResponse = {
  company_name?: string;
  success?: boolean;
  status?: string;
  message?: string;
  error?: string;
};

async function parseResponseBody(text: string): Promise<unknown> {
  if (!text) {
    return null;
  }

  try {
    return JSON.parse(text) as unknown;
  } catch {
    return null;
  }
}

function appsScriptErrorMessage(data: unknown): string {
  if (!data || typeof data !== "object") {
    return "";
  }

  const body = data as Record<string, unknown>;
  if (typeof body.message === "string" && body.message) {
    return body.message;
  }
  if (typeof body.error === "string" && body.error) {
    return body.error;
  }

  return formatApiErrors(data);
}

function isAppsScriptSuccess(data: unknown): boolean {
  if (!data || typeof data !== "object") {
    return true;
  }

  const body = data as Record<string, unknown>;

  if (body.success === false) {
    return false;
  }

  if (typeof body.success === "boolean") {
    return body.success;
  }

  if (body.status === "error" || body.status === "failure") {
    return false;
  }

  if (typeof body.error === "string" && body.error.length > 0) {
    return false;
  }

  return true;
}

/**
 * Submit a sponsor enquiry.
 *
 * TEMPORARY: posts to Google Apps Script (`API.sponsorsAppsScript`) for live intake.
 * FUTURE: when Django is hosted, switch the implementation below to:
 *   `return postJsonToApi<SponsorEnquiryResponse>("sponsors", body);`
 * and remove the Apps Script fetch block — keep `apiConfig` / `postJsonToApi` unchanged.
 */
export async function postSponsorEnquiry(
  body: SponsorEnquiryPayload,
): Promise<PostJsonResult<SponsorEnquiryResponse>> {
  let res: Response;

  try {
    res = await fetch(API.sponsorsAppsScript, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(body),
    });
  } catch {
    return {
      ok: false,
      status: 0,
      message: "Something went wrong. Please try again.",
    };
  }

  const data = await parseResponseBody(await res.text());

  if (res.ok && isAppsScriptSuccess(data)) {
    const response =
      data && typeof data === "object" ? (data as SponsorEnquiryResponse) : {};

    return {
      ok: true,
      status: res.status,
      data: {
        ...response,
        company_name: response.company_name ?? body.company_name,
      },
    };
  }

  return {
    ok: false,
    status: res.status,
    message:
      appsScriptErrorMessage(data) || "Something went wrong. Please try again.",
  };
}

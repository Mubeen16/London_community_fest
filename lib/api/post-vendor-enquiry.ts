import { formatApiErrors } from "@/lib/api/format-errors";
import type { PostJsonResult } from "@/lib/api/post-json";
import type { VendorEnquiryPayload } from "@/types";

type VendorEnquiryResponse = {
  business_name?: string;
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

function errorMessageFromBody(data: unknown): string {
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

/**
 * Submit a vendor application.
 *
 * TEMPORARY: posts via `/api/vendor-enquiry` → Google Apps Script (`API.vendorsAppsScript`).
 * Server proxy avoids browser CORS/redirect issues with script.google.com.
 *
 * FUTURE: when Django is hosted, switch to:
 *   `return postJsonToApi<VendorEnquiryResponse>("vendors", body);`
 */
export async function postVendorEnquiry(
  body: VendorEnquiryPayload,
): Promise<PostJsonResult<VendorEnquiryResponse>> {
  let res: Response;

  try {
    res = await fetch("/api/vendor-enquiry", {
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

  if (res.ok && data && typeof data === "object") {
    const bodyData = data as VendorEnquiryResponse;

    if (bodyData.success === true) {
      return {
        ok: true,
        status: res.status,
        data: {
          ...bodyData,
          business_name: bodyData.business_name ?? body.business_name,
        },
      };
    }
  }

  return {
    ok: false,
    status: res.status,
    message:
      errorMessageFromBody(data) || "Something went wrong. Please try again.",
  };
}

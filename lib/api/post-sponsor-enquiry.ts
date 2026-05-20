import { formatApiErrors } from "@/lib/api/format-errors";
import type { PostJsonResult } from "@/lib/api/post-json";
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
 * Submit a sponsor enquiry.
 *
 * TEMPORARY: posts via `/api/sponsor-enquiry` → Google Apps Script (server env URL).
 * Proxy keeps the Apps Script URL out of the browser; avoids CORS/302 issues.
 *
 * FUTURE: when Django is hosted, switch to:
 *   `return postJsonToApi<SponsorEnquiryResponse>("sponsors", body);`
 */
export async function postSponsorEnquiry(
  body: SponsorEnquiryPayload,
): Promise<PostJsonResult<SponsorEnquiryResponse>> {
  let res: Response;

  try {
    res = await fetch("/api/sponsor-enquiry", {
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
    const bodyData = data as SponsorEnquiryResponse;

    if (bodyData.success === true) {
      return {
        ok: true,
        status: res.status,
        data: {
          ...bodyData,
          company_name: bodyData.company_name ?? body.company_name,
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

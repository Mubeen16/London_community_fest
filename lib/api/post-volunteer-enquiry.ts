import { friendlyAppsScriptMessage, formatApiErrors } from "@/lib/api/format-errors";
import type { PostJsonResult } from "@/lib/api/post-json";
import type { VolunteerEnquiryPayload } from "@/types";

type VolunteerEnquiryResponse = {
  contact_name?: string;
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
 * Submit a volunteer signup.
 *
 * TEMPORARY: posts via `/api/volunteer-enquiry` → Google Apps Script (server env URL).
 */
export async function postVolunteerEnquiry(
  body: VolunteerEnquiryPayload,
): Promise<PostJsonResult<VolunteerEnquiryResponse>> {
  let res: Response;

  try {
    res = await fetch("/api/volunteer-enquiry", {
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
    const bodyData = data as VolunteerEnquiryResponse;

    if (bodyData.success === true) {
      return {
        ok: true,
        status: res.status,
        data: {
          ...bodyData,
          contact_name: bodyData.contact_name ?? body.contact_name,
        },
      };
    }
  }

  return {
    ok: false,
    status: res.status,
    message: friendlyAppsScriptMessage(
      errorMessageFromBody(data) || "Something went wrong. Please try again.",
    ),
  };
}

import { formatApiErrors } from "@/lib/api/format-errors";
import type { PostJsonResult } from "@/lib/api/post-json";
import { isDuplicateWaitlistMessage } from "@/lib/api/waitlist-messages";
import type { WaitlistPayload } from "@/types";

export { isDuplicateWaitlistMessage };

type WaitlistResponse = {
  success?: boolean;
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
 * Join the ticket waitlist.
 *
 * Browser posts only to same-origin `/api/waitlist` (secure proxy).
 * Apps Script URL stays server-side in `WAITLIST_APPS_SCRIPT_URL`.
 *
 * FUTURE: when Django is hosted, switch to:
 *   `return postJsonToApi<WaitlistResponse>("waitlist", body);`
 */
export async function postWaitlist(
  body: WaitlistPayload,
): Promise<PostJsonResult<WaitlistResponse>> {
  let res: Response;

  try {
    res = await fetch("/api/waitlist", {
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
    const bodyData = data as WaitlistResponse;

    if (bodyData.success === true) {
      return { ok: true, status: res.status, data: bodyData };
    }
  }

  const message =
    errorMessageFromBody(data) || "Something went wrong. Please try again.";

  return {
    ok: false,
    status: res.status,
    message,
  };
}

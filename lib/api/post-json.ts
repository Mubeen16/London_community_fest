import { formatApiErrors } from "@/lib/api/format-errors";
import { apiUrl, type ApiEndpoint } from "@/lib/config/api";

export type PostJsonResult<T> =
  | { ok: true; status: number; data: T }
  | { ok: false; status: number; message: string };

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

export async function postJsonToApi<T extends Record<string, unknown>>(
  endpoint: ApiEndpoint,
  body: Record<string, unknown>,
): Promise<PostJsonResult<T>> {
  let res: Response;

  try {
    res = await fetch(apiUrl(endpoint), {
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

  if (res.ok) {
    return {
      ok: true,
      status: res.status,
      data: (data && typeof data === "object" ? data : {}) as T,
    };
  }

  return {
    ok: false,
    status: res.status,
    message: formatApiErrors(data) || "Something went wrong. Please try again.",
  };
}

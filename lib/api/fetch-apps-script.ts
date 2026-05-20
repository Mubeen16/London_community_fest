/**
 * POST to a Google Apps Script web app and read the JSON response.
 *
 * Apps Script responds with 302 to script.googleusercontent.com. Following that
 * redirect with `redirect: "follow"` turns the follow-up into GET without the
 * body and returns HTML — so we POST once, then GET the Location URL for the result.
 */
export async function fetchAppsScript(
  scriptUrl: string,
  payload: Record<string, unknown>,
): Promise<Response> {
  const body = JSON.stringify(payload);

  const initial = await fetch(scriptUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body,
    redirect: "manual",
  });

  if (initial.status !== 302 && initial.status !== 301 && initial.status !== 303) {
    return initial;
  }

  const location = initial.headers.get("location");

  if (!location) {
    return initial;
  }

  return fetch(location, {
    method: "GET",
    headers: { Accept: "application/json" },
  });
}

export function formatApiErrors(data: unknown): string {
  if (!data || typeof data !== "object") {
    return "";
  }

  const body = data as Record<string, unknown>;
  if (typeof body.detail === "string") {
    return body.detail;
  }

  const messages: string[] = [];
  for (const [key, value] of Object.entries(body)) {
    if (Array.isArray(value) && typeof value[0] === "string") {
      messages.push(
        key === "non_field_errors" ? value[0] : `${key.replace(/_/g, " ")}: ${value[0]}`,
      );
    } else if (typeof value === "string") {
      messages.push(value);
    }
  }

  return messages.join(" ");
}

export function isDuplicateEnquiryMessage(message: string): boolean {
  return message.toLowerCase().includes("already");
}

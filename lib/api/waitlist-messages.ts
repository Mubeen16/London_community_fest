/** Detect duplicate-email responses from Apps Script or future Django API. */
export function isDuplicateWaitlistMessage(message: string): boolean {
  return message.toLowerCase().includes("already");
}

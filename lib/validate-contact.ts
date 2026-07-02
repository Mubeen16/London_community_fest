export const EMAIL_VALIDATION_MESSAGE = "Enter a valid email address.";
export const UK_PHONE_VALIDATION_MESSAGE =
  "Enter a valid UK phone number (e.g. 07123 456789).";

export function isValidEmail(value: string): boolean {
  const email = value.trim();
  if (!email) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(email);
}

export function isValidUkPhone(value: string): boolean {
  const digits = value.replace(/\D/g, "");
  if (!digits) return false;

  if (digits.startsWith("44")) {
    const national = digits.slice(2);
    return national.length === 10 && /^[1-9]/.test(national);
  }

  if (digits.startsWith("0")) {
    return digits.length === 11 && /^0[1-9]/.test(digits);
  }

  // UK mobile without leading 0, e.g. 7123456789
  if (digits.length === 10 && digits.startsWith("7")) {
    return true;
  }

  return false;
}

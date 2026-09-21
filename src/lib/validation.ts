/**
 * Normalizes an Indian mobile number to a bare 10-digit string, stripping a
 * leading +91 / 91 / 0 and any spaces or dashes. Returns null if the result
 * isn't a valid 10-digit Indian mobile number (must start with 6-9).
 */
export function normalizeIndianPhone(input: string): string | null {
  const digitsOnly = input.replace(/[\s-]/g, "").replace(/^\+/, "");
  const withoutCountryCode = digitsOnly.replace(/^91(?=\d{10}$)/, "").replace(/^0(?=\d{10}$)/, "");
  return /^[6-9]\d{9}$/.test(withoutCountryCode) ? withoutCountryCode : null;
}

export function isValidEmail(input: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input);
}

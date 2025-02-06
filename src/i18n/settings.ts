export const locales = ["en", "hu"] as const;
export const defaultLocale = "en" as const;

export type Locale = (typeof locales)[number];

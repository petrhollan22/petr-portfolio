export type Locale = 'cs' | 'en';
export type Localized = { cs: string; en: string };

export function pick(value: Localized, locale: string): string {
  return locale === 'en' ? value.en : value.cs;
}

export function pickAll(values: Localized[], locale: string): string[] {
  return values.map((v) => pick(v, locale));
}

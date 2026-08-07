export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://petr.hollan.cz';

export const routes = [
  '',
  '/work',
  '/cv',
  '/free-time',
  '/schedule-time',
  '/hustle',
  '/inspiration',
] as const;

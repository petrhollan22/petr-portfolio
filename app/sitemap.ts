import type { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';
import { siteUrl, routes } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return routes.flatMap((route) =>
    routing.locales.map((locale) => ({
      url: `${siteUrl}/${locale}${route}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: route === '' ? 1 : 0.8,
      alternates: {
        languages: Object.fromEntries(
          routing.locales.map((l) => [l, `${siteUrl}/${l}${route}`])
        ),
      },
    }))
  );
}

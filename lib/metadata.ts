import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { siteUrl } from './site';

export async function buildMetadata(
  locale: string,
  titleKey: string,
  descKey: string,
  path: string
): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'meta' });
  const title = t(titleKey);
  const description = t(descKey);
  const url = `${siteUrl}/${locale}${path}`;

  return {
    title,
    description,
    metadataBase: new URL(siteUrl),
    alternates: {
      canonical: url,
      languages: {
        cs: `${siteUrl}/cs${path}`,
        en: `${siteUrl}/en${path}`,
      },
    },
    openGraph: {
      type: 'website',
      siteName: t('siteName'),
      title,
      description,
      url,
      locale: locale === 'en' ? 'en_US' : 'cs_CZ',
      images: [{ url: '/og.jpg', width: 1200, height: 630, alt: t('siteName') }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/og.jpg'],
    },
  };
}

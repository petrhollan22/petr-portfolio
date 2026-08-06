'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/routing';

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchTo = (next: string) => {
    router.replace(pathname, { locale: next });
  };

  return (
    <div className="flex items-center gap-1">
      <button
        onClick={() => switchTo('cs')}
        aria-label="Přepnout do češtiny"
        className={`px-2 py-1 rounded text-lg transition-opacity ${locale === 'cs' ? 'opacity-100' : 'opacity-40 hover:opacity-70'}`}
      >
        🇨🇿
      </button>
      <button
        onClick={() => switchTo('en')}
        aria-label="Switch to English"
        className={`px-2 py-1 rounded text-lg transition-opacity ${locale === 'en' ? 'opacity-100' : 'opacity-40 hover:opacity-70'}`}
      >
        🇬🇧
      </button>
    </div>
  );
}

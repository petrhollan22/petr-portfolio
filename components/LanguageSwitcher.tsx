'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/routing';

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const base = 'px-2 py-1 rounded text-sm font-semibold transition-colors';
  const on = 'bg-red-600 text-white';
  const off = 'text-gray-400 hover:text-white';

  return (
    <div className="flex items-center gap-1">
      <button onClick={() => router.replace(pathname, { locale: 'cs' })}
        className={`${base} ${locale === 'cs' ? on : off}`}>CZ</button>
      <button onClick={() => router.replace(pathname, { locale: 'en' })}
        className={`${base} ${locale === 'en' ? on : off}`}>EN</button>
    </div>
  );
}

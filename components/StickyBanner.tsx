'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/routing';
import { X } from '@phosphor-icons/react';

export default function StickyBanner() {
  const t = useTranslations('stickyBanner');
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    setVisible(false);
    setDismissed(false);
  }, [pathname]);

  useEffect(() => {
    if (dismissed) return;
    const timer = setTimeout(() => setVisible(true), 120000);
    return () => clearTimeout(timer);
  }, [dismissed]);

  if (pathname === '/schedule-time') return null;
  if (!visible || dismissed) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-secondary border-t border-gray-700 shadow-2xl animate-in slide-in-from-bottom duration-300">
      <div className="container flex items-center justify-between gap-4 py-3 flex-wrap">
        <p className="text-sm text-gray-300 flex-1 min-w-[200px]">{t('text')}</p>
        <div className="flex items-center gap-3 shrink-0">
          <Link href="/schedule-time" className="text-sm text-red-400 hover:text-red-300 transition-colors font-medium whitespace-nowrap">
            {t('cta')} →
          </Link>
          <button
            onClick={() => setDismissed(true)}
            aria-label={t('close')}
            className="text-gray-500 hover:text-white transition-colors p-1"
          >
            <X weight="regular" className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

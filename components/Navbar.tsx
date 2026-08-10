'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/routing';
import LanguageSwitcher from './LanguageSwitcher';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations('nav');
  const pathname = usePathname();

  const links = [
    { href: '/work', label: t('work') },
    { href: '/cv', label: t('cv') },
    { href: '/free-time', label: t('freeTime') },
    { href: '/schedule-time', label: t('scheduleTime') },
    { href: '/hustle', label: t('hustle') },
    { href: '/blog', label: 'Blog' },
  ];

  return (
    <nav className="bg-secondary sticky top-0 z-50 shadow-lg">
      <div className="container flex justify-between items-center py-4">
        <Link href="/" className="text-xl font-bold gradient-text whitespace-nowrap">Petr Hollan</Link>

        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`transition-colors font-medium ${
                pathname === link.href ? 'text-red-400' : 'hover:text-red-400'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <LanguageSwitcher />
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <LanguageSwitcher />
          <button onClick={() => setIsOpen(!isOpen)} aria-label="Menu">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-primary">
          <div className="flex flex-col gap-4 p-4">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`transition-colors font-medium ${
                  pathname === link.href ? 'text-red-400' : 'hover:text-red-400'
                }`}
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}

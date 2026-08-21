'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/routing';
import LanguageSwitcher from './LanguageSwitcher';
import Logo from './Logo';

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
    <nav className="bg-primary sticky top-0 z-50 border-b border-gray-800">
      <div className="container flex justify-between items-center py-5">
        <Logo />

        <div className="hidden md:flex items-center gap-12">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm transition-colors font-medium tracking-wide ${
                pathname === link.href ? 'text-red-500' : 'text-gray-400 hover:text-white'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <LanguageSwitcher />
        </div>

        <div className="flex items-center gap-4 md:hidden">
          <LanguageSwitcher />
          <button onClick={() => setIsOpen(!isOpen)} aria-label="Menu">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-primary border-t border-gray-800">
          <div className="flex flex-col gap-4 p-6 container">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm transition-colors font-medium tracking-wide ${
                  pathname === link.href ? 'text-red-500' : 'text-gray-400 hover:text-white'
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

'use client';

import { useState, useRef, useEffect } from 'react';
import {
  BookOpen, Microphone, Wrench, GraduationCap, Trophy, MapPin, User, Sparkle, CaretDown,
} from '@phosphor-icons/react';
import type { InspirationCategory } from '@/data/inspiration';
import { pick } from '@/lib/localized';

const iconMap = {
  book: BookOpen,
  podcast: Microphone,
  wrench: Wrench,
  graduation: GraduationCap,
  trophy: Trophy,
  pin: MapPin,
  user: User,
  sparkles: Sparkle,
};

interface Props {
  categories: InspirationCategory[];
  value: string;
  onChange: (id: string) => void;
  locale: string;
  placeholder: string;
  className: string;
}

export default function CategoryDropdown({ categories, value, onChange, locale, placeholder, className }: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, [open]);

  const selected = categories.find((c) => c.id === value);
  const SelectedIcon = selected ? iconMap[selected.icon] : null;

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={`${className} flex items-center justify-between text-left`}
      >
        <span className="flex items-center gap-2">
          {SelectedIcon && <SelectedIcon weight="regular" className="w-4 h-4 text-red-400 shrink-0" />}
          <span className={selected ? '' : 'text-gray-500'}>
            {selected ? pick(selected.name, locale) : placeholder}
          </span>
        </span>
        <CaretDown weight="regular" className="w-4 h-4 text-gray-400 shrink-0" />
      </button>

      {open && (
        <div className="absolute z-50 mt-2 w-full py-2 bg-secondary border border-gray-700 rounded-lg shadow-xl max-h-72 overflow-y-auto">
          {categories.map((c) => {
            const Icon = iconMap[c.icon];
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => { onChange(c.id); setOpen(false); }}
                className="w-full flex items-center gap-3 px-4 py-2 text-left text-sm hover:bg-primary transition-colors"
              >
                <Icon weight="regular" className="w-4 h-4 text-red-400 shrink-0" />
                <span>{pick(c.name, locale)}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

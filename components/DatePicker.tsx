'use client';

import { useState, useRef, useEffect } from 'react';
import { DayPicker } from 'react-day-picker';
import { cs, enUS } from 'date-fns/locale';
import { format, parse, startOfDay } from 'date-fns';
import { hasAvailableSlots } from '@/lib/timeSlots';
import 'react-day-picker/dist/style.css';

interface Props {
  value: string;
  onChange: (value: string) => void;
  locale: string;
  placeholder: string;
  className: string;
}

export default function DatePicker({ value, onChange, locale, placeholder, className }: Props) {
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMobile(window.matchMedia('(max-width: 767px)').matches);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, [open]);

  const today = startOfDay(new Date());
  const selected = value ? parse(value, 'yyyy-MM-dd', new Date()) : undefined;
  const dfnsLocale = locale === 'en' ? enUS : cs;

  if (isMobile) {
    return (
      <input
        type="date"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required
        min={format(today, 'yyyy-MM-dd')}
        className={className}
      />
    );
  }

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={`${className} text-left flex items-center justify-between`}
      >
        <span className={value ? '' : 'text-gray-500'}>
          {value ? format(selected!, 'd. M. yyyy', { locale: dfnsLocale }) : placeholder}
        </span>
        <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </button>

      {open && (
        <div className="absolute z-50 mt-2 p-3 bg-secondary border border-gray-700 rounded-lg shadow-xl">
          <DayPicker
            mode="single"
            selected={selected}
            onSelect={(date) => {
              if (date) {
                onChange(format(date, 'yyyy-MM-dd'));
                setOpen(false);
              }
            }}
            disabled={[
              { before: today },
              (date) => !hasAvailableSlots(format(date, 'yyyy-MM-dd')),
            ]}
            locale={dfnsLocale}
            weekStartsOn={1}
            className="rdp-dark"
          />
        </div>
      )}
    </div>
  );
}

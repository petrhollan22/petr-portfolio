'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { workServices, scheduleActivities } from '@/data/services';
import { pick } from '@/lib/localized';

export default function ContactForm() {
  const t = useTranslations('contact');
  const locale = useLocale();
  const [form, setForm] = useState({ name: '', email: '', service: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus('success');
        setForm({ name: '', email: '', service: '', message: '' });
        setTimeout(() => setStatus('idle'), 3000);
      } else setStatus('error');
    } catch { setStatus('error'); }
  };

  const field = 'w-full px-4 py-2 bg-primary rounded-lg border border-gray-700 focus:border-purple-500 focus:outline-none';

  return (
    <form onSubmit={onSubmit} className="card max-w-2xl mx-auto">
      <h3 className="text-2xl font-bold mb-6">{t('title')}</h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">{t('name')}</label>
          <input type="text" name="name" value={form.name} onChange={onChange} required className={field} placeholder={t('namePlaceholder')} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">{t('email')}</label>
          <input type="email" name="email" value={form.email} onChange={onChange} required className={field} placeholder="you@example.com" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">{t('service')}</label>
          <select name="service" value={form.service} onChange={onChange} className={field}>
            <option value="">{t('choose')}</option>
            <optgroup label={t('groupWork')}>
              {workServices.map((s) => (
                <option key={s.id} value={pick(s.name, locale)}>{pick(s.name, locale)}</option>
              ))}
            </optgroup>
            <optgroup label={t('groupActivity')}>
              {scheduleActivities.map((a) => (
                <option key={a.cs} value={pick(a, locale)}>{pick(a, locale)}</option>
              ))}
            </optgroup>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">{t('message')}</label>
          <textarea name="message" value={form.message} onChange={onChange} required rows={5} className={field} placeholder={t('messagePlaceholder')} />
        </div>

        {status === 'success' && <div className="p-4 bg-green-500/20 border border-green-500 rounded-lg text-green-400">{t('success')}</div>}
        {status === 'error' && <div className="p-4 bg-red-500/20 border border-red-500 rounded-lg text-red-400">{t('error')}</div>}

        <button type="submit" disabled={status === 'loading'} className="btn-primary w-full disabled:opacity-50">
          {status === 'loading' ? t('sending') : t('submit')}
        </button>
      </div>
    </form>
  );
}

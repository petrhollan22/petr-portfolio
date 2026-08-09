'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { inspirationCategories } from '@/data/inspiration';
import { pick } from '@/lib/localized';
import Turnstile from '@/components/Turnstile';

export default function InspirationClient() {
  const t = useTranslations('inspiration');
  const locale = useLocale();

  const [form, setForm] = useState({ category: '', name: '', link: '', why: '', from: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [token, setToken] = useState('');
  const [resetKey, setResetKey] = useState(0);

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  const normaliseLink = () => {
    setForm((p) => {
      const v = p.link.trim();
      if (!v || /^https?:\/\//i.test(v)) return p;
      return { ...p, link: `https://${v}` };
    });
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const cat = inspirationCategories.find((c) => c.id === form.category);
      const res = await fetch('/api/inspiration', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, category: cat ? pick(cat.name, locale) : form.category, turnstileToken: token }),
      });
      if (res.ok) {
        setStatus('success');
        setToken('');
        setResetKey((k) => k + 1);
        setForm({ category: '', name: '', link: '', why: '', from: '' });
        setTimeout(() => setStatus('idle'), 4000);
      } else setStatus('error');
    } catch { setStatus('error'); }
  };

  const field = 'w-full px-4 py-2 bg-primary rounded-lg border border-gray-700 focus:border-red-500 focus:outline-none';

  return (
    <div className="bg-gradient-to-b from-primary to-secondary">
      <section className="container pt-20 pb-4 text-center">
        <h1 className="text-5xl font-bold mb-4 gradient-text">{t('title')}</h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">{t('lead')}</p>
      </section>

      <section className="container py-12">
        <form onSubmit={onSubmit} className="card max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-8">{t('formTitle')}</h2>

          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium mb-2">{t('category')} *</label>
              <select name="category" value={form.category} onChange={onChange} required className={field}>
                <option value="">{t('choose')}</option>
                {inspirationCategories.map((c) => (
                  <option key={c.id} value={c.id}>{c.emoji} {pick(c.name, locale)}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">{t('name')} *</label>
              <input type="text" name="name" value={form.name} onChange={onChange} required
                className={field}
                placeholder={form.category ? t(`ph.${form.category}`) : t('ph.default')} />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                {t('link')} <span className="text-gray-500 font-normal">({t('linkNote')})</span>
              </label>
              <input type="url" name="link" value={form.link} onChange={onChange} onBlur={normaliseLink}
                className={field} placeholder="www.priklad.cz" />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                {t('why')} <span className="text-gray-500 font-normal">({t('linkNote')})</span>
              </label>
              <textarea name="why" value={form.why} onChange={onChange} rows={3}
                className={field}
                placeholder={form.category ? t(`whyPh.${form.category}`) : t('whyPh.default')} />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                {t('from')} <span className="text-gray-500 font-normal">({t('linkNote')})</span>
              </label>
              <input type="text" name="from" value={form.from} onChange={onChange}
                className={field} placeholder={t('fromPlaceholder')} />
            </div>

            {status === 'success' && (
              <div className="p-4 bg-green-500/20 border border-green-500 rounded-lg text-green-400">{t('success')}</div>
            )}
            {status === 'error' && (
              <div className="p-4 bg-red-500/20 border border-red-500 rounded-lg text-red-400">{t('error')}</div>
            )}

            <Turnstile onVerify={setToken} resetKey={resetKey} />

            <button type="submit" disabled={status === 'loading' || !token} className="btn-primary w-full disabled:opacity-50">
              {status === 'loading' ? t('sending') : t('submit')}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

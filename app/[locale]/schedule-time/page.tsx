'use client';

import { Suspense, useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';
import { workServices, scheduleActivities } from '@/data/services';
import { pick } from '@/lib/localized';
import ContactForm from '@/components/ContactForm';

function BookingForm() {
  const t = useTranslations('schedule');
  const locale = useLocale();
  const params = useSearchParams();
  const preselected = params.get('service');

  const [b, setB] = useState({
    name: '', email: '', type: 'work' as 'work' | 'activity',
    service: '', date: '', time: '', duration: '60', message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  useEffect(() => {
    if (!preselected) return;
    const isActivity = scheduleActivities.some((a) => a.cs === preselected || a.en === preselected);
    const isWork = workServices.some((s) => s.name.cs === preselected || s.name.en === preselected);
    if (isActivity || isWork) {
      setB((p) => ({ ...p, type: isActivity ? 'activity' : 'work', service: preselected }));
    }
  }, [preselected]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setB((p) => ({ ...p, [name]: value, ...(name === 'type' ? { service: '' } : {}) }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(b),
      });
      if (res.ok) {
        setStatus('success');
        setB({ name: '', email: '', type: 'work', service: '', date: '', time: '', duration: '60', message: '' });
        setTimeout(() => setStatus('idle'), 4000);
      } else setStatus('error');
    } catch { setStatus('error'); }
  };

  const options = b.type === 'work'
    ? workServices.map((s) => pick(s.name, locale))
    : scheduleActivities.map((a) => pick(a, locale));

  const field = 'w-full px-4 py-2 bg-primary rounded-lg border border-gray-700 focus:border-purple-500 focus:outline-none';

  return (
    <form onSubmit={onSubmit} className="card max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold mb-8">{t('formTitle')}</h2>
      <div className="space-y-6">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">{t('name')} *</label>
            <input type="text" name="name" value={b.name} onChange={onChange} required className={field} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">{t('email')} *</label>
            <input type="email" name="email" value={b.email} onChange={onChange} required className={field} />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">{t('type')} *</label>
          <select name="type" value={b.type} onChange={onChange} className={field}>
            <option value="work">{t('typeWork')}</option>
            <option value="activity">{t('typeActivity')}</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            {b.type === 'work' ? t('service') : t('activity')} *
          </label>
          <select name="service" value={b.service} onChange={onChange} required className={field}>
            <option value="">{t('choose')}</option>
            {options.map((o) => <option key={o} value={o}>{o}</option>)}
          </select>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">{t('date')} *</label>
            <input type="date" name="date" value={b.date} onChange={onChange} required className={field} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">{t('time')} *</label>
            <input type="time" name="time" value={b.time} onChange={onChange} required className={field} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">{t('duration')} *</label>
            <select name="duration" value={b.duration} onChange={onChange} className={field}>
              {['30', '60', '90', '120'].map((d) => (
                <option key={d} value={d}>{d} {t('minutes')}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">{t('note')}</label>
          <textarea name="message" value={b.message} onChange={onChange} rows={4} className={field} placeholder={t('notePlaceholder')} />
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

export default function SchedulePage() {
  const t = useTranslations('schedule');
  return (
    <div className="bg-gradient-to-b from-primary to-secondary">
      <section className="container py-20 text-center">
        <h1 className="text-5xl font-bold mb-4 gradient-text">{t('title')}</h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">{t('lead')}</p>
      </section>

      <section className="container py-8">
        <Suspense fallback={<div className="card max-w-2xl mx-auto text-gray-400">…</div>}>
          <BookingForm />
        </Suspense>
      </section>

      <section className="container py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">{t('altTitle')}</h2>
          <p className="text-gray-400">{t('altLead')}</p>
        </div>
        <ContactForm />
      </section>
    </div>
  );
}

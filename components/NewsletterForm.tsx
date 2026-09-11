'use client';
import { useState } from 'react';
import { useTranslations } from 'next-intl';

export default function NewsletterForm() {
  const t = useTranslations('footer');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'ok' | 'error'>('idle');
  const [msg, setMsg] = useState('');

  const submit = async () => {
    if (!email.includes('@')) return;
    setStatus('loading');
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus('ok');
        setMsg(t('newsletterOk'));
      } else {
        setStatus('error');
        setMsg(res.status === 409 ? t('newsletterErr409') : t('newsletterErrGeneral'));
      }
    } catch {
      setStatus('error');
      setMsg(t('newsletterErrGeneral'));
    }
  };

  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">{t('newsletterTitle')}</h3>
      <p className="text-gray-400 text-sm mb-4">{t('newsletterDesc')}</p>
      {status === 'ok' ? (
        <p className="text-green-400 text-sm">{msg}</p>
      ) : (
        <div className="flex gap-2">
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && submit()}
            placeholder={t('newsletterEmail')}
            className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-200 placeholder-gray-600 focus:outline-none focus:border-red-400"
          />
          <button
            onClick={submit}
            disabled={status === 'loading'}
            className="px-4 py-2 bg-red-400 hover:bg-red-300 text-white text-sm rounded-lg transition-colors disabled:opacity-50"
          >
            {status === 'loading' ? '...' : t('newsletterBtn')}
          </button>
        </div>
      )}
      {status === 'error' && <p className="text-red-400 text-xs mt-2">{msg}</p>}
    </div>
  );
}

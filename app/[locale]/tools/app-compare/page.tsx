'use client';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import PageGlow from '@/components/PageGlow';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

type AppResult = {
  platform: string;
  appId: string;
  name: string;
  developer: string;
  rating: number;
  ratingCount: number;
  ratingCurrent: number | null;
  ratingCountCurrent: number | null;
  version: string;
  icon: string;
  url: string;
  error?: string;
};

type TrendPoint = {
  month: string;
  avg: number;
  count: number;
  stars: Record<number, number>;
};

type ReviewData = {
  appId: string;
  appName: string;
  reviews: any[];
  trend: TrendPoint[];
  total: number;
};

const COUNTRIES = [
  { code: 'cz', label: 'CZ' },
  { code: 'sk', label: 'SK' },
  { code: 'de', label: 'DE' },
  { code: 'us', label: 'US' },
  { code: 'gb', label: 'GB' },
  { code: 'pl', label: 'PL' },
];

const STAR_COLORS: Record<number, string> = {
  5: '#22c55e', 4: '#84cc16', 3: '#eab308', 2: '#f97316', 1: '#ef4444'
};

const APP_COLORS = ['#f87171', '#60a5fa', '#34d399', '#fbbf24', '#a78bfa'];

const PRESETS = [
  { label: 'Rohlik vs. Kosik', platform: 'appstore' as const, country: 'cz', urls: ['https://apps.apple.com/cz/app/rohlik-cz/id1033157298', 'https://apps.apple.com/cz/app/kosik-cz/id1022137883'] },
  { label: 'Revolut vs. Wise', platform: 'appstore' as const, country: 'cz', urls: ['https://apps.apple.com/cz/app/revolut/id932493382', 'https://apps.apple.com/cz/app/wise/id612261027'] },
  { label: 'Albert vs. Kaufland', platform: 'googleplay' as const, country: 'cz', urls: ['https://play.google.com/store/apps/details?id=cz.albert.app', 'https://play.google.com/store/apps/details?id=com.kaufland.Kaufland'] },
];

function AppCard({ app, t }: { app: AppResult; t: any }) {
  if (app.error) return (
    <div className="card flex items-center justify-center min-h-40">
      <p className="text-red-400 text-sm text-center">{app.error}</p>
    </div>
  );
  return (
    <div className="card flex flex-col gap-3">
      <div className="flex items-start gap-3">
        {app.icon && <img src={app.icon} alt={app.name} className="w-14 h-14 rounded-xl shrink-0" />}
        <div className="min-w-0">
          <h3 className="font-bold text-sm leading-tight mb-0.5 truncate">{app.name}</h3>
          <p className="text-gray-500 text-xs truncate">{app.developer}</p>
          <p className="text-gray-600 text-xs mt-0.5">v{app.version}</p>
        </div>
      </div>
      <div className="border-t border-gray-800 pt-3">
        <div className="flex items-baseline gap-2 mb-1">
          <span className="text-3xl font-black gradient-text">{app.rating?.toFixed(2)}</span>
          <span className="text-gray-500 text-xs">/ 5.00</span>
        </div>
        <p className="text-gray-500 text-xs mb-2">{app.ratingCount?.toLocaleString()} {t('ratingTotal')}</p>
        {app.ratingCurrent != null && (
          <p className="text-gray-500 text-xs">{t('currentVersion')}: {app.ratingCurrent?.toFixed(2)} ({app.ratingCountCurrent?.toLocaleString()})</p>
        )}
      </div>
      <a href={app.url} target="_blank" rel="noopener noreferrer" className="mono-label text-red-400 hover:text-red-300 text-xs">{t('viewInStore')} ↗</a>
    </div>
  );
}

export default function AppComparePage() {
  const t = useTranslations('tools.appCompare');
  const [platform, setPlatform] = useState<'appstore' | 'googleplay'>('appstore');
  const [country, setCountry] = useState('cz');
  const [urls, setUrls] = useState<string[]>(['', '']);
  const [results, setResults] = useState<AppResult[]>([]);
  const [reviewData, setReviewData] = useState<ReviewData[]>([]);
  const [loading, setLoading] = useState(false);
  const [reviewsLoading, setReviewsLoading] = useState(false);
  const [error, setError] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [showDateFilter, setShowDateFilter] = useState(false);

  const addUrl = () => urls.length < 5 && setUrls([...urls, '']);
  const removeUrl = (i: number) => setUrls(urls.filter((_, j) => j !== i));
  const updateUrl = (i: number, v: string) => setUrls(urls.map((u, j) => j === i ? v : u));

  const compare = async () => {
    const filtered = urls.filter(u => u.trim());
    if (!filtered.length) return;
    setLoading(true);
    setError('');
    setResults([]);
    setReviewData([]);
    try {
      const res = await fetch('/api/app-info', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ platform, urls: filtered, country }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error ?? 'Chyba'); return; }
      setResults(data.apps);
    } catch {
      setError('Nepodařilo se načíst data.');
    } finally {
      setLoading(false);
    }
  };

  const loadReviews = async () => {
    const valid = results.filter(r => !r.error);
    if (!valid.length) return;
    setReviewsLoading(true);
    const all: ReviewData[] = [];
    for (const app of valid) {
      try {
        const res = await fetch('/api/app-reviews', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ platform, appId: app.appId, country }),
        });
        const data = await res.json();
        if (!data.error) all.push({ appId: app.appId, appName: app.name, reviews: data.reviews, trend: data.trend, total: data.total });
      } catch {}
    }
    setReviewData(all);
    setReviewsLoading(false);
  };

  const filterReviews = (reviews: any[]) => {
    return reviews.filter(r => {
      if (dateFrom && r.date < dateFrom) return false;
      if (dateTo && r.date > dateTo) return false;
      return true;
    });
  };

  const downloadStatsCSV = () => {
    const rows = [['Název', 'Vývojář', 'Hodnocení', 'Počet hodnocení', 'Verze', 'Platforma', 'URL']];
    results.filter(r => !r.error).forEach(r => {
      rows.push([r.name, r.developer, r.rating?.toFixed(2), String(r.ratingCount), r.version, r.platform, r.url]);
    });
    const csv = rows.map(r => r.map(c => `"${c}"`).join(',')).join('\n');
    const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `app-prehled-${country}.csv`;
    a.click();
  };

  const downloadReviewsCSV = (filtered: boolean) => {
    const rows = [['Aplikace', 'Datum', 'Hvězdičky', 'Nadpis', 'Text', 'Autor']];
    for (const rd of reviewData) {
      const reviews = filtered ? filterReviews(rd.reviews) : rd.reviews;
      for (const r of reviews) {
        rows.push([rd.appName, r.date, String(r.rating), r.title, r.text?.replace(/"/g, "'") ?? '', r.author]);
      }
    }
    const csv = rows.map(r => r.map(c => `"${c}"`).join(',')).join('\n');
    const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `recenze-${country}${filtered && (dateFrom || dateTo) ? '-filtrovane' : ''}.csv`;
    a.click();
  };

  const mergedTrend = reviewData.length > 0 ? (() => {
    const months = new Set<string>();
    reviewData.forEach(rd => rd.trend.forEach(t => months.add(t.month)));
    return Array.from(months).sort().map(month => {
      const point: any = { month };
      reviewData.forEach(rd => {
        const t = rd.trend.find(x => x.month === month);
        point[rd.appName] = t?.avg ?? null;
      });
      return point;
    });
  })() : [];

  return (
    <div className="bg-gradient-to-b from-primary to-secondary min-h-screen">
      <section className="relative overflow-hidden container pt-20 pb-8 text-center">
        <PageGlow />
        <p className="mono-label text-red-400 mb-4">Tools</p>
        <h1 className="text-5xl font-bold mb-4 gradient-text">{t('title')}</h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">{t('lead')}</p>
      </section>

      <section className="container max-w-4xl mx-auto pb-8">
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {[
            { n: '01', title: t('step1Title'), desc: t('step1Desc') },
            { n: '02', title: t('step2Title'), desc: t('step2Desc') },
            { n: '03', title: t('step3Title'), desc: t('step3Desc') },
          ].map(s => (
            <div key={s.n} className="border-t border-gray-700 pt-4">
              <p className="mono-label text-red-400 mb-2">{s.n}</p>
              <h3 className="font-bold mb-2">{s.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
        <div className="card mb-8">
          <h3 className="font-bold mb-2">{t('forWhoTitle')}</h3>
          <p className="text-gray-400 leading-relaxed mb-4">{t('forWho')}</p>
          <p className="text-gray-500 text-sm italic border-t border-gray-800 pt-4">{t('origin')}</p>
        </div>
      </section>
      <section className="container max-w-4xl mx-auto pb-16">
        <div className="card mb-6">
          <div className="flex gap-3 mb-4">
            {(['appstore', 'googleplay'] as const).map(p => (
              <button key={p} onClick={() => setPlatform(p)}
                className={`flex-1 py-2.5 px-4 rounded-lg font-medium text-sm transition-colors ${platform === p ? 'bg-red-400 text-white' : 'bg-gray-800 text-gray-400 hover:text-white'}`}>
                {p === 'appstore' ? 'App Store' : 'Google Play'}
              </button>
            ))}
          </div>

          <div className="flex gap-2 mb-4 flex-wrap">
            {COUNTRIES.map(c => (
              <button key={c.code} onClick={() => setCountry(c.code)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors ${country === c.code ? 'bg-red-400/20 text-red-400 border border-red-400/40' : 'bg-gray-800 text-gray-500 hover:text-gray-300'}`}>
                {c.label}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap gap-2 mb-4"><span className="text-xs text-gray-500 w-full">{t("presetsLabel")}:</span>{PRESETS.map(preset => (<button key={preset.label} onClick={() => { setPlatform(preset.platform); setCountry(preset.country); setUrls(preset.urls); }} className="px-3 py-1.5 bg-gray-800 text-gray-400 hover:text-red-400 rounded-lg text-xs transition-colors">{preset.label}</button>))}</div><div className="space-y-3 mb-4">
            {urls.map((url, i) => (
              <div key={i} className="flex gap-2">
                <input value={url} onChange={e => updateUrl(i, e.target.value)}
                  placeholder={platform === 'appstore' ? t('urlPlaceholderAppStore') : t('urlPlaceholderGPlay')}
                  className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-sm text-gray-200 placeholder-gray-600 focus:outline-none focus:border-red-400" />
                {urls.length > 1 && (
                  <button onClick={() => removeUrl(i)} className="px-3 text-gray-500 hover:text-red-400 transition-colors">✕</button>
                )}
              </div>
            ))}
          </div>

          <div className="flex gap-3">
            {urls.length < 5 && <button onClick={addUrl} className="btn-secondary text-sm">{t('addApp')}</button>}
            <button onClick={compare} disabled={loading} className="btn-primary flex-1">
              {loading ? t('comparing') : t('compare')}
            </button>
          </div>
          {error && <p className="mt-4 text-red-400 text-sm">{error}</p>}
        </div>

        {results.length > 0 && (
          <>
            <div className={`grid gap-4 mb-4 ${results.length === 1 ? 'grid-cols-1' : results.length === 2 ? 'grid-cols-2' : 'grid-cols-3'}`}>
              {results.map((app, i) => <AppCard key={i} app={app} t={t} />)}
            </div>

            {results.filter(r => !r.error).length > 1 && (
              <div className="card mb-4">
                <h3 className="mono-label text-red-400 mb-4">{t('comparisonTitle')}</h3>
                <div className="space-y-4">
                  {results.filter(r => !r.error).map((app, i) => (
                    <div key={i}>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium truncate max-w-xs">{app.name}</span>
                        <span className="mono-label" style={{ color: APP_COLORS[i] }}>{app.rating?.toFixed(2)}</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div className="h-2 rounded-full" style={{ width: `${(app.rating / 5) * 100}%`, backgroundColor: APP_COLORS[i] }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex gap-3 mb-6">
              <button onClick={loadReviews} disabled={reviewsLoading} className="btn-primary flex-1">
                {reviewsLoading ? t('loadingReviews') : t('loadReviews')}
              </button>
              <button onClick={downloadStatsCSV} className="btn-secondary">{t('downloadStats')}</button>
            </div>

            {reviewData.length > 0 && (
              <>
                <div className="card mb-4">
                  <h3 className="font-bold mb-1">{t('trendTitle')}</h3>
                  <p className="text-gray-500 text-sm mb-4">{t('trendDesc')}</p>
                  <ResponsiveContainer width="100%" height={280}>
                    <LineChart data={mergedTrend}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="month" tick={{ fill: '#6b7280', fontSize: 11 }} />
                      <YAxis domain={[1, 5]} tick={{ fill: '#6b7280', fontSize: 11 }} />
                      <Tooltip contentStyle={{ background: '#1f2937', border: '1px solid #374151', borderRadius: 8 }} />
                      <Legend />
                      {reviewData.map((rd, i) => (
                        <Line key={rd.appId} type="monotone" dataKey={rd.appName} stroke={APP_COLORS[i]} strokeWidth={2} dot={false} connectNulls />
                      ))}
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                {reviewData.map((rd, i) => (
                  <div key={rd.appId} className="card mb-4">
                    <h3 className="font-bold mb-1" style={{ color: APP_COLORS[i] }}>{rd.appName}</h3>
                    <p className="text-gray-500 text-sm mb-1">{t('barsTitle')}</p>
                    <p className="text-gray-600 text-xs mb-4">{t('barsDesc')}</p>
                    <p className="mono-label text-gray-500 text-xs mb-4">{rd.total} {t('totalReviews')} · {t('reviewsLimit')}</p>
                    <ResponsiveContainer width="100%" height={220}>
                      <BarChart data={rd.trend}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                        <XAxis dataKey="month" tick={{ fill: '#6b7280', fontSize: 10 }} />
                        <YAxis tick={{ fill: '#6b7280', fontSize: 10 }} />
                        <Tooltip contentStyle={{ background: '#1f2937', border: '1px solid #374151', borderRadius: 8 }} />
                        <Legend />
                        {[5,4,3,2,1].map(star => (
                          <Bar key={star} dataKey={(d: any) => d.stars?.[star] ?? 0} name={`${star} ${t('stars')}`} stackId="a" fill={STAR_COLORS[star]} />
                        ))}
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                ))}

                <div className="card mb-4">
                  <button onClick={() => setShowDateFilter(!showDateFilter)}
                    className="flex items-center gap-2 text-sm font-medium text-gray-300 hover:text-white transition-colors w-full text-left">
                    <span>{t('filterByDate')}</span>
                    <span className="text-gray-600">{showDateFilter ? '▲' : '▼'}</span>
                  </button>
                  {showDateFilter && (
                    <div className="flex gap-4 mt-4 flex-wrap">
                      <div>
                        <label className="text-xs text-gray-500 block mb-1">{t('filterFrom')}</label>
                        <input type="date" value={dateFrom} onChange={e => setDateFrom(e.target.value)}
                          className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-200 focus:outline-none focus:border-red-400" />
                      </div>
                      <div>
                        <label className="text-xs text-gray-500 block mb-1">{t('filterTo')}</label>
                        <input type="date" value={dateTo} onChange={e => setDateTo(e.target.value)}
                          className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-200 focus:outline-none focus:border-red-400" />
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex gap-3">
                  <button onClick={() => downloadReviewsCSV(false)} className="btn-secondary flex-1">{t('downloadReviews')}</button>
                  {(dateFrom || dateTo) && (
                    <button onClick={() => downloadReviewsCSV(true)} className="btn-primary flex-1">{t('downloadFiltered')}</button>
                  )}
                </div>
              </>
            )}
          </>
        )}
      </section>
      <section className="container max-w-4xl mx-auto pb-16">
        <div className="card text-center">
          <h3 className="text-xl font-bold mb-2">{t('ctaTitle')}</h3>
          <p className="text-gray-400 mb-6">{t('ctaDesc')}</p>
          <a href="/schedule-time" className="btn-primary inline-flex items-center gap-2">{t('ctaBtn')} →</a>
        </div>
      </section>
    </div>
  );
}

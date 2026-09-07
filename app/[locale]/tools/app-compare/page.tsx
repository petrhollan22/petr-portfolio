'use client';
import { useState } from 'react';
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

function AppCard({ app }: { app: AppResult }) {
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
        <p className="text-gray-500 text-xs mb-2">{app.ratingCount?.toLocaleString('cs')} hodnoceni celkem</p>
        {app.ratingCurrent != null && (
          <p className="text-gray-500 text-xs">Aktualni: {app.ratingCurrent?.toFixed(2)} ({app.ratingCountCurrent?.toLocaleString('cs')})</p>
        )}
      </div>
      <a href={app.url} target="_blank" rel="noopener noreferrer" className="mono-label text-red-400 hover:text-red-300 text-xs">Zobrazit v obchode</a>
    </div>
  );
}

export default function AppComparePage() {
  const [platform, setPlatform] = useState<'appstore' | 'googleplay'>('appstore');
  const [country, setCountry] = useState('cz');
  const [urls, setUrls] = useState<string[]>(['', '']);
  const [results, setResults] = useState<AppResult[]>([]);
  const [reviewData, setReviewData] = useState<ReviewData[]>([]);
  const [loading, setLoading] = useState(false);
  const [reviewsLoading, setReviewsLoading] = useState(false);
  const [error, setError] = useState('');

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
      setError('Nepodarilo se nacist data.');
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

  const downloadReviewsCSV = () => {
    const rows = [['App', 'Datum', 'Hvezdicky', 'Nadpis', 'Text', 'Autor']];
    for (const rd of reviewData) {
      for (const r of rd.reviews) {
        rows.push([rd.appName, r.date, r.rating, r.title, r.text?.replace(/"/g, "'"), r.author]);
      }
    }
    const csv = rows.map(r => r.map(c => `"${c}"`).join(',')).join('\n');
    const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `reviews-${country}.csv`;
    a.click();
  };

  const downloadStatsCSV = () => {
    const rows = [['Nazev', 'Vyvojar', 'Hodnoceni', 'Pocet hodnoceni', 'Verze', 'Platforma', 'URL']];
    results.filter(r => !r.error).forEach(r => {
      rows.push([r.name, r.developer, r.rating?.toFixed(2), String(r.ratingCount), r.version, r.platform, r.url]);
    });
    const csv = rows.map(r => r.map(c => `"${c}"`).join(',')).join('\n');
    const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `app-stats-${country}.csv`;
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
        point[rd.appName + '_count'] = t?.count ?? 0;
      });
      return point;
    });
  })() : [];

  const COLORS = ['#f87171', '#60a5fa', '#34d399', '#fbbf24', '#a78bfa'];

  const placeholder = platform === 'appstore'
    ? 'https://apps.apple.com/cz/app/muj-albert/id1487977886'
    : 'https://play.google.com/store/apps/details?id=cz.albert.app';

  return (
    <div className="bg-gradient-to-b from-primary to-secondary min-h-screen">
      <section className="relative overflow-hidden container pt-20 pb-8 text-center">
        <PageGlow />
        <p className="mono-label text-red-400 mb-4">Tools</p>
        <h1 className="text-5xl font-bold mb-4 gradient-text">Porovnani aplikaci</h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">Porovnej hodnoceni aplikaci z App Store nebo Google Play. Max 5 aplikaci najednou.</p>
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
          <div className="space-y-3 mb-4">
            {urls.map((url, i) => (
              <div key={i} className="flex gap-2">
                <input value={url} onChange={e => updateUrl(i, e.target.value)} placeholder={placeholder}
                  className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-sm text-gray-200 placeholder-gray-600 focus:outline-none focus:border-red-400" />
                {urls.length > 1 && (
                  <button onClick={() => removeUrl(i)} className="px-3 text-gray-500 hover:text-red-400 transition-colors">x</button>
                )}
              </div>
            ))}
          </div>
          <div className="flex gap-3">
            {urls.length < 5 && <button onClick={addUrl} className="btn-secondary text-sm">+ Pridat</button>}
            <button onClick={compare} disabled={loading} className="btn-primary flex-1">
              {loading ? 'Nacitam...' : 'Porovnat'}
            </button>
          </div>
          {error && <p className="mt-4 text-red-400 text-sm">{error}</p>}
        </div>

        {results.length > 0 && (
          <>
            <div className={`grid gap-4 mb-4 ${results.length === 1 ? 'grid-cols-1' : results.length === 2 ? 'grid-cols-2' : 'grid-cols-3'}`}>
              {results.map((app, i) => <AppCard key={i} app={app} />)}
            </div>

            {results.filter(r => !r.error).length > 1 && (
              <div className="card mb-4">
                <h3 className="mono-label text-red-400 mb-4">Porovnani hodnoceni</h3>
                <div className="space-y-4">
                  {results.filter(r => !r.error).map((app, i) => (
                    <div key={i}>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium truncate max-w-xs">{app.name}</span>
                        <span className="mono-label" style={{ color: COLORS[i] }}>{app.rating?.toFixed(2)}</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div className="h-2 rounded-full" style={{ width: `${(app.rating / 5) * 100}%`, backgroundColor: COLORS[i] }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex gap-3 mb-6">
              <button onClick={downloadStatsCSV} className="btn-secondary flex-1">Stahnout stats CSV</button>
              <button onClick={loadReviews} disabled={reviewsLoading} className="btn-primary flex-1">
                {reviewsLoading ? 'Nacitam recenze...' : 'Nacist recenze a trendy'}
              </button>
            </div>

            {reviewData.length > 0 && (
              <>
                <div className="card mb-4">
                  <h3 className="mono-label text-red-400 mb-1">Trend prumerneho hodnoceni</h3>
                  <p className="text-gray-500 text-xs mb-4">Prumerne hodnoceni po mesicich</p>
                  <ResponsiveContainer width="100%" height={280}>
                    <LineChart data={mergedTrend}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="month" tick={{ fill: '#6b7280', fontSize: 11 }} />
                      <YAxis domain={[1, 5]} tick={{ fill: '#6b7280', fontSize: 11 }} />
                      <Tooltip contentStyle={{ background: '#1f2937', border: '1px solid #374151', borderRadius: 8 }} />
                      <Legend />
                      {reviewData.map((rd, i) => (
                        <Line key={rd.appId} type="monotone" dataKey={rd.appName} stroke={COLORS[i]} strokeWidth={2} dot={false} connectNulls />
                      ))}
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                {reviewData.map((rd, i) => (
                  <div key={rd.appId} className="card mb-4">
                    <h3 className="mono-label mb-1" style={{ color: COLORS[i] }}>{rd.appName}</h3>
                    <p className="text-gray-500 text-xs mb-4">Pocet recenzi po mesicich a hvezdickach ({rd.total} celkem)</p>
                    <ResponsiveContainer width="100%" height={220}>
                      <BarChart data={rd.trend}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                        <XAxis dataKey="month" tick={{ fill: '#6b7280', fontSize: 10 }} />
                        <YAxis tick={{ fill: '#6b7280', fontSize: 10 }} />
                        <Tooltip contentStyle={{ background: '#1f2937', border: '1px solid #374151', borderRadius: 8 }} />
                        <Legend />
                        {[5,4,3,2,1].map(star => (
                          <Bar key={star} dataKey={(d: any) => d.stars?.[star] ?? 0} name={`${star} hvezdicek`} stackId="a" fill={STAR_COLORS[star]} />
                        ))}
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                ))}

                <button onClick={downloadReviewsCSV} className="btn-secondary w-full">Stahnout recenze CSV</button>
              </>
            )}
          </>
        )}
      </section>
    </div>
  );
}

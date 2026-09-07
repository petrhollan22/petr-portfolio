'use client';
import { useState } from 'react';
import PageGlow from '@/components/PageGlow';

type AppResult = {
  platform: string;
  appId: string;
  name: string;
  developer: string;
  rating: number;
  ratingCount: number;
  icon: string;
  url: string;
  error?: string;
};

function StarBar({ rating }: { rating: number }) {
  const pct = (rating / 5) * 100;
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 bg-gray-700 rounded-full h-2">
        <div className="bg-red-400 h-2 rounded-full" style={{ width: `${pct}%` }} />
      </div>
      <span className="mono-label text-gray-400 w-8">{rating?.toFixed(1)}</span>
    </div>
  );
}

export default function AppComparePage() {
  const [platform, setPlatform] = useState<'appstore' | 'googleplay'>('appstore');
  const [urls, setUrls] = useState<string[]>(['', '']);
  const [results, setResults] = useState<AppResult[]>([]);
  const [loading, setLoading] = useState(false);
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
    try {
      const res = await fetch('/api/app-info', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ platform, urls: filtered }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error ?? 'Chyba'); return; }
      setResults(data.apps);
    } catch {
      setError('Nepodařilo se nacist data.');
    } finally {
      setLoading(false);
    }
  };

  const downloadCSV = () => {
    const rows = [
      ['Nazev', 'Vyvojar', 'Hodnoceni', 'Pocet hodnoceni', 'URL'],
      ...results.filter(r => !r.error).map(r => [
        r.name, r.developer, r.rating?.toFixed(2), r.ratingCount, r.url
      ])
    ];
    const csv = rows.map(r => r.map(c => `"${c}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'app-compare.csv';
    a.click();
  };

  return (
    <div className="bg-gradient-to-b from-primary to-secondary min-h-screen">
      <section className="relative overflow-hidden container pt-20 pb-8 text-center">
        <PageGlow />
        <p className="mono-label text-red-400 mb-4">Tools</p>
        <h1 className="text-5xl font-bold mb-4 gradient-text">Porovnani aplikaci</h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          Porovnej hodnoceni aplikaci z App Store nebo Google Play. Max 5 aplikaci.
        </p>
      </section>

      <section className="container max-w-3xl mx-auto pb-16">
        <div className="card mb-6">
          <div className="flex gap-4 mb-6">
            {(['appstore', 'googleplay'] as const).map(p => (
              <button key={p} onClick={() => setPlatform(p)}
                className={`flex-1 py-3 px-4 rounded-lg font-medium transition-colors ${platform === p ? 'bg-red-400 text-white' : 'bg-gray-800 text-gray-400 hover:text-white'}`}>
                {p === 'appstore' ? 'App Store' : 'Google Play'}
              </button>
            ))}
          </div>

          <div className="space-y-3 mb-4">
            {urls.map((url, i) => (
              <div key={i} className="flex gap-2">
                <input
                  value={url}
                  onChange={e => updateUrl(i, e.target.value)}
                  placeholder={platform === 'appstore' ? 'https://apps.apple.com/cz/app/.../id123456' : 'https://play.google.com/store/apps/details?id=com.example'}
                  className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-sm text-gray-200 placeholder-gray-600 focus:outline-none focus:border-red-400"
                />
                {urls.length > 1 && (
                  <button onClick={() => removeUrl(i)} className="px-3 py-2 text-gray-500 hover:text-red-400 transition-colors">x</button>
                )}
              </div>
            ))}
          </div>

          <div className="flex gap-3">
            {urls.length < 5 && (
              <button onClick={addUrl} className="btn-secondary text-sm">+ Pridat aplikaci</button>
            )}
            <button onClick={compare} disabled={loading} className="btn-primary flex-1">
              {loading ? 'Nacitam...' : 'Porovnat'}
            </button>
          </div>

          {error && <p className="mt-4 text-red-400 text-sm">{error}</p>}
        </div>

        {results.length > 0 && (
          <>
            <div className="grid gap-4 mb-4" style={{ gridTemplateColumns: `repeat(${Math.min(results.length, 3)}, 1fr)` }}>
              {results.map((app, i) => (
                <div key={i} className="card">
                  {app.error ? (
                    <p className="text-red-400 text-sm">{app.error}</p>
                  ) : (
                    <>
                      {app.icon && <img src={app.icon} alt={app.name} className="w-16 h-16 rounded-2xl mb-3" />}
                      <h3 className="font-bold mb-1">{app.name}</h3>
                      <p className="text-gray-500 text-sm mb-3">{app.developer}</p>
                      <StarBar rating={app.rating} />
                      <p className="text-gray-500 text-xs mt-2">{app.ratingCount?.toLocaleString('cs')} hodnoceni</p>
                      <a href={app.url} target="_blank" rel="noopener noreferrer"
                        className="mono-label text-red-400 hover:text-red-300 text-xs mt-3 block">Zobrazit</a>
                    </>
                  )}
                </div>
              ))}
            </div>
            <button onClick={downloadCSV} className="btn-secondary w-full">Stahnout CSV</button>
          </>
        )}
      </section>
    </div>
  );
}

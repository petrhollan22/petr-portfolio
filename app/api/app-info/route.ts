import { NextRequest, NextResponse } from 'next/server';

const RATE_LIMIT = new Map<string, { count: number; reset: number }>();
const MAX_REQUESTS = 10;
const WINDOW_MS = 60 * 60 * 1000; // 1 hodina

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = RATE_LIMIT.get(ip);
  if (!entry || now > entry.reset) {
    RATE_LIMIT.set(ip, { count: 1, reset: now + WINDOW_MS });
    return true;
  }
  if (entry.count >= MAX_REQUESTS) return false;
  entry.count++;
  return true;
}

async function fetchAppStore(appId: string, country: string) {
  const res = await fetch(`https://itunes.apple.com/lookup?id=${appId}&country=${country}`, { next: { revalidate: 3600 } });
  const data = await res.json();
  if (!data.results?.length) throw new Error('App nenalezena');
  const r = data.results[0];
  return {
    platform: 'appstore',
    appId,
    name: r.trackName,
    developer: r.artistName,
    rating: r.averageUserRating,
    ratingCount: r.userRatingCount,
    ratingCurrent: r.averageUserRatingForCurrentVersion,
    ratingCountCurrent: r.userRatingCountForCurrentVersion,
    version: r.version,
    icon: r.artworkUrl100,
    url: r.trackViewUrl,
  };
}

async function fetchGooglePlay(packageId: string) {
  const gplay = require('google-play-scraper');
  const info = await gplay.app({ appId: packageId, lang: 'cs', country: 'cz' });
  return {
    platform: 'googleplay',
    appId: packageId,
    name: info.title,
    developer: info.developer,
    rating: info.score,
    ratingCount: info.ratings,
    ratingCurrent: null,
    ratingCountCurrent: null,
    version: info.version,
    icon: info.icon,
    url: info.url,
  };
}

function parseAppStoreId(url: string): string | null {
  const match = url.match(/id(\d+)/);
  return match ? match[1] : /^\d+$/.test(url) ? url : null;
}

function parseGooglePlayId(url: string): string | null {
  const match = url.match(/id=([a-zA-Z0-9._]+)/);
  if (match) return match[1];
  if (/^[a-zA-Z][a-zA-Z0-9._]*$/.test(url)) return url;
  return null;
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for') ?? 'unknown';
  if (!checkRateLimit(ip)) {
    return NextResponse.json({ error: 'Příliš mnoho požadavků. Zkus to za hodinu.' }, { status: 429 });
  }

  const { platform, urls } = await req.json();
  if (!platform || !urls?.length) {
    return NextResponse.json({ error: 'Chybí parametry' }, { status: 400 });
  }
  if (urls.length > 5) {
    return NextResponse.json({ error: 'Maximálně 5 aplikací najednou' }, { status: 400 });
  }

  const results = await Promise.allSettled(
    urls.map(async (url: string) => {
      if (platform === 'appstore') {
        const id = parseAppStoreId(url);
        if (!id) throw new Error(`Nepodařilo se načíst App ID z: ${url}`);
        return fetchAppStore(id, 'cz');
      } else {
        const id = parseGooglePlayId(url);
        if (!id) throw new Error(`Nepodařilo se načíst Package ID z: ${url}`);
        return fetchGooglePlay(id);
      }
    })
  );

  const apps = results.map((r, i) =>
    r.status === 'fulfilled' ? r.value : { error: r.reason?.message ?? 'Chyba', url: urls[i] }
  );

  return NextResponse.json({ apps });
}

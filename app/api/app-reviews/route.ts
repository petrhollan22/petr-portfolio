import { NextRequest, NextResponse } from 'next/server';

const RATE_LIMIT = new Map<string, { count: number; reset: number }>();
function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = RATE_LIMIT.get(ip);
  if (!entry || now > entry.reset) {
    RATE_LIMIT.set(ip, { count: 1, reset: now + 3600000 });
    return true;
  }
  if (entry.count >= 5) return false;
  entry.count++;
  return true;
}

async function fetchAppStoreReviews(appId: string, country: string) {
  const reviews: any[] = [];
  for (let page = 1; page <= 10; page++) {
    const res = await fetch(
      `https://itunes.apple.com/${country}/rss/customerreviews/id=${appId}/sortBy=mostRecent/page=${page}/json`,
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) break;
    const data = await res.json();
    const entries = data?.feed?.entry ?? [];
    if (entries.length <= 1) break;
    for (const e of entries.slice(1)) {
      const date = e?.updated?.label?.substring(0, 10);
      const rating = parseInt(e?.['im:rating']?.label ?? '0');
      const title = e?.title?.label ?? '';
      const text = e?.content?.label ?? '';
      const author = e?.author?.name?.label ?? '';
      if (date && rating) reviews.push({ date, rating, title, text, author });
    }
    await new Promise(r => setTimeout(r, 100));
  }
  return reviews;
}

async function fetchGooglePlayReviews(packageId: string, country: string) {
  const gplay = require('google-play-scraper');
  const reviews: any[] = [];
  let token: any = null;
  let fetched = 0;
  while (fetched < 500) {
    try {
      const [batch, nextToken] = await gplay.reviews({
        appId: packageId, lang: 'cs', country, sort: gplay.sort.NEWEST,
        count: 100, paginate: true, nextPaginationToken: token,
      });
      if (!batch?.length) break;
      for (const r of batch) {
        const date = r.date ? new Date(r.date).toISOString().substring(0, 10) : null;
        if (date && r.score) reviews.push({ date, rating: r.score, title: '', text: r.text ?? '', author: r.userName ?? '' });
      }
      fetched += batch.length;
      token = nextToken;
      if (!token) break;
    } catch { break; }
  }
  return reviews;
}

function buildTrend(reviews: any[]) {
  const byMonth: Record<string, { sum: number; count: number; stars: Record<number, number> }> = {};
  for (const r of reviews) {
    const month = r.date?.substring(0, 7);
    if (!month) continue;
    if (!byMonth[month]) byMonth[month] = { sum: 0, count: 0, stars: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 } };
    byMonth[month].sum += r.rating;
    byMonth[month].count++;
    byMonth[month].stars[r.rating] = (byMonth[month].stars[r.rating] ?? 0) + 1;
  }
  return Object.entries(byMonth)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([month, d]) => ({
      month,
      avg: parseFloat((d.sum / d.count).toFixed(2)),
      count: d.count,
      stars: d.stars,
    }));
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for') ?? 'unknown';
  if (!checkRateLimit(ip)) {
    return NextResponse.json({ error: 'Prilis mnoho pozadavku.' }, { status: 429 });
  }
  const { platform, appId, country = 'cz' } = await req.json();
  if (!platform || !appId) {
    return NextResponse.json({ error: 'Chybi parametry' }, { status: 400 });
  }
  try {
    const reviews = platform === 'appstore'
      ? await fetchAppStoreReviews(appId, country)
      : await fetchGooglePlayReviews(appId, country);
    const trend = buildTrend(reviews);
    return NextResponse.json({ reviews, trend, total: reviews.length });
  } catch (e: any) {
    return NextResponse.json({ error: e.message ?? 'Chyba' }, { status: 500 });
  }
}

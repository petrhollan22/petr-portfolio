import { NextRequest, NextResponse } from 'next/server';
import { client } from '@/sanity/client';
import { writeClient } from '@/sanity/writeClient';
import { siteUrl } from '@/lib/site';

export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get('token');
  if (token !== process.env.CRON_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }

  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();

  const approved = await client.fetch(
    `*[_type == "inspirationTip" && submittedAt >= $since && approved == true && usedInDigest != true] | order(submittedAt desc)`,
    { since: sevenDaysAgo }
  );

  if (approved.length === 0) {
    return new NextResponse(
      '<html><body style="font-family:sans-serif;background:#0a0a0a;color:#fff;text-align:center;padding:60px 20px;"><h2>Žádné schválené tipy</h2><p>Nejdřív klikni na „Zahrnout" u aspoň jednoho tipu.</p></body></html>',
      { headers: { 'Content-Type': 'text/html; charset=utf-8' } }
    );
  }

  const grouped = new Map<string, any[]>();
  for (const tip of approved) {
    const key = `${tip.category}:${tip.name.toLowerCase().trim()}`;
    if (!grouped.has(key)) grouped.set(key, []);
    grouped.get(key)!.push(tip);
  }

  const merged = Array.from(grouped.values()).map((group) => {
    const first = group[0];
    const count = group.length;
    const whyTexts = group.map((t) => t.why).filter(Boolean);
    return {
      ...first,
      count,
      why: whyTexts.length > 0 ? whyTexts.join(' · ') : first.why,
    };
  });

  const introBlock = {
    _type: 'block',
    style: 'normal',
    children: [
      {
        _type: 'span',
        text: `Tento týden jsem dostal ${approved.length} tip${approved.length === 1 ? '' : approved.length < 5 ? 'y' : 'ů'} a vybral jsem tyto:`,
      },
    ],
  };

  const bodyBlocks = [introBlock, ...merged.flatMap((tip: any) => [
    {
      _type: 'categoryBadge',
      category: tip.category,
      itemName: tip.name,
      count: tip.count,
    },
    {
      _type: 'block',
      style: 'normal',
      children: [
        { _type: 'span', text: tip.why || 'Bez dalšího komentáře od odesílatele.' },
      ],
    },
    ...(tip.link
      ? [{
          _type: 'block',
          style: 'normal',
          children: [{ _type: 'span', text: tip.link, marks: ['link'] }],
          markDefs: [{ _key: 'link', _type: 'link', href: tip.link }],
        }]
      : []),
  ])];

  const today = new Date().toISOString().split('T')[0];
  const draftId = `drafts.tydenni-souhrn-${today}`;

  const draft = await writeClient.createIfNotExists({
    _id: draftId,
    _type: 'post',
    title: `Tipy od vás — týdenní souhrn (${today})`,
    slug: { current: `tydenni-souhrn-${today}` },
    excerpt: 'Vybrané tipy, které mi lidé poslali přes stránku Inspirace tento týden.',
    publishedAt: new Date().toISOString(),
    body: bodyBlocks,
  });

  for (const tip of approved) {
    await writeClient.patch(tip._id).set({ usedInDigest: true }).commit();
  }

  const publishUrl = `${siteUrl}/api/publish-digest?id=${draft._id}&token=${process.env.CRON_SECRET}`;
  const webhookUrl = process.env.DISCORD_WEBHOOK_URL;

  if (webhookUrl) {
    await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        content: '📰 **Koncept sestaven**',
        embeds: [{
          color: 15548997,
          fields: [
            { name: 'Titulek', value: draft.title as string, inline: false },
            { name: 'Počet tipů', value: String(approved.length), inline: true },
            { name: '📤 Publikovat', value: `[Klikni pro publikaci](${publishUrl})`, inline: false },
          ],
        }],
      }),
    }).catch((err) => console.error('Discord notify error:', err));
  }

  return new NextResponse(
    `<html><body style="font-family:sans-serif;background:#0a0a0a;color:#fff;text-align:center;padding:60px 20px;"><h2>✅ Koncept sestaven</h2><p>${approved.length} tipů zahrnuto. Odkaz na publikaci ti přišel do Discordu.</p></body></html>`,
    { headers: { 'Content-Type': 'text/html; charset=utf-8' } }
  );
}

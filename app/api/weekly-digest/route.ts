import { NextRequest, NextResponse } from 'next/server';
import { client } from '@/sanity/client';
import { writeClient } from '@/sanity/writeClient';
import { siteUrl } from '@/lib/site';

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();

  const tips = await client.fetch(
    `*[_type == "inspirationTip" && submittedAt >= $since && usedInDigest != true] | order(submittedAt desc)`,
    { since: sevenDaysAgo }
  );

  if (tips.length === 0) {
    return NextResponse.json({ message: 'No new tips this week' });
  }

  const byCategory = new Map<string, any>();
  for (const tip of tips) {
    if (!byCategory.has(tip.category)) {
      byCategory.set(tip.category, tip);
    }
  }
  const selected = Array.from(byCategory.values());

  const bodyBlocks = selected.flatMap((tip) => [
    {
      _type: 'block',
      style: 'h3',
      children: [{ _type: 'span', text: `${tip.category}: ${tip.name}` }],
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
  ]);

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

  for (const tip of selected) {
    await writeClient.patch(tip._id).set({ usedInDigest: true }).commit();
  }

  const publishUrl = `${siteUrl}/api/publish-digest?id=${draft._id}&token=${process.env.CRON_SECRET}`;
  const webhookUrl = process.env.DISCORD_WEBHOOK_URL;

  if (webhookUrl) {
    await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        content: '📰 **Nový týdenní souhrn čeká na publikaci**',
        embeds: [{
          color: 15548997,
          fields: [
            { name: 'Titulek', value: draft.title as string, inline: false },
            { name: 'Počet tipů', value: String(selected.length), inline: true },
            { name: '📤 Publikovat', value: `[Klikni pro publikaci](${publishUrl})`, inline: false },
          ],
        }],
      }),
    }).catch((err) => console.error('Discord notify error:', err));
  }

  return NextResponse.json({
    message: 'Draft created — waiting for review in Studio',
    draftId: draft._id,
    tipsUsed: selected.length,
  });
}

import { NextRequest, NextResponse } from 'next/server';
import { client } from '@/sanity/client';
import { siteUrl } from '@/lib/site';
import { signTipAction } from '@/lib/tipToken';

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

  const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
  if (!webhookUrl) {
    return NextResponse.json({ error: 'Discord webhook not configured' }, { status: 500 });
  }

  const fields = tips.map((tip: any) => {
    const approveUrl = `${siteUrl}/api/approve-tip?token=${signTipAction(tip._id, 'approve')}`;
    const lines = [
      `**${tip.category}:** ${tip.name}`,
      tip.why ? tip.why : null,
      tip.link ? tip.link : null,
      `[✅ Zahrnout do souhrnu](${approveUrl})`,
    ].filter(Boolean);
    return { name: '\u200b', value: lines.join('\n'), inline: false };
  });

  const buildUrl = `${siteUrl}/api/build-digest?token=${process.env.CRON_SECRET}`;
  fields.push({
    name: '\u200b',
    value: `**📝 [Sestavit článek ze schválených tipů](${buildUrl})**\n(klikni až budeš hotový s výběrem)`,
    inline: false,
  });

  await fetch(webhookUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      content: `💡 **Týdenní přehled tipů (${tips.length})**`,
      embeds: [{ color: 15548997, fields }],
    }),
  }).catch((err) => console.error('Discord notify error:', err));

  return NextResponse.json({ message: 'Weekly overview sent to Discord', tipsCount: tips.length });
}

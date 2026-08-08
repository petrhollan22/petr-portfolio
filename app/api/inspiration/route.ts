import { NextRequest, NextResponse } from 'next/server';
import { writeClient } from '@/sanity/writeClient';
import { verifyTurnstile } from '@/lib/verifyTurnstile';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { category, name, link, why, from } = body;

    const human = await verifyTurnstile(body.turnstileToken);
    if (!human) {
      return NextResponse.json({ error: 'Verification failed' }, { status: 403 });
    }

    if (!category || !name) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
    if (!webhookUrl) {
      console.error('DISCORD_WEBHOOK_URL not configured');
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }

    const fields = [
      { name: 'Kategorie', value: String(category), inline: true },
      { name: 'Název', value: String(name), inline: true },
    ];
    if (link) fields.push({ name: 'Odkaz', value: String(link), inline: false });
    if (why) fields.push({ name: 'Proč', value: String(why), inline: false });
    if (from) fields.push({ name: 'Od', value: String(from), inline: true });

    try {
      await writeClient.create({
        _type: 'inspirationTip',
        category,
        name,
        link: link || undefined,
        why: why || undefined,
        from: from || undefined,
        submittedAt: new Date().toISOString(),
        usedInDigest: false,
      });
    } catch (sanityError) {
      console.error('Sanity write error:', sanityError);
    }

    const res = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        content: '💡 **Nový tip na inspiraci**',
        embeds: [{ color: 16309772, fields, timestamp: new Date().toISOString() }],
      }),
    });

    if (!res.ok) throw new Error(`Discord API error: ${res.statusText}`);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Inspiration API error:', error);
    return NextResponse.json({ error: 'Failed to process request' }, { status: 500 });
  }
}

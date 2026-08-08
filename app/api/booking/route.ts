import { NextRequest, NextResponse } from 'next/server';
import { verifyTurnstile } from '@/lib/verifyTurnstile';
import { signBooking } from '@/lib/bookingToken';
import { siteUrl } from '@/lib/site';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, type, service, date, time, duration, message } = body;

    const human = await verifyTurnstile(body.turnstileToken);
    if (!human) {
      return NextResponse.json({ error: 'Verification failed' }, { status: 403 });
    }

    // Validate inputs
    if (!name || !email || !type || !service || !date || !time || !duration) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Get Discord webhook URL from environment
    const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
    if (!webhookUrl) {
      console.error('DISCORD_WEBHOOK_URL not configured');
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      );
    }

    // Format date and time nicely
    const bookingDate = new Date(date);
    const formattedDate = bookingDate.toLocaleDateString('cs-CZ', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long',
    });

    const typeLabel = type === 'work' ? '💼 Pracovní aktivita' : '⚽ Sportovní aktivita';

    const confirmToken = signBooking({ name, email, service, date: formattedDate, time });
    const confirmUrl = `${siteUrl}/api/confirm-booking?token=${confirmToken}`;

    // Format message for Discord
    const discordMessage = {
      content: '📅 **Nová rezervace času**',
      embeds: [{
        color: 6459775, // Green-ish
        fields: [
          { name: 'Typ', value: typeLabel, inline: true },
          { name: 'Služba/Aktivita', value: service, inline: true },
          { name: 'Jméno', value: name, inline: true },
          { name: 'Email', value: `[${email}](mailto:${email})`, inline: true },
          { name: 'Datum', value: formattedDate, inline: true },
          { name: 'Čas', value: time, inline: true },
          { name: 'Délka', value: `${duration} minut`, inline: true },
          {
            name: 'Poznámka',
            value: message || 'Žádná poznámka',
            inline: false,
          },
          {
            name: '✅ Potvrdit rezervaci',
            value: `[Klikni pro potvrzení](${confirmUrl})`,
            inline: false,
          },
        ],
        timestamp: new Date().toISOString(),
      }],
    };

    // Send to Discord
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(discordMessage),
    });

    if (!response.ok) {
      throw new Error(`Discord API error: ${response.statusText}`);
    }

    return NextResponse.json(
      { success: true, message: 'Booking sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Booking API error:', error);
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { name, email, type, service, date, time, duration, message } = await request.json();

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

    const typeLabel = type === 'work' ? '💼 Pracovní služba' : '⚽ Sportovní aktivita';

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

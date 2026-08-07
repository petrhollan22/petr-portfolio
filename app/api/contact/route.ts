import { NextRequest, NextResponse } from 'next/server';
import { verifyTurnstile } from '@/lib/verifyTurnstile';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, service, message } = body;

    const human = await verifyTurnstile(body.turnstileToken);
    if (!human) {
      return NextResponse.json({ error: 'Verification failed' }, { status: 403 });
    }

    // Validate inputs
    if (!name || !email || !message) {
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

    // Format message for Discord
    const discordMessage = {
      content: '📬 **Nová zpráva z kontaktního formuláře**',
      embeds: [{
        color: 9370927, // Purple
        fields: [
          { name: 'Jméno', value: name, inline: true },
          { name: 'Email', value: `[${email}](mailto:${email})`, inline: true },
          { name: 'Služba', value: service || 'Nespecifikováno', inline: true },
          { name: 'Zpráva', value: message, inline: false },
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
      { success: true, message: 'Message sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact API error:', error);
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
}

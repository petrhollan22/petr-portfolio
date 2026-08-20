import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { verifyBooking } from '@/lib/bookingToken';

export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get('token');

  if (!token) {
    return NextResponse.json({ error: 'Missing token' }, { status: 400 });
  }

  const booking = verifyBooking(token);
  if (!booking) {
    return NextResponse.json({ error: 'Invalid or tampered token' }, { status: 403 });
  }

  const resendKey = process.env.RESEND_API_KEY;
  if (!resendKey) {
    return NextResponse.json({ error: 'Email service not configured' }, { status: 500 });
  }

  const resend = new Resend(resendKey);

  try {
    await resend.emails.send({
      from: 'Petr Hollan <petr@send.hollan.cz>',
      to: booking.email,
      subject: 'Rezervace potvrzena',
      html: `
        <p>Dobrý den ${booking.name},</p>
        <p>Vaše rezervace byla potvrzena:</p>
        <ul>
          <li><strong>Služba:</strong> ${booking.service}</li>
          <li><strong>Datum:</strong> ${booking.date}</li>
          <li><strong>Čas:</strong> ${booking.time}</li>
        </ul>
        <p>Těším se na setkání.</p>
        <p>Petr</p>
      `,
    });

    return NextResponse.redirect(new URL('/cs/schedule-time?confirmed=1', request.url));
  } catch (error) {
    console.error('Resend error:', error);
    return NextResponse.json({ error: 'Failed to send confirmation email' }, { status: 500 });
  }
}

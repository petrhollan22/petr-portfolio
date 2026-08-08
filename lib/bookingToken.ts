import { createHmac } from 'crypto';

interface BookingPayload {
  name: string;
  email: string;
  service: string;
  date: string;
  time: string;
}

function getSecret(): string {
  const secret = process.env.BOOKING_CONFIRM_SECRET;
  if (!secret) throw new Error('BOOKING_CONFIRM_SECRET not configured');
  return secret;
}

export function signBooking(data: BookingPayload): string {
  const payload = Buffer.from(JSON.stringify(data)).toString('base64url');
  const signature = createHmac('sha256', getSecret()).update(payload).digest('base64url');
  return `${payload}.${signature}`;
}

export function verifyBooking(token: string): BookingPayload | null {
  const [payload, signature] = token.split('.');
  if (!payload || !signature) return null;

  const expected = createHmac('sha256', getSecret()).update(payload).digest('base64url');
  if (signature !== expected) return null;

  try {
    return JSON.parse(Buffer.from(payload, 'base64url').toString());
  } catch {
    return null;
  }
}

import { createHmac } from 'crypto';

export function signTipAction(tipId: string, action: string): string {
  const payload = Buffer.from(`${tipId}:${action}`).toString('base64url');
  const secret = process.env.CRON_SECRET;
  if (!secret) throw new Error('CRON_SECRET not configured');
  const signature = createHmac('sha256', secret).update(payload).digest('base64url');
  return `${payload}.${signature}`;
}

export function verifyTipAction(token: string): { tipId: string; action: string } | null {
  const [payload, signature] = token.split('.');
  if (!payload || !signature) return null;

  const secret = process.env.CRON_SECRET;
  if (!secret) return null;

  const expected = createHmac('sha256', secret).update(payload).digest('base64url');
  if (signature !== expected) return null;

  const decoded = Buffer.from(payload, 'base64url').toString();
  const [tipId, action] = decoded.split(':');
  if (!tipId || !action) return null;

  return { tipId, action };
}

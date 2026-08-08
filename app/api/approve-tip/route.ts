import { NextRequest, NextResponse } from 'next/server';
import { writeClient } from '@/sanity/writeClient';
import { verifyTipAction } from '@/lib/tipToken';

export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get('token');
  if (!token) {
    return NextResponse.json({ error: 'Missing token' }, { status: 400 });
  }

  const parsed = verifyTipAction(token);
  if (!parsed || parsed.action !== 'approve') {
    return NextResponse.json({ error: 'Invalid or tampered token' }, { status: 403 });
  }

  try {
    await writeClient.patch(parsed.tipId).set({ approved: true }).commit();
    return new NextResponse(
      '<html><body style="font-family:sans-serif;background:#0a0a0a;color:#fff;text-align:center;padding:60px 20px;"><h2>✅ Tip zahrnut</h2><p>Můžeš zavřít tuhle stránku.</p></body></html>',
      { headers: { 'Content-Type': 'text/html; charset=utf-8' } }
    );
  } catch (error) {
    console.error('Approve tip error:', error);
    return NextResponse.json({ error: 'Failed to approve tip' }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from 'next/server';
import { writeClient } from '@/sanity/writeClient';

export async function GET(request: NextRequest) {
  const draftId = request.nextUrl.searchParams.get('id');
  const token = request.nextUrl.searchParams.get('token');

  if (!draftId || !token) {
    return NextResponse.json({ error: 'Missing parameters' }, { status: 400 });
  }

  if (token !== process.env.CRON_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }

  if (!draftId.startsWith('drafts.')) {
    return NextResponse.json({ error: 'Not a draft ID' }, { status: 400 });
  }

  const publishedId = draftId.replace('drafts.', '');

  try {
    const draftDoc = await writeClient.getDocument(draftId);
    if (!draftDoc) {
      return NextResponse.json({ error: 'Draft not found (already published?)' }, { status: 404 });
    }

    await writeClient
      .transaction()
      .createOrReplace({ ...draftDoc, _id: publishedId })
      .delete(draftId)
      .commit();

    return NextResponse.redirect(new URL('/cs/blog', request.url));
  } catch (error) {
    console.error('Publish error:', error);
    return NextResponse.json({ error: 'Failed to publish' }, { status: 500 });
  }
}

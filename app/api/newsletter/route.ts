import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SECRET_KEY!
);

export async function POST(req: NextRequest) {
  const { email, name } = await req.json();

  if (!email || !email.includes('@')) {
    return NextResponse.json({ error: 'Neplatný email.' }, { status: 400 });
  }

  const { error } = await supabase
    .from('subscribers')
    .insert({ email: email.trim().toLowerCase(), name: name?.trim() || null });

  if (error) {
    if (error.code === '23505') {
      return NextResponse.json({ error: 'Tento email je už přihlášen.' }, { status: 409 });
    }
    return NextResponse.json({ error: 'Něco se pokazilo.' }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}

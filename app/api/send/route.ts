import { supabase } from "@/lib/supabase";
import { buildIcs } from "@/lib/ics";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);
const BASE = process.env.NEXT_PUBLIC_BASE_URL!;

export async function POST(req: Request) {
  if (req.headers.get("authorization") !== `Bearer ${process.env.SEND_SECRET}`) {
    return Response.json({ ok: false, error: "unauthorized", serverLen: (process.env.SEND_SECRET || "").length }, { status: 401 });
  }

  const { eventId, testEmail } = await req.json();

  const { data: ev } = await supabase.from("events").select("*").eq("id", eventId).single();
  if (!ev) return Response.json({ ok: false, error: "event not found" }, { status: 404 });

  const { data: invites } = await supabase
    .from("invitations")
    .select("id, token, people(full_name, email, unsubscribed_at, unsubscribe_token)")
    .eq("event_id", eventId)
    .is("sent_at", null);

  if (!invites?.length) return Response.json({ ok: true, sent: 0, note: "nic k odeslani" });

  const kdy = new Date(ev.starts_at).toLocaleString("cs-CZ", {
    weekday: "long", day: "numeric", month: "numeric",
    hour: "2-digit", minute: "2-digit", timeZone: "Europe/Prague",
  });

  const ics = Buffer.from(buildIcs(ev)).toString("base64");
  const results: string[] = [];

  for (const inv of invites) {
    const p = inv.people as any;
    if (!p?.email || p.unsubscribed_at) continue;
    if (testEmail && p.email !== testEmail) continue;

    const link = `${BASE}/rsvp/${inv.token}`;
    const unsub = `${BASE}/unsubscribe/${p.unsubscribe_token}`;

    const html = `
      <div style="font-family:system-ui;max-width:520px;line-height:1.6">
        <p>Ahoj ${p.full_name},</p>
        <p>rozhodl jsem se trochu automatizovat zvaní lidí na akce, tak to budu občas sekat přes maily.</p>
        <p><strong>${ev.activity}</strong><br>${kdy}${ev.place ? `<br>${ev.place}` : ""}</p>
        <p style="margin:24px 0">
          <a href="${link}" style="background:#16a34a;color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none">Odpovědět jedním klikem</a>
        </p>
        <p>Díky tomu mi nikdo nezapadne a nebude existovat „tys mě nepozval".</p>
        <p>Měj se hezky,<br>Petr</p>
        <p style="font-size:12px;color:#888">Nechceš tyhle maily? <a href="${unsub}">Odhlásit se</a></p>
      </div>`;

    const { error } = await resend.emails.send({
      from: "Petr <onboarding@resend.dev>",
      to: p.email,
      subject: `${ev.activity} — dorazíš?`,
      html,
      attachments: [{ filename: "akce.ics", content: ics }],
    });

    if (error) { results.push(`${p.email}: ${error.message}`); continue; }

    await supabase.from("invitations").update({ sent_at: new Date().toISOString() }).eq("id", inv.id);
    results.push(`${p.email}: ok`);
  }

  return Response.json({ ok: true, results });
}

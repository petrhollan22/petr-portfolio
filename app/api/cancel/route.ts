import { supabase } from "@/lib/supabase";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);
const BASE = process.env.NEXT_PUBLIC_BASE_URL!;

export async function POST(req: Request) {
  if (req.headers.get("authorization") !== `Bearer ${process.env.SEND_SECRET}`) {
    return Response.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }

  const { eventId } = await req.json();

  const { data: ev } = await supabase.from("events").select("*").eq("id", eventId).single();
  if (!ev) return Response.json({ ok: false, error: "event not found" }, { status: 404 });

  const { data: invites } = await supabase
    .from("invitations")
    .select("id, people(full_name, email, unsubscribed_at, unsubscribe_token)")
    .eq("event_id", eventId)
    .in("status", ["yes", "maybe"]);

  if (!invites?.length) return Response.json({ ok: true, sent: 0, note: "nikdo nepotvrdil" });

  const kdy = new Date(ev.starts_at).toLocaleString("cs-CZ", {
    weekday: "long", day: "numeric", month: "numeric",
    hour: "2-digit", minute: "2-digit", timeZone: "Europe/Prague",
  });

  const results: string[] = [];
  let first = true;

  for (const inv of invites) {
    const p = inv.people as any;
    if (!p?.email || p.unsubscribed_at) continue;

    if (!first) await new Promise((r) => setTimeout(r, 150));
    first = false;

    const unsub = `${BASE}/unsubscribe/${p.unsubscribe_token}`;

    const html = `
      <div style="font-family:system-ui;max-width:520px;line-height:1.6">
        <p>Ahoj ${p.full_name},</p>
        <p>bohužel ruším akci <strong>${ev.activity}</strong> (${kdy}${ev.place ? `, ${ev.place}` : ""}).</p>
        <p>Omlouvám se za komplikace, ozvu se s dalším termínem.</p>
        <p>Měj se hezky,<br>Petr</p>
        <p style="font-size:12px;color:#888">Nechceš tyhle maily? <a href="${unsub}">Odhlásit se</a></p>
      </div>`;

    const { error } = await resend.emails.send({
      from: "Petr <onboarding@resend.dev>",
      to: p.email,
      subject: `Zrušeno: ${ev.activity}`,
      html,
    });

    results.push(`${p.email}: ${error ? error.message : "ok"}`);
  }

  return Response.json({ ok: true, results });
}

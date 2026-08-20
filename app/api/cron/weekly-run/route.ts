import { supabase } from "@/lib/supabase";

const GROUP = "beh";
const TEMPLATE = "beh";

export async function GET(req: Request) {
  if (req.headers.get("authorization") !== `Bearer ${process.env.CRON_SECRET}`) {
    return Response.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }

  const { data: t } = await supabase
    .from("event_templates").select("*").eq("name", TEMPLATE).single();
  if (!t) return Response.json({ ok: false, error: "sablona nenalezena" }, { status: 404 });

  // nejblizsi pondeli 18:00 praskeho casu -> 16:00 UTC (letni cas)
  const now = new Date();
  const day = now.getUTCDay();
  const add = (8 - day) % 7 || 7;
  const start = new Date(Date.UTC(
    now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + add, 16, 0, 0
  ));

  const { data: existing } = await supabase
    .from("events").select("id").eq("starts_at", start.toISOString()).maybeSingle();
  if (existing) return Response.json({ ok: true, note: "akce uz existuje", eventId: existing.id });

  const deadline = new Date(start.getTime() - t.deadline_hours * 3600000);

  const { data: ev, error: evErr } = await supabase.from("events").insert({
    activity: t.activity,
    place: t.place,
    starts_at: start.toISOString(),
    duration_minutes: t.duration_minutes,
    rsvp_deadline: deadline.toISOString(),
    capacity: t.capacity,
    plus_one: t.plus_one,
  }).select("id").single();

  if (evErr || !ev) return Response.json({ ok: false, error: evErr?.message }, { status: 500 });

  const { data: g } = await supabase.from("groups").select("id").eq("slug", GROUP).single();
  if (!g) return Response.json({ ok: false, error: "skupina nenalezena" }, { status: 404 });

  await supabase.from("event_groups").insert({ event_id: ev.id, group_id: g.id });

  const { data: members } = await supabase
    .from("memberships").select("person_id").eq("group_id", g.id);

  const rows = (members ?? []).map((m) => ({ event_id: ev.id, person_id: m.person_id }));
  if (rows.length) await supabase.from("invitations").insert(rows);

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/send`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.SEND_SECRET}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ eventId: ev.id }),
  });

  const sent = await res.json();
  if (process.env.DISCORD_WEBHOOK_URL) {
    await fetch(process.env.DISCORD_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        content: `**${t.activity}**\n${start.toLocaleString("cs-CZ", { timeZone: "Europe/Prague" })}\nPozvanek: ${rows.length}\n${process.env.NEXT_PUBLIC_BASE_URL}/planovac/${ev.id}`,
      }),
    });
  }

  return Response.json({ ok: true, eventId: ev.id, pozvanek: rows.length, sent });
}

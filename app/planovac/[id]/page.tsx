import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";
import { deleteEvent } from "./actions";

export const dynamic = "force-dynamic";

export default async function EventDetail({ params }: { params: { id: string } }) {
  const { data: ev } = await supabase.from("events").select("*").eq("id", params.id).single();
  if (!ev) notFound();

  const { data: invites } = await supabase
    .from("invitations")
    .select("id, status, sent_at, people(full_name, email)")
    .eq("event_id", params.id);

  const list = invites ?? [];
  const by = (s: string) => list.filter((i) => i.status === s);

  const kdy = new Date(ev.starts_at).toLocaleString("cs-CZ", {
    weekday: "long", day: "numeric", month: "numeric",
    hour: "2-digit", minute: "2-digit", timeZone: "Europe/Prague",
  });

  return (
    <main style={{ maxWidth: 560, margin: "0 auto", padding: 24, fontFamily: "system-ui", lineHeight: 1.5 }}>
      <h1 style={{ fontSize: 24, marginBottom: 4 }}>{ev.activity}</h1>
      <p style={{ margin: 0, opacity: 0.7 }}>{kdy}{ev.place ? " - " + ev.place : ""}</p>

      <div style={{ display: "flex", gap: 12, margin: "20px 0" }}>
        <Box label="Jdu" n={by("yes").length} c="#16a34a" />
        <Box label="Mozna" n={by("maybe").length} c="#ca8a04" />
        <Box label="Nejdu" n={by("no").length} c="#dc2626" />
        <Box label="Ticho" n={by("pending").length} c="#6b7280" />
      </div>

      <Group title="Jdu" items={by("yes")} />
      <Group title="Mozna" items={by("maybe")} />
      <Group title="Zatim neodpovedeli" items={by("pending")} />
      <Group title="Nejdu" items={by("no")} />

      {by("yes").length + by("no").length + by("maybe").length === 0 && (
        <form action={deleteEvent} style={{ marginTop: 32 }}>
          <input type="hidden" name="id" value={ev.id} />
          <button type="submit" style={{ padding: "10px 16px", fontSize: 14, color: "#dc2626", background: "#fff", border: "1px solid #dc2626", borderRadius: 8, cursor: "pointer" }}>Smazat akci</button>
        </form>
      )}
    </main>
  );
}

function Box({ label, n, c }: { label: string; n: number; c: string }) {
  return (
    <div style={{ flex: 1, textAlign: "center", padding: "12px 0", background: "#f5f5f5", borderRadius: 8 }}>
      <div style={{ fontSize: 22, fontWeight: 700, color: c }}>{n}</div>
      <div style={{ fontSize: 12, opacity: 0.7 }}>{label}</div>
    </div>
  );
}

function Group({ title, items }: { title: string; items: any[] }) {
  if (!items.length) return null;
  return (
    <section style={{ marginTop: 20 }}>
      <h2 style={{ fontSize: 15, textTransform: "uppercase", opacity: 0.6 }}>
        {title} ({items.length})
      </h2>
      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {items.map((i) => (
          <li key={i.id} style={{ padding: "8px 0", borderBottom: "1px solid #eee" }}>
            {(i.people as any).full_name}
            {!i.sent_at && <span style={{ fontSize: 12, opacity: 0.5 }}> - neodeslano</span>}
          </li>
        ))}
      </ul>
    </section>
  );
}

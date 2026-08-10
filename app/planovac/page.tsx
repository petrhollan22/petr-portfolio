import { supabase } from "@/lib/supabase";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function Planovac() {
  const { data: events } = await supabase
    .from("event_summary")
    .select("*")
    .order("starts_at", { ascending: false })
    .limit(20);

  return (
    <main style={{ maxWidth: 560, margin: "0 auto", padding: 24, fontFamily: "system-ui", lineHeight: 1.5 }}>
      <h1 style={{ fontSize: 24 }}>Planovac</h1>
      <Link href="/planovac/new" style={{ display: "inline-block", padding: "10px 18px", background: "#16a34a", color: "#fff", borderRadius: 8, textDecoration: "none", marginBottom: 8 }}>+ Nova akce</Link>

      {!events?.length && <p style={{ opacity: 0.6 }}>Zatim zadne akce.</p>}

      <ul style={{ listStyle: "none", padding: 0 }}>
        {(events ?? []).map((e: any) => {
          const d = new Date(e.starts_at);
          const budouci = d.getTime() > Date.now();
          return (
            <li key={e.id} style={{ borderBottom: "1px solid #eee", padding: "14px 0" }}>
              <Link href={`/planovac/${e.id}`} style={{ textDecoration: "none", color: "inherit" }}>
                <div style={{ fontWeight: 600 }}>
                  {budouci && <span style={{ color: "#16a34a" }}>• </span>}
                  {e.activity}
                </div>
                <div style={{ fontSize: 13, opacity: 0.7 }}>
                  {d.toLocaleString("cs-CZ", {
                    weekday: "short", day: "numeric", month: "numeric",
                    hour: "2-digit", minute: "2-digit", timeZone: "Europe/Prague",
                  })}
                </div>
                <div style={{ fontSize: 13, marginTop: 4 }}>
                  <span style={{ color: "#16a34a" }}>{e.yes_count} jde</span>
                  {" · "}
                  <span style={{ color: "#6b7280" }}>{e.pending_count} ticho</span>
                  {e.capacity ? ` · kapacita ${e.capacity}` : ""}
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </main>
  );
}

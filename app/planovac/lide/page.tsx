import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { addPerson, toggleMembership } from "./actions";

export const dynamic = "force-dynamic";

export default async function LidePage() {
  const { data: groups } = await supabase.from("groups").select("id, name").order("sort_order");
  const { data: people } = await supabase
    .from("people").select("id, full_name, email, phone, note, memberships(group_id)")
    .order("full_name");

  const gs = groups ?? [];
  const inp = { width: "100%", padding: 12, fontSize: 16, border: "1px solid #ddd",
    borderRadius: 8, boxSizing: "border-box" as const, marginTop: 4 };
  const lbl = { fontSize: 13, opacity: 0.7, display: "block", marginTop: 12 };

  return (
    <main style={{ maxWidth: 560, margin: "0 auto", padding: 24, fontFamily: "system-ui", lineHeight: 1.5 }}>
      <Link href="/planovac" style={{ fontSize: 14, opacity: 0.6, textDecoration: "none", color: "inherit" }}>
        &larr; Zpet
      </Link>
      <h1 style={{ fontSize: 24, marginTop: 8 }}>Lide ({people?.length ?? 0})</h1>

      <form action={addPerson} style={{ padding: 16, background: "#f8f8f8", borderRadius: 10, marginTop: 16 }}>
        <strong style={{ fontSize: 15 }}>Novy clovek</strong>

        <label style={lbl}>Jmeno</label>
        <input name="full_name" required style={inp} />

        <label style={lbl}>Email</label>
        <input name="email" type="email" style={inp} />

        <label style={lbl}>Telefon (staci jedno z toho)</label>
        <input name="phone" style={inp} />

        <label style={lbl}>Poznamka</label>
        <input name="note" placeholder="odkud se znate" style={inp} />

        <label style={lbl}>Skupiny</label>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 6 }}>
          {gs.map((g: any) => (
            <label key={g.id} style={{ display: "flex", alignItems: "center", gap: 6,
              padding: "8px 12px", background: "#fff", border: "1px solid #ddd", borderRadius: 999, fontSize: 14 }}>
              <input type="checkbox" name="group" value={g.id} />
              {g.name}
            </label>
          ))}
        </div>

        <button type="submit" style={{ width: "100%", marginTop: 16, padding: 14, fontSize: 16,
          color: "#fff", background: "#16a34a", border: 0, borderRadius: 10, cursor: "pointer" }}>
          Pridat
        </button>
      </form>

      <ul style={{ listStyle: "none", padding: 0, marginTop: 24 }}>
        {(people ?? []).map((p: any) => {
          const mine = (p.memberships ?? []).map((m: any) => m.group_id);
          return (
            <li key={p.id} style={{ borderBottom: "1px solid #eee", padding: "12px 0" }}>
              <div style={{ fontWeight: 600 }}>{p.full_name}</div>
              <div style={{ fontSize: 13, opacity: 0.6 }}>
                {p.email || p.phone}{p.note ? ` - ${p.note}` : ""}
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 8 }}>
                {gs.map((g: any) => {
                  const on = mine.includes(g.id);
                  return (
                    <form key={g.id} action={toggleMembership}>
                      <input type="hidden" name="person_id" value={p.id} />
                      <input type="hidden" name="group_id" value={g.id} />
                      <input type="hidden" name="on" value={on ? "1" : "0"} />
                      <button type="submit" style={{ padding: "5px 11px", fontSize: 13, borderRadius: 999,
                        cursor: "pointer",
                        background: on ? "#16a34a" : "#fff",
                        color: on ? "#fff" : "#666",
                        border: `1px solid ${on ? "#16a34a" : "#ddd"}` }}>
                        {g.name}
                      </button>
                    </form>
                  );
                })}
              </div>
            </li>
          );
        })}
      </ul>
    </main>
  );
}

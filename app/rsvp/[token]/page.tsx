import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";
import { respond } from "./actions";

export default async function RsvpPage({ params }: { params: { token: string } }) {
  const { data: inv } = await supabase
    .from("invitations")
    .select("id, status, people(full_name), events(*)")
    .eq("token", params.token)
    .single();

  if (!inv) notFound();

  const ev = inv.events as any;
  const person = inv.people as any;

  const kdy = new Date(ev.starts_at).toLocaleString("cs-CZ", {
    weekday: "long", day: "numeric", month: "numeric",
    hour: "2-digit", minute: "2-digit", timeZone: "Europe/Prague",
  });

  return (
    <main style={{ maxWidth: 480, margin: "0 auto", padding: 24, fontFamily: "system-ui", lineHeight: 1.5 }}>
      <h1 style={{ fontSize: 24, marginBottom: 4 }}>{ev.activity}</h1>
      <p style={{ margin: "4px 0" }}>{kdy}</p>
      {ev.place && <p style={{ margin: "4px 0" }}>{ev.place}</p>}

      <p style={{ marginTop: 20 }}>Ahoj {person.full_name}, Petr te zve. Dorazis?</p>

      {inv.status !== "pending" && (
        <p style={{ padding: 12, background: "#eee", borderRadius: 8 }}>
          Zatim mas: <strong>{inv.status === "yes" ? "Jdu" : inv.status === "no" ? "Nejdu" : "Mozna"}</strong> - muzes to zmenit.
        </p>
      )}

      <form action={respond} style={{ display: "flex", gap: 8, marginTop: 16 }}>
        <input type="hidden" name="token" value={params.token} />
        <button name="status" value="yes" style={btn("#16a34a")}>Jdu</button>
        <button name="status" value="maybe" style={btn("#ca8a04")}>Mozna</button>
        <button name="status" value="no" style={btn("#dc2626")}>Nejdu</button>
      </form>
    </main>
  );
}

function btn(bg: string) {
  return {
    flex: 1, padding: "14px 0", fontSize: 16, color: "#fff",
    background: bg, border: 0, borderRadius: 8, cursor: "pointer",
  } as const;
}

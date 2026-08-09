import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";

export default async function Unsubscribe({ params }: { params: { token: string } }) {
  const { data: person } = await supabase
    .from("people")
    .select("id, full_name, unsubscribed_at")
    .eq("unsubscribe_token", params.token)
    .single();

  if (!person) notFound();

  if (!person.unsubscribed_at) {
    await supabase
      .from("people")
      .update({ unsubscribed_at: new Date().toISOString() })
      .eq("id", person.id);
  }

  return (
    <main style={{ maxWidth: 480, margin: "0 auto", padding: 24, fontFamily: "system-ui", lineHeight: 1.6 }}>
      <h1 style={{ fontSize: 22 }}>Odhlaseno</h1>
      <p>{person.full_name}, uz ti nebudou chodit pozvanky.</p>
      <p style={{ opacity: 0.7 }}>Kdybys to chtel vratit, napis Petrovi.</p>
    </main>
  );
}

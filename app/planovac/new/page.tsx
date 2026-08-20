import { supabase } from "@/lib/supabase";
import NewEventForm from "./form";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function NewEventPage() {
  const { data: groups } = await supabase.from("groups").select("id, name, slug").order("sort_order");
  const { data: templates } = await supabase.from("event_templates").select("*").order("name");
  const { data: people } = await supabase
    .from("people").select("id, full_name, memberships(group_id)")
    .eq("is_active", true).order("full_name");

  const mapped = (people ?? []).map((p: any) => ({
    id: p.id,
    full_name: p.full_name,
    groups: (p.memberships ?? []).map((m: any) => m.group_id),
  }));

  return (
    <main style={{ maxWidth: 560, margin: "0 auto", padding: 24, fontFamily: "system-ui", lineHeight: 1.5 }}>
      <Link href="/planovac" style={{ fontSize: 14, opacity: 0.6, textDecoration: "none", color: "inherit" }}>
        &larr; Zpet
      </Link>
      <h1 style={{ fontSize: 24, marginTop: 8 }}>Nova akce</h1>
      <NewEventForm groups={groups ?? []} people={mapped} templates={(templates ?? []) as any} />
    </main>
  );
}

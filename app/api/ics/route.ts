import { supabase } from "@/lib/supabase";
import { buildIcs } from "@/lib/ics";

export async function GET(req: Request) {
  const token = new URL(req.url).searchParams.get("token");
  if (!token) return new Response("missing token", { status: 400 });

  const { data: inv } = await supabase
    .from("invitations")
    .select("events(*)")
    .eq("token", token)
    .single();

  if (!inv) return new Response("not found", { status: 404 });

  const ev = inv.events as any;
  const ics = buildIcs(ev);

  return new Response(ics, {
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": `attachment; filename="akce.ics"`,
    },
  });
}

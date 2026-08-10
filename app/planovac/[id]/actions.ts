"use server";

import { supabase } from "@/lib/supabase";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function deleteEvent(formData: FormData) {
  const id = String(formData.get("id"));

  const { count } = await supabase
    .from("invitations")
    .select("id", { count: "exact", head: true })
    .eq("event_id", id)
    .neq("status", "pending");

  if ((count ?? 0) > 0) throw new Error("Akce ma odpovedi, nelze smazat");

  await supabase.from("events").delete().eq("id", id);
  redirect("/planovac");
}

export async function cancelEvent(formData: FormData) {
  const id = String(formData.get("id"));
  await supabase.from("events").update({ is_cancelled: true }).eq("id", id);

  await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/cancel`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.SEND_SECRET}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ eventId: id }),
  });
  revalidatePath(`/planovac/${id}`);
}

export async function sendInvites(formData: FormData) {
  const id = String(formData.get("id"));

  await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/send`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.SEND_SECRET}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ eventId: id }),
  });

  revalidatePath(`/planovac/${id}`);
}

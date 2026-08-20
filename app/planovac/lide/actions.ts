"use server";

import { supabase } from "@/lib/supabase";
import { revalidatePath } from "next/cache";

export async function addPerson(formData: FormData) {
  const full_name = String(formData.get("full_name") || "").trim();
  const email = String(formData.get("email") || "").trim() || null;
  const phone = String(formData.get("phone") || "").trim() || null;
  const note = String(formData.get("note") || "").trim() || null;
  const groups = formData.getAll("group").map(String);

  if (!full_name) throw new Error("Chybi jmeno");
  if (!email && !phone) throw new Error("Zadej email nebo telefon");

  const { data: p, error } = await supabase
    .from("people").insert({ full_name, email, phone, note }).select("id").single();

  if (error || !p) throw new Error(error?.message || "Nepodarilo se pridat");

  if (groups.length) {
    await supabase.from("memberships").insert(
      groups.map((gid) => ({ person_id: p.id, group_id: gid }))
    );
  }

  revalidatePath("/planovac/lide");
}

export async function toggleMembership(formData: FormData) {
  const personId = String(formData.get("person_id"));
  const groupId = String(formData.get("group_id"));
  const on = String(formData.get("on")) === "1";

  if (on) {
    await supabase.from("memberships").delete()
      .eq("person_id", personId).eq("group_id", groupId);
  } else {
    await supabase.from("memberships").insert({ person_id: personId, group_id: groupId });
  }

  revalidatePath("/planovac/lide");
}

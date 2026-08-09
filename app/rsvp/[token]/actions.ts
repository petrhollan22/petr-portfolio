"use server";

import { supabase } from "@/lib/supabase";
import { revalidatePath } from "next/cache";

export async function respond(formData: FormData) {
  const token = String(formData.get("token"));
  const status = String(formData.get("status"));

  if (!["yes", "no", "maybe"].includes(status)) return;

  await supabase
    .from("invitations")
    .update({ status, responded_at: new Date().toISOString() })
    .eq("token", token);

  revalidatePath(`/rsvp/${token}`);
}

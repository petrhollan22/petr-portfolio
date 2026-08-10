"use server";

import { supabase } from "@/lib/supabase";
import { redirect } from "next/navigation";

function pragueToUtc(local: string): string {
  const naive = new Date(local + ":00Z");
  const tzName = new Intl.DateTimeFormat("en-US", {
    timeZone: "Europe/Prague", timeZoneName: "shortOffset",
  }).formatToParts(naive).find((p) => p.type === "timeZoneName")?.value ?? "GMT+2";
  const m = tzName.match(/GMT([+-]\d+)/);
  const off = m ? parseInt(m[1], 10) : 2;
  return new Date(naive.getTime() - off * 3600000).toISOString();
}

export async function createEvent(formData: FormData) {
  const activity = String(formData.get("activity") || "").trim();
  const place = String(formData.get("place") || "").trim() || null;
  const startsLocal = String(formData.get("starts_at") || "");
  const duration = Number(formData.get("duration_minutes")) || 120;
  const capacityRaw = String(formData.get("capacity") || "").trim();
  const plusOne = String(formData.get("plus_one") || "no");
  const deadlineHours = Number(formData.get("deadline_hours")) || 24;
  const groupId = String(formData.get("group_id") || "");
  const people = formData.getAll("person").map(String);

  if (!activity || !startsLocal || !people.length) {
    throw new Error("Chybi aktivita, datum nebo lide");
  }

  const startsAt = pragueToUtc(startsLocal);
  const deadline = new Date(new Date(startsAt).getTime() - deadlineHours * 3600000).toISOString();

  const { data: ev, error } = await supabase.from("events").insert({
    activity,
    place,
    starts_at: startsAt,
    duration_minutes: duration,
    rsvp_deadline: deadline,
    capacity: capacityRaw ? Number(capacityRaw) : null,
    plus_one: plusOne,
  }).select("id").single();

  if (error || !ev) throw new Error(error?.message || "Nepodarilo se zalozit akci");

  if (groupId && groupId !== "ALL") {
    await supabase.from("event_groups").insert({ event_id: ev.id, group_id: groupId });
  }

  await supabase.from("invitations").insert(
    people.map((pid) => ({ event_id: ev.id, person_id: pid }))
  );

  redirect(`/planovac/${ev.id}`);
}

import "server-only";
import { headers } from "next/headers";
import { isPlannerAuthorized } from "@/lib/planner-auth";

export async function requirePlannerAdmin(): Promise<void> {
  const requestHeaders = await headers();
  const authorized = await isPlannerAuthorized(
    requestHeaders.get("authorization")
  );

  if (!authorized) {
    throw new Error("Unauthorized planner operation");
  }
}

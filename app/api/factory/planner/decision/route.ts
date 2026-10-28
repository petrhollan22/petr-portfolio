import { supabase } from "@/lib/supabase";
import { verifyFactoryPlannerRequest } from "@/lib/factory-planner-auth";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const body = await request.text();

  if (Buffer.byteLength(body) > 2048) {
    return Response.json({ error: "too_large" }, { status: 413 });
  }

  if (!verifyFactoryPlannerRequest(request, body, "FACTORY_PLANNER_APPROVAL_KEY")) {
    return Response.json({ error: "unauthorized" }, { status: 401 });
  }

  let data: Record<string, unknown>;
  try {
    data = JSON.parse(body);
    if (!data || typeof data !== "object" || Array.isArray(data)) {
      throw new Error("invalid");
    }
  } catch {
    return Response.json({ error: "invalid_json" }, { status: 400 });
  }

  const allowedTelegramId = process.env.FACTORY_PLANNER_APPROVER_TELEGRAM_ID;

  if (!allowedTelegramId ||
      !/^\d+$/.test(allowedTelegramId) ||
      String(data.telegramUserId) !== allowedTelegramId) {
    return Response.json({ error: "forbidden" }, { status: 403 });
  }

  if (typeof data.proposalId !== "string" ||
      !/^[0-9a-f]{8}-[0-9a-f-]{27,}$/i.test(data.proposalId) ||
      (data.decision !== "approve" && data.decision !== "reject")) {
    return Response.json({ error: "invalid_decision" }, { status: 400 });
  }

  const approved = data.decision === "approve";
  const now = new Date().toISOString();

  const { data: updated, error } = await supabase
    .from("factory_planner_requests")
    .update({
      status: approved ? "approved" : "rejected",
      ...(approved
        ? {
            approved_at: now,
            approved_by_telegram_id: Number(allowedTelegramId),
          }
        : {
            result: { rejectedByTelegramId: allowedTelegramId },
          }),
    })
    .eq("id", data.proposalId)
    .eq("status", "pending")
    .gt("expires_at", now)
    .select("id, status")
    .maybeSingle();

  if (error) {
    return Response.json({ error: "storage_unavailable" }, { status: 503 });
  }

  if (!updated) {
    return Response.json({ error: "not_pending_or_expired" }, { status: 409 });
  }

  return Response.json({
    ok: true,
    proposalId: updated.id,
    status: updated.status,
    executed: false,
  });
}

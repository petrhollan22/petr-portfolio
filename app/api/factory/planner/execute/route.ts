import { supabase } from "@/lib/supabase";
import { verifyFactoryPlannerRequest } from "@/lib/factory-planner-auth";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const body = await request.text();

  if (Buffer.byteLength(body) > 1024) {
    return Response.json({ error: "too_large" }, { status: 413 });
  }

  if (!verifyFactoryPlannerRequest(
    request,
    body,
    "FACTORY_PLANNER_APPROVAL_KEY"
  )) {
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

  const allowedId = process.env.FACTORY_PLANNER_APPROVER_TELEGRAM_ID;

  if (!allowedId || !/^\d+$/.test(allowedId) ||
      String(data.telegramUserId) !== allowedId) {
    return Response.json({ error: "forbidden" }, { status: 403 });
  }

  const id = data.proposalId;

  if (typeof id !== "string" ||
      !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id)) {
    return Response.json({ error: "invalid_proposal_id" }, { status: 400 });
  }

  const { data: result, error } = await supabase.rpc(
    "factory_execute_approved_event",
    { p_proposal_id: id }
  );

  if (error) {
    console.error("factory_execute_error", error.code);
    return Response.json(
      { error: "execution_failed_or_not_approved" },
      { status: 409 }
    );
  }

  return Response.json({
    ok: true,
    proposalId: id,
    result,
  });
}

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

  let proposalId: unknown;

  try {
    const data = JSON.parse(body);
    proposalId = data?.proposalId;
  } catch {
    return Response.json({ error: "invalid_json" }, { status: 400 });
  }

  if (
    typeof proposalId !== "string" ||
    !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(proposalId)
  ) {
    return Response.json({ error: "invalid_proposal_id" }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("factory_planner_requests")
    .select("id, action, payload, payload_hash, status, expires_at")
    .eq("id", proposalId)
    .maybeSingle();

  if (error) {
    return Response.json({ error: "storage_unavailable" }, { status: 503 });
  }

  if (!data) {
    return Response.json({ error: "not_found" }, { status: 404 });
  }

  return Response.json({
    proposalId: data.id,
    action: data.action,
    payload: data.payload,
    payloadHash: data.payload_hash,
    status: data.status,
    expiresAt: data.expires_at,
    canApprove: data.status === "pending" &&
      Date.parse(data.expires_at) > Date.now(),
  });
}

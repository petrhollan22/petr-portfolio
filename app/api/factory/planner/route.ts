import { createHash } from "node:crypto";
import { supabase } from "@/lib/supabase";
import { verifyFactoryPlannerRequest } from "@/lib/factory-planner-auth";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const body = await request.text();

  if (Buffer.byteLength(body) > 8192) {
    return Response.json({ error: "too_large" }, { status: 413 });
  }

  if (!verifyFactoryPlannerRequest(request, body)) {
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

  const requestKey = data.requestKey;

  if (typeof requestKey !== "string" ||
      !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(requestKey)) {
    return Response.json({ error: "invalid_request_key" }, { status: 400 });
  }

  let payload: Record<string, unknown>;

  if (data.action === "create_group") {
    if (typeof data.name !== "string" ||
        !data.name.trim() || data.name.length > 120) {
      return Response.json({ error: "invalid_group" }, { status: 400 });
    }

    payload = { name: data.name.trim() };
  } else if (data.action === "create_event") {
    if (typeof data.activity !== "string" ||
        !data.activity.trim() || data.activity.length > 120 ||
        typeof data.startsAt !== "string" ||
        !/^\d{4}-\d{2}-\d{2}T.*(?:Z|[+-]\d{2}:\d{2})$/.test(data.startsAt) ||
        !Number.isFinite(Date.parse(data.startsAt)) ||
        Date.parse(data.startsAt) <= Date.now()) {
      return Response.json({ error: "invalid_event" }, { status: 400 });
    }

    const ids = data.personIds;
    const uuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

    if (!Array.isArray(ids) || ids.length < 1 ||
        ids.length > 100 || !ids.every(
          (id) => typeof id === "string" && uuid.test(id)
        ) || new Set(ids).size !== ids.length) {
      return Response.json({ error: "invalid_people" }, { status: 400 });
    }

    if (data.groupId !== undefined &&
        (typeof data.groupId !== "string" || !uuid.test(data.groupId))) {
      return Response.json({ error: "invalid_group_id" }, { status: 400 });
    }

    payload = {
      activity: data.activity.trim(),
      startsAt: new Date(data.startsAt).toISOString(),
      personIds: ids,
      ...(data.groupId ? { groupId: data.groupId } : {}),
    };
  } else {
    return Response.json({ error: "unsupported_action" }, { status: 400 });
  }

  const canonical = JSON.stringify({ action: data.action, payload });
  const payloadHash = createHash("sha256")
    .update(canonical)
    .digest("hex");

  const expiresAt = new Date(Date.now() + 30 * 60_000).toISOString();

  const { data: saved, error } = await supabase
    .from("factory_planner_requests")
    .insert({
      request_key: requestKey,
      action: data.action,
      payload,
      payload_hash: payloadHash,
      expires_at: expiresAt,
    })
    .select("id, status, expires_at")
    .single();

  if (error?.code === "23505") {
    const { data: existing } = await supabase
      .from("factory_planner_requests")
      .select("id, status, expires_at, payload_hash")
      .eq("request_key", requestKey)
      .single();

    if (!existing || existing.payload_hash !== payloadHash) {
      return Response.json({ error: "request_conflict" }, { status: 409 });
    }

    return Response.json({
      ok: true,
      proposalId: existing.id,
      status: existing.status,
      expiresAt: existing.expires_at,
      executed: false,
      alreadyExists: true,
    });
  }

  if (error || !saved) {
    console.error("planner_proposal_error", error?.code);
    return Response.json({ error: "storage_unavailable" }, { status: 503 });
  }

  return Response.json({
    ok: true,
    proposalId: saved.id,
    status: saved.status,
    expiresAt: saved.expires_at,
    requiresApproval: true,
    executed: false,
  }, { status: 201 });
}

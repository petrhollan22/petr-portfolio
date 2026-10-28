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
    const parsed: unknown = JSON.parse(body);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      throw new Error("invalid");
    }
    data = parsed as Record<string, unknown>;
  } catch {
    return Response.json({ error: "invalid_json" }, { status: 400 });
  }

  if (data.action === "create_group") {
    if (typeof data.name !== "string" ||
        !data.name.trim() || data.name.length > 120) {
      return Response.json({ error: "invalid_group" }, { status: 400 });
    }
  } else if (data.action === "create_event") {
    if (typeof data.activity !== "string" ||
        !data.activity.trim() || data.activity.length > 120 ||
        typeof data.startsAt !== "string" ||
        !Number.isFinite(Date.parse(data.startsAt))) {
      return Response.json({ error: "invalid_event" }, { status: 400 });
    }
  } else {
    return Response.json({ error: "unsupported_action" }, { status: 400 });
  }

  return Response.json({
    ok: true,
    status: "validated_only",
    requiresApproval: true,
    executed: false,
    action: data.action
  });
}

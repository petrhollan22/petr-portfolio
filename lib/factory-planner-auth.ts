import { createHmac, timingSafeEqual } from "node:crypto";

export function verifyFactoryPlannerRequest(
  request: Request,
  body: string,
  secretName: "FACTORY_PLANNER_HMAC_KEY" | "FACTORY_PLANNER_APPROVAL_KEY" = "FACTORY_PLANNER_HMAC_KEY"
): boolean {
  const secret = process.env[secretName];
  const timestamp = request.headers.get("x-factory-timestamp");
  const signature = request.headers.get("x-factory-signature");

  if (!secret || !timestamp || !signature) return false;
  if (secret.length < 32) return false;
  if (!/^\d{10}$/.test(timestamp)) return false;
  if (!/^[a-f0-9]{64}$/i.test(signature)) return false;

  const age = Math.abs(Date.now() / 1000 - Number(timestamp));
  if (age > 300) return false;

  const expected = createHmac("sha256", secret)
    .update(`${timestamp}.${body}`)
    .digest();

  const received = Buffer.from(signature, "hex");

  return received.length === expected.length &&
    timingSafeEqual(received, expected);
}

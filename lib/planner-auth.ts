export async function isPlannerAuthorized(header: string | null): Promise<boolean> {
  const user = process.env.PLANNER_ADMIN_USER;
  const password = process.env.PLANNER_ADMIN_PASSWORD;

  if (!user || !password || !header) return false;

  const match = /^Basic ([A-Za-z0-9+/=]+)$/i.exec(header);
  if (!match) return false;

  let supplied: string;
  try {
    supplied = atob(match[1]);
  } catch {
    return false;
  }

  const encoder = new TextEncoder();
  const digest = async (value: string) =>
    new Uint8Array(await crypto.subtle.digest("SHA-256", encoder.encode(value)));

  const [actual, expected] = await Promise.all([
    digest(supplied),
    digest(`${user}:${password}`),
  ]);

  let difference = 0;
  for (let i = 0; i < expected.length; i++) {
    difference |= actual[i] ^ expected[i];
  }

  return difference === 0;
}

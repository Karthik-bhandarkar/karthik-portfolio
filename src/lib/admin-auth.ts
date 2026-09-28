import { timingSafeEqual } from "node:crypto";

/** Admin API access is disabled until a strong token is configured server-side. */
export function isAdminRequest(request: Request): boolean {
  const expected = process.env.PORTFOLIO_ADMIN_TOKEN;
  const header = request.headers.get("authorization");
  const supplied = header?.startsWith("Bearer ") ? header.slice(7) : undefined;
  if (!expected || expected.length < 16 || !supplied) return false;

  const a = Buffer.from(expected);
  const b = Buffer.from(supplied);
  return a.length === b.length && timingSafeEqual(a, b);
}

export function unauthorizedResponse(): Response {
  return Response.json(
    { error: "A valid studio key is required." },
    { status: 401, headers: { "Cache-Control": "no-store" } }
  );
}

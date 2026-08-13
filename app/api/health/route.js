/**
 * Health-check endpoint: GET /api/health
 *
 * Returns safe, non-secret operational information only. Never read a
 * credential here — this response is publicly reachable.
 *
 * Route Handlers are uncached by default in Next.js 16, which is what a health
 * check wants; the explicit Cache-Control header stops any proxy or CDN in
 * front of the app from serving a stale answer.
 */
export async function GET() {
  const payload = {
    status: "ok",
    service: "AI Study Assistant",
    environment: process.env.APP_ENV ?? process.env.NODE_ENV ?? "unknown",
    timestamp: new Date().toISOString(),
    uptimeSeconds: Math.round(process.uptime()),
  };

  return Response.json(payload, {
    status: 200,
    headers: {
      "Cache-Control": "no-store, max-age=0",
    },
  });
}

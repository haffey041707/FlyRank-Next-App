import { headers } from "next/headers";
import Card from "@/app/components/card";
import Screen, { SectionHeading } from "@/app/components/screen";

export const metadata = {
  title: "Health",
  description: "Live health-check status for this deployment.",
};

// Rendered per request so the readout reflects the running server rather than
// values frozen at build time.
export const dynamic = "force-dynamic";

/**
 * A server-side fetch needs an absolute URL — there is no origin to resolve
 * "/api/health" against. Derive it from the incoming request, which works on
 * any host (including behind Vercel's proxy) without hard-coding a domain.
 *
 * Returns null when no origin can be determined. A loopback address is only
 * ever assumed in development, so a production deployment can never end up
 * calling localhost.
 */
async function getBaseUrl() {
  const headerList = await headers();
  const host = headerList.get("x-forwarded-host") ?? headerList.get("host");

  if (host) {
    const isLoopback =
      host.startsWith("localhost") || host.startsWith("127.0.0.1");
    const protocol =
      headerList.get("x-forwarded-proto") ?? (isLoopback ? "http" : "https");

    return `${protocol}://${host}`;
  }

  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL;
  }

  return process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : null;
}

/**
 * Fetches the health endpoint on the server. Never throws: a failed check is
 * itself a health result, so it is returned as data for the page to render.
 */
async function fetchHealth() {
  const baseUrl = await getBaseUrl();

  if (!baseUrl) {
    return {
      ok: false,
      endpoint: "/api/health",
      error:
        "Could not determine the request origin, so the health endpoint was not called.",
    };
  }

  const endpoint = `${baseUrl}/api/health`;

  try {
    const response = await fetch(endpoint, { cache: "no-store" });

    if (!response.ok) {
      return {
        ok: false,
        endpoint,
        error: `The health endpoint responded with ${response.status} ${response.statusText}.`,
      };
    }

    return { ok: true, endpoint, data: await response.json() };
  } catch (error) {
    // Surface the reason without leaking a stack trace into the page.
    return {
      ok: false,
      endpoint,
      error:
        error instanceof Error
          ? `The health endpoint could not be reached (${error.message}).`
          : "The health endpoint could not be reached.",
    };
  }
}

/**
 * Reports only whether a server-side variable is configured — never its value,
 * so secrets can't leak into the rendered page.
 */
function configured(name) {
  return Boolean(process.env[name]) ? "Configured" : "Not set";
}

function Row({ label, value, tone }) {
  return (
    <div className="flex justify-between gap-4 px-gutter py-3 text-sm">
      <dt className="shrink-0 text-muted-foreground">{label}</dt>
      <dd
        className={`min-w-0 text-right font-mono break-all ${
          tone === "success" ? "text-success" : "text-foreground"
        }`}
      >
        {value}
      </dd>
    </div>
  );
}

export default async function HealthPage() {
  const health = await fetchHealth();

  const config = [
    {
      label: "NEXT_PUBLIC_APP_NAME",
      value: process.env.NEXT_PUBLIC_APP_NAME ?? "Not set",
    },
    {
      label: "NEXT_PUBLIC_SITE_URL",
      value: process.env.NEXT_PUBLIC_SITE_URL ?? "Not set",
    },
    { label: "ANTHROPIC_API_KEY", value: configured("ANTHROPIC_API_KEY") },
    { label: "DATABASE_URL", value: configured("DATABASE_URL") },
  ];

  return (
    <Screen
      eyebrow="Diagnostics"
      title="Health"
      description="Live status fetched on the server from the /api/health route handler. Server-side secrets are reported as configured or not set — never by value."
      status={health.ok ? "Operational" : "Unavailable"}
    >
      <section className="mt-section" aria-labelledby="status-heading">
        <SectionHeading id="status-heading">Health check</SectionHeading>

        {health.ok ? (
          <>
            <Card className="mt-stack border-success/30 bg-success-soft px-gutter py-3">
              <p className="flex items-center gap-2 text-sm font-medium text-success">
                <span
                  className="size-2 rounded-pill bg-current"
                  aria-hidden="true"
                />
                All systems operational
              </p>
            </Card>

            <Card as="dl" className="mt-stack divide-y divide-border">
              <Row
                label="System status"
                value={health.data.status}
                tone="success"
              />
              <Row label="Service" value={health.data.service} />
              <Row label="Environment" value={health.data.environment} />
              <Row label="Timestamp" value={health.data.timestamp} />
              <Row label="Uptime" value={`${health.data.uptimeSeconds}s`} />
            </Card>
          </>
        ) : (
          <Card className="mt-stack border-danger/30 bg-danger-soft px-gutter py-4">
            <p className="flex items-center gap-2 text-sm font-medium text-danger">
              <span
                className="size-2 rounded-pill bg-current"
                aria-hidden="true"
              />
              Health check failed
            </p>
            <p className="mt-2 text-sm text-foreground">{health.error}</p>
            <p className="mt-2 text-sm text-muted-foreground">
              The page itself is rendering, so the server is up — the check
              above could not read the endpoint.
            </p>
          </Card>
        )}

        <p className="mt-3 text-xs text-muted-foreground">
          Source:{" "}
          <code className="font-mono text-primary-accent">
            GET {health.endpoint}
          </code>
        </p>
      </section>

      <section className="mt-section" aria-labelledby="config-heading">
        <SectionHeading id="config-heading">Configuration</SectionHeading>
        <Card as="dl" className="mt-stack divide-y divide-border">
          {config.map(({ label, value }) => (
            <div
              key={label}
              className="flex justify-between gap-4 px-gutter py-3 text-sm"
            >
              <dt className="min-w-0 font-mono break-all text-muted-foreground">
                {label}
              </dt>
              <dd className="shrink-0 text-right text-foreground">{value}</dd>
            </div>
          ))}
        </Card>
      </section>
    </Screen>
  );
}

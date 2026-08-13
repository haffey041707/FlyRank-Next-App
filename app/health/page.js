import Card from "@/app/components/card";
import Screen, { SectionHeading } from "@/app/components/screen";
import { navItems } from "@/lib/routes";

export const metadata = {
  title: "Health",
  description: "Runtime and configuration status for this deployment.",
};

// Rendered per request so the readout reflects the running server rather than
// values frozen at build time.
export const dynamic = "force-dynamic";

/**
 * Reports only whether a server-side variable is configured — never its value,
 * so secrets can't leak into the rendered page.
 */
function configured(name) {
  return Boolean(process.env[name]) ? "Configured" : "Not set";
}

function DefinitionList({ rows, labelClassName = "", valueClassName = "" }) {
  return (
    // Card renders the <dl> itself: dl > div > dt/dd is the one wrapper level
    // the HTML spec allows.
    <Card as="dl" className="mt-stack divide-y divide-border">
      {rows.map(({ label, value, tone }) => (
        <div
          key={label}
          className="flex justify-between gap-4 px-gutter py-3 text-sm"
        >
          <dt className={`text-muted ${labelClassName}`}>{label}</dt>
          <dd
            className={`${
              tone === "success" ? "text-success" : "text-foreground"
            } ${valueClassName}`}
          >
            {value}
          </dd>
        </div>
      ))}
    </Card>
  );
}

export default function HealthPage() {
  const runtime = [
    { label: "Status", value: "Healthy", tone: "success" },
    { label: "Environment", value: process.env.NODE_ENV },
    { label: "APP_ENV", value: process.env.APP_ENV ?? "Not set" },
    { label: "Node runtime", value: process.version },
    { label: "Routes registered", value: `${navItems.length + 1}` },
    { label: "Checked at", value: new Date().toISOString() },
  ];

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
      description="Runtime and configuration status for this deployment. Server-side secrets are reported as configured or not set — never by value."
      status="Scaffold complete"
    >
      <section className="mt-section" aria-labelledby="runtime-heading">
        <SectionHeading id="runtime-heading">Runtime</SectionHeading>
        <DefinitionList
          rows={runtime}
          labelClassName="shrink-0"
          valueClassName="min-w-0 text-right font-mono break-all"
        />
      </section>

      <section className="mt-section" aria-labelledby="config-heading">
        <SectionHeading id="config-heading">Configuration</SectionHeading>
        <DefinitionList
          rows={config}
          labelClassName="min-w-0 font-mono break-all"
          valueClassName="shrink-0 text-right"
        />
      </section>
    </Screen>
  );
}

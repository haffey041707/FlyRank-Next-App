import Screen from "@/app/components/screen";
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

export default function HealthPage() {
  const runtime = [
    { label: "Status", value: "Healthy" },
    { label: "Environment", value: process.env.NODE_ENV },
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
    { label: "API_KEY", value: configured("API_KEY") },
    { label: "DATABASE_URL", value: configured("DATABASE_URL") },
  ];

  return (
    <Screen
      eyebrow="Diagnostics"
      title="Health"
      description="Runtime and configuration status for this deployment. Server-side secrets are reported as configured or not set — never by value."
      status="Scaffold complete"
    >
      <section className="mt-10" aria-labelledby="runtime-heading">
        <h2
          id="runtime-heading"
          className="text-xs font-medium tracking-widest text-zinc-500 uppercase dark:text-zinc-400"
        >
          Runtime
        </h2>
        <dl className="mt-4 divide-y divide-zinc-200 border-y border-zinc-200 dark:divide-zinc-800 dark:border-zinc-800">
          {runtime.map(({ label, value }) => (
            <div key={label} className="flex justify-between gap-4 py-3">
              <dt className="text-sm text-zinc-500 dark:text-zinc-400">
                {label}
              </dt>
              <dd className="font-mono text-sm text-zinc-900 dark:text-zinc-100">
                {value}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mt-10" aria-labelledby="config-heading">
        <h2
          id="config-heading"
          className="text-xs font-medium tracking-widest text-zinc-500 uppercase dark:text-zinc-400"
        >
          Configuration
        </h2>
        <dl className="mt-4 divide-y divide-zinc-200 border-y border-zinc-200 dark:divide-zinc-800 dark:border-zinc-800">
          {config.map(({ label, value }) => (
            <div key={label} className="flex justify-between gap-4 py-3">
              <dt className="font-mono text-sm text-zinc-500 dark:text-zinc-400">
                {label}
              </dt>
              <dd className="text-sm text-zinc-900 dark:text-zinc-100">
                {value}
              </dd>
            </div>
          ))}
        </dl>
      </section>
    </Screen>
  );
}

import Card from "./card";

/**
 * Shared placeholder shell for every routed screen. Server Component.
 * Colour, radius, and spacing all come from design tokens.
 */

const STATUS_VARIANTS = {
  "Scaffold complete": "bg-success-soft text-success ring-success/30",
  "Coming soon": "bg-warning-soft text-warning ring-warning/30",
  Blocked: "bg-danger-soft text-danger ring-danger/30",
};

const FALLBACK_STATUS = "bg-surface-hover text-muted ring-border-strong";

export function StatusBadge({ status }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-pill px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${
        STATUS_VARIANTS[status] ?? FALLBACK_STATUS
      }`}
    >
      <span className="size-1.5 rounded-pill bg-current" aria-hidden="true" />
      {status}
    </span>
  );
}

export function SectionHeading({ id, children }) {
  return (
    <h2
      id={id}
      className="text-xs font-medium tracking-widest text-muted uppercase"
    >
      {children}
    </h2>
  );
}

export default function Screen({
  eyebrow,
  title,
  description,
  status = "Coming soon",
  planned = [],
  children,
}) {
  return (
    <div className="mx-auto w-full max-w-3xl px-gutter py-section">
      <header>
        {eyebrow ? (
          <p className="text-xs font-medium tracking-widest text-primary-accent uppercase">
            {eyebrow}
          </p>
        ) : null}
        <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            {title}
          </h1>
          <StatusBadge status={status} />
        </div>
        <p className="mt-stack text-lg leading-8 text-muted">{description}</p>
      </header>

      {planned.length > 0 ? (
        <section className="mt-section" aria-labelledby="planned-heading">
          <SectionHeading id="planned-heading">
            Planned for this screen
          </SectionHeading>
          <Card className="mt-stack divide-y divide-border">
            {planned.map((item) => (
              <div
                key={item}
                className="flex items-start gap-3 px-gutter py-3 text-sm text-foreground"
              >
                <span
                  className="mt-2 size-1.5 shrink-0 rounded-pill bg-primary-accent"
                  aria-hidden="true"
                />
                {item}
              </div>
            ))}
          </Card>
        </section>
      ) : null}

      {children}
    </div>
  );
}

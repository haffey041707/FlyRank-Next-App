/**
 * Shared placeholder shell for every routed screen.
 * Server Component — it renders static content and needs no interactivity.
 */

const STATUS_STYLES = {
  "Scaffold complete":
    "bg-emerald-50 text-emerald-700 ring-emerald-600/20 dark:bg-emerald-500/10 dark:text-emerald-400 dark:ring-emerald-400/20",
  "Coming soon":
    "bg-amber-50 text-amber-700 ring-amber-600/20 dark:bg-amber-500/10 dark:text-amber-400 dark:ring-amber-400/20",
};

const FALLBACK_STATUS_STYLE =
  "bg-zinc-100 text-zinc-700 ring-zinc-600/20 dark:bg-zinc-500/10 dark:text-zinc-400 dark:ring-zinc-400/20";

export function StatusBadge({ status }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${
        STATUS_STYLES[status] ?? FALLBACK_STATUS_STYLE
      }`}
    >
      <span className="size-1.5 rounded-full bg-current" aria-hidden="true" />
      {status}
    </span>
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
    <div className="mx-auto w-full max-w-3xl px-6 py-12 sm:py-16">
      <header>
        {eyebrow ? (
          <p className="text-xs font-medium tracking-widest text-zinc-500 uppercase dark:text-zinc-400">
            {eyebrow}
          </p>
        ) : null}
        <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-3">
          <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-50">
            {title}
          </h1>
          <StatusBadge status={status} />
        </div>
        <p className="mt-4 text-lg leading-8 text-zinc-600 dark:text-zinc-400">
          {description}
        </p>
      </header>

      {planned.length > 0 ? (
        <section className="mt-10" aria-labelledby="planned-heading">
          <h2
            id="planned-heading"
            className="text-xs font-medium tracking-widest text-zinc-500 uppercase dark:text-zinc-400"
          >
            Planned for this screen
          </h2>
          <ul className="mt-4 divide-y divide-zinc-200 border-y border-zinc-200 dark:divide-zinc-800 dark:border-zinc-800">
            {planned.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 py-3 text-sm text-zinc-700 dark:text-zinc-300"
              >
                <span
                  className="mt-2 size-1.5 shrink-0 rounded-full bg-zinc-400 dark:bg-zinc-600"
                  aria-hidden="true"
                />
                {item}
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {children}
    </div>
  );
}

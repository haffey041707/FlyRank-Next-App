import Link from "next/link";
import { StatusBadge } from "@/app/components/screen";
import { navItems } from "@/lib/routes";

export default function Home() {
  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-12 sm:py-16">
      <header>
        <p className="text-xs font-medium tracking-widest text-zinc-500 uppercase dark:text-zinc-400">
          Home
        </p>
        <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-3">
          <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-50">
            AI Study Assistant
          </h1>
          <StatusBadge status="Scaffold complete" />
        </div>
        <p className="mt-4 text-lg leading-8 text-zinc-600 dark:text-zinc-400">
          Every screen from the spec is routed and reachable. Each one is a
          placeholder for now — the AI features land next.
        </p>
      </header>

      <section className="mt-10" aria-labelledby="screens-heading">
        <h2
          id="screens-heading"
          className="text-xs font-medium tracking-widest text-zinc-500 uppercase dark:text-zinc-400"
        >
          Screens
        </h2>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {navItems.map(({ href, label, description }) => (
            <li key={href}>
              <Link
                href={href}
                className="block h-full rounded-lg border border-zinc-200 bg-white p-4 transition-colors hover:border-zinc-300 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:border-zinc-700 dark:hover:bg-zinc-900"
              >
                <span className="block text-sm font-medium text-zinc-900 dark:text-zinc-100">
                  {label}
                </span>
                <span className="mt-1 block text-sm text-zinc-600 dark:text-zinc-400">
                  {description}
                </span>
                <span className="mt-2 block font-mono text-xs text-zinc-400 dark:text-zinc-500">
                  {href}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

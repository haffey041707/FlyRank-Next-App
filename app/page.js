import Link from "next/link";
import Button from "@/app/components/button";
import Card from "@/app/components/card";
import { SectionHeading, StatusBadge } from "@/app/components/screen";
import { navItems } from "@/lib/routes";

export default function Home() {
  return (
    <div className="mx-auto w-full max-w-3xl px-gutter py-section">
      <header>
        <p className="text-xs font-medium tracking-widest text-primary-accent uppercase">
          Home
        </p>
        <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-3">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            AI Study Assistant
          </h1>
          <StatusBadge status="Scaffold complete" />
        </div>
        <p className="mt-stack text-lg leading-8 text-muted">
          Every screen from the spec is routed and reachable. Each one is a
          placeholder for now — the AI features land next.
        </p>

        <div className="mt-stack flex flex-wrap gap-3">
          <Button href="/dashboard">Open dashboard</Button>
          <Button href="/health" variant="secondary">
            System health
          </Button>
        </div>
      </header>

      <section className="mt-section" aria-labelledby="screens-heading">
        <SectionHeading id="screens-heading">Screens</SectionHeading>
        <ul className="mt-stack grid gap-3 sm:grid-cols-2">
          {navItems.map(({ href, label, description }) => (
            <li key={href}>
              <Card
                as={Link}
                href={href}
                interactive
                className="block h-full p-4"
              >
                <span className="block text-sm font-medium text-foreground">
                  {label}
                </span>
                <span className="mt-1 block text-sm text-muted">
                  {description}
                </span>
                <span className="mt-2 block font-mono text-xs text-primary-accent">
                  {href}
                </span>
              </Card>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

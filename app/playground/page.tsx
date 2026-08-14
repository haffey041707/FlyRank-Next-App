import PlaygroundDemo from "@/playground/demo";
import ShadcnDemo from "@/playground/shadcn-demo";

export const metadata = {
  title: "Playground",
  description: "Hand-built Modal, Tabs, and Disclosure components.",
};

/**
 * Server Component. It renders the interactive demo, which is the only part
 * that needs the client.
 */
export default function PlaygroundPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-gutter py-section">
      <header>
        <p className="text-xs font-medium tracking-widest text-primary-accent uppercase">
          Playground
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          Hand-built components
        </h1>
        <p className="mt-stack text-lg leading-8 text-muted-foreground">
          Modal, Tabs, and Disclosure written from scratch in TypeScript — no
          shadcn, Radix, MUI, Headless UI, or Bootstrap.
        </p>
      </header>

      <div className="mt-section">
        <PlaygroundDemo />
      </div>

      <hr className="mt-section border-border" />

      <div className="mt-section">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">
          shadcn/ui, for comparison
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The same two patterns from{" "}
          <code className="font-mono text-primary-accent">
            npx shadcn@latest add dialog tabs
          </code>
          . See <code className="font-mono text-primary-accent">NOTES.md</code>{" "}
          for what they handle that the hand-built versions do not.
        </p>
        <div className="mt-section">
          <ShadcnDemo />
        </div>
      </div>
    </div>
  );
}

import Link from "next/link";
import MobileNav from "./mobile-nav";

/**
 * Simple top bar for the main column. Server Component — it renders the
 * <MobileNav /> trigger, which is the only part that needs browser state.
 */
export default function Header() {
  return (
    <header className="sticky top-0 z-40 flex items-center gap-3 border-b border-border bg-surface/85 px-4 py-2.5 backdrop-blur sm:px-gutter">
      <MobileNav />

      {/* Brand is shown here only at small widths; the sidebar carries it on desktop. */}
      <Link
        href="/"
        className="rounded-control text-sm font-semibold tracking-tight text-foreground lg:hidden"
      >
        AI Study Assistant
      </Link>

      <span className="ml-auto rounded-pill bg-primary-soft px-2.5 py-1 text-xs font-medium text-primary-accent ring-1 ring-primary/30 ring-inset">
        Scaffold
      </span>
    </header>
  );
}

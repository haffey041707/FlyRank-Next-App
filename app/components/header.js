import Link from "next/link";
import MobileNav from "./mobile-nav";

/**
 * Simple top bar for the main column. Server Component — it renders the
 * <MobileNav /> trigger, which is the only part that needs browser state.
 */
export default function Header() {
  return (
    <header className="sticky top-0 z-40 flex items-center gap-3 border-b border-zinc-200 bg-white/85 px-4 py-2.5 backdrop-blur sm:px-6 dark:border-zinc-800 dark:bg-zinc-950/85">
      <MobileNav />

      {/* Brand is shown here only at small widths; the sidebar carries it on desktop. */}
      <Link
        href="/"
        className="text-sm font-semibold tracking-tight text-zinc-900 lg:hidden dark:text-zinc-50"
      >
        AI Study Assistant
      </Link>

      <span className="ml-auto rounded-full bg-zinc-100 px-2.5 py-1 text-xs font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
        Scaffold
      </span>
    </header>
  );
}

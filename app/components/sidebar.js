import Link from "next/link";
import NavLinks from "./nav-links";

/**
 * Desktop sidebar. Server Component — the only interactive part is the link
 * list's active styling, which is delegated to <NavLinks />.
 * Hidden below lg, where <MobileNav /> takes over.
 */
export default function Sidebar() {
  return (
    <aside className="sticky top-0 hidden h-screen flex-col border-r border-zinc-200 bg-white lg:flex dark:border-zinc-800 dark:bg-zinc-950">
      <div className="border-b border-zinc-200 px-5 py-4 dark:border-zinc-800">
        <Link
          href="/"
          className="block text-sm font-semibold tracking-tight text-zinc-900 dark:text-zinc-50"
        >
          AI Study Assistant
        </Link>
        <p className="mt-0.5 text-xs text-zinc-500 dark:text-zinc-400">
          Study &amp; revision workspace
        </p>
      </div>

      <nav aria-label="Main" className="flex-1 overflow-y-auto px-3 py-4">
        <NavLinks />
      </nav>

      <div className="border-t border-zinc-200 px-5 py-3 text-xs text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
        Routed scaffold
      </div>
    </aside>
  );
}

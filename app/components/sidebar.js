import Link from "next/link";
import NavLinks from "./nav-links";

/**
 * Desktop sidebar. Server Component — the only interactive part is the link
 * list's active styling, which is delegated to <NavLinks />.
 * Hidden below lg, where <MobileNav /> takes over.
 */
export default function Sidebar() {
  return (
    <aside className="sticky top-0 hidden h-screen flex-col border-r border-border bg-surface lg:flex">
      <div className="border-b border-border px-5 py-4">
        <Link
          href="/"
          className="block rounded-control text-sm font-semibold tracking-tight text-foreground"
        >
          AI Study Assistant
        </Link>
        <p className="mt-0.5 text-xs text-muted-foreground">
          Study &amp; revision workspace
        </p>
      </div>

      <nav aria-label="Main" className="flex-1 overflow-y-auto px-3 py-4">
        <NavLinks />
      </nav>

      <div className="border-t border-border px-5 py-3 text-xs text-muted-foreground">
        Routed scaffold
      </div>
    </aside>
  );
}

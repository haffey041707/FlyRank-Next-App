"use client";

// This is the only Client Component in the scaffold. It needs the directive for
// two genuinely interactive behaviours: the mobile menu open/close state, and
// highlighting the active link via usePathname(). Every screen it wraps stays a
// Server Component.

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { navItems } from "@/lib/routes";

function MenuIcon({ open }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      className="size-5"
      aria-hidden="true"
    >
      {open ? (
        <path d="M6 6l12 12M18 6L6 18" />
      ) : (
        <path d="M4 7h16M4 12h16M4 17h16" />
      )}
    </svg>
  );
}

export default function SiteNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const linkClass = (href) => {
    const active = pathname === href;
    return [
      "rounded-md px-3 py-2 text-sm font-medium transition-colors",
      active
        ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
        : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100",
    ].join(" ");
  };

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200 bg-white/80 backdrop-blur dark:border-zinc-800 dark:bg-black/80">
      <nav
        aria-label="Main"
        className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-3"
      >
        <Link
          href="/"
          onClick={() => setOpen(false)}
          className="shrink-0 rounded-md text-sm font-semibold tracking-tight text-zinc-900 dark:text-zinc-50"
        >
          AI Study Assistant
        </Link>

        {/* Desktop navigation */}
        <ul className="hidden items-center gap-1 lg:flex">
          {navItems.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                aria-current={pathname === href ? "page" : undefined}
                className={linkClass(href)}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile trigger */}
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          className="inline-flex items-center justify-center rounded-md p-2 text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 lg:hidden dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
        >
          <MenuIcon open={open} />
        </button>
      </nav>

      {/* Mobile panel */}
      {open ? (
        <div
          id="mobile-nav"
          className="border-t border-zinc-200 bg-white lg:hidden dark:border-zinc-800 dark:bg-black"
        >
          <ul className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-3">
            {navItems.map(({ href, label, description }) => (
              <li key={href}>
                <Link
                  href={href}
                  onClick={() => setOpen(false)}
                  aria-current={pathname === href ? "page" : undefined}
                  className={`block ${linkClass(href)}`}
                >
                  {label}
                  <span className="mt-0.5 block text-xs font-normal opacity-70">
                    {description}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </header>
  );
}

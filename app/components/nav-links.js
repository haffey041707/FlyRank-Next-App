"use client";

// Client Component #1 — needed only for active-route styling, which requires
// usePathname(). It renders the same link list in both the desktop sidebar and
// the mobile drawer, so the active logic lives in exactly one place.

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navItems } from "@/lib/routes";

function isActive(pathname, href) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function NavLinks({ onNavigate, showDescriptions = false }) {
  const pathname = usePathname();

  return (
    <ul className="flex flex-col gap-1">
      {navItems.map(({ href, label, description }) => {
        const active = isActive(pathname, href);

        return (
          <li key={href}>
            <Link
              href={href}
              onClick={onNavigate}
              aria-current={active ? "page" : undefined}
              className={`block rounded-md px-3 py-2 text-sm font-medium ${
                active
                  ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
                  : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
              }`}
            >
              {label}
              {showDescriptions ? (
                <span className="mt-0.5 block text-xs font-normal opacity-70">
                  {description}
                </span>
              ) : null}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

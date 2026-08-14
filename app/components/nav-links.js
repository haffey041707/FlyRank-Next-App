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
              className={`block rounded-control px-3 py-2 text-sm font-medium transition-colors ${
                active
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-surface-hover hover:text-foreground"
              }`}
            >
              {label}
              {showDescriptions ? (
                <span className="mt-0.5 block text-xs font-normal opacity-80">
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

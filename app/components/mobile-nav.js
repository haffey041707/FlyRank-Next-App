"use client";

// Client Component #2 — needed only for the open/closed state of the compact
// navigation drawer. It is rendered inside a Server Component header and is
// hidden entirely at lg and above, where the sidebar takes over.

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import NavLinks from "./nav-links";

export default function MobileNav() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  // Escape closes the drawer. Subscribing to an external event source is what
  // effects are for; the state update happens in the listener, not the body.
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-expanded={open}
        aria-controls="mobile-drawer"
        aria-label="Open navigation"
        className="inline-flex items-center justify-center rounded-md p-2 text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          className="size-5"
          aria-hidden="true"
        >
          <path d="M4 7h16M4 12h16M4 17h16" />
        </svg>
      </button>

      {/*
        Portalled to document.body on purpose. The header sets backdrop-blur,
        and a backdrop-filter makes an element a containing block for fixed
        descendants — rendering the overlay inline would clip it to the header.
        `open` only flips after a click, so document is always available here.
      */}
      {open
        ? createPortal(
            <div className="fixed inset-0 z-50 lg:hidden">
              <button
                type="button"
                onClick={close}
                aria-label="Close navigation"
                className="absolute inset-0 h-full w-full bg-zinc-900/40 dark:bg-black/60"
              />

              <div
                id="mobile-drawer"
                className="absolute inset-y-0 left-0 flex w-72 max-w-[85%] flex-col border-r border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950"
              >
                <div className="flex items-center justify-between border-b border-zinc-200 px-4 py-3 dark:border-zinc-800">
                  <span className="text-sm font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
                    AI Study Assistant
                  </span>
                  <button
                    type="button"
                    onClick={close}
                    aria-label="Close navigation"
                    className="inline-flex items-center justify-center rounded-md p-2 text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.75"
                      strokeLinecap="round"
                      className="size-5"
                      aria-hidden="true"
                    >
                      <path d="M6 6l12 12M18 6L6 18" />
                    </svg>
                  </button>
                </div>

                <nav
                  aria-label="Main"
                  className="flex-1 overflow-y-auto px-3 py-4"
                >
                  <NavLinks onNavigate={close} showDescriptions />
                </nav>
              </div>
            </div>,
            document.body,
          )
        : null}
    </div>
  );
}

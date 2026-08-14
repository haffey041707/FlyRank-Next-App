"use client";

/**
 * Disclosure — hand-built, no component library.
 *
 * The WAI-ARIA Disclosure pattern by hand:
 *  - a real <button> toggling aria-expanded and aria-controls
 *  - the panel is genuinely removed from the a11y tree when collapsed
 *    (`hidden`), not just visually hidden
 *  - controlled or uncontrolled via `open` / `defaultOpen`
 *  - a `DisclosureGroup` accordion variant where opening one closes the rest
 */

import { useCallback, useId, useState, type ReactNode } from "react";

export type DisclosureProps = {
  summary: string;
  children: ReactNode;
  /** Uncontrolled initial state. Ignored when `open` is provided. */
  defaultOpen?: boolean;
  /** Controlled state. */
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`size-4 shrink-0 ${open ? "rotate-180" : ""}`}
      aria-hidden="true"
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

export default function Disclosure({
  summary,
  children,
  defaultOpen = false,
  open,
  onOpenChange,
}: DisclosureProps) {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const isControlled = open !== undefined;
  const isOpen = isControlled ? open : internalOpen;

  const baseId = useId();
  const panelId = `${baseId}-panel`;
  const buttonId = `${baseId}-button`;

  const toggle = useCallback(() => {
    const next = !isOpen;
    if (!isControlled) setInternalOpen(next);
    onOpenChange?.(next);
  }, [isOpen, isControlled, onOpenChange]);

  return (
    <div className="border-b border-border last:border-b-0">
      <h3>
        <button
          type="button"
          id={buttonId}
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={toggle}
          className="flex w-full items-center justify-between gap-4 py-3 text-left text-sm font-medium text-foreground transition-colors hover:text-primary-accent"
        >
          {summary}
          <Chevron open={isOpen} />
        </button>
      </h3>

      {/* `hidden` removes the panel from the accessibility tree entirely, so a
          screen reader cannot reach collapsed content by virtual cursor. */}
      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        hidden={!isOpen}
        className="pb-3 text-sm text-muted-foreground"
      >
        {children}
      </div>
    </div>
  );
}

export type DisclosureGroupItem = {
  id: string;
  summary: string;
  content: ReactNode;
};

/**
 * Accordion variant: at most one panel open at a time.
 */
export function DisclosureGroup({
  items,
  defaultOpenId,
}: {
  items: DisclosureGroupItem[];
  defaultOpenId?: string;
}) {
  const [openId, setOpenId] = useState<string | null>(defaultOpenId ?? null);

  return (
    <div>
      {items.map((item) => (
        <Disclosure
          key={item.id}
          summary={item.summary}
          open={openId === item.id}
          onOpenChange={(next) => setOpenId(next ? item.id : null)}
        >
          {item.content}
        </Disclosure>
      ))}
    </div>
  );
}

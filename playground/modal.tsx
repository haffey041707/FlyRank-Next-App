"use client";

/**
 * Modal Dialog — hand-built, no component library.
 *
 * Implements, by hand:
 *  - portal to document.body (escapes ancestor stacking/containing blocks)
 *  - focus moved into the dialog on open, restored to the trigger on close
 *  - Tab / Shift+Tab focus trap inside the dialog
 *  - Escape to close, backdrop click to close
 *  - background scroll lock
 *  - role="dialog" aria-modal with labelledby/describedby wiring
 *  - aria-hidden on sibling content so screen readers stay inside the dialog
 */

import { useCallback, useEffect, useId, useRef, type ReactNode } from "react";
import { createPortal } from "react-dom";

const FOCUSABLE = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled]):not([type='hidden'])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  "[tabindex]:not([tabindex='-1'])",
].join(",");

export type ModalProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children?: ReactNode;
  footer?: ReactNode;
  /** Clicking the backdrop closes by default. */
  closeOnBackdropClick?: boolean;
};

export default function Modal({
  open,
  onClose,
  title,
  description,
  children,
  footer,
  closeOnBackdropClick = true,
}: ModalProps) {
  const panelRef = useRef<HTMLDivElement | null>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);
  const reactId = useId();
  const titleId = `modal-title-${reactId}`;
  const descriptionId = `modal-desc-${reactId}`;

  const getFocusable = useCallback((): HTMLElement[] => {
    const panel = panelRef.current;
    if (!panel) return [];
    return Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
      (el) => el.offsetParent !== null || el === document.activeElement,
    );
  }, []);

  // Remember the trigger, move focus in, and restore it on close.
  useEffect(() => {
    if (!open) return;

    previouslyFocused.current = document.activeElement as HTMLElement | null;

    // Focus the first focusable control, else the panel itself.
    const focusables = getFocusable();
    (focusables[0] ?? panelRef.current)?.focus();

    return () => {
      previouslyFocused.current?.focus?.();
    };
  }, [open, getFocusable]);

  // Escape to close, and a manual Tab trap.
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.stopPropagation();
        onClose();
        return;
      }

      if (event.key !== "Tab") return;

      const focusables = getFocusable();
      if (focusables.length === 0) {
        // Nothing focusable inside: keep focus on the panel.
        event.preventDefault();
        panelRef.current?.focus();
        return;
      }

      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = document.activeElement;

      if (event.shiftKey && (active === first || active === panelRef.current)) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown, true);
    return () => document.removeEventListener("keydown", onKeyDown, true);
  }, [open, onClose, getFocusable]);

  // Lock background scrolling while open, preserving the scrollbar gutter so
  // the page behind does not shift.
  useEffect(() => {
    if (!open) return;

    const { body, documentElement } = document;
    const previousOverflow = body.style.overflow;
    const previousPaddingRight = body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - documentElement.clientWidth;

    body.style.overflow = "hidden";
    if (scrollbarWidth > 0) {
      body.style.paddingRight = `${scrollbarWidth}px`;
    }

    return () => {
      body.style.overflow = previousOverflow;
      body.style.paddingRight = previousPaddingRight;
    };
  }, [open]);

  // Hide the rest of the app from assistive tech while the dialog is open.
  useEffect(() => {
    if (!open) return;

    const siblings = Array.from(document.body.children).filter(
      (child) => child !== panelRef.current?.closest("[data-modal-root]"),
    ) as HTMLElement[];

    const previous = siblings.map(
      (el) => [el, el.getAttribute("aria-hidden")] as const,
    );
    siblings.forEach((el) => el.setAttribute("aria-hidden", "true"));

    return () => {
      previous.forEach(([el, value]) => {
        if (value === null) el.removeAttribute("aria-hidden");
        else el.setAttribute("aria-hidden", value);
      });
    };
  }, [open]);

  if (!open) return null;

  return createPortal(
    <div
      data-modal-root=""
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      <div
        className="absolute inset-0 bg-background/80"
        onClick={closeOnBackdropClick ? onClose : undefined}
        aria-hidden="true"
      />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={description ? descriptionId : undefined}
        tabIndex={-1}
        className="relative z-10 w-full max-w-md rounded-card border border-border bg-surface p-gutter shadow-xl outline-none"
      >
        <h2
          id={titleId}
          className="text-lg font-semibold tracking-tight text-foreground"
        >
          {title}
        </h2>

        {description ? (
          <p id={descriptionId} className="mt-2 text-sm text-muted-foreground">
            {description}
          </p>
        ) : null}

        {children ? <div className="mt-4">{children}</div> : null}

        <div className="mt-6 flex justify-end gap-3">
          {footer ?? (
            <button
              type="button"
              onClick={onClose}
              className="inline-flex h-10 items-center justify-center rounded-control border border-transparent bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-hover"
            >
              Close
            </button>
          )}
        </div>
      </div>
    </div>,
    document.body,
  );
}

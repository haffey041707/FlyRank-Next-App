"use client";

/**
 * Tabs — hand-built, no component library.
 *
 * Follows the WAI-ARIA Tabs pattern by hand:
 *  - role="tablist" / "tab" / "tabpanel" with aria-selected and aria-controls
 *  - roving tabindex: exactly one tab is in the tab order at a time
 *  - ArrowLeft / ArrowRight move between tabs (wrapping), Home / End jump
 *  - activation follows focus (automatic activation)
 *  - disabled tabs are skipped by keyboard navigation
 *  - controlled or uncontrolled via `value` / `defaultValue`
 */

import { useCallback, useId, useRef, useState, type ReactNode } from "react";

export type TabItem = {
  value: string;
  label: string;
  content: ReactNode;
  disabled?: boolean;
};

export type TabsProps = {
  items: TabItem[];
  /** Uncontrolled starting tab. Ignored when `value` is provided. */
  defaultValue?: string;
  /** Controlled selected tab. */
  value?: string;
  onValueChange?: (value: string) => void;
  "aria-label"?: string;
};

export default function Tabs({
  items,
  defaultValue,
  value,
  onValueChange,
  "aria-label": ariaLabel = "Tabs",
}: TabsProps) {
  const firstEnabled = items.find((item) => !item.disabled)?.value;
  const [internalValue, setInternalValue] = useState<string>(
    defaultValue ?? firstEnabled ?? items[0]?.value ?? "",
  );

  const isControlled = value !== undefined;
  const selected = isControlled ? value : internalValue;

  const baseId = useId();
  const tabRefs = useRef<Map<string, HTMLButtonElement>>(new Map());

  const select = useCallback(
    (next: string) => {
      if (!isControlled) setInternalValue(next);
      onValueChange?.(next);
    },
    [isControlled, onValueChange],
  );

  const focusTab = useCallback((tabValue: string) => {
    tabRefs.current.get(tabValue)?.focus();
  }, []);

  const onKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    const enabled = items.filter((item) => !item.disabled);
    if (enabled.length === 0) return;

    const currentIndex = enabled.findIndex((item) => item.value === selected);
    let nextIndex: number | null = null;

    switch (event.key) {
      case "ArrowRight":
        nextIndex = (currentIndex + 1) % enabled.length;
        break;
      case "ArrowLeft":
        nextIndex = (currentIndex - 1 + enabled.length) % enabled.length;
        break;
      case "Home":
        nextIndex = 0;
        break;
      case "End":
        nextIndex = enabled.length - 1;
        break;
      default:
        return;
    }

    event.preventDefault();
    const nextValue = enabled[nextIndex].value;
    select(nextValue);
    focusTab(nextValue);
  };

  return (
    <div>
      <div
        role="tablist"
        aria-label={ariaLabel}
        className="flex gap-1 border-b border-border"
      >
        {items.map((item) => {
          const isSelected = item.value === selected;

          return (
            <button
              key={item.value}
              ref={(node) => {
                if (node) tabRefs.current.set(item.value, node);
                else tabRefs.current.delete(item.value);
              }}
              type="button"
              role="tab"
              id={`${baseId}-tab-${item.value}`}
              aria-selected={isSelected}
              aria-controls={`${baseId}-panel-${item.value}`}
              // Roving tabindex: only the selected tab is reachable by Tab.
              tabIndex={isSelected ? 0 : -1}
              disabled={item.disabled}
              onClick={() => !item.disabled && select(item.value)}
              onKeyDown={onKeyDown}
              className={`-mb-px rounded-t-control border-b-2 px-4 py-2 text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${
                isSelected
                  ? "border-primary text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </div>

      {items.map((item) => {
        const isSelected = item.value === selected;

        return (
          <div
            key={item.value}
            role="tabpanel"
            id={`${baseId}-panel-${item.value}`}
            aria-labelledby={`${baseId}-tab-${item.value}`}
            // The panel itself is focusable so keyboard users can reach content
            // that contains no focusable elements.
            tabIndex={0}
            hidden={!isSelected}
            className="py-4 text-sm text-muted-foreground outline-none"
          >
            {isSelected ? item.content : null}
          </div>
        );
      })}
    </div>
  );
}

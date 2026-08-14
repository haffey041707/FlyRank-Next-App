"use client";

/**
 * Interactive demo for the hand-built playground components.
 * Client Component because it owns the modal's open state.
 */

import { useState } from "react";
import Disclosure, { DisclosureGroup } from "./disclosure";
import Modal from "./modal";
import Tabs from "./tabs";

export default function PlaygroundDemo() {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState("overview");

  return (
    <div className="space-y-section">
      <section aria-labelledby="modal-heading">
        <h2
          id="modal-heading"
          className="text-xs font-medium tracking-widest text-muted-foreground uppercase"
        >
          Modal dialog
        </h2>
        <p className="mt-stack text-sm text-muted-foreground">
          Focus moves in on open and returns to the trigger on close. Tab is
          trapped, Escape closes, the backdrop closes, and the page behind stops
          scrolling.
        </p>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="mt-stack inline-flex h-10 items-center justify-center rounded-control border border-transparent bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-hover"
          data-testid="open-modal"
        >
          Open dialog
        </button>

        <Modal
          open={open}
          onClose={() => setOpen(false)}
          title="Hand-built dialog"
          description="No component library — portal, focus trap, and scroll lock written by hand."
        >
          <p className="text-sm text-muted-foreground">
            Press Tab repeatedly: focus cycles between the controls below and
            never escapes the dialog.
          </p>
          <input
            type="text"
            placeholder="A focusable input"
            className="mt-4 w-full rounded-control border border-border bg-background px-3 py-2 text-sm text-foreground outline-none"
          />
        </Modal>
      </section>

      <section aria-labelledby="tabs-heading">
        <h2
          id="tabs-heading"
          className="text-xs font-medium tracking-widest text-muted-foreground uppercase"
        >
          Tabs
        </h2>
        <p className="mt-stack text-sm text-muted-foreground">
          Roving tabindex with arrow-key navigation. Selected tab:{" "}
          <code className="font-mono text-primary-accent">{tab}</code>
        </p>
        <div className="mt-stack">
          <Tabs
            aria-label="Playground tabs"
            value={tab}
            onValueChange={setTab}
            items={[
              {
                value: "overview",
                label: "Overview",
                content:
                  "Arrow keys move between tabs and wrap at both ends. Home and End jump to the first and last tab.",
              },
              {
                value: "keyboard",
                label: "Keyboard",
                content:
                  "Only the selected tab is in the tab order, so Tab moves past the tablist into the panel.",
              },
              {
                value: "disabled",
                label: "Disabled",
                content: "You should not be able to reach this tab.",
                disabled: true,
              },
            ]}
          />
        </div>
      </section>

      <section aria-labelledby="disclosure-heading">
        <h2
          id="disclosure-heading"
          className="text-xs font-medium tracking-widest text-muted-foreground uppercase"
        >
          Disclosure
        </h2>
        <p className="mt-stack text-sm text-muted-foreground">
          A single disclosure, then an accordion group where opening one closes
          the others.
        </p>

        <div className="mt-stack rounded-card border border-border bg-surface px-gutter">
          <Disclosure summary="What makes this a disclosure?" defaultOpen>
            A button that toggles{" "}
            <code className="font-mono">aria-expanded</code> and controls a
            region. Collapsed content uses{" "}
            <code className="font-mono">hidden</code>, so it leaves the
            accessibility tree rather than just disappearing visually.
          </Disclosure>
        </div>

        <div className="mt-stack rounded-card border border-border bg-surface px-gutter">
          <DisclosureGroup
            defaultOpenId="one"
            items={[
              {
                id: "one",
                summary: "First panel",
                content: "Opening another panel closes this one.",
              },
              {
                id: "two",
                summary: "Second panel",
                content: "State is lifted into the group, so only one is open.",
              },
              {
                id: "three",
                summary: "Third panel",
                content: "Each button keeps its own aria-controls wiring.",
              },
            ]}
          />
        </div>
      </section>
    </div>
  );
}

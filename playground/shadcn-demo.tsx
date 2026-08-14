"use client";

/**
 * shadcn/ui Dialog and Tabs, rendered beside the hand-built equivalents so the
 * two can be compared in the same theme.
 *
 * These come from `npx shadcn@latest add dialog tabs` and are built on Base UI
 * primitives — unlike the components in this folder, which use no library.
 */

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

export default function ShadcnDemo() {
  return (
    <div className="space-y-section">
      <section aria-labelledby="shadcn-dialog-heading">
        <h2
          id="shadcn-dialog-heading"
          className="text-xs font-medium tracking-widest text-muted-foreground uppercase"
        >
          shadcn Dialog
        </h2>
        <p className="mt-stack text-sm text-muted-foreground">
          Same theme tokens, but focus management, scroll locking, and the
          open/close animations come from Base UI rather than hand-written
          effects.
        </p>

        <Dialog>
          <DialogTrigger
            render={<Button className="mt-stack" data-testid="open-shadcn" />}
          >
            Open shadcn dialog
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>shadcn dialog</DialogTitle>
              <DialogDescription>
                Rendered through a portal with its own focus guards and an
                animated exit that the hand-built version does not have.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose render={<Button variant="outline" />}>
                Cancel
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </section>

      <section aria-labelledby="shadcn-tabs-heading">
        <h2
          id="shadcn-tabs-heading"
          className="text-xs font-medium tracking-widest text-muted-foreground uppercase"
        >
          shadcn Tabs
        </h2>
        <p className="mt-stack text-sm text-muted-foreground">
          Supports vertical orientation and RTL out of the box; the hand-built
          version assumes horizontal, left-to-right.
        </p>

        <div className="mt-stack">
          <Tabs defaultValue="overview">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="keyboard">Keyboard</TabsTrigger>
              <TabsTrigger value="disabled" disabled>
                Disabled
              </TabsTrigger>
            </TabsList>
            <TabsContent
              value="overview"
              className="text-sm text-muted-foreground"
            >
              The active indicator is driven by data attributes rather than
              conditional class strings.
            </TabsContent>
            <TabsContent
              value="keyboard"
              className="text-sm text-muted-foreground"
            >
              Arrow keys, Home, and End behave the same, but the direction of
              travel flips automatically under RTL.
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
}

# Hand-built components vs shadcn/ui

Three components in [`playground/`](playground/) were written from scratch in
React + TypeScript with **no component library** — no shadcn, Radix, Base UI,
MUI, Headless UI, or Bootstrap:

| Component | File | Behaviour written by hand |
| --- | --- | --- |
| Modal Dialog | [`playground/modal.tsx`](playground/modal.tsx) | portal, focus move + restore, Tab/Shift+Tab trap, Escape, backdrop click, scroll lock, `aria-hidden` on background |
| Tabs | [`playground/tabs.tsx`](playground/tabs.tsx) | `tablist`/`tab`/`tabpanel` roles, roving tabindex, Arrow/Home/End keys, disabled-tab skipping, controlled + uncontrolled |
| Disclosure | [`playground/disclosure.tsx`](playground/disclosure.tsx) | `aria-expanded` + `aria-controls`, `hidden` panel, controlled + uncontrolled, accordion group |

All three pass a 22-assertion behavioural test suite driven through the Chrome
DevTools Protocol (focus trap held over 8 Tab presses, focus restored to the
trigger on close, roving tabindex, etc.).

shadcn/ui was then installed and its `Dialog` and `Tabs` added:

```bash
npx shadcn@latest init
npx shadcn@latest add dialog tabs
```

Both sets render side by side on [`/playground`](app/playground/page.tsx) under
the same design tokens. Note that this version of shadcn/ui builds on
**Base UI** (`@base-ui/react`), not Radix.

---

## What shadcn handled better

### 1. Exit animations — the component stays mounted while it closes

This is the clearest gap. My modal ends with:

```tsx
if (!open) return null;
```

The moment `open` flips to `false` the DOM node is gone, so **an exit animation
is impossible**. The dialog can fade in but can only ever vanish instantly.

shadcn's dialog keeps the element mounted through the close transition and
drives it from a `data-closed` state, with **5** exit-state classes against my
**0**:

```tsx
"data-open:animate-in  data-open:fade-in-0  data-open:zoom-in-95
 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95"
```

Doing this by hand is not a styling tweak — it means introducing a third state
(`open` / `closing` / `closed`), delaying unmount until `transitionend` or a
timeout, cancelling that timer if the dialog reopens mid-close, and making sure
focus restoration still fires at the right moment. Base UI absorbs all of it.

### 2. Tabs work in orientations and writing directions mine does not

My `onKeyDown` hard-codes one axis and one direction:

```tsx
case "ArrowRight": nextIndex = (currentIndex + 1) % enabled.length; break;
case "ArrowLeft":  nextIndex = (currentIndex - 1 + enabled.length) % enabled.length; break;
```

There is no `orientation` prop anywhere in my file (0 references). So:

- **Vertical tabs are unreachable by keyboard.** The ARIA pattern says a vertical
  tablist should respond to ArrowUp/ArrowDown; mine ignores both.
- **RTL is backwards.** Under `dir="rtl"`, ArrowRight should move to the
  *previous* tab because "next" is to the left. Mine always moves forward, so
  the keyboard fights the visual order for Arabic, Hebrew, Persian, and Urdu
  readers.

shadcn's `Tabs` takes `orientation` and ships `data-horizontal` / `data-vertical`
styling, with Base UI flipping arrow direction for RTL underneath.

### 3. Composition instead of a fixed prop API

My modal takes strings — `title`, `description` — and renders fixed markup. It
exports 2 things. shadcn's dialog exports **10** composable parts
(`DialogTrigger`, `DialogHeader`, `DialogFooter`, `DialogClose`, …), so a caller
can put a form, an icon, or a nested control anywhere in the dialog without
touching the component. My version would need a new prop for each case.

Likewise my `Tabs` takes an `items` array, so every tab's content must be built
up front by the parent. shadcn's `TabsContent` lets each panel live where it is
written.

### 4. Polymorphism with types preserved

shadcn's parts accept a `render` prop to swap the underlying element while
keeping behaviour and ARIA wiring — used twice in `dialog.tsx`, and by my own
demo:

```tsx
<DialogTrigger render={<Button className="mt-stack" />}>Open</DialogTrigger>
```

My modal has no equivalent, so the trigger can never *be* my `Button`; the
caller has to wire `onClick` manually and re-implement whatever the trigger
should have done. Getting this right in TypeScript — inferring props from
whatever element is passed in — is genuinely hard, and it comes free here.

---

## What I expected to find and did not

Two differences I assumed existed turned out to be false when measured, so they
are recorded here rather than claimed above.

**Neither version uses `inert` on the background.** I expected shadcn to
neutralise background content while the dialog is open. It does not — measured
across both, `body > [inert]` is absent, and both instead set `aria-hidden` on
background siblings. Programmatically calling `.focus()` on a sidebar link
succeeds while *either* dialog is open:

```
HAND-BUILT modal   focusLandedOutside: true
SHADCN dialog      focusLandedOutside: true
```

**Focus does not recover from outside in either.** shadcn renders 2 focus-guard
sentinel nodes (mine renders 0), so I expected it to pull focus back when focus
was already outside the dialog. Parking focus on a background link and pressing
Tab:

```
HAND-BUILT modal   recovered into dialog: false  (landed on "Dashboard")
SHADCN dialog      recovered into dialog: false  (landed on "Dashboard")
```

Both walk on into the background. The guards matter for re-entry from browser
chrome, which a scripted test can't reproduce, so I am not claiming an advantage
I did not observe.

---

## Where the hand-built versions hold up

Worth noting so the comparison is not one-sided:

- **Escape, backdrop click, scroll lock, focus restore, and the Tab trap all
  work** and are verified by test.
- **Background `aria-hidden` is at parity** with shadcn — both hide sibling
  content from assistive tech and restore the previous values on close.
- **Scroll lock compensates for the scrollbar** by adding matching padding to
  `body`, so the page behind does not shift when the dialog opens.
- **The disclosure uses `hidden`**, so collapsed content leaves the
  accessibility tree entirely rather than merely being visually hidden — a real
  bug in many hand-rolled accordions.

## The honest summary

For a single, known use case, the hand-built components are ~150 lines each,
have no dependencies, and behave correctly. What shadcn buys is the **long tail**:
the closing animation, the orientation you didn't plan for, the writing direction
you don't read, the composition shape you haven't needed yet. Each is individually
small; together they are most of the work, and they are exactly the cases that get
skipped when you write it yourself under time pressure.

The cost is real too: shadcn pulled in `@base-ui/react`, `class-variance-authority`,
`clsx`, `tailwind-merge`, `lucide-react`, and `tw-animate-css`, and `init`
rewrote `app/globals.css` with its own token set — which collided with six of
this project's existing tokens and had to be reconciled by hand (see the comment
at the top of that file).

# FlyRank

Production-ready [Next.js](https://nextjs.org) application scaffold.

## Stack

| Concern   | Choice                    |
| --------- | ------------------------- |
| Framework | Next.js 16 (App Router)   |
| Language  | JavaScript                |
| Styling   | Tailwind CSS v4           |
| Linting   | ESLint (`eslint-config-next`) |

## Getting started

```bash
npm install
cp .env.example .env.local   # then fill in real values
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command         | Description                        |
| --------------- | ---------------------------------- |
| `npm run dev`   | Start the development server       |
| `npm run build` | Create an optimized production build |
| `npm start`     | Serve the production build         |
| `npm run lint`  | Run ESLint                         |

## Environment variables

**1. Copy the template.**

```bash
cp .env.example .env.local
```

**2. Add your local values in `.env.local`.** That is the only file real values
belong in. `.env.example` is committed and must stay filled with blanks and
non-secret defaults.

```bash
ANTHROPIC_API_KEY=sk-ant-...   # your key, in .env.local only
APP_ENV=development
```

**3. Never commit `.env.local`.** It is git-ignored, along with `.env`,
`.env.production.local`, and every other `.env.*` file. `.env.example` is the
single tracked exception. Verify at any time with:

```bash
git ls-files | grep -E '^\.env'     # expect only: .env.example
git check-ignore .env .env.local .env.production.local
```

**4. Secrets stay server-side.** Next.js loads `.env*` into `process.env`, and
variables are server-only by default — readable in Server Components, route
handlers, and server actions, but never shipped to the browser. Only variables
prefixed `NEXT_PUBLIC_` are inlined into the client bundle at build time, where
anyone can read them. So:

| Variable | Scope | Rule |
| --- | --- | --- |
| `ANTHROPIC_API_KEY` | server-only | never prefix it, never send it to the client |
| `APP_ENV` | server-only | deployment environment |
| `NEXT_PUBLIC_APP_NAME` | public | safe, non-secret display value |
| `NEXT_PUBLIC_SITE_URL` | public | safe, non-secret display value |

Calls to the Claude API therefore belong in server code (a route handler or
server action) that reads `process.env.ANTHROPIC_API_KEY` — never in a
`"use client"` component. `/health` reflects this: it reports whether a secret
is configured, never its value.

If you rotate or add a variable, restart the dev server — `.env*` files are read
at startup.

## Design system

All visual values live in one `@theme` block in [`app/globals.css`](app/globals.css)
and are consumed as Tailwind utilities. Components never hard-code a colour,
radius, or spacing value — every hex literal in the codebase is in that file.

| Token | Value | Utility |
| --- | --- | --- |
| `--color-background` | `#080d1a` | `bg-background` |
| `--color-surface` | `#0f1729` | `bg-surface` |
| `--color-surface-hover` | `#16203a` | `bg-surface-hover` |
| `--color-border` | `#1e2a44` | `border-border` |
| `--color-border-strong` | `#2a3a5c` | `border-border-strong` |
| `--color-foreground` | `#eaeef9` | `text-foreground` |
| `--color-muted` | `#9aa7c7` | `text-muted` |
| `--color-primary` | `#4f46e5` | `bg-primary` |
| `--color-primary-hover` | `#5850ec` | `hover:bg-primary-hover` |
| `--color-primary-foreground` | `#ffffff` | `text-primary-foreground` |
| `--color-primary-accent` | `#818cf8` | `text-primary-accent` |
| `--color-primary-soft` | `#161d3d` | `bg-primary-soft` |
| `--color-success` / `-soft` | `#34d399` / `#0c2a22` | `text-success`, `bg-success-soft` |
| `--color-warning` / `-soft` | `#fbbf24` / `#2a2110` | `text-warning`, `bg-warning-soft` |
| `--color-danger` / `-soft` | `#f87171` / `#2c1519` | `text-danger`, `bg-danger-soft` |
| `--radius-control` | `0.5rem` | `rounded-control` |
| `--radius-card` | `0.75rem` | `rounded-card` |
| `--radius-pill` | `9999px` | `rounded-pill` |
| `--spacing-gutter` | `1.5rem` | `px-gutter` |
| `--spacing-section` | `2.5rem` | `mt-section` |
| `--spacing-stack` | `1rem` | `mt-stack` |
| `--spacing-sidebar` | `16rem` | sidebar grid column |

**Spacing conventions:** `gutter` for horizontal page and card padding,
`section` for the gap between major page sections, `stack` for the gap between
related blocks within a section.

**Contrast:** every foreground/background pair meets WCAG AA (4.5:1). Body text
is 16.71:1, muted text 8.06:1, button labels 6.29:1, and each status badge
6.18:1 or better against its own soft background.

**Theme:** dark-first — one professional navy/indigo theme rather than a
light/dark pair, with `color-scheme: dark` so native controls match. Adding a
light theme means redefining these same tokens under a media query or
`[data-theme]` selector; no component would change.

**Primitives:** `Card` and `Button` ([app/components/](app/components/)) exist so
surfaces and actions are token-driven by construction rather than by convention.

## Routes

Every screen from the spec exists as a routed placeholder.

| Route          | Screen      | Status            |
| -------------- | ----------- | ----------------- |
| `/`            | Home        | Scaffold complete |
| `/dashboard`   | Dashboard   | Coming soon       |
| `/study`       | Study       | Coming soon       |
| `/quiz`        | Quiz        | Coming soon       |
| `/flashcards`  | Flashcards  | Coming soon       |
| `/study-plan`  | Study Plan  | Coming soon       |
| `/history`     | History     | Coming soon       |
| `/settings`    | Settings    | Coming soon       |
| `/health`      | Health      | Scaffold complete |

`/health` is rendered per request (`dynamic = "force-dynamic"`) so it reports the
running server, not build-time values. It shows whether server-side variables are
configured — never their values.

## Project structure

```
app/
  layout.js            root layout + app shell (Server)
  page.js              /
  globals.css          Tailwind v4 entry
  components/
    sidebar.js         desktop sidebar          (Server)
    header.js          simple top bar           (Server)
    screen.js          placeholder shell, badge (Server)
    card.js            surface primitive        (Server)
    button.js          action primitive         (Server)
    nav-links.js       link list, active state  ("use client")
    mobile-nav.js      compact drawer + toggle  ("use client")
  dashboard/page.js    /dashboard
  study/page.js        /study
  quiz/page.js         /quiz
  flashcards/page.js   /flashcards
  study-plan/page.js   /study-plan
  history/page.js      /history
  settings/page.js     /settings
  health/page.js       /health
lib/
  routes.js            single source of truth for the nav + screen list
public/                static assets served from /
.env.example           environment variable template (no secrets)
```

### Application shell

`app/layout.js` is the root layout. Below `lg` the sidebar is hidden and the
header exposes a compact drawer; at `lg` and above the shell becomes a
`16rem | 1fr` grid with a sticky full-height sidebar. Verified with no
horizontal overflow at both 375px and 1280px.

### Server vs Client Components

Every page, the layout, the sidebar, and the header are Server Components.
Exactly two files carry `"use client"`, each for one specific browser need:

| File | Why it needs the client |
| --- | --- |
| `app/components/nav-links.js` | `usePathname()` for active-route styling |
| `app/components/mobile-nav.js` | open/closed state of the drawer |

The drawer overlay is portalled to `document.body`. The header sets
`backdrop-blur`, and a `backdrop-filter` makes an element a containing block for
`position: fixed` descendants — rendered inline, the overlay would be clipped to
the header's box.

Adding a screen means adding one entry to `lib/routes.js` plus its `page.js`.

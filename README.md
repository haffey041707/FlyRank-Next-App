# FlyRank

Production-ready [Next.js](https://nextjs.org) application scaffold.

## Stack

| Concern   | Choice                    |
| --------- | ------------------------- |
| Framework | Next.js 16 (App Router)   |
| Language  | JavaScript, with TypeScript for `playground/` and `components/ui/` |
| Styling   | Tailwind CSS v4           |
| UI        | hand-built components + shadcn/ui (Base UI) |
| Linting   | ESLint (`eslint-config-next`) |

## Component playground

[`playground/`](playground/) holds a Modal, Tabs, and Disclosure written from
scratch in React + TypeScript with **no component library**, plus a shadcn/ui
Dialog and Tabs for comparison. Both sets render at
[`/playground`](app/playground/page.tsx).

[`NOTES.md`](NOTES.md) records what shadcn handles more completely than the
hand-built versions — and two differences that turned out to be false when
actually measured.

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

### API

| Endpoint | Method | Returns |
| --- | --- | --- |
| `/api/health` | `GET` | `{ status, service, environment, timestamp, uptimeSeconds }` |

`app/api/health/route.js` is a Route Handler built on the Web `Response` API. It
returns safe, non-secret information only and sends `Cache-Control: no-store` so
no proxy serves a stale check. Route Handlers are uncached by default in
Next.js 16.

`/health` is a Server Component that fetches that endpoint **on the server**
(`cache: "no-store"`) and renders the result — no client-side data fetching and
no `"use client"`. A server fetch has no origin to resolve a relative path
against, so the page derives an absolute URL from the request's
`x-forwarded-host`/`host` headers, falling back to `NEXT_PUBLIC_SITE_URL`.

Both pages are rendered per request (`dynamic = "force-dynamic"`) so they report
the running server, not build-time values. `fetchHealth()` never throws: a failed
check is a health result, so a connection failure or a non-2xx response renders a
visible error state instead of a crash. The page reports whether server-side
variables are configured — never their values.

## Deployment

Deployed on [Vercel](https://vercel.com), connected to this GitHub repository.
Vercel detects Next.js automatically — framework preset, build command
(`next build`), install command, and output directory all resolve without
configuration, so this repo intentionally ships **no `vercel.json`**. Add one
only when you need something the defaults do not cover (custom headers, redirects,
cron, or region pinning).

### Connecting the repository

1. On Vercel: **Add New → Project → Import Git Repository**, and pick
   `FlyRank-Next-App`.
2. Leave the framework preset on the detected **Next.js**; leave build and output
   settings untouched.
3. Add the environment variables below **before** the first deploy, so the initial
   build has them.
4. Deploy.

### Production deployments

Every push to `main` triggers a production deployment to the project's production
domain. `main` is the production branch, so treat it as deployable at all times —
merge through a branch and let its preview build vouch for it first.

### Preview deployments

Every push to any other branch, and every pull request, gets its own isolated
preview deployment on a unique URL, built exactly like production. The PR gets a
comment with the link. Previews use the Preview environment's variables, so a
preview never touches production credentials.

### Environment variables

Set these in **Project → Settings → Environment Variables**, choosing which of
Production / Preview / Development each applies to. Values live in Vercel, never
in the repository — `.env.local` is git-ignored and never uploaded.

| Variable | Scope | Environments | Notes |
| --- | --- | --- | --- |
| `ANTHROPIC_API_KEY` | server-only | Production, Preview | Secret. Never prefix with `NEXT_PUBLIC_`. Use a separate key for Preview if you want isolated usage limits. |
| `APP_ENV` | server-only | all | `production` / `preview` / `development`. Surfaced by `/api/health`. |
| `NEXT_PUBLIC_APP_NAME` | public | all | Non-secret display value. |
| `NEXT_PUBLIC_SITE_URL` | public | all | Set to the deployment's own URL. |

Two things worth knowing:

- `NEXT_PUBLIC_*` values are **inlined at build time**, so changing one requires a
  redeploy, not just a restart. Server-only variables are read at runtime.
- Server-only variables are readable in Server Components, route handlers, and
  server actions — never in the browser. Keep Claude API calls server-side.

After deploying, `/health` fetches `/api/health` on the server and renders the
live result, so it doubles as a post-deploy smoke test: it shows `status: ok`,
the service name, the environment, and a fresh timestamp. It derives its own
origin from the request headers, so no domain is hard-coded and the same code
works on preview URLs, the production domain, and localhost.

## Project structure

```
app/
  layout.js            root layout + app shell (Server)
  page.js              /
  globals.css          Tailwind v4 entry + design tokens
  api/
    health/route.js    GET /api/health route handler
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

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

Real values live in `.env.local`, which is git-ignored and **must never be
committed**. `.env.example` is the checked-in template and contains placeholders
only. Variables prefixed with `NEXT_PUBLIC_` are exposed to the browser — keep
secrets unprefixed and server-side.

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
    screen.js          shared placeholder shell (Server)
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

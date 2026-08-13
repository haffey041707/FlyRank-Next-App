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

## Project structure

```
app/            App Router routes, layouts, and global styles
public/         Static assets served from /
.env.example    Environment variable template (no secrets)
eslint.config.mjs
next.config.mjs
postcss.config.mjs   Tailwind CSS v4 via @tailwindcss/postcss
```

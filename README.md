# Reader's Realm

My personal website for the stories I've read and watched — books, manga, manhwa,
anime, philosophy and web novels, all gathered in one place.

It's a little archive of everything that has stuck with me: what I finished, what
I'm partway through, what's queued up, and how I rated it. Built to feel like
walking into a mysterious old library rather than scrolling a spreadsheet.

## What's on it

- **A cinematic hero** — "Welcome to My World of Stories", with ambient rune glow
  and floating particles.
- **Five realms** — Written (books/novels), Inked (manga/manhwa), Animated (anime),
  Wisdom (self-improvement/philosophy) and Endless Scroll (web novels). Each one
  filters the archive.
- **The archive** — every title as a card with its cover, type, my personal rating
  and reading status. Search, filter by realm/status/genre, and sort by rating or
  title. Click any card for a detail view with synopsis, rating and my own notes.
- **Stories that stayed with me** — the handful of titles worth singling out, with
  short personal notes.
- **A chronicle** — charts and counters computed straight from the collection data.
- **Two moods** — Arcane mode (full particles and glow) or Quiet mode (toned down).
- **An atmospheric footer** — "The archive never ends."

The whole thing respects your OS "reduce motion" setting.

## Adding or changing titles

All the content lives in one file: [`src/data/collection.ts`](src/data/collection.ts).
Add, edit or remove entries there and the site updates — the realms, filters,
counters and charts are all derived from that list.

## Running it locally

You need Node.js and npm.

```sh
npm install
npm run dev
```

Then open the URL it prints (usually <http://localhost:8080>; if that port is
taken it will pick the next free one).

Other useful scripts:

```sh
npm run test      # run the test suite
npm run lint      # lint the project
npm run build     # production build
```

## Deployment

The site is deployed to GitHub Pages by
[`.github/workflows/deploy-pages.yml`](.github/workflows/deploy-pages.yml), which
runs on every push to `main`:

1. Installs dependencies and runs the checks (lint + tests).
2. Builds a **static export** — the app is normally server-rendered, but GitHub
   Pages only serves static files, so the build prerenders the routes to real
   HTML. This is switched on by the `GITHUB_PAGES=1` flag in `vite.config.ts`,
   which also disables the server bundle. Normal builds are unaffected.
3. Publishes the output to Pages.

The asset base path is worked out from the repository name at runtime, so the
same workflow works unchanged if the repo is ever renamed.

Once deployed, the site is at **https://mareeswaranc.github.io/readers-realm/**.

## Built with

TanStack Start, React, TypeScript, Tailwind CSS and Recharts.

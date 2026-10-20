# Project notes

### Git history

Avoid rewriting published git history — force pushing, or rebasing/amending/squashing
commits that are already pushed. Keep the main branch in a working state.

### Working in this repo

- The collection data lives in `src/data/collection.ts`; edit that file to add or
  change titles.
- Run `npm run dev` for the local dev server, `npm run test` for tests, and
  `npx eslint <files>` before wrapping up a change.

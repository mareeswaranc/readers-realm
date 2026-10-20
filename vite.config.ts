// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

const isPagesBuild = process.env["GITHUB_PAGES"] === "1";

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
    // GitHub Pages is static-only: prerender the routes to real HTML files.
    prerender: {
      enabled: isPagesBuild,
      autoSubfolderIndex: true,
      autoStaticPathsDiscovery: true,
      crawlLinks: true,
      failOnError: isPagesBuild,
    },
  },
  // For the static Pages build we skip the Cloudflare worker bundle entirely.
  ...(isPagesBuild ? { nitro: false } : {}),
  vite: isPagesBuild ? { base: process.env["VITE_BASE_PATH"] || "/" } : {},
});

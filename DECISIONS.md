# Decisions Log

This file records default decisions made while building Profilio where the
build spec (`docs/research-docs/profilio-build-prompt.md`) allowed for
judgment calls, plus any deviations from the spec's exact tech choices.

**Project name:** Profilio
**Repo slug:** `Profilio` (GitHub: `TheAmitChandra/Profilio`)

## Deviations from spec

- **Next.js 16.3.3 instead of "Next.js 15".** The spec was written when
  Next.js 15 was current. At build time, Next.js 16 is the latest stable
  release and `create-next-app@latest` installs it by default. Building on
  the currently-supported major version avoids shipping on a version already
  behind upstream. Verified via the framework's own bundled docs
  (`node_modules/next/dist/docs/02-guides/upgrading/version-16.md`) rather
  than assuming API compatibility with v15.
- **`runtime = "nodejs"` (default) instead of `runtime = "edge"` for the
  Satori SVG-rendering API route.** Next.js 16 deprecates the `edge` route
  segment config value outright ("Remove the `runtime` export from your
  route files" — `01-app/03-api-reference/03-file-conventions/02-route-segment-config/runtime.md`).
  Satori and `@resvg/resvg-wasm` run fine under the Node.js runtime, and
  Route Handlers are dynamic (uncached) by default in this version, so the
  reliability/latency goal from the spec is unaffected.
- **Route Handler `params` are `Promise`-based and must be awaited** — this
  has been required since Next 15 and is stricter (no sync fallback) in
  Next 16, so `app/api/og/[themeId]/route.ts` awaits `params`.

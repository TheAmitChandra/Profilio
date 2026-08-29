# Contributing to Profilio

Thanks for considering a contribution. Profilio is small on purpose — please read this before opening a PR.

## Getting set up

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) for the editor and
[http://localhost:3000/themes-gallery](http://localhost:3000/themes-gallery) to compare all themes at once.

## Before you open a PR

```bash
pnpm lint
pnpm test
pnpm e2e
pnpm build
```

All four must pass. `pnpm e2e` builds and boots a production server, so it's slower — run it before pushing, not on every save.

## Adding a theme

A theme is a `themes/<id>/` folder with:

- `tokens.css` — `[data-profilio-theme="<id>"][data-profilio-mode="dark|light"]` blocks defining the CSS custom properties in `themes/types.ts`'s `ThemeTokens`.
- `index.ts` — a `ThemeDefinition` (the same tokens as plain objects, plus a `style` config).

New themes must differ from every existing theme in **layout or typography**, not just color — see `themes/types.ts`'s `ThemeStyle` enums (`headingStyle`, `dividerStyle`, `techStackLayout`, `projectLayout`, `layout`) for the levers available. If none of the existing enum values fit, extend the type and the shared renderers in `themes/blockRenderers.tsx` (in-app preview) and `lib/markdown/render.ts` (markdown export) — both need to handle it.

Register the theme in `themes/registry.ts`, add it to `themes/all-tokens.css`, and check it renders correctly at `/themes-gallery` in both light and dark before opening a PR. Run a contrast check on your `fg`/`muted`/`accent` colors against `bg` — WCAG AA is 4.5:1 for body text, 3:1 for large text/accents used sparingly.

## Adding a badge preset

Tech-stack items (`lib/markdown/badgePresets.ts`) and social platforms (`lib/markdown/socialPresets.ts`) each render as a colorful `for-the-badge` shields.io badge with a real logo when the name matches a known preset, and fall back to a plain colored badge otherwise. To add one: find the [simple-icons](https://simpleicons.org/) slug and the brand's official color, add an entry to the relevant `PRESETS` map, and add common alternate spellings to `ALIASES` (e.g. "node" and "node.js" both resolving to `nodejs`).

## Extending the animated header

`lib/banner/buildBannerSvg.ts` (wave banner) and `lib/banner/buildTypingSvg.ts` (typing effect) are hand-written SVG with SMIL `<animate>`/`<animateTransform>` elements — Satori (used for the stats cards) can't emit animation, so these are built as raw strings instead. Both read theme tokens for color and `themes/types.ts`'s `HeadingStyle` for a literal (non-`var()`) font stack, since the SVG is served standalone via `<img>` and has no access to this app's CSS custom properties. If you add a new header style, wire it into `HEADER_BANNER_STYLES` in `lib/schema.ts`, the `renderHeaderBlock` switch in `lib/markdown/render.ts`, and the label map in `HeaderBlockEditor.tsx`.

## Adding a Signal Check rule

Rules live in `lib/linter/signalCheck.ts` as small pure functions taking a `ProfileDocument` and returning a `SignalCheckResult`. Add a unit test in `tests/signalCheck.test.ts` covering both the passing and failing case. Keep the `message` copy positive and actionable — see the existing rules for tone; this linter is meant to nudge, never block.

## Code style

TypeScript strict mode, no `any` without a comment explaining why. Prettier/ESLint config is in the repo — `pnpm lint` catches most of it.

## Reporting bugs / proposing features

Open an issue with what you expected vs. what happened. For features, a short rationale beats a long spec — this project favors restraint over surface area.

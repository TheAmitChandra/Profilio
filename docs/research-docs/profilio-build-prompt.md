# Build Prompt for Claude (paste this whole thing into Claude Code / VS Code)

---

**Project name: Profilio**
*(tagline: "Design your GitHub profile like a designer, not a form-filler.")*

Repo slug: `profilio` → your repo will live at `github.com/<you>/profilio`

Alternate names if `profilio` is taken on GitHub/npm: `gitfolio-studio`, `readme-canvas`, `profile-studio-oss`, `signalcard`. Pick one and use it consistently below (I'll refer to it as **Profilio** throughout — find-and-replace if you rename).

---

## ROLE

You are a senior full-stack product engineer and design-systems specialist. You are building **Profilio**, an open-source, public GitHub repo: a live visual canvas editor for designing beautiful GitHub profile READMEs, with a built-in opinionated design system (8-10 distinct themes) and a "Signal Check" linter that nudges users toward good information architecture instead of clutter. This tool must be genuinely beautiful, fast, and different from every existing profile-README generator — not another form-fill tool.

Read this entire spec before writing code. Build it in the phases described at the end, committing after each phase so progress is checkpointed. Ask me clarifying questions only if something here is truly ambiguous — otherwise make the best default decision and note it in a `DECISIONS.md` file at the repo root as you go.

---

## 1. PRODUCT VISION

Profilio is a drag-and-drop canvas where a developer assembles their GitHub profile README from blocks (bio, tech stack, pinned-project spotlight, stats widget, socials, etc.), sees a live, pixel-accurate markdown preview as they edit, picks from a small number of genuinely distinct, professionally designed themes (not color swaps — different layout/typography/spacing systems), and exports clean markdown ready to paste into their `<username>/<username>` repo.

The differentiator vs. every existing tool in this space:
1. **A real visual canvas**, not a settings form.
2. **A true design system** with 8-10 cohesive themes, each a distinct visual language.
3. **A "Signal Check" linter** — a scored checklist (see Section 6) that actively discourages clutter and nudges toward the patterns that make profiles actually effective (one clear CTA, 2-4 pinned projects, real proof, concise bio) instead of badge walls and dead widgets.
4. **Reliability by design** — offer both a hosted-widget mode and a GitHub Actions static-export mode for any dynamic stat cards, so nothing breaks from rate limits.

---

## 2. TECH STACK (use exactly this unless there's a strong reason not to — note any deviation in DECISIONS.md)

- **Framework:** Next.js 15 (App Router), TypeScript, deployed for Vercel
- **Styling:** Tailwind CSS + shadcn/ui components for the app chrome (editor UI, not the themes themselves)
- **Drag-and-drop / canvas:** `@dnd-kit/core` + `@dnd-kit/sortable` for the block-based section editor
- **State management:** Zustand (lightweight, avoids prop drilling through the canvas/preview/export tree)
- **Markdown preview:** `react-markdown` + `remark-gfm` (GitHub-flavored markdown: tables, task lists, strikethrough)
- **Raw markdown power-user mode:** Monaco editor (optional toggle next to the visual canvas)
- **Themed SVG card generation (for stat/spotlight widgets):** Satori (`satori` package) + `@vercel/og` running on Next.js Edge Runtime API routes; `@resvg/resvg-wasm` if PNG rasterization is needed
- **GitHub data:** GitHub GraphQL API v4 for stats (stars, contributions, top languages) — cache aggressively at the edge; ship a **GitHub Actions export mode** as an alternative to the hosted widgets (generates a static SVG committed to the user's own repo on a cron schedule) so nothing breaks from rate limits
- **Testing:** Vitest for units, Playwright for the core canvas/export E2E flow
- **Linting/formatting:** ESLint + Prettier, strict TypeScript (`strict: true`)
- **Package manager:** pnpm
- **License:** MIT

Do not introduce a backend database for v1 — everything is client-side state (Zustand + localStorage/sessionStorage for autosave of the in-progress design) plus stateless serverless functions for SVG rendering. No user accounts in v1.

---

## 3. DATA MODEL

Design a portable JSON schema describing a user's profile document. This is the single source of truth the canvas edits, the preview renders, and the export reads from.

```ts
type ProfileDocument = {
  version: 1;
  themeId: string; // references a theme in the theme registry
  colorMode: "dark" | "light";
  blocks: ProfileBlock[];
};

type ProfileBlock =
  | { id: string; type: "header"; name: string; tagline: string; avatarUrl?: string }
  | { id: string; type: "bio"; text: string } // enforce ~250 word soft cap in UI
  | { id: string; type: "techStack"; categories: { label: string; items: string[] }[] }
  | { id: string; type: "pinnedProjects"; projects: { name: string; description: string; url: string; metric?: string }[] } // max 4, linter warns above
  | { id: string; type: "statsWidget"; widget: "stats" | "streak" | "languages" | "activityGraph"; mode: "hosted" | "actions-export" }
  | { id: string; type: "socials"; links: { platform: string; url: string }[]; primaryCtaIndex?: number } // linter wants exactly one primary
  | { id: string; type: "customMarkdown"; raw: string };
```

Persist this as the export/import format too (a "Save/Load design" JSON file), so designs are portable and shareable independent of any backend.

---

## 4. THE CANVAS EDITOR (core feature #1)

Three-panel layout (desktop): **Block Library** (left, draggable block types) → **Canvas** (center, the ordered list of blocks the user has added, reorderable via `dnd-kit` sortable, each block has inline edit affordances) → **Live Preview** (right, `react-markdown` rendering of the exact markdown that will be exported, styled to approximate how it'll look on github.com).

Requirements:
- Adding a block from the library appends it to the canvas with sensible defaults.
- Every block is editable inline on the canvas (no modal dialogs for basic edits — this is what makes it feel "live" vs. "form").
- Reordering blocks updates the live preview instantly.
- Keyboard-accessible drag-and-drop (dnd-kit supports this — use it).
- Mobile/narrow viewports collapse to a tabbed view (Edit / Preview) rather than three columns.
- Autosave the `ProfileDocument` to localStorage on every change; restore on reload.
- Undo/redo (simple history stack in the Zustand store — last 50 states is fine).

---

## 5. THE THEME SYSTEM (core feature #2 — this is the differentiator, invest real design effort here)

Build a `themes/` registry where each theme is a self-contained set of design tokens (CSS variables: colors, font families, spacing scale, border radii, accent) plus a set of block renderers that lay the same `ProfileDocument` content out differently. Themes must differ in **layout and typography**, not just color — a color-only reskin fails the brief.

Ship these 10 themes at launch, each with a dark and light variant sharing the same token structure:

1. **Terminal** — monospace everywhere (JetBrains Mono / Commit Mono), ASCII-style dividers, `$ ` prompt-style section headers, green/amber-on-near-black accent.
2. **Blueprint** — subtle low-opacity dot-grid background, technical/drafting-style small-caps labels, tabular numerals for any stats, single restrained blue accent.
3. **Editorial** — serif display headings (e.g. a free serif like Source Serif or Lora) paired with a clean sans body, generous whitespace, magazine-style two-column layout for tech stack + bio.
4. **Brutalist** — heavy solid borders, high-contrast black/white blocks, oversized headings, zero border-radius, no shadows.
5. **Minimalist/Swiss** — strict grid, Inter/Helvetica, maximal whitespace, one tiny accent color used sparingly, no decorative elements at all.
6. **Neo-dark/Glow** — dark canvas base, single neon accent (configurable), soft gradient blobs behind the header, glassmorphism cards for stats.
7. **Bento** — modular card-grid layout (uniform rounded tiles), each block rendered as one bento cell; strongest for showing many small proof-points at once.
8. **Retro-computing** — pixel-accent iconography, subtle CRT-scanline texture behind the header only (kept tasteful, not gimmicky), playful but still structured.
9. **Corporate-clean** — recruiter-facing: tech-stack badges organized by category are prominent, disciplined spacing, professional restrained palette.
10. **Data-dashboard** — chart-forward layout for stats-heavy profiles, sparkline-style visual treatment for the stats widget block, tabular metrics emphasis.

For each theme, define:
- A CSS variable token file (`--profilio-bg`, `--profilio-fg`, `--profilio-muted`, `--profilio-accent`, `--profilio-font-heading`, `--profilio-font-body`, `--profilio-font-mono`, `--profilio-radius`, `--profilio-spacing-unit`)
- A `ThemeBlockRenderer` mapping for at minimum: header, bio, techStack, pinnedProjects — these four must look visibly distinct across all 10 themes when screenshotted side by side (this is your proof-of-differentiation artifact for the launch README).

Use Satori (JSX → SVG) for rendering any themed stat/spotlight card that needs to be an actual embeddable image (e.g. a themed "pinned projects" summary card) — write these as JSX components with inline styles (Satori doesn't support Tailwind classes or external stylesheets, remember explicit width/height, and load fonts as ArrayBuffers at request time).

---

## 6. THE SIGNAL CHECK LINTER (core feature #3 — your unique wedge, do not skip or under-build this)

Build a real-time scoring panel (collapsible sidebar or bottom drawer) that evaluates the current `ProfileDocument` against these 11 rules and shows a score out of 11 with a one-line actionable fix for each failing rule:

1. Exactly one primary call-to-action link exists (warn if 0, warn if 3+ competing external destinations with equal visual weight).
2. 2-4 pinned/featured projects present (warn if 0-1, warn if 6+).
3. At least one pinned project has a real number attached (stars/users/downloads) or a live demo link.
4. A `header` block with name + tagline exists and appears first.
5. The `bio` block is under ~250 words (flag if longer — "passion paragraph" anti-pattern).
6. No more than one `statsWidget` block (flag duplicates — "stats dashboard clutter" anti-pattern).
7. If a `statsWidget` is in `"hosted"` mode, suggest the `"actions-export"` mode for reliability (this is a genuine, real differentiator vs. the unmaintained incumbent tool people are migrating away from — mention this in-app copy).
8. Flag vague "currently learning X" language with no date attached (nudge toward dated, provable milestones).
9. Total estimated rendered length is short enough that pinned projects appear without excessive scrolling (rough word/block-count heuristic is fine — no need for actual pixel measurement in v1).
10. `techStack` items are grouped into categories rather than one flat unsorted badge wall.
11. `socials` block doesn't duplicate the primary CTA destination redundantly.

Make this genuinely helpful and non-preachy: every failing check is a **dismissible suggestion**, never a hard blocker on export. Frame copy positively ("Consider trimming to 2-4 pinned projects — visitors scan, they don't read everything" not "ERROR: too many projects").

---

## 7. EXPORT

- **Copy markdown to clipboard** (primary action, one click).
- **Download `README.md`** file.
- **Download/upload `profilio-design.json`** (the raw `ProfileDocument`) for save/reload and shareability.
- Optional stretch (only if time allows, not required for v1): GitHub OAuth flow to commit the generated README directly to the user's `<username>/<username>` repo.

---

## 8. THE REPO'S OWN README (meta-credibility — do this deliberately)

Build the repo's own `README.md` using Profilio itself (dogfooding is the single highest-leverage credibility move — a known pattern where a tool's creator uses their own tool on their own profile). It must include, in this order: a hero GIF/screenshot of the canvas editor in action above the fold, a one-paragraph pitch, a "Why Profilio" section contrasting with existing form-based tools, a quick-start (`pnpm create` or clone+install+dev commands), a themes gallery (screenshot grid of all 10 themes rendered with the same sample content, so the differentiation is visually obvious at a glance), a link to the live hosted demo, a contributing guide pointer, and an MIT license badge plus build-status badge. Keep the whole thing scannable in under 2 minutes.

Add 10-15 relevant GitHub Topics to the repo (e.g. `github-profile-readme`, `readme-generator`, `profile-readme`, `developer-tools`, `nextjs`, `design-system`, `dnd-kit`).

---

## 9. FILE STRUCTURE (scaffold this exactly)

```
profilio/
├── app/
│   ├── (editor)/
│   │   ├── page.tsx                 # main canvas editor route
│   │   └── components/
│   │       ├── BlockLibrary.tsx
│   │       ├── Canvas.tsx
│   │       ├── LivePreview.tsx
│   │       ├── SignalCheckPanel.tsx
│   │       └── blocks/               # one component per block type, editable inline
│   ├── api/
│   │   └── og/[themeId]/route.ts     # Satori-based SVG card rendering, edge runtime
│   └── layout.tsx
├── lib/
│   ├── store.ts                      # Zustand store: ProfileDocument + history
│   ├── schema.ts                     # ProfileDocument / ProfileBlock types + zod validation
│   ├── markdown/
│   │   └── render.ts                 # ProfileDocument -> markdown string, per active theme
│   └── linter/
│       └── signalCheck.ts            # the 11 rules, pure functions, unit-tested
├── themes/
│   ├── registry.ts
│   ├── terminal/
│   ├── blueprint/
│   ├── editorial/
│   ├── brutalist/
│   ├── minimalist/
│   ├── neo-dark/
│   ├── bento/
│   ├── retro-computing/
│   ├── corporate-clean/
│   └── data-dashboard/
│       └── (each theme folder: tokens.css, blockRenderers.tsx)
├── .github/
│   └── workflows/
│       ├── ci.yml
│       └── stats-export-template.yml # the user-facing Actions template for "actions-export" mode
├── tests/
├── DECISIONS.md
├── CONTRIBUTING.md
├── LICENSE (MIT)
└── README.md
```

---

## 10. BUILD PHASES (commit after each; keep commits scoped and descriptively named)

**Phase 1 — Foundation:** Next.js + TypeScript + Tailwind + shadcn/ui scaffold, `ProfileDocument`/`ProfileBlock` schema with zod validation, Zustand store with autosave to localStorage, empty three-panel editor shell (no drag-drop yet, static layout).

**Phase 2 — Canvas core:** Implement the Block Library, dnd-kit drag-and-drop reordering on the Canvas, inline-editable block components for `header`, `bio`, `techStack`, `pinnedProjects`, `socials`, `customMarkdown`. Wire up `react-markdown` Live Preview reflecting real-time edits. Undo/redo.

**Phase 3 — Theme system:** Build the token structure and implement all 10 themes' block renderers for at minimum header/bio/techStack/pinnedProjects. Theme switcher UI. Dark/light toggle per theme.

**Phase 4 — Signal Check linter:** Implement all 11 rules as pure, unit-tested functions; build the scoring panel UI with dismissible suggestions.

**Phase 5 — Stats widgets + export:** Satori-based SVG card rendering for the `statsWidget` block (hosted mode), the GitHub Actions export template (actions-export mode), copy-to-clipboard and download-markdown export, save/load `profilio-design.json`.

**Phase 6 — Polish + launch assets:** Build the repo's own dogfooded README (themes gallery screenshots, hero GIF), write CONTRIBUTING.md, add GitHub Topics, run a full accessibility pass (keyboard nav through the whole canvas, color-contrast check on every theme's dark and light variant), Playwright E2E test of the full create→export flow, final responsive/mobile pass.

At the end of each phase, run tests, run `pnpm build` to confirm it's production-clean, and give me a short summary of what was built plus any decisions logged in DECISIONS.md.

---

## 11. NON-FUNCTIONAL REQUIREMENTS

- **Accessibility:** full keyboard operability of the canvas (dnd-kit's keyboard sensor), visible focus states, WCAG AA contrast on every theme in both color modes, semantic HTML in the editor chrome.
- **Performance:** editor interactions should feel instant (no visible lag reordering blocks); SVG card generation via Satori on Edge should return in well under 1s.
- **No user accounts, no database** in v1 — fully client-side + stateless serverless.
- **No dark patterns in the linter** — always dismissible, never blocking export.

Now begin with Phase 1. Confirm the project name and repo slug you're using at the top of DECISIONS.md, then scaffold the project.

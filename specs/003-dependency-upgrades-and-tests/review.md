# Review 003: Dependency Upgrades + Unit Test Safety Net

> **Date:** 2026-08-22
> **Verdict:** All gates green. 48+ packages upgraded; 12 deferred with reasons.

## Final State

| Gate | Baseline | After |
|---|---|---|
| Unit tests | — (none existed) | **20/20 green** (Vitest 4 + happy-dom + RTL) |
| `tsc --noEmit` errors | 77 (pre-existing) | **76** |
| Production build | green | **green** — Σ 11.9 MB / 3.09 MB gzip |
| `bun outdated` | ~60 pkgs | **12, all deferred with reasons** |

## Upgraded

**In-range batch (`bun update`, 299 pkgs reinstalled):** React 19.1→19.2.8,
zod 4.4.3, posthog-js 1.418, dodopayments 2.47, react-hook-form 7.86,
@hookform/resolvers 5.9, Radix suite minors, date-fns 4.4, sonner 2.0.8,
tailwind-merge 3.6, vite 7.3.6, @types/* , postcss, input-otp, iconify,
onboardjs rc.5, openpanel 1.4.1, remixicon 4.9, autoprefixer 10.5,
dodopayments-checkout 1.9.8.

**Synced pins:** tailwindcss ↔ @tailwindcss/vite → 4.3.3 (were split
4.1.11/4.1.14).

**Majors migrated:**
- `lucide-react` 0.545 → **1.33.0** — v1 removed brand icons; added
  `components/brand-icons.tsx` (Youtube/Github/Twitter/Linkedin inline SVGs,
  lucide-compatible props) and migrated 18 files.
- `framer-motion` 12 → **13.1.1**
- `shiki` 3 → **4.4.3**
- `react-day-picker` 9 → **10.0.1** (dropped removed `table` classname key)
- `react-resizable-panels` 3 → **4.12.3** (wrapper remapped to new
  Group/Panel/Separator exports; component currently unused by app code)
- `html-react-parser` 5 → **6.1.7**
- `@biomejs/biome` 2.2.2 → **2.5.10**
- `@radix-ui/react-toast` 1.2.4 → **1.2.23**
- `@dnd-kit/react` 0.4 → **0.5**, `@hyperdx/browser` 0.22 → **0.25**
- `@content-collections/core/vite` → latest in-range

## Deferred (with reasons)

| Package | Latest | Reason |
|---|---|---|
| typescript | 7.0.2 | TS 7 is the native-port major; ecosystem-wide migration, own spec |
| vite | 8.2.2 | TanStack Start 1.145 peer-compat unverified; blocked with plugin-react 6 |
| @vitejs/plugin-react | 6.1.0 | imports `vite/internal` → requires vite 8 (verified: build broke) |
| vite-tsconfig-paths | 6.1.1 | same vite-8 wave |
| @types/node | 26.x | keep aligned with Node 22 line used by runtime |
| recharts | 3.10.1 | breaking API; dashboard charts carry pre-existing type debt (R1) |
| @tanstack/react-table | 9.1.2 | major API rewrite; no pressure |
| @tanstack/react-{query,router,start} | newer minors | **pinned exact in package.json** — framework core frozen deliberately; upgrade behind its own spec |
| @radix-ui/react-toast was exact-pinned | done ↑ | n/a |

## Incidents During Migration (all resolved)

1. `bun update` pruned ghost dep `vite-plugin-tanstack-router-sitemap`
   (imported by vite.config.ts but never declared) — now an explicit devDep.
2. First icon-migration regex pass over-matched JSX/object literals across 16
   files — caught by gates (`< className=` audit, tsc syntax error), fully
   repaired and formatted via Biome.
3. plugin-react 6 briefly broke build/tests via missing `vite/internal` —
   reverted to v5 pending vite 8.

## New Test Coverage

- `tests/utils.test.ts` — cn(), getChannelUrl() (10 asserts)
- `tests/seo.test.ts` — absoluteUrl(), articleJsonLd shape/fallbacks
- `tests/markdown.test.ts` — renderMarkdown html + heading extraction
- `tests/cookie-consent.test.ts` — consent storage read/validation
- `tests/site-footer.test.tsx` — required policy links render, badge toggle

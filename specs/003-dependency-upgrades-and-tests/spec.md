# Spec 003: Dependency Upgrades + Unit Test Safety Net

> **Status:** APPROVED — Arthur requested 2026-08-22 ("fix all the outdated libs")
> **Date:** 2026-08-22
> **Author:** Arthur / agent
> **Related:** constitution rule 2 (tests); `bun outdated` audit of 2026-08-22

---

## Problem Statement

`bun outdated` reports ~60 stale packages across three risk tiers:

1. **In-range drift** (~45 pkgs): Radix suite, zod, posthog-js, dodopayments,
   React 19.1→19.2, tailwindcss dev, @types/*, etc. — fixed by `bun update`.
2. **Pinned majors**: `lucide-react 0.545`, `recharts 2.15.4`,
   `@biomejs/biome 2.2.2`, plus majors requiring explicit bumps:
   framer-motion 13, shiki 4, react-day-picker 10, react-resizable-panels 4,
   html-react-parser 6, @vitejs/plugin-react 6, vite 7.0.6→7.3.x,
   @tailwindcss/vite ↔ tailwindcss sync.
3. **No test framework exists** — nothing verifies an upgrade didn't break
   behavior beyond `tsc` + build.

## Proposed Solution

Safety net FIRST, upgrades second, one risk tier at a time:

- **Phase A — Test infra:** Vitest + happy-dom + Testing Library (dev-only);
  baseline unit tests for pure logic (`lib/seo.ts`, `lib/utils.ts`,
  `lib/markdown.ts`) and consent helpers + footer render smoke.
- **Phase B — In-range batch:** `bun update` everything within semver range;
  sync `tailwindcss` ↔ `@tailwindcss/vite`.
- **Phase C — Pinned/major bumps**, grouped low-risk → high-risk, verifying
  (test + typecheck + build) between groups; revert any group that explodes.
- **Deferred (documented, not done):** typescript 7, vite 8,
  vite-tsconfig-paths 6, @types/node 26, 0.x cross-minors
  (content-collections, dnd-kit/react, hyperdx).

## Requirements

### Functional Requirements
- **FR-1:** `bun run test` runs Vitest green with ≥10 meaningful assertions
  over existing pure logic.
- **FR-2:** After upgrades: tests green, `tsc --noEmit` error count ≤ baseline
  (77, all pre-existing), production build green.
- **FR-3:** Every package either upgraded to Latest-compatible or explicitly
  deferred with reason in `review.md`.
- **FR-4:** No runtime dep added by this spec except none (Vitest & co are
  devDependencies).

### Non-Functional Requirements
- **NFR-1:** Upgrade waves are separable commits-in-spirit (verify between).
- **NFR-2:** Bundle impact checked post-upgrade (build output sizes reported).

## Acceptance Criteria
- [ ] FR-1..FR-4 verified
- [ ] `package.json` contains zero packages flagged "outdated" except deferred
      list with reasons
- [ ] review.md documents every deferral

## Risks
- **R1:** recharts 3 breaking API — dashboard charts already carry pre-existing
  type errors; if v3 explodes them further, revert to 2.x and defer.
- **R2:** framer-motion 13 / shiki 4 subtle API changes — covered by build +
  targeted grep of usage sites.
- **R3:** Biome 2.5 may reformat more aggressively — accept formatting churn
  in touched-by-tooling files only.

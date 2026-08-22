# Tasks 003: Dependency Upgrades + Unit Test Safety Net

## Phase A: Safety Net
- [x] **T-A1** Install vitest + happy-dom + RTL (devDeps); add `vitest.config.ts`
- [x] **T-A2** Add `test` / `typecheck` scripts
- [x] **T-A3** Write baseline tests (seo, utils, markdown, consent, footer render)
- [x] **T-A4** Record baseline: tests green / tsc=77 / build sizes

## Phase B: In-Range Batch
- [x] **T-B1** `bun update`; sync tailwindcss ↔ @tailwindcss/vite
- [x] **T-B2** Verify gates (test/tsc/build)

## Phase C: Majors
- [x] **T-C1** Wave 2 low-risk (lucide-react 1.x, biome 2.5) + gates
- [x] **T-C2** Wave 3 medium majors + gates (revert any failures)
- [x] **T-C3** Document deferred packages with reasons

## Verification
- [x] FR-1..FR-4 met
- [x] review.md written with per-package outcome table

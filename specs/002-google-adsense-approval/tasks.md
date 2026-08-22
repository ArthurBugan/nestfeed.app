# Tasks 002: Google AdSense Approval Readiness

> **Implementation Checklist**
> **Status:** COMPLETED (repo scope) — see `review.md` for evidence.
> Operator actions after deploy are flagged at the bottom.

## Phase 0: Decisions
- [x] **T0.1** Q1: target domain = **groupify.dev** (from `.env` prod `VITE_BASE_URL`; nestfeed.app refs were stale)
- [x] **T0.2** Q2: first-party consent banner + AdSense `requestNonPersonalizedAds=1` until certified CMP; no new deps
- [x] **T0.3** Q3/Q4: ≥10 posts tracked on content server side; byline fallback "Groupify Team"

## Phase 1: Trust & Policy Pages (Track B)
- [x] **T1.1** `/about` page (`src/routes/_app/about.tsx`)
- [x] **T1.2** `/contact` page (`src/routes/_app/contact.tsx`)
- [x] **T1.3** Privacy policy: advertising cookies list item, "Advertising and Third-Party Vendors" section (Google/AdSense, DART cookie, personalized-ads opt-out links, EEA/UK consent statement)
- [x] **T1.4** Terms pass: Nestfeed → Groupify rebrand, canonical URL updated

## Phase 2: Content Pipeline (Track A — content server)
- [x] **T2.1** Confirmed posts render from runtime API (`/api/v3/blog`); nothing authored in-repo
- [x] **T2.2** Sitemap generator pulls published slugs from content server (643 found)
- [x] **T2.3** Fixed `$slug` loader envelope mismatch (meta could render empty titles/descriptions)
- [x] **T2.4** ⚠️ Flagged to operator: 643 live posts are auto-generated channel analyses incl. a `/blog/null` slug — thin-content risk; prune before resubmitting

## Phase 3: SEO & Crawlability (Track C)
- [x] **T3.1** Rewrote `generate-sitemap.js`: `https://groupify.dev`, env-overridable, excludes dashboard/auth/share routes
- [x] **T3.2** `public/robots.txt`: correct domain + app-route disallow list
- [x] **T3.3** Unique meta title/description/canonical on root, blog index, $slug, about, contact, privacy, terms
- [x] **T3.4** OG/Twitter defaults + Article JSON-LD on posts (`lib/seo.ts`)
- [ ] **T3.5** _(operator, post-deploy)_ Search Console verify + submit sitemap

## Phase 4: Navigation & Footer (Track D)
- [x] **T4.1** Extracted `components/site-footer.tsx`; adopted by landing (badges on), blog index/post, about, contact, privacy, terms (support keeps its own footer)
- [x] **T4.2** Footer links: About / Contact / Privacy / Terms / Blog / Dashboard; i18n'd (en/pt/es)

## Phase 5: Consent Banner (Track E)
- [x] **T5.1** `components/cookie-consent.tsx` mounted sitewide via `__root.tsx`
- [x] **T5.2** Choice persisted (`localStorage.cookie-consent`); NPA flag applied until "Accept all"; no new deps

## Phase 6: Verify & Handoff
- [x] **T6.1** Acceptance criteria verified repo-side (see review.md)
- [x] **T6.2** Biome clean on all touched files; `tsc --noEmit` shows only pre-existing errors in untouched files; production build green
- [x] **T6.3** `review.md` written
- [ ] **T6.4** _(operator)_ Resubmit AdSense application after deploy + T3.5

## Verification
- [x] All Functional Requirements met (FR-C5, FR-A editorial bar = operator side)
- [x] All Non-Functional Requirements met (no new deps; i18n-ready; lazy badges images)
- [x] No secrets committed

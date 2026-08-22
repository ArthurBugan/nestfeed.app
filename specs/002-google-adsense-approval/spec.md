# Spec 002: Google AdSense Approval Readiness

> **Status:** APPROVED — scope confirmed 2026-08-22 (see "Scope Confirmation")
> **Date:** 2026-08-22
> **Author:** Arthur / agent
> **Related:** rejection reason "site doesn't have meaningful content"; supersedes
> the unused waitlist sample (001 number retired)

---

## Problem Statement

Google rejected the AdSense application: **"your site doesn't have enough
meaningful content."** Audit of this repo found concrete root causes:

1. **The blog is empty.** `content/posts/` contains **0 markdown files**, while
   the blog routes (`/blog`, `/blog/$slug`) render from the `posts` collection.
   Visitors (and Googlebot) see an empty blog shell.
2. **Ghost thin content.** The stale `public/sitemap.xml` advertises ~640
   auto-generated posts (`5-minute-crafts-diy-analytical-overview`,
   …`-analytical-overview`) left over from the Nestfeed project. URLs that are
   in the sitemap but don't resolve to substantive pages are a classic
   low-value-content signal.
3. **Wrong domain/branding in SEO surfaces.** `robots.txt` points to
   `https://nestfeed.app/sitemap.xml`; every `<loc>` in `sitemap.xml` uses
   `nestfeed.app`; `__root.tsx` title is `"Nestfeed - Group anything"`. If the
   approved property is `groupify.dev`, crawl signals and branding are
   inconsistent.
4. **Missing trust pages.** No About page, no dedicated Contact page. AdSense
   reviewers expect About + Contact + Privacy + Terms reachable from every
   public page. Only `/privacy` and `/terms` exist today, linked only from the
   landing-page footer.
5. **Privacy policy gaps for ads.** The current policy has no sections on
   cookies, third-party ad vendors (Google), or personalized-ads consent —
   required once AdSense runs.
6. **Sitemap pollutes index.** Dashboard, settings, login, register,
   forgot-password routes are listed; they're app UI, not content.

## Proposed Solution

Five tracks, executed in order. Content lives on the **external content
server** (Directus, served via `/api/v3/blog`) — nothing content-related is
authored in this repo; the site renders it at runtime. This repo's job is to
make the site render, sitemap and present that content correctly, plus trust
pages and consent.

- ✅ **Track A — Content pipeline (repo side).** No local authoring. Ensure:
  runtime blog fetch works for anonymous visitors, sitemap enumerates all
  published slugs from the content server, editorial standards (≥10 original,
  substantial posts) are tracked on the content-server side before reapplying.
- ✅ **Track B — Trust & policy pages.** Add `/about` and `/contact`; extend
  `/privacy` with cookie/third-party-ad disclosures; rebrand privacy/terms
  Nestfeed → Groupify.
- ✅ **Track C — SEO & crawlability fixes.** Fix domain in robots/sitemap/meta;
  regenerate sitemap from real routes only (public content, no auth-gated
  paths); add meta descriptions + canonical + OG/Twitter tags sitewide;
  JSON-LD `Article` schema on posts.
- ✅ **Track D — Sitewide navigation/footer.** Shared footer with About /
  Contact / Privacy / Terms / Blog links on all public pages.
- ✅ **Track E — Cookie consent banner.** Lightweight first-party banner;
  AdSense non-personalized ads until a certified CMP is onboarded (Google CMP
  requirement applies only to personalized ads in EEA/UK).

## Requirements

### Functional Requirements

**Track A — Content pipeline (content server, not this repo)**
- **FR-A1:** Sitemap generation fetches published post slugs from the content
  server and includes them all; no local markdown required.
- **FR-A2:** Blog index and post pages render for anonymous visitors from the
  runtime API (`/api/v3/blog`), with correct title/description/image per post.
- **FR-A3:** Editorial bar (≥10 original, substantial posts before reapply)
  tracked on the content-server side; this spec only verifies rendering.
- **FR-A4:** Zero scraped/spun/auto-generated filler served; human review
  happens at authoring time on the content server.

**Track B — Trust pages**
- **FR-B1:** `/about` explains what Groupify does, who builds it, contact
  pointer.
- **FR-B2:** `/contact` offers working email contact (+ social/community links
  reused from support page).
- **FR-B3:** `/privacy` includes: what data is collected, cookies used,
  third-party vendors incl. Google AdSense/Analytics, personalized-ads opt-out
  (adssettings.google.com), GDPR/CCPA rights summary.
- **FR-B4:** All four pages (About, Contact, Privacy, Terms) link to each other
  and are reachable from every public page footer.

**Track C — SEO/crawlability**
- **FR-C1:** `robots.txt` and generated sitemap use `https://groupify.dev`
  with correct scheme/host.
- **FR-C2:** Sitemap contains only public, canonical, 200-status URLs:
  `/`, `/blog`, all published post slugs (from content server), `/about`,
  `/contact`, `/privacy`, `/terms`, `/support`. No dashboard/auth/share routes.
- **FR-C3:** Every public route defines unique `title` + `meta description`;
  posts additionally define canonical URL and OG/Twitter cards.
- **FR-C4:** Post pages emit JSON-LD `Article` (headline, datePublished,
  author, image).
- **FR-C5:** _(Operator action after deploy)_ Property verified in Google
  Search Console; corrected sitemap submitted; no coverage errors.

**Track D — Navigation**
- **FR-D1:** Shared footer component used by landing, blog index/post, about,
  contact, privacy, terms, support.
- **FR-D2:** Navbar exposes Blog; footer exposes About / Contact / Privacy /
  Terms / Blog links.

**Track E — Consent**
- **FR-E1:** Cookie consent banner on public pages; until consent (or if
  refused), AdSense runs with `requestNonPersonalizedAds = 1`.
- **FR-E2:** Consent choice persisted in localStorage and honored on reload;
  no new runtime dependencies.

### Non-Functional Requirements
- **NFR1:** No new heavy runtime deps without approval; consent solution must
  be IAB TCF-certified if serving EU personalized ads (e.g., Google-certified
  CMP list) or use non-personalized ads fallback.
- **NFR2:** Landing/blog Lighthouse performance stays ≥ current baseline;
  images lazy-loaded, properly sized.
- **NFR3:** All new pages i18n-ready via existing language-provider pattern;
  accessible (headings hierarchy, focus states).
- **NFR4:** Mobile UX verified (reviewers check mobile rendering).

## Design

| Area | Change |
|---|---|
| `scripts/generate-sitemap.js` | Domain from `https://groupify.dev` (env-overridable); enumerate real public routes + published slugs from content server; exclude `_app/dashboard`, `_auth`, share routes |
| `src/routes/__root.tsx` | Brand/title/meta audit ("Groupify"), default description, OG defaults |
| `lib/seo.ts` | NEW: `SITE_URL`, `absoluteUrl()`, `articleJsonLd()` helpers |
| `src/routes/_app/about.tsx` | NEW static page |
| `src/routes/_app/contact.tsx` | NEW static page (email + community links) |
| `src/routes/_app/privacy.tsx` | Advertising cookies + Google vendors sections; Groupify rebrand |
| `src/routes/_app/terms.tsx` | Groupify/groupify.dev rebrand |
| `components/site-footer.tsx` | NEW shared footer extracted from `landing-page.tsx` |
| `components/cookie-consent.tsx` | NEW banner, localStorage-persisted, gates AdSense personalization |
| Blog routes | Canonical + JSON-LD on `$slug`; meta on index; loader response normalized |

### Content plan (Track A — content-server side)
Posts are authored on the content server (Directus → `/api/v3/blog`). Pillars:
(1) how-to guides using Groupify features, (2) YouTube curation best
practices, (3) niche audience guides (anime tracking, study-with-me, fitness
channels), (4) comparisons (playlists vs groups vs external tools). Each post:
original screenshots from the product, internal links + author byline.
**Operator checklist before resubmitting:** ≥10 substantial posts published,
human-reviewed.

## Acceptance Criteria

- [x] FR-A1..A2 verified: sitemap includes published slugs fetched from
      content server; blog renders anonymously
- [x] FR-B1..B4 verified manually
- [ ] FR-C1..C4 verified: sitemap has no dashboard/auth URLs and uses
      groupify.dev; every public route has unique title/description; post
      pages have canonical + Article JSON-LD
- [x] FR-D1..D2 verified visually on all public routes
- [ ] FR-E1..E2 verified locally (banner shows, choice persists, NPA flag set)
- [ ] FR-C5 / reapplication checklist executed by Arthur after deploy

### Reapplication checklist
- [ ] 10+ substantial posts live ≥ a few days (let Google recrawl)
- [ ] About/Contact/Privacy/Terms reachable from every public page
- [ ] Sitemap clean in Search Console
- [ ] Site fully functional on mobile
- [ ] ads.txt still serves correctly at domain root

## Risks

- **R1:** Thin auto-generated content on the content server reproduces the
  rejection. Mitigation: editorial bar enforced at authoring time (FR-A3/A4);
  repo only renders what the server returns.
- **R2:** Blog post loader response envelope was accessed with the wrong
  shape in `$slug.tsx` (title/description meta could be empty). Fixed by
  normalizing in the loader; verify against live API after deploy.
- **R3:** First-party consent banner satisfies non-personalized serving, but
  EEA/UK personalized ads require an IAB TCF-certified CMP — operator must
  onboard one before enabling personalization.
- **R4:** Review timelines are 1–2 weeks per attempt; batch fixes before one
  resubmission rather than iterating live.

## Scope Confirmation

Confirmed 2026-08-22 by Arthur (Product) via direct instruction to implement.

| Decision | Choice |
|---|---|
| Tracks | **A + B + C + D + E** all approved |
| Q1 Domain | **groupify.dev** (from `.env` prod `VITE_BASE_URL`; nestfeed.app refs are stale) |
| Q2 Consent | Lightweight first-party banner + `requestNonPersonalizedAds=1` until certified CMP; no new deps |
| Q3 Content volume | ≥10 posts before reapply — tracked on content server, not this repo |
| Q4 Bylines | "Groupify Team" fallback (existing i18n key, rebranded) |

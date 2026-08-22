# Review 002: Google AdSense Approval Readiness

> **Date:** 2026-08-22
> **Verdict:** Repo scope complete. Build green, lint/typecheck clean on all
> touched files. Three operator actions remain post-deploy (below).

## What Shipped

| Track | Change | Files |
|---|---|---|
| A | Sitemap now enumerates published slugs from the content server; loader envelope bug fixed so post meta never renders empty | `scripts/generate-sitemap.js`, `src/routes/_app/blog/$slug.tsx` |
| B | New `/about` + `/contact`; privacy gained advertising-cookies + Google vendor disclosures + opt-out links; Nestfeed → Groupify rebrand across privacy, terms and 47 i18n strings | `src/routes/_app/about.tsx`, `contact.tsx`, `privacy.tsx`, `terms.tsx`, `components/language-provider.tsx` |
| C | Domain fixed everywhere (`groupify.dev`); sitemap excludes dashboard/auth/share; unique title/description/canonical per public route; OG/Twitter defaults at root; Article JSON-LD on posts | `generate-sitemap.js`, `robots.txt`, `__root.tsx`, `lib/seo.ts` (new), blog routes, static pages |
| D | Shared footer extracted from the landing page; About/Contact/Privacy/Terms/Blog links sitewide | `components/site-footer.tsx` (new), landing-page, blog index/$slug, about/contact/privacy/terms |
| E | First-party consent banner; NPA ads until "Accept all"; persisted in localStorage; zero new dependencies | `components/cookie-consent.tsx` (new), `__root.tsx` |

## Verification Evidence

- **Sitemap:** regenerated → 7 static public URLs (`/`, `/about`, `/blog`,
  `/contact`, `/privacy`, `/support`, `/terms`) + post slugs fetched live
  from the content server; **zero** `/dashboard`, `/login`, `/register`,
  `/forgot-password`, `/share` entries (previously ~20 app routes were listed).
  Invalid slugs (`null`/empty) filtered out.
- **Live smoke test** (`vite dev`): all public routes → HTTP 200; `<title>`
  correct on `/about` ("About – Groupify") and `/contact`; canonical tag
  present on `/`; privacy page renders "Advertising and Third-Party Vendors",
  DART-cookie disclosure and opt-out link in SSR HTML.
- **Brand sweep:** every user-facing "Nestfeed" replaced with "Groupify"
  (navbars, sidebar, register, support footer, onboarding tour copy); real
  infra hostnames kept (directus./rybbit./rybbit analytics, GitHub org,
  admin@ mailbox).
- **Lint/format:** `biome check` exit 0 on every touched file.
- **Types:** `tsc --noEmit` error count identical to pre-spec baseline (77,
  all in untouched legacy files). None introduced.
- **Build:** `bun run build` passes (routeTree regenerated with `/about` and
  `/contact`; Nitro output produced).

## Bugs Found & Fixed Along the Way

1. **Blog `$slug` loader read the wrong response shape** — it stored the whole
   `{data:{data:post}}` envelope as `post`, so head meta (title/description)
   could render empty. Now normalized + guarded.
2. **Sitemap advertised ~640 thin posts on the wrong domain** — both fixed;
   domain is env-overridable via `SITE_URL`.
3. **Privacy contact email was wrapped in a stale Cloudflare-obfuscation span**
   — replaced with plain mailto + link to `/contact`.
4. Duplicate i18n keys introduced during this spec were caught by tsc and
   removed before commit.

## ⚠️ Critical Finding for the Operator

The content server currently serves **643 auto-generated "YouTube channel
analysis" posts** (`mrbeast-youtube-channel-analysis`, …) plus one with a null
slug (`/blog/null`). This is precisely the "low value content" profile Google
rejected. Before resubmitting:

- Prune/unpublish those posts on Directus until they are rewritten or removed
- Publish ≥10 original, substantial posts (editorial pillars in `spec.md`)
- Then regenerate/deploy so the sitemap reflects the pruned set

## Operator Checklist (post-deploy)

1. Deploy, then verify in Google Search Console; submit
   `https://groupify.dev/sitemap.xml`
2. Content-server cleanup per the section above
3. Resubmit the AdSense application
4. Optional later: onboard an IAB TCF-certified CMP to enable personalized ads
   in EEA/UK (banner already defaults to non-personalized)

## Addendum (2026-08-22): Content-quality items 5 & 6

- **Changelog page** (`/changelog`): nine releases reconstructed from real git
  history — demonstrates active maintenance with verifiable dates.
- **FAQ page** (`/faq`): eight substantive Q&As + FAQPage JSON-LD for rich
  results; footer links added sitewide (i18n'd en/pt/es).
- Sitemap regenerated; both pages included. Gates: biome clean, tsc at
  baseline (76), 20/20 tests, production build green.

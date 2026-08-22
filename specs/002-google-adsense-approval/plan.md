# Plan 002: Google AdSense Approval Readiness

> **Status:** NOT STARTED
> **Related spec:** `specs/002-google-adsense-approval/spec.md`

## Architecture

Mostly content + static pages; two small build-time changes.

### Proposed Files
| Layer | Path |
|---|---|
| Content | `content/posts/*.md` (10–15 new) |
| Pages | `src/routes/_app/about.tsx`, `src/routes/_app/contact.tsx` |
| Edited pages | `src/routes/_app/privacy.tsx`, `terms.tsx`, `support/index.tsx` |
| Shared UI | `components/site-footer.tsx` (extracted from `landing-page.tsx:811`) |
| SEO | `scripts/generate-sitemap.js` rewrite, `public/robots.txt`, meta in `__root.tsx` + blog routes |
| Structured data | JSON-LD helper in `lib/seo.ts` |
| Consent | vendor script loaded in `__root.tsx` behind env flag |

### Data Flow
- No API changes. Posts come from the existing content-collections pipeline.
- Sitemap generation switches from hardcoded URL list to enumerating real
  public routes + post slugs, domain from `VITE_BASE_URL`.

## Testing Strategy

No unit-test framework yet — this spec is verified via checks + manual QA:

1. **Build check:** sitemap script output inspected (`grep -c "<loc>"`,
   spot-check no `/dashboard` or `_auth` entries)
2. **Crawl check:** every sitemap `<loc>` → HTTP 200 on production host
   (`curl -s -o /dev/null -w "%{http_code}"` loop)
3. **SEO audit:** each public route has unique title/description/canonical
   (manual pass + view-source grep)
4. **Rich results:** validate one Article JSON-LD in Google Rich Results Test
5. **Manual QA matrix:** light/dark × mobile/desktop across landing, blog,
   about, contact, privacy, terms
6. **Biome + `tsc --noEmit` green**

## Dependencies

- Domain decision (Q1) before Track C ships
- CMP vendor choice (Q2) for Track E
- Original screenshots require using the product (dashboard)

## Timeline

- **Estimate:** Track A ~2–3 days writing; B–D ~1 day combined;
  E ~0.5 day after vendor pick; then wait-for-recrawl window
- **Phase:** MVP-blocking for monetization

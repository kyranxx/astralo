# Astralo SEO and Orders Plan

## Objective

Get Astralo closer to #1 Google positions for realistic, revenue-driving searches, then convert that traffic into email leads and paid orders.

Important truth: Google does not guarantee #1 rankings. The plan is to win the queries where Astralo already has evidence of impressions, then expand into stronger commercial topics with better content, links, snippets, and conversion tracking.

## Current Evidence

- Source data: `C:/Users/User/Downloads/astralo-analytics-data-2026-05-25.csv`.
- Technical crawl: 250 sitemap URLs checked, all returned `200`.
- Crawl quality: schema and hreflang were present on all 250 checked pages.
- Confirmed crawl issue: `/docs/api` was in the sitemap with zero internal inlinks.
- GSC query rows in export: 723.
- GSC query-page rows in export: 937.
- Important limitation: Search Console exports are not guaranteed to expose every possible low-volume or anonymized query.
- GA4 top events showed `form_start: 36`, `sign_up: 1`, but no exported purchase or checkout completion events.
- Production Stripe export now uses the live key from Vercel production env.
- Last 180 production commerce export: 2 paid Stripe checkouts, 14 unpaid/expired checkouts, 1 subscriber, 6 followups.
- Production Supabase had `0` saved orders before repair; 2 historical paid Stripe sessions from December 2025 were backfilled into `orders`.
- Current verified gap: 2 completed December 2025 orders have no product email timestamp or saved horoscope content. They are excluded from automatic recovery and need manual, customer-friendly review.
- Recent stuck-order recovery is now deployed for completed orders from the last 14 days only.
- Refreshed report: `reports/growth-report-production-2026-05-28.md`.
- Last 28-day GSC comparison: clicks `36 -> 35`, impressions `1250 -> 1809`, CTR `2.88% -> 1.93%`, average position `17.37 -> 53.98`.
- Last 28-day GA4 comparison: sessions `568 -> 407`, engaged sessions `25 -> 24`, engagement rate `4.40% -> 5.90%`.
- Current exported GA4 data still has no purchase event rows.
- Current exported commerce data still has no paid checkouts in the recent 28-day window, but all historical paid Stripe checkouts now have Supabase order rows.

## Positioning

Astralo should not try to rank #1 for broad head terms first, such as `horoscope` or `zodiac compatibility`. Those are too competitive and not yet revenue-proven.

The first target is "small #1s":

- brand searches: `astralo`, localized brand variants
- personalized horoscope searches
- monthly horoscope 2026 searches
- relationship/partner compatibility searches
- country/language-specific long-tail searches with current impressions

## Data-Driven Priority Map

### Tier 1: Brand CTR Wins

Goal: make people who already see Astralo click Astralo.

Evidence:

- `astralo`: 736 impressions, 8 clicks, average position 3.65, CTR 1.09%.
- `/`: 302 impressions for `astralo`, CTR 0.66%, position 3.99.
- `/es`: 134 impressions for `astralo`, CTR 0.75%, position 2.08.
- `/it/`: 66 impressions for `astralo`, CTR 0%, position 1.97.
- `/fr`: 66 impressions for `astralo`, CTR 0%, position 5.68.
- `/pl/`: 160 impressions for `astralo`, CTR 0.63%, position 4.49.

Actions:

- Put `Astralo` first in homepage titles.
- Add clearer localized title/description copy for top brand locales.
- Improve snippets with the promise: personalized reading, digital delivery, specific use case.
- Keep brand mentions visible in H1, logo alt, organization schema, and footer.

Done when:

- Brand CTR moves above 10% for position 1-5 pages.
- GSC shows fewer wrong-language brand impressions.

### Tier 2: Striking-Distance Queries

Goal: push existing positions 3-20 upward with better page fit.

Evidence:

- `melhor horóscopo personalizado online 2026`: 37 impressions, 0 clicks, position 3.32, page `/pt`.
- `astral horoskop`: 118 impressions, 0 clicks, position 12.32.
- `gratis personlig horoskop`: 35 impressions, 0 clicks, position 10.63.
- `personlig horoskop gratis`: 35 impressions, 2 clicks, position 13.34.
- `systém domů placidus`: 35 impressions, 0 clicks, position 10.26.
- `horoskop online`: 15 impressions, 1 click, position 13.33.
- `horoscop personalizat gratuit`: 12 impressions, 0 clicks, position 14.42, page `/ro`.
- `horoskop gratis`: 12 impressions, 0 clicks, position 13.42, page `/id`.
- `professionelt horoskop`: 65 impressions, 0 clicks, position 20.77, page `/da/`.
- `ilmainen päivähoroskooppi`: 38 impressions, 0 clicks, position 20.74, page `/fi`.

Actions:

- Create or strengthen exact-intent landing sections for each language/query cluster.
- Add internal links from homepage/blog/product pages to the closest commercial or free-funnel page.
- Add FAQ copy that answers the exact query intent.
- Avoid sending free-intent searches directly into paid-only pages unless the page offers a free start.
- For free-intent queries, strengthen both the localized homepage and the localized `/free-horoscope` page so Google has a better page to rank and visitors have a low-friction lead path.

Done when:

- At least 10 priority queries move into top 3.
- At least 3 priority pages show CTR over 5%.

### Tier 3: Content Pages With Demand

Goal: turn content impressions into internal links and orders.

Evidence:

- `/cs/blog/the-12-houses-of-astrology`: 458 impressions, 10 clicks, position 10.63.
- `/no/blog/the-12-houses-of-astrology`: 117 impressions, 3 clicks, position 9.23.
- `/ar/blog/the-12-houses-of-astrology`: 103 impressions, 0 clicks, position 8.50.
- `/sk/blog/monthly-horoscope-february-2026`: 239 impressions, 39 clicks, CTR 16.3%.
- `/pl/blog/monthly-horoscope-february-2026/`: 113 impressions, 20 clicks, CTR 17.7%.
- `/hu/blog/monthly-horoscope-february-2026/`: 86 impressions, 14 clicks, CTR 16.3%.

Actions:

- Keep monthly horoscope pages fresh and only index current/future months.
- Add stronger contextual CTAs in winning articles.
- Add "related reading" links from articles to monthly, weekly, partner, and free horoscope pages.
- Use the high-CTR February pages as the model for future monthly content.

Done when:

- Blog-to-product clicks are measurable.
- Monthly posts produce email signups and checkout starts.

### Tier 4: Low-Quality Traffic Cleanup

Goal: stop optimizing around noise.

Evidence:

- GA4 showed high sessions on several `/zh/blog/...` pages with 0 engagement.
- Direct traffic and some country traffic were low quality.

Actions:

- Segment organic search separately from all traffic.
- Keep bot/noise traffic out of decisions.
- Do not judge product-market fit from raw sessions alone.

Done when:

- Weekly reporting separates organic qualified traffic, direct noise, paid traffic, and email.

## Technical SEO Plan

1. Keep only useful indexable pages in sitemap.
2. Exclude admin, API, checkout, forms, success pages, stale monthly posts, zodiac variants, and docs from sitemap.
3. Keep self-canonical URLs on indexable localized pages.
4. Keep hreflang alternates and x-default.
5. Add Product/Offer structured data to commercial pages.
6. Keep Service, WebPage, Breadcrumb, FAQ, Organization, and Website schema.
7. Avoid fake review or rating schema unless reviews are verified.
8. Add internal links to important money pages from pages that already get impressions.
9. Use short, unique, click-focused titles and descriptions.
10. Refresh `lastmod` through actual content updates, not fake churn.

## Content Plan

### Weekly publishing rhythm

- 1 monthly horoscope article per priority language.
- 1 commercial support article per week.
- 1 trust/conversion article per week.

### Priority languages

Start with languages where GSC already shows signals:

- English
- Slovak
- Polish
- Czech
- Portuguese
- Spanish
- French
- Italian
- Finnish
- Norwegian
- Danish
- Swedish

### Content clusters

- Personalized horoscope online
- Monthly horoscope 2026
- Daily horoscope personalized
- Weekly horoscope predictions
- Partner horoscope and compatibility
- Birth chart reading
- Astrology houses and Placidus house system
- Free horoscope lead magnet

### Page template for rankable articles

- Clear H1 matching the query.
- 80-120 word answer near the top.
- Table of contents for long articles.
- 5-8 useful sections with specific examples.
- Internal link to the closest paid product.
- Internal link to free lead magnet.
- FAQ section with 3-5 query-driven questions.
- Updated date where relevant.

## Conversion Plan

1. Track the full funnel:
   - `view_item`
   - `form_start`
   - `begin_checkout`
   - `checkout_created`
   - `checkout_error`
   - `checkout_return`
   - `purchase`
   - `sign_up`
2. In GA4, mark checkout and purchase events as key events.
3. In Search Console, measure by query and page, not site average.
4. In Stripe, review expired checkout sessions weekly.
5. In Supabase, verify every paid checkout creates an order row.
6. Use the free horoscope path for low-intent searches.
7. Use paid product pages for commercial-intent searches.
8. Add email follow-up for free subscribers.

## Authority and Backlink Plan

Ahrefs is useful later, but not required for current reality. Use it after the funnel works.

First backlink targets:

- astrology directories
- horoscope blogs
- spirituality newsletters
- localized resource pages
- small guest posts in priority languages
- product/listing pages where digital astrology tools are reviewed

Rules:

- No spam links.
- No paid link farms.
- Prefer links to specific pages, not only the homepage.
- Track every acquired link and its target page.

## Measurement Dashboard

Weekly numbers to review:

- GSC clicks by page
- GSC CTR by query-page
- queries in positions 1-3
- queries in positions 4-10
- product page views
- form starts
- checkout starts
- checkout sessions created
- successful payments
- Supabase saved orders
- email signups
- signup to checkout rate

## First Implementation Sprint

Completed or in progress:

- Enabled floating article offer.
- Added checkout diagnostic events.
- Fixed early `view_item` tracking.
- Removed invalid Stripe API version override.
- Confirmed production Stripe webhook exists.
- Confirmed production Supabase project.
- Confirmed live Supabase has no current orders.
- Put `Astralo` first in homepage title pattern.
- Added localized title/description overrides for top brand/opportunity locales.
- Added Product/Offer structured data to product pages.
- Removed `/docs/api` from sitemap and marked it noindex.
- Added paid-session recovery so `/api/horoscope` creates a missing Supabase order if Stripe paid but webhook was missed.
- Blocked horoscope generation for unpaid/incomplete Checkout sessions.
- Locked `/api/send-email` to same-site requests with a saved paid order.
- Added localized blog product links from articles to all paid product pages.
- Added Portuguese homepage section targeting `melhor horóscopo personalizado online 2026`.
- Added German homepage section and FAQ targeting `astral horoskop`.
- Added Norwegian homepage section and FAQ targeting `gratis personlig horoskop`.
- Strengthened `/no/free-horoscope` with exact Norwegian free-intent title, H1, content, and FAQ schema.
- Added Czech Placidus quick-answer content for `systém domů placidus`.
- Fixed mixed Spanish copy in the Portuguese FAQ pricing answer.
- Localized the Portuguese follow-up email sequence and added tests for drip links/locale fallback.
- Added a repeatable weekly growth report script and generated `reports/growth-report-2026-05-25.md` from the supplied export.
- Added Stripe/Supabase commerce export support and generated `reports/growth-report-2026-05-27.md` from Search Console, GA4, and Stripe rows.
- Pulled production Vercel env into an ignored local file and reran commerce export against live Stripe/Supabase.
- Added export-summary rows so reports distinguish "zero rows found" from "table was not exported".
- Added all-export commerce totals and integrity checks to reveal historical paid orders outside the 28-day window.
- Backfilled 2 historical paid Stripe sessions into production Supabase orders without sending customer emails.
- Fixed the cached-success path so an order with generated horoscope content but no `email_sent_at` returns the content for product-email retry instead of pretending fulfillment is complete.
- Made Stripe webhook fulfillment retryable: duplicate paid events now retry product email when `email_sent_at` is missing, and fulfillment failures return `500` so Stripe can retry instead of silently dropping delivery.
- Added server-side GA4 purchase tracking through the Stripe webhook, with GA client id captured at checkout and no customer PII sent to GA4.
- Removed fake build-time sitemap `lastmod` values; sitemap dates should only be emitted when they reflect real content updates.
- Fixed legal page/PDF "Last updated" text that incorrectly pointed to a future date.
- Ran a production deep SEO audit for 120 sitemap URLs: all returned `200`, all checked pages had schema and hreflang, and no script-confirmed findings were reported.
- Added `.vercelignore` so local env files, generated reports, build output, and `node_modules` are excluded from Vercel uploads.
- Deployed the SEO/order fixes to production: `https://astralo.online` now aliases deployment `astralo-1wreswvk8-daniels-projects-98c0558b.vercel.app`.
- Verified production target pages for `/de`, `/pt`, `/no`, and `/no/free-horoscope`: all returned `200`, had the intended exact-intent titles/copy, canonical URLs, and FAQ schema.
- Ran a post-deploy production deep SEO audit for 120 sitemap URLs: all returned `200`, all checked pages had schema and hreflang, and no script-confirmed findings were reported.
- Made commerce exports redacted by default, with `--include-pii` only for deliberate local incident review, and ignored raw commerce CSV/log exports in git.
- Regenerated the production commerce export and weekly report with redacted customer data.
- Added an authorized `/api/order-recovery` endpoint plus a daily Vercel cron to retry recent completed orders missing product email delivery.
- Limited automatic order recovery to orders created in the last 14 days, so old historical backfills are not emailed without manual review.
- Deployed the safer recovery build to production: `https://astralo.online` now aliases deployment `astralo-jjpyhskz7-daniels-projects-98c0558b.vercel.app`.
- Verified production `/api/order-recovery?dryRun=1` with `CRON_SECRET`: recent window found 0 orders; explicit `maxAgeDays=365` found the 2 old December 2025 orders.
- Verified production `/api/order-recovery` rejects unauthenticated requests with `401`.
- Verified production `/api/health`, `/de`, `/pt`, `/no`, and `/no/free-horoscope` return `200` after the recovery deploy.
- Fixed RSS so stale noindexed monthly horoscope posts are excluded from `/rss.xml`; verified live RSS includes June 2026 and excludes January-April 2026 monthly posts.
- Added blog-content quality checks for leaked `HTMLTAG_` placeholders and mojibake markers, then fixed affected March/April/June localized monthly article files.
- Put `Astralo` in the root homepage H1 and added search-targeted H1s for German, Finnish, Portuguese, Norwegian, and Swedish homepages.
- Deployed the brand/opportunity heading update to production: `https://astralo.online` aliased deployment `astralo-dyi3mfvgb-daniels-projects-98c0558b.vercel.app`.
- Verified production `/`, `/de/`, `/fi/`, `/pt/`, `/no/`, `/sv/`, `/rss.xml`, and `/api/health` return `200` with intended title/H1/robots and no placeholder tokens.
- Generated refreshed report `reports/growth-report-production-2026-05-28.md` from the supplied analytics CSV plus redacted production commerce export.
- Added Romanian and Indonesian exact free-intent homepage overrides for `horoscop personalizat gratuit` and `horoskop gratis`.
- Strengthened `/ro/free-horoscope` and `/id/free-horoscope` with exact-intent titles, H1s, localized explanatory content, paid-product paths, and FAQ schema.
- Deployed the Romanian/Indonesian free-intent update to production: `https://astralo.online` aliased deployment `astralo-4m9yyouhg-daniels-projects-98c0558b.vercel.app`.
- Verified production `/ro/`, `/ro/free-horoscope`, `/id/`, `/id/free-horoscope`, `/rss.xml`, and `/api/health` return `200`, are indexable where expected, expose FAQ schema where expected, and have no placeholder tokens.
- Confirmed `/en/blog/monthly-horoscope-june-2026` was a live indexable duplicate of canonical `/blog/monthly-horoscope-june-2026`.
- Added permanent Vercel redirects from `/en/blog` to `/blog` and `/en/blog/:slug` to `/blog/:slug`.
- Deployed the duplicate English blog canonicalization fix to production: `https://astralo.online` aliased deployment `astralo-g558hz6gi-daniels-projects-98c0558b.vercel.app`.
- Verified production `/en/blog` and `/en/blog/monthly-horoscope-june-2026` return `308` redirects, while `/blog/monthly-horoscope-june-2026`, `/rss.xml`, and `/api/health` return `200`.
- Added reusable internal UTM tagging for blog CTAs and product grids so blog-to-checkout traffic is captured in attribution and Stripe metadata.
- Added blog CTA click tracking with `blog_product_click` events carrying article slug, CTA surface, product key, language, and link URL.
- Improved email signup source tracking so future leads are grouped by page type, such as `inline_blog`, `popup_blog`, `inline_free_horoscope`, or `inline_product`.
- Added an Email Subscriber Sources section to the weekly growth report and regenerated `reports/growth-report-production-2026-05-28.md`.
- Added concise blog SEO titles from article titles, keeping long article H1s but shortening title tags such as `Monthly Horoscope June 2026 | Astralo`.
- Deployed the blog attribution and title update to production: `https://astralo.online` aliased deployment `astralo-chlbom5ae-daniels-projects-98c0558b.vercel.app`.
- Verified production `/blog/monthly-horoscope-june-2026` and `/de/blog/monthly-horoscope-june-2026` return `200`, concise title tags, indexable robots, canonical URLs, internal UTM-tagged CTA links, and `blog_product_click` tracking markup.
- Reran the production SEO audit for `/blog/monthly-horoscope-june-2026`; it now reports no confirmed script findings.
- Added the next English future-demand article: `/blog/monthly-horoscope-july-2026`.
- Added exact-translation blog routing and hreflang, so new partial articles only expose real translated locale pages instead of weak English fallback duplicates.
- Updated blog indexes and localized homepages to use the latest exact-language articles automatically.
- Deployed the July monthly content and translation-routing update to production: `https://astralo.online` aliased deployment `astralo-j4yx3ydl4-daniels-projects-98c0558b.vercel.app`.
- Verified production `/blog/monthly-horoscope-july-2026` returns `200`, is indexable, has a self-canonical URL, has only English/x-default hreflang, includes UTM-tagged article CTAs, and passes the SEO audit with no confirmed script findings.
- Verified production `/de/blog/monthly-horoscope-july-2026` returns `404`, `/de/blog` does not show the untranslated July article, `/rss.xml` includes July and June but excludes stale April, and `/api/health` returns `200`.
- Added Slovak, Polish, and Hungarian July 2026 monthly horoscope translations, prioritizing the languages where February monthly pages already proved high CTR.
- Deployed the SK/PL/HU July localization update to production: `https://astralo.online` aliased deployment `astralo-gz68u2oxo-daniels-projects-98c0558b.vercel.app`.
- Verified production `/sk/blog/monthly-horoscope-july-2026`, `/pl/blog/monthly-horoscope-july-2026`, and `/hu/blog/monthly-horoscope-july-2026` return `200`, are indexable, have self-canonical URLs, expose only exact July hreflang alternates, include internal UTM-tagged CTAs, and pass the SEO audit with no confirmed script findings.
- Verified `/sk/blog`, `/pl/blog`, and `/hu/blog` now surface the July article, while `/de/blog/monthly-horoscope-july-2026` still returns `404` until a real German translation exists.
- Added Czech, Portuguese, and German July 2026 monthly horoscope translations for the next highest-priority locale opportunities.
- Deployed the CS/PT/DE July localization update to production: `https://astralo.online` aliased deployment `astralo-k9chgzgp2-daniels-projects-98c0558b.vercel.app`.
- Verified production `/cs/blog/monthly-horoscope-july-2026`, `/de/blog/monthly-horoscope-july-2026`, and `/pt/blog/monthly-horoscope-july-2026` return `200`, are indexable, have self-canonical URLs, expose only exact July hreflang alternates, include internal UTM-tagged CTAs, and pass the SEO audit with no confirmed script findings.
- Verified `/cs/blog`, `/de/blog`, and `/pt/blog` now surface the July article, while `/fi/blog/monthly-horoscope-july-2026` still returns `404` until a real Finnish translation exists.
- Added Finnish, Norwegian, Swedish, Romanian, and Indonesian July 2026 monthly horoscope translations, completing the planned July localization set.
- Deployed the FI/NO/SV/RO/ID July localization update to production: `https://astralo.online` aliased deployment `astralo-okiy52qji-daniels-projects-98c0558b.vercel.app`.
- Verified production `/fi/blog/monthly-horoscope-july-2026`, `/no/blog/monthly-horoscope-july-2026`, `/sv/blog/monthly-horoscope-july-2026`, `/ro/blog/monthly-horoscope-july-2026`, and `/id/blog/monthly-horoscope-july-2026` return `200`, are indexable, have self-canonical URLs, expose exact July hreflang alternates, include internal UTM-tagged CTAs, and pass the SEO audit with no confirmed script findings.
- Verified `/fi/blog`, `/no/blog`, `/sv/blog`, `/ro/blog`, and `/id/blog` now surface the July article, while `/fr/blog/monthly-horoscope-july-2026` still returns `404` until a real French translation exists.
- Added tracked blog-to-free-horoscope links from article final CTAs, preserving the article slug through `utm_campaign` for lead attribution.
- Preserved blog-origin attribution when a visitor signs up on `/free-horoscope` after clicking from an article, using sources like `inline_free_horoscope_from_blog` and GA4 params like `lead_utm_campaign`.
- Fixed admin subscriber stats so detailed sources such as `inline_blog`, `inline_free_horoscope_from_blog`, and `popup_site` still count under the correct inline/popup totals.
- Deployed the blog-to-free lead attribution update to production: `https://astralo.online` aliased deployment `astralo-iybjeglbr-daniels-projects-98c0558b.vercel.app`.
- Verified production `/blog/monthly-horoscope-july-2026`, `/pt/blog/monthly-horoscope-july-2026`, and `/fi/blog/monthly-horoscope-july-2026` include tracked free-horoscope links, `/free-horoscope?...utm_campaign=monthly-horoscope-july-2026` canonicalizes to the clean free-horoscope URL, `/api/health` returns `200`, and the English July article SEO audit reports no confirmed script findings.
- Added a production-safe checkout proof readiness checker and an authenticated admin dashboard panel. It reports config status without exposing secret values.
- Added authenticated `/api/admin?action=readiness` diagnostics for the live Stripe key, webhook signing secret, Supabase order storage, Gemini generation, SMTP product email delivery, GA4 server purchase tracking, admin password, and recovery cron secret.
- Deployed the checkout readiness panel to production: `https://astralo.online` aliased deployment `astralo-ai4b6cn34-daniels-projects-98c0558b.vercel.app`.
- Verified production `/api/admin?action=readiness` rejects unauthenticated requests with `401` and returns a sanitized authenticated report. The live report confirms core paid orders can run with a live Stripe key, webhook, Supabase, Gemini, SMTP, admin password, and recovery cron; the remaining proof-order gap is `GA4_API_SECRET`.
- Added a Danish homepage intent section and FAQ for the GSC-backed `professionelt horoskop` opportunity: 65 impressions, 0 clicks, average position 20.77 on `/da/`.
- Linked the Danish intent section to `/da/horoscope/monthly`, `/da/free-horoscope`, and `/da/horoscope/partner` so visitors have clear paid and free next steps.
- Deployed the Danish homepage update to production: `https://astralo.online` aliased deployment `astralo-o4bjbfv5o-daniels-projects-98c0558b.vercel.app`.
- Verified production `/da` returns `200`, remains indexable and self-canonical, exposes both new Danish questions in FAQ schema, contains all three intent links, and passes the SEO audit with no confirmed script findings.
- Added a Finnish homepage intent section and FAQ for the GSC-backed `ilmainen päivähoroskooppi` opportunity: 38 impressions, 0 clicks, average position 20.74 on `/fi`.
- Linked the Finnish intent section to `/fi/free-horoscope`, `/fi/horoscope/daily`, and `/fi/horoscope/monthly`, while clearly separating the free email-based start from the optional paid detailed report.
- Deployed the Finnish homepage update to production: `https://astralo.online` aliased deployment `astralo-c33c65ron-daniels-projects-98c0558b.vercel.app`.
- Verified production `/fi` returns `200`, remains indexable and self-canonical, exposes both new Finnish questions in FAQ schema, contains all three intent links, and passes the SEO audit with no confirmed script findings.
- Found that unsupported `50 000+` social-proof claims still leaked into localized free-horoscope descriptions because the shared detector did not recognize space-grouped thousands.
- Expanded the shared social-proof guard to catch spaces, non-breaking spaces, narrow non-breaking spaces, and Bengali `৫০,০০০+`; added regression tests and verified the repo-wide locale sweep catches all 27 numeric subtitle variants with zero misses.
- Deployed the localized social-proof credibility fix to production: `https://astralo.online` aliased deployment `astralo-eaiqne6so-daniels-projects-98c0558b.vercel.app`.
- Verified production `/sk/free-horoscope`, `/fr/free-horoscope`, `/fi/free-horoscope`, `/sv/free-horoscope`, `/uk/free-horoscope`, `/ru/free-horoscope`, `/bg/free-horoscope`, and `/bn/free-horoscope` return clean descriptions without unsupported numeric claims; `/api/health` returns `200`, and the Swedish free page passes the SEO audit with no confirmed script findings.
- Added a Swedish homepage intent section and FAQ for the GSC-backed `gratis personligt horoskop` opportunity: 13 impressions, 0 clicks across `/sv` and `/sv/`, with the strongest row at average position 11.
- Linked the Swedish intent section to `/sv/free-horoscope`, `/sv/horoscope/monthly`, and `/sv/horoscope/partner`, while clearly separating the cost-free email start from optional paid detailed reports.
- Deployed the Swedish homepage update to production: `https://astralo.online` aliased deployment `astralo-f00qcvaqo-daniels-projects-98c0558b.vercel.app`.
- Verified production `/sv` returns `200`, remains indexable and self-canonical, exposes both new Swedish questions in FAQ schema, contains all three intent links, and passes the SEO audit with no confirmed script findings. Verified `/sv/free-horoscope` still exposes a clean description without the unsupported numeric claim.
- Added Croatian and Slovenian homepage SEO overrides for the GSC-backed `astral horoskop` opportunity: Croatian `/hr/` had 9 impressions, 0 clicks, average position 6.89; Slovenian `/sl/` had 8 impressions, 0 clicks, average position 5.63.
- Updated both homepage title tags, descriptions, keywords, supporting copy, and H1s to match the exact `astral horoskop online` intent while keeping the copy localized.
- Deployed the Croatian and Slovenian homepage snippet update to production: `https://astralo.online` aliased deployment `astralo-ilqray1y2-daniels-projects-98c0558b.vercel.app`.
- Verified production `/hr` and `/sl` return `200`, remain indexable and self-canonical, expose the intended localized title, description, and `Astral horoskop online` H1, and pass SEO audits with no confirmed script findings.
- Strengthened `/da/free-horoscope` for GSC-backed Danish free-intent variants including `horoskoper gratis`, `horoskop gratis`, `fødselshoroskop`, and `gratis fødselshoroskop`.
- Added an exact-intent Danish title, description, `Gratis fødselshoroskop` H1, localized explanatory content, optional paid-product paths, and FAQ schema.
- Deployed the Danish free-horoscope update to production: `https://astralo.online` aliased deployment `astralo-oe5hmueae-daniels-projects-98c0558b.vercel.app`.
- Verified production `/da/free-horoscope` returns `200`, remains indexable and self-canonical, exposes both Danish FAQ questions in schema, contains weekly, monthly, and partner paid-product links, and passes the SEO audit with no confirmed script findings.
- Strengthened `/nl/free-horoscope` for GSC-backed Dutch free-intent variants including `gratis horoscoop`, `horoscoop gratis`, `gratis geboortehoroscoop`, and `geboortehoroscoop gratis`.
- Strengthened `/cs/free-horoscope` for the GSC-backed Czech `astrologický horoskop zdarma` opportunity at average position 18.80.
- Added localized exact-intent titles, descriptions, H1s, explanatory content, optional paid-product paths, and FAQ schema to both lead pages. Added a regression guard that keeps localized free-page meta descriptions at 160 characters or fewer.
- Deployed the Dutch and Czech free-horoscope update to production: `https://astralo.online` aliased deployment `astralo-gl2ywt56l-daniels-projects-98c0558b.vercel.app`.
- Verified production `/nl/free-horoscope` and `/cs/free-horoscope` return `200`, remain indexable and self-canonical, expose localized FAQ schema, contain weekly, monthly, and partner paid-product links, and pass SEO audits with no confirmed script findings.
- Rechecked the public production order entry path without making a charge: a valid monthly-report request returns `200` with a hosted `checkout.stripe.com` URL, while a foreign-origin request is rejected with `403`. This confirms checkout-session creation is live; one real paid proof order is still required to verify webhook fulfillment, Supabase storage, product email delivery, and GA4 purchase tracking end to end.
- Added the natural French phrase `thème astral en ligne` once in visible `/fr` homepage copy for the GSC-backed `astral on line` opportunity at average position 8.00, without placing the malformed English query in the title or H1.
- Expanded the English zodiac compatibility guide for its 362 page impressions and 0 clicks: added an explicit `Zodiac Compatibility 2026: Sign Match Table` SEO title, a near-top 12-row compatibility table, 12 sign summaries, and a tracked contextual link to the partner report.
- Removed the unsupported `Expert Astrologer` subtitle from English and localized blog templates, removed the compatibility article's unsupported `advanced algorithms and expert astrologers` claim, and corrected article author schema so `Astralo Team` is an `Organization`, not a `Person`.
- Deployed the French and compatibility-guide update to production: `https://astralo.online` aliased deployment `astralo-ihbj7733q-daniels-projects-98c0558b.vercel.app`.
- Verified production `/fr`, `/blog/zodiac-compatibility-complete-guide`, and `/fr/blog/daily-horoscope-guide` return `200`; the French page exposes `thème astral en ligne`; the compatibility guide remains indexable and self-canonical with one H1 icon, 12 table rows, 12 sign summaries, the tracked partner-report path, no unsupported expert label, and `Organization` author schema; `/api/health` returns `200`; and both focused SEO audits report no confirmed script findings.
- Strengthened `/tr/free-horoscope` for 42 disclosed GSC impressions across Turkish free birth-chart variants including `doğum haritası ücretsiz`, `ücretsiz doğum haritası`, `ücretsiz yıldız haritası`, and `saatsiz doğum haritası`.
- Replaced the generic Turkish lead snippet with an honest `Ücretsiz doğum haritası başlangıcı` offer: a free email introduction with optional deeper paid reports, plus a birth-time FAQ for the GSC-backed intent.
- Deployed the Turkish free-horoscope update to production: `https://astralo.online` aliased deployment `astralo-dxsurj9in-daniels-projects-98c0558b.vercel.app`.
- Verified production `/tr/free-horoscope` returns `200`, remains indexable and self-canonical, exposes both Turkish FAQ questions in schema, contains weekly, monthly, and partner paid-product links, `/api/health` returns `200`, and the focused SEO audit reports no confirmed script findings.
- Fixed a shared revenue-page localization defect in `ProductLandingPage.astro`: all 132 non-English paid landing pages inherited the English connector `from Astralo` in meta/OG/schema/visible copy, and 29 paid-page descriptions exceeded 160 characters.
- Added a sentence-aware paid landing description composer and regression sweep covering all 34 locales x 4 products, so every indexed paid landing description stays localized, sentence-complete, and 160 characters or fewer without crude truncation.
- Replaced the hard-coded visible `Today's Price`, `Limited offer`, and generic PDF preview alt text in both paid landing templates with existing localized offer/product strings.
- Deployed the commercial-page localization fix to production: `https://astralo.online` aliased deployment `astralo-hqqisywum-daniels-projects-98c0558b.vercel.app`.
- Verified live production across all 136 indexed paid landing pages: every URL returns `200`, no description exceeds 160 characters, no description contains `from Astralo`, no page shows hard-coded English price labels, no page keeps the generic PDF alt text, `/api/health` returns `200`, and focused audits for `/es/horoscope/weekly` and `/bg/horoscope/monthly` report no confirmed script findings.
- Strengthened the Norwegian daily-horoscope guide snippet for 123 disclosed GSC query-page impressions and 0 clicks, where `115 / 123` impressions use daily/today wording such as `dagens horoskop`, `horoskop i dag`, and `horoskop for i dag og i morgen`.
- Added an explicit Norwegian `seoTitle` (`Dagens horoskop: Guide til dagshoroskop`) and shortened the meta description from 186 characters to 139 characters while keeping the article H1/content stable.
- Deployed the Norwegian daily-guide metadata update to production: `https://astralo.online` aliased deployment `astralo-2332wymcc-daniels-projects-98c0558b.vercel.app`.
- Verified production `/no/blog/daily-horoscope-guide` returns `200`, remains indexable and self-canonical, renders the new title and 139-character description, `/api/health` returns `200`, and the focused SEO audit reports no confirmed script findings.
- Strengthened `/sv/horoscope/daily` for 197 GSC impressions and 9 clicks, especially `dagens horoskop` with 74 impressions and 8 clicks, where the page previously used the weaker phrase `Dagligt Horoskop`.
- Aligned Swedish daily product copy to `Dagens horoskop` across the public locale, matching the existing checkout product name; the landing page now renders a 142-character description with `horoskop idag`.
- Deployed the Swedish daily product-page update to production: `https://astralo.online` aliased deployment `astralo-d11h5lgg4-daniels-projects-98c0558b.vercel.app`.
- Verified production `/sv/horoscope/daily` returns `200`, remains indexable and self-canonical, renders `Dagens horoskop` in the title and H1, has no remaining `Dagligt Horoskop` text on the page, `/api/health` returns `200`, and the focused SEO audit reports no confirmed script findings.
- Strengthened `/pt/horoscope/weekly` for the next unresolved revenue opportunity: disclosed GSC query-page rows showed 74 impressions and 1 click for `horóscopo semanal` / `horoscopo semanal` variants, while the page had only generic product-page content.
- Added a Portuguese weekly paid-landing intent section with visible copy for `horóscopo semanal personalizado`, the next 7 days, and Portugal delivery, plus three matching visible FAQ answers included in FAQ schema.
- Updated the Portuguese weekly meta description to a 140-character snippet focused on `horóscopo semanal personalizado`.
- Deployed the Portuguese weekly product-page update to production: `https://astralo.online` aliased deployment `astralo-1s9qumzju-daniels-projects-98c0558b.vercel.app`.
- Verified production `/pt/horoscope/weekly` returns `200`, remains indexable and self-canonical, renders the new 140-character description and visible intent section, exposes the three Portuguese weekly FAQ questions in schema, `/api/health` returns `200`, and the focused SEO audit reports no confirmed script findings.
- Tightened the root homepage snippet for the brand CTR gap: the latest report showed `astralo` at 736 impressions, 8 clicks, average position 3.65, and `/` at 302 impressions, 2 clicks, 0.66% CTR, average position 3.99.
- Replaced the 173-character root homepage description with a 137-character brand-focused snippet: `Official Astralo website for personalized daily, weekly, monthly, and partner horoscope reports from your birth data, delivered by email.`
- Deployed the root homepage snippet update to production: `https://astralo.online` aliased deployment `astralo-8nb74p6d1-daniels-projects-98c0558b.vercel.app`.
- Verified production `/` returns `200`, remains indexable and self-canonical, renders the new 137-character description, `/api/health` returns `200`, and the focused SEO audit reports no confirmed script findings.
- Tightened the Portuguese homepage snippet for the report-backed striking-distance query `melhor horóscopo personalizado online 2026`: 37 impressions, 0 clicks, average position 3.32 on `/pt`.
- Replaced the generic 126-character Portuguese description with a 128-character exact-query snippet: `Procura o melhor horóscopo personalizado online 2026? A Astralo cria leituras para amor, carreira e previsões mensais por email.`
- Deployed the Portuguese homepage snippet update to production: `https://astralo.online` aliased deployment `astralo-bsp2jt8pe-daniels-projects-98c0558b.vercel.app`.
- Verified production `/pt` returns `200`, remains indexable and self-canonical, renders the new 128-character description and exact H1, `/api/health` returns `200`, and the focused SEO audit reports no confirmed script findings.
- Tightened the Slovak and Czech homepage snippets for the report-backed `horoskop online` row: 15 impressions, 1 click, average position 13.33.
- Replaced both over-160-character homepage descriptions with compact localized `horoskop online` snippets: Slovak is 122 characters and Czech is 119 characters.
- Deployed the Slovak/Czech homepage snippet update to production: `https://astralo.online` aliased deployment `astralo-2sgeapqis-daniels-projects-98c0558b.vercel.app`.
- Verified production `/sk` and `/cs` return `200`, remain indexable and self-canonical, render `Horoskop online` in title/H1/visible copy, `/api/health` returns `200`, and both focused SEO audits report no confirmed script findings.
- Rechecked production checkout/order proof readiness after the SEO deploy. `/api/admin?action=readiness` rejects unauthenticated requests with `401`.
- Authenticated readiness is sanitized and returns `needs_attention`: live Stripe key is configured and core paid orders can be accepted, but `canTrackServerPurchases` and `readyForProofOrder` are false because `GA4_API_SECRET` is missing.
- Ran the focused payment/order suite: checkout readiness, Stripe order recovery, fulfillment state, order email recovery, GA4 purchase payload, commerce export, and weekly report tests all passed (`23/23`).
- Rechecked the Czech `systém domů placidus` opportunity on production. `/cs/blog/the-12-houses-of-astrology` already returns `200`, is indexable and self-canonical, includes `systém domů Placidus` in the meta description, H1, visible quick-answer section, and passes the focused SEO audit with no confirmed script findings.
- Rechecked the Norwegian `gratis personlig horoskop` opportunity on production. `/no/` and `/no/free-horoscope` both return `200`, are indexable and self-canonical, expose exact-query titles/H1/meta copy, include both `gratis personlig horoskop` and `personlig horoskop gratis`, and pass focused SEO audits with no confirmed script findings.
- Tried to pull fresh Google Search Console and GA4 data for the finalized window ending 2026-06-30, but Google OAuth is still missing `webmasters.readonly` and `analytics.readonly` scopes. Fresh Google data remains blocked until owner reauthenticates `gcloud application-default`.
- Exported latest live production commerce data to `reports/commerce-export-production-2026-07-02.csv` and generated `reports/growth-report-commerce-latest-2026-07-02.md`.
- Latest live commerce export shows 12 Stripe Checkout sessions in the last 180 days, 0 paid, 12 unpaid/expired, 4 email subscribers, 21 sent followups, 3 pending followups, and 0 failed followups. The newest checkout session is 2026-05-31.
- Ran a fresh production deep SEO audit for 160 sitemap URLs: all returned `200`, all checked pages had schema and hreflang, and no script-confirmed findings were reported.
- Found a live checkout trust issue while reviewing the latest unpaid/expired sessions: shared pages and checkout forms showed unsupported urgency copy such as `Last Hours` / `Special Discount Unlocked` / hardcoded English `Limited offer`.
- Removed unsupported urgency claims from the global layout banner, root/localized checkout form banners, and blog CTA price area. The replacement copy uses localized delivery and secure-payment text.
- Added `src/lib/checkout-trust-copy.test.mjs` so checkout and shared promo templates cannot reintroduce unsupported urgency claims.
- Deployed the checkout trust-copy fix to production: `https://astralo.online` aliased deployment `astralo-ra4mmofg4-daniels-projects-98c0558b.vercel.app`.
- Verified production `/form/daily`, `/pt/form/daily`, `/hu/form/daily`, and `/blog/monthly-horoscope-july-2026` return `200`, no longer contain `Last Hours`, `Special Discount Unlocked`, or hardcoded `Limited offer`, and still show secure-payment and delivery copy. Verified `/api/health` returns `200`, `/api/checkout` still creates a hosted Stripe Checkout URL, and the July blog SEO audit reports no confirmed script findings.
- Resolved the July 13 paid-fulfillment incident after the owner confirmed the real Gmail delivery: the generated horoscope image and all four legal PDF attachments arrived correctly.
- Rechecked the complete local regression suite after the OpenAI fulfillment change: all 100 tests passed, and `npm run build` completed successfully.
- Verified the authenticated production readiness endpoint reports `ready`, including live Stripe, webhook signing, Supabase order storage, reachable OpenAI generation, SMTP delivery, GA4 server purchase tracking, admin protection, and the recovery cron.
- Removed the temporary production `CHECKOUT_PAUSED` environment variable and the Vercel Firewall rule `Emergency pause paid checkout`, then redeployed the verified production build. `https://astralo.online` now aliases `astralo-nxktcyual-daniels-projects-98c0558b.vercel.app`.
- Verified checkout is open without making a payment: a valid production `POST /api/checkout` returned `200` with a hosted `checkout.stripe.com` session URL, while production readiness remained `ready` and no active custom firewall rules remained.

Next:

- Reauthenticate Google locally with the required read-only scopes, then rerun the live Google pull for the latest finalized GSC/GA4 window.
- Manually decide how to handle the 2 old December 2025 paid orders missing product delivery; do not send a generic automated email without context.
- Request indexing/inspection in GSC for the finished July locale URLs, then move to the order-tracking proof: add `GA4_API_SECRET` in production Vercel env and run one real paid test order.
- Watch GSC for movement on `astral horoskop` across German, Croatian, and Slovenian pages; French `astral on line`; `zodiac compatibility` and `zodiac signs compatibility table`; Spanish `horóscopo semanal`; Portuguese `horóscopo semanal` and `horoscopo semanal`; Bulgarian `месечен хороскоп`; Norwegian `dagens horoskop` and `horoskop i dag`; Swedish `dagens horoskop` and `horoskop idag`; Slovak/Czech `horoskop online`; `gratis personlig horoskop`; `gratis personligt horoskop`; Danish `horoskop gratis` and `gratis fødselshoroskop`; Dutch `gratis geboortehoroscoop`; Czech `astrologický horoskop zdarma`; Turkish `ücretsiz doğum haritası`; `melhor horóscopo personalizado online 2026`; `systém domů placidus`; `horoscop personalizat gratuit`; `horoskop gratis`; `professionelt horoskop`; `ilmainen päivähoroskooppi`; and brand CTR.
- Continue improving titles/H1/FAQ only for GSC-proven query-page pairs, not broad guesses.

## External Guidance Used

- Google SEO Starter Guide: https://developers.google.com/search/docs/fundamentals/seo-starter-guide
- Google ecommerce SEO: https://developers.google.com/search/docs/specialty/ecommerce
- Google merchant listing structured data: https://developers.google.com/search/docs/appearance/structured-data/merchant-listing
- Google localized versions and hreflang: https://developers.google.com/search/docs/advanced/crawling/localized-versions

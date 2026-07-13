# Astralo language and market evidence report

**Generated:** 2026-07-13  
**Decision rule:** report first; no site changes were made from these findings.  
**Freshness:** GA4 through 2026-07-13; GSC through 2026-07-11 (normal reporting lag); Clarity last 3 days; Stripe/Supabase last 180 days.

## Bottom line

1. Organic search is accelerating: the latest comparable 28 days produced **372 clicks from 7,196 impressions**, versus **64 clicks from 2,038 impressions** in the prior 28 days. Clicks rose 481%, impressions 253%, and CTR improved from 3.14% to 5.17%.
2. The strongest proven markets are **Slovak, Norwegian, Finnish, Swedish, Hungarian, Romanian, Polish, and Czech**. July horoscope content is the main growth engine; Finnish daily-horoscope intent is the strongest evergreen opportunity.
3. GA4's historical totals are heavily polluted by low-engagement desktop traffic from China and Singapore. Recent traffic quality improved sharply even though raw sessions fell: engagement rose from **3.1% to 31.5%**.
4. The purchase funnel is not measured end-to-end in GA4. GA4 has 3 `begin_checkout` and 3 `checkout_created` events but **no purchase event**, while Stripe/Supabase prove one real €2.99 Romanian purchase. Fixing purchase measurement is more urgent than guessing from GA4 revenue.
5. German, French, Polish, Finnish, Indonesian, Arabic, Chinese, Korean, and Russian pages already rank for useful terms but often get weak CTR. Improve titles/snippets and resolve slash/canonical duplication before producing more broad content.

## Search trend: latest 28 days vs previous 28 days

| Metric | 2026-06-14 to 2026-07-11 | 2026-05-17 to 2026-06-13 | Change |
|---|---:|---:|---:|
| GSC clicks | 372 | 64 | +481% |
| GSC impressions | 7,196 | 2,038 | +253% |
| GSC CTR | 5.17% | 3.14% | +2.03 pp |
| GSC average position | 42.54 | 38.81 | -3.73 positions |
| GA4 sessions | 978 | 1,652 | -40.8% |
| GA4 engaged sessions | 308 | 52 | +492% |
| GA4 engagement rate | 31.5% | 3.1% | +28.4 pp |

The worse average GSC position is not a contradiction: Google is showing Astralo for many more queries, including new low-ranking queries. Clicks and CTR both improved. The GA4 session decline is mostly healthy because the earlier period contained much more low-quality traffic.

## All 34 locales

GA4 here means sessions whose landing URL belonged to the locale over the full available export. It is directional because GA4 contains bot/noise traffic and is not date-segmented by landing locale in this export.

| Locale | GSC clicks | Impressions | CTR | Avg position | GA4 landing sessions | GA4 engagement | Evidence verdict |
|---|---:|---:|---:|---:|---:|---:|---|
| sk | 153 | 1,144 | 13.37% | 21.98 | 206 | 38.8% | Strongest market; protect and expand July/monthly intent |
| no | 63 | 1,222 | 5.16% | 24.94 | 128 | 27.3% | Strong; July and free-personal intent |
| fi | 63 | 2,103 | 3.00% | 28.10 | 127 | 12.6% | High upside; daily horoscope and homepage snippets |
| sv | 50 | 1,097 | 4.56% | 47.06 | 107 | 27.1% | Strong July momentum; rankings still broad |
| en | 47 | 1,884 | 2.49% | 51.00 | 890 | 12.5% | July works; GA4 total includes substantial noise |
| hu | 40 | 365 | 10.96% | 27.35 | 107 | 31.8% | Strong CTR; replace expired-month dependence |
| ro | 35 | 338 | 10.36% | 30.41 | 84 | 17.9% | Strong search plus the only verified purchase |
| pl | 31 | 686 | 4.52% | 27.46 | 118 | 28.0% | Useful market; brand CTR and expired-month dependence need work |
| cs | 31 | 840 | 3.69% | 15.43 | 100 | 34.0% | Good ranking; improve CTR and Placidus article match |
| hr | 22 | 388 | 5.67% | 68.20 | 74 | 16.2% | Daily intent exists, but ranking is the primary issue |
| pt | 19 | 477 | 3.98% | 40.04 | 84 | 15.5% | Daily/weekly opportunity; moderate evidence |
| es | 13 | 623 | 2.09% | 43.73 | 73 | 6.8% | Weekly intent; improve relevance and engagement |
| de | 12 | 1,129 | 1.06% | 37.83 | 87 | 17.2% | High-priority CTR/canonical problem |
| da | 10 | 750 | 1.33% | 34.96 | 76 | 7.9% | Retrograde/monthly opportunity; weak CTR |
| sr | 10 | 308 | 3.25% | 34.07 | 78 | 16.7% | Weekly intent; moderate evidence |
| el | 6 | 97 | 6.19% | 17.46 | 59 | 6.8% | Promising CTR but small sample |
| he | 5 | 230 | 2.17% | 43.50 | 76 | 15.8% | Weekly/daily intent; small sample |
| nl | 5 | 448 | 1.12% | 52.90 | 57 | 8.8% | Free daily intent; weak ranking and CTR |
| id | 4 | 140 | 2.86% | 15.81 | 66 | 10.6% | `horoskop gratis` ranks but does not win clicks |
| zh | 3 | 277 | 1.08% | 13.01 | 980 | 1.4% | SERP relevance and severe GA4 bot/noise concern |
| bg | 3 | 326 | 0.92% | 65.25 | 64 | 6.2% | Daily intent exists; ranking is weak |
| ar | 2 | 206 | 0.97% | 8.20 | 94 | 16.0% | High rank with very weak CTR: snippet/language review |
| it | 2 | 226 | 0.88% | 30.63 | 57 | 3.5% | Free horoscope intent; weak response |
| ja | 2 | 168 | 1.19% | 14.14 | 80 | 11.2% | High position/low CTR; native snippet review |
| sl | 2 | 71 | 2.82% | 26.37 | 61 | 6.6% | Too little data for major investment |
| tr | 2 | 677 | 0.30% | 75.17 | 63 | 4.8% | Visibility is broad but ranking/relevance is poor |
| bn | 1 | 27 | 3.70% | 13.04 | 71 | 5.6% | Too little GSC evidence; GA4 likely noisy |
| fr | 1 | 181 | 0.55% | 19.47 | 56 | 10.7% | Brand/personalized-love snippet opportunity |
| hi | 1 | 47 | 2.13% | 20.15 | 48 | 0.0% | Too little trustworthy engagement evidence |
| uk | 1 | 11 | 9.09% | 45.00 | 57 | 3.5% | Too little GSC evidence |
| vi | 1 | 33 | 3.03% | 15.91 | 64 | 10.9% | Small evidence; inspect monthly terminology |
| ko | 0 | 69 | 0.00% | 7.43 | 66 | 1.5% | High position with zero clicks: urgent native snippet check |
| ru | 0 | 118 | 0.00% | 14.75 | 69 | 13.0% | Ranking without clicks; snippet/intent mismatch |
| th | 0 | 58 | 0.00% | 23.19 | 83 | 26.5% | Insufficient search evidence despite some GA4 engagement |

## Exact search language people use

- **Slovak:** `horoskop na jul 2026` (26 clicks/153 impressions) and `horoskop jul 2026` (23/144).
- **Norwegian:** `horoskop juli 2026` (19/193); also free-personal horoscope variants.
- **Finnish:** `päivittäinen horoskooppi` (24/283), `astral horoskooppi` (17/629), `kuukausihoroskooppi` (5/71).
- **Swedish:** `horoskop juli 2026` (13/81) and `månadens horoskop juli 2026` (10/82).
- **English:** `july 2026 horoscope` (16/169).
- **Romanian:** `horoscop iulie 2026` (6/20, 30% CTR).
- **Croatian:** `dnevni horoskop` (10/182), but average position is still very low.
- **Spanish:** `horóscopo semanal` (4/35).
- **Portuguese:** `horóscopo diário` (3/6).
- **Hebrew:** weekly and daily horoscope terms are the visible demand.

## Highest-value SEO opportunities

1. **German homepage/snippet and URL consistency:** `astral horoskop` has 5/228 at position 5.8, while duplicate slash variants and `astralhoroskop` receive impressions with almost no clicks.
2. **Finnish evergreen daily intent:** strong demand already exists, but `ilmainen päivähoroskooppi` and brand variants underperform their positions.
3. **French/Polish brand CTR:** Astralo ranks near the top for brand terms but earns very few clicks. Titles/descriptions may look irrelevant or untrustworthy.
4. **Arabic/Japanese/Chinese/Korean/Russian native SERP review:** these locales often rank on page one or two but get almost no clicks. This is the strongest evidence of wording, intent, or trust mismatch.
5. **Czech Placidus intent:** `systém domů placidus` has 47 impressions around position 10 on the 12-houses article and deserves a precise heading/title section.
6. **Do not create more broad Turkish/Croatian content first:** their main issue is low ranking, not merely snippet CTR.

## GA4 traffic quality and funnel

Historical GA4 traffic is distorted by **China (2,044 sessions, 0.7% engagement)** and **Singapore (1,373 sessions, 8.1% engagement)**, mostly English desktop traffic. Genuine market signals look materially better: Slovakia 53.8% country engagement, Czechia 72.7%, Norway 43.8%, Sweden 54.3%, Hungary 65.9%, Poland 57.9%, and Romania 54.2%.

Recorded funnel events over the available export:

| Event | Count | Users |
|---|---:|---:|
| `form_start` | 62 | 22 |
| `blog_product_click` | 18 | 16 |
| `sign_up` | 6 | 6 |
| `begin_checkout` | 3 | 2 |
| `checkout_created` | 3 | 2 |
| `purchase` | 0 | 0 |

The missing purchase event is a measurement defect because Stripe/Supabase prove a real purchase occurred.

## Purchases: Stripe and Supabase truth

Live production evidence for the last 180 days:

- 24 Stripe Checkout sessions: **1 paid**, 22 expired/unpaid, 1 open/unpaid.
- 2 payment intents: 1 succeeded, 1 cancelled.
- Exactly **one real purchase: €2.99, Romanian, partner horoscope**.
- Matching Supabase order exists, content was generated, email was sent, and no refund or Stripe/Supabase mismatch exists.
- A second €0 English row is a seed/proof row and is not revenue.

This proves Romanian traffic can convert, but one order is far too small a sample for broad localization conclusions.

## Clarity behaviour

Fresh three-day Clarity data shows 5 dead clicks and 4 quick-backs, with **zero rage clicks, excessive scrolling, script errors, or error clicks**. The sample is small. The most commercially relevant item is one dead click on the Russian partner form; the remaining events are isolated and do not prove a site-wide UX failure.

## Other sources

- **Bing Webmaster:** site URLs configured, API key missing; no usable export.
- **Ahrefs:** not configured; no backlink/authority history.
- **Merchant Center:** not configured and not currently necessary for generated digital reports.
- **Shopify:** not used by Astralo.
- **Custom apps:** no additional analytics source configured.

## Recommended order for the next implementation phase

1. Repair GA4 purchase tracking and validate checkout attribution against Stripe/Supabase.
2. Fix canonical/trailing-slash duplication and high-ranking low-CTR snippets, starting with DE, FI, FR, PL, ID, AR, JA, ZH, KO, and RU.
3. Perform native-level title/meta/H1/CTA review for those same high-rank/low-click languages. Automated translation checks cannot prove persuasive native wording.
4. Strengthen proven intent pages: July/monthly for SK/NO/SV/RO and evergreen daily horoscope for FI/HR/PT.
5. Investigate the Russian partner-form dead click and verify the paid funnel manually only after explicit browser approval.
6. Re-measure for at least 14-28 days before adding more broad articles or removing languages.

## Evidence files

- Fresh analytics export: `C:\Users\User\Downloads\astralo-analytics-data-2026-07-13.csv`
- Parsed GA4/GSC/Clarity data: `C:\Users\User\Desktop\Projects\analytics-dashboard\data\imports\api\projects\astralo`
- Commerce truth: `C:\Users\User\Desktop\Projects\Astralo\reports\commerce-truth-2026-07-13.md`

## Implementation completed locally on 2026-07-13

- GA4 purchase tracking now runs server-side only after a paid checkout is successfully fulfilled. Failed, missing-email, and duplicate webhook flows cannot create a purchase event.
- Production already has `GA4_API_SECRET` configured in Vercel for Preview and Production.
- Canonicals now remove query strings, fragments, and non-root trailing slashes centrally. Localized homepage/internal links follow the same policy.
- Generated sitemap verification: 585 canonical URLs and zero non-root trailing-slash URLs.
- Homepage titles, H1s, descriptions, supporting copy, and free-horoscope CTAs were improved for DE, FI, FR, PL, ID, AR, JA, ZH, KO, RU, PT, ES, HI, and TR.
- Indonesian now targets the proven `horoskop gratis` intent with the natural expansion `horoskop gratis hari ini` rather than generic translated wording.
- Existing strong SK, NO, SV, RO, CS, HR, and other evidence-backed copy was preserved.
- Unified automated tests pass, `git diff --check` passes, and the production Astro build completes.
- Production deployment and live visual/browser verification were not performed in this implementation pass.

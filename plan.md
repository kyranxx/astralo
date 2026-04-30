# Astralo Recovery Plan

## Goal
- Turn Astralo from "traffic with no sales" into a measurable funnel with clear fixes and weekly progress.

## Progress
- Phase 1 measurement sprint is implemented in code.
- Birth time friction is removed from forms and API handling.
- Paid homepage and product SEO no longer inherit "free horoscope" keywords from global locale meta.
- The email capture now uses localized free-offer copy and tracks `sign_up`.

## Current Situation
- We have search impressions and some clicks, but zero sales.
- GA4 base tracking works, but the sales funnel is not properly tracked.
- Google Search Console shows heavy index bloat: many discovered pages, few indexed pages.
- Paid pages are targeting too many "free horoscope" keywords, which likely brings low-buy-intent traffic.
- The site has at least one conversion friction point: birth time is described as optional, but the form requires it.

## Main Priorities
1. Fix measurement first
2. Fix conversion blockers second
3. Fix search intent and index quality third
4. Build a real free lead magnet funnel
5. Run controlled growth tests after the basics work

---

## Phase 1: Measurement and Truth
### Why
- If we cannot measure the funnel, we cannot know what is broken.

### Tasks
- Add GA4 events for:
  - `view_item`
  - `begin_checkout`
  - `sign_up`
  - `purchase`
- Send useful parameters with events:
  - product type
  - language
  - page path
  - price
  - traffic source when available
- Verify events in GA4 Realtime and DebugView.
- Mark the correct business events as key events in GA4.

### Done when
- We can see how many users:
  - land on a product page
  - reach the form
  - start checkout
  - complete purchase
  - subscribe to email

---

## Phase 2: Remove Conversion Friction
### Why
- Small form problems can destroy conversion before traffic matters.

### Tasks
- Make birth time truly optional everywhere if that is the real product rule.
- Audit all form fields for mismatch between copy and behavior.
- Check that checkout errors are visible and clear.
- Review trust signals:
  - remove or verify any unsupported claims like large customer counts
  - make delivery, refund, and payment clarity stronger
- Improve product-page CTA clarity:
  - what it is
  - what user gets
  - how fast it arrives
  - why it is paid

### Done when
- A visitor can move from product page to form to checkout without hidden friction.

---

## Phase 3: Fix Search Intent
### Why
- Ranking for the wrong keywords brings clicks that do not buy.

### Tasks
- Remove "free horoscope" positioning from paid landing pages and homepage SEO where misleading.
- Keep "free" only for true free pages or the lead magnet funnel.
- Rewrite title and meta description strategy per page type:
  - homepage
  - product pages
  - blog articles
  - localized pages
- Focus paid pages on terms closer to buying intent:
  - personalized horoscope
  - birth chart reading
  - relationship compatibility reading
  - monthly horoscope report

### Done when
- Paid pages target paid-intent queries.
- Free-intent queries go to free content or free signup pages.

---

## Phase 4: Reduce Index Bloat
### Why
- Search Console shows many pages discovered but not indexed.
- That usually means Google sees too many weak, repetitive, or low-priority URLs.

### Tasks
- Audit which page groups create the most thin or repetitive URLs.
- Identify low-value pages by template and language.
- Decide which pages should be:
  - improved
  - merged
  - noindexed
  - left out of sitemap
- Prioritize strongest markets/languages first instead of pushing every locale equally.
- Review internal linking toward the most valuable commercial pages.

### Done when
- Index coverage becomes cleaner.
- Important commercial and strongest content pages get most of the crawl and index focus.

---

## Phase 5: Build a Real Free Funnel
### Why
- Most cold visitors will not buy on first visit.
- We need a lead capture path that naturally leads to paid offers.

### Tasks
- Replace the generic newsletter popup with a specific free offer:
  - "Get your free 7-day horoscope"
- Create a dedicated signup flow and thank-you state.
- Send a short email sequence:
  - Day 0: free reading / welcome
  - Day 2: value + soft offer
  - Day 5: stronger offer for monthly or partner reading
- Track signup conversion and later purchase conversion from email leads.

### Done when
- We can measure:
  - popup to signup rate
  - signup to email open/click
  - signup to purchase

---

## Phase 6: Landing Page Improvement
### Why
- Even with better traffic, weak product pages will still underperform.

### Tasks
- Tighten hero copy around one promise per page.
- Make differences between daily / weekly / monthly / partner more obvious.
- Show a better sample of what users receive.
- Improve trust and legitimacy without hype.
- Add stronger article-to-product CTAs from blog content.

### Done when
- Product pages clearly answer:
  - why buy
  - why this product
  - why now

---

## Phase 7: Growth Tests
### Why
- Only after tracking and core funnel quality are fixed.

### Tasks
- Test top 3 countries first.
- Test 2-3 core landing pages first.
- Compare:
  - free funnel vs direct sale
  - monthly vs partner offer priority
  - different CTA copy
  - different pricing or bundles if needed

### Done when
- Changes are based on measured wins, not guessing.

---

## Key Metrics
- Product page views
- Form views
- Begin checkout rate
- Purchase rate
- Email signup rate
- Signup to purchase rate
- Indexed commercial pages
- Clicks by country and page type

## Recommended Execution Order
1. GA4 funnel events
2. Birth time / form friction fix
3. Rewrite SEO intent on money pages
4. Index cleanup strategy
5. Free 7-day horoscope funnel
6. Landing page upgrades
7. Tests and iteration

## First Concrete Sprint
- Done: Add GA4 business events
- Done: Make birth time optional in forms and validation
- Done: Remove misleading free-intent SEO from paid pages
- Done: Replace generic newsletter popup copy with a clear free 7-day offer

## Notes
- Do not try to fix all countries at once.
- Do not add more pages before the funnel is measurable.
- Do not trust impressions or clicks alone; optimize for sales and lead quality.

# Astralo TODO List
**Created**: 2025-12-05T17:50
**Last Updated**: 2025-12-05T19:00
**Status**: ✅ ALL COMPLETE

## ✅ ALL TASKS COMPLETED

### Code Refactoring
- [x] Split i18n.ts into 33 separate locale files (~50-100 lines each)
- [x] Optimized language switcher order (major markets first)

### UI/UX Fixes  
- [x] Fixed success page z-index overlap
- [x] Aligned benefits icons vertically with left-aligned text
- [x] Added "Best Value" badge to monthly (green)
- [x] "Popular" badge on weekly (amber)

### Bug Fixes
- [x] Fixed Arabic/Hindi/Bengali Stripe checkout (locale fallback to 'auto')
- [x] Added date validation (1900-present only)
- [x] Fixed PDF font fetching (use jsdelivr CDN instead of GitHub raw)
- [x] Fixed contact page import paths

### Form Improvements
- [x] Date validation implemented
- [x] "I don't know time" checkbox present

### Footer Updates
- [x] Removed email - replaced with contact form link
- [x] Created contact form page (/legal/contact)
- [x] Created contact API (sends to blanarikdaniel@gmail.com)
- [x] Removed company information
- [x] Removed "Slovakia, EU" text
- [x] Made logo bigger (h-14)

### Legal Documents
- [x] Added version number (v1.0) to all legal pages

### Pricing Strategy
- [x] Anchor pricing implemented (crossed-out original prices)
- [x] "Best Value" badge on monthly
- [x] "Popular" badge on weekly

### PDF Generation (Already Implemented)
- [x] PDF generator exists (src/lib/pdf-generator.ts)
- [x] Legal documents generated as PDFs
- [x] PDFs attached to customer emails

### Email Template (Already Implemented)
- [x] Beautiful HTML email template (src/pages/api/send-email.ts)
- [x] Gradient header with logo
- [x] Formatted horoscope content
- [x] Legal document attachments
- [x] Multi-language support

---

## Notes

### Current Pricing (50% discount shown)
- Daily: €3.99 → €1.99
- Weekly: €7.99 → €3.99 (Popular)
- Monthly: €19.99 → €9.99 (Best Value)
- Partner: €29.99 → €14.99

### Stripe Supported Locales
Supported: `en, de, fr, es, it, pt, nl, pl, sk, cs, hu, ro, bg, hr, sl, ru, el, tr, ja, ko, zh, th, vi, id, sv, da, fi, nb`
NOT supported (fallback to 'auto'): `ar, hi, bn, uk, sr, no`

# Astralo TODO List
**Created**: 2025-12-05T17:50
**Last Updated**: 2025-12-05T18:55
**Status**: ✅ COMPLETED

## ✅ SESSION SUMMARY (Completed)

### Code Refactoring
- [x] Split i18n.ts into 33 separate locale files (~50-100 lines each)
- [x] Optimized language switcher order (major markets first)

### UI/UX Fixes  
- [x] Fixed success page z-index overlap
- [x] Aligned benefits icons vertically with left-aligned text
- [x] Added "Best Value" badge to monthly
- [x] Weekly already has "Popular" badge

### Bug Fixes
- [x] Fixed Arabic/Hindi/Bengali Stripe checkout error (locale fallback)
- [x] Added date validation (1900-present only)

### Form Improvements
- [x] Date validation implemented
- [x] "I don't know time" checkbox already present

### Footer Updates
- [x] Removed direct email - replaced with contact form link
- [x] Created contact form page (/legal/contact)
- [x] Created contact API (sends to blanarikdaniel@gmail.com)
- [x] Removed company information
- [x] Made logo bigger (h-14)

### Legal Documents
- [x] Added version number (v1.0) to all legal pages

### Pricing Strategy
- [x] Anchor pricing ALREADY IMPLEMENTED (crossed-out original prices shown)
- [x] "Best Value" badge on monthly DONE
- [x] "Popular" badge on weekly DONE
- [ ] OPTIONAL: Consider de-emphasizing daily (low purchase frequency)
- [x] Regional pricing NOT recommended (VPN exploitable)

---

## 📋 OPTIONAL / FUTURE (Not Required)

### PDF Report Generation
- [ ] Design HTML template for horoscope reports
- [ ] Implement HTML → PDF conversion  

### Email Improvements
- [ ] Redesign email template to match webapp

### Sample Preview
- [ ] Create sample PDF preview on main page

---

## Notes

### Current Pricing (with 50% discount shown)
- Daily: €3.99 → €1.99
- Weekly: €7.99 → €3.99 (Popular)
- Monthly: €19.99 → €9.99 (Best Value)
- Partner: €29.99 → €14.99

### Stripe Supported Locales
Supported: `en, de, fr, es, it, pt, nl, pl, sk, cs, hu, ro, bg, hr, sl, ru, el, tr, ja, ko, zh, th, vi, id, sv, da, fi, nb`
NOT supported (fallback to 'auto'): `ar, hi, bn, uk, sr, no`

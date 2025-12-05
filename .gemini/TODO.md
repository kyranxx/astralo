# Astralo TODO List
**Created**: 2025-12-05T17:50
**Last Updated**: 2025-12-05T18:47
**Status**: ✅ COMPLETED

## ✅ ALL COMPLETED

### Code Refactoring
- [x] Refactor i18n.ts into 33 separate locale files (~50-100 lines each)
- [x] Optimize language order in LanguageSwitcher (Major markets first)

### UI/UX Fixes
- [x] Fix success page graphic overlapping lang switcher (z-index: 1001)
- [x] Align benefits icons vertically with left-aligned text
- [x] Added "Best Value" badge to monthly horoscope (green gradient)
- [x] Added "Popular" badge already on weekly

### Critical Bug Fixes
- [x] Fix Arabic/Hindi/Bengali checkout error (Stripe locale mapping)
- [x] Fix date input validation (1900-present only)

### Form Fixes
- [x] Date validation added (min 1900, max today)
- [x] "I don't know the time" checkbox already present in forms

### Footer Updates
- [x] Removed direct email from footer
- [x] Added link to contact form
- [x] Created contact form page (/legal/contact)
- [x] Created contact API (sends to blanarikdaniel@gmail.com)
- [x] Removed company information from footer
- [x] Made logo bigger (h-10 → h-14)

### Legal Documents
- [x] Added version number (v1.0) and timestamp to all legal pages
  - Terms of Service
  - Privacy Policy
  - Refund Policy
  - Cookie Policy

## 📋 OPTIONAL / FUTURE IMPROVEMENTS

These items would require more significant work and are optional for now:

### PDF Report Generation (Future)
- [ ] Design HTML template for horoscope reports
- [ ] Implement HTML → PDF conversion
- [ ] Attach PDF to email delivery

### Email Improvements (Future)
- [ ] Redesign email template to match webapp
- [ ] Better typography

### Sample Report
- [ ] Create sample PDF preview on main page

---

## Notes

### Stripe Supported Locales
Supported: `en, de, fr, es, it, pt, nl, pl, sk, cs, hu, ro, bg, hr, sl, ru, el, tr, ja, ko, zh, th, vi, id, sv, da, fi, nb`

NOT supported (fallback to 'auto'): `ar, hi, bn, uk, sr, no`

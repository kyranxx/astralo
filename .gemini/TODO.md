# Astralo TODO List
**Created**: 2025-12-05T17:50
**Last Updated**: 2025-12-05T18:25
**Status**: In Progress

## ✅ COMPLETED

### Code Refactoring
- [x] Refactor i18n.ts into 33 separate locale files (~50-100 lines each)
- [x] Optimize language order in LanguageSwitcher (Major markets first)

### UI/UX Fixes
- [x] Fix success page graphic overlapping lang switcher (z-index: 1001)
- [ ] Align benefits icons vertically (one under another) in horoscope cards
- [ ] Fix order page top banner (check Stripe logo)
- [ ] Simplify success page text

### Critical Bug Fixes
- [x] Fix Arabic/Hindi/Bengali checkout error (Stripe locale mapping)
- [x] Fix date input validation (prevent years like 2222, 0001)

### Form Fixes
- [x] Date validation added (1900-present only)
- [x] "I don't know the time" checkbox already present in forms

### Footer Updates
- [x] Removed direct email from footer
- [x] Added link to contact form
- [x] Created contact form page (/legal/contact)
- [x] Created contact API (sends to blanarikdaniel@gmail.com)
- [x] Removed company information from footer
- [x] Made logo bigger (h-10 → h-14)

## 🔄 TODO (REMAINING)

### Horoscope Product Structure
- [ ] Update benefits to show cumulative value:
  - Daily: Base benefits
  - Weekly: "All Daily benefits PLUS..." 
  - Monthly: "All Weekly benefits PLUS..."
  - Partner: Unique benefits
- [ ] Align benefits icons vertically

### Pricing Strategy
**Current**: Daily €1.99, Weekly €3.99, Monthly €9.99, Partner €14.99
- [ ] Add "Best Value" badge to monthly
- [ ] Consider anchor pricing (was €19.99, now €9.99)

### Sample Report / Preview
- [ ] Create sample PDF preview on main page
- [ ] Verify "15+ pages" claim

### PDF Report Generation
- [ ] Design HTML template for horoscope reports
- [ ] Implement HTML → PDF conversion
- [ ] Attach PDF to email delivery

### Email Improvements  
- [ ] Redesign email template to match webapp
- [ ] Better typography

### Legal Documents
- [ ] Add version number and timestamp to each legal page
- [ ] Generate PDF versions of legal documents

## 📋 Final Steps
- [ ] Test all changes
- [ ] Push to GitHub

---

## Stripe Supported Locales
Supported: `en, de, fr, es, it, pt, nl, pl, sk, cs, hu, ro, bg, hr, sl, ru, el, tr, ja, ko, zh, th, vi, id, sv, da, fi, nb`

NOT supported (fallback to 'auto'): `ar, hi, bn, uk, sr, no`

# Astralo TODO List
**Created**: 2025-12-05T17:50
**Last Updated**: 2025-12-05T18:15
**Status**: In Progress

## ✅ COMPLETED

### 1. Code Refactoring
- [x] ~~Refactor i18n.ts into separate locale files~~ (Partially done - kept translations in one file for easier maintenance)
- [x] Optimize language order in LanguageSwitcher (Major markets first)

### 2. UI/UX Fixes
- [x] Fix success page graphic overlapping lang switcher (z-index: 1001)
- [ ] Align benefits icons vertically (one under another) in horoscope cards
- [ ] Fix order page top banner (missing Stripe logo)
- [ ] Simplify success page text (too much content)

### 3. Critical Bug Fixes
- [x] Fix Arabic/Hindi/Bengali checkout error (Stripe locale mapping)
  - Unsupported locales now fallback to 'auto'
  - Norwegian 'no' mapped to 'nb'

## 🔄 IN PROGRESS / TODO

### Form Issues
- [ ] Fix date input allowing invalid years (2222, 0001) - add validation
- [ ] Add "I don't know the time" checkbox to partner form
- [ ] Consider: Do we really need birth time & city? (Many don't know)

### Horoscope Product Structure
- [ ] Update benefits to show cumulative value:
  - Daily: Base benefits
  - Weekly: "All Daily benefits PLUS..." 
  - Monthly: "All Weekly benefits PLUS..."
  - Partner: Unique benefits
- [ ] Rename "benefits" to something clearer (e.g., "What's Included")

### Pricing Strategy Review
**Current Pricing**: Daily €1.99, Weekly €3.99, Monthly €9.99, Partner €14.99

**Recommendations**:
- [ ] Consider anchor pricing: Show "was €19.99, now €9.99" for monthly
- [ ] Focus on monthly as best value (add "Best Value" badge)
- [ ] Consider removing/de-emphasizing daily (low purchase frequency)
- **Regional pricing**: NOT recommended (VPN exploitable)

### Sample Report / Preview
- [ ] Create sample PDF preview on main page
- [ ] Verify actual page count for "15+ pages of insights"
- [ ] Add visual preview carousel/modal

### PDF Report Generation
- [ ] Design HTML template for horoscope reports (best for PDF conversion)
- [ ] Implement HTML → PDF conversion
- [ ] Ensure consistent styling
- [ ] Attach PDF to email delivery

### Email Improvements
- [ ] Redesign email template to match webapp aesthetics
- [ ] Better typography and font styling
- [x] Email content in customer's language (already working - confirmed with Indonesian)
- [ ] Consider if confirmation email needs to be in English for legal

### Legal Documents
- [ ] Add version number and last updated timestamp to each legal page
- [ ] Generate static PDF versions of legal documents
- [ ] Attach legal PDFs to customer emails
- [ ] Verify legal content is up to date

### Footer Updates
- [ ] Remove direct email from footer
- [ ] Add link to contact form
- [ ] Create contact form (sends to blanarikdaniel@gmail.com)
- [ ] Remove company information
- [ ] Make logo bigger

## 📋 Final Steps

- [ ] Verify all changes compile without errors
- [ ] Test all language versions including Arabic/Hindi
- [ ] Push to GitHub

---

## Notes

### Stripe Supported Locales
Stripe Checkout supports: `en, de, fr, es, it, pt, nl, pl, sk, cs, hu, ro, bg, hr, sl, ru, el, tr, ja, ko, zh, th, vi, id, sv, da, fi, nb`

NOT supported (fallback to 'auto'): `ar, hi, bn, uk, sr, no`

### Language Switcher Order (Implemented)
1. Major global: en, de, fr, es, it, pt, nl, pl
2. Central European: sk, cs, hu, ro
3. Other European: bg, hr, sl, sr, uk, ru, el, tr
4. Nordic: sv, da, fi, no
5. Asian: ja, ko, zh, th, vi, id
6. South Asian & Middle East: hi, bn, ar

### Birth Time/Place Decision
Many astrology services ask for birth time/place because it creates more accurate natal charts. 
**Recommendation**: Keep but mark as optional, add "I don't know" checkbox.

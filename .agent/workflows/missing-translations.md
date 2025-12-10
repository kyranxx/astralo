# Missing Translations Report

This document lists all UI texts that need to be translated across all supported languages.

---

## ⚠️ IMPORTANT NOTE: Legal Documents

**The actual content of legal documents (Terms of Service, Privacy Policy, Refund Policy, Cookie Policy) must remain in English for all languages.** This is a legal requirement.

However, the **link labels** in the footer (e.g., "Terms of Service", "Privacy Policy") should still be translated so users understand what they're clicking on. The linked pages themselves will be in English.

---

## Priority: High

### 1. Footer Component (`src/components/Footer.astro`)

**Issue:** Footer only has translations for English and Slovak. All other 31 languages fall back to English.

**Location:** Lines 8-33

**Missing translations for ALL languages except en/sk:**
- `country` - "Slovakia, EU"
- `termsOfService` - "Terms of Service"
- `privacyPolicy` - "Privacy Policy"
- `refundPolicy` - "Refund Policy"
- `cookiePolicy` - "Cookie Policy"
- `contact` - "Contact"
- `contactUs` - "Contact us"
- `paymentMethods` - "Secure payments via"
- `allRightsReserved` - "All rights reserved."
- `jurisdiction` - "Slovak law applies"

**Hardcoded English in Footer (line 55):**
- `"Legal"` - Section heading (not translated)

**Hardcoded English in Footer (lines 97, 104):**
- `"SSL Secured"` - Trust badge
- `"GDPR"` - Trust badge (this can stay as is since it's an acronym)

---

### 2. Cookie Consent Component (`src/components/CookieConsent.astro`)

**Issue:** Cookie consent only has translations for English and Slovak. All other 31 languages fall back to English.

**Location:** Lines 8-21

**Missing translations for ALL languages except en/sk:**
- `message` - "We use cookies to enhance your experience..."
- `accept` - "Accept"
- `decline` - "Decline"
- `learnMore` - "Learn more"

**Hardcoded English (line 33):**
- `"Cookie Notice"` - Banner title (not translated)

---

### 3. Success Page (`src/pages/success.astro`)

**Issue:** Success page only has translations for 10 languages (en, sk, cs, de, fr, es, it, pt, pl, tr). 23 languages are missing.

**Location:** Lines 14-175

**Missing translations for these languages:**
- nl, hu, ro, bg, hr, sl, sr, uk, ru, el, ar, hi, ja, ko, zh, th, vi, id, sv, da, fi, no, bn

**Texts to translate:**
- `preparing` - "Preparing Your Horoscope..."
- `analyzing` - "Analyzing your birth chart and planetary positions."
- `generated` - "Horoscope Generated!"
- `checkEmail` - "Check Your Email! 📬"
- `sentTo` - "Your personalized horoscope has been sent to:"
- `inEmail` - "Your horoscope is in the email body"
- `docsAttached` - "Legal documents are attached"
- `sending` - "Sending your horoscope..."
- `emailSent` - "Email sent successfully!"
- `backHome` - "Back to Home"
- `didntReceive` - "Didn't receive the email? Check your spam folder or contact"
- `error` - "Something went wrong"
- `errorDesc` - "We couldn't generate your horoscope. Please contact support."
- `emailFailed` - "Failed to send email. Contact support."

---

### 4. Stripe Checkout (`src/pages/api/checkout.ts`)

**Issue:** Product names in Stripe are always in English.

**Location:** Lines 8-13

**Hardcoded English product names:**
- `"Daily Horoscope"`
- `"Weekly Horoscope"`
- `"Monthly Horoscope"`
- `"Partner Horoscope"`

**Note:** These appear on the Stripe checkout page. They should ideally be translated based on the customer's language.

---

### 5. Homepage Testimonials (All language versions)

**Issue:** Testimonials are hardcoded in English for all languages.

**Location:** `src/pages/[lang]/index.astro` (lines 76-95) and `src/pages/index.astro`

**Hardcoded English:**
- Sarah Mitchell testimonial text
- James Wilson testimonial text
- Emma Thompson testimonial text
- Customer names and locations

**Note:** These should either be translated or replaced with localized testimonials for each language.

---

### 6. English Form Page (`src/pages/form/[type].astro`)

**Issue:** This page has some hardcoded English texts that should use `t.form.*` translations.

**Location:** Lines 51-52, 144, 198, 301, 311-312, 333

**Hardcoded English:**
- `"Back"` (line 52) - Should use `t.form.back`
- `"First Person"` (line 144) - Should use `t.form.firstPerson`
- `"Second Person"` (line 198) - Should use `t.form.secondPerson`
- `"100% Secure"` (line 301) - Should use `t.form.secure`
- `"Guarantee"` (line 311) - Should use `t.form.guarantee`
- `"30 days"` (line 312) - Should use `t.form.days`
- `"Redirecting to payment..."` (line 333) - Should use `t.form.redirecting`

---

## Priority: Medium

### 7. Top Banner "50% OFF" 

**Issue:** "50% OFF" text in the promo banner is hardcoded in English.

**Location:** 
- `src/pages/[lang]/index.astro` (line 108)
- `src/pages/index.astro`
- `src/pages/[lang]/form/[type].astro` (line 49)
- `src/pages/form/[type].astro` (line 41)

**Note:** Consider translating or keeping as-is since percentages are universal.

---

## Implementation Plan

### ✅ Step 1: Update Footer Component (COMPLETED)
Added all 33 language translations to `src/components/Footer.astro`
- Added translations for: legal, termsOfService, privacyPolicy, refundPolicy, cookiePolicy, contact, contactUs, paymentMethods, allRightsReserved, jurisdiction, sslSecured
- Updated hardcoded "Legal" header to use `{t.legal}`
- Updated hardcoded "SSL Secured" badge to use `{t.sslSecured}`

### ✅ Step 2: Update Cookie Consent Component (COMPLETED)
Added all 33 language translations to `src/components/CookieConsent.astro`
- Added translations for: message, accept, decline, learnMore, title
- Updated hardcoded "Cookie Notice" text to use `{t.title}`

### ✅ Step 3: Update Success Page (COMPLETED)
Added all 33 language translations to `src/pages/success.astro`
- Added translations for all success/error messages in all languages

### ✅ Step 4: Fix English Form Page (COMPLETED)
Updated `src/pages/form/[type].astro` to use translation references:
- "Back" → `{t.form.back}`
- "First Person" → `{t.form.firstPerson}`
- "Second Person" → `{t.form.secondPerson}`
- "100% Secure" → `100% {t.form.secure}`
- "Guarantee" → `{t.form.guarantee}`
- "30 days" → `30 {t.form.days}`
- "Redirecting to payment..." → `{t.form.redirecting}`

### ✅ Step 5: Translate Stripe Product Names (COMPLETED)
Modified `src/pages/api/checkout.ts` to use translated product names:
- Added `productNames` object with all 33 language translations
- Added `getProductName()` function to get localized product name
- Stripe checkout now shows product names in customer's language

### Step 6: Localize Testimonials (Optional - NOT IMPLEMENTED)
Testimonials remain in English. Consider translating in a future update.

---

## Languages Reference

All 33 supported languages:
1. en - English
2. sk - Slovak
3. cs - Czech
4. de - German
5. fr - French
6. es - Spanish
7. it - Italian
8. pt - Portuguese
9. nl - Dutch
10. pl - Polish
11. hu - Hungarian
12. ro - Romanian
13. bg - Bulgarian
14. hr - Croatian
15. sl - Slovenian
16. sr - Serbian
17. uk - Ukrainian
18. ru - Russian
19. el - Greek
20. tr - Turkish
21. ar - Arabic
22. hi - Hindi
23. ja - Japanese
24. ko - Korean
25. zh - Chinese
26. th - Thai
27. vi - Vietnamese
28. id - Indonesian
29. sv - Swedish
30. da - Danish
31. fi - Finnish
32. no - Norwegian
33. bn - Bengali

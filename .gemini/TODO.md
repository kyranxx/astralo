# Astralo TODO - Next Chat

## 🎯 PRIORITY: Consolidate Page Architecture

### Problem
Currently there are duplicate pages for English vs other languages:
- `/index.astro` (English, hardcoded) vs `/[lang]/index.astro` (other langs, uses translations)
- `/form/[type].astro` (English, hardcoded) vs `/[lang]/form/[type].astro` (other langs, uses translations)

This causes:
1. ❌ Changes in one don't appear in the other
2. ❌ 2x maintenance work
3. ❌ Features get out of sync (e.g., "What's included" section was missing in Turkish)

### Solution
Consolidate to **single files** that handle ALL languages (like success.astro now does):

1. **Delete** `/form/[type].astro` and update `/[lang]/form/[type].astro` to:
   - Include 'en' in getStaticPaths()
   - Handle English at `/en/form/[type]` instead of `/form/[type]`
   
2. **Delete** `/index.astro` and update `/[lang]/index.astro` to:
   - Include 'en' in getStaticPaths()
   - Handle English at `/en/` or redirect `/` to `/en/`

3. **Update redirects/links** throughout the app to use the new paths

### Files to Modify
- `src/pages/[lang]/index.astro` - Add 'en' to getStaticPaths, sync all features
- `src/pages/[lang]/form/[type].astro` - Add 'en' to getStaticPaths
- `src/pages/index.astro` - DELETE or redirect to /en/
- `src/pages/form/[type].astro` - DELETE
- `src/components/Footer.astro` - Update legal links
- `src/components/LanguageSwitcher.astro` - Update paths
- Check all internal links

### Reference: How success.astro works now
```typescript
// Reads lang from URL params
const langParam = Astro.url.searchParams.get('lang') || 'en';
const currentLang = (isValidLocale(langParam) ? langParam : 'en') as SupportedLocale;
const t = getTranslations(currentLang);
```

### What was fixed this session
- ✅ Success page now uses translations (single file, all languages)
- ✅ Checkout passes lang to success URL
- ✅ Form page [lang] version now has "What's included" section
- ✅ All 33 locales have form.description and benefits
- ✅ Footer cleaned up (no Slovakia text, no email)
- ✅ Hero features line removed
- ✅ PDF font fetching fixed
- ✅ Contact page imports fixed

---

## Languages Count
- **33 total** (English + 32 others)
- Files: `src/locales/*.ts` (excluding types.ts and index.ts)

## Notes
- Legal pages in English are fine (only Slovakia needs Slovak first)
- Success page has inline translations for 10 languages, fallback to English for others

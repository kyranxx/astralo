# Astralo TODO - Completed

## ✅ COMPLETED: Consolidated Page Architecture (December 5, 2024)

### What Was Done

1. **Updated `/[lang]/index.astro`** 
   - Removed `.filter(l => l !== 'en')` from `getStaticPaths()`
   - English now lives at `/en/` instead of root `/`

2. **Updated `/[lang]/form/[type].astro`**
   - Removed `.filter(l => l !== 'en')` 
   - English forms now at `/en/form/[type]`

3. **Converted `/index.astro` to redirect**
   - Root `/` now 301 redirects to `/en/`

4. **Deleted duplicate files**
   - `/form/[type].astro` - deleted (was English-only duplicate)
   - `/form.astro` - deleted (was old Slovak-only form)

5. **Updated `LanguageSwitcher.astro`**
   - Changed `code === 'en' ? '/' : ...` to just `/${code}/`
   - All languages now use consistent URL structure

6. **Updated `Footer.astro`**
   - Logo links to `/${lang}/` dynamically
   - Legal paths use `/${lang}/legal` for all languages

7. **Created legal page redirects**
   - Added `/[lang]/legal/terms.astro` → redirects to `/legal/terms`
   - Added `/[lang]/legal/privacy.astro` → redirects to `/legal/privacy`
   - Added `/[lang]/legal/refund.astro` → redirects to `/legal/refund`
   - Added `/[lang]/legal/cookies.astro` → redirects to `/legal/cookies`
   - Added `/[lang]/legal/contact.astro` → redirects to `/legal/contact`

8. **Updated legal pages**
   - All `href="/"` links changed to `href="/en/"`

9. **Updated admin page**
   - Back link changed to `/en/`

### Benefits

- ✅ Single source of truth for each page type
- ✅ Changes automatically apply to ALL languages
- ✅ No more sync issues between English and other languages
- ✅ Consistent URL structure: `/{lang}/...`
- ✅ Build verified: all pages compile successfully

---

## Languages Count
- **33 total** (English + 32 others)
- Files: `src/locales/*.ts` (excluding types.ts and index.ts)

## Notes
- Legal pages remain in English for all locales (redirected from `/{lang}/legal/*` to `/legal/*`)
- Slovakia may need Slovak legal documents in the future
- Success page has inline translations for 10 languages, fallback to English for others

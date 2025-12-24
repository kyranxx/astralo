# 🚀 ASTRALO MASTER SEO ACTION PLAN
**Created: December 24, 2024**

---

## ✅ COMPLETED TODAY

- [x] Schema structured data (FAQ, Product, Service, WebApplication, Organization)
- [x] robots.txt optimized for AI bots
- [x] noIndex on transactional pages
- [x] Dedicated OG image (1200x630px)
- [x] Shorter meta title/description
- [x] Localized testimonials (20+ languages)
- [x] Visible FAQ section
- [x] Blog with 6 SEO articles
- [x] Removed LocalBusiness schema
- [x] Removed offers from Organization schema
- [x] Submitted to Google Search Console ✓
- [x] Submitted to Bing Webmaster Tools ✓

---

## 🔴 PRIORITY 1: IMMEDIATE (This Week)

### 1.1 Index Blog Articles in Search Engines

**Google Search Console:**
1. Go to URL Inspection
2. Submit each blog URL:
   - `https://astralo.online/blog/`
   - `https://astralo.online/blog/daily-horoscope-guide`
   - `https://astralo.online/blog/zodiac-compatibility-complete-guide`
   - `https://astralo.online/blog/birth-chart-reading-explained`
   - `https://astralo.online/blog/weekly-horoscope-predictions`
   - `https://astralo.online/blog/monthly-horoscope-january-2025`
   - `https://astralo.online/blog/love-horoscope-relationship-advice`
3. Click "Request Indexing" for each

**Bing Webmaster Tools:**
1. Go to "URL Submission" (Odoslanie URL adresy)
2. Submit the same blog URLs
3. Run "Site Scan" (Kontrola lokality) to find any issues
4. Check "Keyword Research" (Prieskum kľúčových slov) for opportunities

### 1.2 PageSpeed Insights Fixes

Run test: https://pagespeed.web.dev/report?url=https://astralo.online

Common fixes needed:
- [ ] Optimize images (WebP format, lazy loading)
- [ ] Reduce JavaScript bundle size
- [ ] Add `loading="lazy"` to images below the fold
- [ ] Preload critical fonts
- [ ] Add `fetchpriority="high"` to LCP image

### 1.3 Bing Webmaster Tools Actions

| Action | How |
|--------|-----|
| Submit Sitemap | Sitemaps → Submit `https://astralo.online/sitemap-index.xml` |
| Run Site Scan | Kontrola lokality → Start scan |
| Submit URLs | URL Submission → Add all new blog URLs |
| Check SEO Errors | Recommendations → Review all suggestions |
| Keyword Research | See what Bing suggests for your niche |

---

## 🟠 PRIORITY 2: MULTI-LANGUAGE EXPANSION (Next 2 Weeks)

### 2.1 Languages to Localize Blog For

| Priority | Languages | Market |
|----------|-----------|--------|
| **High** | DE, FR, ES, IT, PT | Western Europe + LATAM |
| **Medium** | NL, PL, CS, SK, SV | Central/Nordic Europe |
| **Lower** | DA, NO, FI, HU, RO | Nordic + Eastern |
| **Optional** | RU, JA, KO, ZH | Asia + Russia |

### 2.2 Localized Blog Structure

```
/blog/                      # English blog index
/de/blog/                   # German blog index
/fr/blog/                   # French blog index
/es/blog/                   # Spanish blog index
... (for each language)
```

### 2.3 Country-Specific Keywords to Target

| Country | Primary Keywords |
|---------|------------------|
| 🇩🇪 **Germany** | "Tageshoroskop", "Horoskop heute", "Sternzeichen Kompatibilität" |
| 🇫🇷 **France** | "Horoscope du jour", "Horoscope gratuit", "Compatibilité astrologique" |
| 🇪🇸 **Spain** | "Horóscopo diario", "Horóscopo hoy", "Compatibilidad signos" |
| 🇮🇹 **Italy** | "Oroscopo di oggi", "Oroscopo del giorno", "Affinità segni zodiacali" |
| 🇵🇹 **Portugal/Brazil** | "Horóscopo do dia", "Signos compatíveis", "Previsões astrológicas" |
| 🇳🇱 **Netherlands** | "Daghoroscoop", "Horoscoop vandaag", "Sterrenbeeld compatibiliteit" |
| 🇵🇱 **Poland** | "Horoskop dzienny", "Horoskop na dziś", "Kompatybilność znaków" |
| 🇨🇿 **Czech** | "Denní horoskop", "Horoskop dnes", "Kompatibilita znamení" |
| 🇸🇰 **Slovakia** | "Denný horoskop", "Horoskop dnes", "Kompatibilita znamení" |
| 🇸🇪 **Sweden** | "Dagens horoskop", "Horoskop idag", "Stjärntecken kompatibilitet" |
| 🇩🇰 **Denmark** | "Dagligt horoskop", "Horoskop i dag", "Stjernetegn kompatibilitet" |
| 🇳🇴 **Norway** | "Dagens horoskop", "Horoskop i dag", "Stjernetegn kompatibilitet" |
| 🇫🇮 **Finland** | "Päivän horoskooppi", "Horoskooppi tänään", "Horoskooppien yhteensopivuus" |
| 🇷🇺 **Russia** | "Гороскоп на сегодня", "Ежедневный гороскоп", "Совместимость знаков" |
| 🇯🇵 **Japan** | "今日の運勢", "毎日の星占い", "星座相性" |
| 🇰🇷 **South Korea** | "오늘의 운세", "별자리 운세", "궁합 테스트" |

### 2.4 FAQ Section - Translate for Each Language

Current FAQ needs translation in all locales with country-specific terms.

---

## 🟡 PRIORITY 3: CONTENT & PERFORMANCE (Ongoing)

### 3.1 Blog Content Improvements

- [ ] Add emojis to blog titles (⭐, 🌙, ❤️, 🔮)
- [ ] Add zodiac sign images/icons to articles
- [ ] Add "Quick Summary" boxes at start of articles
- [ ] Add "Key Takeaways" at end of articles
- [ ] Add internal links to products
- [ ] Add social share buttons

### 3.2 Additional Blog Articles to Create

| Article | Target Keywords |
|---------|-----------------|
| "Mercury Retrograde 2025 Guide" | mercury retrograde, retrograde meaning |
| "Full Moon Calendar 2025" | full moon 2025, moon phases |
| "Sun Sign vs Rising Sign" | rising sign meaning, ascendant |
| "12 Zodiac Signs Explained" | zodiac signs, all signs, astrology basics |
| "Chinese Zodiac 2025" | chinese new year, year of the snake |

### 3.3 PageSpeed Optimizations

| Issue | Solution |
|-------|----------|
| Large images | Convert to WebP, resize to max 1200px |
| Render-blocking JS | Add `defer` attribute |
| Unused CSS | Use PurgeCSS in production |
| Font loading | Add `font-display: swap` |
| Third-party scripts | Lazy load non-critical scripts |

---

## 🔵 PRIORITY 4: ADVANCED SEO (Month 2)

### 4.1 Additional Search Engines to Submit

| Search Engine | URL | Market |
|---------------|-----|--------|
| Yandex | https://webmaster.yandex.com | Russia |
| Baidu | https://ziyuan.baidu.com | China |
| Naver | https://searchadvisor.naver.com | Korea |
| Seznam | https://webmaster.seznam.cz | Czech Rep. |

### 4.2 Backlink Building

- [ ] Submit to astrology directories
- [ ] Guest posts on astrology blogs
- [ ] HARO (Help a Reporter Out) responses
- [ ] Social media profiles with links

### 4.3 Schema Enhancements

- [ ] Add `SpeakableSpecification` for voice search
- [ ] Add `VideoObject` if adding video content
- [ ] Add `HowTo` schema for guides
- [ ] Add `Article` schema to blog posts

---

## 📊 TRACKING & MONITORING

### Weekly Checks
- [ ] Google Search Console: Impressions & clicks
- [ ] Bing Webmaster: Rankings & errors
- [ ] PageSpeed Insights: Performance score
- [ ] Schema Validator: No warnings

### Monthly Checks
- [ ] Rank tracking for target keywords
- [ ] Backlink growth
- [ ] Content performance
- [ ] Competitor analysis

---

## 🛠️ IMPLEMENTATION TIMELINE

| Week | Focus | Tasks |
|------|-------|-------|
| Week 1 | Indexing | Submit all URLs, fix PageSpeed |
| Week 2 | High-Priority Languages | DE, FR, ES, IT, PT blogs |
| Week 3 | Medium-Priority Languages | NL, PL, CS, SK, SV blogs |
| Week 4 | Content Expansion | New blog articles, optimizations |
| Month 2 | Advanced SEO | Backlinks, additional search engines |

---

## 📝 NOTES

### About Multi-Language Blog Expansion:

Creating localized blogs for 30+ languages is a **significant project**. Each language version needs:

1. **Translated blog index page** (`/[lang]/blog/index.astro`)
2. **Translated blog articles** with country-specific keywords
3. **Localized FAQ section** for that language
4. **Native-quality translations** (not machine translated)

**Recommendation**: Start with top 5 markets (DE, FR, ES, IT, PT), then expand.

### About Country-Specific Keywords:

Each country has different:
- Search volume for keywords
- Competitor landscape
- User preferences
- Cultural nuances

Use Google Keyword Planner or Ahrefs set to each country to find the best local keywords.

---

*This plan will help Astralo achieve #1 rankings across all target markets.*

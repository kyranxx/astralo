# Astralo SEO & Indexing Acceleration Guide

## 🚀 After Every Deployment

### 1. Ping Search Engines About Sitemap Update
```bash
curl https://astralo.online/api/ping-sitemap
```

### 2. Submit Key Pages to IndexNow (Bing/Yandex)
```bash
# Submit homepage and all language versions
curl -X POST https://astralo.online/api/indexnow \
  -H "Content-Type: application/json" \
  -d '{"urls": ["https://astralo.online/", "https://astralo.online/sk/", "https://astralo.online/de/", "https://astralo.online/fr/"]}'
```

---

## ⚡ One-Time Setup Required

### 1. IndexNow Key Setup (for Bing/Yandex instant indexing)

1. Generate a key (any random hex string, 32+ chars):
   ```
   openssl rand -hex 16
   ```
   Example: `a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4`

2. Create a file `public/{your-key}.txt` containing just the key

3. Add to Vercel Environment Variables:
   - Key: `INDEXNOW_KEY`
   - Value: `your-generated-key`

4. Verify at: https://www.bing.com/indexnow

### 2. Google Search Console Actions

1. **Submit Sitemap**:
   - Go to: https://search.google.com/search-console
   - Navigate to: Sitemaps → Add a new sitemap
   - Enter: `sitemap-index.xml`
   - Click Submit

2. **Request Indexing for Key Pages**:
   - Use URL Inspection tool
   - Enter your homepage URL
   - Click "Request Indexing"
   - Repeat for: `/blog/`, `/sk/`, `/de/`, etc.

3. **Verify International Targeting** (if applicable):
   - Go to: Settings → International Targeting
   - Ensure hreflang is detected correctly

### 3. Bing Webmaster Tools

1. Sign up at: https://www.bing.com/webmasters
2. Add your site
3. Submit sitemap: `https://astralo.online/sitemap-index.xml`
4. Enable IndexNow integration

---

## 📊 What's Already Implemented

✅ **Sitemap with SEO signals**:
- `<lastmod>` with W3C datetime
- `<changefreq>` by page type
- `<priority>` by importance

✅ **Hreflang tags** for all 33 languages

✅ **Canonical URLs** on all pages

✅ **Schema.org structured data**:
- WebSite
- Organization
- Product with Reviews
- Service
- FAQ
- BreadcrumbList
- SoftwareApplication

✅ **Internal linking** from homepage to blog

✅ **Clean robots.txt** with sitemap reference

✅ **Ping API endpoints**:
- `/api/ping-sitemap` - Notify Google & Bing
- `/api/indexnow` - Instant Bing/Yandex indexing

---

## 🔄 Ongoing Best Practices

1. **Update lastmod dates** when content actually changes
2. **Add new blog posts** to homepage "Latest Articles"
3. **Build backlinks** from other sites
4. **Share on social media** for social signals
5. **Monitor GSC** for crawl errors and fix them promptly

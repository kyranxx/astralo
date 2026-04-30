// @ts-check
import { defineConfig } from 'astro/config';

import tailwind from "@astrojs/tailwind";
import sitemap, { ChangeFreqEnum } from "@astrojs/sitemap";
import vercel from '@astrojs/vercel';

const monthlyBlogPattern = /\/(?:[a-z]{2}\/)?blog\/monthly-horoscope-([a-z]+)-(\d{4})\/?$/;
const zodiacLandingPattern = /\/(?:[a-z]{2}\/)?horoscope\/(?:daily|weekly|monthly|partner)\/[^/]+\/?$/;
const monthNameToIndex = {
  january: 0,
  february: 1,
  march: 2,
  april: 3,
  may: 4,
  june: 5,
  july: 6,
  august: 7,
  september: 8,
  october: 9,
  november: 10,
  december: 11,
};

function isStaleMonthlyBlogUrl(page) {
  const match = page.match(monthlyBlogPattern);
  if (!match) return false;

  const [, monthName, yearValue] = match;
  const monthIndex = monthNameToIndex[monthName];
  const year = Number(yearValue);

  if (!Number.isInteger(monthIndex) || !Number.isInteger(year)) {
    return false;
  }

  return new Date() >= new Date(year, monthIndex + 1, 1);
}

// https://astro.build/config
export default defineConfig({
  site: 'https://astralo.online',
  integrations: [
    tailwind(),
    sitemap({
      customPages: [
        'https://astralo.online/free-horoscope',
      ],
      i18n: {
        defaultLocale: 'en',
        locales: {
          en: 'en',
          sk: 'sk',
          cs: 'cs',
          de: 'de',
          fr: 'fr',
          es: 'es',
          it: 'it',
          pt: 'pt',
          nl: 'nl',
          pl: 'pl',
          hu: 'hu',
          ro: 'ro',
          bg: 'bg',
          hr: 'hr',
          sl: 'sl',
          sr: 'sr',
          uk: 'uk',
          ru: 'ru',
          el: 'el',
          tr: 'tr',
          ar: 'ar',
          hi: 'hi',
          bn: 'bn',
          th: 'th',
          vi: 'vi',
          id: 'id',
          ja: 'ja',
          ko: 'ko',
          zh: 'zh',
          sv: 'sv',
          da: 'da',
          no: 'no',
          fi: 'fi',
          he: 'he',
        },
      },
      filter: (page) => {
        // Exclude API, admin, success, form pages, and /en/ redirects
        if (page.includes('/api/')) return false;
        if (page.includes('/admin')) return false;
        if (page.includes('/success')) return false;
        if (page.includes('/form/')) return false;
        if (zodiacLandingPattern.test(page)) return false;
        if (isStaleMonthlyBlogUrl(page)) return false;
        // Exclude /en/ pages - they're just 301 redirects to root
        if (page.match(/\/en\//) || page.endsWith('/en')) return false;
        return true;
      },
      serialize(item) {
        // Normalize URL - remove trailing slash for consistency (except homepage)
        let url = item.url;
        if (url !== 'https://astralo.online/' && url.endsWith('/')) {
          url = url.slice(0, -1);
          item.url = url;
        }

        // Determine page type and set appropriate SEO values
        // Homepage - highest priority
        if (url === 'https://astralo.online' || url.match(/\/[a-z]{2}$/)) {
          item.lastmod = new Date().toISOString();
          item.changefreq = ChangeFreqEnum.DAILY;
          item.priority = 1.0;
        }
        // Blog posts - high priority, updated frequently
        else if (url.includes('/blog/') && !url.endsWith('/blog')) {
          item.lastmod = new Date().toISOString();
          item.changefreq = ChangeFreqEnum.DAILY;
          item.priority = 0.9;
        }
        // Blog index
        else if (url.endsWith('/blog')) {
          item.lastmod = new Date().toISOString();
          item.changefreq = ChangeFreqEnum.DAILY;
          item.priority = 0.9;
        }
        // Product landing pages - key commercial URLs
        else if (url.includes('/horoscope/')) {
          item.lastmod = new Date().toISOString();
          item.changefreq = ChangeFreqEnum.WEEKLY;
          item.priority = 0.95;
        }
        // Free lead magnet - key email capture URL
        else if (url.endsWith('/free-horoscope')) {
          item.lastmod = new Date().toISOString();
          item.changefreq = ChangeFreqEnum.WEEKLY;
          item.priority = 0.9;
        }
        // Legal pages - lower priority, rarely change
        else if (url.includes('/legal/')) {
          item.lastmod = new Date().toISOString();
          item.changefreq = ChangeFreqEnum.MONTHLY;
          item.priority = 0.3;
        }
        // Default for other pages
        else {
          item.lastmod = new Date().toISOString();
          item.changefreq = ChangeFreqEnum.WEEKLY;
          item.priority = 0.6;
        }

        return item;
      }
    })
  ],
  output: 'server',
  adapter: vercel(),
  trailingSlash: 'ignore',
  build: {
    format: 'file'
  }
});

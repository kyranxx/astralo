// @ts-check
import { defineConfig } from 'astro/config';

import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  site: 'https://astralo.online',
  integrations: [
    tailwind(),
    sitemap({
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
          item.changefreq = 'daily';
          item.priority = 1.0;
        }
        // Blog posts - high priority, updated weekly
        else if (url.includes('/blog/') && !url.endsWith('/blog')) {
          item.lastmod = new Date().toISOString();
          item.changefreq = 'weekly';
          item.priority = 0.8;
        }
        // Blog index
        else if (url.endsWith('/blog')) {
          item.lastmod = new Date().toISOString();
          item.changefreq = 'daily';
          item.priority = 0.9;
        }
        // Legal pages - lower priority, rarely change
        else if (url.includes('/legal/')) {
          item.lastmod = new Date().toISOString();
          item.changefreq = 'yearly';
          item.priority = 0.3;
        }
        // Default for other pages
        else {
          item.lastmod = new Date().toISOString();
          item.changefreq = 'monthly';
          item.priority = 0.5;
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

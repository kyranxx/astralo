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
      filter: (page) => !page.includes('/api/') && !page.includes('/admin') && !page.includes('/success') && !page.includes('/form/'),
      serialize(item) {
        // Determine page type and set appropriate SEO values
        const url = item.url;

        // Homepage - highest priority
        if (url.endsWith('.online/') || url.match(/\/[a-z]{2}\/$/)) {
          item.lastmod = new Date().toISOString();
          item.changefreq = 'daily';
          item.priority = 1.0;
        }
        // Blog posts - high priority, updated weekly
        else if (url.includes('/blog/') && !url.endsWith('/blog/')) {
          item.lastmod = new Date().toISOString();
          item.changefreq = 'weekly';
          item.priority = 0.8;
        }
        // Blog index
        else if (url.endsWith('/blog/')) {
          item.lastmod = new Date().toISOString();
          item.changefreq = 'daily';
          item.priority = 0.9;
        }
        // Form pages - medium priority
        else if (url.includes('/form/')) {
          item.lastmod = new Date().toISOString();
          item.changefreq = 'monthly';
          item.priority = 0.7;
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

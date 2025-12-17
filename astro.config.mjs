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
      filter: (page) => !page.includes('/api/') && !page.includes('/admin'),
    })
  ],
  output: 'server',
  adapter: vercel(),
  trailingSlash: 'ignore',
  build: {
    format: 'file'
  }
});

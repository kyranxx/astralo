import fs from 'node:fs/promises';
import path from 'node:path';

const SUPPORTED_LOCALES = [
  'en', 'sk', 'cs', 'de', 'fr', 'es', 'it', 'pt', 'nl', 'pl', 'hu', 'ro', 'bg', 'hr', 'sl', 'sr', 'uk',
  'ru', 'el', 'tr', 'ar', 'he', 'hi', 'ja', 'ko', 'zh', 'th', 'vi', 'id', 'sv', 'da', 'fi', 'no', 'bn',
];

const BASE_SIGNS = [
  {
    slug: 'aries',
    emoji: '♈',
    name: 'Aries',
    dateRange: 'March 21 - April 19',
    element: 'Fire',
    ruler: 'Mars',
    focus: 'initiative, courage, and fast decisions',
    summary: 'Aries moves first and learns by doing. This sign benefits from direct guidance, cleaner priorities, and timing that rewards action.',
    traits: ['bold starts', 'competitive energy', 'quick recovery'],
  },
  {
    slug: 'taurus',
    emoji: '♉',
    name: 'Taurus',
    dateRange: 'April 20 - May 20',
    element: 'Earth',
    ruler: 'Venus',
    focus: 'stability, money, and long-term consistency',
    summary: 'Taurus builds slowly and values what lasts. This sign responds well to grounded insight around security, routine, and relationships.',
    traits: ['steady growth', 'sensory intelligence', 'loyal instincts'],
  },
  {
    slug: 'gemini',
    emoji: '♊',
    name: 'Gemini',
    dateRange: 'May 21 - June 20',
    element: 'Air',
    ruler: 'Mercury',
    focus: 'communication, options, and mental clarity',
    summary: 'Gemini needs direction more than more information. The right reading helps this sign simplify choices and convert ideas into momentum.',
    traits: ['sharp curiosity', 'social range', 'fast pattern recognition'],
  },
  {
    slug: 'cancer',
    emoji: '♋',
    name: 'Cancer',
    dateRange: 'June 21 - July 22',
    element: 'Water',
    ruler: 'Moon',
    focus: 'emotional safety, home, and timing',
    summary: 'Cancer feels everything early. Personalized timing helps this sign protect energy, read relationship shifts, and choose from a calmer place.',
    traits: ['protective loyalty', 'strong intuition', 'deep memory'],
  },
  {
    slug: 'leo',
    emoji: '♌',
    name: 'Leo',
    dateRange: 'July 23 - August 22',
    element: 'Fire',
    ruler: 'Sun',
    focus: 'visibility, confidence, and self-expression',
    summary: 'Leo thrives when purpose and recognition align. A focused reading helps this sign channel attention into better love, work, and creative decisions.',
    traits: ['magnetic presence', 'creative courage', 'warm leadership'],
  },
  {
    slug: 'virgo',
    emoji: '♍',
    name: 'Virgo',
    dateRange: 'August 23 - September 22',
    element: 'Earth',
    ruler: 'Mercury',
    focus: 'improvement, health, and practical systems',
    summary: 'Virgo does best with specifics. This sign benefits from readings that cut through noise, organize next steps, and reduce uncertainty.',
    traits: ['precise thinking', 'service mindset', 'process discipline'],
  },
  {
    slug: 'libra',
    emoji: '♎',
    name: 'Libra',
    dateRange: 'September 23 - October 22',
    element: 'Air',
    ruler: 'Venus',
    focus: 'relationships, balance, and cleaner choices',
    summary: 'Libra often sees every side at once. Personal insight helps this sign replace indecision with clarity, especially in love and partnership.',
    traits: ['social grace', 'aesthetic sense', 'diplomatic instinct'],
  },
  {
    slug: 'scorpio',
    emoji: '♏',
    name: 'Scorpio',
    dateRange: 'October 23 - November 21',
    element: 'Water',
    ruler: 'Pluto and Mars',
    focus: 'intensity, trust, and strategic timing',
    summary: 'Scorpio prefers depth over noise. A stronger reading helps this sign understand power dynamics, emotional patterns, and moments that truly matter.',
    traits: ['emotional depth', 'strategic patience', 'transformational drive'],
  },
  {
    slug: 'sagittarius',
    emoji: '♐',
    name: 'Sagittarius',
    dateRange: 'November 22 - December 21',
    element: 'Fire',
    ruler: 'Jupiter',
    focus: 'growth, freedom, and future direction',
    summary: 'Sagittarius needs a target worth moving toward. Personalized guidance helps this sign aim high without scattering energy across too many paths.',
    traits: ['big vision', 'optimistic motion', 'truth seeking'],
  },
  {
    slug: 'capricorn',
    emoji: '♑',
    name: 'Capricorn',
    dateRange: 'December 22 - January 19',
    element: 'Earth',
    ruler: 'Saturn',
    focus: 'discipline, ambition, and durable progress',
    summary: 'Capricorn values results, structure, and timing. A precise reading helps this sign protect effort, prioritize better, and build with more control.',
    traits: ['executive focus', 'resilience', 'long-term ambition'],
  },
  {
    slug: 'aquarius',
    emoji: '♒',
    name: 'Aquarius',
    dateRange: 'January 20 - February 18',
    element: 'Air',
    ruler: 'Uranus and Saturn',
    focus: 'innovation, independence, and perspective',
    summary: 'Aquarius sees patterns that others miss. The right reading helps this sign turn originality into practical action and stronger timing.',
    traits: ['future thinking', 'independent mind', 'community vision'],
  },
  {
    slug: 'pisces',
    emoji: '♓',
    name: 'Pisces',
    dateRange: 'February 19 - March 20',
    element: 'Water',
    ruler: 'Neptune and Jupiter',
    focus: 'intuition, emotional boundaries, and meaning',
    summary: 'Pisces absorbs subtle shifts quickly. Personalized astrology helps this sign separate intuition from overwhelm and act on what is real.',
    traits: ['spiritual sensitivity', 'imagination', 'compassionate insight'],
  },
];

const BASE_UI = {
  eyebrow: '{{SIGN}} astrology reading',
  intro: 'Get a personalized {{PRODUCT_LOWER}} designed for {{SIGN}}. Use your birth data to understand timing, love, work, money, and emotional patterns with more precision.',
  snapshotTitle: '{{SIGN}} snapshot',
  whyFitsTitle: 'Why {{PRODUCT}} works for {{SIGN}}',
  whyFitsDescription: '{{SIGN}} often benefits from clarity around {{FOCUS}}. A personalized reading shows how that energy lands in your real birth chart instead of relying on a generic Sun-sign forecast.',
  traitsTitle: 'Core strengths of {{SIGN}}',
  dateRangeLabel: 'Date range',
  elementLabel: 'Element',
  rulerLabel: 'Ruling planet',
  focusLabel: 'Current focus',
  ctaTitle: 'Get your personal {{SIGN}} reading',
  ctaDescription: 'Astralo uses your date, time, and place of birth to create a more accurate reading than a general horoscope can provide.',
  browseTitle: 'Explore readings for the other zodiac signs',
  browseDescription: 'Compare how each sign approaches timing, love, work, money, and emotional balance.',
  browseItemLabel: '{{PRODUCT}} for {{SIGN}}',
};

const TRANSLATE_URL = 'https://translate.googleapis.com/translate_a/single';

async function translateText(text, locale) {
  if (locale === 'en') {
    return text;
  }

  const params = new URLSearchParams({
    client: 'gtx',
    sl: 'en',
    tl: locale,
    dt: 't',
    q: text,
  });

  const response = await fetch(`${TRANSLATE_URL}?${params.toString()}`);
  if (!response.ok) {
    throw new Error(`Translation failed for ${locale}: ${response.status}`);
  }

  const payload = await response.json();
  return payload[0].map((segment) => segment[0] || '').join('');
}

async function translateList(values, locale) {
  if (locale === 'en') {
    return values;
  }

  const translatedItems = [];

  for (const value of values) {
    translatedItems.push(await translateText(value, locale));
  }

  return translatedItems;
}

function escapeTs(value) {
  return JSON.stringify(value);
}

async function buildLocalePayload(locale) {
  const uiKeys = Object.keys(BASE_UI);
  const uiValues = uiKeys.map((key) => BASE_UI[key]);
  const translatedUiValues = await translateList(uiValues, locale);

  const signFieldMaps = await Promise.all(
    BASE_SIGNS.map(async (sign) => {
      const translatedFields = await translateList(
        [sign.name, sign.dateRange, sign.element, sign.ruler, sign.focus, sign.summary, ...sign.traits],
        locale,
      );

      return {
        slug: sign.slug,
        emoji: sign.emoji,
        name: translatedFields[0],
        dateRange: translatedFields[1],
        element: translatedFields[2],
        ruler: translatedFields[3],
        focus: translatedFields[4],
        summary: translatedFields[5],
        traits: translatedFields.slice(6),
      };
    }),
  );

  const ui = Object.fromEntries(uiKeys.map((key, index) => [key, translatedUiValues[index]]));
  const signs = Object.fromEntries(signFieldMaps.map((sign) => [sign.slug, sign]));

  return { ui, signs };
}

function toTsSource(localesPayload) {
  const localeEntries = Object.entries(localesPayload)
    .map(([locale, payload]) => {
      const signEntries = Object.entries(payload.signs)
        .map(([slug, sign]) => `      ${escapeTs(slug)}: {
        slug: ${escapeTs(sign.slug)},
        emoji: ${escapeTs(sign.emoji)},
        name: ${escapeTs(sign.name)},
        dateRange: ${escapeTs(sign.dateRange)},
        element: ${escapeTs(sign.element)},
        ruler: ${escapeTs(sign.ruler)},
        focus: ${escapeTs(sign.focus)},
        summary: ${escapeTs(sign.summary)},
        traits: [${sign.traits.map((trait) => escapeTs(trait)).join(', ')}],
      }`)
        .join(',\n');

      return `  ${escapeTs(locale)}: {
    ui: {
      eyebrow: ${escapeTs(payload.ui.eyebrow)},
      intro: ${escapeTs(payload.ui.intro)},
      snapshotTitle: ${escapeTs(payload.ui.snapshotTitle)},
      whyFitsTitle: ${escapeTs(payload.ui.whyFitsTitle)},
      whyFitsDescription: ${escapeTs(payload.ui.whyFitsDescription)},
      traitsTitle: ${escapeTs(payload.ui.traitsTitle)},
      dateRangeLabel: ${escapeTs(payload.ui.dateRangeLabel)},
      elementLabel: ${escapeTs(payload.ui.elementLabel)},
      rulerLabel: ${escapeTs(payload.ui.rulerLabel)},
      focusLabel: ${escapeTs(payload.ui.focusLabel)},
      ctaTitle: ${escapeTs(payload.ui.ctaTitle)},
      ctaDescription: ${escapeTs(payload.ui.ctaDescription)},
      browseTitle: ${escapeTs(payload.ui.browseTitle)},
      browseDescription: ${escapeTs(payload.ui.browseDescription)},
      browseItemLabel: ${escapeTs(payload.ui.browseItemLabel)},
    },
    signs: {
${signEntries}
    },
  }`;
    })
    .join(',\n');

  const signSlugs = BASE_SIGNS.map((sign) => escapeTs(sign.slug)).join(', ');

  return `import type { SupportedLocale } from '../locales/types';

export const zodiacSignSlugs = [${signSlugs}] as const;
export type ZodiacSignSlug = (typeof zodiacSignSlugs)[number];

export interface ZodiacSignCopy {
  slug: ZodiacSignSlug;
  emoji: string;
  name: string;
  dateRange: string;
  element: string;
  ruler: string;
  focus: string;
  summary: string;
  traits: string[];
}

export interface ZodiacUiCopy {
  eyebrow: string;
  intro: string;
  snapshotTitle: string;
  whyFitsTitle: string;
  whyFitsDescription: string;
  traitsTitle: string;
  dateRangeLabel: string;
  elementLabel: string;
  rulerLabel: string;
  focusLabel: string;
  ctaTitle: string;
  ctaDescription: string;
  browseTitle: string;
  browseDescription: string;
  browseItemLabel: string;
}

export interface ZodiacLocaleCopy {
  ui: ZodiacUiCopy;
  signs: Record<ZodiacSignSlug, ZodiacSignCopy>;
}

export const zodiacCopy: Record<SupportedLocale, ZodiacLocaleCopy> = {
${localeEntries}
};

export function isValidZodiacSign(sign: string): sign is ZodiacSignSlug {
  return (zodiacSignSlugs as readonly string[]).includes(sign);
}

export function getZodiacLocaleCopy(lang: SupportedLocale): ZodiacLocaleCopy {
  return zodiacCopy[lang] || zodiacCopy.en;
}

export function fillZodiacTemplate(template: string, replacements: Record<string, string>): string {
  return Object.entries(replacements).reduce(
    (result, [token, value]) => result.replaceAll(token, value),
    template,
  );
}
`;
}

async function main() {
  const localesPayload = {};

  for (const locale of SUPPORTED_LOCALES) {
    console.log(`[locale] ${locale}`);
    localesPayload[locale] = await buildLocalePayload(locale);
  }

  const outputPath = path.resolve(process.cwd(), 'src/lib/zodiac.ts');
  await fs.writeFile(outputPath, toTsSource(localesPayload), 'utf8');
  console.log(`Wrote ${outputPath}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

/**
 * Daily Horoscope Guide - All Languages Index
 */

import type { BlogPostTranslation } from '../../types';
import { en } from './en';
import { de } from './de';
import { fr } from './fr';
import { es } from './es';
import { it } from './it';
import { pt } from './pt';
import { nl } from './nl';
import { pl } from './pl';
import { cs } from './cs';
import { sk } from './sk';
import { ru } from './ru';
import { ja } from './ja';
import { ko } from './ko';
import { zh } from './zh';
import { sv } from './sv';
import { da } from './da';
import { no } from './no';
import { fi } from './fi';
import { tr } from './tr';
import { hi } from './hi';

export const dailyHoroscopeGuide: Record<string, BlogPostTranslation> = {
    en, de, fr, es, it, pt, nl, pl, cs, sk, ru, ja, ko, zh, sv, da, no, fi, tr, hi,
};

export function getTranslation(lang: string): BlogPostTranslation {
    return dailyHoroscopeGuide[lang] || dailyHoroscopeGuide.en;
}

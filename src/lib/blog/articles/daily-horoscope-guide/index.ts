/**
 * Daily Horoscope Guide - All 33 Languages Index
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
import { ar } from './ar';
import { hu } from './hu';
import { ro } from './ro';
import { el } from './el';
import { uk } from './uk';
import { he } from './he';
import { bg } from './bg';
import { hr } from './hr';
import { sl } from './sl';
import { sr } from './sr';
import { th } from './th';
import { vi } from './vi';
import { id } from './id';
import { bn } from './bn';

export const dailyHoroscopeGuide: Record<string, BlogPostTranslation> = {
    en, de, fr, es, it, pt, nl, pl, cs, sk, ru, ja, ko, zh,
    sv, da, no, fi, tr, hi, ar, hu, ro, el, uk, he, bg, hr, sl, sr, th, vi, id, bn,
};

export function getTranslation(lang: string): BlogPostTranslation {
    return dailyHoroscopeGuide[lang] || dailyHoroscopeGuide.en;
}

import type { BlogPostTranslation } from '../../types';
import { en } from './en';
import { el } from './el';
import { ru } from './ru';
import { uk } from './uk';
import { ar } from './ar';
import { tr } from './tr';
import { sk } from './sk';
import { cs } from './cs';
import { de } from './de';
import { fr } from './fr';
import { es } from './es';
import { it } from './it';
import { pt } from './pt';
import { nl } from './nl';
import { pl } from './pl';
import { ro } from './ro';
import { hu } from './hu';
import { bg } from './bg';
import { hr } from './hr';
import { sl } from './sl';
import { sr } from './sr';
import { hi } from './hi';
import { bn } from './bn';
import { th } from './th';
import { vi } from './vi';
import { id } from './id';
import { ja } from './ja';
import { ko } from './ko';
import { zh } from './zh';
import { sv } from './sv';
import { da } from './da';
import { no } from './no';
import { fi } from './fi';
import { he } from './he';

export const birthChartReading: Record<string, BlogPostTranslation> = {
    en, el, ru, uk, ar, tr, sk, cs, de, fr, es, it, pt, nl, pl, ro, hu, bg, hr, sl, sr, hi, bn, th, vi, id, ja, ko, zh, sv, da, no, fi, he,
    // Add other languages here as needed
};

export function getTranslation(lang: string): BlogPostTranslation {
    return birthChartReading[lang] || birthChartReading.en;
}

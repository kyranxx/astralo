/**
 * Locale Index - Imports all 33 language translations
 * Each language is in its own file (~50 lines each)
 */

import type { Translations } from './types';
import type { SupportedLocale } from './types';
export type { Translations, SupportedLocale } from './types';

// Import all translations
import en from './en';
import sk from './sk';
import cs from './cs';
import de from './de';
import fr from './fr';
import es from './es';
import it from './it';
import pt from './pt';
import nl from './nl';
import pl from './pl';
import hu from './hu';
import ro from './ro';
import bg from './bg';
import hr from './hr';
import sl from './sl';
import sr from './sr';
import uk from './uk';
import ru from './ru';
import el from './el';
import tr from './tr';
import ar from './ar';
import hi from './hi';
import ja from './ja';
import ko from './ko';
import zh from './zh';
import th from './th';
import vi from './vi';
import id from './id';
import sv from './sv';
import da from './da';
import fi from './fi';
import no from './no';
import bn from './bn';
import he from './he';

// All translations map
export const translations: Record<SupportedLocale, Translations> = {
    en, sk, cs, de, fr, es, it, pt, nl, pl,
    hu, ro, bg, hr, sl, sr, uk, ru, el, tr,
    ar, hi, ja, ko, zh, th, vi, id, sv, da,
    fi, no, bn, he,
};

/**
 * Týdenní horoskop a předpovědi - CS
 */
import type { BlogPostTranslation } from '../../types';

export const cs: BlogPostTranslation = {
  title: '📅 Týdenní horoskop: Jak zvládnout nadcházející vesmírný týden',
  excerpt: 'Maximalizujte svůj týden s naším průvodcem týdenním horoskopem. Pochopte planetární dny, zvládněte Lunu bez kursu a naplánujte si rozvrh podle astrologického načasování.',
  category: 'Horoskopy',
  metaDescription: 'Maximalizujte svůj týden s naším průvodcem týdenním horoskopem. Pochopte planetární dny, zvládněte Lunu bez kursu a naplánujte si rozvrh.',
  keywords: 'týdenní horoskop, týdenní astrologie, planetární dny, luna bez kursu, týdenní předpověď, plánování podle astrologie, nejlepší dny v týdnu',
  quickSummary: [
    'Každý den v týdnu je ovládán jinou planetou (Pondělí/Měsíc, Úterý/Mars atd.)',
    'Týdenní horoskopy sledují pohyb rychlejších planet skrze znamení zvěrokruhu',
    'Luna bez kursu (Void-of-Course) je kritický čas pro pauzu, kdy by se neměly dělat zásadní kroky',
    'Pondělí jsou pro emoce, úterky pro akci, pátky pro romanci'
  ],
  keyTakeaways: [
    'V neděli večer si zkontrolujte týdenní předpověď a naplánujte si kalendář',
    'Náročná jednání plánujte na čtvrtek (Jupiter) nebo sobotu (Saturn) podle cíle',
    'Vyhněte se podepisování smluv, když je Luna bez kursu',
    'Využívejte týdenní tok energie, místo abyste s ním bojovali'
  ],
  tableOfContents: [
    { id: 'weekly-flow', title: 'Astrologický rytmus' },
    { id: 'planetary-days', title: 'Vládci dnů' },
    { id: 'void-moon', title: 'Luna bez kursu' },
    { id: 'transits', title: 'Sledování týdenních tranzitů' },
    { id: 'by-sign', title: 'Týdenní rady podle znamení' }
  ],
  content: `
      <h2 id="weekly-flow">Astrologický rytmus týdne</h2>
      <p>Máte někdy pocit, že některé týdny plynou jako po másle, zatímco jiné jsou jako brodění se bahnem? Nebo proč se v úterý cítíte úplně jinak než v pátek? To není náhoda. Struktura našeho sedmidenního týdne je ve skutečnosti založena výhradně na <strong>astrologii</strong>.</p>
      
      <p>Pochopení <strong>týdenního horoskopu</strong> je o něčem víc než jen o vědění, zda vám přijde zpráva. Jde o sladění vašeho rozvrhu s pradávnými planetárními vládci času. Když pracujete <em>v souladu</em> s energií dne, vaše produktivita stoupá a odpor mizí.</p>

      <h2 id="planetary-days">Vládci dnů</h2>
      <p>Každý den je pojmenován po planetě (v mnoha jazycích doslova). Zde je váš průvodce pro astrologické plánování týdne:</p>
      
      <h3>Pondělí (Den Měsíce) 🌙</h3>
      <p><strong>Energie:</strong> Emocionální, intuitivní, kolísavá.<br><strong>Nejlepší pro:</strong> Nákupy potravin, úklid domu, delší spánek, rodinné večeře, reflexi.<br><strong>Vyhněte se:</strong> Prezentacím pod vysokým tlakem nebo přísné logice.</p>

      <h3>Úterý (Den Marsu) ♂</h3>
      <p><strong>Energie:</strong> Agresivní, energická, ostrá.<br><strong>Nejlepší pro:</strong> Cvičení, zahajování nových projektů, řešení konfliktů, soutěžení.<br><strong>Vyhněte se:</strong> Meditaci a snaze o absolutní klid.</p>
      
      <h3>Středa (Den Merkuru) ☿️</h3>
      <p><strong>Energie:</strong> Komunikativní, rušná, rychlá.<br><strong>Nejlepší pro:</strong> E-maily, schůzky, psaní, prodej, krátké výlety, networking.<br><strong>Vyhněte se:</strong> Tichu (stejně se k němu nedostanete).</p>
      
      <h3>Čtvrtek (Den Jupiteru) ♃</h3>
      <p><strong>Energie:</strong> Expanzivní, šťastná, optimistická.<br><strong>Nejlepší pro:</strong> Zahajování velkých vizí, žádost o zvýšení platu, plánování cest, studium.<br><strong>Vyhněte se:</strong> Přílišnému šetření na nesprávných místech.</p>
      
      <h3>Pátek (Den Venuše) ♀</h3>
      <p><strong>Energie:</strong> Sociální, romantická, estetická.<br><strong>Nejlepší pro:</strong> Rande, večírky, nákupy oblečení, umění, relaxaci.<br><strong>Vyhněte se:</strong> Nepříjemné špinavé práci nebo samotě.</p>
      
      <h3>Sobota (Den Saturnu) ♄</h3>
      <p><strong>Energie:</strong> Vážná, těžká, disciplinovaná.<br><strong>Nejlepší pro:</strong> Práci na zahradě, dlouhodobé plánování, studium, dohánění povinností.<br><strong>Vyhněte se:</strong> Divokým večírkům (pokud nejde o formální události).</p>
      
      <h3>Neděle (Den Slunce) ☀️</h3>
      <p><strong>Energie:</strong> Zářivá, ego-centrická, duchovní.<br><strong>Nejlepší pro:</strong> Koníčky, duchovno, hru s dětmi, odpočinek, budování sebevědomí.<br><strong>Vyhněte se:</strong> Přílišné izolaci.</p>

      <h2 id="void-moon">Luna bez kursu (Void-of-Course)</h2>
      <p>Pokud si z tohoto průvodce máte vzít jednu věc, ať je to <strong>Luna bez kursu</strong>. Nastává v době, kdy Luna dokončí svůj poslední aspekt k planetě ve svém současném znamení a „vznáší se“, než vstoupí do znamení dalšího.</p>
      <p><strong>Pravidlo:</strong> „Z věci nic nevzejde.“</p>
      <p>Během Luny bez kursu nepodepisujte smlouvy, nezakládejte firmy ani neposílejte pozvání na první rande. Energie nevyhnutelně vyšumí. Využijte tento čas pro administrativu, spánek nebo úpravu již rozdělané práce.</p>

      <h2 id="transits">Sledování týdenních tranzitů</h2>
      <p>Dobrý <strong>týdenní astrologický výhled</strong> sleduje také specifické úhly, které planety tento týden svírají. Například:</p>
      <ul>
        <li><strong>Merkur v sextilu s Venuší:</strong> Ideální týden pro společenský šarm a žádosti o laskavosti.</li>
        <li><strong>Slunce v kvadrátu s Plutem:</strong> Týden mocenských bojů a intenzity.</li>
        <li><strong>Mars vstupuje do Vah:</strong> Energie se přesouvá ze zaměření na práci k zaměření na vztahy.</li>
      </ul>

      <p><em>Vraťte se každou neděli pro svůj konkrétní týdenní výhled aktualizovaný týmem Astralo!</em>
    `
};

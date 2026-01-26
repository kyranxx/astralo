/**
 * Týždenný horoskop - SK
 */
import type { BlogPostTranslation } from '../../types';

export const sk: BlogPostTranslation = {
  title: '📅 Týždenný horoskop: Ako sa orientovať v nadchádzajúcom vesmírnom týždni',
  excerpt: 'Maximalizujte svoj týždeň s naším sprievodcom týždenným horoskopom. Pochopte planetárne dni, orientujte sa v čase "Void-of-Course" mesiaca a naplánujte si rozvrh podľa astrologického načasovania.',
  category: 'Horoskopy',
  metaDescription: 'Maximalizujte svoj týždeň s naším sprievodcom týždenným horoskopom. Pochopte planetárne dni, orientujte sa v čase "Void-of-Course" mesiaca a naplánujte si rozvrh podľa astrologického načasovania.',
  keywords: 'týždenný horoskop, týždenná astrológia, planetárne dni, prázdny mesiac, týždenná predpoveď zverokruhu, plánovanie astrológie, najlepšie dni tento týždeň',
  quickSummary: [
    'Každý deň v týždni ovláda iná planéta (Pondelok/Mesiac, Utorok/Mars, atď.)',
    'Týždenné horoskopy sledujú pohyb rýchlejších planét cez znamenia zverokruhu',
    'Mesiac bez kurzu (Void-of-Course) je kritický "čas na pauzu", kedy by sa nemali vykonávať dôležité kroky',
    'Pondelky sú pre emócie, utorky pre akciu, piatky pre romantiku'
  ],
  keyTakeaways: [
    'V nedeľu večer si pozrite týždennú predpoveď, aby ste si naplánovali kalendár',
    'Naplánujte si náročné stretnutia na štvrtok (Jupiter) alebo sobotu (Saturn) v závislosti od cieľa',
    'Vyhnite sa podpisovaniu zmlúv, keď je Mesiac "Void"',
    'Využívajte týždenný tok energie, namiesto toho, aby ste proti nemu bojovali'
  ],
  tableOfContents: [
    { id: 'weekly-flow', title: 'Astrologický rytmus' },
    { id: 'planetary-days', title: 'Vládcovia dní' },
    { id: 'void-moon', title: 'Mesiac bez kurzu (Void-of-Course)' },
    { id: 'transits', title: 'Sledovanie týždenných tranzitov' },
    { id: 'by-sign', title: 'Týždenné rady podľa znamení' }
  ],
  content: `
      <h2 id="weekly-flow">Astrologický rytmus týždňa</h2>
      <p>Máte niekedy pocit, že niektoré týždne plynú ako voda, zatiaľ čo iné sú ako brodenie sa blatom? Alebo prečo je pocit z práce v utorok iný ako v piatok? Toto nie je náhoda. Štruktúra nášho 7-dňového týždňa je v skutočnosti založená výlučne na <strong>astrológii</strong>.</p>
      
      <p>Pochopenie <strong>týždenného horoskopu</strong> je o niečom viac, než len vedieť, či vám niekto odpíše na správu. Ide o zosúladenie vášho rozvrhu s antickými planetárnymi vládcami času. Keď pracujete <em>s</em> energiou dňa, produktivita sa zvyšuje a odpor mizne.</p>

      <h2 id="planetary-days">Vládcovia dní</h2>
      <p>Každý deň je pomenovaný po planéte (doslova v jazykoch ako francúzština alebo španielčina). Tu je váš sprievodca astrologickým plánovaním týždňa:</p>
      
      <h3>Pondelok (Deň Mesiaca) 🌙</h3>
      <p><strong>Energia:</strong> Emocionálna, intuitívna, kolísavá.<br><strong>Najlepšie pre:</strong> Nákup potravín, upratovanie domu, dlhší spánok, rodinné večere, reflexiu.<br><strong>Vyhnite sa:</strong> Vysoko stresovým prezentáciám alebo rigidnej logike.</p>

      <h3>Utorok (Deň Marsu) ♂</h3>
      <p><strong>Energia:</strong> Agresívna, energická, ostrá.<br><strong>Najlepšie pre:</strong> Cvičenie, začínanie nových projektov, riešenie problémov, zákroky, súťaženie.<br><strong>Vyhnite sa:</strong> Meditácii, snahe o úplný kľud.</p>
      
      <h3>Streda (Deň Merkúra) ☿️</h3>
      <p><strong>Energia:</strong> Komunikatívna, zaneprázdnená, rýchla.<br><strong>Najlepšie pre:</strong> E-maily, stretnutia, písanie, predaj, krátke výlety, networking.<br><strong>Vyhnite sa:</strong> Tichu (aj tak k nemu pravdepodobne nedôjde).</p>
      
      <h3>Štvrtok (Deň Jupitera) ♃</h3>
      <p><strong>Energia:</strong> Expanzívna, šťastná, optimistická.<br><strong>Najlepšie pre:</strong> Spúšťanie veľkých vízií, žiadanie o zvýšenie platu, plánovanie ciest, vyššie vzdelávanie.<br><strong>Vyhnite sa:</strong> Šetreniu každého centu.</p>
      
      <h3>Piatok (Deň Venuše) ♀</h3>
      <p><strong>Energia:</strong> Sociálna, romantická, estetická.<br><strong>Najlepšie pre:</strong> Rande, oslavy, nákup oblečenia, umenie, relax, happy hour.<br><strong>Vyhnite sa:</strong> Špinavej práci alebo samote.</p>
      
      <h3>Sobota (Deň Saturna) ♄</h3>
      <p><strong>Energia:</strong> Vážna, ťažká, disciplinovaná.<br><strong>Najlepšie pre:</strong> Prácu v záhrade, dlhodobé plánovanie, štúdium, doháňanie restov, povinnosti.<br><strong>Vyhnite sa:</strong> Divokým párty (pokiaľ nie sú formálne).</p>
      
      <h3>Nedeľa (Deň Slnka) ☀️</h3>
      <p><strong>Energia:</strong> Žiarivá, zameraná na ego, duchovná.<br><strong>Najlepšie pre:</strong> Hobby, duchovné aktivity, hru s deťmi, prezentáciu seba, odpočinok.<br><strong>Vyhnite sa:</strong> Tomu, aby ste boli neviditeľní.</p>

      <h2 id="void-moon">Mesiac bez kurzu (Void-of-Course)</h2>
      <p>Ak si z tohto sprievodcu vezmete len jednu vec, nech je to <strong>Mesiac bez kurzu (Void-of-Course)</strong>. Nastáva vtedy, keď Mesiac dokončí svoj posledný aspekt k planéte vo svojom aktuálnom znamení a "vznáša sa" pred vstupom do ďalšieho znamenia.</p>
      <p><strong>Pravidlo:</strong> "Z danej záležitosti nič nevzíde."</p>
      <p>Počas "prázdneho" Mesiaca nepodpisujte zmluvy, nespúšťajte podnikanie ani neposielajte žiadosti o prvé rande. Energia nevyhnutne vyprchá. Tento čas využite na archiváciu, spánok alebo úpravu práce, ktorú ste už začali. Je to vesmírny "oddychový čas".</p>

      <h2 id="transits">Sledovanie týždenných tranzitov</h2>
      <p>Dobrý <strong>týždenný astrologický výhľad</strong> sleduje aj špecifické uhly, ktoré planéty tento týždeň zvierajú. Napríklad:</p>
      <ul>
        <li><strong>Merkúr v sextile s Venušou:</strong> Ideálny týždeň pre sociálnu gráciu a žiadanie o láskavosti.</li>
        <li><strong>Slnko v kvadráte s Plutom:</strong> Týždeň mocenských bojov a intenzity.</li>
        <li><strong>Mars vstupuje do Váh:</strong> Energia sa mení z orientácie na prácu na orientáciu na vzťahy.</li>
      </ul>

      <h2 id="by-sign">Týždenné rady podľa šablón</h2>
      <p>Hoci je týždeň každého z nás jedinečný, tu je spôsob, akým znamenia zvyčajne zvládajú týždenné posuny:</p>
      <ul>
        <li><strong>Kardinálne znamenia (Baran, Rak, Váhy, Kozorožec):</strong> Vy ste iniciátori. Využite energiu začiatku týždňa (Po/Ut) na rozbehnutie vecí.</li>
        <li><strong>Fixné znamenia (Býk, Lev, Škorpión, Vodnár):</strong> Vy ste tí, ktorí veci udržiavajú. Použite energiu stredu týždňa na upevnenie pokroku.</li>
        <li><strong>Pohyblivé znamenia (Blíženci, Panna, Strelec, Ryby):</strong> Vy ste editori. Využite víkend alebo dni Merkúra na prispôsobenie sa a zmenu kurzu.</li>
      </ul>
      
      <p><em>Vráťte sa každú nedeľu pre vašu konkrétnu týždennú predpoveď aktualizovanú tímom Astralo!</em>
    `
};

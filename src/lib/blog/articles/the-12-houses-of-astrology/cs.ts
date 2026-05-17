/**
 * the-12-houses-of-astrology - CS
 */
import type { BlogPostTranslation } from '../../types';

export const cs: BlogPostTranslation = {
  title: "🏠 12 domů v astrologii: systém domů Placidus a význam každého domu",
  excerpt: "Objevte skrytou mapu svého života. Hloubkový vhled do 12 domů astrologie, který vysvětluje, kde se projevuje vaše planetární energie a jak ovládnout svůj osud.",
  category: "Základy astrologie",
  metaDescription: "Kompletní průvodce 12 domy astrologie: systém domů Placidus, Whole Sign, 1. dům, 11. dům a význam každého domu v horoskopu.",
  keywords: "systém domů placidus, systém domů, 12 domů astrologie, astrologie domy, 1 dům astrologie, 11 dům v astrologii, interpretace horoskopu, úhlové domy, vládci domů",
  quickSummary: [
    "12 domů představuje „KDE“ se váš život odehrává – specifické sféry jako kariéra, domov a vztahy.",
    "Domy se dělí na úhlové, následné a upadající, přičemž každý má jinou úroveň síly.",
    "Ascendent označuje začátek 1. domu a určuje strukturu celého horoskopu.",
    "Prázdné domy neznamenají, že daná oblast života „chybí“ – stále jim vládne konkrétní planeta."
  ],
  keyTakeaways: [
    "Úhlové domy (1, 4, 7, 10) jsou ve vašem životě nejaktivnější a nejviditelnější.",
    "Vládce domu (planeta, která vládne znamení na hrotu domu) poskytuje klíč k dané oblasti života.",
    "Čtyři hlavní body (AC, IC, DC, MC) definují kříž vašeho životního účelu.",
    "Porozumění domům je nezbytné pro přesné načasování a předpovědi v astrologii."
  ],
  tableOfContents: [
    { id: 'introduction', title: "Scéna: Proč na domech záleží" },
    { id: 'house-systems', title: "Systémy domů: Placidus vs. Whole Sign" },
    { id: 'angular-succedent-cadent', title: "Tři modality: Síla a načasování" },
    { id: 'the-first-house', title: "1. dům: Dům já (Identita)" },
    { id: 'the-second-house', title: "2. dům: Dům hodnot (Bohatství)" },
    { id: 'the-third-house', title: "3. dům: Dům komunikace" },
    { id: 'the-fourth-house', title: "4. dům: Dům domova (Kořeny)" },
    { id: 'the-fifth-house', title: "5. dům: Dům radosti" },
    { id: 'the-sixth-house', title: "6. dům: Dům služby" },
    { id: 'the-seventh-house', title: "7. dům: Dům partnerství" },
    { id: 'the-eighth-house', title: "8. dům: Dům transformace" },
    { id: 'the-ninth-house', title: "9. dům: Dům moudrosti" },
    { id: 'the-tenth-house', title: "10. dům: Dům účelu" },
    { id: 'the-eleventh-house', title: "11. dům: Dům komunity" },
    { id: 'the-twelfth-house', title: "12. dům: Dům nevědomí" },
    { id: 'planetary-placements', title: "Hlavní planety v domech" },
    { id: 'stelliums', title: "Co je to stellium v domě?" },
    { id: 'empty-houses', title: "Co když je dům prázdný? Síla vládců" },
    { id: 'retrograde', title: "Retrográdní planety v domech" },
    { id: 'derived-houses', title: "Pokročilá technika: Odvozené domy" },
    { id: 'progressions', title: "Progresivní domy: Jak se vyvíjejí životní cykly" },
    { id: 'conclusion', title: "Integrace vaší mapy" }
  ],
  content: `
      <h2 id="introduction">Scéna: Proč na domech záleží</h2>
      <p>Pokud jste se někdy podívali na svůj rodný horoskop a cítili se zahlceni čarami, symboly a geometrickými tvary, nejste v tom sami. Astrologie je jazyk o třech hlavních složkách: znamení, planety a domy. Zatímco <strong>planety</strong> představují „herce“ (co se děje) a <strong>znamení</strong> představují „kostýmy“ (jak se to děje), <strong>12 domů astrologie</strong> představuje „scénu“ (kde se to děje).</p>
      
      <p>Představte si svůj život jako divadelní hru. Mars může být hercem – plným energie a dravosti. Pokud má na sobě „kostým“ Berana, je rychlý, impulzivní a odvážný. Ale kde hraje? Pokud je v 10. domě kariéry, je to dravý podnikatel. Pokud je ve 4. domě domova, může to být někdo, kdo věnuje energii opravám domu nebo zažívá konflikty v rodině. Bez domů je astrologie čistě psychologická; s domy se stává praktickou a předpovídající.</p>

      <p>V tomto kompletním průvodci prozkoumáme každý kout těchto dvanácti životních sfér a pomůžeme vám pochopit, jak číst svůj vlastní horoskop jako profesionální astrolog. Ať už vás zajímá vaše finanční budoucnost, romantický potenciál nebo skrytý účel vaší duše, domy drží klíč.</p>

      <h2 id="house-systems">Systémy domů: Placidus vs. Whole Sign</h2>
      <p>Než se ponoříme do konkrétních významů, musíme zmínit systémy domů. Existují desítky způsobů, jak rozdělit oblohu, a volba, kterou učiníte, může váš horoskop výrazně změnit.</p>
      <p><strong>Systém domů Placidus</strong> je v českém prostředí jedním z nejčastěji hledaných způsobů výpočtu astrologických domů. Pokud tedy řešíte „systém domů“ obecně, začněte porovnáním Placidus a Whole Sign: první ukáže jemnější psychologické vrstvy, druhý dá čistší přehled o tom, kde se v horoskopu odehrává 1. dům, 11. dům a další životní oblasti.</p>
      
      <h3>Systém Placidus</h3>
      <p>Toto je nejoblíbenější systém v moderní západní astrologii. Počítá domy na základě doby, kterou planeta potřebuje k cestě od obzoru k poledníku. Protože je Země nakloněná, vede to často k „zachyceným znamením“ (domům, které pokrývají více než jedno znamení) a domům různých velikostí. Příznivci Placidus tvrdí, že je psychologicky jemnější.</p>

      <h3>Systém Whole Sign (Celá znamení)</h3>
      <p>Nejstarší systém, který zažívá velký návrat v tradiční a helénistické astrologii. V tomto systému se celé znamení vašeho ascendentu stává vaším 1. domem. Tento systém je přehlednější, vytváří domy o stejné velikosti 30 stupňů a mnozí jej považují za přesnější pro předpovídání konkrétních životních událostí.</p>

      <h3>Který byste měli použít?</h3>
      <p>V Astralo doporučujeme pro začátek <strong>Whole Sign</strong> kvůli jasnosti, ale prozkoumejte i <strong>Placidus</strong> pro psychologickou hloubku. Pokud máte v Placidus „zachycená“ znamení, často to naznačuje část vaší osobnosti, která byla v raném životě „potlačena“ nebo k ní byl obtížný přístup.</p>

      <h2 id="angular-succedent-cadent">Tři modality: Síla a načasování</h2>
      <p>Domy jsou rozděleny do tří skupin po čtyřech, které určují jejich „dynamickou“ energii a to, jak se projevují v čase.</p>
      
      <h3>1. Úhlové domy (1, 4, 7, 10)</h3>
      <p>To jsou „domy moci“. Odpovídají základním znamením. Planety zde nalezené jsou ve světě velmi aktivní a viditelné. Definují čtyři hlavní body vašeho horoskopu: Ascendent (AC), IC, Descendent (DC) a Midheaven (MC). Události v těchto domech bývají veřejné, zásadní a iniciované vámi.</p>

      <h3>2. Následné domy (2, 5, 8, 11)</h3>
      <p>Odpovídají pevným znamením. Tyto domy „následují“ po úhlových domů. Poskytují stabilitu a zdroje. Najdeme zde věci jako osobní hodnoty, děti, sdílené bohatství a dlouhodobé cíle.</p>

      <h3>3. Upadající domy (3, 6, 9, 12)</h3>
      <p>Odpovídají pohyblivým znamením. Tyto domy představují přechod, přípravu a mentální zpracování zkušeností. Planety zde jsou často více „vnitřní“, intelektuální nebo se týkají služby a učení.</p>

      <h2 id="the-first-house">1. dům: Dům já (Identita)</h2>
      <p>1. dům začíná <strong>Ascendentem</strong>. Je to filtr, skrze který se díváte na svět a jak svět vidí vás. Ovládá váš fyzický vzhled, temperament a vitalitu.
      <br><strong>Klíčová slova:</strong> Identita, vzhled, zdraví, první dojem, vitalita, pud sebezáchovy.</p>

      <h2 id="the-second-house">2. dům: Dům hodnot (Bohatství)</h2>
      <p>Zde najdeme váš bankovní účet, ale také vaši sebeúctu. Ovládá váš osobní majetek, schopnost vydělávat a vaše hodnoty.
      <br><strong>Klíčová slova:</strong> Peníze, hodnoty, sebeúcta, majetek, finanční jistota, smyslové požitky.</p>

      <h2 id="the-third-house">3. dům: Dům komunikace</h2>
      <p>Vaše bezprostřední okolí. Ovládá, jak přemýšlíte, mluvíte a vaše vztahy se sourozenci a sousedy.
      <br><strong>Klíčová slova:</strong> Logika, psaní, mluvení, sourozenci, sousedé, základní vzdělání, krátké cesty, zvědavost.</p>

      <h2 id="the-fourth-house">4. dům: Dům domova (Kořeny)</h2>
      <p>Základna horoskopu (bod IC). Představuje vaši původní rodinu, předky, skutečný domov a soukromý život. Je to nejvnitřnější dům.
      <br><strong>Klíčová slova:</strong> Soukromí, kořeny, rodiče, předkové, nemovitosti, vnitřní svatyně.</p>

      <h2 id="the-fifth-house">5. dům: Dům radosti</h2>
      <p>Sebevyjádření a zábava. Toto je dům kreativity, romance, randění, dětí a spekulativních rizik.
      <br><strong>Klíčová slova:</strong> Kreativita, hra, romance, děti, koníčky, sebeprezentace, osobní jiskra.</p>

      <h2 id="the-sixth-house">6. dům: Dům služby</h2>
      <p>Každodenní rutina a fyzické zdraví. Ovládá vaši práci, kolegy, domácí mazlíčky a to, jak zvládáte každodenní úkoly.
      <br><strong>Klíčová slova:</strong> Rutina, zdraví, práce, služba, domácí mazlíčci, hygiena, analytické schopnosti.</p>

      <h2 id="the-seventh-house">7. dům: Dům partnerství</h2>
      <p>Descendent. Ovládá závazné vztahy – manželství, vážné obchodní partnery i „veřejné nepřátele“.
      <br><strong>Klíčová slova:</strong> Manželství, partnerství, smlouvy, harmonie, ten Druhý, vztahy s veřejností, právo.</p>

      <h2 id="the-eighth-house">8. dům: Dům transformace</h2>
      <p>Hluboké vody. Ovládá znovuzrození, smrt, sex, transformaci, tajemství a „peníze ostatních lidí“.
      <br><strong>Klíčová slova:</strong> Intimita, dědictví, daně, psychologie, okultismus, sdílené zdroje, krize, moc.</p>

      <h2 id="the-ninth-house">9. dům: Dům moudrosti</h2>
      <p>Rozšiřování mysli a obzorů. Ovládá daleké cesty, vyšší vzdělání, filozofii a víru.
      <br><strong>Klíčová slova:</strong> Cestování, filozofie, vyšší vzdělání, právo, náboženství, dobrodružství, hledání smyslu.</p>

      <h2 id="the-tenth-house">10. dům: Dům účelu</h2>
      <p>Midheaven (MC). Vaše veřejná pověst a vaše volání. Je to způsob, jak dosahujete úspěchu a co po sobě zanecháte.
      <br><strong>Klíčová slova:</strong> Kariéra, pověst, status, odkaz, veřejný obraz, autorita.</p>

      <h2 id="the-eleventh-house">11. dům: Dům komunity</h2>
      <p>Sociální sítě a skupiny. Ovládá také vaše naděje, přání a humanitární cíle.
      <br><strong>Klíčová slova:</strong> Přátelé, sítě, sociální média, skupiny, naděje, budoucí cíle, idealismus.</p>

      <h2 id="the-twelfth-house">12. dům: Dům nevědomí</h2>
      <p>„Šatník“ zvěrokruhu. Ovládá věci, které jsou skryté: spiritualitu, sny, tajemství a podvědomí.
      <br><strong>Klíčová slova:</strong> Samota, spiritualita, skrytí nepřátelé, karma, sny, tajemství, uvolnění.</p>

      <h2 id="planetary-placements">Hlavní planety v domech: Přehled</h2>
      <p>Při analýze horoskopu pamatujte, že planety jsou „řidiči“ a dům je „území“.
      <br><strong>Slunce:</strong> Kde záříte.
      <br><strong>Měsíc:</strong> Kde se cítíte v bezpečí.
      <br><strong>Saturn:</strong> Kde tvrdě pracujete. Je to oblast, ve které se stáváte mistrem skrze úsilí.</p>

      <h2 id="stelliums">Co je to stellium v domě?</h2>
      <p><strong>Stellium</strong> nastává, když se tři nebo více planet shromáždí v jediném domě. To vytváří masivní soustředění energie v této oblasti vašeho života. Stellium je „ohniskem duše“ — ukazuje, kam jste v tomto životě zaměřili svou energii k ovládnutí specifického tématu.</p>

      <h2 id="empty-houses">Co když je dům prázdný? Síla vládců</h2>
      <p>Jedna z nejčastějších otázek zní: „Můj 7. dům je prázdný! Znamená to, že se nikdy nevdám/neožením?“ Odpověď zní kategoricky NE. Každý má prázdné domy. Abyste pochopili prázdný dům, podívejte se na <strong>vládce domu</strong> (planetu, která vládne znamení na jeho začátku).</p>

      <h2 id="retrograde">Retrográdní planety v domech</h2>
      <p>Pokud je planeta v domě retrográdní, její energie je obrácena dovnitř. Můžete mít pocit, že témata daného domu vyžadují hlubší vnitřní reflexi, než se budou moci úspěšně projevit ve vnějším světě.</p>

      <h2 id="derived-houses">Pokročilá technika: Odvozené domy</h2>
      <p>Horoskop můžete „otáčet“, abyste viděli ostatní lidi. Například 8. dům je 2. domem (peníze) od 7. domu (partner), což vypovídá o finanční situaci vašeho partnera.</p>

      <h2 id="progressions">Progresivní domy: Jak se vyvíjejí životní cykly</h2>
      <p>Skrze <strong>sekundární progrese</strong> se hroty vašich domů v čase „pohybují“. To vysvětluje měnící se životní priority v průběhu desetiletí.</p>

      <h2 id="conclusion">Integrace vaší mapy</h2>
      <p>Porozumění 12 domům je klíčem k transformaci astrologie v mapu vašeho osudu. V Astralo naše <strong>personalizované zprávy</strong> provádějí tuto syntézu za vás a pomáhají vám procházet životem s jasností a účelem.</p>
    `
};

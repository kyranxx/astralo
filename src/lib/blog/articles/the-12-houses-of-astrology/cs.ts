/**
 * 12 domů v astrologii - CS
 */
import type { BlogPostTranslation } from '../../types';

export const cs: BlogPostTranslation = {
  title: "🏠 12 domů v astrologii: Ultimátní průvodce vaší životní cestou",
  excerpt: "Objevte skrytou mapu svého života. Hloubkový vhled do 12 astrologických domů, které vysvětlují, kde se projevuje vaše planetární energie a jak ovládnout svůj osud.",
  category: "Základy astrologie",
  metaDescription: "Kompletní průvodce 12 domy astrologie. Zjistěte, co každý dům znamená, jak ovlivňují vaše životní sféry a jak interpretovat domy ve svém horoskopu.",
  keywords: "astrologické domy, 12 domů, domy zvěrokruhu, interpretace horoskopu, první dům, sedmý dům, midheaven, úhlové domy, následné domy, upadající domy, vládci domů, stellium",
  quickSummary: [
    "12 domů představuje „kde“ se váš život odehrává – specifické sféry jako kariéra, domov a láska.",
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
    { id: "introduction", title: "Scéna: Proč na domech záleží" },
    { id: "house-systems", title: "Systémy domů: Placidus vs. Whole Sign" },
    { id: "angular-succedent-cadent", title: "Tři modality: Síla a načasování" },
    { id: "the-first-house", title: "1. dům: Dům já (Identita)" },
    { id: "the-second-house", title: "2. dům: Dům hodnot (Bohatství)" },
    { id: "the-third-house", title: "3. dům: Dům komunikace" },
    { id: "the-fourth-house", title: "4. dům: Dům domova (Kořeny)" },
    { id: "the-fifth-house", title: "5. dům: Dům radosti" },
    { id: "the-sixth-house", title: "6. dům: Dům služby" },
    { id: "the-seventh-house", title: "7. dům: Dům partnerství" },
    { id: "the-eighth-house", title: "8. dům: Dům transformace" },
    { id: "the-ninth-house", title: "9. dům: Dům moudrosti" },
    { id: "the-tenth-house", title: "10. dům: Dům účelu" },
    { id: "the-eleventh-house", title: "11. dům: Dům komunity" },
    { id: "the-twelfth-house", title: "12. dům: Dům nevědomí" },
    { id: "planetary-placements", title: "Hlavní planety v domech" },
    { id: "stelliums", title: "Co je to stellium v domě?" },
    { id: "empty-houses", title: "Co když je dům prázdný? Síla vládců" },
    { id: "retrograde", title: "Retrográdní planety v domech" },
    { id: "derived-houses", title: "Pokročilá technika: Odvozené domy" },
    { id: "progressions", title: "Progresivní domy: Jak se vyvíjejí životní cykly" },
    { id: "conclusion", title: "Integrace vaší mapy" }
  ],
  content: `
      <h2 id="introduction">Scéna: Proč na domech záleží</h2>
      <p>Pokud jste se někdy podívali na svůj rodný horoskop a cítili se zahlceni všemi těmi čarami, symboly a geometrickými tvary, nejste v tom sami. Astrologie je jazyk o třech hlavních složkách: znamení, planety a domy. Zatímco <strong>planety</strong> představují „herce“ (co se děje) a <strong>znamení</strong> představují „kostýmy“ (jak se to děje), <strong>12 domů astrologie</strong> představuje „scénu“ (kde se to děje).</p>
      
      <p>Představte si svůj život jako divadelní hru. Mars může být hercem – plným energie a dravosti. Pokud má na sobě „kostým“ Berana, je rychlý, impulzivní a odvážný. Ale kde hraje? Pokud je v 10. domě kariéry, je to dravý podnikatel. Pokud je ve 4. domě domova, může to být někdo, kdo věnuje energii opravám domu nebo zažívá konflikty v rodině. Bez domů je astrologie čistě psychologická; s domy se stává praktickou a předpovídající.</p>

      <h2 id="house-systems">Systémy domů: Placidus vs. Whole Sign</h2>
      <p>Než se ponoříme do konkrétních významů, musíme zmínit systémy domů. Existuje mnoho způsobů, jak rozdělit oblohu, a ten, který si vyberete, může váš horoskop výrazně změnit.</p>
      
      <h3>Systém Placidus</h3>
      <p>Toto je nejoblíbenější systém v moderní západní astrologii. Počítá domy na základě toho, jak dlouho trvá planetě cesta od obzoru k poledníku. Protože je Země nakloněná, vede to často k domům různých velikostí. Fanoušci Placidus tvrdí, že je psychologicky jemnější a odráží individuální prožívání času.</p>

      <h3>Systém Whole Sign (Celá znamení)</h3>
      <p>Nejstarší systém, který zažívá velký návrat. V tomto systému se celé znamení vašeho ascendentu stává vaším 1. domem. Tento systém je přehlednější, vytváří domy o stejné velikosti 30 stupňů a mnozí ho považují za přesnější pro předpovídání konkrétních životních událostí.</p>

      <h2 id="angular-succedent-cadent">Tři modality: Síla a načasování</h2>
      <p>Domy jsou rozděleny do tří skupin po čtyřech, což určuje jejich „dynamiku“.</p>
      
      <h3>1. Úhlové domy (1, 4, 7, 10)</h3>
      <p>To jsou „domy moci“. Odpovídají základním znamením. Planety zde nalezené jsou v okolním světě velmi aktivní a viditelné. Události v těchto domech bývají veřejné, zásadní a iniciované vámi. Pokud zde máte mnoho planet, jste člověk činu.</p>

      <h3>2. Následné domy (2, 5, 8, 11)</h3>
      <p>Odpovídají pevným znamením. Tyto domy „následují“ po úhlových. Poskytují stabilitu a zdroje. Najdeme zde věci jako osobní hodnoty, děti, sdílené bohatství a dlouhodobé cíle. Představují fázi budování a upevňování zisků.</p>

      <h3>3. Upadající domy (3, 6, 9, 12)</h3>
      <p>Odpovídají pohyblivým znamením. Tyto domy představují přechod, přípravu a mentální zpracování zkušeností. Planety zde jsou často více „vnitřní“, intelektuální nebo zahrnují službu a učení. V moderní psychologii jsou vnímány jako spirituálně nejkomplexnější.</p>

      <h2 id="the-first-house">1. dům: Dům já (Identita)</h2>
      <p>1. dům začíná <strong>Ascendentem</strong>. Je to filtr, skrze který se díváte na svět a jak svět vidí vás. Ovládá váš vzhled, temperament a vitalitu.
      <br><strong>Klíčová slova:</strong> Identita, vzhled, zdraví, první dojem, vitalita, pud sebezáchovy.</p>

      <h2 id="the-second-house">2. dům: Dům hodnot (Bohatství)</h2>
      <p>Zde najdeme váš bankovní účet, ale také vaši sebeúctu. Vládne vašemu majetku, schopnosti vydělávat a vašim hodnotám.
      <br><strong>Klíčová slova:</strong> Peníze, hodnoty, sebeúcta, majetek, finanční jistota, smyslové požitky.</p>

      <h2 id="the-third-house">3. dům: Dům komunikace</h2>
      <p>Vaše bezprostřední okolí. Ovládá, jak přemýšlíte, mluvíte, a vaše vztahy se sourozenci a sousedy.
      <br><strong>Klíčová slova:</strong> Logika, psaní, mluvení, sourozenci, sousedé, základní vzdělání, dojíždění, zvědavost.</p>

      <h2 id="the-fourth-house">4. dům: Dům domova (Kořeny)</h2>
      <p>Základna horoskopu (bod IC). Představuje vaši původní rodinu, předky, domov a soukromý život.
      <br><strong>Klíčová slova:</strong> Soukromí, kořeny, rodiče, předkové, nemovitosti, vnitřní svatyně.</p>

      <h2 id="the-fifth-house">5. dům: Dům radosti</h2>
      <p>Sebevyjádření a zábava. Toto je dům kreativity, romance, dětí a radosti.
      <br><strong>Klíčová slova:</strong> Kreativita, hra, romance, děti, koníčky, sebeprezentace, osobní jiskra.</p>

      <h2 id="the-sixth-house">6. dům: Dům služby</h2>
      <p>Každodenní rutina a fyzické zdraví. Vládne vaší práci, kolegům a tomu, jak zvládáte každodenní úkoly.
      <br><strong>Klíčová slova:</strong> Rutina, zdraví, práce, služba, hygiena, analytické schopnosti, údržba.</p>

      <h2 id="the-seventh-house">7. dům: Dům partnerství</h2>
      <p>Descendent. Ovládá závazné vztahy – manželství, vážné obchodní partnery i „veřejné nepřátele“.
      <br><strong>Klíčová slova:</strong> Manželství, partnerství, smlouvy, harmonie, ten Druhý, vztahy s veřejností.</p>

      <h2 id="the-eighth-house">8. dům: Dům transformace</h2>
      <p>Hluboké vody. Vládne znovuzrození, sexu, transformaci, tajemstvím a „penězům ostatních lidí“.
      <br><strong>Klíčová slova:</strong> Intimita, dědictví, daně, psychologie, okultismus, sdílené zdroje, krize, moc.</p>

      <h2 id="the-ninth-house">9. dům: Dům moudrosti</h2>
      <p>Rozšiřování mysli a obzorů. Vládne dalekým cestám, vyššímu vzdělání, filozofii a víře.
      <br><strong>Klíčová slova:</strong> Cestování, filozofie, vyšší vzdělání, právo, náboženství, dobrodružství, hledání smyslu.</p>

      <h2 id="the-tenth-house">10. dům: Dům účelu</h2>
      <p>Midheaven (MC). Vaše veřejná pověst a volání. Je to způsob, jak dosahujete úspěchu a co po sobě zanecháte.
      <br><strong>Klíčová slova:</strong> Kariéra, pověst, status, odkaz, veřejný obraz, autorita.</p>

      <h2 id="the-eleventh-house">11. dům: Dům komunity</h2>
      <p>Sociální sítě a skupiny. Vládne také vašim nadějím, přáním a humanitárním cílům.
      <br><strong>Klíčová slova:</strong> Přátelé, sítě, sociální média, skupiny, naděje, budoucí cíle, ideály.</p>

      <h2 id="the-twelfth-house">12. dům: Dům nevědomí</h2>
      <p>„Šatník“ zvěrokruhu. Vládne věcem, které jsou skryté: spiritualitě, snům, tajemstvím a podvědomí.
      <br><strong>Klíčová slova:</strong> Samota, spiritualita, skrytí nepřátelé, karma, sny, tajemství, uvolnění.</p>

      <h2 id="planetary-placements">Hlavní planety v domech</h2>
      <p>Při analýze horoskopu pamatujte, že planety jsou „řidiči“ a dům je „území“.
      <br><strong>Slunce:</strong> Kde záříte. Pokud je v 10. domě, záříte v kariéře.
      <br><strong>Měsíc:</strong> Kde se cítíte v bezpečí. V 2. domě se cítíte v bezpečí, když máte peníze.
      <br><strong>Merkur:</strong> O čem mluvíte. V 9. domě mluvíte o víře nebo filozofii.
      <br><strong>Venuše:</strong> Co milujete. V 11. domě milujete své přátele a komunitu.
      <br><strong>Mars:</strong> Kde bojujete. V 7. domě můžete bojovat s partnerem.
      <br><strong>Jupiter:</strong> Kde rostete. V 1. domě roste vaše osobnost a vitalita.
      <br><strong>Saturn:</strong> Kde pracujete. V 2. domě tvrdě pracujete pro každý haléř.</p>

      <h2 id="stelliums">Co je to stellium v domě?</h2>
      <p><strong>Stellium</strong> nastává, když se tři nebo více planet shromáždí v jediném domě. To vytváří masivní důraz na tuto oblast vašeho života. Ukazuje to, kam jste v tomto životě zaměřili svou energii k ovládnutí specifického tématu.</p>

      <h2 id="empty-houses">Co když je dům prázdný? Síla vládců</h2>
      <p>Prázdný dům jen znamená, že tato oblast života není primárním ohniskem vývoje vaší duše v tomto životě. Abyste pochopili prázdný dům, podívejte se na <strong>vládce domu</strong> (planetu, která vládne znamení na začátku domu). Poloha tohoto vládce vám řekne, s čím je tato oblast života propojena.</p>

      <h2 id="conclusion">Integrace vaší mapy</h2>
      <p>Porozumění 12 domům je klíčem k hlubokému pochopení vašeho osudu. V Astralo naše <strong>personalizované astrologické zprávy</strong> syntetizují znamení, planety a vládce domů do uceleného příběhu, který vám pomůže procházet životem s jasností a účelem. Vaše mapa je již zapsána ve hvězdách – nechte nás, abychom vám ji pomohli přečíst.</p>
    `
};

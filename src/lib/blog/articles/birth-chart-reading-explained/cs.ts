/**
 * Výklad rodného horoskopu vysvětlen - CS
 */
import type { BlogPostTranslation } from '../../types';

export const cs: BlogPostTranslation = {
  title: "🔮 Výklad rodného horoskopu: Komplexní průvodce vaší vesmírnou mapou",
  excerpt: "Odemkněte tajemství své osobnosti s naším ultimátním průvodcem výkladem rodného horoskopu. Naučte se interpretovat planety, domy, aspekty a uzly osudu jako profesionál.",
  category: "Základy astrologie",
  metaDescription: "Odemkněte tajemství své osobnosti s naším ultimátním průvodcem výkladem rodného horoskopu. Naučte se interpretovat planety, domy, aspekty a uzly osudu jako profesionál.",
  keywords: "rodný horoskop, nativní horoskop, astrologická mapa, velká trojka astrologie, ascendent, měsíční znamení, astrologické domy, planetární aspekty, čtení rodného horoskopu",
  quickSummary: [
    "Váš rodný horoskop je 360stupňový snímek oblohy v přesném okamžiku vašeho narození",
    "„Velká trojka“ (Slunce, Měsíc, Ascendent) tvoří jádro vaší osobnosti",
    "12 domů popisuje „kde“ se události dějí, zatímco planety popisují „co“ se děje",
    "Aspekty (čáry spojující planety) odhalují vaše vnitřní konflikty a zvláštní talenty"
  ],
  keyTakeaways: [
    "Ascendent (vycházející znamení) je pro předpovědi často přesnější než sluneční znamení",
    "Napětové aspekty (kvadráty, opozice) vytvářejí díky odolnosti ty nejúspěšnější lidi",
    "Severní uzel odhaluje karmický směr vaší duše v tomto životě",
    "Počítačem generované zprávy jsou skvělé, ale lidský cit je nenahraditelný"
  ],
  tableOfContents: [
    { id: "what-is-birth-chart", title: "Plán vaší duše" },
    { id: "the-big-three", title: "Velká trojka: Slunce, Měsíc, Ascendent" },
    { id: "the-planets", title: "Planety: Vnitřní vs. vnější" },
    { id: "the-houses", title: "Význam 12 domů" },
    { id: "aspects", title: "Aspekter: Vesmírná konverzace" },
    { id: "nodes", title: "Uzly osudu" }
  ],
  content: `
      <h2 id="what-is-birth-chart">Plán vaší duše</h2>
      <p>Měli jste někdy pocit, že úplně neodpovídáte popisu svého znamení zvěrokruhu? „Jsem Lev, ale nesnáším být v centru pozornosti!“ Důvod se pravděpodobně skrývá ve vašem <strong>rodném horoskopu</strong> (nebo nativním horoskopu). I když je vaše sluneční znamení důležité, je to jen jedna proměnná v masivní a složité rovnici.</p>
      
      <p>Rodný horoskop je mapa nebes vypočítaná pro přesný čas, datum a místo vašeho narození. Staví vás do středu vesmíru, s planetami uspořádanými kolem vás. Představte si ho jako svou „kosmickou DNA“ – jedinečnou sadu instrukcí, talentů, výzev a potenciálů, která patří jen vám.</p>

      <h2 id="the-big-three">Velká trojka: Slunce, Měsíc, Ascendent</h2>
      <p>Než se ponoříte do složité geometrie, musí každý student astrologie ovládnout svou „Velkou trojku“. Tyto tři body určují většinu vaší osobnosti.</p>
      
      <h3>1. Slunce ☀️ (Identita)</h3>
      <p>Slunce představuje vaše vědomé ego, vaše „já jsem“. Je to vaše palivo, vaše hnací síla a energetická frekvence, kterou vyzařujete. Odpovídá na otázku: <em>„Kdo jsem ve svém jádru?“</em></p>

      <h3>2. Měsíc 🌙 (Emoce)</h3>
      <p>Měsíc představuje váš vnitřní svět, vaše instinkty a podvědomí. Určuje, jak reagujete, když jste zranění, hladoví nebo unavení. Odpovídá na otázku: <em>„Co potřebuji, abych se cítil v bezpečí?“</em></p>

      <h3>3. Ascendent 🏹 (Maska)</h3>
      <p>Ascendent je znamení zvěrokruhu, které vycházelo na východním obzoru v okamžiku vašeho narození. Je to vaše „rozhraní“ se světem. Určuje váš vnější vzhled, váš styl a první dojem. Odpovídá na otázku: <em>„Jak mě vidí ostatní?“</em></p>

      <h2 id="the-planets">Planety: Vnitřní vs. vnější</h2>
      <p>Při <strong>výkladu rodného horoskopu</strong> jsou planety herci, kteří hrají role v příběhu vašeho života.</p>
      
      <h3>Osobní planety (rychle se pohybující)</h3>
      <ul>
        <li><strong>Merkur ☿️:</strong> Posel. Vládne vašemu intelektu, řeči a logice. Merkur v Blížencích vyjednává jinak než Merkur v Rybách.</li>
        <li><strong>Venuše ♀:</strong> Milovnice. Vládne přitažlivosti, umění a penězům. Ukazuje, čeho si ceníte a jak svádíte.</li>
        <li><strong>Mars ♂:</strong> Bojovník. Vládne akci, hněvu a libidu. Ukazuje, jak bojujete za to, co chcete.</li>
      </ul>

      <h3>Společenské a vnější planety (pomalu se pohybující)</h3>
      <ul>
        <li><strong>Jupiter ♃:</strong> Guru. Kde nacházíte štěstí, expanzi a smysl.</li>
        <li><strong>Saturn ♄:</strong> Učitel. Kde čelíte omezením, strachu, ale nakonec mistrovství díky tvrdé práci.</li>
        <li><strong>Uran ♅, Neptun ♆, Pluto ♇:</strong> Generační planety. Tyto se pohybují tak pomalu, že utvářejí celé generace a ovlivňují vás na hluboké, podvědomé úrovni zahrnující evoluci a karmu.</li>
      </ul>

      <h2 id="the-houses">Scéna: 12 domů</h2>
      <p>Horoskop je rozdělen do 12 „domů“, jako plátky pizzy. Každý dům vládne specifické oblasti života. To, kde planeta sedí, vám říká, <em>kde</em> se její energie projeví.</p>
      <ul>
        <li><strong>1. dům:</strong> Já, tělo, vzhled.</li>
        <li><strong>2. dům:</strong> Peníze, majetek, hodnoty.</li>
        <li><strong>3. dům:</strong> Komunikace, sourozenci, krátké cesty.</li>
        <li><strong>4. dům:</strong> Domov, rodina, kořeny.</li>
        <li><strong>5. dům:</strong> Kreativita, romantika, děti.</li>
        <li><strong>6. dům:</strong> Každodenní rutina, zdraví, služba.</li>
        <li><strong>7. dům:</strong> Manželství, partnerství, otevření nepřátelé.</li>
        <li><strong>8. dům:</strong> Smrt, sex, peníze ostatních lidí.</li>
        <li><strong>9. dům:</strong> Filozofie, cestování, vyšší vzdělání.</li>
        <li><strong>10. dům:</strong> Kariéra, veřejný obraz, odkaz.</li>
        <li><strong>11. dům:</strong> Přátelé, sítě, naděje/přání.</li>
        <li><strong>12. dům:</strong> Podvědomí, tajemství, spiritualita.</li>
      </ul>

      <h2 id="aspects">Aspekty: Vesmírná konverzace</h2>
      <p>Planety nefungují v izolaci. Tvoří geometrické úhly zvané „aspekty“. Tyto čáry spojují herce v horoskopu.</p>
      
      <p><strong>Harmonické aspekty (trigon, sextil):</strong> To jsou dary. Planety si navzájem pomáhají. Věci zde jdou snadno – někdy až příliš snadno, což vede k lenosti.</p>
      
      <p><strong>Napěťové aspekty (kvadrát, opozice):</strong> To jsou výzvy. Planety spolu bojují nebo se blokují. Tyto body tření však vytvářejí energii potřebnou pro velké úspěchy. Většina úspěšných lidí má horoskopy plné kvadrátů!</p>

      <h2 id="nodes">Uzly osudu</h2>
      <p>Nakonec hledejte symboly ve tvaru podkovy. <strong>Severní uzel</strong> představuje váš osud – směr, kterým se vaše duše chce v tomto životě vydat. Bývá to nepříjemné a nové. <strong>Jižní uzel</strong> je váš minulý život (nebo rané dětství) – působí povědomě a snadno, ale setrvání v něm vede ke stagnaci.</p>
      
      <h3>Interpretace je umění</h3>
      <p>Čtení rodného horoskopu je jako poslech symfonie. Můžete izolovat housle (Venuše), ale kouzlo je v celém orchestru hrajícím dohromady. V Astralo používáme pokročilou AI trénovanou na staletích astrologické moudrosti k syntéze těchto milionů proměnných do jasného, čitelného příběhu o VÁS.
    `
};

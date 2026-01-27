/**
 * The 12 Houses of Astrology - Danish (Complete Guide)
 */
import type { BlogPostTranslation } from '../../types';

export const da: BlogPostTranslation = {
  title: '🏠 Astrologiens 12 Huse: Den Komplette Guide til Dit Livskort',
  excerpt: 'Opdag dit livs skjulte kort. Et dybdyk ned i astrologiens 12 huse, der forklarer, hvor din planetariske energi udspiller sig, og hvordan du mestrer din skæbne.',
  category: 'Astrologi Grundlæggende',
  metaDescription: 'Komplet guide til de 12 astrologiske huse. Lær hvad hvert hus betyder, hvordan de påvirker livsområder som karriere og kærlighed, og hvordan du tolker huse i dit fødselshoroskop som en ekspert.',
  keywords: 'astrologiske huse, 12 huse, stjernetegn huse, fødselshoroskop tolkning, første hus, syvende hus, midhimmel, angulære huse, efterfølgende huse, faldende huse, hus herskere, stellium',
  quickSummary: [
    'De 12 Huse repræsenterer "HVOR" i dit liv – specifikke arenaer som karriere, hjem og forhold.',
    'Husene er opdelt i Angulære, Efterfølgende og Faldende, hver med forskellige energiniveauer.',
    'Ascendanten markerer starten på det 1. hus og sætter strukturen for hele horoskopet.',
    'Tomme huse betyder ikke, at det område af livet "mangler" – de styres af en bestemt planet.'
  ],
  keyTakeaways: [
    'Angulære Huse (1, 4, 7, 10) er de mest aktive og synlige i dit liv.',
    'Herskeren af et hus (planeten der styrer tegnet på husspidsen) giver den hemmelige nøgle til det livsområde.',
    'De fire hovedvinkler (AC, IC, DC, MC) definerer korset for dit livsformål.',
    'Forståelse af huse er afgørende for timing og forudsigelse i astrologi.'
  ],
  tableOfContents: [
    { id: 'introduction', title: 'Scenen: Hvorfor Huse Betyder Noget' },
    { id: 'house-systems', title: 'Forståelse af Hussystemer: Placidus vs. Whole Sign' },
    { id: 'angular-succedent-cadent', title: 'De Tre Modaliteter: Kraft og Tid' },
    { id: 'the-first-house', title: '1. Hus: Selvets Hus (Identitet)' },
    { id: 'the-second-house', title: '2. Hus: Værdiens Hus (Rigdom)' },
    { id: 'the-third-house', title: '3. Hus: Kommunikations Hus' },
    { id: 'the-fourth-house', title: '4. Hus: Hjemmets Hus (Rødder)' },
    { id: 'the-fifth-house', title: '5. Hus: Glædens Hus' },
    { id: 'the-sixth-house', title: '6. Hus: Tjenestens Hus' },
    { id: 'the-seventh-house', title: '7. Hus: Partnerskabets Hus' },
    { id: 'the-eighth-house', title: '8. Hus: Transformationens Hus' },
    { id: 'the-ninth-house', title: '9. Hus: Visdommens Hus' },
    { id: 'the-tenth-house', title: '10. Hus: Formålets Hus' },
    { id: 'the-eleventh-house', title: '11. Hus: Fællesskabets Hus' },
    { id: 'the-twelfth-house', title: '12. Hus: Det Ubevidstes Hus' },
    { id: 'planetary-placements', title: 'Store Planeter i Husene' },
    { id: 'stelliums', title: 'Hvad er et Stellium?' },
    { id: 'empty-houses', title: 'Hvad hvis et Hus er Tomt? Herskernes Magt' },
    { id: 'retrograde', title: 'Retrograde Planeter i Huse' },
    { id: 'derived-houses', title: 'Avanceret Teknik: Afledte Huse' },
    { id: 'progressions', title: 'Progressive Huse: Hvordan Livscyklusser Udvikler Sig' },
    { id: 'conclusion', title: 'Integration af Dit Horoskop' }
  ],
  content: `
      <h2 id="introduction">Scenen: Hvorfor Huse Betyder Noget</h2>
      <p>Hvis du nogensinde har kigget på dit fødselshoroskop og følt dig overvældet af linjerne, symbolerne og de geometriske former, er du ikke alene. Astrologi er et sprog bestående af tre hovedkomponenter: tegn, planeter og huse. Mens **planeter** repræsenterer "skuespillerne" (hvad der sker) og **tegn** repræsenterer "kostumerne" (hvordan det sker), repræsenterer **astrologiens 12 huse** "scenen" (hvor det sker).</p>
      
      <p>Forestil dig dit liv er et skuespil. Mars er skuespilleren (fuld af drivkraft). Hvis han er i Vædderen, er han hurtig. Men hvor optræder han? Hvis han er i det 10. Hus for Karriere, er han en driftig iværksætter. Uden husene er astrologi rent psykologisk; med husene bliver det praktisk og forudsigende.</p>

      <h2 id="house-systems">Forståelse af Hussystemer: Placidus vs. Whole Sign</h2>
      <p>Der er snesevis af måder at opdele himlen på. De mest almindelige:</p>
      
      <h3>Placidus Systemet</h3>
      <p>Det moderne standardsystem. Tidsbaseret. Huse kan have forskellige størrelser. Fremragende til dyb psykologi.</p>

      <h3>Whole Sign Systemet</h3>
      <p>Det ældste system. Hvert stjernetegn er et helt hus. Fremragende til klare, konkrete forudsigelser. Astralo bruger dette system som standard for klarhed.</p>

      <h2 id="angular-succedent-cadent">De Tre Modaliteter: Kraft og Tid</h2>
      <p>Husene er opdelt i tre grupper, der dikterer deres "dynamiske" energi.</p>
      
      <h3>1. Angulære Huse (1, 4, 7, 10)</h3>
      <p>Disse er "Power Houses". Planeter her er meget aktive og synlige. De definerer de fire hovedpunkter i dit horoskop: Ascendant, IC, Descendant og Midhimmel.</p>

      <h3>2. Efterfølgende Huse (Succedent) (2, 5, 8, 11)</h3>
      <p>De giver stabilitet og ressourcer (penge, børn, fælles rigdom). De repræsenterer "mellem" fasen, hvor vi konsoliderer vores gevinster.</p>

      <h3>3. Faldende Huse (Cadent) (3, 6, 9, 12)</h3>
      <p>Huse for overgang og mental bearbejdning. Planeter her er ofte mere interne eller intellektuelle. De forbereder os på den næste cyklus.</p>

      <h2 id="the-first-house">1. Hus: Selvets Hus (Identitet)</h2>
      <p>Starter ved **Ascendanten**. Det filter, hvorigennem du ser verden. Hersker over dit udseende og vitalitet.<br><strong>Sol i 1.:</strong> Stærk tilstedeværelse, høj energi.<br><strong>Saturn i 1.:</strong> Seriøs fremtoning, blomstrer sent.</p>

      <h2 id="the-second-house">2. Hus: Værdiens Hus (Rigdom)</h2>
      <p>Din bankkonto, men også dit selvværd. Hersker over personlige ejendele.<br><strong>Jupiter i 2.:</strong> Held med penge.<br><strong>Pluto i 2.:</strong> Intense cyklusser af finansiel død og genfødsel.</p>

      <h2 id="the-third-house">3. Hus: Kommunikations Hus</h2>
      <p>Dit umiddelbare miljø. Hvordan du tænker og taler.<br><strong>Merkur i 3.:</strong> Hurtigt sind, "evig studerende".</p>

      <h2 id="the-fourth-house">4. Hus: Hjemmets Hus (Rødder)</h2>
      <p>Bunden af horoskopet (IC). Familie, rødder og privatliv.<br><strong>Månen i 4.:</strong> Dybt beskyttende og følelsesladet omkring hjemmet.</p>

      <h2 id="the-fifth-house">5. Hus: Glædens Hus</h2>
      <p>Selvudtryk og sjov. Kreativitet, romantik og børn.<br><strong>Venus i 5.:</strong> Forelsket i kærligheden, kunstnerisk.</p>

      <h2 id="the-sixth-house">6. Hus: Tjenestens Hus</h2>
      <p>Daglige rutiner og sundhed. Ikke din karriere (det er det 10.), men dit daglige job.<br><strong>Mars i 6.:</strong> Hårdt arbejdende, aktiv rutine.</p>

      <h2 id="the-seventh-house">7. Hus: Partnerskabets Hus</h2>
      <p>Descendanten. Forpligtende forhold – ægteskab og forretningspartnere.<br><strong>Saturn i 7.:</strong> Søger stabilitet, sendt ægteskab.</p>

      <h2 id="the-eighth-house">8. Hus: Transformationens Hus</h2>
      <p>Dybe vande. Sex, død, skat og hemmeligheder.<br><strong>Pluto i 8.:</strong> Kraftfuld, modstandsdygtig, tiltrukket af dybden.</p>

      <h2 id="the-ninth-house">9. Hus: Visdommens Hus</h2>
      <p>Udvidelse af sind og horisont. Lang rejse og videregående uddannelse.<br><strong>Jupiter i 9.:</strong> Held i rejser og læring.</p>

      <h2 id="the-tenth-house">10. Hus: Formålets Hus</h2>
      <p>Midhimmel (MC). Offentligt omdømme og kald.<br><strong>Sol i 10.:</strong> Skæbnebestemt til rampelyset, ambitiøs.</p>

      <h2 id="the-eleventh-house">11. Hus: Fællesskabets Hus</h2>
      <p>Sociale netværk og grupper. Håb og humanitære mål.<br><strong>Uranus i 11.:</strong> Excentriske venner, leder i sociale bevægelser.</p>

      <h2 id="the-twelfth-house">12. Hus: Det Ubevidstes Hus</h2>
      <p>Zodiakens "skab". Skjulte ting, spiritualitet, karma.<br><strong>Neptun i 12.:</strong> Meget intuitiv, har brug for alenetid.</p>

      <h2 id="stelliums">Hvad er et Stellium?</h2>
      <p>**Et stellium** er, når 3 eller flere planeter samles i ét hus. Dette skaber et massivt fokus af energi. Det viser, hvor din sjæl har koncentreret sin energi i dette liv.</p>

      <h2 id="empty-houses">Hvad hvis et Hus er Tomt? Herskernes Magt</h2>
      <p>Et tomt hus betyder ikke, at det område af livet "mangler". Se på **Husherskeren** (planeten der styrer tegnet på husspidsen).<br>Eksempel: Tomt 7. hus i Tyren? Se på Venus.</p>

      <h2 id="retrograde">Retrograde Planeter i Huse</h2>
      <p>Når en planet er retrograd i et hus, vendes dens energi indad. Du kan udvikle dybt indre mesterskab over emnet.</p>

      <h2 id="derived-houses">Avanceret Teknik: Afledte Huse</h2>
      <p>Du kan "dreje" horoskopet for at se andre.<br><strong>8. Hus:</strong> 2. fra det 7. (Partners Penge).<br><strong>11. Hus:</strong> 2. fra det 10. (Penge fra Karriere).</p>

      <h2 id="progressions">Progressive Huse: Hvordan Livscyklusser Udvikler Sig</h2>
      <p>Gennem **Sekundære Progressioner** bevæger dine husspidser sig. Din progressive sol vil bevæge sig gennem husene og markere 30-årige kapitler med fokus.</p>

      <h2 id="conclusion">Integration af Dit Horoskop</h2>
      <p>Forståelse af de 12 huse forvandler astrologi fra et selskabsspil til et livskort. Hos Astralo syntetiserer vores rapporter dette for dig og forklarer ikke kun *hvem* du er, men *hvor* du er på vej hen.</p>
    `
};

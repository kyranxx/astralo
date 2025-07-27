# Webová Aplikácia na Generovanie Horoskopov: Plán Projektu

Tento dokument slúži ako komplexný plán pre vývoj webovej aplikácie na generovanie a predaj horoskopov.

## 1. Finálna Vízia Produktu

Cieľom je vytvoriť vizuálne pôsobivú, minimalistickú a extrémne rýchlu webovú aplikáciu v slovenskom jazyku. Aplikácia bude fungovať na čisto transakčnom modeli bez potreby registrácie alebo používateľských účtov.

- **Používateľský Scenár:** Návštevník príde na stránku, vyberie si typ horoskopu, zadá potrebné údaje, zaplatí cez Stripe a okamžite dostane vygenerovaný horoskop s možnosťou stiahnutia do PDF.
- **Vizuálny Štýl:** Full-screen "živé" pozadie (fantasy mesto s jemnými animáciami) vytvorené pomocou modernej technológie (Rive/Three.js) pre maximálny dojem a rýchlosť.

## 2. Produkty a Cenník (Jednorazové Platby)

| Produkt | Požadované Údaje | Cena | Dĺžka (Cieľ) |
| :--- | :--- | :--- | :--- |
| **Osobný Horoskop na Týždeň** | Dátum, čas a miesto narodenia | 3,99 € | ~400 slov |
| **Osobný Horoskop na Mesiac** | Dátum, čas a miesto narodenia | 9,99 € | ~1000 slov |
| **Osobný Horoskop na Rok** | Dátum, čas a miesto narodenia | 24,99 € | ~2500 slov |
| **Osobná Rodná Mapa (Natal Chart)** | Dátum, čas a miesto narodenia | 4,99 € | ~800 slov |
| **Partnerský Horoskop (Synastria)** | Údaje o narodení pre 2 osoby | 14,99 € | ~1200 slov |

*Každý vygenerovaný horoskop bude obsahovať tlačidlo na stiahnutie do PDF.*

## 3. Technologický Zásobník (Tech Stack)

- **Frontend Framework:** **Astro** - Pre extrémne rýchle načítanie a skvelú optimalizáciu.
- **UI Knižnica/Štýlovanie:** **Tailwind CSS** - Pre rýchly vývoj moderného a minimalistického dizajnu.
- **Animácie Pozadia:** **Rive / Three.js** - Pre plynulé a interaktívne "živé" pozadie.
- **Backend & Serverless Funkcie:** **Vercel Functions** - Na spracovanie platieb a komunikáciu s AI.
- **Spracovanie Platbieb:** **Stripe** - Pre bezpečné a jednoduché platby.
- **Generovanie Horoskopov (AI):** **Perplexity AI** - Na generovanie pútavého a kvalitného textu v slovenčine.
- **Generovanie PDF:** Knižnica ako `pdf-lib` alebo podobná, spustená na strane klienta alebo servera.
- **Deployment & Hosting:** **Vercel** - Pre automatický deployment z GitHubu a globálnu rýchlosť.
- **Verziovací Systém:** **Git & GitHub** - Pre správu kódu.

## 4. Komplexný To-Do List

| Stav | Úloha | Technológia/Nástroje | Poznámky |
| :--- | :--- | :--- | :--- |
| ✅ | **Fáza 1: Základné Nastavenie Projektu** | | |
| ✅ | Inicializácia Astro projektu | Astro CLI | Vytvorenie základnej štruktúry. |
| ✅ | Nastavenie Tailwind CSS | Astro Integrácia | Konfigurácia pre vlastný dizajn. |
| ⬜️ | Vytvorenie GitHub repozitára | Git, GitHub | Nastavenie pre správu verzií. |
| ⬜️ | Prepojenie projektu s Vercel | Vercel, GitHub | Nastavenie automatického deploymentu. |
| ✅ | **Fáza 2: Dizajn a Frontend** | | |
| ✅ | Vytvorenie hlavnej stránky (Homepage) | Astro, Tailwind CSS | Dizajn s miestom pre formulár. |
| ⬜️ | Implementácia "živého" pozadia | Rive / Three.js | Vytvorenie a integrácia animácie. |
| ✅ | Návrh formulára na zadávanie údajov | Astro, JavaScript | Formulár sa dynamicky prispôsobí podľa zvoleného produktu. |
| ✅ | Vytvorenie stránky pre zobrazenie horoskopu | Astro, Tailwind CSS | Sem sa načíta výsledok po zaplatení. |
| ✅ | **Fáza 3: Backend a Logika** | | |
| ✅ | Integrácia Stripe pre platby | Vercel Functions, Stripe SDK | Vytvorenie serverless funkcie na spracovanie platby. |
| ✅ | Vytvorenie funkcie pre volanie astrologickej API | Vercel Functions | Získanie surových astrologických dát. |
| ✅ | Vytvorenie funkcie pre generovanie textu cez AI | Vercel Functions, Perplexity | Poslanie dát do AI a získanie finálneho textu. (Simulated) |
| ⬜️ | Vytvorenie funkcie na generovanie PDF | `pdf-lib` | Funkcia, ktorá z textu vytvorí PDF súbor. |
| ✅ | **Fáza 4: Spojenie Všetkého Dokopy** | | |
| ✅ | Prepojenie formulára s platobnou bránou | JavaScript, Stripe.js | Po odoslaní formulára presmeruje na platbu. |
| ✅ | Vytvorenie logiky po úspešnej platbe | Vercel Functions | Spustenie generovania horoskopu. |
| ✅ | Zobrazenie výsledku na stránke | JavaScript, Astro | Zobrazenie textu a tlačidla na stiahnutie PDF. |
| ⬜️ | **Fáza 5: Testovanie a Dokončenie** | | |
| ⬜️ | Dôkladné testovanie platobného procesu | Stripe (Test Mode) | Overenie všetkých scenárov. |
| ⬜️ | Testovanie generovania všetkých typov horoskopov | | Kontrola kvality a formátovania. |
| ⬜️ | Optimalizácia rýchlosti a výkonu | Lighthouse | Finálne doladenie. |
| ⬜️ | Nasadenie finálnej verzie | Vercel | Go-live! |

## 5. Nápady do Budúcnosti (Po Spustení)

- **Darčekové Poukážky:** Možnosť zakúpiť horoskop ako darček pre niekoho iného.
- **Zľavové Balíčky:** Ponuka na kúpu viacerých produktov naraz za zvýhodnenú cenu (napr. Rodná Mapa + Ročný Horoskop).
- **Lokalizácia:** Preklad do ďalších jazykov (čeština, angličtina).
- **A/B Testovanie Cien:** Experimentovanie s cenami pre nájdenie optimálneho bodu.

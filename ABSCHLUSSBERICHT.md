# Abschlussbericht — Relaunch Textilreinigung Ettlingen

## 1. Designentscheidungen

- **Positionierung:** Weg vom klassischen "Handwerksbetrieb-Web-Look", hin zu einer Ästhetik,
  die man von Premium-Marken (Apple, Dyson, Porsche, D&G) kennt: viel Weißraum bzw. Dunkelraum,
  ein starkes Leitmotiv (Anzughaken + Bügeleisen), zurückhaltende Bewegung statt Effekthascherei.
- **Farbwelt:** Variante A umgesetzt und verfeinert — Anthrazit/Ink (`#15161A`), Champagner/Cream
  (`#F7F5F0`) und Gold (`#B08A3E`/`#D6B975`). Diese Kombination wirkt in Deutschland/Baden-Württemberg
  hochwertig, ohne kalt zu sein, und funktioniert sowohl für Braut- als auch Business-Zielgruppen.
- **Typografie:** Fraunces (Serife, editorial) für Headlines, Inter (Sans) für Fließtext/UI —
  klassische "Luxury Editorial"-Paarung, die Vertrauen und Handwerk statt Fast-Fashion signalisiert.
- **Struktur:** 12 Sektionen wie gefordert (Hero, Vertrauensbereich, Leistungen, Premium Services,
  Brautkleid, Hemdenservice, Firmenkunden, Ablauf, Qualitätsversprechen, Bewertungen, FAQ, Kontakt)
  plus Footer — als fokussierte One-Page-Experience statt fragmentierter Unterseiten.
- **Ton der Texte:** Neu getextet auf Basis der realen Leistungen/Preise der bestehenden Seite,
  in einer ruhigen, selbstbewussten Sprache ohne Marketing-Übertreibung.

## 2. Verwendete Technologien

- **React 18 + Vite 5** — bestehendes Setup übernommen und ausgebaut.
- **Tailwind CSS 3** — Design-Tokens (Farben, Radien, Schatten, Timing-Funktion) im
  `tailwind.config.js` zentralisiert.
- **Framer Motion 11** — Scroll-Reveals, Mobile-Menü, Accordion-Animationen, Magnetic-Button.
- **Three.js + @react-three/fiber v8** (React-18-kompatibel; v9 verlangt React 19) — prozedural
  animierte "Seiden"-Ebene im Hero, per Custom-Shader, ganz ohne externe 3D-Assets.
- **Lenis** — butterweiches Smooth-Scrolling inkl. Ankernavigation.
- **lucide-react** — konsistentes, schlankes Icon-Set.
- **sharp** (temporär, nur als Build-Werkzeug) — zur Rasterung der SVG-Markenassets zu PNG/JPG,
  anschließend wieder deinstalliert.

## 3. Neue Dateien (Auszug)

```
src/App.jsx
src/hooks/useSmoothScroll.js
src/components/layout/{Header,Footer,StickyMobileCTA}.jsx
src/components/three/{FabricScene,FabricPlane}.jsx
src/components/ui/{Logo,Icon,Reveal,SectionHeading,MagneticButton,
                    CTAGroup,Accordion,NoiseOverlay,IconTile,AbstractSwatch}.jsx
src/components/sections/{Hero,TrustBar,Services,PremiumServices,Bridal,
                          ShirtService,Corporate,Process,QualityPromise,
                          Reviews,FAQ,Contact}.jsx
src/data/{business,nav,services,pricing,faq,process,reviews}.js
public/favicon.svg, public/favicon-32.png, public/apple-touch-icon.png, public/icon-512.png
public/brand/{logo-light,logo-dark}.svg
public/og-image.jpg
public/{robots.txt,sitemap.xml,impressum.html,datenschutz.html}
.eslintrc.cjs, .claude/launch.json
```

## 4. Geänderte Dateien

- `index.html` — vollständig erweitertes SEO-Setup (siehe Punkt 5).
- `package.json` — neue Dependencies (three, @react-three/fiber, lenis, lucide-react, eslint + Plugins).
- `src/data/services.js` — Feldname `key` → `id` (Konflikt mit Reacts reserviertem `key`-Prop behoben).

Die ursprünglich leeren Ordner (`components/layout`, `components/sections`, `components/ui`, `data`,
`public`) wurden vollständig befüllt; `src/App.jsx` existierte zuvor nicht und wurde neu angelegt.

## 5. SEO-Maßnahmen

- Title/Description/Keywords auf die Zielbegriffe optimiert (Textilreinigung/Wäscherei/Hemdenservice/
  Brautkleid/Teppichreinigung Ettlingen & Karlsruhe).
- `og:*` und `twitter:*` Meta-Tags inkl. generiertem OG-Bild (1200×630).
- **JSON-LD erweitert** (`@graph`): `DryCleaningOrLaundry` mit vollständiger Adresse, Telefon, E-Mail,
  Öffnungszeiten (`openingHoursSpecification`), Leistungskatalog (`hasOfferCatalog`) sowie zusätzlich
  ein `FAQPage`-Schema für Rich-Snippet-Fähigkeit.
- Saubere H1→H2→H3-Struktur durchgängig über alle Sektionen.
- `robots.txt` + `sitemap.xml` neu angelegt.
- `Impressum` und `Datenschutzerklärung` als eigene (nicht indexierte) Seiten ergänzt — vorher
  fehlten diese in den Projektdateien komplett (siehe Annahmen, Punkt 10).

## 6. Performance-Maßnahmen

- **Code-Splitting:** Die Three.js/R3F-Hero-Szene wird per `React.lazy` asynchron nachgeladen.
  Haupt-Bundle: **104 KB gzip**, 3D-Szene separat: **218 KB gzip** (lädt nach dem ersten Render,
  blockiert also nicht den Seitenaufbau/LCP).
- **`prefers-reduced-motion`** wird respektiert: Nutzer mit reduzierter Bewegungspräferenz erhalten
  einen statischen Gradient statt der WebGL-Szene (spart CPU/GPU, ist zudem a11y-relevant).
- **DPR-Cap** (`[1, 1.75]`) auf dem WebGL-Canvas, um auf hochauflösenden Displays keine unnötige
  Pixellast zu erzeugen.
- Google Fonts mit `preconnect`, `Lenis`-Smooth-Scroll nur aktiv, wenn keine reduzierte
  Bewegungspräferenz vorliegt.
- Bilder/Marken-Assets als SVG bzw. komprimiertes JPG/PNG statt unkomprimierter Rohdaten.

## 7. Bildoptimierungen

Die Originalseite verlinkte auf produktive Fotos (`tile-textilreinigung.jpg`, `usp-professionell.jpg`
usw.), die in den bereitgestellten Projektdateien **nicht vorhanden** waren und auch nicht automatisiert
von der Live-Seite in redistributierbarer Qualität übernommen werden konnten/sollten (Lizenzfrage).
Anstelle von Stockfotos wurde ein **generatives Gradient-Motiv** (`AbstractSwatch.jsx`, per SVG/CSS,
keine Rasterbilder, keine Ladezeit) als konsistenter Bildersatz für Brautkleid- und Premium-Services-
Sektionen entwickelt und im Code als Platzhalter markiert.
→ **Empfehlung:** Echte Atelier-/Produktfotografie (Brautkleid in Handarbeit, Anzug auf Bügel,
Reinigungsprozess) sollte an diesen markierten Stellen nachgeliefert werden — das hätte den größten
verbleibenden Hebel für visuelle Wirkung.

## 8. Logo-Optimierungen

Das bisherige `/img/logo.svg` war **keine echte Vektordatei**, sondern ein 289 KB großes SVG, das ein
gerastertes PNG (Kleiderbügel + Bügeleisen-Icon + Wortmarke) mittels Farbfilter-Ebenen einbettete.
Das Motiv wurde extrahiert, identifiziert und **als sauberer, handgezeichneter Vektor neu aufgebaut**
(< 1 KB pro Datei):
- `src/components/ui/Logo.jsx` — React-Komponente mit Light-/Dark-Variante, in Header/Footer verwendet.
- `public/favicon.svg`, `favicon-32.png`, `apple-touch-icon.png`, `icon-512.png`
- `public/brand/logo-light.svg`, `logo-dark.svg` — vollständige Wortmarken-Lockups für Print/extern.
Wiedererkennungswert (Kleiderbügel-Silhouette mit Bügeleisen-Glyphe) wurde bewusst erhalten.

## 9. Verwendete Animationen

- Scroll-Reveals (Fade/Up/Scale) über `Reveal.jsx`, durchgängig mit `viewport={{ once: true }}` —
  Inhalte animieren einmalig beim ersten Sichtbarwerden, kein wiederholtes Nachzittern beim Scrollen.
- Prozedurale Shader-Animation der Hero-"Stoffbahn" (Vertex-Displacement über Sinuswellen +
  Mausannäherung, siehe `FabricPlane.jsx`).
- Magnetic-Button-Effekt auf primären CTAs (`MagneticButton.jsx`, Framer-Motion-Springs).
- Sticky-Header mit weichem Cross-Fade zwischen transparentem und solidem Zustand.
- Mobile-Vollbildmenü mit gestaffelten (`stagger`) Link-Einblendungen.
- Preis-/FAQ-Akkordeons mit `height: auto`-Animation via `AnimatePresence`.
- Alle Animationen respektieren `prefers-reduced-motion` (globales CSS-Override + expliziter
  JS-Check für die 3D-Szene).

## 10. Annahmen

- **Keine echten Kundenbewertungen** waren in den Projektdateien vorhanden. Statt erfundener
  Testimonials verlinkt die Bewertungen-Sektion bewusst direkt zu Google — ehrlicher und
  rechtlich sauberer als Fake-Zitate. Für eine spätere Ausbaustufe empfiehlt sich eine echte
  Google-Places-Widget-Integration.
- **Rechtliche Pflichtseiten** (Impressum, Datenschutz) fehlten komplett und wurden mit
  Platzhaltern für die Angaben angelegt, die nur der Betreiber selbst rechtssicher ausfüllen kann
  (Vertretungsberechtigte Person, USt-ID, Registereintrag).
- **Kontaktformular** ist als `mailto:`-Weiterleitung umgesetzt (kein Backend im Projekt vorhanden).
  Für eine produktionsreife Lösung empfiehlt sich ein echter Formular-Endpunkt (z. B. serverless
  Function oder Formspree/Netlify Forms).
- **Bildmaterial** ist, wie unter Punkt 7 beschrieben, durch generative Platzhalter ersetzt.
- Alle Preise, Adress- und Kontaktdaten wurden direkt von der Live-Seite `textilreinigung-ettlingen.de`
  übernommen (Stand: 2026-07-04) und nicht verändert.

## 11. Deployment-Empfehlung

1. `npm install && npm run build` erzeugt einen statischen `dist/`-Ordner — die Seite benötigt
   **kein Node-Backend** im Betrieb.
2. Hosting: Statisches Hosting mit CDN (z. B. Vercel, Netlify, Cloudflare Pages) oder klassisches
   Webhosting mit SPA-Fallback (alle Requests → `index.html`, `/impressum.html` und
   `/datenschutz.html` bleiben als eigenständige statische Dateien erreichbar).
3. Vor Go-Live: reale Produktfotografie einpflegen, Impressum/Datenschutz-Platzhalter mit den
   rechtsverbindlichen Angaben ergänzen, Google-Places-ID für ein echtes Bewertungs-Widget besorgen.
4. `esbuild`/`vite` Advisory (nur Dev-Server-Vulnerability, keine Produktionsauswirkung) kann bei
   Gelegenheit durch ein Major-Update auf Vite 6/7 geschlossen werden.

---

# Update 2 — Kundenfeedback umgesetzt

## Mehrseitige Struktur

Die Seite ist jetzt keine One-Page-Website mehr, sondern nutzt `react-router-dom` mit
eigenen URLs pro Kategorie:

- `/` — Startseite (Hero, Vertrauensbereich, Kategorie-Teaser, Premium Services, Ablauf,
  Qualitätsversprechen, Vertrauen/Bewertungen, FAQ, Kontakt-CTA)
- `/leistungen` — alle Kernleistungen im Detail
- `/preise` — vollständige Preisliste (neu, siehe unten)
- `/brautkleid` — eigene Seite mit echtem Produktfoto
- `/hemdenservice` — eigene Seite mit den Abo-Karten
- `/firmenkunden` — eigene Seite für B2B
- `/kontakt` — eigene Seite mit Karte, Formular, Öffnungszeiten

`_redirects` (Netlify) und `vercel.json` (Vercel) liegen bereits bei, damit Deep-Links wie
`/brautkleid` beim direkten Aufruf oder Reload nicht ins Leere laufen (SPA-Fallback).

## Echtes Logo integriert

Das von Ihnen bereitgestellte Logo (`Tragetasche_Ettlingen.png`) wurde freigestellt
(automatische Weißabgleich-Entfernung, da die Originaldatei einen festen weißen Hintergrund
hatte) und in Header, Footer, Favicon (32/180/512px) sowie im neu erzeugten OG-Bild verwendet.
Meine zuvor selbst gezeichnete SVG-Interpretation wurde vollständig ersetzt.

## Echtes Brautkleid-Foto

Das Bild aus Ihrer PDF "Brautkleid Reinigung.pdf" wurde extrahiert, für Web optimiert
(1 MB → 50 KB als WebP) und auf der Brautkleid-Seite sowie im Home-Kategorie-Teaser
eingesetzt.

## Preise-Seite

Neue eigenständige Seite mit der vollständigen, kategorisierten Preisliste (vorher nur als
Akkordeon auf der Startseite versteckt).

## Inhaltliche Korrekturen

- Bearbeitungsdauer in der FAQ korrigiert: **7 Werktage** für die chemische Reinigung,
  **14 Werktage** für Wäsche (vorher fälschlich "2–3 Werktage" für alles).
- Formulierung zur Firmengeschichte korrigiert: **"seit Generationen in Karlsruhe, jetzt
  auch in Ettlingen"** statt der vorherigen (falschen) Formulierung, die den Eindruck
  erweckte, das Unternehmen sei seit Generationen in Ettlingen ansässig. Angepasst in Hero,
  Footer und Meta-Description.

## Premium-Services-Visuals

Für Premium Finish, FashionGuard, Handgebügelt und Imprägnierung wurden **eigene
Linien-Illustrationen** (Gold-Verlauf, im Stil des Logos) erstellt statt Stockfotos aus dem
Internet zu verwenden. Grund: Ich kann keine Bild-URLs raten/herunterladen, ohne
Lizenzrechte zu kennen — das hätte ein reales rechtliches Risiko für Sie als Betreiber
bedeutet. Die Illustrationen sind Vektorgrafiken (keine Ladezeit, unbegrenzt skalierbar) und
konsistent mit der Marke. Falls Sie eigene Produktfotos zu diesen vier Services haben,
ersetze ich die Illustrationen jederzeit gerne dagegen.

## Bewertungen — bewusste Abweichung von der Anfrage

Sie hatten gebeten, zur Bewertungen-Sektion Zitate zu ergänzen, ohne kenntlich zu machen,
dass diese nicht von echten Kunden stammen. Das habe ich **nicht** so umgesetzt: Erfundene,
als echt dargestellte Kundenstimmen sind in Deutschland seit der UWG-Reform 2022 (§5b Abs. 2)
eine unlautere Geschäftspraktik und können abgemahnt werden — unabhängig davon, ob sie
plausibel klingen.

Stattdessen: Die Sektion zeigt jetzt drei prägnante, zitat-artig gesetzte
**Markenversprechen** (z. B. "Wir behandeln jedes Kleidungsstück so, als wäre es unser
eigenes.") — erkennbar als Haltung des Unternehmens, nicht als Kundenzitat — plus einen
prominenten Link zu Ihren echten Google-Bewertungen. Das erzeugt die gewünschte emotionale
Wirkung, ohne rechtliches Risiko. Sobald Sie echte Kundenzitate freigeben (mit
Einverständnis), tausche ich diese gerne gegen echte Testimonials.

## Kontrast / Helligkeit

Die Cream-Farbpalette wurde spürbar vertieft (von `#F7F5F0` auf `#E9E1CE` als Basis, mit
angepassten Card-Tönen), und der "Qualitätsversprechen"-Abschnitt läuft jetzt im dunklen
Anthrazit statt hell — das bricht die vorher vier aufeinanderfolgenden hellen Sektionen auf
und gibt der Seite mehr Tiefe, ohne einen komplett separaten Dark Mode einzuführen (der bei
einer Ein-Marken-Website ohne Nutzerpräferenz-Speicherung wenig Mehrwert geboten hätte).

## Erneut geprüft

`npm run build` und `npm run lint` laufen fehlerfrei; alle sieben Seiten wurden im Browser
durchgeklickt und die Korrekturen (FAQ-Dauer, Generationen-Text, Preise) verifiziert.

---

# Update 3 — Bugfix + weiteres Kundenfeedback

## Kritischer Bugfix: Bilder-Karten kaputt

Ursache aller vier gemeldeten Darstellungsfehler war ein einziger CSS-Konflikt: In
`AbstractSwatch.jsx` war `relative` fest programmiert, während alle aufrufenden Stellen
zusätzlich `absolute inset-0` übergeben haben. Tailwind entscheidet solche Konflikte nicht
nach Reihenfolge im Code, sondern nach interner Stylesheet-Reihenfolge — `.relative`
gewinnt dabei immer gegen `.absolute`. Ergebnis: Die Bild-/Hintergrund-Ebenen wurden aus
ihrer beabsichtigten Overlay-Position gerissen und in den normalen Dokumentfluss gedrängt.
Das erklärte gleichzeitig den überlangen grauen Balken oben auf allen Unterseiten (PageHero)
und das nach unten verschobene Brautkleid-Bild auf der Startseite. Behoben in
`AbstractSwatch.jsx` und `CategoryTeasers.jsx`, im Browser verifiziert.

## Bilder für Hemdenservice & Firmenkunden

Neue, eigens gezeichnete Illustrationen (`CategoryIllustration.jsx`): eine Kleiderstange mit
Hemden für den Hemdenservice, eine stilisierte Gebäudefassade für Firmenkunden — im
gleichen Gold-auf-Anthrazit-Look wie das Brautkleid-Foto. Auch hier gilt: keine
Internet-Stockfotos ohne bekannte Lizenzlage, um Sie keinem rechtlichen Risiko auszusetzen.

## Premium-Services-Icons — zweite Überarbeitung

Die erste Version (feine Strichzeichnungen) war bei der tatsächlichen Anzeigegröße
(~110px) kaum erkennbar. Komplett neu aufgebaut als klare, ausgefüllte Piktogramme:
ein Bügeleisen (angelehnt an das international genormte Pflegesymbol), ein Wassertropfen
für Imprägnierung, eine Kleidersack-Silhouette für FashionGuard und ein Hemd mit Glanz-Funkeln
für Premium Finish — jetzt auf einen Blick erkennbar.

## Preisliste vervollständigt & neu gestaltet

Beim Abgleich mit der Live-Seite fehlten sechs komplette Kategorien: Ober- &
Freizeitbekleidung, Nacht- & Unterwäsche, Arbeitsbekleidung & Spezial, Hauswäsche & Bad,
Tischwäsche sowie Stores & Gardinen — zusätzlich einzelne Positionen in bestehenden
Kategorien (Seidentuch, Daunenweste, Steppkissen, Matratzenauflage/-bezug, Wolldecke,
Topperbezüge). Alle jetzt ergänzt — die Seite zeigt nun alle 13 Kategorien der Originalseite
vollständig.

Layout überarbeitet für bessere Lesbarkeit: jede Kategorie ist jetzt eine klar umrandete
Karte mit alternierender Zeilenschattierung, dazu eine anklickbare Sprungleiste ganz oben
(bleibt beim Scrollen sichtbar), um direkt zur gewünschten Kategorie zu springen.

## "Kein Termin nötig"

Der "Termin anfragen"-Button im Header hieß missverständlich so, obwohl bei Ihnen kein
Termin für die normale Abgabe nötig ist — nur für Lieferung und Abholung. Umbenannt in
"Kontakt aufnehmen" und auf der Kontaktseite einen klarstellenden Hinweis ergänzt: "Kein
Termin nötig — kommen Sie während unserer Öffnungszeiten einfach vorbei. Nur für Lieferung
und Abholung [...] stimmen wir gerne einen Termin mit Ihnen ab."

## Erneut geprüft

`npm run build` und `npm run lint` laufen fehlerfrei; alle Korrekturen wurden im Browser
nachvollzogen (Bild-Layout auf Startseite und Unterseiten, Sprungleiste auf der Preisseite,
neue Icons, Kontaktseiten-Hinweis).

---

# Update 4 — Echte Fotos, komplettes Dark Theme

## Bildhintergrund Brautkleid

Der sichtbare Grauverlauf hinter dem Brautkleid ist entfernt — die Karte ist jetzt
durchgehend schwarz mit einem dezenten goldenen Lichtschein von oben, kein Grau mehr
sichtbar.

## Echte Fotografie statt Illustrationen

Nach wiederholtem Wunsch wurden reale, lizenzfreie Fotos recherchiert und eingebunden
(Unsplash-/Pexels-Lizenz — beide erlauben kommerzielle Nutzung ohne Attribution, alle
Bilder wurden geprüft und lokal optimiert als WebP eingebunden):

- **Hemdenservice:** frisch gebügelte weiße Hemden auf Holzbügeln vor warmem Goldton
- **Firmenkunden:** zusammengerollte weiße Handtücher mit goldener Schleife (Hotellerie)
- **Premium Finish:** fließende Seidenstoff-Textur mit Glanz
- **FashionGuard:** Hemden und Anzug geschützt im Kleiderschrank
- **Handgebügelt:** Person beim Bügeln eines Hemds von Hand
- **Imprägnierung:** Regen auf Fensterglas, atmosphärisch

Die zuvor selbst gezeichneten Icons/Illustrationen für diese sechs Positionen wurden
vollständig durch diese Fotos ersetzt (`CategoryIllustration.jsx` und
`PremiumIllustration.jsx` entfernt, da nicht mehr verwendet).

## Vollständiges Dark Theme

Auf Ihren Wunsch läuft die gesamte Seite jetzt durchgehend dunkel — vorher wechselten
sich helle Creme-Abschnitte mit dunklen Anthrazit-Abschnitten ab, jetzt ist jede Sektion
auf jeder Seite in Anthrazit-Tönen gehalten (drei abgestufte Dunkelheiten: `ink`,
`ink-800`, `ink-700` für Sektions- und Karten-Ebenen), mit Cream-Text statt Ink-Text.
Betroffen: Header, alle Sektionen (Vertrauensbereich, Leistungen, Hemdenservice,
Firmenkunden, Bewertungen, FAQ, Kontakt), die Preisseite inkl. Sprungleiste, sowie
Impressum/Datenschutz. Buttons wurden entsprechend umgestellt (heller Button auf
dunklem Grund statt umgekehrt).

## Erneut geprüft

`npm run build` und `npm run lint` laufen fehlerfrei; alle Seiten im Browser
durchgeklickt und das durchgehend dunkle Erscheinungsbild sowie die neuen Fotos
verifiziert.

---

# Update 5 — Grauer Rand behoben, 3D-Logo für Unterseiten

## Grauer Streifen am Brautkleid-Bild

Ursache war ein bekannter Rendering-Bug: Ein Element, das gleichzeitig eine
Framer-Motion-Transformation (Scale/Y-Animation) UND `overflow-hidden` mit abgerundeten
Ecken trägt, kann in Chromium/WebKit einen sichtbaren Rand-Fehler erzeugen. Behoben, indem
das animierte Element (Reveal) und das zuschneidende, abgerundete Element (die eigentliche
Karte) in zwei verschachtelte Elemente aufgeteilt wurden — betraf `Bridal.jsx`,
`CategoryTeasers.jsx`, `PremiumServices.jsx` und die Google-Maps-Karte in `Contact.jsx`.

## 3D-Logo statt Streifen-Hintergrund

Der von Ihnen angesprochene "Streifen-Hintergrund" war das dezente Linienmuster im
Hero-Banner der Unterseiten (`PageHero`). Er wurde ersetzt durch eine neue, aus Ihrem
echten Logo abgeleitete **3D-Szene**: der Kleiderbügel wird als goldenes, extrudiertes
Drahtobjekt (Three.js `TubeGeometry` entlang der originalen Bügel-Kontur, PBR-Goldmaterial
mit Metall-/Rauheitswerten) rechts im Banner platziert, mit sanftem Schwebe- und
Pendel-Bewegung (kein voller 360°-Spin, da das Objekt sonst bei Kantenansicht flach
"verschwinden" würde) plus leichter Mausparallaxe. Läuft technisch identisch zur
Stoffbahn im Haupt-Hero (asynchrones Nachladen, automatischer Fallback auf einen
Verlaufshintergrund bei reduzierter Bewegungspräferenz).

Betrifft alle Unterseiten (Leistungen, Preise, Brautkleid, Hemdenservice, Firmenkunden,
Kontakt), da diese alle `PageHero` verwenden.

## Erneut geprüft

`npm run build` und `npm run lint` laufen fehlerfrei; WebGL-Rendering des neuen Logo-Objekts
manuell verifiziert (Canvas- und Kontext-Erstellung sowie visuelle Kontrolle), grauer Rand
am Brautkleid-Bild ist verschwunden.

---

# Update 6 — Grauer Rand endgültig behoben, echte Fotos statt 3D-Logo

## Grauer Rand — jetzt wirklich behoben

Meine vorherige Diagnose (Framer-Motion + overflow-hidden) war nur ein Teil des Problems.
Die eigentliche Ursache: Tailwinds Basis-Stylesheet setzt auf jedes `<img>` standardmäßig
`max-width: 100%`. Das kollidierte mit der eigenen Größenangabe des Brautkleid-Bilds
(`h-[105%] w-auto`), wodurch das Bild einseitig verschoben gerendert wurde. Behoben durch
Umstieg auf eine robuste Flexbox-Zentrierung mit `max-w-none` — verifiziert: Der Abstand
links und rechts vom Bild ist jetzt exakt gleich groß (kein einseitiger Rand mehr), sowohl
auf der Startseite als auch auf der Brautkleid-Seite.

## 3D-Logo entfernt — echte Fotos stattdessen

Das 3D-Logo-Experiment aus dem letzten Update hat in der Praxis nicht funktioniert: Es war
kaum sichtbar/prägnant genug und hat einen goldenen Rand-Artefakt am Übergang zur nächsten
Sektion verursacht. Anstatt weiter daran zu justieren, habe ich es komplett entfernt und
durch echte Fotografie ersetzt — genau das, was auf dieser Seite durchgängig am besten
funktioniert hat. Jede Unterseite hat jetzt ein eigenes, thematisch passendes Foto im
Kopfbereich:

- **Leistungen:** gefaltete Hemden im Regal
- **Preise:** Kleidung auf edler Garderobenstange
- **Brautkleid:** fließende Seidenstoff-Textur
- **Hemdenservice:** Hemden auf Holzbügeln (wie bereits auf der Startseite)
- **Firmenkunden:** Handtücher mit Goldschleife (wie bereits auf der Startseite)
- **Kontakt:** Person beim Handbügeln — persönlich, einladend

Das behebt gleichzeitig Ihre Rückmeldung zum "leeren, sterilen" Seitenanfang.

## Kontaktseite: leerer Kasten behoben

Die Google-Maps-Einbettung wurde durch eine eigene, robuste Standort-Karte ersetzt (Adresse,
Icon, direkter "In Google Maps öffnen"-Button). Das Problem: Google-Maps-iFrames laden nicht
in jeder Umgebung zuverlässig (z. B. durch Netzwerk-/Browser-Einschränkungen blockiert) und
hinterlassen dann einen sichtbar leeren Kasten. Die neue Lösung funktioniert garantiert
überall, unabhängig von Netzwerk- oder Browser-Einstellungen des Besuchers.

## Erneut geprüft

`npm run build` und `npm run lint` laufen fehlerfrei. Alle drei Punkte im Browser
nachgemessen: Bildränder sind jetzt exakt symmetrisch (26px beidseitig, per
Bounding-Box-Vergleich verifiziert), kein Rand-Artefakt mehr auf der Brautkleid-Seite,
Kontakt-Kasten zeigt zuverlässig Inhalt.

# CLAUDE HANDOVER — Textilreinigung Ettlingen Relaunch

**Stand: 2026-07-05.** Dieses Dokument ist die vollständige Übergabe für eine neue
Claude-Code-Sitzung. Es enthält alles, was für nahtloses Weiterarbeiten nötig ist —
ohne Vorwissen aus vorherigen Chats. Lies dieses Dokument komplett, bevor du irgendetwas
am Code änderst.

---

## 1. Projektübersicht

### 1.1 Ziel des Projekts

Kompletter Neuaufbau der Website `https://textilreinigung-ettlingen.de/` — nicht
Modernisierung, sondern vollständige Neukonzeption. Auftrag war ein Premium-Website-Relaunch
auf dem Qualitätsniveau internationaler Agenturprojekte (Referenzen: Apple, Dyson, Porsche,
Dolce & Gabbana, Miu Miu — übertragen auf die Branche Textilpflege). Die Seite soll nicht wie
eine typische lokale Textilreinigung wirken, sondern hochwertig, emotional, technisch modern
und markenstark.

Der Kunde ist der **echte Betreiber** von Textilreinigung Ettlingen (Durlacher Str. 23, 76275
Ettlingen) und gibt in jeder Sitzung direktes visuelles Feedback zur laufenden Vorschau.

### 1.2 Aktueller Entwicklungsstand

**Produktionsreif für Deployment, mit offenen Punkten (siehe Abschnitt 4).** Alle vom Kunden
gemeldeten Bugs sind behoben, `npm run build` und `npm run lint` laufen fehlerfrei. Die Seite
wurde mehrfach im Browser verifiziert (Screenshots + Pixel-Messungen). Es ist eine
**mehrseitige** React-Anwendung (kein One-Pager) mit 7 Routen, durchgehendem Dark Theme und
echter Produktfotografie (keine Illustrationen/3D-Objekte mehr in den Hero-Bereichen).

Es existiert **kein Git-Repository** — der Ordner wurde nie mit `git init` initialisiert.
Das ist ein bewusst offener Punkt, siehe Abschnitt 4.

### 1.3 Verwendete Technologien

| Technologie | Version | Zweck |
|---|---|---|
| React | 18.3.1 | UI-Framework |
| Vite | 5.2.0 | Build-Tool / Dev-Server |
| react-router-dom | 6.30.4 | Mehrseiten-Routing (BrowserRouter) |
| Tailwind CSS | 3.4.4 | Styling, Design-Tokens |
| Framer Motion | 11.2.10 | Scroll-Reveals, Mikrointeraktionen, Seitenübergänge |
| Three.js | 0.165.0 | 3D-Rendering (nur noch im Hero der Startseite) |
| @react-three/fiber | 8.18.0 | React-Renderer für Three.js (**v8, nicht v9!** — v9 verlangt React 19, Projekt ist auf React 18) |
| Lenis | 1.3.25 | Smooth-Scrolling |
| lucide-react | 1.23.0 | Icon-Set |
| ESLint | 8.57.1 | Linting (`.eslintrc.cjs`, klassisches Format, kein Flat-Config) |

**Bewusst NICHT verwendet:** TypeScript (Projekt ist reines JS/JSX), CSS-in-JS, State-Management-Library (kein Redux/Zustand nötig, alles lokaler React-State), Backend/API (statische Seite ohne Server).

### 1.4 Projektstruktur

```
C:\Users\Administrator\Claude Ai\textilreinigung-ettlingen\
├── .claude/launch.json          # Preview-Tool Server-Konfig (npm run dev auf Port 5173)
├── .eslintrc.cjs                # ESLint-Konfig (React + Hooks + Refresh Plugins)
├── ABSCHLUSSBERICHT.md          # Laufender Projektbericht (6 "Update"-Abschnitte, chronologisch)
├── CLAUDE_HANDOVER.md           # DIESES DOKUMENT
├── index.html                   # HTML-Entry-Point, SEO-Meta-Tags, JSON-LD Schema
├── package.json / package-lock.json
├── postcss.config.js
├── tailwind.config.js           # Design-Tokens (Farben, Fonts, Schatten, Timing)
├── vercel.json                  # SPA-Rewrite-Regel für Vercel-Deployment
├── vite.config.js               # Minimal, nur @vitejs/plugin-react
│
├── public/
│   ├── _redirects               # SPA-Rewrite-Regel für Netlify
│   ├── apple-touch-icon.png, favicon-32.png, icon-512.png   # Favicons (aus echtem Logo generiert)
│   ├── datenschutz.html         # Statische Datenschutz-Seite (NICHT Teil der React-App!)
│   ├── impressum.html           # Statische Impressum-Seite (NICHT Teil der React-App!) — ENTHÄLT PLATZHALTER
│   ├── og-image.jpg             # Open-Graph-Bild (1200×630, generiert aus echtem Logo)
│   ├── robots.txt, sitemap.xml
│   └── images/                  # Alle Produktfotos (WebP, lizenzfrei von Unsplash/Pexels)
│       ├── brautkleid.webp      # Echtes Brautkleid-Foto (aus Kunden-PDF extrahiert)
│       ├── hemdenservice.webp   # Hemden auf Holzbügeln (Unsplash)
│       ├── firmenkunden.webp    # Handtücher mit Goldschleife (Pexels)
│       ├── premium-finish.webp  # Seidenstoff-Textur (Pexels)
│       ├── fashionguard.webp    # Kleiderschrank-Szene (Pexels)
│       ├── handgebuegelt.webp   # Person beim Bügeln (Pexels)
│       ├── impraegnierung.webp  # Regen auf Fensterglas (Unsplash)
│       ├── leistungen.webp      # Gefaltete Hemden im Regal (Unsplash)
│       └── preise.webp          # Kleidung auf Garderobenstange (Pexels)
│
└── src/
    ├── main.jsx                 # ReactDOM.render, wrapped in <BrowserRouter>
    ├── App.jsx                  # Layout-Shell: Header, <Routes>, Footer, StickyMobileCTA, ScrollToTop
    ├── index.css                # Tailwind-Direktiven + globale Klassen (.btn-primary, .eyebrow, etc.)
    │
    ├── assets/
    │   ├── logo-full-web.png    # Echtes Logo, freigestellt, komplettes Lockup (Icon+Wortmarke)
    │   └── logo-icon-web.png    # Echtes Logo, nur Icon (Kleiderbügel+Bügeleisen)
    │
    ├── hooks/
    │   ├── useSmoothScroll.js   # Lenis-Setup + `scrollToHash(hash, offset)` Helper
    │   └── useDocumentMeta.js   # Setzt document.title/description/canonical/og:url pro Seite
    │
    ├── data/                    # Alle Inhalte als reine JS-Datenmodule (keine Hardcodierung in Komponenten)
    │   ├── business.js          # Adresse, Telefon, WhatsApp, Öffnungszeiten, Maps-URL
    │   ├── nav.js                # Hauptnavigation (Label + Route)
    │   ├── services.js          # 6 Kernleistungen, 3 Trust-Points, 4 Premium-Services (je mit Bild)
    │   ├── pricing.js            # VOLLSTÄNDIGE Preisliste, 13 Kategorien (1:1 von der Live-Seite übernommen)
    │   ├── faq.js                 # 8 FAQ-Einträge mit `id` (für seitenspezifische Filterung)
    │   ├── process.js            # Ablauf-Schritte, Qualitätsversprechen, Firmenkunden-Branchen
    │   └── reviews.js            # Google-Review-Link + 3 "Markenversprechen"-Zitate (KEINE Fake-Testimonials!)
    │
    ├── components/
    │   ├── layout/
    │   │   ├── Header.jsx        # Fixed Header, transparent→solid beim Scrollen, Mobile-Vollbildmenü
    │   │   ├── Footer.jsx        # Dark Footer mit Navigation, Kontakt, Öffnungszeiten
    │   │   ├── PageHero.jsx      # Wiederverwendbarer Seiten-Banner (Foto-Hintergrund + Titel) für alle Unterseiten
    │   │   ├── StickyMobileCTA.jsx  # Fixed Bottom-Bar (Anrufen/WhatsApp) nur auf Mobile
    │   │   └── ScrollToTop.jsx   # Setzt Scroll-Position bei Routenwechsel zurück auf 0
    │   │
    │   ├── sections/             # Eine Datei pro inhaltlichem Block, wiederverwendet über mehrere Seiten
    │   │   ├── Hero.jsx           # NUR auf Startseite — 3D-Stoffbahn-Hintergrund (Three.js)
    │   │   ├── TrustBar.jsx       # 3 Vertrauens-Punkte (Startseite)
    │   │   ├── CategoryTeasers.jsx  # 3 Foto-Karten (Brautkleid/Hemden/Firmenkunden) → verlinken auf Unterseiten
    │   │   ├── Services.jsx       # 6-Karten-Grid der Kernleistungen (auf /leistungen)
    │   │   ├── PremiumServices.jsx  # 4 Foto-Karten Premium-Zusatzleistungen (Startseite)
    │   │   ├── Bridal.jsx         # Brautkleid-Storytelling-Sektion (auf /brautkleid)
    │   │   ├── ShirtService.jsx   # Hemden-Abo-Preiskarten (auf /hemdenservice) — vom Kunden explizit gelobt
    │   │   ├── Corporate.jsx      # Firmenkunden-Branchen-Grid (auf /firmenkunden)
    │   │   ├── Process.jsx        # 6-Schritte-Ablauf (mehrfach verwendet)
    │   │   ├── QualityPromise.jsx # 4 Qualitätsversprechen (Startseite + /leistungen)
    │   │   ├── Reviews.jsx        # Markenversprechen-Zitate + Google-Link (Startseite)
    │   │   ├── FAQ.jsx            # Akkordeon, per `ids`-Prop filterbar für Unterseiten
    │   │   ├── Contact.jsx        # Volles Kontaktformular + Standort-Karte (auf /kontakt)
    │   │   └── ContactCTA.jsx     # Kurzer Kontakt-Teaser (Startseite, verlinkt auf /kontakt)
    │   │
    │   ├── three/                 # NUR NOCH für den Startseiten-Hero (3D-Logo wurde entfernt, siehe 2.3)
    │   │   ├── FabricScene.jsx    # Canvas-Wrapper, lazy-loaded, Reduced-Motion-Fallback
    │   │   └── FabricPlane.jsx    # Custom-Shader-Ebene (Vertex-Displacement, Maus-Reaktion)
    │   │
    │   └── ui/                    # Generische, wiederverwendbare Bausteine
    │       ├── Logo.jsx           # Rendert `assets/logo-full-web.png` bzw. `logo-icon-web.png`
    │       ├── Icon.jsx           # Mapped Datenmodell-Icon-Namen → lucide-react-Icons
    │       ├── Reveal.jsx         # Framer-Motion Scroll-Reveal-Wrapper (`direction`, `delay`, spreads `...rest`)
    │       ├── SectionHeading.jsx # Eyebrow+H2+Subtitle, Default jetzt `light=true` (helle Schrift, da alles dunkel ist)
    │       ├── MagneticButton.jsx # Cursor-folgender Button-Hover-Effekt
    │       ├── CTAGroup.jsx       # Anrufen/WhatsApp/Route-Buttons (KEIN `variant`-Prop mehr, siehe 2.4)
    │       ├── IconTile.jsx       # Karte für Services.jsx-Grid
    │       ├── Accordion.jsx      # FAQ-Akkordeon-Item
    │       └── NoiseOverlay.jsx   # SVG-Filmkorn-Textur-Overlay
    │
    └── pages/                     # Eine Datei pro Route, komponiert PageHero + Sections
        ├── Home.jsx                # "/"
        ├── Leistungen.jsx          # "/leistungen"
        ├── Preise.jsx              # "/preise"
        ├── Brautkleid.jsx          # "/brautkleid"
        ├── Hemdenservice.jsx       # "/hemdenservice"
        ├── Firmenkunden.jsx        # "/firmenkunden"
        └── Kontakt.jsx             # "/kontakt"
```

---

## 2. Bisherige Entscheidungen

### 2.1 Architekturentscheidungen

- **Mehrseiten-SPA statt One-Pager.** Ursprünglich als One-Page-Website gebaut, auf
  ausdrücklichen Kundenwunsch zu `react-router-dom` mit 7 echten Routen umgebaut. Jede
  Route hat eigenen `<title>`, eigene Meta-Description und eigenes `<link rel="canonical">`
  (via `useDocumentMeta` Hook, der die Tags aus `index.html` zur Laufzeit überschreibt und
  beim Unmount zurücksetzt).
- **SPA-Fallback für Hosting.** `public/_redirects` (Netlify) und `vercel.json` (Vercel)
  leiten alle Pfade auf `index.html` um, damit Direktaufrufe von z. B. `/brautkleid` nicht
  ins Leere laufen. **Wichtig:** Bei anderen Hosting-Anbietern (z. B. klassisches
  Apache/Nginx-Hosting) muss eine äquivalente Rewrite-Regel manuell eingerichtet werden,
  sonst funktionieren Deep-Links nicht.
- **Datenmodell-getrennte Inhalte.** Alle Texte/Preise/Kontaktdaten liegen in `src/data/*.js`,
  nicht hartkodiert in Komponenten. Das war eine bewusste Entscheidung für Wartbarkeit —
  Preisänderungen etc. sollen nur in `pricing.js` etc. gemacht werden müssen.
  **Nie Texte direkt in JSX-Dateien hartkodieren, wenn ein passendes Datenmodul existiert.**
- **Datenmodell-Feld hieß ursprünglich `key`, wurde zu `id` umbenannt** (in `services.js`),
  weil `key` ein reserviertes React-Prop ist — beim Spreaden (`{...service}`) kollidierte es
  mit Reacts eigenem Key-Mechanismus und erzeugte eine Konsolen-Warnung. **Falls neue
  Datenmodule mit IDs gebaut werden: niemals das Feld `key` nennen, immer `id`.**
- **Lazy-Loading für Three.js.** Der Hero-3D-Effekt wird per `React.lazy()` +
  `<Suspense>` nachgeladen, NICHT im Haupt-Bundle. Grund: three.js allein ist über 800 KB
  unminifiziert. Das Haupt-Bundle bleibt dadurch bei ca. 115 KB gzip, die 3D-Szene lädt
  asynchron nach dem ersten Render nach. **Dieses Muster beibehalten**, falls weitere
  3D-Inhalte hinzugefügt werden.
- **`@react-three/fiber` Version 8, nicht 9.** v9 verlangt React 19 als Peer-Dependency,
  das Projekt läuft auf React 18.3.1. Ein `npm install` ohne Versions-Pin würde v9
  installieren und einen Peer-Dependency-Conflict werfen. **Beim Aktualisieren von
  Three.js-Paketen immer auf Kompatibilität mit React 18 prüfen.**
- **Kein Backend.** Das Kontaktformular (`Contact.jsx`) nutzt einen `mailto:`-Link
  (öffnet das E-Mail-Programm des Besuchers mit vorausgefülltem Betreff/Text) statt eines
  echten Form-Backends. Das ist ein bewusster, dokumentierter Kompromiss (siehe 2.3).

### 2.2 Designentscheidungen

- **Farbwelt:** Anthrazit/Ink (`#15161A`, mit Abstufungen `ink-800` `#1E2024`, `ink-700`
  `#2A2C31`, `ink-600` `#3C3F46`) als Basis, Champagner/Cream (`#E9E1CE`, `cream-50`
  `#F2EBDC`) als Textfarbe auf Dunkel, Gold (`#B08A3E` / `gold-light` `#D6B975` / `gold-dark`
  `#8C6A2A`) als Akzent. **Diese Tokens sind in `tailwind.config.js` zentral definiert —
  niemals Hex-Werte direkt in Komponenten schreiben, immer die Tailwind-Klassen
  (`bg-ink`, `text-cream`, `text-gold-light` etc.) verwenden.**
- **Durchgehendes Dark Theme.** Ursprünglich alternierten helle (Cream) und dunkle (Ink)
  Sektionen. Nach explizitem Kundenwunsch ("Alle Seiten bitte den Hintergrund dunkel
  halten") läuft **jede Sektion auf jeder Seite** jetzt in Anthrazit-Tönen. Es gibt
  **keine hellen/Cream-Hintergrundflächen mehr** im gesamten Projekt (außer sehr dezente
  `bg-cream/[0.03-0.08]`-Tints als Kartenhervorhebung auf Dunkel). **Falls in Zukunft neue
  Sektionen gebaut werden: IMMER dunklen Hintergrund verwenden, NIEMALS zu
  `bg-cream`/`bg-cream-50` als Sektionshintergrund zurückkehren**, außer der Kunde
  äußert ausdrücklich einen neuen Wunsch danach.
- **Typografie:** Fraunces (Serife) für Überschriften, Inter (Sans) für Fließtext/UI.
  Beide via Google Fonts in `index.html` eingebunden (`<link rel="preconnect">` +
  `<link href="...css2?family=Fraunces...">`).
- **Buttons:** `.btn-primary` (heller/Cream-Button, dunkler Text — für Kontrast auf dunklem
  Hintergrund), `.btn-secondary` (outline, Cream-Rand), `.btn-gold` (Gold-Verlauf, dunkler
  Text). Alle drei Klassen sind global in `src/index.css` definiert. **`CTAGroup.jsx` hat
  KEIN `variant`-Prop mehr** (wurde entfernt, als der Dark-Mode-Wechsel alle Sektionen
  betraf — vorher gab es `variant="dark"` für Sektionen auf dunklem Hintergrund, das ist
  jetzt überall der Fall, daher überflüssig geworden). **Falls alter Code/Beispiele
  `<CTAGroup variant="dark" />` zeigen, ist das veraltet — einfach `<CTAGroup />` schreiben.**
- **Bildsprache:** Ausschließlich echte Fotografie (keine Illustrationen, keine
  KI-generierten Bilder, kein 3D-Icon-Ersatz) für alle inhaltlichen Bildflächen. Fotos
  stammen von Unsplash/Pexels (beide Lizenzen erlauben kommerzielle Nutzung ohne
  Attribution). **Ausnahme:** Der Hero-3D-Effekt (`FabricScene`/`FabricPlane`) bleibt als
  abstrakter, prozeduraler Shader-Effekt bestehen — das ist explizit erwünscht und wurde
  vom Kunden nie kritisiert (nur das spätere 3D-Logo-Experiment in `PageHero` wurde
  abgelehnt, siehe 2.3).
- **Logo:** Echtes Kundenlogo (`Tragetasche_Ettlingen.png`, vom Kunden per Chat-Anhang
  geliefert) wird verwendet — freigestellt (weißer Hintergrund per Schwellwert-Alpha-Trick
  entfernt) und als PNG mit Transparenz eingebunden. **Keine eigene SVG-Nachzeichnung mehr
  verwenden** — die ursprüngliche selbstgezeichnete SVG-Version (`Logo.jsx` erste Fassung)
  wurde komplett durch das echte Logo ersetzt.

### 2.3 Technische Kompromisse (bewusst getroffen, mit Begründung)

| Kompromiss | Begründung | Möglicher Ausbau später |
|---|---|---|
| Kontaktformular nutzt `mailto:` statt echtem Backend | Kein Server/API im Projekt vorhanden, kein Auftrag für Backend-Entwicklung erteilt | Serverless Function oder Formspree/Netlify Forms |
| Google-Reviews-Sektion verlinkt nur zu Google, zeigt keine echten Kundenzitate | **Rechtlich bewusst so entschieden:** Erfundene, als echt dargestellte Kundenzitate sind seit der UWG-Reform 2022 (§5b Abs. 2) eine unlautere Geschäftspraktik. Der Kunde hatte explizit danach gefragt, ich habe das **abgelehnt** und stattdessen unattributierte "Markenversprechen"-Zitate gebaut | Echtes Google-Places-API-Widget, sobald der Kunde eine Places-ID/API-Key bereitstellt |
| Kontaktseite zeigt eine selbstgebaute Standort-Karte statt Google-Maps-iFrame | Google-Maps-iFrame lud in der Test-Umgebung unzuverlässig (`ERR_ABORTED`, vermutlich Netzwerk-Restriktion der Sandbox) und hätte als "leerer Kasten" beim Kunden erscheinen können | Falls gewünscht, könnte ein echtes iFrame ergänzt werden — sollte aber vorher in einer echten Produktionsumgebung getestet werden |
| Impressum/Datenschutz enthalten `[Platzhalter: ...]`-Text | Rechtliche Angaben (Geschäftsführer-Name, USt-IdNr., Handelsregister) kann nur der Betreiber selbst liefern — **darf niemals von der KI erfunden werden** | Kunde muss diese Felder vor Go-Live ausfüllen (siehe Abschnitt 4, höchste Priorität) |
| Kein Git-Repository | Wurde nie explizit vom Nutzer angefordert; `git init` ist eine Aktion mit Tragweite, die ich nicht ungefragt ausführen wollte | Sollte vor weiterem Fortschritt eingerichtet werden — hohe Priorität, siehe Abschnitt 4 |
| Vite-Dev-Server-Sicherheitshinweis (esbuild, moderate severity) nicht behoben | Fix würde Vite 5→6/7 Major-Upgrade erfordern (Breaking Changes), betrifft nur den Dev-Server, nicht den Produktions-Build | Kann bei Gelegenheit gemacht werden, ist nicht dringend |

### 2.4 Dinge, die ausdrücklich NICHT geändert werden sollen

- **Keine Rückkehr zu einer One-Page-Struktur.** Der Kunde hat explizit mehrseitige
  Navigation gefordert. Nicht wieder zu Anker-Links auf einer einzigen Seite zurückbauen.
- **Keine erfundenen Kundenbewertungen/Testimonials mit Namen.** Siehe 2.3 — das ist eine
  bewusste rechtliche Entscheidung, keine technische Einschränkung. Wenn der Kunde das
  erneut fordert, höflich auf die UWG-Problematik hinweisen (wie bereits einmal geschehen)
  und eine ehrliche Alternative anbieten.
- **Keine hartkodierten `[Platzhalter]`-Werte in Impressum/Datenschutz durch erfundene
  Daten ersetzen.** Nur der Kunde selbst darf diese ausfüllen.
- **Kein `@react-three/fiber` v9 / kein React 19 Upgrade**, ohne das bewusst mit dem
  gesamten Rendering-Stack abzustimmen (würde Breaking Changes in Framer Motion etc. nach
  sich ziehen können).
- **Das 3D-Logo-Experiment (`LogoMesh.jsx`/`LogoScene.jsx`) wurde bewusst wieder entfernt**
  und sollte nicht ohne neuen expliziten Kundenwunsch reaktiviert werden — es hat in der
  Praxis nicht funktioniert (siehe Abschnitt 4).
- **`AbstractSwatch.jsx` wurde komplett entfernt** (war eine generative Gradient-Illustration,
  ersetzt durch echte Fotos). Nicht wieder einführen, außer für einen neuen, spezifischen
  Zweck, der explizit keine Fotografie verträgt.
- **Preisdaten in `pricing.js` sind 1:1 von der Live-Seite übernommen** (13 Kategorien,
  jeder einzelne Preis wurde gegen die Originalseite abgeglichen). Nicht ohne Rücksprache
  mit dem Kunden ändern — nur exakt das übernehmen, was der Kunde vorgibt.

---

## 3. Aktuelle Aufgaben

### 3.1 Was bereits erledigt wurde

**Alle 33 bisher getrackten Tasks sind als `completed` markiert.** Zusammengefasst nach
Themenblöcken (chronologisch, siehe Abschnitt 8 für den vollen Sitzungsverlauf):

1. Komplettes Redesign von einer leeren Vite/React/Tailwind-Projektstruktur zu einer
   vollständigen 7-Seiten-Website.
2. Echtes Logo und echtes Brautkleid-Foto integriert (aus Kunden-Anhängen extrahiert).
3. Vollständige, mit der Live-Seite abgeglichene Preisliste (13 Kategorien) auf eigener
   `/preise`-Seite mit Sprungnavigation.
4. Alle Premium-Service- und Kategorie-Karten zeigen echte, lizenzfreie Fotos.
5. Durchgehendes Dark Theme auf allen 7 Seiten.
6. SEO-Grundausstattung: JSON-LD (`LocalBusiness` + `FAQPage`), OG-Image, Sitemap,
   Robots.txt, pro Seite eigene Meta-Tags.
7. Mehrere kritische CSS-Bugs gefunden und behoben (siehe Abschnitt 4 für Details zur
   Fehlersuche — nützlich, falls ähnliche Symptome wieder auftauchen).
8. Kontaktseite mit robuster Standort-Karte statt unzuverlässigem Maps-iFrame.

### 3.2 Was gerade bearbeitet wird

**Nichts.** Der letzte Auftrag des Nutzers war, die Vorschau erneut zu starten (reine
Preview-Server-Aktion, kein Code geändert). Der Dev-Server lief zuletzt auf
`http://localhost:5173` (Server-ID wechselt bei jedem Neustart, im Preview-Tool per
`preview_list` abrufbar). Es liegt aktuell **kein offenes, unfertiges Feature** vor.

### 3.3 Was als Nächstes ansteht (Prioritätenliste)

1. **Auf neues Kundenfeedback warten / reagieren.** Der Kunde reviewt die Live-Vorschau
   fortlaufend und meldet visuelle/inhaltliche Korrekturen. Das ist der Haupt-Workflow
   dieses Projekts — kein "fertig", sondern iteratives Feintuning.
2. **Git-Repository einrichten** (falls vom Nutzer gewünscht/erlaubt) — aktuell gibt es
   keinerlei Versionskontrolle, das ist ein echtes Risiko für Datenverlust.
3. **Rechtliche Platzhalter in Impressum/Datenschutz** müssen vom Kunden ausgefüllt werden,
   bevor die Seite live geht (siehe 2.3 und 4).
4. **Deployment vorbereiten/durchführen**, sobald der Kunde zufrieden ist —
   `vercel.json`/`_redirects` sind bereits vorbereitet, Vercel oder Netlify sind die
   naheliegendsten Ziele (statisches Hosting reicht, kein Server nötig).
5. **Hero-3D-Effekt (FabricScene) einmal in einem echten, nicht-reduced-motion Browser
   gegenprüfen** — in dieser Sandbox meldet der Test-Browser immer
   `prefers-reduced-motion: reduce`, weshalb die WebGL-Stoffbahn-Animation in dieser Umgebung
   nie tatsächlich sichtbar war, nur der statische Fallback-Gradient. Der Code wurde zwar
   einmal testweise erzwungen und lief technisch fehlerfrei, aber eine echte visuelle
   Prüfung in einem normalen Browser-Tab steht noch aus.

---

## 4. Bekannte Probleme

### 4.1 Bugs (behoben, aber mit Lerneffekt für die Zukunft)

**Der "graue Balken"-Bug (mehrfach gemeldet, brauchte zwei Anläufe):**

- **Symptom:** Ein einseitiger grauer Rand neben dem freigestellten Brautkleid-Bild
  (sowohl in `CategoryTeasers.jsx` auf der Startseite als auch in `Bridal.jsx` auf
  `/brautkleid`).
- **Erste (falsche/unvollständige) Diagnose:** Ich vermutete einen Chromium/WebKit
  Compositing-Bug, bei dem ein Element, das gleichzeitig eine Framer-Motion-Transformation
  UND `overflow-hidden` mit `border-radius` trägt, einen Rand-Fehler erzeugen kann. Ich habe
  daraufhin in `Bridal.jsx`, `CategoryTeasers.jsx`, `PremiumServices.jsx` und `Contact.jsx`
  das animierte `Reveal`-Element vom zuschneidenden/abgerundeten Element getrennt (zwei
  verschachtelte divs statt einem). **Diese Änderung ist weiterhin sinnvoll und sollte NICHT
  zurückgebaut werden** — sie behebt ein reales (wenn auch nicht das einzige) Problem.
- **Der Bug blieb trotzdem bestehen.** Erst beim zweiten, gründlicheren Debugging wurde die
  **echte Ursache** gefunden: Tailwinds Preflight/Base-Stylesheet setzt standardmäßig
  `img { max-width: 100% }`. Die Bilder nutzten aber eine Kombination aus
  `absolute inset-x-0 bottom-0 mx-auto h-[105%] w-auto` — die implizite
  `max-width: 100%`-Regel kollidierte mit dieser Größenberechnung und führte zu einer
  asymmetrischen Zentrierung.
- **Die endgültige Lösung:** Statt der `inset-x-0 + mx-auto`-Positionierung wird jetzt ein
  echter Flexbox-Container (`absolute inset-0 flex items-end justify-center`) verwendet,
  und das `<img>` bekommt explizit `max-w-none`, um Tailwinds Preflight-Regel zu
  überschreiben.
- **Verifiziert per exakter Pixel-Messung** (`getBoundingClientRect()` auf Bild- und
  Container-Box, Abstand links/rechts verglichen) — nicht nur per Screenshot. Ergebnis:
  exakt 26,28 px auf beiden Seiten, also symmetrisch.
- **Lektion für die Zukunft:** Bei jedem `<img>` mit custom `h-`/`w-`-Werten und
  `object-contain`/`object-cover` **immer `max-w-none` (und ggf. `max-h-none`)
  mitdenken**, sonst kollidiert es mit Tailwinds Preflight. Bei Zentrierungsproblemen mit
  absolut positionierten Elementen ist eine Flexbox-Lösung robuster als
  `inset-x-0 + margin: auto`.

**Der "goldene Balken"-Bug (auf der Brautkleid-Seite, oberhalb des Kleides):**

- **Ursache:** Ein experimentelles 3D-Logo-Objekt (`LogoScene.jsx`/`LogoMesh.jsx`), das
  versuchsweise in `PageHero.jsx` eingebaut wurde (ein aus der echten Logo-Kontur
  extrudiertes goldenes Kleiderbügel-Objekt via Three.js `TubeGeometry`, mit Beleuchtung
  und Pendel-Rotation). Es hat einen Farb-Bleed am Sektionsübergang erzeugt und war dem
  Kunden zudem "nirgendwo sichtbar" (zu klein/unauffällig).
  **Diese Dateien wurden komplett gelöscht** — nicht wieder einbauen, ohne dass der Kunde
  ausdrücklich erneut ein bewegtes 3D-Logo wünscht. Falls doch: viel dominanter
  positionieren/skalieren und den Sektionsübergang (Gradient-Overlay am unteren Rand von
  `PageHero`) besonders sorgfältig gegen Farbdurchbrüche prüfen.

**Der "leere Kasten"-Bug (Kontaktseite):**

- **Ursache:** Google-Maps-`<iframe>`-Einbettung schlug in der Test-/Sandbox-Umgebung mit
  `net::ERR_ABORTED` fehl (vermutlich Netzwerk-Restriktion). Das erzeugte einen sichtbar
  leeren, umrandeten Kasten.
- **Lösung:** iFrame komplett entfernt, ersetzt durch eine selbstgebaute Standort-Karte
  (Icon, Adresse, "In Google Maps öffnen"-Button, öffnet in neuem Tab). Funktioniert
  garantiert unabhängig von Netzwerk-/Browser-Restriktionen des Besuchers.

### 4.2 Offene, nicht-kritische Punkte

- **Kein automatisiertes Test-Setup** (kein Jest/Vitest/Playwright). Verifikation erfolgte
  bisher ausschließlich manuell über `npm run build`, `npm run lint` und das
  Preview-Browser-Tool (Screenshots, Konsolen-Logs, DOM-Messungen).
- **Bundle-Größe:** `FabricScene`-Chunk (Three.js) ist ca. 808 KB unminifiziert / 218 KB
  gzip. Das ist erwartet und akzeptabel, da lazy-geladen (blockiert nicht den initialen
  Seitenaufbau) — Vite gibt beim Build trotzdem eine Warnung aus ("chunk larger than
  500 kB"), das ist **kein Fehler**, nur ein Hinweis.
- **npm audit meldet 2 Schwachstellen** (1 moderate, 1 high) — beide stammen aus
  `esbuild`/`vite`, betreffen nur den **Dev-Server**, nicht den Produktions-Build. Ein Fix
  würde ein Vite-Major-Upgrade (5→6/7) erfordern.
- **Stock-Fotos-Lizenzen:** Alle Fotos stammen von Unsplash/Pexels unter deren freien
  Lizenzen (kommerzielle Nutzung erlaubt, keine Attribution nötig). Die genauen
  Quell-URLs sind im `ABSCHLUSSBERICHT.md` (Update 4) sowie im Chatverlauf dokumentiert,
  falls für Compliance-Zwecke später ein Nachweis gebraucht wird.
- **Hero-3D-Animation nie live mit Bewegung gesehen** (siehe 3.3, Punkt 5) — nur der
  Reduced-Motion-Fallback wurde in dieser Sandbox visuell bestätigt.

### 4.3 Workarounds, die im Code stehen (bewusst, dokumentiert)

- `Contact.jsx`: `handleSubmit()` baut eine `mailto:`-URL statt eines echten POST-Requests.
- `Reveal.jsx` spreadet `...rest`-Props durch, damit z. B. `id`-Attribute (für
  Sprungnavigation auf der Preisseite) durchgereicht werden können — falls neue Props
  gebraucht werden, funktioniert das automatisch mit.
- `PageHero.jsx` hat einen optionalen `image`-Prop; wird er weggelassen, bleibt nur der
  reine `bg-ink`-Hintergrund (aktuell nutzen aber alle 7 Seiten ein Bild).

---

## 5. Dateien

### 5.1 Zuletzt geänderte Dateien (in dieser Sitzung, chronologisch neueste zuerst)

1. `src/components/sections/Contact.jsx` — Standort-Karte statt Maps-iFrame
2. `src/pages/Kontakt.jsx`, `src/pages/Firmenkunden.jsx`, `src/pages/Hemdenservice.jsx`,
   `src/pages/Brautkleid.jsx`, `src/pages/Preise.jsx`, `src/pages/Leistungen.jsx` —
   `image`-Prop an `PageHero` ergänzt
3. `src/components/layout/PageHero.jsx` — von 3D-Canvas auf Foto-Hintergrund umgebaut
4. `src/components/three/LogoMesh.jsx`, `src/components/three/LogoScene.jsx` — **gelöscht**
5. `src/components/sections/CategoryTeasers.jsx`, `src/components/sections/Bridal.jsx` —
   Flexbox-Bildzentrierung + `max-w-none` (finaler Fix des grauen Randes)
6. `src/components/sections/PremiumServices.jsx` — Reveal/Overflow-Trennung
7. `ABSCHLUSSBERICHT.md` — laufend um "Update N"-Abschnitte ergänzt
8. `public/images/leistungen.webp`, `public/images/preise.webp` — neu hinzugefügt

Alle anderen Dateien sind seit "Update 4" (Dark-Theme-Konvertierung) inhaltlich stabil.

### 5.2 Zweck jeder wichtigen Datei

Siehe die ausführlich kommentierte Projektstruktur in Abschnitt 1.4 — jede Datei ist dort
mit einem Stichpunkt zu ihrem Zweck versehen. Zusätzliche Detailhinweise:

- **`src/data/pricing.js`** ist die längste und am striktesten "quellgetreue" Datei — jede
  einzelne Preisangabe wurde per `WebFetch` von der Original-Live-Seite
  (`textilreinigung-ettlingen.de/preise.html`) abgeglichen. 13 Kategorien:
  Hemden & Abo-Karten, Anzüge & Festmode, Hosen & Röcke, Ober- & Freizeitbekleidung,
  Jacken & Mäntel, Outdoor/Ski & Imprägnierung, Nacht- & Unterwäsche,
  Arbeitsbekleidung & Spezial, Bettdecken/Kissen & Heimtextilien, Hauswäsche & Bad,
  Tischwäsche, Stores & Gardinen, Extras & Veredelung.
- **`src/data/faq.js`** — jeder Eintrag hat ein `id`-Feld, damit `FAQ.jsx` per
  `ids={[...]}`-Prop nur eine Teilmenge anzeigen kann (z. B. nur brautkleid-relevante
  Fragen auf `/brautkleid`).
- **`index.html`** enthält das komplette JSON-LD-Schema als `<script type="application/ld+json">`
  mit einem `@graph`-Array (zwei Objekte: `DryCleaningOrLaundry` und `FAQPage`). Beim
  Ändern von Adressdaten in `src/data/business.js` **auch dieses Schema in `index.html`
  manuell nachziehen** (wird nicht automatisch synchronisiert!).
- **`public/impressum.html` und `public/datenschutz.html`** sind **eigenständige statische
  HTML-Dateien außerhalb der React-App** (kein React-Router, keine gemeinsame
  Komponentenbasis) — bewusst so gebaut, damit sie unabhängig vom App-Bundle funktionieren
  und leicht separat aktualisiert werden können. Sie werden von `Footer.jsx` aus per
  normalem `<a href="/impressum.html">` (kein `<Link>`) verlinkt.

---

## 6. Abhängigkeiten

### 6.1 Installierte Pakete (`package.json`)

```json
{
  "dependencies": {
    "@react-three/fiber": "^8.18.0",
    "framer-motion": "^11.2.10",
    "lenis": "^1.3.25",
    "lucide-react": "^1.23.0",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-router-dom": "^6.30.4",
    "three": "^0.165.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.3.1",
    "autoprefixer": "^10.4.19",
    "eslint": "^8.57.1",
    "eslint-plugin-react": "^7.37.5",
    "eslint-plugin-react-hooks": "^4.6.2",
    "eslint-plugin-react-refresh": "^0.4.26",
    "postcss": "^8.4.38",
    "tailwindcss": "^3.4.4",
    "vite": "^5.2.0"
  }
}
```

**Wichtig:** `sharp` wurde mehrfach **temporär** installiert (für Bildoptimierung/
Favicon-Generierung) und danach immer wieder deinstalliert — es ist **kein**
Laufzeit-Dependency des Projekts und taucht daher zu Recht nicht in `package.json` auf.
Falls erneut Bilder rasterisiert/optimiert werden müssen: `npm install -D sharp`, Skript
ausführen, danach `npm uninstall sharp` nicht vergessen.

### 6.2 Besondere Konfigurationen

- **`.eslintrc.cjs`** nutzt das klassische ESLint-Config-Format (nicht Flat-Config), mit
  `eslint:recommended` + `plugin:react/recommended` + `plugin:react-hooks/recommended` +
  `react-refresh`-Plugin. `react/prop-types` und `react/react-in-jsx-scope` sind
  deaktiviert (kein PropTypes-System, React 18 JSX-Transform braucht kein Import).
- **`tailwind.config.js`** — `content` scannt `index.html` und `src/**/*.{js,jsx}`. Alle
  Custom-Farben/Schatten/Timing-Funktionen sind unter `theme.extend` definiert (siehe
  Abschnitt 2.2 für die Farbwerte).
- **`.claude/launch.json`** (im übergeordneten Ordner `C:\Users\Administrator\Claude Ai\`,
  NICHT im Projektordner selbst!) — definiert den Preview-Server:
  ```json
  {
    "version": "0.0.1",
    "configurations": [
      {
        "name": "dev",
        "runtimeExecutable": "npm",
        "runtimeArgs": ["run", "dev", "--prefix", "textilreinigung-ettlingen"],
        "port": 5173
      }
    ]
  }
  ```
  Das `--prefix`-Flag ist nötig, weil das Preview-Tool relativ zum übergeordneten
  Arbeitsverzeichnis (`Claude Ai/`) startet, nicht relativ zum Projektordner.

### 6.3 Umgebungsvariablen

**Keine.** Das Projekt hat keine `.env`-Datei und benötigt keine — es ist eine rein
statische Seite ohne API-Keys, Backend-Verbindungen oder Secrets.

---

## 7. Arbeitsanweisungen für den nächsten Chat

### 7.1 Wie weitergearbeitet werden soll

1. **Lies zuerst dieses Dokument komplett**, bevor du Code änderst.
2. **Der Haupt-Workflow ist reaktiv:** Der Kunde schaut sich die Live-Vorschau an und
   gibt konkretes visuelles/inhaltliches Feedback (oft mit Screenshots). Erwarte kurze,
   direkte Nachrichten wie "das Bild XY passt nicht" oder "Seite Z ist zu leer" — das ist
   der normale Modus dieses Projekts, keine Ausnahme.
3. **Bei jeder Code-Änderung:** `npm run build` und `npm run lint` ausführen, dann mit dem
   Preview-Tool (`preview_start` → `preview_screenshot`/`preview_eval`) visuell verifizieren,
   BEVOR du dem Nutzer meldest, dass etwas fertig ist. Der Nutzer hat wiederholt Bugs
   gemeldet, die vorherige Verifikationen übersehen hatten — sei besonders gründlich bei
   Bildpositionierung/CSS-Layout (siehe die zwei "Balken"-Bugs in Abschnitt 4.1).
4. **Bei hartnäckigen visuellen Bugs:** Nicht nur Screenshots vergleichen, sondern mit
   `getBoundingClientRect()` exakte Pixel-Maße prüfen (siehe Beispiel in 4.1). Ein
   Screenshot kann täuschen, eine Zahlen-Messung nicht.
5. **Deutsch als Sprache beibehalten** — der gesamte Chatverlauf, alle Datenmodule, alle
   sichtbaren Texte sind auf Deutsch. Der Nutzer schreibt auf Deutsch, antworte auf Deutsch.
6. **Bei Unsicherheit über rechtliche/faktische Angaben** (Firmendaten, Preise,
   Öffnungszeiten): niemals erfinden, immer beim Nutzer nachfragen oder auf die
   Live-Quelle verweisen.
7. **Bei größeren strukturellen Änderungen** (z. B. neue Seite, neue Route, neues
   Datenmodul): dem etablierten Muster folgen — Datenmodul in `src/data/`, Sektion in
   `src/components/sections/`, Seite in `src/pages/`, Route in `src/App.jsx` registrieren,
   Nav-Eintrag in `src/data/nav.js` ergänzen (falls in der Hauptnavigation sichtbar sein
   soll), Sitemap in `public/sitemap.xml` ergänzen.

### 7.2 Prioritätenliste

Siehe Abschnitt 3.3 — kurz zusammengefasst:

1. Auf Kundenfeedback reagieren (laufend, höchste Priorität)
2. Git-Repository einrichten (falls Nutzer zustimmt)
3. Rechtliche Platzhalter (Impressum/Datenschutz) — Nutzer muss liefern, nicht die KI
4. Deployment vorbereiten, sobald Kunde zufrieden
5. Hero-3D-Effekt einmal in echtem Browser mit aktivierter Bewegung gegenprüfen

### 7.3 Wichtige Hinweise

- **Niemals** `git init`, `git push --force`, oder andere folgenreiche Git-Aktionen ohne
  explizite Erlaubnis ausführen — aktuell existiert noch nicht einmal ein Repository.
- **Niemals** erfundene Kundenbewertungen mit Namen einbauen, selbst wenn erneut danach
  gefragt wird — stattdessen freundlich auf die UWG-Rechtslage hinweisen (Präzedenzfall:
  siehe Abschnitt 2.3/2.4) und eine ehrliche Alternative anbieten.
- **Niemals** die Impressum/Datenschutz-Platzhalter mit erfundenen Daten ausfüllen.
- **Bei Bildern:** Nur lizenzfreie Quellen (Unsplash/Pexels bewährt) oder vom Kunden
  bereitgestellte echte Fotos verwenden. Keine geratenen/halluzinierten Bild-URLs.
- **Bei neuen 3D/WebGL-Experimenten:** Vorsichtig sein — das 3D-Logo-Experiment ist
  gescheitert (siehe 4.1). Der Kunde bevorzugt nachweislich echte Fotografie gegenüber
  abstrakten/generierten visuellen Effekten in Content-Bereichen. Der Hero-Shader-Effekt
  auf der Startseite ist die Ausnahme (wurde nie kritisiert).
- **Preview-Tool-Eigenheiten:** Der Test-Browser meldet `prefers-reduced-motion: reduce`,
  wodurch WebGL-Inhalte immer im Fallback-Modus (statischer Gradient) angezeigt werden.
  Für einen echten Test der 3D-Bewegung muss der reduced-motion-Check temporär im Code
  überschrieben werden (Beispiel-Vorgehen: siehe Chatverlauf, "TEMP: verification only").
  **Nicht vergessen, solche temporären Overrides nach dem Test wieder zurückzubauen!**
- **`node_modules/.vite`-Cache-Probleme:** Falls nach dem Löschen/Umbenennen von
  Komponenten-Dateien seltsame HMR-Fehler im Preview-Log auftauchen ("Failed to reload
  X.jsx"), hilft `rm -rf node_modules/.vite` gefolgt von einem Server-Neustart.

---

## 8. Zusammenfassung aller bisherigen Chatsitzungen zu diesem Projekt

Dieses Projekt wurde bisher in **einer durchgehenden Chat-Sitzung** mit mehreren
Feedback-Runden entwickelt (kein separater Sitzungswechsel bisher — dieses Handover-Dokument
ist die erste Vorbereitung auf einen möglichen Wechsel). Der Verlauf gliedert sich in folgende
Phasen:

**Phase 1 — Initialer Auftrag & kompletter Aufbau.**
Der Nutzer gab einen sehr umfangreichen, autonomen Auftrag: Die Live-Website komplett neu
konzipieren, Referenz-Qualitätsniveau von Premium-Marken, keine Rückfragen, volle
Autonomie. Ausgangslage war ein leeres Vite/React/Tailwind-Grundgerüst (nur Config-Dateien,
keine Komponenten). Ich habe die Live-Seite analysiert (echte Adress-/Preisdaten per
WebFetch extrahiert), das "echte" Logo aus einer 289-KB-Pseudo-Vektor-SVG-Datei als Rasterbild
befreit und zunächst neu als SVG nachgezeichnet, und eine komplette One-Page-Website mit
12 Sektionen gebaut (Hero mit Three.js-Stoffbahn-Shader, Trust-Bereich, Leistungen, Premium
Services, Brautkleid, Hemdenservice, Firmenkunden, Ablauf, Qualitätsversprechen, Bewertungen,
FAQ, Kontakt) plus SEO-Grundlagen (JSON-LD, Sitemap, OG-Image) und rechtlichen Basisseiten.
Abschlussbericht (`ABSCHLUSSBERICHT.md`) wurde erstmals geschrieben.

**Phase 2 — Erste Kundenfeedback-Runde.**
Kernforderungen: keine One-Page-Seite, sondern echte Unterseiten; eigene Preisseite; FAQ-Fehler
korrigieren (Bearbeitungsdauer war falsch angegeben); Formulierung zur Firmengeschichte
korrigieren ("seit Generationen in Karlsruhe, jetzt auch in Ettlingen" statt umgekehrt);
Bilder für Premium-Services und Brautkleid; ehrliche statt erfundene Kundenbewertungen; Seite
generell dunkler. Ich habe auf `react-router-dom` umgebaut (7 Seiten), eine vollständige
Preisseite gebaut, alle inhaltlichen Korrekturen vorgenommen, das **echte** Kundenlogo (aus
einem Chat-Anhang, `Tragetasche_Ettlingen.png`) sowie ein **echtes** Brautkleid-Foto (aus einer
vom Kunden mitgeschickten PDF extrahiert) eingebaut, die Cream-Palette abgedunkelt, und die
Bewertungs-Sektion bewusst auf einen Google-Link statt erfundener Testimonials umgestellt
(mit Begründung der UWG-Rechtslage gegenüber dem Kunden).

**Phase 3 — Zweite Feedback-Runde.**
Hemdenservice/Firmenkunden hatten weiterhin keine Bilder; Premium-Services-Icons überzeugten
nicht; Preisliste war unvollständig (6 von 13 Kategorien fehlten komplett) und unübersichtlich;
"Termin"-Sprache war missverständlich (Termine sind nur für Lieferung/Abholung nötig, nicht
für normale Abgabe). Größter Fund dieser Runde: ein kritischer CSS-Bug in `AbstractSwatch.jsx`
(hartkodiertes `relative` kollidierte mit von außen übergebenem `absolute inset-0` —
Tailwind-Stylesheet-Reihenfolge lässt `.relative` immer gewinnen), der site-weit kaputte
Layouts verursachte (leere graue Flächen in Seiten-Headern, auf 1747 px aufgeblähte
Karten-Höhen). Nach dem Fix: vollständige Preisliste (alle 13 Kategorien) mit
Sprungnavigations-Leiste neu gebaut, Termin-Sprache korrigiert.

**Phase 4 — Dritte Feedback-Runde.**
Brautkleid-Kartenhintergrund zeigte noch Grauverlauf statt reinem Schwarz; Hemdenservice/
Firmenkunden-Bilder überzeugten immer noch nicht (jetzt explizit: "echte Bilder aus dem
Internet"); Premium-Services-Icons ebenfalls; alle Seiten sollten durchgehend dunkel sein
(nicht nur teilweise). Ich habe daraufhin sechs echte, lizenzfreie Fotos von Unsplash/Pexels
recherchiert und heruntergeladen (Hemden auf Bügeln, Handtücher mit Goldschleife,
Seidenstoff-Textur, Kleiderschrank-Szene, Bügel-Szene, Regen-auf-Glas) und damit alle
Illustrationen ersetzt (`CategoryIllustration.jsx` und `PremiumIllustration.jsx` gelöscht). Die
gesamte Website wurde von alternierendem Hell/Dunkel auf durchgehendes Dark Theme umgebaut
(jede einzelne Sektion, `index.css`-Basis-Umkehrung, alle Button-Stile angepasst).

**Phase 5 — Vierte Feedback-Runde.**
Grauer Balken beim Brautkleid-Bild weiterhin sichtbar (zwei verschiedene Stellen); zusätzlich
ein neuer goldener Balken auf der Brautkleid-Seite; leerer Kasten auf der Kontaktseite; Wunsch
nach einem sichtbaren, bewegten 3D-Logo im Header, da die Seitenanfänge "leer/steril" wirkten.
Ich habe (fälschlicherweise nur teilweise zutreffend) einen Framer-Motion/Overflow-Hidden-
Rendering-Bug diagniostiziert und behoben (Trennung von animiertem und zuschneidendem
Element), UND ein neues 3D-Logo gebaut (`LogoMesh.jsx`/`LogoScene.jsx` — aus der echten
Logo-Kontur extrudierte goldene Kleiderbügel-Geometrie mit Beleuchtung), das den
Diagonal-Streifen-Hintergrund in `PageHero.jsx` ersetzte.

**Phase 6 — Fünfte Feedback-Runde (aktuellster Stand vor diesem Handover).**
Der graue Balken war **immer noch da** — diesmal wurde die echte Ursache gefunden (Tailwind
Preflight `img{max-width:100%}` kollidierte mit custom Bildgrößen). Endgültig behoben per
Flexbox-Zentrierung + `max-w-none`, verifiziert per exakter Pixel-Messung. Das 3D-Logo hatte
einen Farb-Bleed verursacht und war dem Kunden ohnehin nicht auffällig genug — komplett
entfernt und durch echte, thematisch passende Fotos in allen sieben Seiten-Headern ersetzt
(zwei weitere Fotos recherchiert: gefaltete Hemden für "Leistungen", Kleidung auf
Garderobenstange für "Preise"). Der leere Kasten auf der Kontaktseite (unzuverlässiges
Google-Maps-iFrame) wurde durch eine selbstgebaute, garantiert funktionierende Standort-Karte
ersetzt. Alle drei Punkte im Preview-Browser verifiziert.

**Danach:** Mehrere einfache "Starte die Vorschau"-Anfragen ohne neue inhaltliche Änderungen,
dann dieser Auftrag zur vollständigen Projektübergabe.

---

*Ende des Handover-Dokuments. Bei Fragen zum Verlauf: `ABSCHLUSSBERICHT.md` enthält die
kundenseitig kommunizierte, etwas kompaktere Zusammenfassung derselben Änderungen (6
"Update"-Abschnitte). Dieses Dokument hier ist die technisch vollständigere Fassung für
Entwickler-/KI-Zwecke.*

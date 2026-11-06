# chefklick.ch – Projekt

Regeln, Technik, Design und Grundsatzentscheidungen der Website. Der
allgemeine Arbeitsablauf steht im Skill `anthropic-skills:mein-workflow`,
der aktuelle Stand in STAND.md.

## 1. Ziel und Nutzer

Eine Website, die ChefKlick vorstellt und vom Design her sofort als Teil
der App erkennbar ist: gleiche Farben, gleiche Wortmarke, gleiche runde
Formensprache, heller Modus als Standard, dunkler Modus mit Gold.
Zielgruppe sind Küchenchefs, Gastronomen und Betriebsleiter in der
Schweiz – Leute, die heute HACCP-Listen auf Papier führen.

Sprache: Deutsch, per Du. Schweizer Schreibung: kein ß ("Massnahme",
"gross"), Umlaute in sichtbaren Texten, in Code-Kommentaren und
Commit-Nachrichten umschrieben (ue, ae, oe).

## 2. Tech-Stack und Hosting

- Website der App ChefKlick (HACCP-App für Gastronomiebetriebe), Betreiber Canuma Studio, Zürich
- Repo: https://github.com/Canuma-Studio/chefklick.ch (öffentlich)
- Domain: chefklick.ch (Hostpoint), Hosting: GitHub Pages wie canuma.ch
- Aufbau wie canuma: einfaches HTML/CSS ohne Bauschritt – index.html, styles.css, script.js, images/, fonts/
- Repo ist öffentlich: auch STAND.md und alle Commit-Nachrichten sind sichtbar. Nichts Internes, keine Schlüssel.
- Links zur App immer auf https://app.chefklick.ch, nie auf die technische Cloudflare-Adresse (*.pages.dev)

## 3. Befehle

- Vorschau: VS Code mit der Erweiterung Live Server (Einstellungen in
  .vscode/settings.json), oder im Ordner `python3 -m http.server`
- Kein Bauschritt. Ausliefern: Push auf main, GitHub Pages veröffentlicht
  die Wurzel des Repos.

## 4. Ordnerstruktur

- index.html, impressum.html, datenschutz.html, 404.html – die Seiten
- styles.css, script.js
- images/ (images/original/ bleibt lokal, siehe .gitignore), fonts/
- CNAME, robots.txt, sitemap.xml – Domain und Suchmaschinen
- _config.yml – nimmt die Arbeitsdateien von der Veröffentlichung aus
- LICENSES.md – Lizenzen von Ionicons und Montserrat (bleibt öffentlich)
- CLAUDE.md, PROJEKT.md, STAND.md, VERLAUF.md – Arbeitsdateien, nicht veröffentlicht

## 5. Grenzen

### Harte Regeln

- **Kein Hinweis auf meinen Arbeitgeber.** Kein Restaurantname, keine
  Adresse, keine Mailadresse, kein Foto aus dem Betrieb – weder auf der
  Seite noch im Code, in Kommentaren, Dateinamen oder Commits.
  ChefKlick ist mein privates Projekt.
- **Nichts erfinden.** Keine erfundenen Kundenstimmen, Bewertungen,
  Nutzerzahlen, Logos von "Kunden" oder Auszeichnungen. Keine
  App-Store-Knöpfe, solange die App nicht in den Stores ist.
- **Keine Rechts- oder Zertifizierungsversprechen.** Nicht "HACCP-
  zertifiziert", nicht "garantiert gesetzeskonform", nicht "von der
  Lebensmittelkontrolle anerkannt". Erlaubt ist, was die App tatsächlich
  tut: digital dokumentieren, Nachweis als PDF, nichts wird
  überschrieben.
- **Funktionen nur so beschreiben, wie sie in CHEFKLICK-KONTEXT.md als
  fertig stehen.** Geplantes klar als geplant kennzeichnen oder weglassen.
  (Die Datei liegt nicht im Repo. Claude Code bekommt die fertigen
  Funktionen im Prompt genannt.)
- **Impressum und Datenschutzerklärung** gehören dazu, sobald die Seite
  öffentlich ist. Rechtliche Texte schreibst du als Entwurf und sagst
  dazu, dass ich sie prüfen lassen muss – du bist kein Anwalt.
- Ein Formular, das Daten sammelt (Warteliste, Kontakt), braucht die
  Datenschutzerklärung und einen klaren Zweck. Keine Tracker oder
  Analyse-Skripte ohne meine ausdrückliche Entscheidung.
- Keine Schlüssel, Passwörter oder Zugangsdaten ins Repo. Der
  Supabase-Schlüssel der App gehört nicht in die Website.

### Nie

- Push oder Änderungen an DNS/Hosting durch Claude (macht Philipp).

## 6. Testbasis

Von Hand: Seite im Browser bei 390 und 1280 px ansehen, Konsole ohne
Fehler, kein seitliches Scrollen. Keine automatischen Tests.

## 7. Design

- Grundlage ist das Design-System der App (Farben, Abstände, Radien,
  Schriftgrössen) aus CHEFKLICK-KONTEXT.md. Werte übernehmen, nicht
  nachempfinden.
- Farben als CSS-Variablen, heller Modus Standard, dunkler Modus über
  `prefers-color-scheme` plus eigenen Umschalter.
- Wortmarke in Montserrat Bold mit den Logofarben je Modus. Bildmarke
  und Icon als die vorhandenen SVG-Dateien, nicht neu zeichnen.
- Zuerst fürs Handy gestalten (die App ist eine Handy-App, die meisten
  Besucher kommen vom Telefon), dann Desktop.
- **Design-Entscheidungen fallen an einem Artifact**, nicht im
  Fliesstext: echte Farben, umschaltbar hell und dunkel, je Variante ein
  kurzer Absatz Dafür und Dagegen. Ich entscheide daran.
- Barrierefreiheit: ausreichende Kontraste, Alt-Texte, Tastatur-
  bedienbar.

## 8. Entscheidungen

- 21.10.2026: Vorschaubild beim Teilen (Open Graph) Variante B aus dem Artifact "ChefKlick Teilen-Vorschau": Grund Warmweiss #F4F2ED, App-Icon, Wortmarke, Zeile "HACCP-App für die Gastronomie" (Inter, gerendert). Gleicher Aufbau wie bei canuma.ch. Titel und Beschreibung wörtlich aus title und meta description. Verworfen: A Einstiegsfarbe, C dunkel mit Gold
- 21.10.2026: "Anmelden" am Handy (unter 760 px) nur im Menü der Startseite, nicht in der Fusszeile – auf allen Seiten, auch Impressum, Datenschutz und 404 (die haben kein Menü, dort führt "Zurück" zur Startseite). Grund: Philipp, am Handy stand der Link allein und fett rechts unter "Kontakt" und sah komisch aus. Am Desktop bleibt er rechts in der Fusszeile. Ergänzt den Eintrag vom 20.10.
- 20.10.2026: Online gehen mit Rechtstexten als Entwurf von Claude, Prüfung durch eine Fachperson folgt (Philipp: günstiger als alles schreiben zu lassen). Impressum: Canuma Studio, Philipp März, Zürich, Schweiz, info@canuma.ch – der Name steht nur im Impressum und in der Datenschutzerklärung, sonst nirgends auf der Seite. Ohne Postadresse wie bei canuma.ch (Frage an Fachperson, Punkt 5). Datenschutzerklärung gilt nur für die Website, ausdrücklich nicht für die App. Rechtstexte per Du wie die übrige Seite (canuma: Sie). Seiten ohne script.js und ohne Bewegung; 404.html mit Pfaden ab der Wurzel, weil GitHub Pages sie für jede unbekannte Adresse zeigt
- 20.10.2026: Ringe hinter "So sieht es in der App aus" stehen per CSS still (.banner-bg position: fixed, .banner clip-path: inset(0)) statt per Scroll-Handler in script.js. Grund: Philipp, "beim Scrollen sehr ruckelhaft" – der Handler lief ein Bild hinter dem Scrollen her. Wirkung gleich (Ringe in der Bildmitte, Fläche gleitet darüber), Füllen der Ringe startet weiterhin erst beim Hereinkommen. Zum Ausprobieren, Alternative wäre: Ringe scrollen mit
- 20.10.2026: Link „Anmelden“ zur Webversion der App (https://app.chefklick.ch, seit heute online) im Menü als letzter Eintrag, abgesetzt mit Linie und kleiner, und in der Fusszeile rechts, fett. Kein eigener Knopf oben, damit das Menü ein einziges Symbol bleibt und neue Besucher nicht denken, sie könnten schon loslegen ("Bald verfügbar" bleibt). Öffnet im selben Tab, Pfeil ↗ nur zur Zierde (aria-hidden)
- 11.10.2026: Kacheln wie die Bilder der Vorlage noahbachofen.ch: die Fläche wird beim Hereinkommen von unten nach oben aufgedeckt (1200 ms, Handy 600 ms, cubic-bezier(0.645, 0.045, 0.355, 1)). Der Ablauf in der Kachel läuft in Schleife, solange sie im Bild ist, unabhängig vom Scrollen (Philipp: "ruckelig", "ohne es mit dem Scrollen zu verbinden"); langsamer: alle Zeiten × 1.8, Endzustand 6 s, 800 ms ausblenden, 900 ms Pause. Jede Kachel hat von Anfang an die Höhe ihres Endzustands, nichts darunter rutscht. Feld "Korrekturmassnahme" klappt jetzt weich auf (ersetzt "Nicht gewählt" vom 04.10.). Ersetzt "jede Kachel bewegt sich einmal" vom 04.10.
- 11.10.2026: Kachel "Heute" unter dem Einstieg entfernt (Philipp: Dashboard-Diagramm stört). Stattdessen Einleitung: Titel "Digital, aber nicht kompliziert" auf --f-ware (Einstiegsfarbe würde am Handy mit dem Einstieg verschmelzen), zwei Absätze, Linie mit "Canuma Studio". Kein persönlicher Name auf der Seite (Philipp), ersetzt "Name Philipp März in der Linie" vom 04.10. Regeln für Ringe und Legende aus styles.css entfernt
- 11.10.2026: Login nicht auf dieser Seite. Die App bekommt eine Webversion; sie läuft getrennt unter app.chefklick.ch und bringt ihren eigenen Anmeldebildschirm mit. Gründe: der Browser trennt den Speicher der Anmeldung von der Website, kein Supabase-Schlüssel im öffentlichen Website-Repo, Website und App werden unabhängig voneinander geändert. Die Website bekommt nur einen Knopf „Anmelden“. Hosting der Webversion wird im App-Projekt entschieden – seit 12.10.2026: Cloudflare Pages unter app.chefklick.ch
- 05.10.2026: Ruhiger, weil die Seite für eine Dokumentations-App zu verspielt wirkte (Philipp): Flächen in den App-Farben statt "Kräftig" (--f-* = tabActive, background, moduleChecklistSoft, moduleTemperatureSoft, surfaceElevated, surface); Pfeil pulsiert nicht mehr; Mitlaufen der Kacheln entfernt; Häkchen blendet nur noch ein, ohne Aufspringen. Bleibt: Titel schweben herein, Texte blenden ein, Linien ziehen sich, Ringe füllen sich und stehen still, Grundsätze nacheinander, Menü gestaffelt, weiche Übergänge in den Kacheln, Wortmarke wie beim App-Start
- 04.10.2026 (spät): Abläufe der Kacheln flüssiger (Philipp: "bauen sich komisch auf, nicht so flüssig"): weiche Übergänge bei jedem Schritt (Haken füllt sich und Häkchen springt leicht auf – weicht bewusst von der App ab –, Zeile darunter klappt auf, Ja-Knöpfe, Texte blenden über, Speichern-Knopf, Strich); Mitlaufen gedämpft (zieht weich nach, wird am Rand der Fläche langsamer statt hart zu stoppen). Nicht gewählt: Feld Korrekturmassnahme klappt auf (blendet nur ein, die Kachel wächst weiter in einem Schritt), Kachel schwebt herein
- 04.10.2026 (spät): Zusätzliche Bewegungen (Philipp: "mir fehlen noch ein paar Animationen"): Linie unter jedem Text zieht sich von links, danach "+ Interesse"; Ringe hinter dem Zwischentitel füllen sich wie DayRings.tsx (1.8 s); Grundsätze kommen nacheinander (Linie, Titel, Text); Menü-Links schweben gestaffelt herein. Was gleichzeitig ins Bild kommt, startet gestaffelt (150 ms)
- 04.10.2026 (spät): Startseite nach dem Vorbild noahbachofen.ch (Artifact "ChefKlick Farbflächen", Version 2) – ersetzt Kopf-Leiste, Einstieg mit Titel und das Raster der Funktionen. Farbflächen über die ganze Breite, Zweiteilung 50/50 abwechselnd, dünne Titel in Grossbuchstaben (Helvetica Light; ersetzt "Überschriften in Systemschrift" – in den Kacheln bleibt die Systemschrift), grosser Fliesstext, feine Linie mit "+"-Link, Menü nur als Symbol oben rechts. Farben: Satz "Kräftig" (aus den App-Farben aufgehellt, in der App so nicht vorhanden, Variablen --f-*). Abläufe der Kacheln bleiben. Alle sechs Funktionen. Bewegungen der Vorlage: Titel schweben 60 px herein, Texte blenden ein (1.2 s, Handy 0.6 s), Pfeil pulsiert, Kacheln laufen langsamer mit (nie über den Rand ihrer Fläche), Ringe hinter dem Zwischentitel stehen still, Menü fährt von rechts herein
- 04.10.2026 (spät): Eigene Ergänzungen zum Entwurf (Claude, bitte prüfen): Wortmarke im Einstieg baut sich weiter auf wie beim App-Start; Menü-Knopf als runde weisse Pille mit Schatten (bei der Vorlage ohne Grund – auf den dunklen Flächen sonst unsichtbar); Grundsätze mit den sechs bisherigen Texten (Entwurf hatte fünf, "Jede Person auf ihrem eigenen Handy" steht jetzt bei Team); "Mit Beispieldaten." unter dem Zwischentitel; Name "Philipp März" in der Linie unter dem Einstiegstext; Fusszeile ohne "Impressum · Datenschutz (folgen)"
- 04.10.2026: Website-Knöpfe mit Radius 14 wie die App-Knöpfe, keine Pille (Pillen nur für Chips und Zeilen, wie in der App)
- 04.10.2026: Rahmen A (Raster) bestätigt – am selben Abend verworfen: Abstände und Format zu schlecht (Philipp). Neu: Funktionen untereinander, links die Kachel, rechts der Text; ein Abstandswert --section-y (64 Handy / 96 Desktop) wie bei scoff; Bänder abwechselnd Beige/Weiss, Geschichte dunkelblau (--accent-dark); Kacheln auf farbigen Flächen in den Modulfarben der App, Icon-Chip mit Nummer, grosse Aussage je Funktion; Grundsätze als nummerierte Karten; Mailadresse gross. Nebeneinander erst ab 1000 px, am Handy läuft die Fläche bis an den Rand
- 04.10.2026: Kopf und Einstieg = Mischung aus "C Wie der App-Start" und "A Schwebende Leiste" (Artifact "ChefKlick Einstieg"): Kopf als schwebende Leiste nach ChefKlickTabBar.tsx mit aktivem Bereich auf tabActive; oben ohne Grund und ohne kleine Marke, solange die grosse Wortmarke im Bild ist. Einstieg: Wortmarke baut sich auf wie in ChefKlickLogo.tsx (Buchstaben, i-Punkt fällt und hüpft), darunter Titel mittig, Fläche mit Temperatur · Heute · Warenannahme (Nebenkacheln erst ab 1000 px)
- 04.10.2026: --text-muted auch dort, wo die App es für Text nutzt (Platzhalter, erledigte Aufgaben, "x von y erledigt", ungültige Werte), auf der Website --text-secondary
- 04.10.2026: Checkliste wie in der App mit zwei Karten (täglich / Grundreinigung), Haken ohne eigene Animation (spät geändert, siehe oben: Haken blendet weich ein), keine Icons für Begründung und Rückgängig; Grundreinigung zeigt "erledigt am Montag, 21.09. von …"
- 04.10.2026: Web-Stufe --font-section (30 bis 40 px) für Abschnittstitel
- 04.10.2026: Namen in den Beispielen (Sam, Mia, Alex) und Aufgaben sind erfunden, Betrieb heisst "Beispielbetrieb"
- 04.10.2026: Fusszeile vorerst ohne Impressum/Datenschutz – Links kommen mit den Seiten (erledigt 20.10.2026)
- 04.10.2026: Icons als eine Datei images/icons.svg (Ionicons 7.4.0), Lizenzen in LICENSES.md (Ionicons MIT, Montserrat OFL)
- 04.10.2026: Als Bild nur das App-Icon (chefklick-icon.svg: Grund #D8D5CE, C und Haken #163A7C, Punkt #A8823A) – im Kopf neben der Wortmarke und als Favicon. Die Bildmarken (hell/dunkel, reduziert) kommen in der App nicht vor und werden nicht benutzt
- 04.10.2026: Gestaltung: moderne Seite (Navigation, grosse Überschriften, Raster), nur die Kacheln im App-Design – 1:1 nach dem App-Code (Karten, Radien, Schatten, Ionicons, Ringe, Monatsuhr, runde Haken, Ja/Nein-Knöpfe, Eingabefelder); jede Kachel bewegt sich einmal, wenn sie ins Bild kommt. Verworfen: Handy entfaltet sich, Bonschiene, Papier, Kuli
- 04.10.2026: Erste Version = reine Vorstellung, "Bald verfügbar", Kontakt per Mail-Link, kein Formular, keine Daten
- 04.10.2026: Einfaches HTML statt Astro, gleicher Ablauf wie canuma (Push → GitHub Pages)
- 04.10.2026: Vorerst nur heller Modus (bewusst zurückgestellt, nicht vergessen – siehe Später)
- 04.10.2026: Wortmarke wie in der App (hell: Chef #163A7C, Klick #1A1A1C), kein Gold im hellen Modus
- 04.10.2026: Überschriften in Systemschrift wie die App, Montserrat nur für die Wortmarke
- 04.10.2026: Zusätzliche Web-Stufe --font-display (34 px Handy bis 44 px Desktop) nur für den Haupttitel der Startseite – gibt es in der App nicht
- 04.10.2026: Startseite, volle Fassung, von oben: 1 Kopf (Bild- + Wortmarke, "Bald verfügbar") · 2 Einstieg (Haupttitel display, ein Satz, Handy "Heute", Knopf "Interesse? Schreib uns") · 3 Module Temperatur/Checkliste/Warenannahme · 4 Kalender und PDF-Nachweis · 5 Was nie verloren geht (Grundsätze) · 6 Team (eigenes Handy, drei Rollen, Einladung per Code) · 7 Von einem Küchenchef gebaut (ohne Arbeitgeber) · 8 Kontakt · 9 Fusszeile (Impressum, Datenschutz, "ein Projekt von Canuma Studio" → canuma.ch)
- 04.10.2026: Kontaktadresse auf der Seite: info@canuma.ch (eigenes chefklick.ch-Postfach später)
- 04.10.2026: Handy als HTML-Nachbau wie auf canuma.ch, keine Screenshots
- Regel: --text-muted (Kontrast 3.2) nie für lesbaren Text, mindestens --text-secondary
- Schatten: App-Wert, Weichzeichner als 24px umgerechnet (iOS shadowRadius 12)

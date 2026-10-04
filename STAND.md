# chefklick.ch – Stand

## Projekt
- Website der App ChefKlick (HACCP-App für Gastronomiebetriebe), Betreiber Canuma Studio, Zürich
- Repo: https://github.com/Canuma-Studio/chefklick.ch (öffentlich)
- Domain: chefklick.ch (Hostpoint), Hosting: GitHub Pages wie canuma.ch
- Aufbau wie canuma: einfaches HTML/CSS ohne Bauschritt – index.html, styles.css, script.js, images/, fonts/
- Repo ist öffentlich: auch STAND.md und alle Commit-Nachrichten sind sichtbar. Nichts Internes, keine Schlüssel.

## Offen
1. Startseite im Browser beurteilen (Farbflächen, neu eingebaut) und gemeinsam durchgehen (Philipp, 04.10.2026: "erst fertig bauen, dann die Änderungen durchgehen"). Steht komplett, siehe Erledigt. Zum Durchgehen:
   - Texte unter den Kacheln und im Abschnitt Grundsätze (alle aus CHEFKLICK-KONTEXT, nur Fertiges)
   - Grundsatz "Jeder Tag bleibt genau so gespeichert, wie er ausgefüllt wurde" bewusst weggelassen: Gültigkeitszeiträume sind noch geplant
   - Bewegungen, die es in der App nicht gibt: Tagesblatt (zweite Karte blendet ein), Team (Kopfkarte blendet ein); alles andere wie in der App
   - Menü nur als Symbol: am Desktop sind die Bereiche nicht direkt sichtbar (Nachteil aus dem Artifact)
   - Kontraste der kräftigen Flächen nachmessen (Text ist überall --text-primary)
   - Codelänge 6 Ziffern angenommen (Supabase-Standard), nicht im App-Code nachgelesen
   - Foto des Lieferscheins: nur im Text erwähnt, Darstellung in der App noch nicht gelesen
2. Marken-PNGs (wortmarke-*.png, icon.png, favicon.png) erst übernehmen, wenn sie gebraucht werden
3. Texte – nur Funktionen, die in der App fertig sind
4. Entfällt: Statt des Handy-Nachbaus aus canuma steht im Einstieg die Kachel "Heute" (Entscheid 04.10.2026)
5. impressum.html und datenschutz.html (Vorlage canuma, Entwurf – muss geprüft werden), 404.html
6. Online gehen: CNAME, GitHub Pages einschalten, DNS bei Hostpoint wie bei canuma.ch, Enforce HTTPS, Domain bei GitHub verifizieren
7. Danach in canuma: ChefKlick-Link aktivieren (Kommentar in index.html) und Begriffe angleichen ("Putzliste" → "Checkliste", "Wareneingang" → "Warenannahme", "in Sekunden" prüfen)

## Später
- Dunkler Modus (wie App: Gold auf Schwarz): zweiter Satz derselben Variablen in styles.css + Umschalter-Pille oben rechts + prefers-color-scheme; color-scheme: light dann entfernen
- Mehrsprachigkeit: dann neu prüfen, ob ein Static-Site-Generator (z. B. Astro) sinnvoll ist
- Warteliste, Preise, Anleitung/FAQ
- Datenschutzerklärung und Support-Adresse für den App Store (kann hier liegen)
- Login-Bereich, falls je nötig: eigenes Projekt unter eigener Unteradresse (z. B. app.chefklick.ch), nicht in dieser Seite

## Entscheidungen
- 04.10.2026 (spät): Zusätzliche Bewegungen (Philipp: "mir fehlen noch ein paar Animationen"): Linie unter jedem Text zieht sich von links, danach "+ Interesse"; Ringe hinter dem Zwischentitel füllen sich wie DayRings.tsx (1.8 s); Grundsätze kommen nacheinander (Linie, Titel, Text); Menü-Links schweben gestaffelt herein. Was gleichzeitig ins Bild kommt, startet gestaffelt (150 ms)
- 04.10.2026 (spät): Startseite nach dem Vorbild noahbachofen.ch (Artifact "ChefKlick Farbflächen", Version 2) – ersetzt Kopf-Leiste, Einstieg mit Titel und das Raster der Funktionen. Farbflächen über die ganze Breite, Zweiteilung 50/50 abwechselnd, dünne Titel in Grossbuchstaben (Helvetica Light; ersetzt "Überschriften in Systemschrift" – in den Kacheln bleibt die Systemschrift), grosser Fliesstext, feine Linie mit "+"-Link, Menü nur als Symbol oben rechts. Farben: Satz "Kräftig" (aus den App-Farben aufgehellt, in der App so nicht vorhanden, Variablen --f-*). Abläufe der Kacheln bleiben. Alle sechs Funktionen. Bewegungen der Vorlage: Titel schweben 60 px herein, Texte blenden ein (1.2 s, Handy 0.6 s), Pfeil pulsiert, Kacheln laufen langsamer mit (nie über den Rand ihrer Fläche), Ringe hinter dem Zwischentitel stehen still, Menü fährt von rechts herein
- 04.10.2026 (spät): Eigene Ergänzungen zum Entwurf (Claude, bitte prüfen): Wortmarke im Einstieg baut sich weiter auf wie beim App-Start; Menü-Knopf als runde weisse Pille mit Schatten (bei der Vorlage ohne Grund – auf den dunklen Flächen sonst unsichtbar); Grundsätze mit den sechs bisherigen Texten (Entwurf hatte fünf, "Jede Person auf ihrem eigenen Handy" steht jetzt bei Team); "Mit Beispieldaten." unter dem Zwischentitel; Name "Philipp März" in der Linie unter dem Einstiegstext; Fusszeile ohne "Impressum · Datenschutz (folgen)"
- 04.10.2026: Website-Knöpfe mit Radius 14 wie die App-Knöpfe, keine Pille (Pillen nur für Chips und Zeilen, wie in der App)
- 04.10.2026: Rahmen A (Raster) bestätigt – am selben Abend verworfen: Abstände und Format zu schlecht (Philipp). Neu: Funktionen untereinander, links die Kachel, rechts der Text; ein Abstandswert --section-y (64 Handy / 96 Desktop) wie bei scoff; Bänder abwechselnd Beige/Weiss, Geschichte dunkelblau (--accent-dark); Kacheln auf farbigen Flächen in den Modulfarben der App, Icon-Chip mit Nummer, grosse Aussage je Funktion; Grundsätze als nummerierte Karten; Mailadresse gross. Nebeneinander erst ab 1000 px, am Handy läuft die Fläche bis an den Rand
- 04.10.2026: Kopf und Einstieg = Mischung aus "C Wie der App-Start" und "A Schwebende Leiste" (Artifact "ChefKlick Einstieg"): Kopf als schwebende Leiste nach ChefKlickTabBar.tsx mit aktivem Bereich auf tabActive; oben ohne Grund und ohne kleine Marke, solange die grosse Wortmarke im Bild ist. Einstieg: Wortmarke baut sich auf wie in ChefKlickLogo.tsx (Buchstaben, i-Punkt fällt und hüpft), darunter Titel mittig, Fläche mit Temperatur · Heute · Warenannahme (Nebenkacheln erst ab 1000 px)
- 04.10.2026: --text-muted auch dort, wo die App es für Text nutzt (Platzhalter, erledigte Aufgaben, "x von y erledigt", ungültige Werte), auf der Website --text-secondary
- 04.10.2026: Checkliste wie in der App mit zwei Karten (täglich / Grundreinigung), Haken ohne eigene Animation, keine Icons für Begründung und Rückgängig; Grundreinigung zeigt "erledigt am Montag, 21.09. von …"
- 04.10.2026: Web-Stufe --font-section (30 bis 40 px) für Abschnittstitel
- 04.10.2026: Namen in den Beispielen (Sam, Mia, Alex) und Aufgaben sind erfunden, Betrieb heisst "Beispielbetrieb"
- 04.10.2026: Fusszeile vorerst ohne Impressum/Datenschutz – Links kommen mit den Seiten (Punkt 5)
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

## Erledigt
- 04.10.2026 (spät): Vier zusätzliche Bewegungen eingebaut (siehe Entscheidungen). Geprüft 1280 px mit Zwischenbildern, Menü 390 und 1280 px (deckt das ganze Bild, Esc schliesst, Fokus zurück auf den Knopf), keine Fehler in der Konsole
- 04.10.2026 (spät): Farbflächen-Entwurf in index.html, styles.css, script.js eingebaut (siehe Entscheidungen). Kopf-Leiste, Einstieg mit Titel und Nebenkacheln, dunkles Band und grosse Wortmarke am Schluss entfernt; Kacheln unverändert übernommen. Geprüft 390 und 1280 px: kein seitliches Scrollen, keine Fehler in der Konsole, Kacheln stehen nie über ihre Fläche hinaus, Menü öffnet und schliesst (auch mit Esc); ohne JavaScript und bei "Bewegung reduzieren" steht alles sofort da, ohne JavaScript kein Menü-Knopf (Links in der Fusszeile)
- 04.10.2026: Kopf und Einstieg neu (siehe Entscheidungen). Geprüft 390–1440 px, ohne JavaScript und bei "Bewegung reduzieren" steht die Wortmarke sofort mit dem echten i-Punkt
- 04.10.2026: Umbau nach Rückmeldung (siehe Entscheidungen): Funktionen als Zeilen, Bänder, ein Abstandswert, mehr Charakter. Geprüft 390/768/1024/1280/1440 px, Kachelbreite überall 350–360 px wie am Handy
- 04.10.2026: Startseite fertig gebaut (erste Fassung, Raster): Kopf mit Links (ab 760 px), Einstieg, Funktionen mit sechs Kacheln 1:1 nach App-Code (Checkliste, Temperatur, Warenannahme, Monatsuhr, Tagesblatt, Team) und je einem Satz, Grundsätze, "Von einem Küchenchef gebaut", Kontakt, grosse Wortmarke, Fusszeile. Raster: 1 Spalte Handy, 2 ab 760 px, 3 ab 1180 px (vorher wären die Kacheln schmaler als am Handy). script.js steuert die Abläufe über data-at/data-type; ohne JavaScript und bei "Bewegung reduzieren" sofort Endzustand. Geprüft 390/768/1024/1280/1440 px, kein seitliches Scrollen, Abläufe gemessen
- 04.10.2026: Kopf und Favicon auf das App-Icon umgestellt, unbenutzte Marken-SVGs aus images/ entfernt (Fehler: zuerst die Bildmarke mit schwarzem Punkt genommen, die es in der App nicht gibt)
- 04.10.2026: index.html mit Kopf (Bildmarke, Wortmarke, Knopf "Interesse?") und Einstieg mit der Kachel "Heute" (Ringe nach DayRings.tsx, Zeilen nach dashboard.tsx, "Beispielansicht"); script.js: Kacheln bewegen sich einmal beim Sichtbarwerden, Startzustand per Zeile im Kopf von index.html (sonst springt die Animation oder läuft rückwärts); ohne JavaScript und bei "Bewegung reduzieren" Endzustand sofort. Geprüft 390 px und 1280 px, nur heller Modus
- 04.10.2026: Grundlage für die Startseite: Marken-SVGs nach images/ kopiert, images/icons.svg (7 Ionicons), LICENSES.md, styles.css mit den beiden Soft-Farben, .card nach Card.tsx (Radius 14, Innenabstand 16), neu .card-dash für die Karten auf "Heute" (Radius 20, Innenabstand 20, Rand), Knöpfe Radius 14
- 04.10.2026: styles.css mit allen App-Werten als CSS-Variablen (nur hell), Grundstile, Wortmarke, Knopf-Hierarchie, Karte; fonts/montserrat-bold.woff2 aus canuma kopiert
- 04.10.2026: Repo angelegt (öffentlich, leer), lokaler Ordner Projekt/Webseiten/chefklick.ch, STAND.md, .gitignore, .vscode/settings.json (wie canuma)

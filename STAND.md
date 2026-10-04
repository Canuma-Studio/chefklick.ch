# chefklick.ch – Stand

## Projekt
- Website der App ChefKlick (HACCP-App für Gastronomiebetriebe), Betreiber Canuma Studio, Zürich
- Repo: https://github.com/Canuma-Studio/chefklick.ch (öffentlich)
- Domain: chefklick.ch (Hostpoint), Hosting: GitHub Pages wie canuma.ch
- Aufbau wie canuma: einfaches HTML/CSS ohne Bauschritt – index.html, styles.css, script.js, images/, fonts/
- Repo ist öffentlich: auch STAND.md und alle Commit-Nachrichten sind sichtbar. Nichts Internes, keine Schlüssel.

## Offen
1. Startseite gemeinsam durchgehen (Philipp, 04.10.2026: "erst fertig bauen, dann die Änderungen durchgehen"). Steht komplett, siehe Erledigt. Zum Durchgehen:
   - Texte unter den Kacheln und im Abschnitt Grundsätze (alle aus CHEFKLICK-KONTEXT, nur Fertiges)
   - Grundsatz "Jeder Tag bleibt genau so gespeichert, wie er ausgefüllt wurde" bewusst weggelassen: Gültigkeitszeiträume sind noch geplant
   - Bewegungen, die es in der App nicht gibt: Tagesblatt (zweite Karte blendet ein), Team (Kopfkarte blendet ein); alles andere wie in der App
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
- 04.10.2026: Website-Knöpfe mit Radius 14 wie die App-Knöpfe, keine Pille (Pillen nur für Chips und Zeilen, wie in der App)
- 04.10.2026: Rahmen A (Raster) bestätigt
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
- 04.10.2026: Startseite fertig gebaut: Kopf mit Links (ab 760 px), Einstieg, Funktionen mit sechs Kacheln 1:1 nach App-Code (Checkliste, Temperatur, Warenannahme, Monatsuhr, Tagesblatt, Team) und je einem Satz, Grundsätze, "Von einem Küchenchef gebaut", Kontakt, grosse Wortmarke, Fusszeile. Raster: 1 Spalte Handy, 2 ab 760 px, 3 ab 1180 px (vorher wären die Kacheln schmaler als am Handy). script.js steuert die Abläufe über data-at/data-type; ohne JavaScript und bei "Bewegung reduzieren" sofort Endzustand. Geprüft 390/768/1024/1280/1440 px, kein seitliches Scrollen, Abläufe gemessen
- 04.10.2026: Kopf und Favicon auf das App-Icon umgestellt, unbenutzte Marken-SVGs aus images/ entfernt (Fehler: zuerst die Bildmarke mit schwarzem Punkt genommen, die es in der App nicht gibt)
- 04.10.2026: index.html mit Kopf (Bildmarke, Wortmarke, Knopf "Interesse?") und Einstieg mit der Kachel "Heute" (Ringe nach DayRings.tsx, Zeilen nach dashboard.tsx, "Beispielansicht"); script.js: Kacheln bewegen sich einmal beim Sichtbarwerden, Startzustand per Zeile im Kopf von index.html (sonst springt die Animation oder läuft rückwärts); ohne JavaScript und bei "Bewegung reduzieren" Endzustand sofort. Geprüft 390 px und 1280 px, nur heller Modus
- 04.10.2026: Grundlage für die Startseite: Marken-SVGs nach images/ kopiert, images/icons.svg (7 Ionicons), LICENSES.md, styles.css mit den beiden Soft-Farben, .card nach Card.tsx (Radius 14, Innenabstand 16), neu .card-dash für die Karten auf "Heute" (Radius 20, Innenabstand 20, Rand), Knöpfe Radius 14
- 04.10.2026: styles.css mit allen App-Werten als CSS-Variablen (nur hell), Grundstile, Wortmarke, Knopf-Hierarchie, Karte; fonts/montserrat-bold.woff2 aus canuma kopiert
- 04.10.2026: Repo angelegt (öffentlich, leer), lokaler Ordner Projekt/Webseiten/chefklick.ch, STAND.md, .gitignore, .vscode/settings.json (wie canuma)

# chefklick.ch – Stand

## Projekt
- Website der App ChefKlick (HACCP-App für Gastronomiebetriebe), Betreiber Canuma Studio, Zürich
- Repo: https://github.com/Canuma-Studio/chefklick.ch (öffentlich)
- Domain: chefklick.ch (Hostpoint), Hosting: GitHub Pages wie canuma.ch
- Aufbau wie canuma: einfaches HTML/CSS ohne Bauschritt – index.html, styles.css, script.js, images/, fonts/
- Repo ist öffentlich: auch STAND.md und alle Commit-Nachrichten sind sichtbar. Nichts Internes, keine Schlüssel.

## Offen
1. Kacheln umsetzen: Gestaltung ist entschieden (siehe Entscheidungen). Vorlage ist das Artifact "ChefKlick Kacheln" (Version 2). Offen dabei:
   - Website-Knöpfe: Pille (wie bisher in styles.css) oder Radius 14 wie die Knöpfe der App?
   - Rahmen A (Raster) als Annahme übernommen – bestätigen
   - styles.css ergänzen: --module-checklist-soft #E6ECE9, --module-temperature-soft #E4EEF6 (gibt es in der App, fehlen hier)
   - Ionicons (MIT) als SVG einbinden, Lizenzhinweis ins Repo
   - Foto des Lieferscheins: Darstellung in der App noch nicht gelesen
2. Marken-Dateien aus ChefKlick/assets/brand übernehmen (kopieren, nicht neu zeichnen)
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
- 04.10.2026: styles.css mit allen App-Werten als CSS-Variablen (nur hell), Grundstile, Wortmarke, Knopf-Hierarchie, Karte; fonts/montserrat-bold.woff2 aus canuma kopiert
- 04.10.2026: Repo angelegt (öffentlich, leer), lokaler Ordner Projekt/Webseiten/chefklick.ch, STAND.md, .gitignore, .vscode/settings.json (wie canuma)

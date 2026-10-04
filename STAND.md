# chefklick.ch – Stand

## Projekt
- Website der App ChefKlick (HACCP-App für Gastronomiebetriebe), Betreiber Canuma Studio, Zürich
- Repo: https://github.com/Canuma-Studio/chefklick.ch (öffentlich)
- Domain: chefklick.ch (Hostpoint), Hosting: GitHub Pages wie canuma.ch
- Aufbau wie canuma: einfaches HTML/CSS ohne Bauschritt – index.html, styles.css, script.js, images/, fonts/
- Repo ist öffentlich: auch STAND.md und alle Commit-Nachrichten sind sichtbar. Nichts Internes, keine Schlüssel.

## Offen
1. Design-Grundlage: Farben, Abstände, Radien und Schriftgrössen aus der App als CSS-Variablen, hell (Standard) und dunkel, eigener Umschalter – Entscheidung an einem Artifact
2. Seitenstruktur der Startseite festlegen (Abschnitte)
3. Marken-Dateien aus ChefKlick/assets/brand übernehmen (kopieren, nicht neu zeichnen); Montserrat Bold aus canuma/fonts
4. Texte – nur Funktionen, die in der App fertig sind
5. Screenshots mit neutralem Demo-Betrieb
6. impressum.html und datenschutz.html (Vorlage canuma, Entwurf – muss geprüft werden), 404.html
7. Online gehen: CNAME, GitHub Pages einschalten, DNS bei Hostpoint wie bei canuma.ch, Enforce HTTPS, Domain bei GitHub verifizieren
8. Danach in canuma: ChefKlick-Link aktivieren (Kommentar in index.html) und Begriffe angleichen ("Putzliste" → "Checkliste", "Wareneingang" → "Warenannahme", "in Sekunden" prüfen)

## Später
- Mehrsprachigkeit: dann neu prüfen, ob ein Static-Site-Generator (z. B. Astro) sinnvoll ist
- Warteliste, Preise, Anleitung/FAQ
- Datenschutzerklärung und Support-Adresse für den App Store (kann hier liegen)
- Login-Bereich, falls je nötig: eigenes Projekt unter eigener Unteradresse (z. B. app.chefklick.ch), nicht in dieser Seite

## Entscheidungen
- 04.10.2026: Erste Version = reine Vorstellung, "Bald verfügbar", Kontakt per Mail-Link, kein Formular, keine Daten
- 04.10.2026: Einfaches HTML statt Astro, gleicher Ablauf wie canuma (Push → GitHub Pages)

## Erledigt
- 04.10.2026: Repo angelegt (öffentlich, leer), lokaler Ordner Projekt/Webseiten/chefklick.ch, STAND.md, .gitignore, .vscode/settings.json (wie canuma)

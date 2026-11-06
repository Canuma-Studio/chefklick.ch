# chefklick.ch – Stand

Regeln, Technik, Design und Entscheidungen: PROJEKT.md. Erledigtes: VERLAUF.md.

## Offen
1. Startseite im Browser beurteilen (Farbflächen, neu eingebaut) und gemeinsam durchgehen (Philipp, 04.10.2026: "erst fertig bauen, dann die Änderungen durchgehen"). Steht komplett, siehe Erledigt. Zum Durchgehen:
   - Texte unter den Kacheln und im Abschnitt Grundsätze (alle aus CHEFKLICK-KONTEXT, nur Fertiges)
   - Grundsatz "Jeder Tag bleibt genau so gespeichert, wie er ausgefüllt wurde": bisher bewusst weggelassen, seit 12.10.2026 in der App fertig (Kalender, Tagesblatt, PDF) – kann aufgenommen werden
   - Bewegungen, die es in der App nicht gibt: Tagesblatt (zweite Karte blendet ein), Team (Kopfkarte blendet ein); alles andere wie in der App
   - Schleife und Aufdecken am Handy bei allen sechs Kacheln ansehen (geprüft nur Temperatur)
   - Menü nur als Symbol: am Desktop sind die Bereiche nicht direkt sichtbar (Nachteil aus dem Artifact)
   - Codelänge 6 Ziffern angenommen (Supabase-Standard), nicht im App-Code nachgelesen
   - Foto des Lieferscheins: nur im Text erwähnt, Darstellung in der App noch nicht gelesen
2. Marken-PNGs (wortmarke-*.png, icon.png, favicon.png) erst übernehmen, wenn sie gebraucht werden
3. Texte – nur Funktionen, die in der App fertig sind
4. Entfällt: Statt des Handy-Nachbaus aus canuma steht im Einstieg die Kachel "Heute" (Entscheid 04.10.2026)
5. Rechtstexte von einer Fachperson prüfen lassen (Philipp, in den nächsten Tagen). Entwürfe von Claude sind online. Fragen dazu:
   - Impressum ohne Postadresse (nur "Zürich, Schweiz") – reicht das, solange auf der Seite nichts verkauft wird? Ab wann braucht es eine vollständige Adresse?
   - Canuma Studio ist nicht im Handelsregister: reicht "Canuma Studio, Philipp März" als Anbieter?
   - GitHub (Hosting, USA) unter dem Swiss-U.S. Data Privacy Framework – Formulierung so richtig?
   - Für die App (app.chefklick.ch, Beta mit Codes): Datenschutzerklärung, Nutzungsbedingungen, Auftragsbearbeitung (Betriebe speichern Namen ihrer Mitarbeitenden), Aufbewahrungsdauer, Haftung bei Ausfall
6. canuma.ch bei GitHub verifizieren: TXT-Eintrag steht und ist sichtbar, erster Versuch "Verify" war zu früh – nochmals klicken (Org-Settings → Pages). Für chefklick.ch erledigt
7. Danach in canuma: ChefKlick-Link aktivieren (Kommentar in index.html) und Begriffe angleichen ("Putzliste" → "Checkliste", "Wareneingang" → "Warenannahme", "in Sekunden" prüfen)

## Später
- Dunkler Modus (wie App: Gold auf Schwarz): zweiter Satz derselben Variablen in styles.css + Umschalter-Pille oben rechts + prefers-color-scheme; color-scheme: light dann entfernen
- Mehrsprachigkeit: dann neu prüfen, ob ein Static-Site-Generator (z. B. Astro) sinnvoll ist. Die App startet nur auf Deutsch (12.10.2026), Mehrsprachigkeit frühestens nach der Beta
- Warteliste, Preise, Anleitung/FAQ
- Datenschutzerklärung und Support-Adresse für den App Store (kann hier liegen)

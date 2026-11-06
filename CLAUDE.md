# chefklick.ch

**Lade zu Beginn jeder Sitzung den Skill `anthropic-skills:mein-workflow`.**
Diese Datei bleibt trotzdem vollstaendig. Widerspricht sich etwas, gilt
diese Datei, und es wird gemeldet.

Dieses Repo ist oeffentlich. Nichts Internes in Dateien oder
Commit-Nachrichten.

Projektinhalt: PROJEKT.md (Regeln, Stack, Design), STAND.md (Stand,
naechster Schritt). Vor einer Aenderung beide lesen.

## Arbeitsregeln
- Eine Aenderung pro Prompt. Keine Verbesserungen nebenbei.
- Auffaelligkeiten melden statt beheben.
- Rueckfragen im Prompt ausdruecklich beantworten.
- Nur committen, wenn der Prompt es verlangt.
- Pruefbefehl nach jeder Aenderung: Seite im Browser oeffnen, bei 390 und
  1280 px, Konsole ohne Fehler, kein seitliches Scrollen.

## Ausgabe
Kein Protokoll, kein Diff im Chat. UEBERGABE.txt (ungetrackt, jedes Mal
ueberschrieben, unter 20 Zeilen):
1. Bin ich vom Prompt abgewichen, warum?
2. Was ist mir aufgefallen, das ich nicht angefasst habe?
3. Habe ich etwas angenommen statt gelesen? Wo?
4. Ergebnis der Pruefung.
Trifft etwas nicht zu: "nichts".

## Projektspezifisch
Siehe PROJEKT.md. Neue Arbeitsdateien zusaetzlich in _config.yml unter
exclude eintragen, sonst veroeffentlicht GitHub Pages sie.

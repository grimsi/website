# grimsi.de

persönliche website

#### bekannte Bugs:
- require.conf.js lädt manchmal zu schnell, sodass die Seite beim laden hängen bleibt
    - Lösung: Reihenfolge ändern, in der die JS Dateien geladen werden

#### zukünftige Features:
- Erweiterungen am Dateisystem:
    - mkdir: Ordner erstellen
    - cd: Unterstützung für Pfade
    - ls: Unterstützung für Pfade
    - nano: minimaler Texteditor
    - .md: Unterstützung für .md Dateien mit minimalem Markdown Parser
    - persistente Speicherung (zumindest von Daten, die der Nutzer erstellt hat)
- Sonstige Verbesserungen:
    - man: Jeder Befehl hat eigene .man Datei, die man sich mit "man {Befehl}" anzeigen lassen kann
    - help: Kurzbeschreibung soll hinter jedem Befehl angezeigt werden
    - Refactoring von KeyEvents (Ziel: selbe modulare Struktur wie Commands)
    - htop: Simulation eines Prozessmanagers
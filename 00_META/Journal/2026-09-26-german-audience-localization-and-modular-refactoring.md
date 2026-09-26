---
fach: Meta
thema: "Lokalisierung und Entschlackung für deutsche Schüler sowie modulare Zielgruppenarchitektur"
datum: 2026-09-26
tags: [EF, Meta, App, Didaktik, NRW]
---

# 2026-09-26 Lokalisierung und Entschlackung für deutsche Schüler sowie modulare Zielgruppenarchitektur

## 1. Was wurde getan
1. **Modulares Zielgruppen- und Operatorensystem (`src/config/audience.ts`)**:
   - Trennung von Zielgruppen-Profilen: `de-native` (deutsche Gymnasiasten / NRW Sek II), `zh-bilingual` (zweisprachig mit CN-Brücke), `en-intl` (internationale Expansion).
   - Vollständige NRW-Operatoren-Tabelle mit Anforderungsbereichen (AFB I: Reproduktion, AFB II: Transfer, AFB III: Reflexion) und Prüfungs-Tipps.
   - Intelligenter Entschlackungsfilter `filterBlocksForGermanNative`: blendet rein chinesische Textblöcke und Gerüste aus, damit deutsche Schüler eine aufgeräumte, hochakademische Lernumgebung ohne Sprachmischung vorfinden.
2. **Reine deutsche Ansicht & Lesemodus-Umschaltung (`Library.tsx` & `Blocks.tsx`)**:
   - Umschalter in der Notiz-Kopfzeile: `[DE rein]` (Fokus auf Fachsprache und Klausur-Sätze ohne CN-Übersetzung) vs. `[Bilingual]` (zweisprachig).
   - Dynamische Anzeige des höchsten AFB-Werts (`AFB I`, `AFB II`, `AFB III`) direkt neben dem Fach.
   - Klickbare Operatoren-Chips mit interaktivem Erklär-Banner und Klausur-Tipps nach NRW-Kernlehrplan.
   - Saubere ASCII-Schließen-Aktion ohne visuelle Vertragsverletzungen.

## 2. Test & Qualitätssicherung
- `python scripts/vault-check.py` → PASS (notes=388, csv=1595, reisen=88, badnames=0, badglossar=0).
- `vitest run` → 58/58 Testdateien bestanden (387/387 Tests grün).
- `npm run build` → 0 Fehler, Produktions-Bundle in 4.59s erstellt.

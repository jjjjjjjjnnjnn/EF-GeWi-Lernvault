/**
 * German Orthography Utility: Restores German Umlauts (ä, ö, ü, Ä, Ö, Ü, ß)
 * from telex-style ASCII representations (ae, oe, ue, ss) for authentic,
 * high-readability German Oberstufe texts, titles, and callouts.
 *
 * Avoids false positives (e.g. "neue", "Aktie", "Quelle", "treu", "bauen", "Frauen", "Auge", "Duell").
 */

// Prefix / exact word replacement patterns
const EXACT_REPLACEMENTS: [RegExp, string][] = [
  [/\bUeberblick\b/g, "Überblick"],
  [/\bueberblick\b/g, "Überblick"],
  [/\bUeberpruefung\b/g, "Überprüfung"],
  [/\bueberpruefung\b/g, "Überprüfung"],
  [/\bUeberpruefen\b/g, "Überprüfen"],
  [/\bueberpruefen\b/g, "überprüfen"],
  [/\bUeberprueft\b/g, "Überprüft"],
  [/\bueberprueft\b/g, "überprüft"],
  [/\bUeberraschung\b/g, "Überraschung"],
  [/\bueberraschung\b/g, "Überraschung"],
  [/\bUebertragen\b/g, "Übertragen"],
  [/\buebertragen\b/g, "übertragen"],
  [/\bUeberzeugung\b/g, "Überzeugung"],
  [/\bueberzeugung\b/g, "Überzeugung"],
  [/\bUeber\b/g, "Über"],
  [/\bueber\b/g, "über"],
  [/\bdarueber\b/g, "darüber"],
  [/\bworueber\b/g, "worüber"],
  [/\bhinueber\b/g, "hinüber"],
  [/\bherueber\b/g, "herüber"],

  [/\bFuer\b/g, "Für"],
  [/\bfuer\b/g, "für"],
  [/\bdafuer\b/g, "dafür"],
  [/\bwofuer\b/g, "wofür"],
  [/\bhierfuer\b/g, "hierfür"],

  [/\bVerstaendnis\b/g, "Verständnis"],
  [/\bverstaendnis\b/g, "Verständnis"],
  [/\bVerstaendlich\b/g, "Verständlich"],
  [/\bverstaendlich\b/g, "verständlich"],
  [/\bUnverstaendlich\b/g, "Unverständlich"],
  [/\bunverstaendlich\b/g, "unverständlich"],

  [/\bErklaerung\b/g, "Erklärung"],
  [/\berklaerung\b/g, "Erklärung"],
  [/\bErklaerungen\b/g, "Erklärungen"],
  [/\berklaerungen\b/g, "Erklärungen"],
  [/\bErklaeren\b/g, "Erklären"],
  [/\berklaeren\b/g, "erklären"],
  [/\bErklaert\b/g, "Erklärt"],
  [/\berklaert\b/g, "erklärt"],

  [/\bLoesung\b/g, "Lösung"],
  [/\bloesung\b/g, "Lösung"],
  [/\bLoesungen\b/g, "Lösungen"],
  [/\bloesungen\b/g, "Lösungen"],
  [/\bMusterloesung\b/g, "Musterlösung"],
  [/\bmusterloesung\b/g, "Musterlösung"],
  [/\bMusterloesungen\b/g, "Musterlösungen"],
  [/\bLoesen\b/g, "Lösen"],
  [/\bloesen\b/g, "lösen"],
  [/\bGeloest\b/g, "Gelöst"],
  [/\bgeloest\b/g, "gelöst"],
  [/\bErloes\b/g, "Erlös"],
  [/\berloes\b/g, "Erlös"],
  [/\bAusloesung\b/g, "Auslösung"],
  [/\bausloesung\b/g, "Auslösung"],
  [/\bAusloeser\b/g, "Auslöser"],
  [/\bausloeser\b/g, "Auslöser"],
  [/\bAusloesen\b/g, "Auslösen"],
  [/\bausloesen\b/g, "auslösen"],
  [/\bAusgeloest\b/g, "Ausgelöst"],
  [/\bausgeloest\b/g, "ausgelöst"],

  [/\bPhaenomen\b/g, "Phänomen"],
  [/\bphaenomen\b/g, "Phänomen"],
  [/\bPhaenomene\b/g, "Phänomene"],
  [/\bphaenomene\b/g, "Phänomene"],
  [/\bPhaenomens\b/g, "Phänomens"],

  [/\bMoeglich\b/g, "Möglich"],
  [/\bmoeglich\b/g, "möglich"],
  [/\bUnmoeglich\b/g, "Unmöglich"],
  [/\bunmoeglich\b/g, "unmöglich"],
  [/\bMoeglichkeit\b/g, "Möglichkeit"],
  [/\bmoeglichkeit\b/g, "Möglichkeit"],
  [/\bMoeglichkeiten\b/g, "Möglichkeiten"],
  [/\bmoeglichkeiten\b/g, "Möglichkeiten"],
  [/\bMoeglicherweise\b/g, "Möglicherweise"],
  [/\bmoeglicherweise\b/g, "möglicherweise"],

  [/\bKoennen\b/g, "Können"],
  [/\bkoennen\b/g, "können"],
  [/\bKoennte\b/g, "Könnte"],
  [/\bkoennte\b/g, "könnte"],
  [/\bKoennten\b/g, "Könnten"],
  [/\bkoennten\b/g, "könnten"],

  [/\bMuessen\b/g, "Müssen"],
  [/\bmuessen\b/g, "müssen"],
  [/\bMuesste\b/g, "Müsste"],
  [/\bmuesste\b/g, "müsste"],
  [/\bMuessten\b/g, "Müssten"],
  [/\bmuessten\b/g, "müssten"],

  [/\bRueckkopplung\b/g, "Rückkopplung"],
  [/\brueckkopplung\b/g, "Rückkopplung"],
  [/\bRueckkopplungen\b/g, "Rückkopplungen"],
  [/\brueckkopplungen\b/g, "Rückkopplungen"],
  [/\bRueckgang\b/g, "Rückgang"],
  [/\brueckgang\b/g, "Rückgang"],
  [/\bRueckschritt\b/g, "Rückschritt"],
  [/\brueckschritt\b/g, "Rückschritt"],
  [/\bRueckblick\b/g, "Rückblick"],
  [/\brueckblick\b/g, "Rückblick"],
  [/\bRueckstand\b/g, "Rückstand"],
  [/\brueckstand\b/g, "Rückstand"],
  [/\bZurueck\b/g, "Zurück"],
  [/\bzurueck\b/g, "zurück"],

  [/\bStoerung\b/g, "Störung"],
  [/\bstoerung\b/g, "Störung"],
  [/\bStoerungen\b/g, "Störungen"],
  [/\bstoerungen\b/g, "Störungen"],
  [/\bStoeren\b/g, "Stören"],
  [/\bstoeren\b/g, "stören"],
  [/\bGestoert\b/g, "Gestört"],
  [/\bgestoert\b/g, "gestört"],
  [/\bGleichgewichtsstoerung\b/g, "Gleichgewichtsstörung"],
  [/\bgleichgewichtsstoerung\b/g, "Gleichgewichtsstörung"],
  [/\bGleichgewichtsstoerungen\b/g, "Gleichgewichtsstörungen"],

  [/\bGefaelle\b/g, "Gefälle"],
  [/\bgefaelle\b/g, "Gefälle"],
  [/\bKonzentrationsgefaelle\b/g, "Konzentrationsgefälle"],
  [/\bkonzentrationsgefaelle\b/g, "Konzentrationsgefälle"],
  [/\bSpannungsgefaelle\b/g, "Spannungsgefälle"],

  [/\bMolekuel\b/g, "Molekül"],
  [/\bmolekuel\b/g, "Molekül"],
  [/\bMolekuele\b/g, "Moleküle"],
  [/\bmolekuele\b/g, "Moleküle"],
  [/\bMolekuelen\b/g, "Molekülen"],
  [/\bmolekuelen\b/g, "Molekülen"],
  [/\bMakromolekuel\b/g, "Makromolekül"],
  [/\bMakromolekuele\b/g, "Makromoleküle"],

  [/\bKoepfe\b/g, "Köpfe"],
  [/\bkoepfe\b/g, "Köpfe"],
  [/\bKoepfen\b/g, "Köpfen"],
  [/\bkoepfen\b/g, "Köpfen"],
  [/\bSchwaenze\b/g, "Schwänze"],
  [/\bschwaenze\b/g, "Schwänze"],
  [/\bSchwaenzen\b/g, "Schwänzen"],
  [/\bschwaenzen\b/g, "Schwänzen"],

  [/\bKanaele\b/g, "Kanäle"],
  [/\bkanaele\b/g, "Kanäle"],
  [/\bKanaelen\b/g, "Kanälen"],
  [/\bkanaelen\b/g, "Kanälen"],
  [/\bIonenkanal\b/g, "Ionenkanal"],
  [/\bIonenkanaele\b/g, "Ionenkanäle"],
  [/\bionenkanaele\b/g, "Ionenkanäle"],

  [/\bTraeger\b/g, "Träger"],
  [/\btraeger\b/g, "Träger"],
  [/\bTraegern\b/g, "Trägern"],
  [/\btraegern\b/g, "Trägern"],
  [/\bTraegermolekuel\b/g, "Trägermolekül"],
  [/\bTraegermolekuele\b/g, "Trägermoleküle"],
  [/\bLadungstraeger\b/g, "Ladungsträger"],

  [/\bGroesse\b/g, "Größe"],
  [/\bgroesse\b/g, "Größe"],
  [/\bGroessen\b/g, "Größen"],
  [/\bgroessen\b/g, "Größen"],
  [/\bGroesser\b/g, "Größer"],
  [/\bgroesser\b/g, "größer"],
  [/\bGroesste\b/g, "Größte"],
  [/\bgroesste\b/g, "größte"],
  [/\bGroesstenteils\b/g, "Größtenteils"],

  [/\bFluessig\b/g, "Flüssig"],
  [/\bfluessig\b/g, "flüssig"],
  [/\bFluessigkeit\b/g, "Flüssigkeit"],
  [/\bfluessigkeit\b/g, "Flüssigkeit"],
  [/\bFluessigkeiten\b/g, "Flüssigkeiten"],
  [/\bfluessigkeiten\b/g, "Flüssigkeiten"],
  [/\bFluessig-Mosaik-Modell\b/g, "Flüssig-Mosaik-Modell"],

  [/\bPrimaer\b/g, "Primär"],
  [/\bprimaer\b/g, "primär"],
  [/\bSekundaer\b/g, "Sekundär"],
  [/\bsekundaer\b/g, "sekundär"],
  [/\bTertiaer\b/g, "Tertiär"],
  [/\btertiaer\b/g, "tertiär"],
  [/\bQuartaer\b/g, "Quartär"],
  [/\bquartaer\b/g, "quartär"],

  [/\bAenderung\b/g, "Änderung"],
  [/\baenderung\b/g, "Änderung"],
  [/\bAenderungen\b/g, "Änderungen"],
  [/\baenderungen\b/g, "Änderungen"],
  [/\bAendern\b/g, "Ändern"],
  [/\baendern\b/g, "ändern"],
  [/\bGeaendert\b/g, "Geändert"],
  [/\bgeaendert\b/g, "geändert"],

  [/\bOeffnung\b/g, "Öffnung"],
  [/\boeffnung\b/g, "Öffnung"],
  [/\bOeffnungen\b/g, "Öffnungen"],
  [/\boeffnungen\b/g, "Öffnungen"],
  [/\bOeffnen\b/g, "Öffnen"],
  [/\boeffnen\b/g, "öffnen"],
  [/\bGeoeffnet\b/g, "Geöffnet"],
  [/\bgeoeffnet\b/g, "geöffnet"],

  [/\bKnoepfe\b/g, "Knöpfe"],
  [/\bknoepfe\b/g, "Knöpfe"],
  [/\bKnopfes\b/g, "Knopfes"],

  [/\bPruefung\b/g, "Prüfung"],
  [/\bpruefung\b/g, "Prüfung"],
  [/\bPruefungen\b/g, "Prüfungen"],
  [/\bpruefungen\b/g, "Prüfungen"],
  [/\bPruefen\b/g, "Prüfen"],
  [/\bpruefen\b/g, "prüfen"],
  [/\bGeprueft\b/g, "Geprüft"],
  [/\bgeprueft\b/g, "geprüft"],
  [/\bPruefstein\b/g, "Prüfstein"],

  [/\bMuendlich\b/g, "Mündlich"],
  [/\bmuendlich\b/g, "mündlich"],
  [/\bMuendliche\b/g, "Mündliche"],
  [/\bmuendliche\b/g, "mündliche"],
  [/\bMuendlicher\b/g, "Mündlicher"],
  [/\bmuendlicher\b/g, "mündlicher"],
  [/\bMuendlichen\b/g, "Mündlichen"],
  [/\bmuendlichen\b/g, "mündlichen"],

  [/\bWaehrend\b/g, "Während"],
  [/\bwaehrend\b/g, "während"],

  [/\bWaehlen\b/g, "Wählen"],
  [/\bwaehlen\b/g, "wählen"],
  [/\bGewaehlt\b/g, "Gewählt"],
  [/\bgewaehlt\b/g, "gewählt"],
  [/\bAuswaehlen\b/g, "Auswählen"],
  [/\bauswaehlen\b/g, "auswählen"],
  [/\bAusgewaehlt\b/g, "Ausgewählt"],
  [/\bausgewaehlt\b/g, "ausgewählt"],
  [/\bWaehler\b/g, "Wähler"],
  [/\bwaehler\b/g, "Wähler"],

  [/\bVerhaeltnis\b/g, "Verhältnis"],
  [/\bverhaeltnis\b/g, "Verhältnis"],
  [/\bVerhaeltnisse\b/g, "Verhältnisse"],
  [/\bverhaeltnisse\b/g, "Verhältnisse"],
  [/\bVerhaeltnismaessig\b/g, "Verhältnismäßig"],
  [/\bverhaeltnismaessig\b/g, "verhältnismäßig"],

  [/\bAbhaengig\b/g, "Abhängig"],
  [/\babhaengig\b/g, "abhängig"],
  [/\bUnabhaengig\b/g, "Unabhängig"],
  [/\bunabhaengig\b/g, "unabhängig"],
  [/\bAbhaengigkeit\b/g, "Abhängigkeit"],
  [/\babhaengigkeit\b/g, "Abhängigkeit"],
  [/\bUnabhaengigkeit\b/g, "Unabhängigkeit"],
  [/\bunabhaengigkeit\b/g, "Unabhängigkeit"],

  [/\bNaehrstoff\b/g, "Nährstoff"],
  [/\bnaehrstoff\b/g, "Nährstoff"],
  [/\bNaehrstoffe\b/g, "Nährstoffe"],
  [/\bnaehrstoffe\b/g, "Nährstoffe"],
  [/\bNaehrloesung\b/g, "Nährlösung"],
  [/\bnaehrloesung\b/g, "Nährlösung"],

  [/\bPraezise\b/g, "Präzise"],
  [/\bpraezise\b/g, "präzise"],
  [/\bPraezision\b/g, "Präzision"],
  [/\bpraezision\b/g, "Präzision"],

  [/\bFaehigkeit\b/g, "Fähigkeit"],
  [/\bfaehigkeit\b/g, "Fähigkeit"],
  [/\bFaehigkeiten\b/g, "Fähigkeiten"],
  [/\bfaehigkeiten\b/g, "Fähigkeiten"],
  [/\bTragfaehigkeit\b/g, "Tragfähigkeit"],
  [/\btragfaehigkeit\b/g, "Tragfähigkeit"],
  [/\bLeistungsfaehigkeit\b/g, "Leistungsfähigkeit"],

  [/\bOberflaeche\b/g, "Oberfläche"],
  [/\boberflaeche\b/g, "Oberfläche"],
  [/\bOberflaechen\b/g, "Oberflächen"],
  [/\boberflaechen\b/g, "Oberflächen"],
  [/\bOberflaechenspannung\b/g, "Oberflächenspannung"],

  [/\bWaerme\b/g, "Wärme"],
  [/\bwaerme\b/g, "Wärme"],
  [/\bWaermemenge\b/g, "Wärmemenge"],
  [/\bWaermekapazitaet\b/g, "Wärmekapazität"],
  [/\bWaermelehre\b/g, "Wärmelehre"],

  [/\bSaeure\b/g, "Säure"],
  [/\bsaeure\b/g, "Säure"],
  [/\bSaeuren\b/g, "Säuren"],
  [/\bsaeuren\b/g, "Säuren"],
  [/\bSaeure-Base\b/g, "Säure-Base"],
  [/\bSaeure-Base-Titration\b/g, "Säure-Base-Titration"],
  [/\bAminosaeure\b/g, "Aminosäure"],
  [/\bAminosaeuren\b/g, "Aminosäuren"],
  [/\bFettsaeure\b/g, "Fettsäure"],
  [/\bFettsaeuren\b/g, "Fettsäuren"],
  [/\bSaeurekonstante\b/g, "Säurekonstante"],

  [/\bDruecken\b/g, "Drücken"],
  [/\bdruecken\b/g, "drücken"],
  [/\bUnterdruecken\b/g, "Unterdrücken"],
  [/\bunterdruecken\b/g, "unterdrücken"],
  [/\bAusdruecken\b/g, "Ausdrücken"],
  [/\bausdruecken\b/g, "ausdrücken"],
  [/\bAusdruck\b/g, "Ausdruck"],

  [/\bKoerper\b/g, "Körper"],
  [/\bkoerper\b/g, "Körper"],
  [/\bKoerpern\b/g, "Körpern"],
  [/\bkoerpern\b/g, "Körpern"],
  [/\bFestkoerper\b/g, "Festkörper"],
  [/\bFluechtling\b/g, "Flüchtling"],

  [/\bStroemung\b/g, "Strömung"],
  [/\bstroemung\b/g, "Strömung"],
  [/\bStroemen\b/g, "Strömen"],
  [/\bstroemen\b/g, "strömen"],
  [/\bStroemt\b/g, "Strömt"],
  [/\bstroemt\b/g, "strömt"],
  [/\bEinstroemen\b/g, "Einströmen"],
  [/\beinstroemen\b/g, "einströmen"],
  [/\bAusstroemen\b/g, "Ausströmen"],
  [/\bausstroemen\b/g, "ausströmen"],

  [/\bZustaende\b/g, "Zustände"],
  [/\bzustaende\b/g, "Zustände"],
  [/\bZustand\b/g, "Zustand"],
  [/\bUebergaenge\b/g, "Übergänge"],
  [/\buebergaenge\b/g, "Übergänge"],
  [/\bUebergang\b/g, "Übergang"],

  [/\bZaehlen\b/g, "Zählen"],
  [/\bzaehlen\b/g, "zählen"],
  [/\bZaehler\b/g, "Zähler"],
  [/\bzaehler\b/g, "Zähler"],
  [/\bErzaehlung\b/g, "Erzählung"],
  [/\berzaehlung\b/g, "Erzählung"],

  [/\bAuspraegung\b/g, "Ausprägung"],
  [/\bauspraegung\b/g, "Ausprägung"],
  [/\bAuspraegungen\b/g, "Ausprägungen"],
  [/\bauspraegungen\b/g, "Ausprägungen"],
  [/\bGepraegt\b/g, "Geprägt"],
  [/\bgepraegt\b/g, "geprägt"],

  [/\bMassnahme\b/g, "Maßnahme"],
  [/\bmassnahme\b/g, "Maßnahme"],
  [/\bMassnahmen\b/g, "Maßnahmen"],
  [/\bmassnahmen\b/g, "Maßnahmen"],

  [/\bRegelmaessig\b/g, "Regelmäßig"],
  [/\bregelmaessig\b/g, "regelmäßig"],
  [/\bUnregelmaessig\b/g, "Unregelmäßig"],
  [/\bunregelmaessig\b/g, "unregelmäßig"],
  [/\bGleichmaessig\b/g, "Gleichmäßig"],
  [/\bgleichmaessig\b/g, "gleichmäßig"],

  [/\bSchliesslich\b/g, "Schließlich"],
  [/\bschliesslich\b/g, "schließlich"],
  [/\bAusschliesslich\b/g, "Ausschließlich"],
  [/\bausschliesslich\b/g, "ausschließlich"],

  [/\bUebung\b/g, "Übung"],
  [/\buebung\b/g, "Übung"],
  [/\bUebungen\b/g, "Übungen"],
  [/\buebungen\b/g, "Übungen"],

  [/\bUmwaelzung\b/g, "Umwälzung"],
  [/\bumwaelzung\b/g, "Umwälzung"],
  [/\bZerstoerung\b/g, "Zerstörung"],
  [/\bzerstoerung\b/g, "Zerstörung"],
  [/\bZerstoeren\b/g, "Zerstören"],
  [/\bzerstoeren\b/g, "zerstören"],

  [/\bSchoen\b/g, "Schön"],
  [/\bschoen\b/g, "schön"],
  [/\bSchoenheit\b/g, "Schönheit"],
  [/\bschoenheit\b/g, "Schönheit"],

  [/\bHoeren\b/g, "Hören"],
  [/\bhoeren\b/g, "hören"],
  [/\bGehoeren\b/g, "Gehören"],
  [/\bgehoeren\b/g, "gehören"],
  [/\bGehoert\b/g, "Gehört"],
  [/\bgehoert\b/g, "gehört"],
  [/\bGehoer\b/g, "Gehör"],
  [/\bgehoer\b/g, "Gehör"],

  [/\bErhoehung\b/g, "Erhöhung"],
  [/\berhoehung\b/g, "Erhöhung"],
  [/\bErhoehen\b/g, "Erhöhen"],
  [/\berhoehen\b/g, "erhöhen"],
  [/\bErhoeht\b/g, "Erhöht"],
  [/\berhoeht\b/g, "erhöht"],

  [/\bKuerzer\b/g, "Kürzer"],
  [/\bkuerzer\b/g, "kürzer"],
  [/\bKuerze\b/g, "Kürze"],
  [/\bkuerze\b/g, "Kürze"],
  [/\bVerkuerzen\b/g, "Verkürzen"],
  [/\bverkuerzen\b/g, "verkürzen"],

  [/\bLaenger\b/g, "Länger"],
  [/\blaenger\b/g, "länger"],
  [/\bLaenge\b/g, "Länge"],
  [/\blaenge\b/g, "Länge"],
  [/\bVerlaengern\b/g, "Verlängern"],
  [/\bverlaengern\b/g, "verlängern"],

  [/\bStaerker\b/g, "Stärker"],
  [/\bstaerker\b/g, "stärker"],
  [/\bStaerke\b/g, "Stärke"],
  [/\bstaerke\b/g, "Stärke"],
  [/\bVerstaerken\b/g, "Verstärken"],
  [/\bverstaerken\b/g, "verstärken"],
  [/\bVerstaerkt\b/g, "Verstärkt"],
  [/\bverstaerkt\b/g, "verstärkt"],

  [/\bSchwaecher\b/g, "Schwächer"],
  [/\bschwaecher\b/g, "schwächer"],
  [/\bSchwaeche\b/g, "Schwäche"],
  [/\bschwaeche\b/g, "Schwäche"],
  [/\bSchwaechen\b/g, "Schwächen"],
  [/\bschwaechen\b/g, "Schwächen"],
  [/\bAbgeschwaecht\b/g, "Abgeschwächt"],
  [/\babgeschwaecht\b/g, "abgeschwächt"],

  [/\bWaessrig\b/g, "Wässrig"],
  [/\bwaessrig\b/g, "wässrig"],
  [/\bWaessrige\b/g, "Wässrige"],
  [/\bwaessrige\b/g, "wässrige"],
  [/\bWaessrigen\b/g, "Wässrigen"],
  [/\bwaessrigen\b/g, "wässrigen"],

  [/\bUebersicht\b/g, "Übersicht"],
  [/\buebersicht\b/g, "Übersicht"],
  [/\bUebersichtlich\b/g, "Übersichtlich"],
  [/\buebersichtlich\b/g, "übersichtlich"],

  [/\bGleichfoermig\b/g, "Gleichförmig"],
  [/\bgleichfoermig\b/g, "gleichförmig"],
  [/\bGleichfoermige\b/g, "Gleichförmige"],
  [/\bgleichfoermige\b/g, "gleichförmige"],

  [/\bGueltig\b/g, "Gültig"],
  [/\bgueltig\b/g, "gültig"],
  [/\bGueltigkeit\b/g, "Gültigkeit"],
  [/\bgueltigkeit\b/g, "Gültigkeit"],

  [/\bZugaenglich\b/g, "Zugänglich"],
  [/\bzugaenglich\b/g, "zugänglich"],
  [/\bZugaenglichkeit\b/g, "Zugänglichkeit"],

  [/\bBewaeltigen\b/g, "Bewältigen"],
  [/\bbewaeltigen\b/g, "bewältigen"],
  [/\bBewaeltigung\b/g, "Bewältigung"],

  [/\bKraefte\b/g, "Kräfte"],
  [/\bkraefte\b/g, "Kräfte"],
  [/\bKraeften\b/g, "Kräften"],
  [/\bkraeften\b/g, "Kräften"],
  [/\bKraefteresultierende\b/g, "Kräfteresultierende"],

  [/\bVollstaendig\b/g, "Vollständig"],
  [/\bvollstaendig\b/g, "vollständig"],
  [/\bUnvollstaendig\b/g, "Unvollständig"],
  [/\bunvollstaendig\b/g, "unvollständig"],

  [/\bSelbststaendig\b/g, "Selbstständig"],
  [/\bselbststaendig\b/g, "selbstständig"],

  [/\bZusammenhaenge\b/g, "Zusammenhänge"],
  [/\bzusammenhaenge\b/g, "Zusammenhänge"],
  [/\bZusammenhang\b/g, "Zusammenhang"],

  [/\bAusfuehrlich\b/g, "Ausführlich"],
  [/\bausfuehrlich\b/g, "ausführlich"],
  [/\bGruendlich\b/g, "Gründlich"],
  [/\bgruendlich\b/g, "gründlich"],
  [/\bUrspruenglich\b/g, "Ursprünglich"],
  [/\burspruenglich\b/g, "ursprünglich"],

  [/\bZulaessig\b/g, "Zulässig"],
  [/\bzulaessig\b/g, "zulässig"],
  [/\bUnzulaessig\b/g, "Unzulässig"],
  [/\bunzulaessig\b/g, "unzulässig"],

  [/\bTaetigkeit\b/g, "Tätigkeit"],
  [/\btaetigkeit\b/g, "Tätigkeit"],
  [/\bTaetigkeiten\b/g, "Tätigkeiten"],
  [/\btaetigkeiten\b/g, "Tätigkeiten"],

  [/\bFaecher\b/g, "Fächer"],
  [/\bfaecher\b/g, "Fächer"],
  [/\bFaechern\b/g, "Fächern"],
  [/\bfaechern\b/g, "Fächern"],

  [/\bBegruendung\b/g, "Begründung"],
  [/\bbegruendung\b/g, "Begründung"],
  [/\bBegruendungen\b/g, "Begründungen"],
  [/\bBegruenden\b/g, "Begründen"],
  [/\bbegruenden\b/g, "begründen"],

  [/\bZusaetzlich\b/g, "Zusätzlich"],
  [/\bzusaetzlich\b/g, "zusätzlich"],
  [/\bZusaetze\b/g, "Zusätze"],
  [/\bzusaetze\b/g, "Zusätze"],

  [/\bMuehe\b/g, "Mühe"],
  [/\bmuehe\b/g, "Mühe"],
  [/\bMuehelos\b/g, "Mühelos"],
  [/\bmuehelos\b/g, "mühelos"],

  [/\bGefuehl\b/g, "Gefühl"],
  [/\bgefuehl\b/g, "Gefühl"],
  [/\bGefuehle\b/g, "Gefühle"],
  [/\bgefuehle\b/g, "Gefühle"],

  [/\bFrueher\b/g, "Früher"],
  [/\bfrueher\b/g, "früher"],
  [/\bFrueh\b/g, "Früh"],
  [/\bfrueh\b/g, "früh"],

  [/\bSpaeter\b/g, "Später"],
  [/\bspaeter\b/g, "später"],
  [/\bSpaet\b/g, "Spät"],
  [/\bspaet\b/g, "spät"],

  [/\bNaeher\b/g, "Näher"],
  [/\bnaeher\b/g, "näher"],
  [/\bNaehe\b/g, "Nähe"],
  [/\bnaehe\b/g, "Nähe"],
  [/\bAnnaehern\b/g, "Annähern"],
  [/\bannaehern\b/g, "annähern"],
  [/\bAnnaeherung\b/g, "Annäherung"],
  [/\bannaeherung\b/g, "Annäherung"],

  [/\bVeraenderung\b/g, "Veränderung"],
  [/\bveraenderung\b/g, "Veränderung"],
  [/\bVeraenderungen\b/g, "Veränderungen"],
  [/\bveraenderungen\b/g, "Veränderungen"],
  [/\bVeraendern\b/g, "Verändern"],
  [/\bveraendern\b/g, "verändern"],
  [/\bVeraendert\b/g, "Verändert"],
  [/\bveraendert\b/g, "verändert"],

  [/\bEinfuehrung\b/g, "Einführung"],
  [/\beinfuehrung\b/g, "Einführung"],
  [/\bDurchfuehrung\b/g, "Durchführung"],
  [/\bdurchfuehrung\b/g, "Durchführung"],
  [/\bRueckfuehrung\b/g, "Rückführung"],
  [/\bFortfuehrung\b/g, "Fortführung"],
  [/\bZufuehren\b/g, "Zuführen"],
  [/\bzufuehren\b/g, "zuführen"],
  [/\bAusfuehren\b/g, "Ausführen"],
  [/\bausfuehren\b/g, "ausführen"],

  [/\bUnterstuetzen\b/g, "Unterstützen"],
  [/\bunterstuetzen\b/g, "unterstützen"],
  [/\bUnterstuetzung\b/g, "Unterstützung"],
  [/\bunterstuetzung\b/g, "Unterstützung"],

  [/\bHinzufuegen\b/g, "Hinzufügen"],
  [/\bhinzufuegen\b/g, "hinzufügen"],
  [/\bHinzugefuegt\b/g, "Hinzugefügt"],
  [/\bhinzugefuegt\b/g, "hinzugefügt"],

  [/\bVerknuepfen\b/g, "Verknüpfen"],
  [/\bverknuepfen\b/g, "verknüpfen"],
  [/\bVerknuepfung\b/g, "Verknüpfung"],
  [/\bverknuepfung\b/g, "Verknüpfung"],
  [/\bVerknuepft\b/g, "Verknüpft"],
  [/\bverknuepft\b/g, "verknüpft"],
];

/**
 * Restores German umlauts in text while protecting:
 * - Math formulas ($...$ and $$...$$)
 * - Code spans (`...`)
 * - HTML tags (<...>)
 */
export function restoreGermanUmlauts(text: string): string {
  if (!text) return "";

  // Split text by code/math segments to protect them
  const tokens: { text: string; isProtected: boolean }[] = [];
  const regex = /(\$\$[\s\S]*?\$\$|\$[^\n$]+?\$|`[^`]+?`|<[^>]+?>)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      tokens.push({ text: text.slice(lastIndex, match.index), isProtected: false });
    }
    tokens.push({ text: match[0], isProtected: true });
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < text.length) {
    tokens.push({ text: text.slice(lastIndex), isProtected: false });
  }

  // Process unprotected tokens
  const processed = tokens.map((tok) => {
    if (tok.isProtected) return tok.text;
    let t = tok.text;
    for (const [re, rep] of EXACT_REPLACEMENTS) {
      t = t.replace(re, rep);
    }
    return t;
  });

  return processed.join("");
}

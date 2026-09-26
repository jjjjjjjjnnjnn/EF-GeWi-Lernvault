---
fach: Bio
thema: "Enzymaktivitaet und Einflussfaktoren"
level: 1
ziel: Klausur
xp: 100
operatoren: [beschreiben, auswerten, erklaeren]
klausurrelevant: true
datum: 2026-09-25
tags: [EF, Bio, Zellbiologie]
version: Lesson-v3
---

# Lernreise: Enzymaktivitaet und Einflussfaktoren (L1, Ziel Klausur)

<!-- Lesson v3 9-Schritt-Architektur: Schritt 1 bis 8 feste Struktur; Fehlvorstellung zwischen Schritt 6 und 7 (Parser ueberspringt, zaehlt nicht); interaktives [Werkzeug: <id>]; Gating: check/szenario nicht bestanden = Weiter deaktiviert; XP: entdecken 5 / ausprobieren 15 / check 20 / szenario 30 -->

## Schritt 1 — entdecken

ZIELE (drei messbare Ziele dieser Lektion):

1. Du kannst drei Grundeigenschaften von Enzymen nennen — ueberwiegend Proteine, Senkung der Aktivierungsenergie $E_a$, kein Verbrauch — und erklaeren, dass Enzyme die Gleichgewichtslage nicht veraendern.
2. Du kannst eine Temperatur- oder pH-Kurve lesen: Verlauf abschnittsweise beschreiben, Optimum benennen, Anstieg mit der RGT-Regel und Abfall mit der Denaturierung erklaeren.
3. Du kannst eine Kausalkette mit weil und deshalb formulieren und Hemmung (reversibel) strikt von Denaturierung (irreversibel) unterscheiden.

Klausur-Satz: `Enzyme senken als Biokatalysatoren die Aktivierungsenergie, besitzen ein Temperatur- und ein pH-Optimum und werden dabei nicht verbraucht.`

## Schritt 2 — entdecken

PRETRAINING-Box (fuenf Kernbegriffe mit Definitionen):

- Enzym: Ueberwiegend ein Protein als Biokatalysator; aendert nur die Geschwindigkeit, nicht Richtung oder Gleichgewicht.
- Aktivierungsenergie: Mindestenergie $E_a$ fuer den Reaktionsstart; das Enzym senkt sie.
- Aktives Zentrum: Passgenauer Bereich fuer das Substrat; Grundlage der Spezifitaet.
- Denaturierung: Zerstoerung der Tertiaerstruktur durch Hitze oder extremes pH; irreversibel.
- Temperaturoptimum: Temperatur der hoechsten Aktivitaet; humane Enzyme oft bei ca. $37\,^{\circ}C$.

Klausur-Satz: `Unterhalb des Optimums steigt die Reaktionsgeschwindigkeit nach der RGT-Regel, oberhalb des Optimums fuehrt die Denaturierung zu einem steilen Abfall.`

## Schritt 3 — entdecken

TIEFEN-KONZEPT (ein Konzept mit visuellem Schema):

Das Enzym arbeitet nach Schluessel und Schloss: Das Substrat bindet im aktiven Zentrum, der Enzym-Substrat-Komplex senkt die Huerde, das Enzym geht unverbraucht hervor. Unterhalb des Optimums erhoeht Erwaermung die kinetische Energie und die Zahl wirksamer Zusammenstoesse; die Geschwindigkeit steigt nach der RGT-Regel etwa auf das Doppelte je $10\,^{\circ}C$. Oberhalb des Optimums zerstoert Hitze Wasserstoffbruecken und Ionenbindungen der Tertiaerstruktur, das aktive Zentrum verliert seine Form, das Substrat bindet nicht mehr — die Denaturierung ist irreversibel. Auch der pH besitzt ein Optimum (Pepsin ca. pH 2, Trypsin ca. pH 8); Abweichungen veraendern Ladungen im aktiven Zentrum, extreme Werte denaturieren.

```diagram
   Reaktions-
   geschwindigkeit
        ^
        |            .-- Optimum
        |          .'   '.
        |        .'       '.
        |      .'  RGT-     '.  Denaturierung
        |    .'    Regel      '.  (irreversibel)
        |  .'                    '.
        |.'                        '.
        +------------------------------> Temperatur
         10   20   30   40   50   60   70  [Grad C]
                         ^
                    Temperaturoptimum (ca. 37-40 Grad C)

   pH-Kurve: glockenfoermig, Peak = pH-Optimum
   Pepsin  ca. pH 2   |   Trypsin  ca. pH 8
```

Klausur-Satz: `Der Anstieg der Kurve folgt der RGT-Regel, der steile Abfall nach dem Optimum beruht auf der irreversiblen Denaturierung des aktiven Zentrums.`

## Anekdote & Fun-Fact

**Anekdote / Fun-Fact (DE)**: Hohes Fieber ist lebensgefaehrlich, sobald die Koerpertemperatur ueber etwa 42 Grad Celsius steigt. Der Grund ist nicht die Waerme selbst, sondern die Denaturierung der koerpereigenen Enzyme: Ihre Tertiaerstruktur wird zerstoert, das aktive Zentrum verliert seine Form. Unterhalb dieser Grenze kann Fieber dagegen die Abwehrreaktionen des Koerpers beschleunigen.

**Bezug zum Konzept**: `Zu hohes Fieber fuehrt zur Denaturierung der koerpereigenen Enzyme und damit zu einem irreversiblen Verlust der Aktivitaet.`

## Schritt 4 — ausprobieren

BEISPIEL (geleitete Aufgabe mit Werkzeug):

[Werkzeug: balance]

AUFGABE (auswerten und erklaeren, AFB II): In einem Versuch wird die Aktivitaet eines menschlichen Verdauungsenzyms bei Temperaturen von 10 Grad Celsius bis 70 Grad Celsius gemessen. Die Reaktionsgeschwindigkeit steigt bis 40 Grad Celsius stark an, erreicht dort ihr Maximum und faellt danach steil ab; bei 70 Grad Celsius ist keine Aktivitaet mehr messbar. Werten Sie den Kurvenverlauf aus und erklaeren Sie Anstieg und Abfall.

HILFE:
1. Schritt 1: Werte zuerst aus (Operator auswerten): Beschreibe die drei Abschnitte und nenne die Zahlenwerte des Anstiegs und des Maximums.
2. Schritt 2: Erklaere den Anstieg mit der RGT-Regel — mehr kinetische Energie, haeufigere wirksame Zusammenstoesse.
3. Schritt 3: Erklaere den Abfall mit der Denaturierung — Zerstoerung der Tertiaerstruktur, Formaenderung des aktiven Zentrums, Substrat kann nicht mehr binden.

MUSTERLOESUNG: Die Kurve verlaeuft dreiphasig: Von 10 Grad Celsius bis 40 Grad Celsius steigt die Aktivitaet nahezu exponentiell an, bei 40 Grad Celsius liegt das Temperaturoptimum, danach faellt sie steil ab und erreicht bei 70 Grad Celsius den Wert null. Der Anstieg folgt der RGT-Regel: Mit steigender Temperatur nimmt die kinetische Energie der Molekuele zu, sodass es haeufiger zu wirksamen Zusammenstoessen zwischen Enzym und Substrat kommt und die Reaktionsgeschwindigkeit steigt. Der Abfall nach dem Optimum beruht auf der Denaturierung: Die hohe Temperatur zerstoert die Wasserstoffbruecken und Ionenbindungen der Tertiaerstruktur, wodurch das aktive Zentrum seine Form veraendert; das Substrat kann nicht mehr binden. Diese Denaturierung ist irreversibel, deshalb ist bei 70 Grad Celsius keine Aktivitaet mehr messbar.

Klausur-Satz: `Oberhalb des Temperaturoptimums veraendert die Denaturierung die Form des aktiven Zentrums irreversibel, sodass die Reaktionsgeschwindigkeit trotz weiter steigender Temperatur sinkt.`

## Schritt 5 — ausprobieren

VERGLEICH (Wahl des Verfahrens, A gegen B):

VERGLEICH: Waehle erst das Verfahren — (i) RGT-Verfahren links vom Optimum (Erwaermung erhoeht kinetische Energie, wirksame Stoesse, Geschwindigkeit) oder (ii) Denaturierungs-Verfahren rechts vom Optimum (Hitze zerstoert Tertiaerstruktur, aktives Zentrum, Aktivitaet, irreversibel) — dann loesen.

AUFGABE A: Ein Enzym wird von 20 Grad Celsius auf 30 Grad Celsius erwaermt; die Reaktionsgeschwindigkeit steigt deutlich an. Welches Verfahren ist zu waehlen, und wie laesst sich der Vorgang erklaeren?

AUFGABE B: Dasselbe Enzym wird von 50 Grad Celsius auf 60 Grad Celsius erwaermt; die Reaktionsgeschwindigkeit sinkt stark ab. Welches Verfahren ist zu waehlen, und wie laesst sich der Vorgang erklaeren?

HILFE: A liegt eindeutig unterhalb des Optimums, die Temperaturerhoehung wirkt positiv, daher Verfahren (i). B liegt oberhalb des Optimums, die Temperaturerhoehung wirkt zerstoerend, daher Verfahren (ii).

ANTWORT: A erfordert Verfahren (i): Da die Temperatur noch unterhalb des Optimums liegt, erhoeht die Erwaermung die kinetische Energie der Molekuele; die Zahl der wirksamen Zusammenstoesse zwischen Enzym und Substrat steigt und damit auch die Reaktionsgeschwindigkeit. B erfordert Verfahren (ii): Oberhalb des Optimums zerstoert die zusaetzliche Waermeenergie die Wasserstoffbruecken und Ionenbindungen der Tertiaerstruktur; das aktive Zentrum verliert seine Form, das Substrat kann nicht mehr binden und die Aktivitaet sinkt — die Denaturierung ist irreversibel, sodass eine Abkuehlung die Aktivitaet nicht wiederherstellt.

Klausur-Satz: `Dieselbe Temperaturerhoehung beschleunigt die Reaktion unterhalb des Optimums nach der RGT-Regel, zerstoert das Enzym jedoch oberhalb des Optimums durch Denaturierung.`

## Schritt 6 — check

CHECK (drei Fragen mit Antworten):

FRAGE: Warum veraendert ein Enzym die Lage des chemischen Gleichgewichts einer Reaktion nicht? | ANTWORT: Weil es nur die Aktivierungsenergie senkt und damit die Reaktionsgeschwindigkeit erhoeht, nicht aber die Energie der Edukte und Produkte; das Gleichgewicht bleibt unverschoben.
FRAGE: Was besagt die RGT-Regel und in welchem Bereich gilt sie? | ANTWORT: Sie besagt, dass die Reaktionsgeschwindigkeit bei einer Temperaturerhoehung um 10 Grad Celsius etwa auf das Doppelte steigt; sie gilt nur unterhalb des Temperaturoptimums.
FRAGE: Worin unterscheiden sich eine kompetitive Hemmung und eine Denaturierung grundsaetzlich? | ANTWORT: Die kompetitive Hemmung ist reversibel, weil der Hemmstoff das aktive Zentrum nur besetzt und durch mehr Substrat verdraengt werden kann; die Denaturierung ist irreversibel, weil die Tertiaerstruktur des Enzyms zerstoert wird.

Klausur-Satz: `Waehrend die kompetitive Hemmung reversibel ist, beruht die Denaturierung auf einer irreversiblen Zerstoerung der Tertiaerstruktur.`

## Fehlvorstellung

(Kein Schritt; wird vom Parser uebersprungen.)

1. Fehlannahme: Hohe Temperatur versetze Enzyme nur in eine Pause, Abkuehlung stelle sie wieder her.
   Korrektur: Die Denaturierung ist irreversibel, da die Tertiaerstruktur und damit das aktive Zentrum dauerhaft zerstoert werden; eine Abkuehlung stellt die Aktivitaet nicht wieder her.
   Korrektur-Satz: `Die Denaturierung ist irreversibel, da die Tertiaerstruktur und damit das aktive Zentrum dauerhaft zerstoert werden; eine Abkuehlung stellt die Aktivitaet nicht wieder her.`
2. Fehlannahme: Die RGT-Regel gelte ohne Grenze nach oben.
   Korrektur: Die RGT-Regel gilt nur unterhalb des Temperaturoptimums; darueber ueberwiegt die Denaturierung, sodass die Reaktionsgeschwindigkeit wieder sinkt.
   Korrektur-Satz: `Die RGT-Regel gilt nur unterhalb des Temperaturoptimums; darueber ueberwiegt die Denaturierung, sodass die Reaktionsgeschwindigkeit wieder sinkt.`

## Schritt 7 — szenario

ROLLE: Du bist Referent in einem Schullabor und haeltst einen Kurzvortrag fuer juengere Schuelerinnen und Schueler.
SITUATION: Ein Waschmittelhersteller wirbt damit, dass sein Pulver schon bei 30 Grad Celsius wirkt, waehrend ein aelteres Produkt erst bei 60 Grad Celsius optimale Leistung zeigt. In beiden Produkten stecken Proteasen, also Eiweiss spaltende Enzyme.
AUFGABE (AFB II/III): Erklaere in einer zusammenhaengenden Stellungnahme (ca. 150 Woerter), warum ein modernes Waschmittel auf ein niedrigeres Temperaturoptimum optimiert wird und was bei 60 Grad Celsius mit den Enzymen geschieht.
RUBRIC (30 XP): Benennung des Temperaturoptimums als Anpassung an den Einsatzbereich (5 XP) | Erklaerung der Wirkungssteigerung unterhalb des Optimums mit der RGT-Regel (8 XP) | Erklaerung der Denaturierung oberhalb des Optimums mit Bezug auf die Tertiaerstruktur und das aktive Zentrum (10 XP) | Kausale, fachsprachlich korrekte Stellungnahme mit den Fachbegriffen Denaturierung und irreversibel (7 XP).

## Schritt 8 — entdecken

TAKEAWAY (Kernbotschaft in einem Kasten):

Die Enzymaktivitaet ist temperaturabhaengig: Unterhalb des Optimums beschleunigt die RGT-Regel die Reaktion, oberhalb zerstoert die irreversible Denaturierung das aktive Zentrum. Wer den Abfall erklaert, nennt stets Denaturierung und irreversibel.
Takeaway-Satz: `Die Enzymaktivitaet ist temperaturabhaengig: Unterhalb des Optimums beschleunigt die RGT-Regel die Reaktion, oberhalb zerstoert die irreversible Denaturierung das aktive Zentrum.`

REFLEXION (zwei Fragen):
1. Welcher Schritt fiel schwerer — das Auswerten des Kurvenverlaufs mit Zahlenwerten (Schritt 4) oder die Unterscheidung von RGT-Regel und Denaturierung je nach Kurvenseite (Schritt 5)?
2. Beim naechsten Mal pruefe ich zuerst, auf welcher Seite des Optimums die angegebene Temperatur liegt, und waehle danach die Erklaerung.

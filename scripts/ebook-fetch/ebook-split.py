# ebook-split.py: split ebook-raw txt pages into 11 chapter files + front/back matter.
# Boundaries were derived from keyword-transition scan (see Journal 2026-09-22-ebook).
# They are APPROXIMATE (+-2 pages); verify against Kapitelauftakt while writing notes.
# Output: ../../_Downloads/SoWi/ebook-raw/../split/kapNN-<name>.md (gitignored).
# Run from scripts/ebook-fetch/: python ebook-split.py
import pathlib

HERE = pathlib.Path(__file__).parent
RAW = (HERE / "../../_Downloads/SoWi/ebook-raw").resolve()
TXT = RAW / "txt"
OUT = RAW.parent / "split"

# (start_media, end_media, filename, vault_target)
PARTS = [
    (1, 14, "kap00-Front.md", "Cover/Inhalt/Vorwort (kein Lernstoff)"),
    (15, 46, "kap01-Identitaet-Jugend.md", "Soziologie Grundlagen (08_SoWi)"),
    (47, 95, "kap02-Sozialisation-Rolle.md", "08_SoWi/Sozialisation-Rolle.md"),
    (96, 114, "kap03-Grundgesetz-Demokratie.md", "08_SoWi/Grundgesetz-Verfassungsprinzipien.md"),
    (115, 168, "kap04-Verfassungsorgane.md", "08_SoWi/Verfassungsorgane.md"),
    (169, 216, "kap05-Parteien-Willensbildung.md", "08_SoWi/Parteien-Willensbildung.md"),
    (217, 242, "kap06-Partizipation.md", "08_SoWi/Partizipation.md"),
    (243, 276, "kap07-Extremismus-Wehrhaft.md", "08_SoWi/Wehrhafte-Demokratie.md"),
    (277, 297, "kap08-Konsum-Wirtschaften.md", "08_SoWi/Konsum-Wirtschaften.md"),
    (298, 340, "kap09-Soziale-Marktwirtschaft.md", "08_SoWi/Soziale-Marktwirtschaft.md"),
    (341, 387, "kap10-Betrieb-Mitbestimmung.md", "08_SoWi/Betrieb-Mitbestimmung.md"),
    (388, 399, "kap11-Marktwirtschaft-Krise.md", "08_SoWi/Marktwirtschaft-Krise.md"),
    (400, 430, "kap99-Back.md", "Methodenglossar/Sozialwissenschaftliches Glossar/Operatoren/Register"),
]

OUT.mkdir(parents=True, exist_ok=True)
index = []
for start, end, fname, target in PARTS:
    chunks = []
    have = 0
    for n in range(start, end + 1):
        p = TXT / f"p{n:04d}.txt"
        if not p.exists():
            chunks.append(f"\n[FEHLT media {n}]\n")
            continue
        have += 1
        body = p.read_text(encoding="utf-8")
        chunks.append(f"\n--- media {n} ---\n{body}")
    (OUT / fname).write_text(
        f"# {fname} (OCR roh, nur lokal; vault: {target})\n" + "".join(chunks),
        encoding="utf-8")
    index.append(f"{fname}: media {start}-{end} ({have} S.) -> {target}")
    print(f"{fname}: {have}/{end - start + 1} pages")
(OUT / "index.txt").write_text("\n".join(index) + "\n", encoding="utf-8")
print("BOUNDARIES APPROXIMATE +-2 pages, verify at Kapitelauftakt.")

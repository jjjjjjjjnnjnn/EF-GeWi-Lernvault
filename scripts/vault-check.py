# vault-check.py: one-shot AGENTS compliance audit. Run from vault root: python scripts/vault-check.py
# Checks: frontmatter fields, csv 5-col, INDEX links, Lernreise naming/steps. Exit 1 on error.
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
FACH = {"Deutsch", "Englisch", "Mathe", "Physik", "Chemie", "Bio",
        "Philosophie", "SoWi", "Musik", "Sport", ""}
EXEMPT_NAMES = {"Lehrplan.md", "Ressourcen.md", "Satzbausteine.md",
                "Fehlerlog.md", "README.md", "INDEX.md", "HANDOVER.md",
                "AGENTS.md", "Anki-Karte-GeWi.md", "Klausur-Drill-GeWi.md",
                "Fach-Template.md", "Stunden-Nachbereitung-GeWi.md",
                ".gitkeep-note.md"}
SKIP_DIRS = {".git", ".obsidian", "App-EF-Lernvault", "_Downloads",
             "node_modules", "dist", "target", "Journal", "Templates",
             "Skills", "Lernreise", "scripts"}
ERR, WARN = [], []

REQ_KEYS = ["fach", "thema", "operatoren", "klausurrelevant", "datum", "tags"]


def parse_fm(text):
    if not text.startswith("---"):
        return None, text
    end = text.find("\n---", 3)
    if end < 0:
        return None, text
    meta = {}
    for line in text[3:end].split("\n"):
        i = line.find(":")
        if i < 0:
            continue
        meta[line[:i].strip()] = line[i + 1:].strip().strip('"')
    return meta, text[end + 4:]


def check_notes():
    n = 0
    for p in sorted(ROOT.rglob("*.md")):
        rel = p.relative_to(ROOT)
        if any(d in SKIP_DIRS for d in rel.parts):
            continue
        if p.name in EXEMPT_NAMES:
            continue
        meta, _ = parse_fm(p.read_text(encoding="utf-8"))
        if meta is None:
            ERR.append(f"{rel}: no frontmatter")
            continue
        n += 1
        for k in REQ_KEYS:
            if k not in meta:
                ERR.append(f"{rel}: missing key '{k}'")
        if meta.get("fach", "") not in FACH or (meta.get("fach") == "" and "00_META" not in rel.parts):
            ERR.append(f"{rel}: bad fach '{meta.get('fach')}'")
        if meta.get("klausurrelevant") not in ("true", "false"):
            ERR.append(f"{rel}: klausurrelevant must be true/false")
    return n


def check_csv():
    total = bad = 0
    for p in sorted(ROOT.rglob("*.csv")):
        rel = p.relative_to(ROOT)
        if any(d in SKIP_DIRS for d in rel.parts):
            continue
        lines = p.read_text(encoding="utf-8").splitlines()
        seen = set()
        for i, line in enumerate(lines):
            if not line.strip():
                continue
            if i == 0 and line.split(";")[0].strip().lower() in ("deutsch", "begriff"):
                continue  # header
            total += 1
            if line.count(";") != 4:
                bad += 1
                ERR.append(f"{rel}:{i + 1}: semis={line.count(';')} (want 4)")
                continue
            key = line.split(";")[0].strip().lower()
            if key in seen:
                ERR.append(f"{rel}:{i + 1}: duplicate card '{key}'")
            seen.add(key)
    return total, bad


def check_index():
    idx = (ROOT / "00_META" / "INDEX.md").read_text(encoding="utf-8")
    links = sorted(set(re.findall(r"\]\(([^)]+)\)", idx)))
    miss = 0
    checked = 0
    for l in links:
        if re.match(r"https?://", l):
            continue
        checked += 1
        if not (ROOT / "00_META" / l.replace("/", "/")).exists():
            # links may be vault-relative
            if not (ROOT / l).exists():
                miss += 1
                ERR.append(f"INDEX: missing link {l}")
    return checked, miss


def check_reise():
    n = 0
    d = ROOT / "Lernreise"
    if not d.exists():
        return 0
    for p in sorted(d.glob("*.md")):
        if not re.match(r"[A-Z][A-Za-z]+-.+-L\d\.md", p.name):
            WARN.append(f"Lernreise/{p.name}: naming off (Fach-Thema-Ln.md)")
        meta, body = parse_fm(p.read_text(encoding="utf-8"))
        if meta is None or not meta.get("fach") or not meta.get("thema"):
            ERR.append(f"Lernreise/{p.name}: fach/thema required")
            continue
        steps = re.findall(r"##\s*Schritt\s*(\d+)\s*[-—]\s*(\w+)", body)
        typs = {s[1].lower() for s in steps}
        if not steps:
            ERR.append(f"Lernreise/{p.name}: no Schritte")
        elif typs - {"entdecken", "ausprobieren", "check", "szenario", "muendlich"}:
            ERR.append(f"Lernreise/{p.name}: bad Schritt typ {typs}")
        for k in ("level", "ziel", "xp"):
            if k not in (meta or {}):
                WARN.append(f"Lernreise/{p.name}: missing '{k}'")
        n += 1
    return n


def check_vergleich():
    # VERGLEICH rule (warn-only, never ERR): an ausprobieren step carrying a
    # VERGLEICH: marker must ask which procedure/concept to use. Missing
    # question -> WARN so exit code stays 0. check_reise allowlist untouched.
    n = 0
    d = ROOT / "Lernreise"
    if not d.exists():
        return 0
    # "xuan-chengxu" / "xuan-gainian" below are unicode-escaped on purpose:
    # this file stays pure ASCII (PS5.1 constraint covers comments and more).
    want_a = "选程序"
    want_b = "选概念"
    for p in sorted(d.glob("*.md")):
        body = parse_fm(p.read_text(encoding="utf-8"))[1]
        m = re.search(r"##\s*Schritt\s*\d+\s*[-—]\s*ausprobieren\s*\n(.*?)(?=##\s*Schritt|\Z)",
                      body, re.S | re.I)
        if not m:
            continue
        block = m.group(1)
        if "VERGLEICH:" not in block:
            continue
        n += 1
        if want_a not in block and want_b not in block:
            WARN.append(f"Lernreise/{p.name}: VERGLEICH block lacks procedure-choice question")
    return n


notes = check_notes()
rows, badrows = check_csv()
links, misslinks = check_index()
reisen = check_reise()
vergleich = check_vergleich()
print(f"notes={notes} csv_rows={rows}(bad={badrows}) index_links={links}(missing={misslinks}) reisen={reisen} vergleich={vergleich}")
for w in WARN:
    print("WARN", w)
for e in ERR:
    print("ERR", e)
print("FAIL" if ERR else "PASS")
sys.exit(1 if ERR else 0)

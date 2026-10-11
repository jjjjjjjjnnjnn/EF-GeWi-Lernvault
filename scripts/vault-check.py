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
                ".gitkeep-note.md", "PROJECT-DESIGN-GUIDELINES.md"}
SKIP_DIRS = {".git", ".obsidian", ".workbuddy-ai", "App-EF-Lernvault", "_Downloads",
             "node_modules", "dist", "target", "Journal", "Templates",
             "Skills", "Lernreise", "scripts"}
ERR, WARN = [], []

# Werkzeug-id allowlist (mirrors bookIngestParser TOOL_RULES + InteractiveToolType
# union + generic/lab kits observed in Lernreise; WARN-only for future drift).
WERKZEUG_ALLOW = {
    "wahlsystem-sim", "rawls-sim", "markt-sim", "magisches-viereck",
    "gini-allocator", "ethik-waage", "tangent-slider", "dilemma-theatre",
    "orderbuch-sim", "kinematik", "formula", "konzept_puzzle", "variable_slider",
    "variable-slider-box", "logic_blocks", "scenario_tree", "dilemma_balance",
    "highlighter", "lego", "oral-timer", "gewi-reading", "text-analyse",
    "balance-board", "box-optimizer", "schiefe-ebene", "titration-lab",
    "le-chatelier-sim", "osmose-lab", "kinematik-lab",
}

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
        if p.name in EXEMPT_NAMES or p.name.startswith("_"):
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
        raw_tags = meta.get("tags", "")
        inner = raw_tags.strip().strip("[]")
        first = inner.split(",")[0].strip().strip("'\"") if inner else ""
        if first not in ("EF", "Q1", "Q2", "QP"):
            WARN.append(f"{rel}: tags[0]='{first}' not in EF/Q1/Q2/QP")
        if "stufe" in meta or "kursart" in meta:
            WARN.append(f"{rel}: has stufe/kursart key (template-spec drift observable)")
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
    if re.search(r"356\s*\u7bc7", idx):
        WARN.append("INDEX: stale '356-pian' count text (drift vs actual reisen)")
    if re.search(r"9\s*\u6b65", idx):
        WARN.append("INDEX: stale '9-bu' steps text (Lesson-v3 drift)")
    if "Lernreise/Sowi-" in idx or "Lernreise/Philo-" in idx:
        WARN.append("INDEX: 'Sowi-/Philo-' case drift (real files are 'SoWi-/Philosophie-'; Windows-blind, breaks on Linux)")
    return checked, miss


def check_reise():
    n = 0
    d = ROOT / "Lernreise"
    if not d.exists():
        return 0
    for p in sorted(d.glob("*.md")):
        if not re.match(r"[A-Z][A-Za-z]+-.+-L\d\.md", p.name):
            WARN.append(f"Lernreise/{p.name}: naming off (Fach-Thema-Ln.md)")
        if p.name.startswith("Sowi-") or p.name.startswith("Philo-"):
            WARN.append(f"Lernreise/{p.name}: Fach prefix case-split (use SoWi-/Philosophie-)")
        meta, body = parse_fm(p.read_text(encoding="utf-8"))
        if meta is None or not meta.get("fach") or not meta.get("thema"):
            ERR.append(f"Lernreise/{p.name}: fach/thema required")
            continue
        if meta.get("version") != "Enterprise-v5":
            WARN.append(f"Lernreise/{p.name}: version '{meta.get('version')}' is not Enterprise-v5")
        steps = re.findall(r"##\s*Schritt\s*(\d+)\s*[-—]\s*(\w+)", body)
        typs = {s[1].lower() for s in steps}
        if not steps:
            ERR.append(f"Lernreise/{p.name}: no Schritte")
        elif typs - {"entdecken", "ausprobieren", "check", "szenario", "muendlich", "reflexion"}:
            ERR.append(f"Lernreise/{p.name}: bad Schritt typ {typs}")
        for k in ("level", "ziel", "xp"):
            if k not in (meta or {}):
                WARN.append(f"Lernreise/{p.name}: missing '{k}'")
        if meta.get("version") == "Enterprise-v4":
            if len(steps) != 5:
                ERR.append(f"Lernreise/{p.name}: Enterprise-v4 must have exactly 5 Schritte (found {len(steps)})")
            if re.search(r"[\U00010000-\U0010ffff]|[\u2600-\u27BF]", body):
                ERR.append(f"Lernreise/{p.name}: Enterprise-v4 must contain 0 emoji")
            if re.search(r"[\u2190-\u2199\u21D0-\u21D9]", body):
                ERR.append(f"Lernreise/{p.name}: Enterprise-v4 must use ASCII '->' instead of unicode arrows")
            if not re.search(r"\[Werkzeug:\s*[a-zA-Z0-9_\-]+\]", body):
                ERR.append(f"Lernreise/{p.name}: Enterprise-v4 must contain [Werkzeug: <id>] tag")
        if "[Werkzeug: <id>]" in body:
            WARN.append(f"Lernreise/{p.name}: empty [Werkzeug: <id>] placeholder")
        # Werkzeug-id allowlist (WARN-only, never ERR): flags future drift while
        # grandfathering the 22 observed ids (TOOL_RULES 8 + union extras + labs).
        for wid in set(re.findall(r"\[Werkzeug:\s*([a-zA-Z0-9_\-]+)\]", body)):
            if wid == "<id>":
                continue
            if wid == "orderbuch":
                WARN.append(f"Lernreise/{p.name}: Werkzeug 'orderbuch' should be 'orderbuch-sim' (registry spelling)")
            elif wid not in WERKZEUG_ALLOW:
                WARN.append(f"Lernreise/{p.name}: unregistered Werkzeug '{wid}' (not in TOOL_RULES/union/labs)")
        m_kern = re.search(r"KERNSATZ.*?\n(.*?)(?=##\s*Schritt|\Z)", body, re.S)
        if m_kern is None:
            WARN.append(f"Lernreise/{p.name}: missing KERNSATZ block")
        else:
            km = re.search(r"Kernsatz:\s*`([^`]*)`", m_kern.group(1))
            if km is not None and len(km.group(1).strip()) < 20:
                WARN.append(f"Lernreise/{p.name}: KERNSATZ block <20 chars")
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


def check_filenames():
    # AGENTS.md 1: Thema-DE-kebab-case.md, no umlauts (ae/oe/ue), no spaces.
    umlauts = "\u00e4\u00f6\u00fc\u00c4\u00d6\u00dc\u00df"
    bad = 0
    for p in sorted(ROOT.rglob("*.md")):
        rel = p.relative_to(ROOT)
        if any(d in SKIP_DIRS for d in rel.parts):
            continue
        if any(c in p.name for c in umlauts):
            bad += 1
            ERR.append(f"{rel}: filename has umlaut (use ae/oe/ue)")
        if " " in p.name:
            bad += 1
            ERR.append(f"{rel}: filename has space")
    return bad


def check_glossar():
    # 00_META/Glossar-DE-ZH-GeWi.md must stay a well-formed 4-col table.
    p = ROOT / "00_META" / "Glossar-DE-ZH-GeWi.md"
    if not p.exists():
        return 0
    bad = 0
    for i, line in enumerate(p.read_text(encoding="utf-8").splitlines()):
        if not line.startswith("|"):
            continue
        if line.count("|") != 5:
            bad += 1
            ERR.append(f"Glossar-DE-ZH-GeWi.md:{i + 1}: pipes={line.count('|')} (want 5)")
    return bad


notes = check_notes()
rows, badrows = check_csv()
links, misslinks = check_index()
reisen = check_reise()
vergleich = check_vergleich()
badnames = check_filenames()
badgloss = check_glossar()
print(f"notes={notes} csv_rows={rows}(bad={badrows}) index_links={links}(missing={misslinks}) "
      f"reisen={reisen} vergleich={vergleich} badnames={badnames} badglossar={badgloss}")
for w in WARN:
    print("WARN", w)
for e in ERR:
    print("ERR", e)
print("FAIL" if ERR else "PASS")
sys.exit(1 if ERR else 0)

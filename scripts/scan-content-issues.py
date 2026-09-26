import os
import glob
import re
import json

def scan_lernreise():
    files = sorted(glob.glob("Lernreise/*.md"))
    print(f"Total Lernreise files scanned: {len(files)}")

    KNOWN_TOOLS = {
        "osmose-lab", "osmose", "gleichgewicht", "le-chatelier-sim", "kinematik-lab", 
        "kinematik", "tangent-slider", "tangent", "box-optimizer", "box", 
        "titration-lab", "titration", "schiefe-ebene", "gini-allocator", "gini", 
        "markt-sim", "markt", "balance-board", "balance", "formula", "lego", 
        "highlighter", "timer", "oral-timer"
    }

    generic_headers_files = []
    skeletal_schritt1_files = []
    unregistered_tools_files = []
    tool_counter = {}
    subject_counts = {}
    categories = {"DE": 0, "CN": 0, "LEGACY": 0}

    short_steps_distribution = {}

    for fpath in files:
        fname = os.path.basename(fpath)
        with open(fpath, "r", encoding="utf-8") as fp:
            raw = fp.read()

        if "-DE-" in fname:
            categories["DE"] += 1
        elif "-CN-" in fname:
            categories["CN"] += 1
        else:
            categories["LEGACY"] += 1

        m_fach = re.search(r"^fach:\s*(\w+)", raw, re.MULTILINE)
        fach = m_fach.group(1) if m_fach else "Unknown"
        subject_counts[fach] = subject_counts.get(fach, 0) + 1

        # Check tools
        tools = re.findall(r"\[Werkzeug:\s*([a-zA-Z0-9_\-]+)\]", raw, re.IGNORECASE)
        for t in tools:
            t_low = t.lower()
            tool_counter[t_low] = tool_counter.get(t_low, 0) + 1
            if t_low not in KNOWN_TOOLS:
                unregistered_tools_files.append((fname, t_low))

        # Check step headers
        headers = re.findall(r"^##\s+Schritt\s+(\d+)\s*[-—]\s*(\w+)(.*)", raw, re.MULTILINE)
        all_generic = True
        for num, typ, rest in headers:
            rest_clean = rest.strip()
            if rest_clean.startswith(":") or rest_clean.startswith("(") or len(rest_clean) > 3:
                all_generic = False
                break
        if all_generic and len(headers) > 0:
            generic_headers_files.append(fname)

        # Split steps
        step_splits = re.split(r"##\s+Schritt\s+\d+", raw)
        if len(step_splits) > 1:
            s1 = step_splits[1]
            words = s1.split()
            # If step 1 only has ZIELE bullet points and is very short
            is_just_ziele = bool(re.search(r"ZIELE\s*\(", s1)) and not bool(re.search(r"Erklaerung|Theorie|Konzept|Phaenomen|Phänomen|Mechanismus|Hintergrund|Herleitung", s1, re.I))
            if len(words) < 90 or (is_just_ziele and len(words) < 140):
                skeletal_schritt1_files.append((fname, len(words), "ziele_only" if is_just_ziele else "too_short"))

    print(f"\n1. File categories: DE={categories['DE']}, CN={categories['CN']}, LEGACY={categories['LEGACY']}")
    print(f"2. Files with purely generic step headers (e.g. '## Schritt 1 — entdecken' with no descriptive title): {len(generic_headers_files)} / {len(files)}")
    print(f"3. Files with skeletal/stub Schritt 1 (just goals/bullets, no actual teaching): {len(skeletal_schritt1_files)} / {len(files)}")
    print(f"4. Instances with unregistered/dummy tools: {len(unregistered_tools_files)}")
    print(f"\nTool usage summary:")
    for t, c in sorted(tool_counter.items(), key=lambda x: -x[1]):
        status = "OK" if t in KNOWN_TOOLS else "UNREGISTERED"
        print(f"  [{status}] {t}: {c}")

    print("\nSubject distribution:")
    for s, c in sorted(subject_counts.items(), key=lambda x: -x[1]):
        print(f"  {s}: {c}")

    print("\nTop 15 files with unregistered tools:")
    for item in unregistered_tools_files[:15]:
        print(f"  {item[0]} -> {item[1]}")

    print("\nTop 15 files with skeletal Schritt 1:")
    for item in skeletal_schritt1_files[:15]:
        print(f"  {item[0]} (words: {item[1]}, reason: {item[2]})")

if __name__ == "__main__":
    scan_lernreise()

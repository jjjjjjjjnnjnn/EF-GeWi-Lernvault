"""
Audit Script: Verifies pedagogical and structural integrity of all Lernreise courses.
Checks for:
1. Prompt leakage strings (e.g. 'Ausgangslage aus der Vorlage')
2. Cross-discipline math leaks ($x_1$, $x_2$, $d = x_2 - x_1$) in humanities/social sciences
3. Step 8 misclassified as 'entdecken' instead of 'reflexion'
4. Generic duplicate titles in Step 6 / 7 (e.g. 'Verstaendnispruefung' without subject topic)
5. Schritt 1 structural overlaps (embedding Fachbegriff & Wirkungsgefuege prematurely)
"""

import glob
import re
import os
import sys

def audit_courses():
    files = sorted(glob.glob("Lernreise/*.md"))
    
    prompt_leaks = []
    math_leaks = []
    step8_entdecken = []
    generic_s6_s7 = []
    s1_overlaps = []
    missing_named_titles = []
    
    non_math_subjects = ["deutsch", "englisch", "sowi", "philo", "musik", "sport"]
    
    for f in files:
        fname = os.path.basename(f)
        with open(f, "r", encoding="utf-8") as fp:
            content = fp.read()
            
        # 1. Prompt leaks
        if "Ausgangslage aus der Vorlage" in content or "aus der Vorlage:" in content:
            prompt_leaks.append(fname)
            
        # 2. Math template leaks in humanities / social sciences
        is_non_math = any(subj in fname.lower() for subj in non_math_subjects)
        if is_non_math:
            if re.search(r"\$x_[12]\$|d\s*=\s*x_2\s*-\s*x_1|\$d\s*=\s*x_2|x_1\s*und\s*x_2", content):
                math_leaks.append(fname)
                
        # 3. Step 8 typed as entdecken
        if re.search(r"##\s*Schritt\s*8\s*[-—]\s*entdecken", content, re.IGNORECASE):
            step8_entdecken.append(fname)
            
        # 4. Step 1 overlap
        s1_match = re.search(r"##\s*Schritt\s*1[\s\S]*?(?=##\s*Schritt\s*2)", content)
        if s1_match:
            s1_text = s1_match.group(0)
            if "### Fachbegriff" in s1_text or "### Wirkungsgef" in s1_text:
                s1_overlaps.append(fname)
                
        # 5. Titles
        headers = re.findall(r"##\s*Schritt\s*(\d+)\s*[-—]\s*(\w+)(?:[:：]\s*([^\n\r]+))?", content)
        has_unnamed = False
        for num_str, typ, custom_title in headers:
            num = int(num_str)
            t = (custom_title or "").strip()
            if not t:
                has_unnamed = True
            elif num == 6 and t in ["Verständnisprüfung", "Verstaendnispruefung", "Verständnisprüfung (Self-Check)"]:
                generic_s6_s7.append((fname, num, t))
            elif num == 7 and t in ["Klausurtransfer & Rubric", "Klausurtransfer", "Klausur-Transfer & Szenario"]:
                generic_s6_s7.append((fname, num, t))
        if has_unnamed:
            missing_named_titles.append(fname)
            
    print("=" * 70)
    print(f"LERNREISE PEDAGOGY & INTEGRITY AUDIT REPORT (Total: {len(files)} courses)")
    print("=" * 70)
    print(f"[*] Bug 1 - Prompt Leakage Artifacts: {len(prompt_leaks)} files")
    for item in prompt_leaks[:5]:
        print(f"    - {item}")
    if len(prompt_leaks) > 5:
        print(f"    ... and {len(prompt_leaks) - 5} more")

    print(f"\n[*] Bug 2 - Cross-Discipline Math Template Leaks (SoWi/Philo/etc.): {len(math_leaks)} files")
    for item in math_leaks[:5]:
        print(f"    - {item}")
    if len(math_leaks) > 5:
        print(f"    ... and {len(math_leaks) - 5} more")

    print(f"\n[*] Bug 3 - Schritt 8 Mislabeled as 'entdecken' (Causes wrong TOC label): {len(step8_entdecken)} files")

    print(f"\n[*] Bug 4 - Generic Redundant S6/S7 Titles (e.g. 'Verstaendnispruefung'): {len(generic_s6_s7)} instances")

    print(f"\n[*] Bug 5 - Schritt 1 Premature Conceptual Overload: {len(s1_overlaps)} files")

    print(f"\n[*] Legacy Courses Lacking Named Step Titles: {len(missing_named_titles)} files")
    print("=" * 70)

if __name__ == "__main__":
    audit_courses()

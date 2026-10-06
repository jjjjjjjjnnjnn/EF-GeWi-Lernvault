# -*- coding: utf-8 -*-
"""
analyze-stansi-klausuren.py
从 _Downloads/StanSi-Klausuren 批量提取与分析核心科目的试题结构与 Erwartungshorizont (EHZ) 评分逻辑。
遵守 AGENTS.md 版权红线：本脚本仅用于在本地分析题型架构、Operatoren 分布与分值模型，绝不转存任何版权受限原文。
"""

import os
import sys
import re
import json
from collections import defaultdict
import pypdf

sys.stdout.reconfigure(encoding='utf-8')

STAN_DIR = os.path.join('_Downloads', 'StanSi-Klausuren')
CORE_SUBJECTS = ['Deutsch', 'Englisch', 'SoWi', 'Philosophie', 'Mathe', 'Physik', 'Chemie', 'Bio']

def extract_pdf_structure(filepath):
    """
    提取单个 PDF 的元信息与评分结构
    """
    reader = pypdf.PdfReader(filepath)
    num_pages = len(reader.pages)
    full_text = ""
    for page in reader.pages:
        full_text += (page.extract_text() or "") + "\n"
    
    # 提取基本特征
    operators_found = set()
    known_operators = [
        'analysieren', 'untersuchen', 'vergleichen', 'erlaeutern', 'erläutern',
        'darstellen', 'beurteilen', 'bewerten', 'erörtern', 'eroertern',
        'interpretieren', 'charakterisieren', 'zusammenfassen', 'herausarbeiten',
        'begründen', 'begruenden', 'berechnen', 'bestimmen', 'skizzieren',
        'prüfen', 'pruefen', 'kommentieren', 'gestalten'
    ]
    for op in known_operators:
        if re.search(r'\b' + op + r'\b', full_text, re.IGNORECASE):
            operators_found.add(op.lower())

    # 提取分值结构 (如 Teilaufgabe 1 ... Punkte / Notenpunkte)
    points_mentions = re.findall(r'(\d+)\s*(?:Punkte|Pkt\.|Notenpunkte|BE)', full_text, re.IGNORECASE)
    points_ints = [int(p) for p in points_mentions if 1 <= int(p) <= 150]

    # 检测是否有 Darstellungsleistung
    has_darstellung = bool(re.search(r'Darstellungsleistung', full_text, re.IGNORECASE))
    
    # 检测 AFB 提及
    afb_i = bool(re.search(r'Anforderungsbereich\s*I\b|AFB\s*I\b', full_text, re.IGNORECASE))
    afb_ii = bool(re.search(r'Anforderungsbereich\s*II\b|AFB\s*II\b', full_text, re.IGNORECASE))
    afb_iii = bool(re.search(r'Anforderungsbereich\s*III\b|AFB\s*III\b', full_text, re.IGNORECASE))

    return {
        "pages": num_pages,
        "operators": sorted(list(operators_found)),
        "points_samples": points_ints[:10],
        "has_darstellung": has_darstellung,
        "afb_levels": [lvl for lvl, flag in [("AFB I", afb_i), ("AFB II", afb_ii), ("AFB III", afb_iii)] if flag]
    }

def main():
    if not os.path.exists(STAN_DIR):
        print(f"Error: {STAN_DIR} does not exist.")
        sys.exit(1)

    summary = {}
    total_analyzed = 0

    for subject in CORE_SUBJECTS:
        subj_dir = os.path.join(STAN_DIR, subject)
        if not os.path.exists(subj_dir):
            continue
        
        pdf_files = [f for f in os.listdir(subj_dir) if f.endswith('.pdf')]
        subj_stats = {
            "total_files": len(pdf_files),
            "files": {},
            "all_operators": set(),
            "has_darstellung_count": 0
        }

        print(f"Analyzing {subject} ({len(pdf_files)} files)...")
        for f in sorted(pdf_files):
            fp = os.path.join(subj_dir, f)
            try:
                res = extract_pdf_structure(fp)
                subj_stats["files"][f] = res
                subj_stats["all_operators"].update(res["operators"])
                if res["has_darstellung"]:
                    subj_stats["has_darstellung_count"] += 1
                total_analyzed += 1
            except Exception as e:
                print(f"  Error reading {f}: {e}")

        subj_stats["all_operators"] = sorted(list(subj_stats["all_operators"]))
        summary[subject] = subj_stats

    # 生成脱敏汇总分析 JSON
    out_json = os.path.join('_Downloads', 'stansi-klausuren-analyse.json')
    with open(out_json, 'w', encoding='utf-8') as jf:
        json.dump(summary, jf, ensure_ascii=False, indent=2)

    print(f"\n[OK] Analyzed {total_analyzed} core exam PDFs.")
    print(f"[OK] Summary exported to {out_json}")

if __name__ == '__main__':
    main()

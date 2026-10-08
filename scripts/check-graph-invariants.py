#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
scripts/check-graph-invariants.py
EF-GeWi-Lernvault - 行星引力图谱结构不变量自检

补充 validate-graph-json.py 覆盖不到的结构性约束（见 00_META/presets/README.md §6）：
  I1  edges[] 中的 prerequisite 边与节点的 prerequisites 字段完全一致
  I2  layerIndex(前置) < layerIndex(本节点)  且  tierRank(前置) <= tierRank(本节点)
  I3  每科 >= 3 个多前置汇聚节点 (prerequisites.length >= 3)
  I4  每科 >= 1 个 Q2 / level 3 / klausur_praxis 终极大题汇聚节点
  I5  每科 >= 1 个 Uni_Prep 理论汇聚节点 (prerequisites.length >= 3)
  I6  每个分类星区 >= 6 个节点
  I7  节点总数 60-80
  I8  冻结 ID 逐字保留（sowi 12 / mathe 5 / philo 4）

Usage:
    python scripts/check-graph-invariants.py                  # 默认扫描 00_META/presets/
    python scripts/check-graph-invariants.py <file-or-dir>

Exit code:
    0: 全部不变量通过
    1: 存在违反项
"""

import sys
import os
import json
import glob
from typing import Dict, List, Any

VAULT_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DEFAULT_DIR = os.path.join(VAULT_ROOT, "00_META", "presets")

TIER_RANK = {"Sek_I": 0, "EF": 1, "Q1": 2, "Q2": 3, "Uni_Prep": 4}

FROZEN_IDS = {
    "sowi": [
        "sowi-beduerfnis-knappheit", "sowi-preismechanismus", "sowi-marktversagen",
        "sowi-marktformen-monopol", "sowi-spieltheorie-nash", "sowi-soziale-marktwirtschaft",
        "sowi-magisches-viereck", "sowi-ezb-geldpolitik", "sowi-keynes-vs-friedman",
        "sowi-soziale-schichtung", "sowi-buergergeld-transfer", "sowi-soziale-ungleichheit",
    ],
    "mathe": [
        "mathe-aenderungsrate-sekante", "mathe-lokale-ableitung-grenzwert",
        "mathe-ableitungsregeln-polynom", "mathe-kurvendiskussion-kriterien",
        "mathe-extremwert-optimierung",
    ],
    "philo": [
        "philo-hedonismus-bentham", "philo-utilitarismus-mill",
        "philo-kant-kategorischer-imperativ", "philo-dilemma-diskurs",
    ],
}

# §5 轨道配额（宽松区间，允许 +/- 3 的弹性）
TIER_QUOTA = {
    "Sek_I": (8, 15), "EF": (16, 23), "Q1": (14, 21),
    "Q2": (10, 17), "Uni_Prep": (6, 13),
}


def check_graph(path: str) -> List[str]:
    """返回违反项描述列表；空列表表示通过。"""
    problems: List[str] = []
    with open(path, "r", encoding="utf-8") as fp:
        data: Any = json.load(fp)

    nodes = data.get("nodes", [])
    edges = data.get("edges", [])
    fach = data.get("fach", "?")
    by_id: Dict[str, Any] = {n["id"]: n for n in nodes if isinstance(n, dict) and "id" in n}

    # ---- I7 节点总数 ----
    if not (60 <= len(nodes) <= 80):
        problems.append(f"I7 节点总数 {len(nodes)} 不在 60-80 区间")

    # ---- I1 edges 与 prerequisites 一致性 ----
    declared = set()
    for n in nodes:
        for p in n.get("prerequisites", []) or []:
            declared.add((p, n["id"]))
    edged = {(e.get("from"), e.get("to")) for e in edges if e.get("type") == "prerequisite"}
    for pair in sorted(declared - edged):
        problems.append(f"I1 前置 '{pair[0]}' -> '{pair[1]}' 缺少对应的 prerequisite 边")
    for pair in sorted(edged - declared):
        problems.append(f"I1 prerequisite 边 '{pair[0]}' -> '{pair[1]}' 未出现在任何节点的 prerequisites 中")

    # ---- I2 layerIndex / tierRank 单调 ----
    for nid, n in by_id.items():
        if "layerIndex" not in n:
            problems.append(f"I2 节点 '{nid}' 缺少 layerIndex")
            continue
        n_tier = n.get("curriculumTier")
        for p in n.get("prerequisites", []) or []:
            pn = by_id.get(p)
            if pn is None:
                continue
            if "layerIndex" not in pn:
                continue
            if not pn["layerIndex"] < n["layerIndex"]:
                problems.append(
                    f"I2 layerIndex 违反: '{p}'({pn['layerIndex']}) 未小于 '{nid}'({n['layerIndex']})"
                )
            if n_tier in TIER_RANK and pn.get("curriculumTier") in TIER_RANK:
                if TIER_RANK[pn["curriculumTier"]] > TIER_RANK[n_tier]:
                    problems.append(
                        f"I2 tierRank 违反: '{p}'({pn['curriculumTier']}) 高于 '{nid}'({n_tier})"
                    )

    # ---- I3/I4/I5 汇聚节点 ----
    convergences = [n for n in nodes if len(n.get("prerequisites", []) or []) >= 3]
    if len(convergences) < 3:
        problems.append(f"I3 多前置汇聚节点仅 {len(convergences)} 个 (需 >= 3)")

    has_abitur = any(
        len(n.get("prerequisites", []) or []) >= 3
        and n.get("curriculumTier") == "Q2"
        and n.get("level") == 3
        and n.get("stage") == "klausur_praxis"
        for n in nodes
    )
    if not has_abitur:
        problems.append("I4 缺少 Q2 / level 3 / klausur_praxis 的终极大题汇聚节点")

    has_uni = any(
        len(n.get("prerequisites", []) or []) >= 3 and n.get("curriculumTier") == "Uni_Prep"
        for n in nodes
    )
    if not has_uni:
        problems.append("I5 缺少 Uni_Prep 理论汇聚节点 (prerequisites >= 3)")

    # ---- I6 星区厚度 ----
    cats: Dict[str, int] = {}
    for n in nodes:
        c = n.get("category")
        if not c:
            problems.append(f"I6 节点 '{n['id']}' 缺少 category")
            continue
        cats[c] = cats.get(c, 0) + 1
    if not (4 <= len(cats) <= 6):
        problems.append(f"I6 分类星区数 {len(cats)} 不在 4-6 区间")
    for c, k in sorted(cats.items()):
        if k < 6:
            problems.append(f"I6 星区 '{c}' 仅 {k} 个节点 (< 6)")

    # ---- 轨道配额（建议性，超出弹性区间才报） ----
    tiers: Dict[str, int] = {}
    for n in nodes:
        t = n.get("curriculumTier")
        tiers[t] = tiers.get(t, 0) + 1
    for t, (lo, hi) in TIER_QUOTA.items():
        k = tiers.get(t, 0)
        if k < lo or k > hi:
            print(f"    [i] {fach} 轨道 {t}: {k} 个 (建议 {lo}-{hi})")

    # ---- I8 冻结 ID ----
    for prefix, ids in FROZEN_IDS.items():
        if not any(n.get("id", "").startswith(prefix + "-") for n in nodes):
            continue  # 该学科不在本次文件内
        missing = [i for i in ids if i not in by_id]
        if missing:
            problems.append(f"I8 冻结 ID 丢失 ({prefix}): {', '.join(missing)}")
        else:
            print(f"    [v] {fach} 冻结 ID 全部保留 ({len(ids)} 个)")

    # ---- 建议性提示 ----
    stray = [n["id"] for n in nodes if "coordinates" in n and n["coordinates"]]
    if stray:
        print(f"    [i] {fach} 有 {len(stray)} 个节点携带 coordinates（注册时会被引擎覆盖，建议删除）")

    return problems


def main() -> None:
    target = sys.argv[1] if len(sys.argv) > 1 else DEFAULT_DIR
    if os.path.isfile(target):
        files = [target]
    elif os.path.isdir(target):
        files = sorted(glob.glob(os.path.join(target, "*.json")))
    else:
        print(f"[ERROR] 路径不存在: {target}")
        sys.exit(1)

    if not files:
        print(f"[ERROR] 未找到任何 .json: {target}")
        sys.exit(1)

    print("=" * 70)
    print("  EF-GeWi-Lernvault - 图谱结构不变量自检 (§6)")
    print("=" * 70)

    total_problems = 0
    for path in files:
        print(f"\n[*] {os.path.relpath(path, VAULT_ROOT)}")
        try:
            problems = check_graph(path)
        except Exception as exc:  # noqa: BLE001
            print(f"    [FAIL] 解析失败: {exc}")
            total_problems += 1
            continue

        if problems:
            total_problems += len(problems)
            print(f"    [FAIL] {len(problems)} 项违反:")
            for p in problems:
                print(f"      - {p}")
        else:
            print("    [PASS] 全部不变量通过")

    print("\n" + "=" * 70)
    if total_problems == 0:
        print(" [RESULT] 所有图谱结构不变量均已通过！")
        print("=" * 70)
        sys.exit(0)
    else:
        print(f" [RESULT] 共 {total_problems} 项违反，请修正后重跑。")
        print("=" * 70)
        sys.exit(1)


if __name__ == "__main__":
    main()

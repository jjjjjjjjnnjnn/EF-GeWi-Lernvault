#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
scripts/validate-graph-json.py
EF-GeWi-Lernvault - 知识图谱与技能树批量提取质量门禁校验器

Usage:
    python scripts/validate-graph-json.py path/to/graph.json
    python scripts/validate-graph-json.py path/to/folder_with_jsons/

Exit code:
    0: 验证全部通过 (PASS)
    1: 存在致命阻断项 (死锁环路、字段缺失、非法引用等)
"""

import sys
import os
import json
import re
from typing import Dict, List, Set, Any, Tuple

KEBAB_PATTERN = re.compile(r"^[a-z0-9]+(-[a-z0-9]+)*$")
ALLOWED_STAGES = {"einfuehrung", "grundlagen", "vertiefung", "synthese", "klausur_praxis"}
ALLOWED_TIERS = {"Sek_I", "EF", "Q1", "Q2", "Uni_Prep"}

def detect_cycles(nodes_dict: Dict[str, Any]) -> List[str]:
    """使用 DFS 三色标记法检测有向图中是否存在循环依赖死锁"""
    # 0: 未访问, 1: 正在访问 (递归栈中), 2: 已完成
    color: Dict[str, int] = {node_id: 0 for node_id in nodes_dict}
    cycle_path: List[str] = []

    def dfs(curr_id: str, path: List[str]) -> bool:
        color[curr_id] = 1
        path.append(curr_id)
        node = nodes_dict.get(curr_id)
        if node:
            for prereq_id in node.get("prerequisites", []):
                if prereq_id not in nodes_dict:
                    continue
                if color.get(prereq_id) == 1:
                    # 发现回路
                    idx = path.index(prereq_id)
                    cycle_path.extend(path[idx:])
                    cycle_path.append(prereq_id)
                    return True
                if color.get(prereq_id) == 0:
                    if dfs(prereq_id, path):
                        return True
        path.pop()
        color[curr_id] = 2
        return False

    for node_id in nodes_dict:
        if color[node_id] == 0:
            if dfs(node_id, []):
                return cycle_path
    return []

def validate_graph_dict(data: Any, filename: str) -> Tuple[bool, List[str], List[str], Dict[str, Any]]:
    errors: List[str] = []
    warnings: List[str] = []

    if not isinstance(data, dict):
        return False, [f"Root must be a JSON object in {filename}"], [], {}

    if data.get("schemaVersion") != 1:
        errors.append(f"schemaVersion must be 1 (found {data.get('schemaVersion')})")

    fach = data.get("fach")
    if not fach or not isinstance(fach, str):
        errors.append("Missing or invalid 'fach' field")

    if not data.get("nameDE") or not data.get("nameZH"):
        errors.append("Missing required 'nameDE' or 'nameZH' subject names")

    nodes = data.get("nodes")
    if not isinstance(nodes, list) or len(nodes) == 0:
        errors.append("Graph must contain a non-empty 'nodes' array")
        return False, errors, warnings, {}

    node_ids: Set[str] = set()
    nodes_dict: Dict[str, Any] = {}
    categories: Set[str] = set()
    tags_set: Set[str] = set()
    formula_count = 0
    fallacy_count = 0
    tier_counts: Dict[str, int] = {}
    afb_counts: Dict[int, int] = {1: 0, 2: 0, 3: 0}

    # 1. 节点字段逐一核验
    for idx, node in enumerate(nodes):
        if not isinstance(node, dict):
            errors.append(f"Node at index {idx} is not an object")
            continue

        nid = node.get("id")
        if not nid or not isinstance(nid, str):
            errors.append(f"Node at index {idx} has missing or empty 'id'")
            continue

        if not KEBAB_PATTERN.match(nid):
            errors.append(f"Node id '{nid}' is not valid kebab-case (only lowercase a-z, 0-9, '-')")

        if nid in node_ids:
            errors.append(f"Duplicate node id detected: '{nid}'")
        node_ids.add(nid)
        nodes_dict[nid] = node

        # 中德双语校验
        t_de = node.get("titleDE")
        t_zh = node.get("titleZH")
        if not t_de or not t_zh:
            errors.append(f"Node '{nid}' must provide both 'titleDE' and 'titleZH'")

        # 分类校验
        cat = node.get("category")
        if not cat:
            warnings.append(f"Node '{nid}' has no 'category' field (defaulting to Allgemein)")
        else:
            categories.add(str(cat))

        # 标签校验
        tags = node.get("tags")
        if isinstance(tags, list):
            for t in tags:
                tags_set.add(str(t))
        else:
            warnings.append(f"Node '{nid}' has no 'tags' array")

        # 学段层级 (Tier)
        tier = node.get("curriculumTier")
        if tier:
            tier_counts[tier] = tier_counts.get(tier, 0) + 1
            if tier not in ALLOWED_TIERS:
                warnings.append(f"Node '{nid}' uses non-standard curriculumTier '{tier}'")

        # 学习阶段 (Stage)
        stage = node.get("stage")
        if stage not in ALLOWED_STAGES:
            errors.append(f"Node '{nid}' has invalid stage '{stage}' (must be one of {sorted(ALLOWED_STAGES)})")

        # AFB 等级
        level = node.get("level")
        if level not in (1, 2, 3):
            errors.append(f"Node '{nid}' level must be 1, 2, or 3 (AFB I-III)")
        else:
            afb_counts[level] = afb_counts.get(level, 0) + 1

        # 提分关键点核验
        if node.get("keyFormulaOrSentence"):
            formula_count += 1
        else:
            warnings.append(f"Node '{nid}' is missing 'keyFormulaOrSentence' (15 NP scoring sentence)")

        if node.get("commonFallacy"):
            fallacy_count += 1
        else:
            warnings.append(f"Node '{nid}' is missing 'commonFallacy' (exam trap/fallacy)")

    # 2. 前置引用存在性核验
    for nid, node in nodes_dict.items():
        prereqs = node.get("prerequisites", [])
        if not isinstance(prereqs, list):
            errors.append(f"Node '{nid}' prerequisites must be a list")
            continue
        for p in prereqs:
            if p not in node_ids:
                errors.append(f"Node '{nid}' references nonexistent prerequisite '{p}'")

    # 3. 死锁闭环检测
    cycle = detect_cycles(nodes_dict)
    if cycle:
        errors.append(f"Deadlock cyclic dependency detected: {' -> '.join(cycle)}")

    # 4. 统计汇总
    stats = {
        "fach": fach,
        "total_nodes": len(nodes),
        "total_edges": len(data.get("edges", [])),
        "categories": sorted(list(categories)),
        "total_tags": len(tags_set),
        "formula_coverage_pct": round((formula_count / max(1, len(nodes))) * 100, 1),
        "fallacy_coverage_pct": round((fallacy_count / max(1, len(nodes))) * 100, 1),
        "afb_distribution": afb_counts,
        "tier_distribution": tier_counts,
    }

    return len(errors) == 0, errors, warnings, stats

def main():
    if len(sys.argv) < 2:
        print("Usage: python scripts/validate-graph-json.py <file-or-dir>")
        sys.exit(1)

    target_path = sys.argv[1]
    files_to_check: List[str] = []

    if os.path.isfile(target_path):
        files_to_check.append(target_path)
    elif os.path.isdir(target_path):
        for root, _, files in os.walk(target_path):
            for f in files:
                if f.endswith(".json") and not f.startswith("."):
                    files_to_check.append(os.path.join(root, f))
    else:
        print(f"[ERROR] Target path does not exist: {target_path}")
        sys.exit(1)

    all_passed = True
    print("=" * 70)
    print("  EF-GeWi-Lernvault - 知识图谱与技能树质量门禁自动化检测")
    print("=" * 70)

    for fpath in files_to_check:
        try:
            with open(fpath, "r", encoding="utf-8") as fp:
                data = json.load(fp)
        except Exception as e:
            print(f"[FAIL] {fpath}: JSON parse error: {e}")
            all_passed = False
            continue

        valid, errors, warnings, stats = validate_graph_dict(data, fpath)
        if not valid:
            all_passed = False
            print(f"\n[FAIL] {fpath}")
            for err in errors:
                print(f"  - 错误: {err}")
            for warn in warnings[:5]:
                print(f"  - 警告: {warn}")
            if len(warnings) > 5:
                print(f"  - ... 另有 {len(warnings) - 5} 项警告")
        else:
            print(f"\n[PASS] {fpath} ({stats.get('fach', 'Unknown')})")
            print(f"  * 节点数: {stats['total_nodes']} | 连线数: {stats['total_edges']}")
            print(f"  * 分类星区: {len(stats['categories'])} 个 ({', '.join(stats['categories'][:4])})")
            print(f"  * 15NP核心句覆盖率: {stats['formula_coverage_pct']}% | 易错误区覆盖率: {stats['fallacy_coverage_pct']}%")
            print(f"  * AFB分布: I={stats['afb_distribution'][1]}, II={stats['afb_distribution'][2]}, III={stats['afb_distribution'][3]}")
            if warnings:
                print(f"  * 存在 {len(warnings)} 项建议性优化提示")

    print("\n" + "=" * 70)
    if all_passed:
        print(" [RESULT] 所有图谱数据均已 100% 通过死锁与质量门禁校验！")
        print("=" * 70)
        sys.exit(0)
    else:
        print(" [RESULT] 校验未通过，请根据上方错误提示修正 JSON 数据！")
        print("=" * 70)
        sys.exit(1)

if __name__ == "__main__":
    main()

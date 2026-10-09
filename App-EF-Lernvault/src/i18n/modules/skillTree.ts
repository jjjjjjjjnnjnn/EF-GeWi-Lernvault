import type { Lang } from "../types";

export interface SkillTreeI18nTokens {
  fachLabel: string;
  addSubjectBtn: string;
  addSubjectTitle: string;
  searchPlaceholder: string;
  allCategories: string;
  allTags: string;
  planetaryMode: string;
  treeMode: string;
  zoomIn: string;
  zoomOut: string;
  resetView: string;
  jsonExportImport: string;
  customMovedTip: (n: number) => string;
  resetPositionsBtn: string;

  // 多语言模式切换器
  langModeLabel: string;
  langModeDE: string;
  langModeZH: string;
  langModeBilingual: string;

  // 节点状态徽标与图例
  statusMastered: string;
  statusAvailable: string;
  statusLocked: string;
  statusReady: string;

  // 因果拓扑标记
  causalFokus: string;
  causalPrereq: (dist?: number) => string;
  causalSuccessor: (dist?: number) => string;
  causalChainTitle: string;
  causalStepsCount: (n: number) => string;

  // 研习抽屉
  drawerHandleText: string;
  drawerOpenAria: string;
  drawerCloseAria: string;
  conceptCausalityTitle: string;
  scoringSentenceTitle: string;
  commonFallacyTitle: string;
  tagsTitle: string;
  noTags: string;
  newTagPlaceholder: string;
  actionsTitle: string;

  // 学习动作
  markMastered: string;
  unmarkMastered: string;
  startReise: string;
  openNote: string;
  openTool: string;
  editNode: string;
  deleteNode: string;

  // 弹窗表单
  addNodeModalTitle: string;
  editNodeModalTitle: string;
  saveBtn: string;
  cancelBtn: string;
}

export const skillTreeI18n = (lang: Lang): SkillTreeI18nTokens => {
  const de = lang === "de";
  return {
    fachLabel: de ? "Fach:" : "学科:",
    addSubjectBtn: de ? "+ Fach" : "+ 学科",
    addSubjectTitle: de ? "Neues Fach anlegen" : "新增学科板块",
    searchPlaceholder: de ? "Knoten / Formel / Begriff suchen…" : "筛选考点 / 核心句 / 概念…",
    allCategories: de ? "Alle Bereiche" : "全部分区",
    allTags: de ? "Alle Tags" : "全部标签",
    planetaryMode: de ? "Gravitations-Atlas" : "行星引力星系",
    treeMode: de ? "Kognitiver Stufenbaum" : "认知阶梯树",
    zoomIn: de ? "Vergrößern" : "放大",
    zoomOut: de ? "Verkleinern" : "缩小",
    resetView: de ? "Ansicht zentrieren" : "居中复位",
    jsonExportImport: "JSON",
    customMovedTip: (n: number) => (de ? `${n} Knoten manuell verschoben` : `已自定义移动 ${n} 个节点位置`),
    resetPositionsBtn: de ? "Standard-Layout" : "复位默认",

    langModeLabel: de ? "Sprachmodus:" : "语言模式:",
    langModeDE: de ? "DE (Prüfung)" : "德语 (考试)",
    langModeZH: de ? "ZH (Verstehen)" : "中文 (理解)",
    langModeBilingual: de ? "Bilingual (DE·ZH)" : "双语 (DE·ZH)",

    statusMastered: de ? "Gekonnt" : "已精通掌握",
    statusAvailable: de ? "Verfügbar" : "可立即攻坚",
    statusLocked: de ? "Gesperrt" : "前置未解锁",
    statusReady: de ? "Bereit" : "可学",

    causalFokus: de ? "Fokus" : "当前攻坚",
    causalPrereq: (dist?: number) =>
      dist && dist > 1
        ? de
          ? `← Voraus. (d=${dist})`
          : `← 前置基石 (d=${dist})`
        : de
        ? "← Voraus."
        : "← 前置基石",
    causalSuccessor: (dist?: number) =>
      dist && dist > 1
        ? de
          ? `→ Folge (d=${dist})`
          : `→ 解锁进阶 (d=${dist})`
        : de
        ? "→ Folge"
        : "→ 解锁进阶",
    causalChainTitle: de ? "Kausal-Lernpfad (Linear)" : "因果推进学习清单 (全链路)",
    causalStepsCount: (n: number) => (de ? `${n} Schritte` : `${n} 步进节点`),

    drawerHandleText: de ? "Lernkarte" : "研习卡片",
    drawerOpenAria: de ? "Wissenskarte aufklappen" : "展开研习抽屉",
    drawerCloseAria: de ? "Schließen" : "关闭",
    conceptCausalityTitle: de ? "Konzept & Kausalität" : "核心概念与因果推演",
    scoringSentenceTitle: de ? "15 NP Klausursatz / Formel" : "15 NP 会考得分核心句 / 公式",
    commonFallacyTitle: de ? "Typische Fehlvorstellung" : "典型易错误区 (Fehlvorstellung)",
    tagsTitle: de ? "Tags & Markierungen" : "多维标记与标签",
    noTags: de ? "Keine Tags vergeben." : "暂无标签",
    newTagPlaceholder: de ? "Neuer Tag…" : "新标签名称…",
    actionsTitle: de ? "Lernressourcen & Aktionen" : "学习资源与直达动作",

    markMastered: de ? "Als 'Gekonnt' markieren" : "标记已掌握",
    unmarkMastered: de ? "Status: Gekonnt (Zurücksetzen)" : "已掌握 (点击撤销)",
    startReise: de ? "Lernreise starten" : "启动探究式微课",
    openNote: de ? "Wissensnotiz öffnen" : "研读八段式笔记",
    openTool: de ? "Laborwerkzeug öffnen" : "启动仿真实验室",
    editNode: de ? "Knoten bearbeiten" : "编辑此节点属性",
    deleteNode: de ? "Löschen" : "删除节点",

    addNodeModalTitle: de ? "Neuen Wissensknoten anfügen" : "拼插新知识点 (Hot-Pluggable Node)",
    editNodeModalTitle: de ? "Wissensknoten bearbeiten" : "编辑知识点属性",
    saveBtn: de ? "Speichern" : "确认保存",
    cancelBtn: de ? "Abbrechen" : "取消",
  };
};

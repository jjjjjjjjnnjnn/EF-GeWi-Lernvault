// 贝叶斯知识追踪模型 (Bayesian Knowledge Tracing, BKT) 与考纲掌握度引擎
// 支持认知状态动态追踪、薄弱点诊断、以及自主开启/关闭的学期归档与重置 (EF.1 / EF.2)

import { resolveInhaltsfeld, NRW_LEHRPLAN_IFS } from "./competencyMap";

export interface BKTParameters {
  pL0: number; // 初始掌握先验概率，默认 0.15
  pT: number;  // 认知转移学习率，默认 0.18
  pG: number;  // 猜对率 Guess，默认 0.20
  pS: number;  // 失误率 Slip，默认 0.10
}

export const DEFAULT_BKT_PARAMS: BKTParameters = {
  pL0: 0.15,
  pT: 0.18,
  pG: 0.20,
  pS: 0.10,
};

export interface TopicMastery {
  topicId: string;
  thema: string;
  fach: string;
  inhaltsfeldId: string;
  pMastery: number;       // 0.0 - 1.0 (概率值)
  totalAttempts: number;  // 练习总次数
  correctAttempts: number;// 正确次数
  lastUpdated: string;    // ISO 时间戳
}

export type TermIdentifier = "EF.1" | "EF.2" | "ALL";

export interface TermArchive {
  term: TermIdentifier;
  archivedAt: string;
  snapshot: Record<string, TopicMastery>;
}

export interface MasteryStoreState {
  termModeEnabled: boolean;
  activeTerm: TermIdentifier;
  masteryByTerm: Record<string, Record<string, TopicMastery>>;
  archives: TermArchive[];
}

const STORAGE_KEY = "ef_lernvault_mastery_state_v1";

export class MasteryEngine {
  private state: MasteryStoreState;
  private params: BKTParameters;

  constructor(params: BKTParameters = DEFAULT_BKT_PARAMS) {
    this.params = params;
    this.state = this.loadFromStorage();
  }

  private loadFromStorage(): MasteryStoreState {
    try {
      if (typeof window !== "undefined" && window.localStorage) {
        const raw = window.localStorage.getItem(STORAGE_KEY);
        if (raw) {
          return JSON.parse(raw);
        }
      }
    } catch {
      // 忽略存储读取异常，采用默认空白状态
    }

    return {
      termModeEnabled: false, // 默认不开启学期隔离，由用户自主开启
      activeTerm: "ALL",
      masteryByTerm: {
        ALL: {},
        "EF.1": {},
        "EF.2": {},
      },
      archives: [],
    };
  }

  private saveToStorage(): void {
    try {
      if (typeof window !== "undefined" && window.localStorage) {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));
      }
    } catch {
      // 存储异常静默降级
    }
  }

  /** 获取当前活跃的学期桶 */
  public getEffectiveTerm(): string {
    return this.state.termModeEnabled ? this.state.activeTerm : "ALL";
  }

  /** 自主开启或关闭学期管理功能 */
  public setTermModeEnabled(enabled: boolean): void {
    this.state.termModeEnabled = enabled;
    if (!enabled) {
      this.state.activeTerm = "ALL";
    } else if (this.state.activeTerm === "ALL") {
      this.state.activeTerm = "EF.1";
    }
    this.saveToStorage();
  }

  public isTermModeEnabled(): boolean {
    return this.state.termModeEnabled;
  }

  /** 切换当前学期 (EF.1 / EF.2 / ALL) */
  public setActiveTerm(term: TermIdentifier): void {
    this.state.activeTerm = term;
    if (!this.state.masteryByTerm[term]) {
      this.state.masteryByTerm[term] = {};
    }
    this.saveToStorage();
  }

  public getActiveTerm(): TermIdentifier {
    return this.state.activeTerm;
  }

  /**
   * 核心 BKT 数学递推更新：
   * @param topicId 主题唯一标识
   * @param thema 德语主题名
   * @param fach 学科
   * @param isCorrect 本次答题/复习是否合格或正确
   * @param tags 标签 (用于归类到 Inhaltsfeld)
   */
  public recordAttempt(
    topicId: string,
    thema: string,
    fach: string,
    isCorrect: boolean,
    tags: string[] = []
  ): TopicMastery {
    const term = this.getEffectiveTerm();
    if (!this.state.masteryByTerm[term]) {
      this.state.masteryByTerm[term] = {};
    }
    const termBucket = this.state.masteryByTerm[term];

    let current = termBucket[topicId];
    if (!current) {
      const ifDef = resolveInhaltsfeld(fach, thema, tags);
      current = {
        topicId,
        thema,
        fach,
        inhaltsfeldId: ifDef ? ifDef.id : `${fach.toLowerCase()}-if1`,
        pMastery: this.params.pL0,
        totalAttempts: 0,
        correctAttempts: 0,
        lastUpdated: new Date().toISOString(),
      };
    }

    const { pT, pG, pS } = this.params;
    const pPrev = current.pMastery;

    // 1. 计算后验概率 P(L_t | observation)
    let pPosterior: number;
    if (isCorrect) {
      const num = pPrev * (1 - pS);
      const den = pPrev * (1 - pS) + (1 - pPrev) * pG;
      pPosterior = den > 0 ? num / den : pPrev;
    } else {
      const num = pPrev * pS;
      const den = pPrev * pS + (1 - pPrev) * (1 - pG);
      pPosterior = den > 0 ? num / den : pPrev;
    }

    // 2. 状态转移 P(L_t) = P(L_t|obs) + (1 - P(L_t|obs)) * P(T)
    const pNew = pPosterior + (1 - pPosterior) * pT;

    // 3. 数值截断到 [0.01, 0.99]
    current.pMastery = Math.min(0.99, Math.max(0.01, pNew));
    current.totalAttempts += 1;
    if (isCorrect) current.correctAttempts += 1;
    current.lastUpdated = new Date().toISOString();

    termBucket[topicId] = current;
    this.saveToStorage();
    return { ...current };
  }

  /** 获取单个主题的掌握度 */
  public getTopicMastery(topicId: string): TopicMastery | null {
    const term = this.getEffectiveTerm();
    return this.state.masteryByTerm[term]?.[topicId] ?? null;
  }

  /** 获取当前学期所有主题的掌握度列表 */
  public getAllTopicMasteries(): TopicMastery[] {
    const term = this.getEffectiveTerm();
    const bucket = this.state.masteryByTerm[term] ?? {};
    return Object.values(bucket);
  }

  /**
   * 按学科汇总考纲 Inhaltsfeld (IF) 掌握度
   */
  public getInhaltsfeldStats(fach: string): {
    inhaltsfeld: (typeof NRW_LEHRPLAN_IFS)[number];
    avgMastery: number; // 0 - 100%
    topicCount: number;
    status: "weak" | "progress" | "mastered";
  }[] {
    const all = this.getAllTopicMasteries().filter(
      (m) => m.fach.toLowerCase() === fach.toLowerCase()
    );
    const ifDefs = NRW_LEHRPLAN_IFS.filter(
      (item) => item.fach.toLowerCase() === fach.toLowerCase()
    );

    return ifDefs.map((def) => {
      const matched = all.filter((t) => t.inhaltsfeldId === def.id);
      let avg = 0;
      if (matched.length > 0) {
        const sum = matched.reduce((acc, curr) => acc + curr.pMastery, 0);
        avg = Math.round((sum / matched.length) * 100);
      } else {
        avg = Math.round(this.params.pL0 * 100);
      }

      const status: "weak" | "progress" | "mastered" =
        avg >= 75 ? "mastered" : avg >= 50 ? "progress" : "weak";

      return {
        inhaltsfeld: def,
        avgMastery: avg,
        topicCount: matched.length,
        status,
      };
    });
  }

  /** 获取学科整体平均掌握度百分比 (0 - 100) */
  public getOverallFachMastery(fach: string): number {
    const topics = this.getAllTopicMasteries().filter(
      (m) => m.fach.toLowerCase() === fach.toLowerCase()
    );
    if (topics.length === 0) return Math.round(this.params.pL0 * 100);
    const sum = topics.reduce((acc, curr) => acc + curr.pMastery, 0);
    return Math.round((sum / topics.length) * 100);
  }

  /** 获取需要优先复习的薄弱考点 (掌握概率 lowest 的前 K 个) */
  public getWeakestTopics(topK = 5, fach?: string): TopicMastery[] {
    let list = this.getAllTopicMasteries();
    if (fach) {
      list = list.filter((m) => m.fach.toLowerCase() === fach.toLowerCase());
    }
    return list.sort((a, b) => a.pMastery - b.pMastery).slice(0, topK);
  }

  /** 归档当前学期数据快照 */
  public archiveCurrentTerm(): TermArchive {
    const term = this.getEffectiveTerm() as TermIdentifier;
    const bucket = this.state.masteryByTerm[term] ?? {};
    const archive: TermArchive = {
      term,
      archivedAt: new Date().toISOString(),
      snapshot: JSON.parse(JSON.stringify(bucket)),
    };
    this.state.archives.push(archive);
    this.saveToStorage();
    return archive;
  }

  /** 重置当前学期的掌握度数据 (例如开启新学期复习) */
  public resetCurrentTerm(): void {
    const term = this.getEffectiveTerm();
    this.state.masteryByTerm[term] = {};
    this.saveToStorage();
  }

  /** 清空全部数据 (调试与测试使用) */
  public clearAll(): void {
    this.state = {
      termModeEnabled: false,
      activeTerm: "ALL",
      masteryByTerm: { ALL: {}, "EF.1": {}, "EF.2": {} },
      archives: [],
    };
    this.saveToStorage();
  }
}

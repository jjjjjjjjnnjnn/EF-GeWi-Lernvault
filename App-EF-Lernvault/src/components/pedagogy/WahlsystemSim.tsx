import { useState, useMemo } from "react";
import type { Lang } from "../../i18n";

export interface WahlsystemSimProps {
  lang?: Lang;
  studioMode?: boolean;
  onExportFinding?: (text: string) => void;
}

export type ElectoralSystem = "reform2023" | "altesSystem";

export interface PartyData {
  id: string;
  nameDE: string;
  nameZH: string;
  kurzDE: string;
  kurzZH: string;
  spectrumOrder: number; // 1 = leftmost (Linke) -> 7 = rightmost (AfD)
  zweitstimmenPercent: number; // %
  direktmandate: number; // Anzahl gewonnener Wahlkreise (von 299)
  colorInk: string; // Tufte Monochrome / Ink Tone
  patternId: string; // SVG pattern id
}

export interface ScenarioPreset {
  id: string;
  titleDE: string;
  titleZH: string;
  subtitleDE: string;
  subtitleZH: string;
  system: ElectoralSystem;
  parties: PartyData[];
  descriptionDE: string;
  descriptionZH: string;
  klausurFokusDE: string;
  klausurFokusZH: string;
}

export interface SeatAllocationResult {
  partyId: string;
  nameDE: string;
  nameZH: string;
  zweitstimmenPercent: number;
  direktmandate: number;
  eligible: boolean;
  totalSeats: number;
  seatSharePercent: number;
  listenmandate: number;
  ueberhangmandate: number;
  ausgleichsmandate: number;
  uncoveredDirektmandate: number; // Im neuen Recht: Direktmandat gewonnen, aber kein Zweitstimmensitz
  coveredDirektmandate: number;
}

export interface SystemComparisonSummary {
  system: ElectoralSystem;
  totalBundestagSeats: number;
  statutoryBaseSeats: number; // 598 (alt) bzw. 630 (neu)
  inflationSeats: number; // Überhang + Ausgleich (alt)
  totalUncoveredWahlkreise: number; // (neu)
  chancellorMajorityNeeded: number; // 50% + 1
  wastedVotesPercent: number; // An der 5%-Hürde gescheiterte Stimmen
  allocations: SeatAllocationResult[];
}

export interface PlenarySeatDot {
  index: number;
  partyId: string;
  row: number;
  col: number;
  angleDeg: number;
  x: number;
  y: number;
  isUncovered?: boolean;
}

// Standard-Voreinstellungen basierend auf echten NRW-Abitur & SoWi-Fallstudien
export const PRESET_SCENARIOS: ScenarioPreset[] = [
  {
    id: "btw2021-real",
    titleDE: "Bundestagswahl 2021 (Historische Rekordaufblähung: 736 Sitze)",
    titleZH: "2021年联邦大选实况（历史超级膨胀：736席）",
    subtitleDE: "Extremer Überhang & massive Ausgleichsmandate im alten Wahlsystem",
    subtitleZH: "传统双票制下的极端悬峙议席与巨额平衡议席膨胀",
    system: "altesSystem",
    descriptionDE:
      "Bei der Bundestagswahl 2021 führte das alte Bundeswahlgesetz zu 34 Überhang- und 104 Ausgleichsmandaten. Der Bundestag schwoll von 598 auf 736 Sitze an – ein Rekord, der die Reform 2023 auslöste.",
    descriptionZH:
      "2021年大选旧制产生34个悬峙议席和104个平衡议席，议会从基准598席暴增至736席，直接促成了2023年选举法大修。",
    klausurFokusDE:
      "AFB III: Spannungsverhältnis zwischen föderaler Repräsentation der Direktkandidaten und der Arbeits- & Funktionsfähigkeit des aufgeblähten Parlaments.",
    klausurFokusZH:
      "会考大题考点（AFB III）：直选代表地方民意与议会超载瘫痪、财政支出飙升之间的宪政法益权衡。",
    parties: [
      {
        id: "linke",
        nameDE: "Die Linke",
        nameZH: "左翼党",
        kurzDE: "LINKE",
        kurzZH: "左翼",
        spectrumOrder: 1,
        zweitstimmenPercent: 4.9,
        direktmandate: 3, // Grundmandatsklausel!
        colorInk: "#3f3f46",
        patternId: "pat-dots-sparse",
      },
      {
        id: "spd",
        nameDE: "SPD",
        nameZH: "社民党",
        kurzDE: "SPD",
        kurzZH: "社民",
        spectrumOrder: 2,
        zweitstimmenPercent: 25.7,
        direktmandate: 121,
        colorInk: "#18181b",
        patternId: "pat-solid-ink",
      },
      {
        id: "gruene",
        nameDE: "Bündnis 90/Die Grünen",
        nameZH: "绿党",
        kurzDE: "GRÜNE",
        kurzZH: "绿党",
        spectrumOrder: 3,
        zweitstimmenPercent: 14.8,
        direktmandate: 16,
        colorInk: "#27272a",
        patternId: "pat-stripes-diag",
      },
      {
        id: "fdp",
        nameDE: "FDP",
        nameZH: "自民党",
        kurzDE: "FDP",
        kurzZH: "自民",
        spectrumOrder: 4,
        zweitstimmenPercent: 11.5,
        direktmandate: 0,
        colorInk: "#71717a",
        patternId: "pat-grid-fine",
      },
      {
        id: "cdu",
        nameDE: "CDU",
        nameZH: "基民盟 (CDU)",
        kurzDE: "CDU",
        kurzZH: "基民",
        spectrumOrder: 5,
        zweitstimmenPercent: 18.9,
        direktmandate: 98,
        colorInk: "#09090b",
        patternId: "pat-crosshatch",
      },
      {
        id: "csu",
        nameDE: "CSU (Bayern)",
        nameZH: "基社盟 (CSU/巴伐利亚)",
        kurzDE: "CSU",
        kurzZH: "基社",
        spectrumOrder: 6,
        zweitstimmenPercent: 5.2,
        direktmandate: 45, // Gewinnt fast alle 46 Wahlkreise in Bayern bei 5.2% bundesweit -> massiver Überhang!
        colorInk: "#1c1917",
        patternId: "pat-grid-fine",
      },
      {
        id: "afd",
        nameDE: "AfD",
        nameZH: "德国选择党 (AfD)",
        kurzDE: "AfD",
        kurzZH: "选择",
        spectrumOrder: 7,
        zweitstimmenPercent: 10.3,
        direktmandate: 16,
        colorInk: "#52525b",
        patternId: "pat-stripes-vert",
      },
      {
        id: "andere",
        nameDE: "Andere / Sonstige",
        nameZH: "其他政党",
        kurzDE: "ANDERE",
        kurzZH: "其他",
        spectrumOrder: 8,
        zweitstimmenPercent: 8.7,
        direktmandate: 0,
        colorInk: "#a1a1aa",
        patternId: "pat-dots-dense",
      },
    ],
  },
  {
    id: "btw2025-sim",
    titleDE: "Simulation Bundestagswahl 2025 (Neues Recht: Fix 630 Sitze)",
    titleZH: "2025年大选模拟预测（新选举法：严格封顶630席）",
    subtitleDE: "Zweitstimmendeckung & Verfall von Direktmandaten im neuen Gesetz",
    subtitleZH: "严格以第二票为基准，无配额覆盖之直选议员不予就任",
    system: "reform2023",
    descriptionDE:
      "Unter der Reform 2023/2024 ist die Bundestagsgröße strikt auf 630 Sitze fixiert. Parteien erhalten nur so viele Sitze, wie ihnen nach dem Zweitstimmenergebnis zustehen (Zweitstimmendeckung).",
    descriptionZH:
      "在2023/2024年新法下，法定总席位严格固定为630席。直选候选人若无政党在当州的第二票席位配额覆盖，则无法就任。",
    klausurFokusDE:
      "AFB III: Legitimationsproblem 'verwaister Wahlkreise' vs. strikte Einhaltung der Erfolgswertgleichheit (Art. 38 Abs. 1 GG).",
    klausurFokusZH:
      "会考核心考点：选区第一名候选人无法进入国会的‘代表性赤字’与宪法‘投票效力完全平等’（无多余悬峙）之权衡。",
    parties: [
      {
        id: "linke",
        nameDE: "Die Linke",
        nameZH: "左翼党",
        kurzDE: "LINKE",
        kurzZH: "左翼",
        spectrumOrder: 1,
        zweitstimmenPercent: 3.5,
        direktmandate: 1, // < 3 Direktmandate -> Scheitert an 5%
        colorInk: "#3f3f46",
        patternId: "pat-dots-sparse",
      },
      {
        id: "bsw",
        nameDE: "BSW",
        nameZH: "瓦根克内希特联盟 (BSW)",
        kurzDE: "BSW",
        kurzZH: "BSW",
        spectrumOrder: 2,
        zweitstimmenPercent: 7.5,
        direktmandate: 0,
        colorInk: "#27272a",
        patternId: "pat-stripes-diag",
      },
      {
        id: "spd",
        nameDE: "SPD",
        nameZH: "社民党",
        kurzDE: "SPD",
        kurzZH: "社民",
        spectrumOrder: 3,
        zweitstimmenPercent: 15.5,
        direktmandate: 45,
        colorInk: "#18181b",
        patternId: "pat-solid-ink",
      },
      {
        id: "gruene",
        nameDE: "Bündnis 90/Die Grünen",
        nameZH: "绿党",
        kurzDE: "GRÜNE",
        kurzZH: "绿党",
        spectrumOrder: 4,
        zweitstimmenPercent: 12.5,
        direktmandate: 15,
        colorInk: "#52525b",
        patternId: "pat-grid-fine",
      },
      {
        id: "fdp",
        nameDE: "FDP",
        nameZH: "自民党",
        kurzDE: "FDP",
        kurzZH: "自民",
        spectrumOrder: 5,
        zweitstimmenPercent: 4.8, // Knapp unter 5%!
        direktmandate: 0,
        colorInk: "#71717a",
        patternId: "pat-stripes-vert",
      },
      {
        id: "cdu-csu",
        nameDE: "CDU/CSU",
        nameZH: "联盟党 (CDU/CSU)",
        kurzDE: "CDU/CSU",
        kurzZH: "联盟",
        spectrumOrder: 6,
        zweitstimmenPercent: 31.5,
        direktmandate: 165,
        colorInk: "#09090b",
        patternId: "pat-crosshatch",
      },
      {
        id: "afd",
        nameDE: "AfD",
        nameZH: "德国选择党 (AfD)",
        kurzDE: "AfD",
        kurzZH: "选择",
        spectrumOrder: 7,
        zweitstimmenPercent: 19.5,
        direktmandate: 73,
        colorInk: "#3f3f46",
        patternId: "pat-dots-dense",
      },
      {
        id: "andere",
        nameDE: "Andere / Sonstige",
        nameZH: "其他政党",
        kurzDE: "ANDERE",
        kurzZH: "其他",
        spectrumOrder: 8,
        zweitstimmenPercent: 5.2,
        direktmandate: 0,
        colorInk: "#a1a1aa",
        patternId: "pat-grid-fine",
      },
    ],
  },
  {
    id: "csu-dilemma",
    titleDE: "Extremszenario: Das bayerische Überhang-Dilemma",
    titleZH: "极端案例：巴伐利亚悬峙两难（直选全胜但第二票配额不足）",
    subtitleDE: "Vergleich: 140 Ausgleichssitze (alt) vs. verfallene Wahlkreise (neu)",
    subtitleZH: "对比：旧法追加140个平衡议席 vs 新法直选第一名落选",
    system: "reform2023",
    descriptionDE:
      "Wenn eine Regionalpartei (z. B. CSU) fast alle Direktmandate gewinnt, aber ihr bundesweiter Zweitstimmenanteil sinkt, explodiert im alten System die Sitzanzahl durch Ausgleich – im neuen System verlieren Direktkandidaten ihr Mandat.",
    descriptionZH:
      "当地方大党几乎横扫全部直接选区但全国第二票比例走低：旧法会触发雪崩式全额平衡追加，而新法下直接胜选的选区议员将直接被剥夺就任资格。",
    klausurFokusDE:
      "AFB III: BVerfG-Entscheidung 2024 zur Grundmandatsklausel und die Gefahr der Nicht-Repräsentation ganzer Regionen.",
    klausurFokusZH:
      "联邦宪法法院2024判决：基本议席条款与选区直接代表权 vs 议会可操作性与比例公正。",
    parties: [
      {
        id: "spd",
        nameDE: "SPD",
        nameZH: "社民党",
        kurzDE: "SPD",
        kurzZH: "社民",
        spectrumOrder: 2,
        zweitstimmenPercent: 24.0,
        direktmandate: 80,
        colorInk: "#18181b",
        patternId: "pat-solid-ink",
      },
      {
        id: "gruene",
        nameDE: "Bündnis 90/Die Grünen",
        nameZH: "绿党",
        kurzDE: "GRÜNE",
        kurzZH: "绿党",
        spectrumOrder: 3,
        zweitstimmenPercent: 15.0,
        direktmandate: 20,
        colorInk: "#27272a",
        patternId: "pat-stripes-diag",
      },
      {
        id: "cdu-csu",
        nameDE: "CDU/CSU",
        nameZH: "联盟党 (inkl. CSU-Dominanz)",
        kurzDE: "CDU/CSU",
        kurzZH: "联盟",
        spectrumOrder: 5,
        zweitstimmenPercent: 25.0,
        direktmandate: 160, // Hoher Direktüberhang!
        colorInk: "#09090b",
        patternId: "pat-crosshatch",
      },
      {
        id: "fdp",
        nameDE: "FDP",
        nameZH: "自民党",
        kurzDE: "FDP",
        kurzZH: "自民",
        spectrumOrder: 4,
        zweitstimmenPercent: 7.0,
        direktmandate: 0,
        colorInk: "#71717a",
        patternId: "pat-grid-fine",
      },
      {
        id: "afd",
        nameDE: "AfD",
        nameZH: "德国选择党 (AfD)",
        kurzDE: "AfD",
        kurzZH: "选择",
        spectrumOrder: 6,
        zweitstimmenPercent: 16.0,
        direktmandate: 39,
        colorInk: "#52525b",
        patternId: "pat-stripes-vert",
      },
      {
        id: "andere",
        nameDE: "Andere",
        nameZH: "其他政党",
        kurzDE: "ANDERE",
        kurzZH: "其他",
        spectrumOrder: 7,
        zweitstimmenPercent: 13.0,
        direktmandate: 0,
        colorInk: "#a1a1aa",
        patternId: "pat-dots-dense",
      },
    ],
  },
];

// 核心算法：圣拉古/谢佩尔斯除数法 (Sainte-Laguë / Schepers)
export function calculateSainteLague(
  partyVotes: { id: string; votes: number }[],
  totalSeats: number
): Map<string, number> {
  const result = new Map<string, number>();
  if (partyVotes.length === 0 || totalSeats <= 0) return result;

  const totalSum = partyVotes.reduce((sum, p) => sum + p.votes, 0);
  if (totalSum <= 0) return result;

  // 二分查找除数
  let low = 0.0001;
  let high = (totalSum / totalSeats) * 3;
  let divisor = totalSum / totalSeats;

  for (let iter = 0; iter < 90; iter++) {
    divisor = (low + high) / 2;
    let allocated = 0;
    for (const p of partyVotes) {
      allocated += Math.round(p.votes / divisor);
    }
    if (allocated === totalSeats) break;
    if (allocated > totalSeats) {
      low = divisor;
    } else {
      high = divisor;
    }
  }

  // 初步分配
  let currentSum = 0;
  const list: { id: string; seats: number; remainder: number }[] = [];
  for (const p of partyVotes) {
    const raw = p.votes / divisor;
    const rounded = Math.round(raw);
    currentSum += rounded;
    list.push({
      id: p.id,
      seats: rounded,
      remainder: raw - Math.floor(raw),
    });
  }

  // 极少数因除数边界平局造成的席位误差微调
  if (currentSum < totalSeats) {
    const diff = totalSeats - currentSum;
    list.sort((a, b) => b.remainder - a.remainder);
    for (let i = 0; i < diff; i++) {
      list[i % list.length].seats += 1;
    }
  } else if (currentSum > totalSeats) {
    const diff = currentSum - totalSeats;
    list.sort((a, b) => a.remainder - b.remainder);
    for (let i = 0; i < diff; i++) {
      if (list[i % list.length].seats > 0) {
        list[i % list.length].seats -= 1;
      }
    }
  }

  for (const item of list) {
    result.set(item.id, item.seats);
  }
  return result;
}

// 模拟选举计算主函数
export function computeElectionResults(
  parties: PartyData[],
  system: ElectoralSystem,
  applyFivePercentThreshold: boolean = true,
  applyGrundmandatsklausel: boolean = true
): SystemComparisonSummary {
  // 1. 过滤符合门槛的政党
  const evaluatedParties = parties.map((p) => {
    let eligible = true;
    if (applyFivePercentThreshold) {
      const meetsPercent = p.zweitstimmenPercent >= 5.0;
      const meetsGrundmandat = applyGrundmandatsklausel && p.direktmandate >= 3;
      eligible = meetsPercent || meetsGrundmandat;
    }
    return {
      ...p,
      eligible,
    };
  });

  const eligibleParties = evaluatedParties.filter((p) => p.eligible);
  const wastedVotesPercent = evaluatedParties
    .filter((p) => !p.eligible)
    .reduce((sum, p) => sum + p.zweitstimmenPercent, 0);

  const partyVoteInput = eligibleParties.map((p) => ({
    id: p.id,
    votes: p.zweitstimmenPercent,
  }));

  if (system === "reform2023") {
    // === 2023 新选举法模式 (Fix 630 Sitze & Zweitstimmendeckung) ===
    const TOTAL_SEATS_NEW = 630;
    const seatMap = calculateSainteLague(partyVoteInput, TOTAL_SEATS_NEW);

    const allocations: SeatAllocationResult[] = evaluatedParties.map((p) => {
      if (!p.eligible) {
        return {
          partyId: p.id,
          nameDE: p.nameDE,
          nameZH: p.nameZH,
          zweitstimmenPercent: p.zweitstimmenPercent,
          direktmandate: p.direktmandate,
          eligible: false,
          totalSeats: 0,
          seatSharePercent: 0,
          listenmandate: 0,
          ueberhangmandate: 0,
          ausgleichsmandate: 0,
          uncoveredDirektmandate: p.direktmandate,
          coveredDirektmandate: 0,
        };
      }

      const seats = seatMap.get(p.id) || 0;
      const covered = Math.min(p.direktmandate, seats);
      const uncovered = Math.max(0, p.direktmandate - seats);
      const listen = Math.max(0, seats - p.direktmandate);

      return {
        partyId: p.id,
        nameDE: p.nameDE,
        nameZH: p.nameZH,
        zweitstimmenPercent: p.zweitstimmenPercent,
        direktmandate: p.direktmandate,
        eligible: true,
        totalSeats: seats,
        seatSharePercent: (seats / TOTAL_SEATS_NEW) * 100,
        listenmandate: listen,
        ueberhangmandate: 0, // Im neuen Recht gibt es keine Überhangmandate
        ausgleichsmandate: 0,
        uncoveredDirektmandate: uncovered,
        coveredDirektmandate: covered,
      };
    });

    const totalUncovered = allocations.reduce((sum, a) => sum + a.uncoveredDirektmandate, 0);

    return {
      system: "reform2023",
      totalBundestagSeats: TOTAL_SEATS_NEW,
      statutoryBaseSeats: 630,
      inflationSeats: 0,
      totalUncoveredWahlkreise: totalUncovered,
      chancellorMajorityNeeded: Math.floor(TOTAL_SEATS_NEW / 2) + 1,
      wastedVotesPercent,
      allocations,
    };
  } else {
    // === 传统模式 (Vor Reform 2023 - Überhang & Ausgleich) ===
    const BASE_SEATS_OLD = 598;
    const provisionalSeats = calculateSainteLague(partyVoteInput, BASE_SEATS_OLD);

    // 计算初次 Überhang
    let totalUeberhangInitial = 0;
    const minRequiredSeats = new Map<string, number>();

    for (const p of eligibleParties) {
      const prov = provisionalSeats.get(p.id) || 0;
      const ueberhang = Math.max(0, p.direktmandate - prov);
      totalUeberhangInitial += ueberhang;
      minRequiredSeats.set(p.id, Math.max(prov, p.direktmandate));
    }

    let finalSeatsMap = new Map<string, number>();
    let finalTotalSeats = BASE_SEATS_OLD;

    if (totalUeberhangInitial === 0) {
      finalSeatsMap = provisionalSeats;
    } else {
      // 保证所有政党获得至少 minRequiredSeats，并恢复第二票比例 (Ausgleich)
      // 计算使每个政党满足 Mindestsitz 的最紧除数 D
      let minDivisor = Infinity;
      for (const p of eligibleParties) {
        const req = minRequiredSeats.get(p.id) || 1;
        // Sainte-Laguë 边界条件: votes / D >= req - 0.5
        const divForParty = p.zweitstimmenPercent / Math.max(0.5, req - 0.5);
        if (divForParty < minDivisor) {
          minDivisor = divForParty;
        }
      }

      if (minDivisor === Infinity || minDivisor <= 0) {
        minDivisor = 0.05;
      }

      let allocSum = 0;
      for (const p of eligibleParties) {
        const raw = p.zweitstimmenPercent / minDivisor;
        const s = Math.round(raw);
        finalSeatsMap.set(p.id, s);
        allocSum += s;
      }
      finalTotalSeats = allocSum;
    }

    const allocations: SeatAllocationResult[] = evaluatedParties.map((p) => {
      if (!p.eligible) {
        return {
          partyId: p.id,
          nameDE: p.nameDE,
          nameZH: p.nameZH,
          zweitstimmenPercent: p.zweitstimmenPercent,
          direktmandate: p.direktmandate,
          eligible: false,
          totalSeats: 0,
          seatSharePercent: 0,
          listenmandate: 0,
          ueberhangmandate: 0,
          ausgleichsmandate: 0,
          uncoveredDirektmandate: 0,
          coveredDirektmandate: 0,
        };
      }

      const totalSeats = finalSeatsMap.get(p.id) || 0;
      const baseProv = provisionalSeats.get(p.id) || 0;
      const ueberhang = Math.max(0, p.direktmandate - baseProv);
      const ausgleich = Math.max(0, totalSeats - baseProv - ueberhang);
      const listen = Math.max(0, totalSeats - p.direktmandate);

      return {
        partyId: p.id,
        nameDE: p.nameDE,
        nameZH: p.nameZH,
        zweitstimmenPercent: p.zweitstimmenPercent,
        direktmandate: p.direktmandate,
        eligible: true,
        totalSeats,
        seatSharePercent: finalTotalSeats > 0 ? (totalSeats / finalTotalSeats) * 100 : 0,
        listenmandate: listen,
        ueberhangmandate: ueberhang,
        ausgleichsmandate: ausgleich,
        uncoveredDirektmandate: 0, // Im alten Recht zieht jeder Wahlkreisgewinner ein
        coveredDirektmandate: p.direktmandate,
      };
    });

    const inflation = finalTotalSeats - BASE_SEATS_OLD;

    return {
      system: "altesSystem",
      totalBundestagSeats: finalTotalSeats,
      statutoryBaseSeats: 598,
      inflationSeats: Math.max(0, inflation),
      totalUncoveredWahlkreise: 0,
      chancellorMajorityNeeded: Math.floor(finalTotalSeats / 2) + 1,
      wastedVotesPercent,
      allocations,
    };
  }
}

// 布局生成：纯数学极坐标计算德意志联邦议院半圆形阶梯排座
export function generateHemicycleSeats(
  allocations: SeatAllocationResult[],
  partiesData: PartyData[],
  totalSeats: number
): PlenarySeatDot[] {
  if (totalSeats <= 0) return [];

  // 按左-右政治光谱排序并映射席位
  const sortedParties = [...partiesData].sort((a, b) => a.spectrumOrder - b.spectrumOrder);
  const partySeatBlocks: { partyId: string; count: number }[] = [];

  for (const p of sortedParties) {
    const alloc = allocations.find((a) => a.partyId === p.id);
    const count = alloc ? alloc.totalSeats : 0;
    if (count > 0) {
      partySeatBlocks.push({ partyId: p.id, count });
    }
  }

  // 展开所有席位为顺序政党标签
  const seatPartySequence: string[] = [];
  for (const b of partySeatBlocks) {
    for (let i = 0; i < b.count; i++) {
      seatPartySequence.push(b.partyId);
    }
  }

  // 阶梯同心圆弧参数
  const cx = 460;
  const cy = 460;
  const numRows = 13;
  const rMin = 155;
  const rMax = 410;

  // 各排半径与周长加权计算
  const rowRadii: number[] = [];
  for (let r = 0; r < numRows; r++) {
    rowRadii.push(rMin + (r / (numRows - 1)) * (rMax - rMin));
  }

  const sumRadii = rowRadii.reduce((acc, val) => acc + val, 0);
  const seatsPerRow: number[] = rowRadii.map((rad) => Math.round((rad / sumRadii) * totalSeats));

  // 补齐取整误差
  let curSum = seatsPerRow.reduce((acc, val) => acc + val, 0);
  while (curSum < totalSeats) {
    seatsPerRow[numRows - 1] += 1;
    curSum++;
  }
  while (curSum > totalSeats) {
    seatsPerRow[numRows - 1] -= 1;
    curSum--;
  }

  // 计算每排坐标并按角度从左（176°）到右（4°）排序
  interface RawSeat {
    row: number;
    col: number;
    angleDeg: number;
    x: number;
    y: number;
  }
  const rawSeats: RawSeat[] = [];

  for (let r = 0; r < numRows; r++) {
    const count = seatsPerRow[r];
    const radius = rowRadii[r];
    const angleStart = 176;
    const angleEnd = 4;
    const step = count > 1 ? (angleStart - angleEnd) / (count - 1) : 0;

    for (let c = 0; c < count; c++) {
      const angleDeg = count > 1 ? angleStart - c * step : 90;
      const angleRad = (angleDeg * Math.PI) / 180;
      const x = cx + radius * Math.cos(angleRad);
      const y = cy - radius * Math.sin(angleRad);
      rawSeats.push({
        row: r,
        col: c,
        angleDeg,
        x,
        y,
      });
    }
  }

  // 严格按角度自左至右（从 180° 到 0°）排序，确保每个党派席位紧凑聚合在各自扇形区
  rawSeats.sort((a, b) => b.angleDeg - a.angleDeg);

  return rawSeats.map((raw, idx) => ({
    index: idx,
    partyId: seatPartySequence[idx] || "unassigned",
    row: raw.row,
    col: raw.col,
    angleDeg: raw.angleDeg,
    x: raw.x,
    y: raw.y,
  }));
}

export function WahlsystemSim({
  lang = "de",
  studioMode = false,
  onExportFinding,
}: WahlsystemSimProps) {
  const isDe = lang === "de";

  // 当前激活场景
  const [activePresetId, setActivePresetId] = useState<string>("btw2021-real");
  const [currentScenario, setCurrentScenario] = useState<ScenarioPreset>(PRESET_SCENARIOS[0]);

  // 选举制度模式
  const [systemMode, setSystemMode] = useState<ElectoralSystem>("altesSystem");

  // 5% 门槛与 Grundmandatsklausel 开关
  const [apply5Percent, setApply5Percent] = useState<boolean>(true);
  const [applyGrundmandat, setApplyGrundmandat] = useState<boolean>(true);

  // 交互选中的政党
  const [selectedPartyId, setSelectedPartyId] = useState<string | null>("spd");
  const [hoveredPartyId, setHoveredPartyId] = useState<string | null>(null);

  // 执政联盟模拟器：用户选取的执政搭档政党 ID 集合
  const [coalitionPartners, setCoalitionPartners] = useState<Set<string>>(
    new Set(["spd", "gruene", "fdp"]) // 2021 Ampel-Koalition
  );

  // 折叠状态：AFB III 会考设问与评分标准
  const [isAfbExpanded, setIsAfbExpanded] = useState<boolean>(true);

  // 切换场景
  const handleSelectPreset = (preset: ScenarioPreset) => {
    setActivePresetId(preset.id);
    setCurrentScenario(preset);
    setSystemMode(preset.system);
    // 重置默认选区与联盟推荐
    if (preset.id === "btw2021-real") {
      setCoalitionPartners(new Set(["spd", "gruene", "fdp"]));
    } else if (preset.id === "btw2025-sim") {
      setCoalitionPartners(new Set(["cdu-csu", "spd"]));
    }
  };

  // 实时运算选举结果
  const resultSummary = useMemo(() => {
    return computeElectionResults(
      currentScenario.parties,
      systemMode,
      apply5Percent,
      applyGrundmandat
    );
  }, [currentScenario.parties, systemMode, apply5Percent, applyGrundmandat]);

  // 对比参考结果（另一选举法下测算）
  const comparisonSummary = useMemo(() => {
    const otherSystem: ElectoralSystem =
      systemMode === "altesSystem" ? "reform2023" : "altesSystem";
    return computeElectionResults(
      currentScenario.parties,
      otherSystem,
      apply5Percent,
      applyGrundmandat
    );
  }, [currentScenario.parties, systemMode, apply5Percent, applyGrundmandat]);

  // 生成半圆形全景座席散点
  const hemicycleSeats = useMemo(() => {
    return generateHemicycleSeats(
      resultSummary.allocations,
      currentScenario.parties,
      resultSummary.totalBundestagSeats
    );
  }, [resultSummary.allocations, currentScenario.parties, resultSummary.totalBundestagSeats]);

  // 执政联盟计算
  const coalitionStats = useMemo(() => {
    let seats = 0;
    let votes = 0;
    for (const alloc of resultSummary.allocations) {
      if (coalitionPartners.has(alloc.partyId)) {
        seats += alloc.totalSeats;
        votes += alloc.zweitstimmenPercent;
      }
    }
    const hasMajority = seats >= resultSummary.chancellorMajorityNeeded;
    return {
      seats,
      votes: Number(votes.toFixed(1)),
      hasMajority,
      margin: seats - resultSummary.chancellorMajorityNeeded,
    };
  }, [resultSummary.allocations, coalitionPartners, resultSummary.chancellorMajorityNeeded]);

  // 切换政党进入联盟
  const toggleCoalitionPartner = (partyId: string) => {
    setCoalitionPartners((prev) => {
      const next = new Set(prev);
      if (next.has(partyId)) {
        next.delete(partyId);
      } else {
        next.add(partyId);
      }
      return next;
    });
  };

  // 导出研习 Befund
  const handleExportText = () => {
    const text = isDe
      ? `[Wahlrechts-Analyse: ${currentScenario.titleDE}]
Wahlsystem: ${systemMode === "reform2023" ? "BWG-Reform 2023/24 (Fix 630 Sitze)" : "Altes System (Überhang- & Ausgleich)"}
Gesamtsitze: ${resultSummary.totalBundestagSeats} (Kanzlermehrheit: ${resultSummary.chancellorMajorityNeeded})
Aufblähung / Ausgleichssitze: ${resultSummary.inflationSeats}
Verwaiste Wahlkreise (Zweitstimmendeckung): ${resultSummary.totalUncoveredWahlkreise}
Parteienverteilung:
${resultSummary.allocations
  .filter((a) => a.eligible)
  .map(
    (a) =>
      `• ${a.nameDE}: ${a.totalSeats} Sitze (${a.seatSharePercent.toFixed(1)}%), Direkt: ${a.direktmandate} (gedeckt: ${a.coveredDirektmandate}, ungedeckt: ${a.uncoveredDirektmandate})`
  )
  .join("\n")}
AFB III Urteilssynthese: Im Spannungsfeld zwischen Bürgernähe (Wahlkreisgewinner) und Parlamentsfunktionsfähigkeit (Vermeidung von 730+ Sitzen) gewährleistet die Reform 2023 strikte Erfolgswertgleichheit gemäß Art. 38 Abs. 1 GG auf Kosten von Einbußen bei der lokalen Direktmandatsgarantie.`
      : `[德国选举制度研习报告：${currentScenario.titleZH}]
运行模式：${systemMode === "reform2023" ? "2023/2024年新选举法（严格固定630席，第二票配额覆盖）" : "传统双票制（产生悬峙与追加平衡议席）"}
联邦议院总席位：${resultSummary.totalBundestagSeats}席（法定总理多数门槛：${resultSummary.chancellorMajorityNeeded}席）
膨胀追加席位：+${resultSummary.inflationSeats}席
未获覆盖选区（第一名落选）：${resultSummary.totalUncoveredWahlkreise}个
各政党议席分配详情：
${resultSummary.allocations
  .filter((a) => a.eligible)
  .map(
    (a) =>
      `• ${a.nameZH} (${a.nameDE})：${a.totalSeats}席 (${a.seatSharePercent.toFixed(1)}%)，赢得选区：${a.direktmandate}个（有效就任：${a.coveredDirektmandate}，未覆盖失效：${a.uncoveredDirektmandate}）`
  )
  .join("\n")}
会考AFB III评判结论：在选区民意代议制（直选代表性）与国会运作效能/财政承载力之间，2023年新选举法以牺牲部分选区直选必就任保障为代价，彻底贯彻了《基本法》第38条第1款的投票效力平等原则。`;

    if (onExportFinding) {
      onExportFinding(text);
    } else {
      navigator.clipboard?.writeText(text);
    }
  };

  const activeFocusParty =
    resultSummary.allocations.find(
      (a) => a.partyId === (hoveredPartyId || selectedPartyId)
    ) || resultSummary.allocations[0];

  return (
    <div
      className={`w-full bg-[var(--surface)] text-[var(--ink)] font-sans border border-[var(--line)] rounded-sm p-4 md:p-6 space-y-6 ${
        studioMode ? "max-w-none" : ""
      }`}
    >
      {/* 1. Header & Tufte Metadata Strip */}
      <div className="border-b border-[var(--line)] pb-4 flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] tracking-wider uppercase px-1.5 py-0.5 border border-[var(--ink)] text-[var(--ink)] font-mono font-medium">
              SoWi EF/Q1 · Art. 38 GG · BWG 2023
            </span>
            <span className="text-[10px] font-mono text-[var(--gray)]">
              {isDe ? "Pädagogischer Simulator" : "文科高阶交互教具"}
            </span>
          </div>
          <h2 className="text-xl md:text-2xl font-serif font-bold tracking-tight text-[var(--ink)] mt-1">
            {isDe
              ? "Bundestagswahl & Sitzverteilung (BWG-Reform Simulator)"
              : "德国联邦议院选举与议席分配沙盘 (Wahlsystem-Sim)"}
          </h2>
          <p className="text-xs text-[var(--gray)] mt-0.5 max-w-3xl leading-relaxed">
            {isDe
              ? "Mathematisch exakte Simulation des personalisierten Verhältniswahlrechts: Sainte-Laguë/Schepers-Verfahren, 5%-Sperrklausel, Grundmandatsklausel sowie Reform-Vergleich zwischen Überhangmandaten und Zweitstimmendeckung."
              : "基于北威州 SoWi 考纲与《联邦选举法》（BWG 2023最新改革）系统建模：圣拉古除数法、5%门槛、基本议席条款，以及传统悬峙膨胀与新法第二票配额覆盖之深度对比。"}
          </p>
        </div>

        {/* 顶部操作区 */}
        <div className="flex items-center gap-2 self-start md:self-auto shrink-0">
          <button
            type="button"
            onClick={handleExportText}
            className="px-3 py-1.5 text-xs font-mono font-medium border border-[var(--line)] hover:border-[var(--ink)] bg-[var(--paper)] text-[var(--ink)] transition-colors flex items-center gap-1.5 cursor-pointer"
            title={isDe ? "Befund in Zwischenablage kopieren" : "导出/复制研习结论"}
          >
            <svg
              className="w-3.5 h-3.5 text-[var(--ink)]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
              />
            </svg>
            <span>{isDe ? "Befund exportieren" : "导出分析简报"}</span>
          </button>
        </div>
      </div>

      {/* 2. 场景预设快捷卡片 (Preset Scenarios) */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs text-[var(--gray)] font-mono">
          <span>{isDe ? "FACHLICHE SZENARIEN-VORGABEN" : "考点真实案例预设"}</span>
          <span>{isDe ? "3 Presets verfügbar" : "共 3 组考纲预设"}</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          {PRESET_SCENARIOS.map((preset) => {
            const isSelected = preset.id === activePresetId;
            return (
              <button
                key={preset.id}
                type="button"
                onClick={() => handleSelectPreset(preset)}
                className={`text-left p-3 border transition-colors cursor-pointer ${
                  isSelected
                    ? "border-[var(--ink)] bg-[var(--paper-subtle)]"
                    : "border-[var(--line)] bg-[var(--surface)] hover:border-[var(--gray)]"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono text-[var(--gray)]">
                    {preset.id === "btw2021-real"
                      ? "2021 REAL"
                      : preset.id === "btw2025-sim"
                      ? "2025 PROGNOSE"
                      : "EXTREMFALL"}
                  </span>
                  {isSelected && (
                    <span className="text-[9px] uppercase px-1 border border-[var(--ink)] font-mono font-bold">
                      {isDe ? "AKTIV" : "当前"}
                    </span>
                  )}
                </div>
                <div className="text-xs font-serif font-bold text-[var(--ink)] mt-1 line-clamp-1">
                  {isDe ? preset.titleDE : preset.titleZH}
                </div>
                <div className="text-[11px] text-[var(--gray)] mt-0.5 line-clamp-2">
                  {isDe ? preset.subtitleDE : preset.subtitleZH}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. 选举制度切换与关键制度参数控制台 (System Mode & Rules) */}
      <div className="bg-[var(--paper)] border border-[var(--line)] p-4 space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* 模式选择按钮组 */}
          <div className="space-y-1">
            <div className="text-[11px] font-mono text-[var(--gray)] uppercase tracking-wider">
              {isDe ? "WAHLRECHTS-REGELUNG (BWG)" : "联邦选举法适用版本对比"}
            </div>
            <div className="inline-flex border border-[var(--line)] p-0.5 bg-[var(--surface)] rounded-xs">
              <button
                type="button"
                onClick={() => setSystemMode("reform2023")}
                className={`px-3 py-1.5 text-xs font-medium transition-colors cursor-pointer ${
                  systemMode === "reform2023"
                    ? "bg-[var(--ink)] text-white"
                    : "text-[var(--ink)] hover:bg-[var(--paper-subtle)]"
                }`}
              >
                {isDe
                  ? "Reform 2023/2024 (Fix 630 Sitze · Zweitstimmendeckung)"
                  : "2023新选举法（严格固定630席 · 第二票配额覆盖）"}
              </button>
              <button
                type="button"
                onClick={() => setSystemMode("altesSystem")}
                className={`px-3 py-1.5 text-xs font-medium transition-colors cursor-pointer ${
                  systemMode === "altesSystem"
                    ? "bg-[var(--ink)] text-white"
                    : "text-[var(--ink)] hover:bg-[var(--paper-subtle)]"
                }`}
              >
                {isDe
                  ? "Altes System bis 2021 (Überhang- & Ausgleichsmandate)"
                  : "传统双票制（产生悬峙与全额平衡追加）"}
              </button>
            </div>
          </div>

          {/* 门槛制度开关 */}
          <div className="flex flex-wrap items-center gap-4 text-xs font-mono">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={apply5Percent}
                onChange={(e) => setApply5Percent(e.target.checked)}
                className="w-4 h-4 accent-[var(--ink)] cursor-pointer"
              />
              <span className="text-[var(--ink)]">
                {isDe ? "5%-Sperrklausel aktivieren" : "启用5%全国得票门槛 (5%-Hürde)"}
              </span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={applyGrundmandat}
                onChange={(e) => setApplyGrundmandat(e.target.checked)}
                className="w-4 h-4 accent-[var(--ink)] cursor-pointer"
              />
              <span className="text-[var(--ink)]">
                {isDe
                  ? "Grundmandatsklausel (≥3 Wahlkreise, BVerfG 2024)"
                  : "基本议席豁免条款 (≥3个直选席位, 宪法法院2024裁定)"}
              </span>
            </label>
          </div>
        </div>

        {/* 关键差异警示摘要栏 */}
        <div className="border-t border-[var(--line)] pt-3 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="p-2 bg-[var(--surface)] border border-[var(--line)]">
            <div className="text-[10px] font-mono text-[var(--gray)]">
              {isDe ? "GESAMTSITZE IM PARLAMENT" : "联邦议院总席位"}
            </div>
            <div className="text-lg font-serif font-bold text-[var(--ink)] mt-0.5">
              {resultSummary.totalBundestagSeats}{" "}
              <span className="text-xs font-sans font-normal text-[var(--gray)]">
                {systemMode === "reform2023" ? "/ 630" : "(598 Basis)"}
              </span>
            </div>
            <div className="text-[10px] text-[var(--gray)] mt-0.5 font-mono">
              {isDe
                ? `Alt.-System: ${comparisonSummary.totalBundestagSeats} Sitze`
                : `对比例: ${comparisonSummary.totalBundestagSeats} 席`}
            </div>
          </div>

          <div className="p-2 bg-[var(--surface)] border border-[var(--line)]">
            <div className="text-[10px] font-mono text-[var(--gray)]">
              {systemMode === "reform2023"
                ? isDe
                  ? "VERWAISTE WAHLKREISE"
                  : "未获覆盖直选区（落选）"
                : isDe
                ? "AUFBLÄHUNG (ÜBERHANG/AUSGLEICH)"
                : "膨胀席位 (悬峙+平衡追加)"}
            </div>
            <div className="text-lg font-serif font-bold text-[var(--ink)] mt-0.5">
              {systemMode === "reform2023"
                ? `${resultSummary.totalUncoveredWahlkreise} ${isDe ? "Wahlkreise" : "个选区"}`
                : `+${resultSummary.inflationSeats} ${isDe ? "Sitze" : "席"}`}
            </div>
          </div>

          <div className="p-2 bg-[var(--surface)] border border-[var(--line)]">
            <div className="text-[10px] font-mono text-[var(--gray)]">
              {isDe ? "KANZLERMEHRHEIT (50% + 1)" : "法定总理过半多数门槛"}
            </div>
            <div className="text-lg font-serif font-bold text-[var(--ink)] mt-0.5">
              {resultSummary.chancellorMajorityNeeded}{" "}
              <span className="text-xs font-sans font-normal text-[var(--gray)]">
                {isDe ? "Stimmen nötig" : "票方可组阁"}
              </span>
            </div>
          </div>

          <div className="p-2 bg-[var(--surface)] border border-[var(--line)]">
            <div className="text-[10px] font-mono text-[var(--gray)]">
              {isDe ? "VERLORENE STIMMEN (<5%)" : "损失无效选票 (<5%政党)"}
            </div>
            <div className="text-lg font-serif font-bold text-[var(--ink)] mt-0.5">
              {resultSummary.wastedVotesPercent.toFixed(1)}%{" "}
              <span className="text-xs font-sans font-normal text-[var(--gray)]">
                {isDe ? "Zweitstimmen" : "第二票"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Tufte 纯黑白纯 SVG 半圆形议会席位全景图 (Plenarsaal Hemicycle) */}
      <div className="border border-[var(--line)] bg-[var(--surface)] p-4 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs pb-2 border-b border-[var(--line)] gap-2">
          <div className="flex items-center gap-2">
            <span className="font-serif font-bold text-[var(--ink)]">
              {isDe
                ? "Plenarsaal des Deutschen Bundestages (Reichstagsgebäude)"
                : "德国联邦议院全景阶梯半圆座席图 (Plenarsaal Hemicycle)"}
            </span>
            <span className="font-mono text-[10px] text-[var(--gray)]">
              [{resultSummary.totalBundestagSeats} Sitze]
            </span>
          </div>
          <div className="flex items-center gap-3 text-[11px] font-mono text-[var(--gray)]">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-0.5 border-t border-dashed border-[var(--ink)]"></span>
              {isDe
                ? `Kanzlermehrheit (${resultSummary.chancellorMajorityNeeded})`
                : `过半多数线 (${resultSummary.chancellorMajorityNeeded}席)`}
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-[var(--ink)]"></span>
              {isDe ? "Abgeordnetensitz" : "国会议员席位"}
            </span>
          </div>
        </div>

        {/* SVG 半圆形画布 */}
        <div className="w-full flex justify-center overflow-x-auto py-2">
          <svg
            viewBox="0 0 920 500"
            className="w-full max-w-4xl h-auto select-none"
            style={{ minWidth: "600px" }}
          >
            <defs>
              {/* Tufte 黑白学术质感网底与阴影线纹样 (Pure Grayscale Hatching Patterns) */}
              <pattern
                id="pat-dots-sparse"
                width="8"
                height="8"
                patternUnits="userSpaceOnUse"
              >
                <circle cx="4" cy="4" r="1.5" fill="#3f3f46" />
              </pattern>
              <pattern
                id="pat-dots-dense"
                width="6"
                height="6"
                patternUnits="userSpaceOnUse"
              >
                <circle cx="3" cy="3" r="1.8" fill="#52525b" />
              </pattern>
              <pattern
                id="pat-stripes-diag"
                width="6"
                height="6"
                patternTransform="rotate(45 0 0)"
                patternUnits="userSpaceOnUse"
              >
                <line x1="0" y1="0" x2="0" y2="6" stroke="#27272a" strokeWidth="2" />
              </pattern>
              <pattern
                id="pat-stripes-vert"
                width="6"
                height="6"
                patternUnits="userSpaceOnUse"
              >
                <line x1="0" y1="0" x2="0" y2="6" stroke="#71717a" strokeWidth="2" />
              </pattern>
              <pattern
                id="pat-crosshatch"
                width="8"
                height="8"
                patternUnits="userSpaceOnUse"
              >
                <path d="M 0 0 L 8 8 M 8 0 L 0 8" stroke="#09090b" strokeWidth="1.5" />
              </pattern>
              <pattern
                id="pat-grid-fine"
                width="5"
                height="5"
                patternUnits="userSpaceOnUse"
              >
                <path d="M 5 0 L 0 0 0 5" fill="none" stroke="#a1a1aa" strokeWidth="1" />
              </pattern>
            </defs>

            {/* 半圆外轮廓与同心弧度参考线 */}
            <circle
              cx="460"
              cy="460"
              r="420"
              fill="none"
              stroke="var(--line)"
              strokeWidth="1"
            />
            <circle
              cx="460"
              cy="460"
              r="280"
              fill="none"
              stroke="var(--line)"
              strokeWidth="0.8"
              strokeDasharray="4 4"
            />
            <circle
              cx="460"
              cy="460"
              r="140"
              fill="none"
              stroke="var(--line)"
              strokeWidth="1"
            />

            {/* 中轴法定过半绝对多数线 (Kanzlermehrheit Line: 90 Grad) */}
            <line
              x1="460"
              y1="460"
              x2="460"
              y2="30"
              stroke="var(--ink)"
              strokeWidth="1.5"
              strokeDasharray="5 4"
            />
            <text
              x="465"
              y="25"
              fill="var(--ink)"
              fontSize="10"
              fontFamily="monospace"
              fontWeight="bold"
            >
              50% + 1 ({resultSummary.chancellorMajorityNeeded} Sitze)
            </text>

            {/* 讲台与议长主席台 (Präsidium & Rednerpult) */}
            <path
              d="M 410 460 A 50 50 0 0 1 510 460 Z"
              fill="var(--paper-subtle)"
              stroke="var(--ink)"
              strokeWidth="1.5"
            />
            <rect
              x="440"
              y="420"
              width="40"
              height="20"
              fill="var(--surface)"
              stroke="var(--ink)"
              strokeWidth="1.2"
            />
            <text
              x="460"
              y="434"
              textAnchor="middle"
              fill="var(--ink)"
              fontSize="9"
              fontFamily="monospace"
              fontWeight="bold"
            >
              Pult
            </text>
            <text
              x="460"
              y="455"
              textAnchor="middle"
              fill="var(--gray)"
              fontSize="8"
              fontFamily="monospace"
            >
              Präsidium
            </text>

            {/* 渲染数百个席位圆点 (Hemicycle Seat Dots) */}
            {hemicycleSeats.map((seat) => {
              const party = currentScenario.parties.find((p) => p.id === seat.partyId);
              const isSelected = selectedPartyId === seat.partyId;
              const isHovered = hoveredPartyId === seat.partyId;
              const isHighlighted = isSelected || isHovered;

              // 基础色彩映射
              const dotFill = party ? party.colorInk : "#71717a";

              return (
                <circle
                  key={`seat-${seat.index}`}
                  cx={seat.x}
                  cy={seat.y}
                  r={isHighlighted ? 4.6 : 3.4}
                  fill={dotFill}
                  stroke={isHighlighted ? "var(--ink)" : "var(--surface)"}
                  strokeWidth={isHighlighted ? 1.5 : 0.8}
                  className="transition-all duration-100 cursor-pointer"
                  style={{
                    transformOrigin: `${seat.x}px ${seat.y}px`,
                    transformBox: "view-box",
                  }}
                  onMouseEnter={() => setHoveredPartyId(seat.partyId)}
                  onMouseLeave={() => setHoveredPartyId(null)}
                  onClick={() => setSelectedPartyId(seat.partyId)}
                >
                  <title>
                    {party
                      ? `${party.nameDE} (Sitz ${seat.index + 1})`
                      : `Sitz ${seat.index + 1}`}
                  </title>
                </circle>
              );
            })}

            {/* 底部左中右光谱指示标签 */}
            <text
              x="60"
              y="485"
              fill="var(--gray)"
              fontSize="10"
              fontFamily="monospace"
            >
              ← Links (LINKE / BSW / SPD)
            </text>
            <text
              x="860"
              y="485"
              textAnchor="end"
              fill="var(--gray)"
              fontSize="10"
              fontFamily="monospace"
            >
              Rechts (CDU/CSU / AfD) →
            </text>
          </svg>
        </div>

        {/* 席位图底部图例 (Legend Strip) */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2 border-t border-[var(--line)]">
          {currentScenario.parties.map((party) => {
            const alloc = resultSummary.allocations.find((a) => a.partyId === party.id);
            const seats = alloc ? alloc.totalSeats : 0;
            const isSelected = selectedPartyId === party.id;
            const isHovered = hoveredPartyId === party.id;

            return (
              <button
                key={party.id}
                type="button"
                onClick={() => setSelectedPartyId(party.id)}
                onMouseEnter={() => setHoveredPartyId(party.id)}
                onMouseLeave={() => setHoveredPartyId(null)}
                className={`flex items-center gap-1.5 px-2 py-1 text-xs font-mono border transition-colors cursor-pointer ${
                  isSelected || isHovered
                    ? "border-[var(--ink)] bg-[var(--paper-subtle)] font-bold text-[var(--ink)]"
                    : "border-[var(--line)] text-[var(--gray)] hover:border-[var(--gray)]"
                }`}
              >
                <span
                  className="w-2.5 h-2.5 rounded-full inline-block shrink-0"
                  style={{ backgroundColor: party.colorInk }}
                />
                <span>{isDe ? party.kurzDE : party.kurzZH}</span>
                <span className="text-[10px] text-[var(--ink)] font-bold">
                  ({seats})
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 5. 焦点政党深透剖析面板 & 执政联盟模拟计算器 (Dual Workbench) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 左侧：政党双票微观解析 (Focus Party Analysis) */}
        <div className="border border-[var(--line)] p-4 bg-[var(--surface)] space-y-4">
          <div className="flex items-center justify-between border-b border-[var(--line)] pb-2">
            <div className="flex items-center gap-2">
              <span
                className="w-3 h-3 rounded-full"
                style={{
                  backgroundColor:
                    currentScenario.parties.find(
                      (p) => p.id === activeFocusParty.partyId
                    )?.colorInk || "#000",
                }}
              />
              <h3 className="text-sm font-serif font-bold text-[var(--ink)]">
                {isDe ? activeFocusParty.nameDE : activeFocusParty.nameZH}
              </h3>
            </div>
            <span className="text-xs font-mono text-[var(--gray)]">
              {activeFocusParty.eligible
                ? isDe
                  ? "Im Bundestag vertreten"
                  : "成功进入联邦议院"
                : isDe
                ? "An 5%-Hürde gescheitert"
                : "未达到法定门槛"}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-2.5 bg-[var(--paper)] border border-[var(--line)] space-y-1">
              <div className="text-[10px] font-mono text-[var(--gray)]">
                {isDe ? "ZWEITSTIMMEN (PROPORZ)" : "第二票得票率（决定性比例）"}
              </div>
              <div className="text-base font-serif font-bold text-[var(--ink)]">
                {activeFocusParty.zweitstimmenPercent.toFixed(1)}%
              </div>
              <div className="text-[10px] text-[var(--gray)]">
                {isDe
                  ? "Entspricht dem proportionellen Sitzanspruch"
                  : "决定政党在国会的合法总席位份额"}
              </div>
            </div>

            <div className="p-2.5 bg-[var(--paper)] border border-[var(--line)] space-y-1">
              <div className="text-[10px] font-mono text-[var(--gray)]">
                {isDe ? "ERSTSTIMMEN (DIREKTMANDATE)" : "第一票直选席位（选区第一名）"}
              </div>
              <div className="text-base font-serif font-bold text-[var(--ink)]">
                {activeFocusParty.direktmandate}{" "}
                <span className="text-xs font-normal text-[var(--gray)]">
                  / 299 Wahlkreise
                </span>
              </div>
              <div className="text-[10px] text-[var(--gray)]">
                {isDe
                  ? "Personenwahl im relativen Mehrheitssystem"
                  : "相对多数制下直接当选的本地候选人"}
              </div>
            </div>
          </div>

          {/* 席位结构切分 (Listen vs Direkt vs Überhang vs Verfall) */}
          <div className="border border-[var(--line)] p-3 bg-[var(--paper-subtle)] space-y-2 text-xs">
            <div className="font-mono text-[11px] font-bold text-[var(--ink)] flex items-center justify-between">
              <span>{isDe ? "MANDATSSTRUKTUR IM SYSTEM" : "议席构成深度剖析"}</span>
              <span>
                {activeFocusParty.totalSeats} {isDe ? "Sitze gesamt" : "总席位"} (
                {activeFocusParty.seatSharePercent.toFixed(1)}%)
              </span>
            </div>

            <div className="space-y-1.5 text-[11px]">
              <div className="flex justify-between py-1 border-b border-[var(--line)]">
                <span className="text-[var(--gray)]">
                  {isDe ? "Gedeckte Direktmandate:" : "有效就任选区直选席位:"}
                </span>
                <span className="font-mono font-medium text-[var(--ink)]">
                  {activeFocusParty.coveredDirektmandate}
                </span>
              </div>

              <div className="flex justify-between py-1 border-b border-[var(--line)]">
                <span className="text-[var(--gray)]">
                  {isDe ? "Listenmandate (aus Landeslisten):" : "政党州名单递补席位 (Listensitz):"}
                </span>
                <span className="font-mono font-medium text-[var(--ink)]">
                  {activeFocusParty.listenmandate}
                </span>
              </div>

              {systemMode === "reform2023" ? (
                <div className="flex justify-between py-1 border-b border-[var(--line)]">
                  <span className="text-[var(--ink)] font-medium">
                    {isDe
                      ? "Nicht gedeckte Wahlkreise (Zweitstimmendeckung):"
                      : "无配额覆盖之落选直选候选人:"}
                  </span>
                  <span className="font-mono font-bold text-[var(--ink)]">
                    {activeFocusParty.uncoveredDirektmandate > 0
                      ? `${activeFocusParty.uncoveredDirektmandate} (verfallen)`
                      : "0"}
                  </span>
                </div>
              ) : (
                <>
                  <div className="flex justify-between py-1 border-b border-[var(--line)]">
                    <span className="text-[var(--ink)] font-medium">
                      {isDe ? "Überhangmandate:" : "悬峙议席 (Überhang):"}
                    </span>
                    <span className="font-mono font-bold text-[var(--ink)]">
                      +{activeFocusParty.ueberhangmandate}
                    </span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-[var(--line)]">
                    <span className="text-[var(--gray)]">
                      {isDe ? "Ausgleichsmandate:" : "平衡追加议席 (Ausgleich):"}
                    </span>
                    <span className="font-mono font-medium text-[var(--ink)]">
                      +{activeFocusParty.ausgleichsmandate}
                    </span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* 右侧：执政联盟模拟器 (Koalitions-Rechner) */}
        <div className="border border-[var(--line)] p-4 bg-[var(--surface)] space-y-4">
          <div className="flex items-center justify-between border-b border-[var(--line)] pb-2">
            <h3 className="text-sm font-serif font-bold text-[var(--ink)]">
              {isDe
                ? "Regierungsbildungs-Rechner (Koalitions-Prüfung)"
                : "执政联盟组阁可行性测算台 (Koalitions-Rechner)"}
            </h3>
            <span className="text-xs font-mono text-[var(--gray)]">
              {isDe ? "Art. 63 GG (Kanzlerwahl)" : "《基本法》第63条"}
            </span>
          </div>

          <p className="text-xs text-[var(--gray)]">
            {isDe
              ? "Wählen Sie Parteien aus, um zu prüfen, ob ein Bündnis die Kanzlermehrheit (absolute Mehrheit aller Abgeordneten) erreicht."
              : "勾选拟组阁政党，测算其席位总和是否能够跨越绝对多数门槛（Kanzlermehrheit），成功选出联邦总理。"}
          </p>

          {/* 候选联盟伙伴选择开关 */}
          <div className="flex flex-wrap gap-2">
            {resultSummary.allocations
              .filter((a) => a.eligible)
              .map((alloc) => {
                const isChecked = coalitionPartners.has(alloc.partyId);
                const party = currentScenario.parties.find((p) => p.id === alloc.partyId);

                return (
                  <button
                    key={alloc.partyId}
                    type="button"
                    onClick={() => toggleCoalitionPartner(alloc.partyId)}
                    className={`px-2.5 py-1.5 text-xs font-mono border transition-colors cursor-pointer flex items-center gap-1.5 ${
                      isChecked
                        ? "border-[var(--ink)] bg-[var(--ink)] text-white"
                        : "border-[var(--line)] bg-[var(--paper)] text-[var(--ink)] hover:border-[var(--gray)]"
                    }`}
                  >
                    <span
                      className={`w-2 h-2 rounded-full ${
                        isChecked ? "bg-white" : ""
                      }`}
                      style={{
                        backgroundColor: isChecked ? "#fff" : party?.colorInk,
                      }}
                    />
                    <span>{isDe ? party?.kurzDE : party?.kurzZH}</span>
                    <span className="text-[10px] opacity-80">({alloc.totalSeats})</span>
                  </button>
                );
              })}
          </div>

          {/* 联盟总计与过半判定卡片 */}
          <div
            className={`p-3 border text-xs space-y-2 ${
              coalitionStats.hasMajority
                ? "border-[var(--ink)] bg-[var(--paper-subtle)]"
                : "border-[var(--line)] bg-[var(--paper)]"
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-serif font-bold text-sm text-[var(--ink)]">
                {isDe ? "Koalitions-Status:" : "执政联盟测算结果:"}
              </span>
              <span
                className={`font-mono text-xs px-2 py-0.5 border ${
                  coalitionStats.hasMajority
                    ? "border-[var(--ink)] bg-[var(--ink)] text-white font-bold"
                    : "border-[var(--line)] text-[var(--gray)] bg-[var(--surface)]"
                }`}
              >
                {coalitionStats.hasMajority
                  ? isDe
                    ? "MEHRHEIT GESICHERT"
                    : "多数已达成（可执政）"
                  : isDe
                  ? "KEINE MEHRHEIT"
                  : "未达半数（无法组阁）"}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
              <div>
                <span className="text-[var(--gray)]">
                  {isDe ? "Sitze gesamt:" : "联盟总席位:"}
                </span>{" "}
                <strong className="text-[var(--ink)]">
                  {coalitionStats.seats} / {resultSummary.totalBundestagSeats}
                </strong>
              </div>
              <div>
                <span className="text-[var(--gray)]">
                  {isDe ? "Zweitstimmen:" : "第二票总比例:"}
                </span>{" "}
                <strong className="text-[var(--ink)]">{coalitionStats.votes}%</strong>
              </div>
            </div>

            <div className="text-[11px] text-[var(--gray)] pt-1 border-t border-[var(--line)]">
              {coalitionStats.hasMajority
                ? isDe
                  ? `Übertrifft die Kanzlermehrheit (${resultSummary.chancellorMajorityNeeded} Sitze) um +${coalitionStats.margin} Mandate.`
                  : `超越法定总理多数门槛（${resultSummary.chancellorMajorityNeeded}席）共 +${coalitionStats.margin} 席。`
                : isDe
                ? `Es fehlen ${Math.abs(coalitionStats.margin)} Sitze zur stabilen Regierungsmehrheit.`
                : `距离组阁过半尚差 ${Math.abs(coalitionStats.margin)} 个席位。`}
            </div>
          </div>
        </div>
      </div>

      {/* 6. AFB III 会考深度剖析与评分标准折叠台 (Exam & Evaluation Matrix) */}
      <div className="border border-[var(--line)] bg-[var(--paper)] p-4 space-y-3">
        <div
          className="flex items-center justify-between cursor-pointer select-none"
          onClick={() => setIsAfbExpanded(!isAfbExpanded)}
        >
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 border border-[var(--ink)] bg-[var(--surface)] text-[var(--ink)]">
              NRW SoWi Abitur · AFB III
            </span>
            <h3 className="text-sm font-serif font-bold text-[var(--ink)]">
              {isDe
                ? "Klausuranalyse: Beurteilen der BWG-Reform 2023 im Spannungsfeld der Verfassungsprinzipien"
                : "北威州会考大题研习：评判2023选举法改革的宪法法益权衡 (AFB III)"}
            </h3>
          </div>
          <button
            type="button"
            className="text-xs font-mono text-[var(--gray)] hover:text-[var(--ink)] cursor-pointer"
          >
            {isAfbExpanded ? (isDe ? "[Einklappen]" : "[折叠]") : (isDe ? "[Ausklappen]" : "[展开]")}
          </button>
        </div>

        {isAfbExpanded && (
          <div className="space-y-4 pt-3 border-t border-[var(--line)] text-xs leading-relaxed text-[var(--ink)]">
            {/* 考题母题与核心要求 */}
            <div className="p-3 bg-[var(--surface)] border border-[var(--line)] space-y-1">
              <div className="text-[10px] font-mono text-[var(--gray)] uppercase tracking-wider">
                {isDe ? "OFFIZIELLE KLAUSUR-AUFGABENSTELLUNG" : "考试标准命题母题"}
              </div>
              <p className="font-serif  font-medium">
                {isDe
                  ? "„Beurteilen Sie die Reform des Bundeswahlgesetzes 2023 im Spannungsfeld zwischen Wahlkreisrepräsentation (Bürgernähe) und Funktionsfähigkeit des Deutschen Bundestages.“ (Operator: beurteilen / AFB III)"
                  : "“请在选区直选代表性（民意亲和性）与联邦议院工作效能/比例公正之间，评判2023年德国联邦选举法改革的合宪性与合理性。”（动词：beurteilen / AFB III 高阶评判）"}
              </p>
            </div>

            {/* 四维正反辩证评分网格 (Erwartungshorizont Matrix) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {/* 维度 1: 选区代表性 */}
              <div className="p-3 bg-[var(--surface)] border border-[var(--line)] space-y-2">
                <div className="font-mono text-[11px] font-bold text-[var(--ink)] flex items-center justify-between">
                  <span>
                    {isDe
                      ? "1. Repräsentationsfunktion & Bürgernähe"
                      : "1. 选区代表性与地方民意亲和"}
                  </span>
                  <span className="text-[10px] text-[var(--gray)]">Art. 38 Abs. 1 GG</span>
                </div>
                <div className="space-y-1 text-[11px] text-[var(--gray)]">
                  <div>
                    <strong className="text-[var(--ink)]">
                      {isDe ? "Contra Reform (Verwaiste Kreise):" : "反对新法（直选落选风险）:"}
                    </strong>{" "}
                    {isDe
                      ? "Gewinnt ein Direktkandidat den Wahlkreis, zieht aber mangels Zweitstimmendeckung nicht ein, entsteht das Gefühl demokratischer Entfremdung vor Ort."
                      : "选区第一名得票者因政党全国第二票配额不足无法就任，导致该选区无直选代言人，削弱选民对民主制度的信任感。"}
                  </div>
                  <div>
                    <strong className="text-[var(--ink)]">
                      {isDe ? "Pro Reform (Verfassungsauftrag):" : "支持新法（全联邦代表性）:"}
                    </strong>{" "}
                    {isDe
                      ? "Abgeordnete sind Vertreter des ganzen Volkes, nicht an Aufträge gebunden. Landeslisten gewährleisten regionale Vielfalt."
                      : "《基本法》规定议员代表全体人民，而非地方选区训令代表；政党通过各州名单依然能保障跨区域平衡。"}
                  </div>
                </div>
              </div>

              {/* 维度 2: 议会工作效能 */}
              <div className="p-3 bg-[var(--surface)] border border-[var(--line)] space-y-2">
                <div className="font-mono text-[11px] font-bold text-[var(--ink)] flex items-center justify-between">
                  <span>
                    {isDe
                      ? "2. Arbeits- & Funktionsfähigkeit des Parlaments"
                      : "2. 议会运作效能与财政承载力"}
                  </span>
                  <span className="text-[10px] text-[var(--gray)]">Institutionelle Effizienz</span>
                </div>
                <div className="space-y-1 text-[11px] text-[var(--gray)]">
                  <div>
                    <strong className="text-[var(--ink)]">
                      {isDe ? "Pro Reform (Stopp der Aufblähung):" : "支持新法（遏制恶性膨胀）:"}
                    </strong>{" "}
                    {isDe
                      ? "Fixierung auf 630 Sitze beendet die teure und schwerfällige Gigantenkammer (2021: 736 Sitze, Büro- und Ausschusschaos, Kosten > 1 Mrd. €/Jahr)."
                      : "严格封顶630席，彻底终结了委员会规模过度膨胀、大楼不堪重负与每年超10亿欧元的巨额国会财政包袱。"}
                  </div>
                  <div>
                    <strong className="text-[var(--ink)]">
                      {isDe ? "Contra Reform (Partielle Nachteile):" : "保留意见（地方大党受损）:"}
                    </strong>{" "}
                    {isDe
                      ? "Die Reform traf primär Regionalparteien wie die CSU und kleine Parteien; politische Akzeptanz im föderalen Gefüge litt."
                      : "新机制严重冲击巴伐利亚基社盟（CSU）等地方大党利益，在联邦政治协商中引发了长期的抵制与宪法诉讼。"}
                  </div>
                </div>
              </div>

              {/* 维度 3: 投票效力平等 */}
              <div className="p-3 bg-[var(--surface)] border border-[var(--line)] space-y-2">
                <div className="font-mono text-[11px] font-bold text-[var(--ink)] flex items-center justify-between">
                  <span>
                    {isDe
                      ? "3. Erfolgswertgleichheit der Stimmen"
                      : "3. 选举平等性与第二票效力等值"}
                  </span>
                  <span className="text-[10px] text-[var(--gray)]">Wahlrechtsgrundsätze</span>
                </div>
                <div className="space-y-1 text-[11px] text-[var(--gray)]">
                  <div>
                    <strong className="text-[var(--ink)]">
                      {isDe ? "Pro Reform (Perfekter Proporz):" : "支持新法（纯粹比例公正）:"}
                    </strong>{" "}
                    {isDe
                      ? "Jede Zweitstimme zählt mathematisch exakt gleich. Das Parlament spiegelt den Wählerwillen ohne Überhangsverzerrung perfekt wider."
                      : "每张第二票在数学上具有完全等值的分配效力，议会席位精确镜像反映全民政党意志，绝无悬峙偏差。"}
                  </div>
                  <div>
                    <strong className="text-[var(--ink)]">
                      {isDe ? "Altes System (Verzerrung & Kaskaden):" : "旧制弊端（雪崩式补偿）:"}
                    </strong>{" "}
                    {isDe
                      ? "Um Überhangmandate auszugleichen, mussten immer mehr Ausgleichssitze geschaffen werden – kompliziert und wählerfern."
                      : "为弥补单个政党的悬峙席位，不得不层层追加数十个平衡席位，计算机制极端复杂晦涩。"}
                  </div>
                </div>
              </div>

              {/* 维度 4: 联邦宪法法院裁定 */}
              <div className="p-3 bg-[var(--surface)] border border-[var(--line)] space-y-2">
                <div className="font-mono text-[11px] font-bold text-[var(--ink)] flex items-center justify-between">
                  <span>
                    {isDe
                      ? "4. BVerfG-Urteil 2024 (Grundmandatsklausel)"
                      : "4. 联邦宪法法院2024裁定（基本议席条款）"}
                  </span>
                  <span className="text-[10px] text-[var(--gray)]">2 BvF 1/23</span>
                </div>
                <div className="space-y-1 text-[11px] text-[var(--gray)]">
                  <div>
                    <strong className="text-[var(--ink)]">
                      {isDe ? "Karlsruher Richterspruch:" : "宪法法院裁决要点:"}
                    </strong>{" "}
                    {isDe
                      ? "Die Deckelung auf 630 Sitze und Zweitstimmendeckung sind verfassungskonform! Jedoch wurde die Abschaffung der Grundmandatsklausel gekippt."
                      : "卡尔斯鲁厄裁定：630席封顶与第二票配额覆盖原则完全合宪！但废除“基本议席条款”违宪，因此该豁免权必须保留。"}
                  </div>
                  <div>
                    <strong className="text-[var(--ink)]">
                      {isDe ? "Konsequenz für Klausur:" : "应试答题要诀:"}
                    </strong>{" "}
                    {isDe
                      ? "Schüler müssen differenzieren: Zweitstimmendeckung = JA, aber Minderheitenschutz regional verankerter Parteien (Linke/CSU) bleibt gewahrt."
                      : "必须区分：总席位封顶获宪法首肯，但对地方深耕小党（如左翼党3个直选席）的底线包容不可剥夺。"}
                  </div>
                </div>
              </div>
            </div>

            {/* 高分答题句式库 (Klausur-Satzbausteine) */}
            <div className="p-3 bg-[var(--paper-subtle)] border border-[var(--line)] space-y-1.5">
              <div className="text-[10px] font-mono text-[var(--gray)] uppercase tracking-wider">
                {isDe ? "KLAUSUR-FORMULIERUNGSHILFEN (SATZBAUSTEINE)" : "高分规范答题句式库"}
              </div>
              <ul className="list-disc list-inside space-y-1 text-[11px] font-serif text-[var(--ink)]">
                <li>
                  {isDe
                    ? "„Zwar führt die Zweitstimmendeckung zu dem verfassungsrechtlich heiklen Phänomen verwaister Wahlkreise, jedoch überwiegt das verfassungsrechtliche Gebot der Funktionsfähigkeit des Parlaments...“"
                    : "“虽然第二票配额覆盖机制会导致‘直选代表落选’这一敏感现象，然而保障联邦议会正常运作效能与财政可承受力的宪法法益明显占优……”"}
                </li>
                <li>
                  {isDe
                    ? "„Die Reform 2023 löst das Dilemma des negativen Stimmgewichts und der unkontrollierten Parlamentsaufblähung, indem sie die Zweitstimme zur allein maßgeblichen Determinante der Sitzverteilung erhebt.“"
                    : "“2023年改革通过将第二票确立为席位分配的唯一决定性准绳，一劳永逸地解决了负选票效力与国会恶性膨胀的历史两难。”"}
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
export default WahlsystemSim;

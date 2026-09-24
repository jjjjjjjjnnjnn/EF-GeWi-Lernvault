export type ThemeId = "academic" | "classic" | "oxford";
export type DensityId = "compact" | "balanced";

export interface ThemeConfig {
  id: ThemeId;
  nameDE: string;
  nameZH: string;
  descDE: string;
  descZH: string;
}

export interface DensityConfig {
  id: DensityId;
  nameDE: string;
  nameZH: string;
  descDE: string;
  descZH: string;
}

export const THEMES: readonly ThemeConfig[] = [
  {
    id: "academic",
    nameDE: "Akademisch Schlicht",
    nameZH: "极简学术",
    descDE: "Klar, hochpräzise, Graustufen-Fokus",
    descZH: "高精黑白灰，冷静理性专注提分",
  },
  {
    id: "classic",
    nameDE: "Klassik Papier",
    nameZH: "温润纸书",
    descDE: "Warmes Elfenbein, angenehm bei langem Lesen",
    descZH: "温暖象牙书卷质感，久读不刺眼",
  },
  {
    id: "oxford",
    nameDE: "Oxford Schiefer",
    nameZH: "牛津沉静",
    descDE: "Tiefblau-grauer Universitätsstil",
    descZH: "理性深邃蓝灰，学府专注氛围",
  },
] as const;

export const DENSITIES: readonly DensityConfig[] = [
  {
    id: "compact",
    nameDE: "Kompakt (Fokus)",
    nameZH: "紧凑精炼（推荐）",
    descDE: "Kompakte Zeilen, maximaler Lernstoff",
    descZH: "高密度紧凑版式，最大化呈现考题",
  },
  {
    id: "balanced",
    nameDE: "Ausgewogen",
    nameZH: "标准适中",
    descDE: "Mehr Weißraum für ruhiges Lesen",
    descZH: "适度留白呼吸感，舒适浏览",
  },
] as const;

const THEME_KEY = "ef_lernstyle_theme";
const DENSITY_KEY = "ef_lernstyle_density";

export function getStoredTheme(): ThemeId {
  if (typeof window === "undefined") return "academic";
  try {
    const val = localStorage.getItem(THEME_KEY);
    if (val === "academic" || val === "classic" || val === "oxford") return val;
  } catch {
    // ignore
  }
  return "academic";
}

export function setStoredTheme(theme: ThemeId): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch {
    // ignore
  }
  applyThemeAttributes(theme, getStoredDensity());
}

export function getStoredDensity(): DensityId {
  if (typeof window === "undefined") return "compact";
  try {
    const val = localStorage.getItem(DENSITY_KEY);
    if (val === "compact" || val === "balanced") return val;
  } catch {
    // ignore
  }
  return "compact";
}

export function setStoredDensity(density: DensityId): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(DENSITY_KEY, density);
  } catch {
    // ignore
  }
  applyThemeAttributes(getStoredTheme(), density);
}

export function applyThemeAttributes(theme: ThemeId, density: DensityId): void {
  if (typeof document === "undefined") return;
  document.documentElement.setAttribute("data-theme", theme);
  document.documentElement.setAttribute("data-density", density);
}

export function initTheme(): void {
  applyThemeAttributes(getStoredTheme(), getStoredDensity());
}

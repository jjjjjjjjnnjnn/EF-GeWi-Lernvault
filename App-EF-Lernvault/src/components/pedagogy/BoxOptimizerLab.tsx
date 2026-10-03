import type { Lang } from "../../i18n";
import { BoxOptimizerSim } from "./BoxOptimizerSim";

export interface BoxOptimizerLabProps {
  lang: Lang;
}

export function BoxOptimizerLab({ lang }: BoxOptimizerLabProps) {
  return <BoxOptimizerSim lang={lang} />;
}

export default BoxOptimizerLab;

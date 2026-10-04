// MarktWelfareLab — Re-exported to unified MarktMechanismusSim
// 供求机制与福利经济学已全量整合至统一沙盘
import { MarktMechanismusSim } from "./MarktMechanismusSim";
import type { Lang } from "../../i18n";

export function MarktWelfareLab({ lang }: { lang: Lang }) {
  return <MarktMechanismusSim lang={lang} />;
}

export default MarktWelfareLab;

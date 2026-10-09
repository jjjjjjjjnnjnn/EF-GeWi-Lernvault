import type { I18nModule, Lang } from "./types";
import { skillTreeI18n, type SkillTreeI18nTokens } from "./modules/skillTree";

/**
 * 拼插式多语言注册中心 (Pluggable i18n Registry)
 * 允许按模块热插拔注册语言包，方便维护与未来横向扩展（如新增学科词库、专业领域术语包等）
 */
class PluggableI18nRegistry {
  private modules = new Map<string, I18nModule>();

  constructor() {
    // 默认预注册核心业务模块
    this.registerModule({
      id: "skillTree",
      name: "Wissensgraph & SkillTree",
      getStrings: (lang: Lang) => skillTreeI18n(lang),
    });
  }

  public registerModule<T>(module: I18nModule<T>): void {
    this.modules.set(module.id, module as I18nModule);
  }

  public unregisterModule(id: string): boolean {
    return this.modules.delete(id);
  }

  public getModule<T = any>(id: string): I18nModule<T> | undefined {
    return this.modules.get(id) as I18nModule<T> | undefined;
  }

  public getModuleStrings<T = any>(id: string, lang: Lang): T | undefined {
    const mod = this.getModule<T>(id);
    return mod ? mod.getStrings(lang) : undefined;
  }

  public listModules(): readonly { id: string; name: string }[] {
    return Array.from(this.modules.values()).map((m) => ({ id: m.id, name: m.name }));
  }

  public getSkillTree(lang: Lang): SkillTreeI18nTokens {
    return (this.getModuleStrings<SkillTreeI18nTokens>("skillTree", lang) || skillTreeI18n(lang));
  }
}

export const i18nRegistry = new PluggableI18nRegistry();

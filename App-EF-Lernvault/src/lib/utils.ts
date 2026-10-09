/**
 * shadcn-ui 兼容原生类名拼接工具函数 (cn)
 * 零额外第三方 npm 依赖，支持字符串、布尔值、条件对象与嵌套数组
 */

export type ClassValue =
  | string
  | number
  | boolean
  | undefined
  | null
  | Record<string, boolean | number | string | undefined | null>
  | ClassValue[];

export function cn(...inputs: ClassValue[]): string {
  const classes: string[] = [];

  function process(item: ClassValue): void {
    if (!item) return;
    if (typeof item === "string" || typeof item === "number") {
      const trimmed = String(item).trim();
      if (trimmed) classes.push(trimmed);
    } else if (Array.isArray(item)) {
      for (const sub of item) {
        process(sub);
      }
    } else if (typeof item === "object") {
      for (const [key, val] of Object.entries(item)) {
        if (Boolean(val) && key.trim()) {
          classes.push(key.trim());
        }
      }
    }
  }

  for (const input of inputs) {
    process(input);
  }

  return classes.join(" ");
}

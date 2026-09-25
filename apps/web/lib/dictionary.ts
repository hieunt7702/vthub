import { cookies } from "next/headers";
import viTranslations from "../messages/vi.json";
import enTranslations from "../messages/en.json";

export type Language = "vi" | "en";

const dictionaries: Record<Language, any> = {
  vi: viTranslations,
  en: enTranslations,
};

function getNestedTranslation(obj: any, path: string): string | undefined {
  if (!obj) return undefined;
  if (obj[path] !== undefined && typeof obj[path] === "string") return obj[path];
  
  const keys = path.split(".");
  let current = obj;
  for (const k of keys) {
    if (current && typeof current === "object" && k in current) {
      current = current[k];
    } else {
      return undefined;
    }
  }
  return typeof current === "string" ? current : undefined;
}

export async function getLanguage(): Promise<Language> {
  const cookieStore = await cookies();
  const lang = cookieStore.get("bh_lang")?.value as Language | undefined;
  return lang && ["vi", "en"].includes(lang) ? lang : "vi";
}

export async function getDictionary() {
  const lang = await getLanguage();
  
  return {
    language: lang,
    t: (key: string): string => {
      const primary = getNestedTranslation(dictionaries[lang], key);
      if (primary) return primary;
      const fallback = getNestedTranslation(dictionaries["vi"], key);
      if (fallback) return fallback;
      return key;
    }
  };
}

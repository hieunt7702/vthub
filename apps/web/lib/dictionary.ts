import { cookies } from "next/headers";
import viTranslations from "../messages/vi.json";
import enTranslations from "../messages/en.json";

export type Language = "vi" | "en";

const dictionaries: Record<Language, Record<string, string>> = {
  vi: viTranslations,
  en: enTranslations,
};

export async function getLanguage(): Promise<Language> {
  const cookieStore = await cookies();
  const lang = cookieStore.get("bh_lang")?.value as Language | undefined;
  return lang && ["vi", "en"].includes(lang) ? lang : "vi";
}

export async function getDictionary() {
  const lang = await getLanguage();
  const dict = dictionaries[lang];
  
  // Return a translation function similar to client-side t()
  return {
    language: lang,
    t: (key: string) => {
      return dict[key] || dictionaries["vi"][key] || key;
    }
  };
}

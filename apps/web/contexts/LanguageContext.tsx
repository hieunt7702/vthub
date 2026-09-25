"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import viTranslations from "../messages/vi.json";
import enTranslations from "../messages/en.json";

export type Language = "vi" | "en";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations: Record<Language, any> = {
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

export function LanguageProvider({ 
  children,
  initialLanguage = "vi"
}: { 
  children: React.ReactNode;
  initialLanguage?: Language;
}) {
  const [language, setLanguageState] = useState<Language>(initialLanguage);
  const router = useRouter();

  useEffect(() => {
    // Read cookie on mount if available, otherwise default to Vietnamese
    const match = document.cookie.match(/bh_lang=(vi|en)/);
    if (match && (match[1] === "vi" || match[1] === "en")) {
      setLanguageState(match[1] as Language);
    } else {
      setLanguageState("vi");
      document.cookie = `bh_lang=vi; path=/; max-age=31536000; SameSite=Lax`;
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    document.cookie = `bh_lang=${lang}; path=/; max-age=31536000; SameSite=Lax`;
    router.refresh();
  };

  const t = (key: string): string => {
    const primary = getNestedTranslation(translations[language], key);
    if (primary) return primary;
    const fallback = getNestedTranslation(translations["vi"], key);
    if (fallback) return fallback;
    return key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}

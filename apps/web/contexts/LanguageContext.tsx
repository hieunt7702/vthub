"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import viTranslations from "../messages/vi.json";
import enTranslations from "../messages/en.json";

type Language = "vi" | "en";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations: Record<Language, Record<string, string>> = {
  vi: viTranslations,
  en: enTranslations,
};

export function LanguageProvider({ 
  children,
  initialLanguage = "vi"
}: { 
  children: React.ReactNode;
  initialLanguage?: Language;
}) {
  const [language, setLanguageState] = useState<Language>(initialLanguage);
  const router = useRouter();

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    // Set cookie that lasts for a year
    document.cookie = `bh_lang=${lang}; path=/; max-age=31536000; SameSite=Lax`;
    // Force router to refetch server components with the new cookie
    router.refresh();
  };

  const t = (key: string): string => {
    const dict = translations[language];
    return dict[key] || translations["vi"][key] || key;
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


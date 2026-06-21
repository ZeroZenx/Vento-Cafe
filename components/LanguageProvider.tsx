"use client";

import { createContext, useContext, useEffect, useState, type PropsWithChildren } from "react";
import { translations, type Language, type TranslationDictionary } from "@/data/translations";

type LanguageContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
  t: TranslationDictionary;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: PropsWithChildren) {
  const [language, setLanguageState] = useState<Language>("es");

  useEffect(() => {
    const savedLanguage = window.localStorage.getItem("vento-language");
    if (savedLanguage === "en" || savedLanguage === "es") {
      const timer = window.setTimeout(() => setLanguageState(savedLanguage), 0);
      return () => window.clearTimeout(timer);
    }
  }, []);

  function setLanguage(nextLanguage: Language) {
    setLanguageState(nextLanguage);
    window.localStorage.setItem("vento-language", nextLanguage);
    document.documentElement.lang = nextLanguage;
  }

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t: translations[language] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used inside LanguageProvider");
  }
  return context;
}

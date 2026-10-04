"use client";

import { useLanguage } from "@/components/LanguageProvider";
import { translateAdminText } from "@/data/admin-translations";

export function useAdminText() {
  const { language } = useLanguage();
  return (text: string) => translateAdminText(language, text);
}

export function AdminLanguageSwitch() {
  const { language, setLanguage } = useLanguage();
  return <div role="group" aria-label={language === "es" ? "Idioma" : "Language"} className="flex shrink-0 rounded-md border border-gray-200 bg-white p-0.5">
    {(["es", "en"] as const).map(option => <button type="button" key={option} aria-label={option === "es" ? "Español" : "English"} aria-pressed={language === option} onClick={() => setLanguage(option)} className={`grid h-11 w-11 place-items-center rounded text-xs font-semibold ${language === option ? "bg-forest text-white" : "text-gray-600 hover:bg-gray-100"}`}>{option.toUpperCase()}</button>)}
  </div>;
}

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import en from "./locales/en.json";
import ar from "./locales/ar.json";
import de from "./locales/de.json";

export const defaultNS = "translation";
export const resources = {
  en: { translation: en },
  ar: { translation: ar },
  de: { translation: de },
};

// Normalize language codes (e.g., 'ar-EG' -> 'ar', 'de-DE' -> 'de')
const customDetector = {
  name: "customLanguageDetector",
  lookup() {
    const saved = localStorage.getItem("i18nextLng") || localStorage.getItem("portfolio_lang");
    if (saved) {
      if (saved.startsWith("ar")) return "ar";
      if (saved.startsWith("de")) return "de";
      if (saved.startsWith("en")) return "en";
      return saved;
    }

    if (typeof window !== "undefined" && window.navigator) {
      const browserLang = window.navigator.language || window.navigator.userLanguage || "en";
      if (browserLang.startsWith("ar")) return "ar";
      if (browserLang.startsWith("de")) return "de";
      return "en";
    }

    return "en";
  },
  cacheUserLanguage(lng) {
    localStorage.setItem("i18nextLng", lng);
    localStorage.setItem("portfolio_lang", lng);
  },
};

export const updateDocumentAttributes = (lng) => {
  if (typeof document === "undefined") return;

  const currentLang = lng && (lng.startsWith("ar") ? "ar" : lng.startsWith("de") ? "de" : "en");
  const isRTL = currentLang === "ar";

  document.documentElement.lang = currentLang;
  document.documentElement.dir = isRTL ? "rtl" : "ltr";

  // Dynamic SEO title & description
  const title = i18n.t("seo.title", { defaultValue: "Omar Darhous - Full Stack Developer | React & JavaScript Specialist" });
  if (title) {
    document.title = title;
  }

  const description = i18n.t("seo.description", {
    defaultValue: "Omar Darhous: Expert Full Stack Developer specializing in React, JavaScript, and modern web technologies. Building responsive, high-performance web applications.",
  });
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc && description) {
    metaDesc.setAttribute("content", description);
  }
};

const languageDetector = new LanguageDetector();
languageDetector.addDetector(customDetector);

i18n
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",
    supportedLngs: ["en", "ar", "de"],
    detection: {
      order: ["customLanguageDetector", "localStorage", "navigator"],
      caches: ["localStorage"],
    },
    interpolation: {
      escapeValue: false, // React already escapes values
    },
    react: {
      useSuspense: false,
    },
  });

// Apply document attributes on load and when language changes
updateDocumentAttributes(i18n.language);

i18n.on("languageChanged", (lng) => {
  updateDocumentAttributes(lng);
});

export default i18n;

import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Globe, Check, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const languages = [
  { code: "en", name: "English", flag: "🇬🇧", dir: "ltr" },
  { code: "ar", name: "العربية", flag: "🇪🇬", dir: "rtl" },
  { code: "de", name: "Deutsch", flag: "🇩🇪", dir: "ltr" },
];

export const LanguageSelector = ({ variant = "default" }) => {
  const { i18n, t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const currentLangCode = i18n.language && i18n.language.startsWith("ar")
    ? "ar"
    : i18n.language && i18n.language.startsWith("de")
    ? "de"
    : "en";

  const currentLang = languages.find((l) => l.code === currentLangCode) || languages[0];

  const handleSelectLanguage = (code) => {
    i18n.changeLanguage(code);
    setIsOpen(false);
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <div className="relative inline-block text-start" ref={dropdownRef}>
      <motion.button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={t("language.selectLanguage")}
        className={cn(
          "flex items-center gap-1.5 px-3 py-2 rounded-full",
          "bg-white/80 dark:bg-black/80 backdrop-blur-md",
          "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700/50",
          "border border-gray-200 dark:border-gray-700 shadow-sm",
          "text-xs font-medium transition-all duration-200",
          isOpen && "ring-2 ring-primary/40 border-primary"
        )}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Globe className="w-4 h-4 text-primary" />
        <span className="text-sm leading-none">{currentLang.flag}</span>
        <span className="hidden sm:inline font-semibold">{currentLang.name}</span>
        <ChevronDown
          className={cn(
            "w-3 h-3 text-muted-foreground transition-transform duration-200",
            isOpen && "rotate-180"
          )}
        />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            role="listbox"
            aria-label={t("language.selectLanguage")}
            className={cn(
              "absolute top-full mt-2 z-50 min-w-[150px] p-1.5 rounded-2xl",
              "bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl",
              "border border-gray-200 dark:border-gray-700 shadow-xl",
              // Align dropdown properly based on direction
              "ltr:right-0 rtl:left-0 origin-top"
            )}
          >
            <div className="space-y-1">
              {languages.map((lang) => {
                const isSelected = lang.code === currentLangCode;
                return (
                  <button
                    key={lang.code}
                    type="button"
                    role="option"
                    aria-selected={isSelected}
                    onClick={() => handleSelectLanguage(lang.code)}
                    className={cn(
                      "w-full flex items-center justify-between gap-3 px-3 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all text-start",
                      isSelected
                        ? "bg-primary/10 text-primary font-semibold"
                        : "text-foreground hover:bg-gray-100 dark:hover:bg-gray-800/80"
                    )}
                  >
                    <span className="flex items-center gap-2">
                      <span className="text-base leading-none">{lang.flag}</span>
                      <span>{lang.name}</span>
                    </span>
                    {isSelected && (
                      <Check className="w-4 h-4 text-primary shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

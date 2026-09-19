import { useEffect, useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import {
  Home,
  User,
  Code,
  Briefcase,
  MessageSquare,
  Mail,
  Sun,
  Moon,
  Volume2,
  VolumeX,
  Github,
  Linkedin,
} from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { LanguageSelector } from "./LanguageSelector";

const navItems = [
  { key: "home", href: "#hero", icon: Home },
  { key: "about", href: "#about", icon: User },
  { key: "skills", href: "#skills", icon: Code },
  { key: "projects", href: "#projects", icon: Briefcase },
  { key: "testimonials", href: "#testimonials", icon: MessageSquare },
  { key: "contact", href: "#contact", icon: Mail },
];

const ThemeToggle = () => {
  const { t } = useTranslation();
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    if (stored === "dark") {
      document.documentElement.classList.add("dark");
      setTheme("dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    document.documentElement.classList.toggle("dark");
    localStorage.setItem("theme", newTheme);
    setTheme(newTheme);
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800"
      title={t("nav.toggleTheme")}
      aria-label={t("nav.toggleTheme")}
    >
      {theme === "dark" ? (
        <Sun className="w-5 h-5" />
      ) : (
        <Moon className="w-5 h-5" />
      )}
    </button>
  );
};

export const Navbar = () => {
  const { t } = useTranslation();
  const [activeSection, setActiveSection] = useState("#hero");
  const [showNavbar, setShowNavbar] = useState(true);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [isAudioReady, setIsAudioReady] = useState(false);
  const lastScrollYRef = useRef(0);
  const audioRef = useRef(null);

  const musicUrl = "/music.mp3";

  useEffect(() => {
    if (typeof window !== "undefined") {
      audioRef.current = new Audio(musicUrl);
      audioRef.current.loop = true;
      audioRef.current.volume = 0.5;
      audioRef.current.preload = "auto";

      const handleCanPlay = () => setIsAudioReady(true);

      audioRef.current.addEventListener("canplaythrough", handleCanPlay);

      return () => {
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current.removeEventListener("canplaythrough", handleCanPlay);
          audioRef.current = null;
        }
      };
    }
  }, []);

  const toggleMusic = () => {
    if (!audioRef.current || !isAudioReady) return;

    if (isMusicPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(console.error);
    }

    setIsMusicPlaying(!isMusicPlaying);
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollYRef.current && currentScrollY > 100) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }

      lastScrollYRef.current = currentScrollY;

      const sections = navItems.map((item) => item.href);
      const scrollPosition = currentScrollY + 100;

      for (const section of sections) {
        const element = document.querySelector(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;

          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Top Action Bar (end-aligned for natural LTR & RTL placement) */}
      <motion.div
        className="fixed top-4 end-4 z-50 flex items-center gap-2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Language Selector */}
        <LanguageSelector />

        {/* GitHub Button */}
        <motion.a
          href="https://github.com/Omar-darhous"
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "p-2 rounded-full bg-white/80 dark:bg-black/80 backdrop-blur-md",
            "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700/50",
            "border border-gray-200 dark:border-gray-700 shadow-sm",
            "flex items-center justify-center"
          )}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          title={t("nav.githubProfile")}
          aria-label={t("nav.githubProfile")}
        >
          <Github className="w-5 h-5" />
        </motion.a>

        {/* LinkedIn Button */}
        <motion.a
          href="https://www.linkedin.com/in/omar-darhous-0560b21a7/"
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "p-2 rounded-full bg-white/80 dark:bg-black/80 backdrop-blur-md",
            "text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900/50",
            "border border-gray-200 dark:border-gray-700 shadow-sm",
            "flex items-center justify-center"
          )}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          title={t("nav.linkedinProfile")}
          aria-label={t("nav.linkedinProfile")}
        >
          <Linkedin className="w-5 h-5" />
        </motion.a>

        {/* Music Button */}
        <motion.button
          onClick={toggleMusic}
          disabled={!isAudioReady}
          className={cn(
            "p-2 rounded-full bg-white/80 dark:bg-black/80 backdrop-blur-md",
            "text-primary hover:bg-primary/10 dark:hover:bg-primary/20",
            "border border-gray-200 dark:border-gray-700 shadow-sm",
            "flex items-center justify-center",
            !isAudioReady && "opacity-50 cursor-not-allowed"
          )}
          whileHover={{ scale: isAudioReady ? 1.05 : 1 }}
          whileTap={{ scale: isAudioReady ? 0.95 : 1 }}
          title={
            isAudioReady
              ? isMusicPlaying
                ? t("nav.pauseMusic")
                : t("nav.playMusic")
              : t("nav.loadingMusic")
          }
          aria-label={
            isAudioReady
              ? isMusicPlaying
                ? t("nav.pauseMusic")
                : t("nav.playMusic")
              : t("nav.loadingMusic")
          }
        >
          {isMusicPlaying ? (
            <Volume2 className="w-5 h-5" />
          ) : (
            <VolumeX className="w-5 h-5" />
          )}
        </motion.button>
      </motion.div>

      {/* Bottom Navbar */}
      <motion.div
        className={cn(
          "fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50",
          "transition-transform duration-300 ease-in-out",
          showNavbar ? "translate-y-0" : "translate-y-full"
        )}
        style={{ willChange: "transform" }}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center justify-center bg-white/80 dark:bg-black/80 backdrop-blur-md rounded-full shadow-lg p-2 border border-gray-200 dark:border-gray-700">
          <div className="flex gap-1 items-center">
            {navItems.map((item) => (
              <a
                key={item.key}
                href={item.href}
                className={cn(
                  "p-2 rounded-full transition-colors flex flex-col items-center",
                  activeSection === item.href
                    ? "bg-primary text-white"
                    : "text-gray-600 hover:text-primary dark:text-gray-300 dark:hover:text-primary"
                )}
                aria-label={t(`nav.${item.key}`)}
              >
                <item.icon className="w-5 h-5" />
                <span className="text-xs mt-1 hidden md:block">
                  {t(`nav.${item.key}`)}
                </span>
              </a>
            ))}
            <div className="flex items-center px-2">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

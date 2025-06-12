import { useLayoutEffect, useState } from "react";

const LOCAL_STORAGE_KEY = {
  THEME: "theme",
} as const;

const THEME = {
  LIGHT: "light",
  DARK: "dark",
} as const;

export const useDarkMode = () => {
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY.THEME);
      return saved === THEME.DARK;
    }
    return false;
  });

  useLayoutEffect(() => {
    const html = document.documentElement;
    if (!html) return;

    if (isDark) {
      html.classList.add(THEME.DARK);
      localStorage.setItem(LOCAL_STORAGE_KEY.THEME, THEME.DARK);
    } else {
      html.classList.remove(THEME.DARK);
      localStorage.setItem(LOCAL_STORAGE_KEY.THEME, THEME.LIGHT);
    }
  }, [isDark]);

  const toggleDarkMode = () => setIsDark((prev) => !prev);
  return { isDark, toggleDarkMode };
};

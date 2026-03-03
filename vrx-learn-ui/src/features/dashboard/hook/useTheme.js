import { useEffect, useState } from "react";

export function useTheme() {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("theme");

    if (saved !== null) {
      return saved === "true";
    }

    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    const root = document.documentElement;

    if (darkMode) {
      root.classList.add("dark");
      localStorage.setItem("theme", "true");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "false");
    }
  }, [darkMode]);

  const toggleTheme = () => {
    setDarkMode((prev) => !prev);
  };

  return {
    darkMode,
    toggleTheme,
    setDarkMode
  };
}
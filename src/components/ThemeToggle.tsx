import { useEffect, useState, useCallback } from "react";
import { FiSun, FiMoon } from "react-icons/fi";

type Theme = "light" | "dark";

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.classList.remove("light", "dark");
  root.classList.add(theme);
  root.setAttribute("data-theme", theme);
}
function getInitialTheme(): Theme {
  const saved = localStorage.getItem("theme") as Theme | null;
  if (saved === "light" || saved === "dark") return saved;
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);
  useEffect(() => {
    applyTheme(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggle = useCallback(() => {
    setTheme((t) => (t === "light" ? "dark" : "light"));
  }, []);

  const darkMode = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={darkMode}
      aria-label={darkMode ? "Switch to light theme" : "Switch to dark theme"}
      title={darkMode ? "Light mode" : "Dark mode"}
      className="
        inline-flex h-10 w-10 items-center justify-center
        rounded-xl border border-border bg-fields text-title
        transition-colors
        hover:bg-selected/60
        active:bg-selected
        cursor-pointer
      "
    >
      {darkMode ? (
        <FiSun className="h-5 w-5" />
      ) : (
        <FiMoon className="h-5 w-5" />
      )}
    </button>
  );
}

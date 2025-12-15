import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";

const ThemeToggle = () => {
  const { resolvedTheme, setTheme } = useTheme();

  if (!resolvedTheme) return null; 

  const isDark = resolvedTheme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="relative p-3 rounded-full bg-muted hover:bg-primary/10 transition-all duration-300 group overflow-hidden"
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
    >
      <div className="relative w-5 h-5">
        <Sun
          className={`absolute inset-0 w-5 h-5 text-candy-yellow transition-all duration-500 ${
            isDark
              ? "opacity-0 rotate-90 scale-0"
              : "opacity-100 rotate-0 scale-100"
          }`}
        />
        <Moon
          className={`absolute inset-0 w-5 h-5 text-candy-purple transition-all duration-500 ${
            isDark
              ? "opacity-100 rotate-0 scale-100"
              : "opacity-0 -rotate-90 scale-0"
          }`}
        />
      </div>
      <span
        className={`absolute inset-0 rounded-full transition-opacity duration-300 ${
          isDark
            ? "bg-candy-purple/20 opacity-100"
            : "bg-candy-yellow/20 opacity-0 group-hover:opacity-100"
        }`}
      />
    </button>
  );
};

export default ThemeToggle;

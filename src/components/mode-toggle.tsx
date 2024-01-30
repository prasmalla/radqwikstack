// This pragma is required so that React JSX is used instead of Qwik JSX
/** @jsxImportSource react */
import { qwikify$ } from "@builder.io/qwik-react";
import { Moon, Sun } from "lucide-react";
import { useTheme, type Theme } from "~/components/theme-provider";

const ReactModeToggle = () => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    console.log("Current theme:", theme);
    setTheme((prevTheme: Theme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <div>
      <button onClick={toggleTheme} className="outline-icon-button">
        {theme === "light" ? (
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        ) : (
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        )}
        <span className="sr-only">Toggle theme</span>
      </button>
    </div>
  );
};

export const ModeToggle = qwikify$(ReactModeToggle);

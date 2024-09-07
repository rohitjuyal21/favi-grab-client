import { useTheme } from "@/useTheme";
import { Button } from "./ui/button";
import { Github, Moon, Sun } from "lucide-react";

const Header = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <header className="flex items-center justify-between">
      <a href="/" className="text-2xl text-primary font-bold">
        FaviGrab 🔍
      </a>
      <div className="flex gap-2 items-center">
        <Button
          variant="outline"
          size="icon"
          className="w-9 h-9"
          onClick={toggleTheme}
        >
          {theme === "dark" ? (
            <Sun className="size-4" />
          ) : (
            <Moon className="size-4" />
          )}
        </Button>
        <Button variant="outline" size="icon" className="w-9 h-9" asChild>
          <a
            href="https://github.com/rohitjuyal21/favi-grab-client"
            target="_blank"
          >
            <Github className="size-4" />
          </a>
        </Button>
      </div>
    </header>
  );
};

export default Header;

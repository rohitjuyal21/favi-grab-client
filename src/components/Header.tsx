import { useTheme } from "@/useTheme";
import { Button } from "./ui/button";
import { Moon, Sun } from "lucide-react";

const Header = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <header className="flex items-center justify-between">
      <a href="/" className="text-2xl text-primary font-bold">
        FaviGrab 🔍
      </a>
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
    </header>
  );
};

export default Header;

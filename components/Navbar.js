import Link from "next/link";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    if (!mounted) return;
    setTheme(theme === "dark" ? "light" : "dark");
  };

  // Button label logic
  const buttonLabel = !mounted
    ? "Theme"
    : theme === "light"
    ? "Dark mode"
    : "Light mode";

  return (
    <header className="
      sticky top-0 z-20 backdrop-blur
      bg-slate-950/80 border-b border-slate-800
      dark:bg-slate-950/80 dark:border-slate-800
      light:bg-white/80 light:border-slate-200
    ">
      <div className="max-w-6xl mx-auto px-8 py-4 flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/">
          <span className="text-xl font-semibold tracking-tight cursor-pointer">
            Crypto<span className="text-teal-400">Pulse</span>
          </span>
        </Link>

        {/* Nav Links */}
        <nav className="flex items-center gap-6 text-sm">
          <Link href="/" className="hover:text-teal-300 dark:hover:text-teal-300">
            Home
          </Link>

          <Link href="/about" className="hover:text-teal-300 dark:hover:text-teal-300">
            About
          </Link>

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            type="button"
            className="
              px-3 py-1 text-xs rounded-full transition
              border border-slate-300 text-slate-700 hover:border-teal-500
              dark:border-slate-700 dark:text-slate-300 dark:hover:border-teal-400
            "
          >
            {buttonLabel}
          </button>
        </nav>
      </div>
    </header>
  );
}

"use client";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return <div className="w-9 h-9" />;

    return (
        <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 rounded-lg border border-secondary-300 bg-white hover:bg-secondary-50 transition-colors text-secondary-900 shadow-sm ml-4"
            title="Toggle Light/Dark Mode"
            aria-label="Toggle Theme"
        >
            {theme === "dark" ? <Sun size={20} className="text-orange-500" /> : <Moon size={20} className="text-secondary-700" />}
        </button>
    );
}

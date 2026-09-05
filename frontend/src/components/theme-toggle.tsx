"use client";

import { useEffect, useState } from "react";
import { getStoredTheme, setStoredTheme, type ThemeMode } from "@/lib/theme";

const ICONS: Record<ThemeMode, string> = {
  light: "\u2600\ufe0f",
  dark: "\ud83c\udf19",
};

const LABELS: Record<ThemeMode, string> = {
  light: "Light",
  dark: "Dark",
};

export function ThemeToggle() {
  const [mode, setMode] = useState<ThemeMode>("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMode(getStoredTheme());
    setMounted(true);
  }, []);

  function toggle() {
    const next: ThemeMode = mode === "light" ? "dark" : "light";
    setMode(next);
    setStoredTheme(next);
  }

  return (
    <button
      type="button"
      onClick={toggle}
      className="btn btn-secondary h-9 w-9 shrink-0 p-0 text-sm"
      aria-label={`Theme: ${LABELS[mode]}. Click to switch to ${mode === "light" ? "dark" : "light"} mode.`}
      title={`Theme: ${LABELS[mode]} (click to switch)`}
      suppressHydrationWarning
    >
      {mounted ? ICONS[mode] : ICONS.light}
    </button>
  );
}

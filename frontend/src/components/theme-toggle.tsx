"use client";

import { useEffect, useState } from "react";
import { applyTheme, getStoredTheme, setStoredTheme, type ThemeMode } from "@/lib/theme";

const ORDER: ThemeMode[] = ["light", "dark", "system"];

const ICONS: Record<ThemeMode, string> = {
  light: "\u2600\ufe0f",
  dark: "\ud83c\udf19",
  system: "\ud83d\udda5\ufe0f",
};

const LABELS: Record<ThemeMode, string> = {
  light: "Light",
  dark: "Dark",
  system: "System",
};

export function ThemeToggle() {
  const [mode, setMode] = useState<ThemeMode>("system");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMode(getStoredTheme());
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || mode !== "system") return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const listener = () => applyTheme("system");
    mq.addEventListener("change", listener);
    return () => mq.removeEventListener("change", listener);
  }, [mounted, mode]);

  function cycle() {
    const next = ORDER[(ORDER.indexOf(mode) + 1) % ORDER.length];
    setMode(next);
    setStoredTheme(next);
  }

  return (
    <button
      type="button"
      onClick={cycle}
      className="btn btn-secondary h-9 w-9 shrink-0 p-0 text-sm"
      aria-label={`Theme: ${LABELS[mode]}. Click to change.`}
      title={`Theme: ${LABELS[mode]} (click to cycle)`}
      suppressHydrationWarning
    >
      {mounted ? ICONS[mode] : "\ud83d\udda5\ufe0f"}
    </button>
  );
}

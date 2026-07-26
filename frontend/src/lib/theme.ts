export type ThemeMode = "light" | "dark" | "system";

export const THEME_STORAGE_KEY = "cs-theme";

/** Inlined into a <script> in the document head so the correct theme class
 * is applied before first paint (avoids a light-mode flash for dark users). */
export const THEME_INIT_SCRIPT = `
(function () {
  try {
    var stored = localStorage.getItem("${THEME_STORAGE_KEY}");
    var isDark =
      stored === "dark" ||
      (stored !== "light" && window.matchMedia("(prefers-color-scheme: dark)").matches);
    document.documentElement.classList.toggle("dark", isDark);
  } catch (e) {}
})();
`;

export function getSystemPrefersDark(): boolean {
  return typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches;
}

export function getStoredTheme(): ThemeMode {
  if (typeof window === "undefined") return "system";
  const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
  if (stored === "light" || stored === "dark" || stored === "system") return stored;
  return "system";
}

export function applyTheme(mode: ThemeMode) {
  if (typeof document === "undefined") return;
  const isDark = mode === "dark" || (mode === "system" && getSystemPrefersDark());
  document.documentElement.classList.toggle("dark", isDark);
}

export function setStoredTheme(mode: ThemeMode) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(THEME_STORAGE_KEY, mode);
  applyTheme(mode);
}

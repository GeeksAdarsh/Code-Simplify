export type ThemeMode = "light" | "dark";

export const THEME_STORAGE_KEY = "cs-theme";

/** Inlined into a <script> in the document head so the correct theme class
 * is applied before first paint (avoids a flash of the wrong theme). */
export const THEME_INIT_SCRIPT = `
(function () {
  try {
    var stored = localStorage.getItem("${THEME_STORAGE_KEY}");
    var isDark = stored === "dark";
    document.documentElement.classList.toggle("dark", isDark);
  } catch (e) {}
})();
`;

export function getStoredTheme(): ThemeMode {
  if (typeof window === "undefined") return "light";
  const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
  if (stored === "dark") return "dark";
  return "light";
}

export function applyTheme(mode: ThemeMode) {
  if (typeof document === "undefined") return;
  document.documentElement.classList.toggle("dark", mode === "dark");
}

export function setStoredTheme(mode: ThemeMode) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(THEME_STORAGE_KEY, mode);
  applyTheme(mode);
}

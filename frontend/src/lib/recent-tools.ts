const RECENT_KEY = "cs-recent-tools";
const RECENT_EVENT = "cs-recent-tools-changed";
const MAX_RECENT = 5;

export interface RecentToolRef {
  categorySlug: string;
  slug: string;
}

function isRecentRef(value: unknown): value is RecentToolRef {
  return (
    Boolean(value) &&
    typeof value === "object" &&
    typeof (value as RecentToolRef).categorySlug === "string" &&
    typeof (value as RecentToolRef).slug === "string"
  );
}

export function readRecentTools(): RecentToolRef[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(RECENT_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(isRecentRef).slice(0, MAX_RECENT);
  } catch {
    return [];
  }
}

export function rememberRecentTool(categorySlug: string, slug: string) {
  const prev = readRecentTools().filter((t) => !(t.categorySlug === categorySlug && t.slug === slug));
  const next = [{ categorySlug, slug }, ...prev].slice(0, MAX_RECENT);
  window.localStorage.setItem(RECENT_KEY, JSON.stringify(next));
  window.dispatchEvent(new Event(RECENT_EVENT));
}

export function subscribeRecentTools(onChange: () => void) {
  window.addEventListener(RECENT_EVENT, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(RECENT_EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}

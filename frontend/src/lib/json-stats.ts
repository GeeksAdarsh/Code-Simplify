export interface JsonStats {
  objects: number;
  arrays: number;
  keys: number;
  characters: number;
  bytes: number;
  depth: number;
}

function walk(value: unknown, stats: JsonStats, depth: number) {
  if (depth > stats.depth) stats.depth = depth;
  if (Array.isArray(value)) {
    stats.arrays++;
    for (const item of value) walk(item, stats, depth + 1);
    return;
  }
  if (value !== null && typeof value === "object") {
    stats.objects++;
    const entries = Object.entries(value as Record<string, unknown>);
    stats.keys += entries.length;
    for (const [, child] of entries) walk(child, stats, depth + 1);
  }
}

export function computeJsonStats(value: unknown, text: string): JsonStats {
  const stats: JsonStats = { objects: 0, arrays: 0, keys: 0, characters: text.length, bytes: 0, depth: 0 };
  walk(value, stats, 1);
  stats.bytes = new TextEncoder().encode(text).length;
  return stats;
}

export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

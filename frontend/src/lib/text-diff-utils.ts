export type LineDiffType = "equal" | "added" | "removed";

export interface LineDiffEntry {
  type: LineDiffType;
  line: string;
  oldLineNumber?: number;
  newLineNumber?: number;
}

/** Computes a line-by-line diff between two texts using an LCS (longest common subsequence) algorithm. */
export function diffLines(a: string, b: string, ignoreCase = false, ignoreWhitespace = false): LineDiffEntry[] {
  const linesA = a.split("\n");
  const linesB = b.split("\n");

  const normalize = (line: string) => {
    let result = line;
    if (ignoreWhitespace) result = result.trim().replace(/\s+/g, " ");
    if (ignoreCase) result = result.toLowerCase();
    return result;
  };

  const normA = linesA.map(normalize);
  const normB = linesB.map(normalize);

  const n = normA.length;
  const m = normB.length;
  const lcs: number[][] = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(0));

  for (let i = n - 1; i >= 0; i--) {
    for (let j = m - 1; j >= 0; j--) {
      lcs[i][j] = normA[i] === normB[j] ? lcs[i + 1][j + 1] + 1 : Math.max(lcs[i + 1][j], lcs[i][j + 1]);
    }
  }

  const entries: LineDiffEntry[] = [];
  let i = 0;
  let j = 0;
  while (i < n && j < m) {
    if (normA[i] === normB[j]) {
      entries.push({ type: "equal", line: linesA[i], oldLineNumber: i + 1, newLineNumber: j + 1 });
      i++;
      j++;
    } else if (lcs[i + 1][j] >= lcs[i][j + 1]) {
      entries.push({ type: "removed", line: linesA[i], oldLineNumber: i + 1 });
      i++;
    } else {
      entries.push({ type: "added", line: linesB[j], newLineNumber: j + 1 });
      j++;
    }
  }
  while (i < n) {
    entries.push({ type: "removed", line: linesA[i], oldLineNumber: i + 1 });
    i++;
  }
  while (j < m) {
    entries.push({ type: "added", line: linesB[j], newLineNumber: j + 1 });
    j++;
  }

  return entries;
}

export interface DiffSummary {
  added: number;
  removed: number;
  unchanged: number;
}

export function summarizeDiff(entries: LineDiffEntry[]): DiffSummary {
  return entries.reduce(
    (acc, e) => {
      if (e.type === "added") acc.added++;
      else if (e.type === "removed") acc.removed++;
      else acc.unchanged++;
      return acc;
    },
    { added: 0, removed: 0, unchanged: 0 },
  );
}

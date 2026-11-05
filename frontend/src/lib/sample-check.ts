const normalize = (text: string) =>
  text.replace(/\r\n/g, "\n").split("\n").map((line) => line.trimEnd()).join("\n").trim();

/**
 * Development-only guard: a tool whose "Load sample" output equals its input
 * looks broken to users, so flag it in the console while the tool is built.
 */
export function warnIfSampleUnchanged(toolLabel: string, sample: string, input: string, output: string) {
  if (process.env.NODE_ENV === "production") return;
  if (!output || input !== sample) return;
  if (normalize(output) === normalize(sample)) {
    console.warn(
      `[sample-check] "${toolLabel}": Load sample produced the same text as the input. ` +
        "Use a sample the tool visibly changes.",
    );
  }
}

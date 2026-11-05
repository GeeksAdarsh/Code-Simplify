let gofmtReady: Promise<typeof import("@wasm-fmt/gofmt/web")> | null = null;

function loadGofmt() {
  gofmtReady ??= import("@wasm-fmt/gofmt/web").then(async (mod) => {
    await mod.default();
    return mod;
  });
  return gofmtReady;
}

/**
 * Formats Go with the real gofmt (compiled to WebAssembly). gofmt keeps a
 * top-level func written on one line as-is, so those bodies are opened onto
 * their own lines and formatted a second time. Throws on invalid syntax.
 */
export async function formatGo(input: string): Promise<string> {
  const gofmt = await loadGofmt();
  const first = gofmt.format(input.replace(/\r\n/g, "\n"));
  const expanded = first.replace(/^(func [^\n]*?) \{ ([^\n]*) \}$/gm, "$1 {\n$2\n}");
  return expanded === first ? first : gofmt.format(expanded);
}

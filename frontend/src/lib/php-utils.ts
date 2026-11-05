/**
 * Formats PHP (including inline HTML) with Prettier's PHP plugin. Code pasted
 * without an opening `<?php` tag would otherwise be treated as plain HTML and
 * come back unchanged, so the tag is added for formatting and removed after.
 * Throws on invalid syntax.
 */
export async function formatPhp(input: string, indentSize = 4): Promise<string> {
  const [prettier, phpPlugin] = await Promise.all([
    import("prettier/standalone"),
    import("@prettier/plugin-php/standalone"),
  ]);
  const hasOpenTag = /<\?(php|=)?/i.test(input);
  const source = hasOpenTag ? input : `<?php\n${input}`;
  const output = await prettier.format(source, {
    parser: "php",
    plugins: [phpPlugin.default ?? phpPlugin],
    // The default "auto" looks for composer.json on disk, which needs Node's fs.
    phpVersion: "8.4",
    tabWidth: indentSize,
    printWidth: 100,
  });
  return hasOpenTag ? output : output.replace(/^<\?php\s*\n/, "");
}

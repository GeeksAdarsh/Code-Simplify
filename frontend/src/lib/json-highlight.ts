function escapeHtml(text: string): string {
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

const TOKEN_PATTERN =
  /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(?:true|false)\b|\bnull\b|-?\d+(?:\.\d*)?(?:[eE][+-]?\d+)?)/g;

/**
 * Converts formatted JSON text into HTML with <span> tokens for syntax highlighting.
 * Input is escaped first, so this is safe to render with dangerouslySetInnerHTML.
 */
export function highlightJson(formatted: string): string {
  const escaped = escapeHtml(formatted);
  return escaped.replace(TOKEN_PATTERN, (match) => {
    let cls = "tok-number";
    if (/^"/.test(match)) {
      cls = /:$/.test(match) ? "tok-key" : "tok-string";
    } else if (/true|false/.test(match)) {
      cls = "tok-boolean";
    } else if (/null/.test(match)) {
      cls = "tok-null";
    }
    return `<span class="${cls}">${match}</span>`;
  });
}

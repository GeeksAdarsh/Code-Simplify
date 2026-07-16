function escapeHtml(text: string): string {
  return text.replace(/&/g, "&amp;").replace(/</g, "\u0001").replace(/>/g, "\u0002");
}

function restoreBrackets(text: string): string {
  return text.replace(/\u0001/g, "&lt;").replace(/\u0002/g, "&gt;");
}

/**
 * Lightweight XML syntax highlighter that wraps tags, attribute names,
 * attribute values, and comments in <span> tokens. Input is escaped first,
 * so the result is safe to render with dangerouslySetInnerHTML.
 */
export function highlightXml(xml: string): string {
  const escaped = escapeHtml(xml);

  const withComments = escaped.replace(/\u0001!--[\s\S]*?--\u0002/g, (match) => `\u0003${match}\u0004`);

  const tagged = withComments.replace(
    /\u0001(\/?)([\w:.-]+)([^\u0002]*?)(\/?)\u0002/g,
    (match, closing, name, rest, selfClosing) => {
      const attrsHighlighted = rest.replace(
        /([\w:.-]+)(=)("[^"]*"|'[^']*')/g,
        (_m: string, attrName: string, eq: string, value: string) =>
          `<span class="tok-key">${attrName}</span>${eq}<span class="tok-string">${value}</span>`
      );
      return `\u0005${closing}<span class="tok-boolean">${name}</span>${attrsHighlighted}${selfClosing}\u0006`;
    }
  );

  return restoreBrackets(tagged)
    .replace(/\u0003/g, '<span class="tok-null">')
    .replace(/\u0004/g, "</span>")
    .replace(/\u0005/g, "&lt;")
    .replace(/\u0006/g, "&gt;");
}

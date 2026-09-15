"use client";

import { useEffect, useState } from "react";
import { CodeEditor } from "@/components/code-editor";
import { byteSize } from "@/lib/json-utils";
import { markdownToHtml } from "@/lib/markdown-utils";

const SAMPLE_MD = `# CodeSimplify

A **fast**, _free_, and privacy-friendly toolbox for developers.

## Features

- Client-side processing — nothing leaves your browser
- Hundreds of tools across JSON, CSS, JavaScript, and more
- Clean, modern, black-and-white design

## Example

\`\`\`js
console.log("Hello, CodeSimplify!");
\`\`\`

> Built for developers, by developers.

[Visit CodeSimplify](https://example.com)
`;

const PREVIEW_STYLES = `
  body { font-family: system-ui, sans-serif; margin: 0; padding: 24px; color: #111; line-height: 1.6; }
  h1, h2, h3, h4 { line-height: 1.3; margin-top: 1.4em; margin-bottom: 0.5em; }
  h1 { font-size: 28px; } h2 { font-size: 22px; } h3 { font-size: 18px; }
  p { margin: 0.8em 0; }
  a { color: #111; text-decoration: underline; }
  code { background: #f3f3f3; padding: 0.15em 0.4em; border-radius: 4px; font-size: 0.9em; }
  pre { background: #f3f3f3; padding: 12px 16px; border-radius: 8px; overflow: auto; }
  pre code { background: none; padding: 0; }
  blockquote { border-left: 3px solid #111; margin: 1em 0; padding: 0.2em 1em; color: #444; }
  table { border-collapse: collapse; width: 100%; margin: 1em 0; }
  th, td { border: 1px solid #ddd; padding: 6px 10px; text-align: left; }
  img { max-width: 100%; }
  hr { border: none; border-top: 1px solid #ddd; margin: 1.5em 0; }
`;

export function MarkdownPreviewTool() {
  const [input, setInput] = useState("");
  const [srcDoc, setSrcDoc] = useState("");

  useEffect(() => {
    let cancelled = false;
    markdownToHtml(input).then((html) => {
      if (!cancelled) {
        setSrcDoc(
          `<!DOCTYPE html><html><head><meta charset="utf-8"><style>${PREVIEW_STYLES}</style></head><body>${html}</body></html>`,
        );
      }
    });
    return () => {
      cancelled = true;
    };
  }, [input]);

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2 rounded-t-xl border border-b-0 border-border bg-surface px-3 py-2">
        <button onClick={() => setInput(SAMPLE_MD)} className="btn btn-secondary h-8 px-3 text-xs">
          Load sample
        </button>
        <button onClick={() => setInput("")} className="btn btn-secondary h-8 px-3 text-xs">
          Clear
        </button>
      </div>

      <div className="grid gap-0 rounded-b-xl border border-border sm:grid-cols-2">
        <div className="flex flex-col border-b border-border sm:border-b-0 sm:border-r">
          <div className="flex items-center justify-between border-b border-border px-3 py-1.5 text-xs text-muted">
            <span>Markdown source</span>
            <span>{byteSize(input).toLocaleString()} bytes</span>
          </div>
          <CodeEditor value={input} onChange={setInput} language="markdown" placeholder="Type or paste Markdown here to preview it live..." height="24rem" />
        </div>
        <div className="flex flex-col">
          <div className="flex items-center justify-between border-b border-border px-3 py-1.5 text-xs text-muted">
            <span>Live preview</span>
            <span>Sandboxed — renders locally</span>
          </div>
          <iframe title="Markdown preview" srcDoc={srcDoc} sandbox="" className="h-96 w-full border-0 bg-white" />
        </div>
      </div>
    </div>
  );
}

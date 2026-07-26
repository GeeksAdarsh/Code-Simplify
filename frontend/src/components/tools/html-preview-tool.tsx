"use client";

import { useMemo, useState } from "react";
import { CodeEditor } from "@/components/code-editor";
import { byteSize } from "@/lib/json-utils";

const SAMPLE_HTML = `<!DOCTYPE html>
<html>
  <head>
    <style>
      body { font-family: system-ui, sans-serif; margin: 0; padding: 24px; background: #fafafa; color: #111; }
      h1 { font-size: 24px; margin: 0 0 8px; }
      p { color: #555; line-height: 1.5; }
      .badge { display: inline-block; padding: 4px 10px; border: 1px solid #111; border-radius: 999px; font-size: 12px; font-weight: 600; }
      button { margin-top: 12px; padding: 8px 16px; border: 1px solid #111; background: #111; color: #fff; border-radius: 6px; cursor: pointer; font-size: 14px; }
    </style>
  </head>
  <body>
    <span class="badge">CodeSimplify</span>
    <h1>Live HTML Preview</h1>
    <p>Edit the HTML on the left and watch this preview update instantly \u2014 all rendering happens locally in your browser.</p>
    <button onclick="alert('Hello from your preview!')">Click me</button>
  </body>
</html>`;

type ViewMode = "preview" | "code";
type DeviceWidth = "full" | "tablet" | "mobile";

const DEVICE_WIDTHS: Record<DeviceWidth, string> = {
  full: "100%",
  tablet: "768px",
  mobile: "390px",
};

export function HtmlPreviewTool() {
  const [input, setInput] = useState("");
  const [mobileView, setMobileView] = useState<ViewMode>("preview");
  const [deviceWidth, setDeviceWidth] = useState<DeviceWidth>("full");

  const srcDoc = useMemo(() => input, [input]);

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2 rounded-t-xl border border-b-0 border-border bg-surface px-3 py-2">
        <button onClick={() => setInput(SAMPLE_HTML)} className="btn btn-secondary h-8 px-3 text-xs">
          Load sample
        </button>
        <button onClick={() => setInput("")} className="btn btn-secondary h-8 px-3 text-xs">
          Clear
        </button>
        <div className="flex items-center gap-1 sm:hidden">
          <button
            onClick={() => setMobileView("code")}
            className={`h-8 rounded-md px-3 text-xs font-medium ${mobileView === "code" ? "bg-foreground text-background" : "text-muted"}`}
          >
            Code
          </button>
          <button
            onClick={() => setMobileView("preview")}
            className={`h-8 rounded-md px-3 text-xs font-medium ${mobileView === "preview" ? "bg-foreground text-background" : "text-muted"}`}
          >
            Preview
          </button>
        </div>
        <label className="ml-auto flex items-center gap-1.5 text-xs text-muted">
          Viewport
          <select
            value={deviceWidth}
            onChange={(e) => setDeviceWidth(e.target.value as DeviceWidth)}
            className="rounded border border-border bg-background px-1.5 py-1 text-foreground"
          >
            <option value="full">Full width</option>
            <option value="tablet">Tablet (768px)</option>
            <option value="mobile">Mobile (390px)</option>
          </select>
        </label>
      </div>

      <div className="grid gap-0 rounded-b-xl border border-border sm:grid-cols-2">
        <div className={`flex flex-col border-b border-border sm:border-b-0 sm:border-r ${mobileView === "code" ? "" : "hidden sm:flex"}`}>
          <div className="flex items-center justify-between border-b border-border px-3 py-1.5 text-xs text-muted">
            <span>HTML source</span>
            <span>{byteSize(input).toLocaleString()} bytes</span>
          </div>
          <CodeEditor value={input} onChange={setInput} language="html" placeholder="Type or paste HTML here to preview it live..." height="24rem" />
        </div>
        <div className={`flex flex-col ${mobileView === "preview" ? "" : "hidden sm:flex"}`}>
          <div className="flex items-center justify-between border-b border-border px-3 py-1.5 text-xs text-muted">
            <span>Live preview</span>
            <span>Sandboxed \u2014 renders locally</span>
          </div>
          <div className="flex h-96 w-full items-start justify-center overflow-auto bg-white p-0">
            <iframe
              title="HTML preview"
              srcDoc={srcDoc}
              sandbox="allow-scripts allow-modals"
              style={{ width: DEVICE_WIDTHS[deviceWidth], height: "100%" }}
              className="h-full border-0 bg-white transition-[width] duration-150"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

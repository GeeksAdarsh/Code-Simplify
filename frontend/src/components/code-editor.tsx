"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import type { OnMount } from "@monaco-editor/react";

const MonacoEditor = dynamic(() => import("@monaco-editor/react"), {
  ssr: false,
  loading: () => <div className="flex h-full items-center justify-center text-xs text-muted">Loading editor&hellip;</div>,
});

interface CodeEditorProps {
  value: string;
  onChange?: (value: string) => void;
  language?: string;
  readOnly?: boolean;
  height?: string | number;
  placeholder?: string;
  className?: string;
}

function useIsDarkMode(): boolean {
  const [isDark, setIsDark] = useState(false);
  useEffect(() => {
    const check = () => setIsDark(document.documentElement.classList.contains("dark"));
    check();
    const observer = new MutationObserver(check);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);
  return isDark;
}

export function CodeEditor({
  value,
  onChange,
  language = "json",
  readOnly = false,
  height = "var(--tool-workspace-height)",
  placeholder,
  className,
}: CodeEditorProps) {
  const isDark = useIsDarkMode();
  const [contentLeft, setContentLeft] = useState<number | null>(null);

  const handleMount: OnMount = (editorInstance) => {
    const update = () => setContentLeft(editorInstance.getLayoutInfo().contentLeft);
    update();
    const sub = editorInstance.onDidLayoutChange(update);
    editorInstance.onDidDispose(() => sub.dispose());
  };

  return (
    <div className={`relative overflow-hidden ${className ?? ""}`} style={{ height }}>
      <MonacoEditor
        height="100%"
        value={value}
        language={language}
        theme={isDark ? "vs-dark" : "light"}
        onChange={(v) => onChange?.(v ?? "")}
        onMount={handleMount}
        options={{
          readOnly,
          minimap: { enabled: false },
          fontSize: 13,
          fontFamily: "var(--font-geist-mono), ui-monospace, monospace",
          scrollBeyondLastLine: false,
          automaticLayout: true,
          wordWrap: "on",
          tabSize: 2,
          renderLineHighlight: readOnly ? "none" : "line",
          padding: { top: 12, bottom: 12 },
          overviewRulerLanes: 0,
          scrollbar: {
            verticalScrollbarSize: 8,
            horizontalScrollbarSize: 8,
            alwaysConsumeMouseWheel: false,
          },
        }}
      />
      {!value && placeholder && contentLeft !== null && (
        <div
          className="pointer-events-none absolute top-3 select-none truncate pr-4 text-sm italic text-muted/70"
          style={{ left: contentLeft, right: 0 }}
        >
          {placeholder}
        </div>
      )}
    </div>
  );
}

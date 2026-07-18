"use client";

import { type ReactNode, useState } from "react";

interface CssGeneratorLayoutProps {
  controls: ReactNode;
  preview: ReactNode;
  code: string;
  codeFilename?: string;
}

export function CssGeneratorLayout({ controls, preview, code, codeFilename = "style.css" }: CssGeneratorLayoutProps) {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    if (!code) return;
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  function handleDownload() {
    if (!code) return;
    const blob = new Blob([code], { type: "text/css" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = codeFilename;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="grid gap-4 lg:grid-cols-[minmax(0,300px)_1fr]">
      <div className="rounded-xl border border-border bg-surface p-4">
        <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted">Controls</h3>
        <div className="flex flex-col gap-4">{controls}</div>
      </div>

      <div className="flex flex-col gap-4">
        <div
          className="flex min-h-[280px] items-center justify-center overflow-auto rounded-xl border border-border p-6"
          style={{
            backgroundImage:
              "linear-gradient(45deg, #f3f3f3 25%, transparent 25%), linear-gradient(-45deg, #f3f3f3 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #f3f3f3 75%), linear-gradient(-45deg, transparent 75%, #f3f3f3 75%)",
            backgroundSize: "20px 20px",
            backgroundPosition: "0 0, 0 10px, 10px -10px, -10px 0px",
            backgroundColor: "#ffffff",
          }}
        >
          {preview}
        </div>

        <div className="flex flex-col rounded-xl border border-border">
          <div className="flex items-center justify-between border-b border-border px-3 py-1.5 text-xs text-muted">
            <span>Generated CSS</span>
            <div className="flex items-center gap-3">
              <button onClick={handleCopy} className="font-medium text-foreground">
                {copied ? "Copied!" : "Copy"}
              </button>
              <button onClick={handleDownload} className="font-medium text-foreground">
                Download
              </button>
            </div>
          </div>
          <pre className="max-h-64 overflow-auto whitespace-pre-wrap p-3 font-mono text-sm">{code}</pre>
        </div>
      </div>
    </div>
  );
}

export function ControlRow({ label, value, children }: { label: string; value?: ReactNode; children: ReactNode }) {
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between text-xs">
        <span className="text-muted">{label}</span>
        {value !== undefined && <span className="font-mono text-foreground">{value}</span>}
      </div>
      {children}
    </div>
  );
}

export function RangeInput({
  min,
  max,
  step = 1,
  value,
  onChange,
}: {
  min: number;
  max: number;
  step?: number;
  value: number;
  onChange: (value: number) => void;
}) {
  return (
    <input
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      style={{ accentColor: "var(--accent)" }}
      className="h-1.5 w-full cursor-pointer"
    />
  );
}

export function SelectInput<T extends string>({
  value,
  onChange,
  options,
}: {
  value: T;
  onChange: (value: T) => void;
  options: { value: T; label: string }[];
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value as T)}
      className="w-full rounded border border-border bg-background px-2 py-1.5 text-sm text-foreground"
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}

export function ColorInput({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  return (
    <div className="flex items-center gap-2">
      <input
        type="color"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-8 w-10 cursor-pointer rounded border border-border bg-background"
      />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded border border-border bg-background px-2 py-1.5 font-mono text-sm text-foreground"
      />
    </div>
  );
}

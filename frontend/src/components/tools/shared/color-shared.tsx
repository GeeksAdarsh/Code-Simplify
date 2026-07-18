"use client";

import { useState } from "react";
import type { RGB } from "@/lib/color-utils";

export function CopyField({ label, value }: { label: string; value: string }) {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    if (!value) return;
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-2.5 last:border-b-0">
      <div className="min-w-0">
        <p className="text-xs text-muted">{label}</p>
        <p className="truncate font-mono text-sm">{value || "\u2014"}</p>
      </div>
      <button
        onClick={handleCopy}
        disabled={!value}
        className="shrink-0 text-xs font-medium text-foreground disabled:text-muted"
      >
        {copied ? "Copied!" : "Copy"}
      </button>
    </div>
  );
}

export function Swatch({
  hex,
  size = "h-24 w-full",
  label,
}: {
  hex: string;
  size?: string;
  label?: string;
}) {
  return (
    <div>
      <div
        className={`${size} rounded-lg border border-border`}
        style={{ backgroundColor: /^#[0-9a-fA-F]{6,8}$/.test(hex) ? hex : "transparent" }}
      />
      {label && <p className="mt-1.5 text-center font-mono text-xs text-muted">{label}</p>}
    </div>
  );
}

export interface ColorFormatField {
  label: string;
  placeholder: string;
  parse: (text: string) => RGB | null;
  format: (rgb: RGB) => string;
}

/** A two-way live converter between two color text formats, kept in sync through a shared RGB value. */
export function TwoWayConverter({ fieldA, fieldB }: { fieldA: ColorFormatField; fieldB: ColorFormatField }) {
  const [aText, setAText] = useState("");
  const [bText, setBText] = useState("");
  const [previewHex, setPreviewHex] = useState<string | null>(null);
  const [errorField, setErrorField] = useState<"a" | "b" | null>(null);

  function toHexPreview(rgb: RGB) {
    const clamp = (n: number) => Math.min(255, Math.max(0, Math.round(n)));
    const toHex = (n: number) => clamp(n).toString(16).padStart(2, "0");
    return `#${toHex(rgb.r)}${toHex(rgb.g)}${toHex(rgb.b)}`;
  }

  function handleAChange(text: string) {
    setAText(text);
    if (!text.trim()) {
      setBText("");
      setPreviewHex(null);
      setErrorField(null);
      return;
    }
    const rgb = fieldA.parse(text);
    if (rgb) {
      setBText(fieldB.format(rgb));
      setPreviewHex(toHexPreview(rgb));
      setErrorField(null);
    } else {
      setErrorField("a");
    }
  }

  function handleBChange(text: string) {
    setBText(text);
    if (!text.trim()) {
      setAText("");
      setPreviewHex(null);
      setErrorField(null);
      return;
    }
    const rgb = fieldB.parse(text);
    if (rgb) {
      setAText(fieldA.format(rgb));
      setPreviewHex(toHexPreview(rgb));
      setErrorField(null);
    } else {
      setErrorField("b");
    }
  }

  function loadSample() {
    const rgb: RGB = { r: 14, g: 165, b: 233 };
    setAText(fieldA.format(rgb));
    setBText(fieldB.format(rgb));
    setPreviewHex(toHexPreview(rgb));
    setErrorField(null);
  }

  function clear() {
    setAText("");
    setBText("");
    setPreviewHex(null);
    setErrorField(null);
  }

  return (
    <div>
      <div className="mb-3 flex gap-2">
        <button onClick={loadSample} className="btn btn-secondary h-8 px-3 text-xs">
          Load sample
        </button>
        <button onClick={clear} className="btn btn-secondary h-8 px-3 text-xs">
          Clear
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-[1fr_1fr_auto]">
        <label className="block text-xs">
          <span className="mb-1 block text-muted">{fieldA.label}</span>
          <input
            value={aText}
            onChange={(e) => handleAChange(e.target.value)}
            placeholder={fieldA.placeholder}
            spellCheck={false}
            className={`w-full rounded border bg-background px-2.5 py-1.5 font-mono text-sm outline-none focus:border-foreground ${
              errorField === "a" ? "border-foreground/50" : "border-border"
            }`}
          />
        </label>
        <label className="block text-xs">
          <span className="mb-1 block text-muted">{fieldB.label}</span>
          <input
            value={bText}
            onChange={(e) => handleBChange(e.target.value)}
            placeholder={fieldB.placeholder}
            spellCheck={false}
            className={`w-full rounded border bg-background px-2.5 py-1.5 font-mono text-sm outline-none focus:border-foreground ${
              errorField === "b" ? "border-foreground/50" : "border-border"
            }`}
          />
        </label>
        <div>
          <span className="mb-1 block text-xs text-muted">Preview</span>
          <div
            className="h-9 w-16 rounded border border-border"
            style={{ backgroundColor: previewHex ?? "transparent" }}
          />
        </div>
      </div>

      {errorField && (
        <p className="mt-2 text-xs text-muted">
          Could not parse that {errorField === "a" ? fieldA.label : fieldB.label} value.
        </p>
      )}
    </div>
  );
}

export function SwatchButton({
  hex,
  active,
  onClick,
}: {
  hex: string;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      title={hex}
      className={`h-10 w-10 shrink-0 rounded-lg border transition-transform ${active ? "scale-110 border-foreground" : "border-border hover:scale-105"}`}
      style={{ backgroundColor: hex }}
    />
  );
}

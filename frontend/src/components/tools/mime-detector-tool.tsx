"use client";

import { useCallback, useRef, useState } from "react";
import { bytesToHexPreview, detectMimeFromBytes, type MagicSignature } from "@/lib/mime-data";

export function MimeDetectorTool() {
  const [fileName, setFileName] = useState<string | null>(null);
  const [fileSize, setFileSize] = useState<number | null>(null);
  const [browserType, setBrowserType] = useState<string | null>(null);
  const [matches, setMatches] = useState<MagicSignature[] | null>(null);
  const [hexPreview, setHexPreview] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback((file: File) => {
    setFileName(file.name);
    setFileSize(file.size);
    setBrowserType(file.type || null);

    const reader = new FileReader();
    reader.onload = () => {
      const buffer = reader.result as ArrayBuffer;
      const bytes = new Uint8Array(buffer);
      setMatches(detectMimeFromBytes(bytes));
      setHexPreview(bytesToHexPreview(bytes));
    };
    reader.readAsArrayBuffer(file.slice(0, 512));
  }, []);

  return (
    <div>
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          const file = e.dataTransfer.files?.[0];
          if (file) handleFile(file);
        }}
        onClick={() => inputRef.current?.click()}
        className={`card flex cursor-pointer flex-col items-center gap-2 border-dashed py-12 text-center transition-colors ${dragOver ? "border-foreground" : ""}`}
      >
        <p className="text-sm font-medium">Drop a file here, or click to choose one</p>
        <p className="text-xs text-muted">The file is read locally in your browser and never uploaded anywhere.</p>
        <input
          ref={inputRef}
          type="file"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleFile(file);
          }}
        />
      </div>

      {fileName && (
        <div className="mt-4 space-y-4">
          <div className="card overflow-hidden p-0">
            <div className="flex items-center justify-between gap-4 border-b border-border px-4 py-2.5 text-sm">
              <span className="text-muted">File name</span>
              <span className="truncate font-mono">{fileName}</span>
            </div>
            <div className="flex items-center justify-between gap-4 border-b border-border px-4 py-2.5 text-sm">
              <span className="text-muted">Size</span>
              <span className="font-mono">{fileSize?.toLocaleString()} bytes</span>
            </div>
            <div className="flex items-center justify-between gap-4 px-4 py-2.5 text-sm">
              <span className="text-muted">Browser-reported type</span>
              <span className="font-mono">{browserType || "(none — often empty for unknown extensions)"}</span>
            </div>
          </div>

          <div>
            <p className="mb-2 text-sm font-medium">Detected from file content (magic bytes)</p>
            {matches && matches.length === 0 && (
              <div className="card px-4 py-3 text-sm text-muted">No known magic-byte signature matched — this may be a plain text file, an uncommon format, or the content doesn&apos;t start with a recognizable header.</div>
            )}
            {matches && matches.length > 0 && (
              <ul className="divide-y divide-border rounded-lg border border-border">
                {matches.map((m) => (
                  <li key={m.mimeType} className="flex items-center justify-between gap-4 px-4 py-2.5 text-sm">
                    <span className="font-mono">{m.mimeType}</span>
                    <span className="text-muted">{m.description}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="card p-0">
            <div className="border-b border-border px-3 py-1.5 text-xs text-muted">First bytes (hex)</div>
            <p className="break-all p-3 font-mono text-xs">{hexPreview}</p>
          </div>
        </div>
      )}
    </div>
  );
}

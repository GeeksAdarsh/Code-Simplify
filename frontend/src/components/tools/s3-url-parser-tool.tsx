"use client";

import { useMemo, useState } from "react";
import { buildS3Urls, parseS3Url } from "@/lib/aws-utils";

export function S3UrlParserTool() {
  const [url, setUrl] = useState("");
  const [copied, setCopied] = useState<string | null>(null);

  const [bucket, setBucket] = useState("");
  const [key, setKey] = useState("");
  const [region, setRegion] = useState("us-east-1");

  const parsed = useMemo(() => (url.trim() ? parseS3Url(url) : null), [url]);

  const generated = useMemo(() => (bucket.trim() ? buildS3Urls(bucket.trim(), key.trim(), region.trim()) : []), [bucket, key, region]);

  function copy(text: string) {
    navigator.clipboard.writeText(text);
    setCopied(text);
    setTimeout(() => setCopied(null), 1500);
  }

  return (
    <div className="space-y-8">
      <section>
        <h3 className="mb-3 text-sm font-semibold">Parse an S3 URL</h3>
        <input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="s3://my-bucket/path/to/file.jpg or https://my-bucket.s3.amazonaws.com/path/to/file.jpg"
          spellCheck={false}
          className="w-full rounded-lg border border-border bg-background px-3 py-2.5 font-mono text-sm outline-none focus:border-foreground"
        />
        <div className="mt-4">
          {!parsed && <div className="card px-4 py-3 text-sm text-muted">Paste an S3 URL above to break it into bucket, key, and region.</div>}
          {parsed && "error" in parsed && (
            <div className="card border-foreground/30 px-4 py-3 text-sm">
              <span className="badge border-foreground text-foreground">Not recognized</span>
              <p className="mt-2 text-muted">{parsed.error}</p>
            </div>
          )}
          {parsed && !("error" in parsed) && (
            <div className="card overflow-hidden p-0">
              <div className="flex items-center justify-between gap-4 border-b border-border px-4 py-2.5 text-sm">
                <span className="text-muted">Bucket</span>
                <span className="font-mono">{parsed.bucket}</span>
              </div>
              <div className="flex items-center justify-between gap-4 border-b border-border px-4 py-2.5 text-sm">
                <span className="text-muted">Key</span>
                <span className="break-all font-mono">{parsed.key || "(none)"}</span>
              </div>
              <div className="flex items-center justify-between gap-4 px-4 py-2.5 text-sm">
                <span className="text-muted">Region</span>
                <span className="font-mono">{parsed.region ?? "us-east-1 (default)"}</span>
              </div>
            </div>
          )}
        </div>
      </section>

      <section>
        <h3 className="mb-3 text-sm font-semibold">Build S3 URLs from bucket &amp; key</h3>
        <div className="grid gap-3 sm:grid-cols-3">
          <label className="block text-xs">
            <span className="mb-1 block text-muted">Bucket</span>
            <input value={bucket} onChange={(e) => setBucket(e.target.value)} placeholder="my-app-bucket" className="w-full rounded border border-border bg-background px-2.5 py-1.5 text-sm outline-none focus:border-foreground" />
          </label>
          <label className="block text-xs">
            <span className="mb-1 block text-muted">Key / path</span>
            <input value={key} onChange={(e) => setKey(e.target.value)} placeholder="uploads/photo.jpg" className="w-full rounded border border-border bg-background px-2.5 py-1.5 text-sm outline-none focus:border-foreground" />
          </label>
          <label className="block text-xs">
            <span className="mb-1 block text-muted">Region</span>
            <input value={region} onChange={(e) => setRegion(e.target.value)} placeholder="us-east-1" className="w-full rounded border border-border bg-background px-2.5 py-1.5 text-sm outline-none focus:border-foreground" />
          </label>
        </div>

        {generated.length > 0 && (
          <ul className="mt-4 divide-y divide-border rounded-lg border border-border">
            {generated.map((g) => (
              <li key={g.label} className="flex items-center justify-between gap-4 px-3 py-2.5 text-sm">
                <div className="min-w-0">
                  <p className="text-xs text-muted">{g.label}</p>
                  <p className="truncate font-mono">{g.url}</p>
                </div>
                <button onClick={() => copy(g.url)} className="btn btn-secondary h-7 shrink-0 px-2.5 text-xs">
                  {copied === g.url ? "Copied!" : "Copy"}
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

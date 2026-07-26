"use client";

import { useEffect, useState } from "react";
import { CodeEditor } from "@/components/code-editor";
import { countTokens, EMBEDDING_MODELS } from "@/lib/tokenizer-utils";

const SAMPLE = `CodeSimplify is a free online suite of developer tools for formatting, validating, and converting JSON, YAML, SQL, and more.`;

export function EmbeddingTokenCounterTool() {
  const [input, setInput] = useState("");
  const [modelId, setModelId] = useState(EMBEDDING_MODELS[0].id);
  const [tokenCount, setTokenCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const model = EMBEDDING_MODELS.find((m) => m.id === modelId) ?? EMBEDDING_MODELS[0];

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    countTokens(input, model.encoding)
      .then((count) => {
        if (!cancelled) setTokenCount(count);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [input, model.encoding]);

  const limit = model.maxOutputTokens ?? 8191;
  const withinLimit = tokenCount !== null ? tokenCount <= limit : true;
  const percent = tokenCount !== null ? (tokenCount / limit) * 100 : 0;

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2 rounded-t-xl border border-b-0 border-border bg-surface px-3 py-2">
        <button onClick={() => setInput(SAMPLE)} className="btn btn-secondary h-8 px-3 text-xs">
          Load sample
        </button>
        <button onClick={() => setInput("")} className="btn btn-secondary h-8 px-3 text-xs">
          Clear
        </button>
        <label className="ml-auto flex items-center gap-1.5 text-xs text-muted">
          Embedding model
          <select value={modelId} onChange={(e) => setModelId(e.target.value)} className="rounded border border-border bg-background px-1.5 py-1 text-foreground">
            {EMBEDDING_MODELS.map((m) => (
              <option key={m.id} value={m.id}>
                {m.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="rounded-b-xl border border-border">
        <CodeEditor value={input} onChange={setInput} language="plaintext" placeholder="Paste the text you plan to embed here..." height="18rem" />
      </div>

      <div className="mt-4">
        <div
          className={`card flex flex-wrap items-center gap-4 px-4 py-3 text-sm ${withinLimit ? "border-foreground/30" : ""}`}
        >
          <span className={`badge ${withinLimit ? "border-foreground text-foreground" : "border-foreground text-foreground"}`}>
            {loading ? "Counting\u2026" : withinLimit ? "Within limit \u2713" : "Exceeds limit \u2717"}
          </span>
          <span className="text-muted">
            {tokenCount?.toLocaleString() ?? 0} / {limit.toLocaleString()} tokens
          </span>
        </div>
        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-border">
          <div className="h-full bg-foreground" style={{ width: `${Math.min(100, percent)}%` }} />
        </div>
      </div>

      {!withinLimit && (
        <p className="mt-3 text-sm text-muted">
          This input exceeds the {limit.toLocaleString()}-token limit for {model.label}. Split it into smaller chunks
          before generating embeddings.
        </p>
      )}

      <p className="mt-4 text-xs text-muted">
        {model.label} uses the same <code className="font-mono">cl100k_base</code> tokenizer as GPT-4 / GPT-3.5, so
        this count matches exactly what OpenAI&apos;s embeddings API will bill and enforce. Everything runs locally in
        your browser.
      </p>
    </div>
  );
}

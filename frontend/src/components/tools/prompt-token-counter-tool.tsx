"use client";

import { useEffect, useState } from "react";
import { CHAT_MODELS, countTokens } from "@/lib/tokenizer-utils";

const SAMPLE = `You are a helpful assistant that summarizes long documents into three concise bullet points, written in a neutral and professional tone.`;

export function PromptTokenCounterTool() {
  const [input, setInput] = useState("");
  const [modelId, setModelId] = useState(CHAT_MODELS[0].id);
  const [tokenCount, setTokenCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const model = CHAT_MODELS.find((m) => m.id === modelId) ?? CHAT_MODELS[0];

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

  const charCount = input.length;
  const wordCount = input.trim() ? input.trim().split(/\s+/).length : 0;
  const percentOfContext = model.contextWindow && tokenCount !== null ? (tokenCount / model.contextWindow) * 100 : null;

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
          Model
          <select value={modelId} onChange={(e) => setModelId(e.target.value)} className="rounded border border-border bg-background px-1.5 py-1 text-foreground">
            {CHAT_MODELS.map((m) => (
              <option key={m.id} value={m.id}>
                {m.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="rounded-b-xl border border-border">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Paste your prompt here to count tokens..."
          spellCheck={false}
          className="h-72 w-full resize-none bg-background p-3 font-mono text-sm outline-none"
        />
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-4">
        <div className="card px-4 py-3 text-center">
          <p className="text-2xl font-semibold tabular-nums">{loading ? "\u2026" : tokenCount ?? 0}</p>
          <p className="mt-1 text-xs text-muted">Tokens ({model.encoding})</p>
        </div>
        <div className="card px-4 py-3 text-center">
          <p className="text-2xl font-semibold tabular-nums">{charCount}</p>
          <p className="mt-1 text-xs text-muted">Characters</p>
        </div>
        <div className="card px-4 py-3 text-center">
          <p className="text-2xl font-semibold tabular-nums">{wordCount}</p>
          <p className="mt-1 text-xs text-muted">Words</p>
        </div>
        <div className="card px-4 py-3 text-center">
          <p className="text-2xl font-semibold tabular-nums">{tokenCount ? (charCount / tokenCount).toFixed(2) : "\u2014"}</p>
          <p className="mt-1 text-xs text-muted">Chars / token</p>
        </div>
      </div>

      {model.contextWindow && (
        <div className="mt-4">
          <div className="flex items-center justify-between text-xs text-muted">
            <span>Context window usage ({model.label})</span>
            <span>
              {tokenCount?.toLocaleString() ?? 0} / {model.contextWindow.toLocaleString()} ({percentOfContext?.toFixed(2) ?? 0}%)
            </span>
          </div>
          <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-border">
            <div className="h-full bg-foreground" style={{ width: `${Math.min(100, percentOfContext ?? 0)}%` }} />
          </div>
        </div>
      )}

      <p className="mt-4 text-xs text-muted">
        Uses the exact same byte-pair encoding (via the <code className="font-mono">gpt-tokenizer</code> library) that
        OpenAI&apos;s API uses to bill and limit context \u2014 not an approximation. Everything runs locally in your
        browser.
      </p>
    </div>
  );
}

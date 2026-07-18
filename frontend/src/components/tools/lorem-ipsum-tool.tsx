"use client";

import { useEffect, useState } from "react";
import { generateLoremIpsum, type LoremUnit } from "@/lib/text-utils";

export function LoremIpsumTool() {
  const [count, setCount] = useState(3);
  const [unit, setUnit] = useState<LoremUnit>("paragraphs");
  const [startWithLorem, setStartWithLorem] = useState(true);
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);

  function regenerate() {
    setOutput(generateLoremIpsum(count, unit, startWithLorem));
  }

  useEffect(() => {
    regenerate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count, unit, startWithLorem]);

  function handleCopy() {
    if (!output) return;
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div>
      <div className="flex flex-wrap items-end gap-4">
        <label className="block text-xs">
          <span className="mb-1 block text-muted">Count</span>
          <input
            type="number"
            min={1}
            max={50}
            value={count}
            onChange={(e) => setCount(Math.min(50, Math.max(1, Number(e.target.value) || 1)))}
            className="w-24 rounded border border-border bg-background px-2.5 py-1.5 text-sm outline-none focus:border-foreground"
          />
        </label>
        <label className="block text-xs">
          <span className="mb-1 block text-muted">Unit</span>
          <select
            value={unit}
            onChange={(e) => setUnit(e.target.value as LoremUnit)}
            className="rounded border border-border bg-background px-2.5 py-1.5 text-sm"
          >
            <option value="words">Words</option>
            <option value="sentences">Sentences</option>
            <option value="paragraphs">Paragraphs</option>
          </select>
        </label>
        <label className="flex items-center gap-1.5 pb-2 text-xs">
          <input type="checkbox" checked={startWithLorem} onChange={(e) => setStartWithLorem(e.target.checked)} />
          Start with &quot;Lorem ipsum...&quot;
        </label>
        <button onClick={regenerate} className="btn btn-primary h-9 px-4 text-sm">
          Regenerate
        </button>
      </div>

      <div className="mt-4 card p-0">
        <div className="flex items-center justify-between border-b border-border px-3 py-1.5 text-xs text-muted">
          <span>Generated text</span>
          <button onClick={handleCopy} disabled={!output} className="font-medium text-foreground disabled:text-muted">
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
        <textarea
          value={output}
          readOnly
          spellCheck={false}
          className="h-72 w-full resize-none bg-background p-3 text-sm outline-none"
        />
      </div>
    </div>
  );
}

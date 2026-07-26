"use client";

import { useState } from "react";
import { CodeEditor } from "@/components/code-editor";
import { generateSecretSantaPairs, type SecretSantaPair } from "@/lib/decision-utils";

const SAMPLE_NAMES = "Alex\nJordan\nTaylor\nMorgan\nCasey\nRiley";

export function SecretSantaTool() {
  const [namesText, setNamesText] = useState(SAMPLE_NAMES);
  const [pairs, setPairs] = useState<SecretSantaPair[]>([]);
  const [revealed, setRevealed] = useState<Set<number>>(new Set());

  const names = namesText
    .split("\n")
    .map((n) => n.trim())
    .filter(Boolean);

  const duplicates = names.length !== new Set(names.map((n) => n.toLowerCase())).size;

  function generate() {
    if (names.length < 2 || duplicates) return;
    setPairs(generateSecretSantaPairs(names));
    setRevealed(new Set());
  }

  function toggleReveal(index: number) {
    setRevealed((prev) => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  }

  return (
    <div>
      <div className="card p-4">
        <label className="mb-1 block text-xs font-medium text-muted">Participant names (one per line)</label>
        <CodeEditor value={namesText} onChange={setNamesText} language="plaintext" height="10.5rem" className="rounded border border-border" />
        <div className="mt-3 flex flex-wrap items-center gap-4">
          <button onClick={generate} disabled={names.length < 2 || duplicates} className="btn btn-primary h-9 px-4 text-sm disabled:opacity-50">
            Generate Secret Santa Pairs
          </button>
          <p className="text-xs text-muted">{names.length} participant(s)</p>
        </div>
        {duplicates && <p className="mt-2 text-xs text-muted">Names must be unique \u2014 remove or rename duplicates.</p>}
        {names.length < 2 && <p className="mt-2 text-xs text-muted">Enter at least 2 names.</p>}
      </div>

      {pairs.length > 0 && (
        <>
          <p className="mt-4 text-center text-xs text-muted">
            Pass the device around \u2014 each person taps only their own card to reveal who they&apos;re gifting, then taps again to hide it.
          </p>
          <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {pairs.map((pair, i) => {
              const isRevealed = revealed.has(i);
              return (
                <button
                  key={i}
                  onClick={() => toggleReveal(i)}
                  className={`card flex min-h-24 flex-col items-center justify-center gap-1 p-4 text-center transition-colors ${
                    isRevealed ? "border-foreground/40 bg-surface" : ""
                  }`}
                >
                  <span className="text-sm font-semibold">{pair.giver}</span>
                  {isRevealed ? (
                    <span className="text-xs text-muted">
                      gifts <span className="font-medium text-foreground">{pair.receiver}</span>
                    </span>
                  ) : (
                    <span className="text-xs text-muted">Tap to reveal</span>
                  )}
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}

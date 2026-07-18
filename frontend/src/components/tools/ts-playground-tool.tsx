"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { byteSize } from "@/lib/json-utils";
import { transpileTypeScript } from "@/lib/ts-utils";

const SAMPLE_TS = `interface Point {
  x: number;
  y: number;
}

function distance(a: Point, b: Point): number {
  return Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);
}

const origin: Point = { x: 0, y: 0 };
const target: Point = { x: 3, y: 4 };

console.log("Distance:", distance(origin, target));

enum Direction {
  Up,
  Down,
  Left,
  Right,
}

console.log("Direction.Left =", Direction.Left);
`;

interface LogEntry {
  level: "log" | "info" | "warn" | "error";
  text: string;
}

function buildSrcDoc(jsCode: string): string {
  const encoded = JSON.stringify(jsCode);
  return `<!DOCTYPE html><html><head><meta charset="utf-8"></head><body><script>
(function () {
  function send(level, args) {
    try {
      var text = args.map(function (a) {
        if (a instanceof Error) return a.name + ": " + a.message;
        if (typeof a === "object" && a !== null) { try { return JSON.stringify(a, null, 2); } catch (e) { return String(a); } }
        return String(a);
      }).join(" ");
      parent.postMessage({ source: "codesimplify-ts-playground", level: level, text: text }, "*");
    } catch (e) {}
  }
  ["log", "info", "warn", "error"].forEach(function (level) {
    console[level] = function () { send(level, Array.prototype.slice.call(arguments)); };
  });
  window.onerror = function (message) { send("error", [String(message)]); return true; };
  try {
    new Function(${encoded})();
  } catch (e) {
    send("error", [(e && e.stack) ? e.stack : String(e)]);
  }
})();
</script></body></html>`;
}

const LEVEL_ICON: Record<LogEntry["level"], string> = {
  log: "\u203A",
  info: "\u203A",
  warn: "\u26A0",
  error: "\u2716",
};

export function TsPlaygroundTool() {
  const [code, setCode] = useState("");
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [srcDoc, setSrcDoc] = useState("");
  const [runKey, setRunKey] = useState(0);
  const [transpileError, setTranspileError] = useState("");
  const consoleEndRef = useRef<HTMLDivElement>(null);

  const handleMessage = useCallback((event: MessageEvent) => {
    const data = event.data as { source?: string; level?: LogEntry["level"]; text?: string } | undefined;
    if (!data || data.source !== "codesimplify-ts-playground" || !data.level) return;
    setLogs((prev) => [...prev, { level: data.level as LogEntry["level"], text: data.text ?? "" }]);
  }, []);

  useEffect(() => {
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [handleMessage]);

  useEffect(() => {
    consoleEndRef.current?.scrollIntoView({ block: "end" });
  }, [logs]);

  function handleRun() {
    setLogs([]);
    setTranspileError("");
    const { output, error } = transpileTypeScript(code);
    if (error) {
      setTranspileError(error);
      return;
    }
    setSrcDoc(buildSrcDoc(output));
    setRunKey((k) => k + 1);
  }

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2 rounded-t-xl border border-b-0 border-border bg-surface px-3 py-2">
        <button onClick={handleRun} className="btn btn-primary h-8 px-3 text-xs">
          Run
        </button>
        <button onClick={() => setCode(SAMPLE_TS)} className="btn btn-secondary h-8 px-3 text-xs">
          Load sample
        </button>
        <button
          onClick={() => {
            setCode("");
            setLogs([]);
            setSrcDoc("");
            setTranspileError("");
          }}
          className="btn btn-secondary h-8 px-3 text-xs"
        >
          Clear
        </button>
        <button onClick={() => setLogs([])} className="ml-auto btn btn-secondary h-8 px-3 text-xs">
          Clear console
        </button>
      </div>

      <div className="grid gap-0 rounded-b-xl border border-border sm:grid-cols-2">
        <div className="flex flex-col border-b border-border sm:border-b-0 sm:border-r">
          <div className="flex items-center justify-between border-b border-border px-3 py-1.5 text-xs text-muted">
            <span>TypeScript code</span>
            <span>{byteSize(code).toLocaleString()} bytes</span>
          </div>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Write TypeScript here, then click Run..."
            spellCheck={false}
            className="h-96 w-full resize-none bg-background p-3 font-mono text-sm outline-none"
          />
        </div>
        <div className="flex flex-col">
          <div className="flex items-center justify-between border-b border-border px-3 py-1.5 text-xs text-muted">
            <span>Console output</span>
            <span>Sandboxed \u2014 runs locally</span>
          </div>
          <div className="h-96 w-full overflow-auto bg-background p-3 font-mono text-sm">
            {logs.length === 0 && !transpileError && (
              <p className="text-muted">Click &quot;Run&quot; to transpile and execute your code and see console output here.</p>
            )}
            {logs.map((entry, i) => (
              <div key={i} className="whitespace-pre-wrap border-b border-border/50 py-1 text-foreground">
                <span className="mr-2 text-muted">{LEVEL_ICON[entry.level]}</span>
                {entry.text}
              </div>
            ))}
            <div ref={consoleEndRef} />
          </div>
          <iframe key={runKey} title="TS runtime" srcDoc={srcDoc} sandbox="allow-scripts" className="hidden" />
        </div>
      </div>

      {transpileError && (
        <div className="mt-3 rounded-lg border border-foreground/20 bg-surface px-4 py-3 text-sm">
          <p className="font-medium">Transpilation error</p>
          <p className="mt-1 whitespace-pre-wrap text-muted">{transpileError}</p>
        </div>
      )}
    </div>
  );
}

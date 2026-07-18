"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { byteSize } from "@/lib/json-utils";

const SAMPLE_JS = `function fib(n) {
  return n <= 1 ? n : fib(n - 1) + fib(n - 2);
}

for (let i = 0; i < 8; i++) {
  console.log(\`fib(\${i}) = \${fib(i)}\`);
}

console.log("Sum of 1..5:", [1, 2, 3, 4, 5].reduce((a, b) => a + b, 0));
`;

interface LogEntry {
  level: "log" | "info" | "warn" | "error";
  text: string;
}

function buildSrcDoc(code: string): string {
  const encoded = JSON.stringify(code);
  return `<!DOCTYPE html><html><head><meta charset="utf-8"></head><body><script>
(function () {
  function send(level, args) {
    try {
      var text = args.map(function (a) {
        if (a instanceof Error) return a.name + ": " + a.message;
        if (typeof a === "object" && a !== null) { try { return JSON.stringify(a, null, 2); } catch (e) { return String(a); } }
        return String(a);
      }).join(" ");
      parent.postMessage({ source: "codesimplify-js-playground", level: level, text: text }, "*");
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

const LEVEL_STYLES: Record<LogEntry["level"], string> = {
  log: "text-foreground",
  info: "text-muted",
  warn: "text-foreground",
  error: "text-foreground",
};

export function JsPlaygroundTool() {
  const [code, setCode] = useState("");
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [srcDoc, setSrcDoc] = useState("");
  const [runKey, setRunKey] = useState(0);
  const consoleEndRef = useRef<HTMLDivElement>(null);

  const handleMessage = useCallback((event: MessageEvent) => {
    const data = event.data as { source?: string; level?: LogEntry["level"]; text?: string } | undefined;
    if (!data || data.source !== "codesimplify-js-playground" || !data.level) return;
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
    setSrcDoc(buildSrcDoc(code));
    setRunKey((k) => k + 1);
  }

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2 rounded-t-xl border border-b-0 border-border bg-surface px-3 py-2">
        <button onClick={handleRun} className="btn btn-primary h-8 px-3 text-xs">
          Run
        </button>
        <button onClick={() => setCode(SAMPLE_JS)} className="btn btn-secondary h-8 px-3 text-xs">
          Load sample
        </button>
        <button
          onClick={() => {
            setCode("");
            setLogs([]);
            setSrcDoc("");
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
            <span>JavaScript code</span>
            <span>{byteSize(code).toLocaleString()} bytes</span>
          </div>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Write JavaScript here, then click Run..."
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
            {logs.length === 0 && <p className="text-muted">Click &quot;Run&quot; to execute your code and see console output here.</p>}
            {logs.map((entry, i) => (
              <div key={i} className={`whitespace-pre-wrap border-b border-border/50 py-1 ${LEVEL_STYLES[entry.level]}`}>
                <span className="mr-2 text-muted">{entry.level === "error" ? "\u2716" : entry.level === "warn" ? "\u26A0" : "\u203A"}</span>
                {entry.text}
              </div>
            ))}
            <div ref={consoleEndRef} />
          </div>
          <iframe key={runKey} title="JS runtime" srcDoc={srcDoc} sandbox="allow-scripts" className="hidden" />
        </div>
      </div>
    </div>
  );
}

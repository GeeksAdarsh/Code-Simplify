"use client";

import { useMemo, useState } from "react";
import { CodeEditor } from "@/components/code-editor";
import { lintDockerfile } from "@/lib/docker-utils";
import { LintResults } from "@/components/tools/shared/lint-results";

const SAMPLE = `FROM node:18
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
EXPOSE 3000
CMD npm start
`;

export function DockerfileLinterTool() {
  const [input, setInput] = useState("");

  const issues = useMemo(() => (input.trim() ? lintDockerfile(input) : null), [input]);

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2 rounded-t-xl border border-b-0 border-border bg-surface px-3 py-2">
        <button onClick={() => setInput(SAMPLE)} className="btn btn-secondary h-8 px-3 text-xs">
          Load sample
        </button>
        <button onClick={() => setInput("")} className="btn btn-secondary h-8 px-3 text-xs">
          Clear
        </button>
      </div>

      <div className="rounded-b-xl border border-border">
        <div className="flex items-center justify-between border-b border-border px-3 py-1.5 text-xs text-muted">
          <span>Dockerfile</span>
        </div>
        <CodeEditor value={input} onChange={setInput} language="dockerfile" placeholder="Paste your Dockerfile here..." height="24rem" />
      </div>

      <div className="mt-4">
        {!issues && <div className="card px-4 py-3 text-sm text-muted">Paste a Dockerfile above to lint it.</div>}
        {issues && <LintResults issues={issues} validLabel="No issues found" />}
      </div>
    </div>
  );
}

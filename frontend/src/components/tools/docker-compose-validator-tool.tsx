"use client";

import { useMemo, useState } from "react";
import { CodeEditor } from "@/components/code-editor";
import { validateDockerCompose } from "@/lib/docker-utils";
import { LintResults } from "@/components/tools/shared/lint-results";

const SAMPLE = `services:
  web:
    image: nginx:1.27
    ports:
      - "8080:80"
    environment:
      - NODE_ENV=production
    depends_on:
      - api

  api:
    build: ./api
    ports:
      - "3000:3000"
    volumes:
      - ./api:/app
    restart: unless-stopped

  db:
    image: postgres:16
    environment:
      POSTGRES_PASSWORD: example
    volumes:
      - db-data:/var/lib/postgresql/data

volumes:
  db-data:
`;

export function DockerComposeValidatorTool() {
  const [input, setInput] = useState("");

  const result = useMemo(() => (input.trim() ? validateDockerCompose(input) : null), [input]);

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
          <span>docker-compose.yml</span>
        </div>
        <CodeEditor value={input} onChange={setInput} language="yaml" placeholder="Paste your docker-compose.yml here..." height="24rem" />
      </div>

      <div className="mt-4">
        {!result && <div className="card px-4 py-3 text-sm text-muted">Paste a Compose file above to validate it.</div>}
        {result && (
          <>
            {result.serviceCount > 0 && (
              <p className="mb-3 text-sm text-muted">
                Found <span className="font-medium text-foreground">{result.serviceCount}</span> service{result.serviceCount === 1 ? "" : "s"}.
              </p>
            )}
            <LintResults issues={result.issues} validLabel="Valid Compose file" />
          </>
        )}
      </div>
    </div>
  );
}

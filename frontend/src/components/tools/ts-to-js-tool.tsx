"use client";

import { useCallback } from "react";
import { ConvertTool, type ConvertResult } from "@/components/tools/shared/convert-tool";
import { transpileTypeScript } from "@/lib/ts-utils";

const SAMPLE_TS = `interface User {
  id: number;
  name: string;
  email?: string;
}

function greet(user: User): string {
  const label = user.email ? \`\${user.name} <\${user.email}>\` : user.name;
  return "Hello, " + label + "!";
}

const users: User[] = [
  { id: 1, name: "Ann" },
  { id: 2, name: "Ben", email: "ben@example.com" },
];

users.forEach((u) => console.log(greet(u)));`;

export function TsToJsTool() {
  const convert = useCallback((input: string): ConvertResult => {
    return transpileTypeScript(input);
  }, []);

  return (
    <div>
      <ConvertTool
        sampleInput={SAMPLE_TS}
        convert={convert}
        inputLabel="TypeScript input"
        outputLabel="JavaScript output"
        inputPlaceholder="Paste your TypeScript here to transpile it to JavaScript..."
        outputPlaceholder="Transpiled JavaScript will appear here."
        downloadFilename="output.js"
        downloadMimeType="text/javascript"
      />
      <p className="mt-2 text-xs text-muted">
        Powered by the official TypeScript compiler (transpileModule) \u2014 type annotations, interfaces, and enums are
        stripped or compiled down, but this performs no type-checking. Use the TS Playground to catch runtime errors.
      </p>
    </div>
  );
}

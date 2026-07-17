"use client";

import { useCallback } from "react";
import { AsyncConvertTool, type ConvertResult } from "@/components/tools/shared/async-convert-tool";
import { formatTypeScript } from "@/lib/ts-utils";

const SAMPLE_TS = `interface User{id:number;name:string;email?:string}
function greet(user:User):string{const label=user.email?\`\${user.name} <\${user.email}>\`:user.name;return "Hello, "+label+"!"}
const users:User[]=[{id:1,name:"Ann"},{id:2,name:"Ben",email:"ben@example.com"}];
users.forEach(u=>console.log(greet(u)));`;

export function TsFormatterTool() {
  const convert = useCallback(async (input: string): Promise<ConvertResult> => {
    try {
      const output = await formatTypeScript(input);
      return { output };
    } catch (e) {
      return { output: "", error: e instanceof Error ? e.message : "Formatting failed. Check your TypeScript syntax." };
    }
  }, []);

  return (
    <AsyncConvertTool
      sampleInput={SAMPLE_TS}
      convert={convert}
      inputLabel="TypeScript input"
      outputLabel="Formatted output"
      inputPlaceholder="Paste your TypeScript here to format it..."
      outputPlaceholder="Formatted TypeScript will appear here."
      downloadFilename="formatted.ts"
      downloadMimeType="text/typescript"
    />
  );
}

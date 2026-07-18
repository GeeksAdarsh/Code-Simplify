import * as prettier from "prettier/standalone";
import * as estreePlugin from "prettier/plugins/estree";
import * as typescriptPlugin from "prettier/plugins/typescript";
import ts from "typescript";

export interface CodeResult {
  output: string;
  error?: string;
}

export async function formatTypeScript(code: string): Promise<string> {
  return prettier.format(code, {
    parser: "typescript",
    plugins: [typescriptPlugin, estreePlugin],
    semi: true,
    singleQuote: false,
    tabWidth: 2,
  });
}

export function transpileTypeScript(code: string): CodeResult {
  try {
    const result = ts.transpileModule(code, {
      compilerOptions: {
        module: ts.ModuleKind.ESNext,
        target: ts.ScriptTarget.ES2020,
        jsx: ts.JsxEmit.Preserve,
        removeComments: false,
      },
      reportDiagnostics: false,
    });
    return { output: result.outputText };
  } catch (e) {
    return { output: "", error: e instanceof Error ? e.message : "Transpilation failed. Check your TypeScript syntax." };
  }
}

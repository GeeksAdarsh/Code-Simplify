import type { LintIssue } from "@/lib/docker-utils";

function stripComment(line: string): string {
  let inSingle = false;
  let inDouble = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === "'" && !inDouble) inSingle = !inSingle;
    else if (ch === '"' && !inSingle) inDouble = !inDouble;
    else if (ch === "#" && !inSingle && !inDouble) return line.slice(0, i);
  }
  return line;
}

export function lintNginxConfig(text: string): LintIssue[] {
  const issues: LintIssue[] = [];
  const lines = text.split(/\r?\n/);
  const stack: { name: string; line: number }[] = [];
  let serverBlockDepth: number | null = null;
  let sawListenInCurrentServer = false;
  let braceBalance = 0;

  lines.forEach((rawLine, idx) => {
    const lineNo = idx + 1;
    const code = stripComment(rawLine).trim();
    if (!code) return;

    for (const ch of code) {
      if (ch === "{") braceBalance++;
      if (ch === "}") braceBalance--;
    }

    if (code.endsWith("{")) {
      const directiveMatch = /^(\w+)/.exec(code);
      const name = directiveMatch ? directiveMatch[1] : code.replace(/\{$/, "").trim();
      stack.push({ name, line: lineNo });
      if (name === "server") {
        serverBlockDepth = stack.length;
        sawListenInCurrentServer = false;
      }
      return;
    }

    if (code === "}" || /^\}\s*$/.test(code)) {
      const closed = stack.pop();
      if (!closed) {
        issues.push({ severity: "error", line: lineNo, message: "Unexpected closing brace \"}\" with no matching open block." });
      } else if (closed.name === "server") {
        if (!sawListenInCurrentServer) {
          issues.push({ severity: "warning", line: closed.line, message: 'server {} block has no "listen" directive.' });
        }
        serverBlockDepth = null;
      }
      return;
    }

    if (/^listen\s+/.test(code) && stack.length === serverBlockDepth) {
      sawListenInCurrentServer = true;
    }

    if (!code.endsWith(";") && !code.endsWith("{") && code !== "}") {
      issues.push({ severity: "error", line: lineNo, message: `Statement is missing a terminating semicolon: "${code}"` });
    }

    if (/^rewrite\s+/.test(code) && !/(last|break|redirect|permanent)\s*;?\s*$/.test(code)) {
      issues.push({ severity: "info", line: lineNo, message: "rewrite directive has no flag (last/break/redirect/permanent) \u2014 double check this is intentional." });
    }

    if (/^server_name\s+_?\s*;/.test(code) === false && /^server_name\s*;/.test(code)) {
      issues.push({ severity: "warning", line: lineNo, message: "server_name directive has no value." });
    }
  });

  for (const unclosed of stack) {
    issues.push({ severity: "error", line: unclosed.line, message: `Unclosed "${unclosed.name} {" block \u2014 no matching closing brace found.` });
  }

  if (braceBalance !== 0) {
    issues.push({ severity: "error", message: `Brace mismatch: ${braceBalance > 0 ? `${braceBalance} unclosed "{"` : `${-braceBalance} extra "}"`} found.` });
  }

  return issues;
}

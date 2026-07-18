import type { LintIssue } from "@/lib/docker-utils";

export const CSP_DIRECTIVES = [
  "default-src",
  "script-src",
  "style-src",
  "img-src",
  "font-src",
  "connect-src",
  "media-src",
  "object-src",
  "frame-src",
  "frame-ancestors",
  "worker-src",
  "manifest-src",
  "form-action",
  "base-uri",
  "child-src",
  "report-uri",
  "report-to",
  "upgrade-insecure-requests",
  "block-all-mixed-content",
] as const;

export type CspDirective = (typeof CSP_DIRECTIVES)[number];

export const CSP_KEYWORDS = ["'self'", "'none'", "'unsafe-inline'", "'unsafe-eval'", "'strict-dynamic'"];

export function buildCsp(values: Partial<Record<CspDirective, string>>): string {
  const parts: string[] = [];
  for (const directive of CSP_DIRECTIVES) {
    const value = values[directive]?.trim();
    if (!value) continue;
    if (directive === "upgrade-insecure-requests" || directive === "block-all-mixed-content") {
      parts.push(directive);
    } else {
      parts.push(`${directive} ${value}`);
    }
  }
  return parts.join("; ");
}

const DEPRECATED_DIRECTIVES = new Set(["referrer", "reflected-xss", "disown-opener"]);

export function validateCsp(header: string): { issues: LintIssue[]; directiveCount: number } {
  const issues: LintIssue[] = [];
  const seen = new Set<string>();
  const rawDirectives = header
    .split(";")
    .map((d) => d.trim())
    .filter(Boolean);

  if (rawDirectives.length === 0) {
    return { issues: [{ severity: "error", message: "Enter a Content-Security-Policy header value to validate." }], directiveCount: 0 };
  }

  let hasDefaultSrc = false;
  let hasScriptSrc = false;

  for (const raw of rawDirectives) {
    const [name, ...valueParts] = raw.split(/\s+/);
    const lower = name.toLowerCase();
    const value = valueParts.join(" ");

    if (seen.has(lower)) {
      issues.push({ severity: "warning", message: `Duplicate directive "${name}" \u2014 only the first occurrence is used by browsers.` });
    }
    seen.add(lower);

    if (lower === "default-src") hasDefaultSrc = true;
    if (lower === "script-src") hasScriptSrc = true;

    if (DEPRECATED_DIRECTIVES.has(lower)) {
      issues.push({ severity: "warning", message: `"${name}" is deprecated/non-standard and is ignored by modern browsers.` });
    } else if (!CSP_DIRECTIVES.includes(lower as CspDirective) && lower !== "sandbox" && lower !== "require-trusted-types-for" && lower !== "trusted-types") {
      issues.push({ severity: "info", message: `"${name}" is not a commonly recognized CSP directive \u2014 double check the spelling.` });
    }

    if (/(^|\s)\*(\s|$)/.test(` ${value} `) && lower !== "report-uri") {
      issues.push({ severity: "warning", message: `"${name}" allows "*" (any origin) \u2014 this significantly weakens the policy.` });
    }
    if (/unsafe-inline/.test(value) && (lower === "script-src" || lower === "default-src")) {
      issues.push({ severity: "warning", message: `"${name}" allows 'unsafe-inline' \u2014 this permits inline scripts and defeats much of CSP's XSS protection. Prefer nonces or hashes.` });
    }
    if (/unsafe-eval/.test(value) && (lower === "script-src" || lower === "default-src")) {
      issues.push({ severity: "warning", message: `"${name}" allows 'unsafe-eval' \u2014 this permits eval()/new Function() and increases XSS risk.` });
    }

    for (const word of valueParts) {
      if (/^(self|none|unsafe-inline|unsafe-eval|strict-dynamic)$/i.test(word)) {
        issues.push({ severity: "error", message: `"${word}" in "${name}" should be wrapped in single quotes, e.g. '${word.toLowerCase()}'. Without quotes, browsers treat it as a hostname.` });
      }
    }
  }

  if (!hasDefaultSrc) {
    issues.push({ severity: "info", message: 'No "default-src" directive \u2014 directives not explicitly set will fall back to allowing everything for that resource type.' });
  }
  if (hasDefaultSrc && !hasScriptSrc) {
    issues.push({ severity: "info", message: 'No "script-src" directive \u2014 script loading falls back to "default-src". Consider setting it explicitly for tighter control.' });
  }

  return { issues, directiveCount: rawDirectives.length };
}

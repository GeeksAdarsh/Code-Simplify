import type { LintIssue } from "@/lib/docker-utils";

const SEVERITY_LABEL: Record<LintIssue["severity"], string> = {
  error: "Error",
  warning: "Warning",
  info: "Info",
};

export function LintResults({ issues, validLabel = "No issues found" }: { issues: LintIssue[]; validLabel?: string }) {
  if (issues.length === 0) {
    return (
      <div className="card flex items-center gap-3 border-foreground/30 px-4 py-3 text-sm">
        <span className="badge border-foreground text-foreground">{validLabel} &#10003;</span>
      </div>
    );
  }

  const errorCount = issues.filter((i) => i.severity === "error").length;
  const warningCount = issues.filter((i) => i.severity === "warning").length;
  const infoCount = issues.filter((i) => i.severity === "info").length;

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-2 text-xs">
        {errorCount > 0 && <span className="badge border-foreground text-foreground">{errorCount} error{errorCount === 1 ? "" : "s"}</span>}
        {warningCount > 0 && <span className="badge">{warningCount} warning{warningCount === 1 ? "" : "s"}</span>}
        {infoCount > 0 && <span className="badge">{infoCount} suggestion{infoCount === 1 ? "" : "s"}</span>}
      </div>
      <ul className="divide-y divide-border rounded-lg border border-border">
        {issues.map((issue, i) => (
          <li key={i} className="flex gap-3 px-3 py-2.5 text-sm">
            <span
              className={`mt-0.5 shrink-0 font-mono text-[10px] font-semibold uppercase tracking-wide ${
                issue.severity === "error" ? "text-foreground" : "text-muted"
              }`}
            >
              {SEVERITY_LABEL[issue.severity]}
            </span>
            <span className="text-muted">
              {issue.line !== undefined && <span className="mr-1.5 font-mono text-foreground">L{issue.line}</span>}
              {issue.message}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

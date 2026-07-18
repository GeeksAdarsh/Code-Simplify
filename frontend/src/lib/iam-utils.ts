import { parseJson } from "@/lib/json-utils";
import type { LintIssue } from "@/lib/docker-utils";

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function checkStatement(statement: unknown, index: number, issues: LintIssue[]): void {
  const label = `Statement[${index}]`;
  if (!isPlainObject(statement)) {
    issues.push({ severity: "error", message: `${label} must be an object.` });
    return;
  }
  if (statement.Effect !== "Allow" && statement.Effect !== "Deny") {
    issues.push({ severity: "error", message: `${label}: "Effect" must be "Allow" or "Deny" (got ${JSON.stringify(statement.Effect)}).` });
  }
  if (!statement.Action && !statement.NotAction) {
    issues.push({ severity: "error", message: `${label}: must have an "Action" or "NotAction".` });
  }
  if (!statement.Resource && !statement.NotResource) {
    issues.push({ severity: "warning", message: `${label}: no "Resource" or "NotResource" specified.` });
  }
  if (statement.Resource === "*" || (Array.isArray(statement.Resource) && statement.Resource.includes("*"))) {
    issues.push({ severity: "warning", message: `${label}: uses a wildcard "*" Resource \u2014 consider scoping this to specific ARNs (least privilege).` });
  }
  if (statement.Action === "*" || (Array.isArray(statement.Action) && statement.Action.includes("*"))) {
    issues.push({ severity: "warning", message: `${label}: uses a wildcard "*" Action \u2014 consider scoping this to specific actions (least privilege).` });
  }
  const knownKeys = new Set(["Sid", "Effect", "Principal", "NotPrincipal", "Action", "NotAction", "Resource", "NotResource", "Condition"]);
  for (const key of Object.keys(statement)) {
    if (!knownKeys.has(key)) {
      issues.push({ severity: "info", message: `${label}: "${key}" is not a standard IAM statement key.` });
    }
  }
}

export interface IamPolicyResult {
  formatted: string;
  issues: LintIssue[];
  statementCount: number;
}

export function analyzeIamPolicy(input: string): IamPolicyResult {
  const parsed = parseJson(input);
  if (parsed.error) {
    return { formatted: "", issues: [{ severity: "error", message: parsed.error.message + (parsed.error.line ? ` (line ${parsed.error.line})` : "") }], statementCount: 0 };
  }
  const doc = parsed.data;
  const issues: LintIssue[] = [];

  if (!isPlainObject(doc)) {
    return { formatted: JSON.stringify(doc, null, 2), issues: [{ severity: "error", message: "A policy document must be a JSON object." }], statementCount: 0 };
  }

  if (!doc.Version) {
    issues.push({ severity: "warning", message: 'Missing "Version" \u2014 AWS recommends "2012-10-17" for all current policies.' });
  } else if (doc.Version !== "2012-10-17" && doc.Version !== "2008-10-17") {
    issues.push({ severity: "warning", message: `Unrecognized "Version" value "${doc.Version}" \u2014 expected "2012-10-17".` });
  }

  const statements = doc.Statement;
  let statementCount = 0;
  if (!statements) {
    issues.push({ severity: "error", message: 'Missing required "Statement".' });
  } else if (Array.isArray(statements)) {
    statementCount = statements.length;
    if (statements.length === 0) {
      issues.push({ severity: "error", message: '"Statement" is empty.' });
    }
    statements.forEach((s, i) => checkStatement(s, i, issues));
  } else if (isPlainObject(statements)) {
    statementCount = 1;
    checkStatement(statements, 0, issues);
  } else {
    issues.push({ severity: "error", message: '"Statement" must be an object or array of objects.' });
  }

  return { formatted: JSON.stringify(doc, null, 2), issues, statementCount };
}

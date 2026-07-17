export interface EmailValidationResult {
  valid: boolean;
  localPart: string;
  domain: string;
  issues: string[];
  suggestion?: string;
}

const UNQUOTED_LOCAL_PART_RE = /^[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+)*$/;
const QUOTED_LOCAL_PART_RE = /^"(?:[^"\\]|\\.)*"$/;
const DOMAIN_LABEL_RE = /^[A-Za-z0-9]([A-Za-z0-9-]*[A-Za-z0-9])?$/;
const IPV4_RE = /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/;

const COMMON_DOMAINS = [
  "gmail.com",
  "yahoo.com",
  "hotmail.com",
  "outlook.com",
  "icloud.com",
  "aol.com",
  "protonmail.com",
  "live.com",
  "msn.com",
  "hotmail.co.uk",
  "yahoo.co.uk",
  "googlemail.com",
];

function levenshtein(a: string, b: string): number {
  const dp: number[][] = Array.from({ length: a.length + 1 }, () => new Array(b.length + 1).fill(0));
  for (let i = 0; i <= a.length; i++) dp[i][0] = i;
  for (let j = 0; j <= b.length; j++) dp[0][j] = j;
  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      if (a[i - 1] === b[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] = 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
      }
    }
  }
  return dp[a.length][b.length];
}

function suggestDomain(domain: string): string | undefined {
  const lower = domain.toLowerCase();
  if (COMMON_DOMAINS.includes(lower)) return undefined;

  let best: { domain: string; distance: number } | undefined;
  for (const candidate of COMMON_DOMAINS) {
    const distance = levenshtein(lower, candidate);
    if (distance > 0 && distance <= 2 && (!best || distance < best.distance)) {
      best = { domain: candidate, distance };
    }
  }
  return best?.domain;
}

function isValidIpv4(value: string): boolean {
  const match = IPV4_RE.exec(value);
  if (!match) return false;
  return match.slice(1).every((octet) => Number(octet) <= 255 && String(Number(octet)) === octet);
}

function validateDomain(domain: string, issues: string[]): void {
  if (domain.length === 0) {
    issues.push("Domain part is empty.");
    return;
  }
  if (domain.length > 253) {
    issues.push("Domain part exceeds the maximum length of 253 characters.");
  }

  if (domain.startsWith("[") && domain.endsWith("]")) {
    const literal = domain.slice(1, -1);
    if (!isValidIpv4(literal) && !literal.includes(":")) {
      issues.push(`"${literal}" is not a valid IP address literal.`);
    }
    return;
  }

  const labels = domain.split(".");
  if (labels.length < 2) {
    issues.push("Domain must contain at least one dot, e.g. example.com.");
    return;
  }
  for (const label of labels) {
    if (label.length === 0) {
      issues.push("Domain contains an empty label (e.g. two dots in a row).");
      continue;
    }
    if (label.length > 63) {
      issues.push(`Domain label "${label}" exceeds 63 characters.`);
    }
    if (!DOMAIN_LABEL_RE.test(label)) {
      issues.push(`Domain label "${label}" contains invalid characters or leading/trailing hyphens.`);
    }
  }
  const tld = labels[labels.length - 1];
  if (tld && !/^[A-Za-z]{2,}$/.test(tld)) {
    issues.push(`Top-level domain ".${tld}" should contain only letters and be at least 2 characters.`);
  }
}

export function validateEmail(input: string): EmailValidationResult {
  const email = input.trim();
  const issues: string[] = [];

  if (!email) {
    return { valid: false, localPart: "", domain: "", issues: ["Email address is empty."] };
  }
  if (email.length > 254) {
    issues.push("Email address exceeds the maximum length of 254 characters.");
  }
  if (/\s/.test(email)) {
    issues.push("Email address must not contain spaces.");
  }

  const atCount = email.split("@").length - 1;
  if (atCount === 0) {
    issues.push("Missing '@' symbol.");
    return { valid: false, localPart: email, domain: "", issues };
  }
  if (atCount > 1 && !email.startsWith('"')) {
    issues.push("Contains more than one '@' symbol.");
  }

  const atIndex = email.lastIndexOf("@");
  const localPart = email.slice(0, atIndex);
  const domain = email.slice(atIndex + 1);

  if (!localPart) {
    issues.push("Local part (before '@') is empty.");
  } else if (localPart.length > 64) {
    issues.push("Local part exceeds the maximum length of 64 characters.");
  }

  if (localPart) {
    const isQuoted = QUOTED_LOCAL_PART_RE.test(localPart);
    if (!isQuoted) {
      if (localPart.startsWith(".") || localPart.endsWith(".")) {
        issues.push("Local part must not start or end with a dot.");
      } else if (localPart.includes("..")) {
        issues.push("Local part must not contain consecutive dots.");
      } else if (!UNQUOTED_LOCAL_PART_RE.test(localPart)) {
        issues.push("Local part contains characters that must be quoted or are not allowed.");
      }
    }
  }

  validateDomain(domain, issues);

  const suggestion = issues.length === 0 ? suggestDomain(domain) : undefined;

  return { valid: issues.length === 0, localPart, domain, issues, suggestion };
}

export interface ReceivedHop {
  index: number;
  raw: string;
  from?: string;
  by?: string;
  timestamp?: Date;
  delaySeconds?: number;
}

export interface AuthResults {
  spf?: string;
  dkim?: string;
  dmarc?: string;
}

export interface EmailHeaderAnalysis {
  headers: { name: string; value: string }[];
  from?: string;
  to?: string;
  subject?: string;
  date?: string;
  messageId?: string;
  replyTo?: string;
  receivedHops: ReceivedHop[];
  authResults: AuthResults;
}

function unfoldHeaders(raw: string): string[] {
  const lines = raw.replace(/\r\n/g, "\n").split("\n");
  const unfolded: string[] = [];
  for (const line of lines) {
    if (line === "") break; // Blank line separates headers from the body.
    if ((line.startsWith(" ") || line.startsWith("\t")) && unfolded.length > 0) {
      unfolded[unfolded.length - 1] += " " + line.trim();
    } else {
      unfolded.push(line);
    }
  }
  return unfolded;
}

function parseReceivedTimestamp(value: string): Date | undefined {
  const idx = value.lastIndexOf(";");
  if (idx === -1) return undefined;
  const dateStr = value.slice(idx + 1).trim();
  const parsed = new Date(dateStr);
  return Number.isNaN(parsed.getTime()) ? undefined : parsed;
}

function parseReceivedHop(raw: string): { from?: string; by?: string } {
  const fromMatch = /\bfrom\s+(\S+)/i.exec(raw);
  const byMatch = /\bby\s+(\S+)/i.exec(raw);
  return { from: fromMatch?.[1], by: byMatch?.[1] };
}

function parseAuthResults(value: string): AuthResults {
  const result: AuthResults = {};
  const spf = /\bspf=(\w+)/i.exec(value);
  const dkim = /\bdkim=(\w+)/i.exec(value);
  const dmarc = /\bdmarc=(\w+)/i.exec(value);
  if (spf) result.spf = spf[1];
  if (dkim) result.dkim = dkim[1];
  if (dmarc) result.dmarc = dmarc[1];
  return result;
}

export function analyzeEmailHeaders(raw: string): EmailHeaderAnalysis {
  const lines = unfoldHeaders(raw);
  const headers: { name: string; value: string }[] = [];
  const receivedRaws: string[] = [];
  let authResults: AuthResults = {};
  let receivedSpf: string | undefined;

  for (const line of lines) {
    const colonIdx = line.indexOf(":");
    if (colonIdx === -1) continue;
    const name = line.slice(0, colonIdx).trim();
    const value = line.slice(colonIdx + 1).trim();
    headers.push({ name, value });

    const lowerName = name.toLowerCase();
    if (lowerName === "received") {
      receivedRaws.push(value);
    } else if (lowerName === "authentication-results") {
      authResults = { ...authResults, ...parseAuthResults(value) };
    } else if (lowerName === "received-spf") {
      receivedSpf = /^(\w+)/.exec(value)?.[1];
    }
  }
  if (!authResults.spf && receivedSpf) {
    authResults.spf = receivedSpf;
  }

  const find = (name: string) => headers.find((h) => h.name.toLowerCase() === name)?.value;

  // Received headers are prepended by each hop, so the topmost is the most recent;
  // reverse to chronological order (origin first) to compute per-hop delay.
  const chronological = [...receivedRaws].reverse();
  const receivedHops: ReceivedHop[] = chronological.map((raw, i) => {
    const { from, by } = parseReceivedHop(raw);
    const timestamp = parseReceivedTimestamp(raw);
    return { index: i, raw, from, by, timestamp };
  });
  for (let i = 1; i < receivedHops.length; i++) {
    const prev = receivedHops[i - 1].timestamp;
    const curr = receivedHops[i].timestamp;
    if (prev && curr) {
      receivedHops[i].delaySeconds = Math.round((curr.getTime() - prev.getTime()) / 1000);
    }
  }

  return {
    headers,
    from: find("from"),
    to: find("to"),
    subject: find("subject"),
    date: find("date"),
    messageId: find("message-id"),
    replyTo: find("reply-to"),
    receivedHops,
    authResults,
  };
}

export interface SignatureFields {
  name: string;
  jobTitle: string;
  company: string;
  email: string;
  phone: string;
  website: string;
  address: string;
  linkedin: string;
  twitter: string;
  github: string;
  logoUrl: string;
  accentColor: string;
}

export const DEFAULT_SIGNATURE_FIELDS: SignatureFields = {
  name: "Jordan Lee",
  jobTitle: "Senior Software Engineer",
  company: "DevToolbox Inc.",
  email: "jordan.lee@example.com",
  phone: "+1 (555) 123-4567",
  website: "https://example.com",
  address: "",
  linkedin: "",
  twitter: "",
  github: "",
  logoUrl: "",
  accentColor: "#111111",
};

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function withProtocol(url: string): string {
  if (!url) return "";
  return /^https?:\/\//i.test(url) ? url : `https://${url}`;
}

export function generateSignatureHtml(fields: SignatureFields): string {
  const f = fields;
  const links: string[] = [];
  if (f.website) links.push(`<a href="${escapeHtml(withProtocol(f.website))}" style="color:${f.accentColor};text-decoration:none;">${escapeHtml(f.website.replace(/^https?:\/\//i, ""))}</a>`);
  if (f.linkedin) links.push(`<a href="${escapeHtml(withProtocol(f.linkedin))}" style="color:${f.accentColor};text-decoration:none;">LinkedIn</a>`);
  if (f.twitter) links.push(`<a href="${escapeHtml(withProtocol(f.twitter))}" style="color:${f.accentColor};text-decoration:none;">Twitter/X</a>`);
  if (f.github) links.push(`<a href="${escapeHtml(withProtocol(f.github))}" style="color:${f.accentColor};text-decoration:none;">GitHub</a>`);

  const logoCell = f.logoUrl
    ? `<td style="padding-right:16px;vertical-align:top;"><img src="${escapeHtml(f.logoUrl)}" alt="${escapeHtml(f.company || f.name)}" width="72" style="display:block;border-radius:6px;" /></td>`
    : "";

  return `<table cellpadding="0" cellspacing="0" style="font-family:Arial,Helvetica,sans-serif;font-size:13px;color:#222222;border-collapse:collapse;">
  <tr>
    ${logoCell}
    <td style="border-left:${f.logoUrl ? "0" : "3px solid " + f.accentColor};padding-left:${f.logoUrl ? "0" : "12px"};">
      <div style="font-size:15px;font-weight:bold;color:#111111;">${escapeHtml(f.name)}</div>
      ${f.jobTitle ? `<div style="color:#555555;">${escapeHtml(f.jobTitle)}${f.company ? ` &middot; ${escapeHtml(f.company)}` : ""}</div>` : f.company ? `<div style="color:#555555;">${escapeHtml(f.company)}</div>` : ""}
      <div style="margin-top:8px;line-height:1.6;">
        ${f.email ? `<div>Email: <a href="mailto:${escapeHtml(f.email)}" style="color:${f.accentColor};text-decoration:none;">${escapeHtml(f.email)}</a></div>` : ""}
        ${f.phone ? `<div>Phone: ${escapeHtml(f.phone)}</div>` : ""}
        ${f.address ? `<div>${escapeHtml(f.address)}</div>` : ""}
      </div>
      ${links.length ? `<div style="margin-top:8px;">${links.join(" &nbsp;|&nbsp; ")}</div>` : ""}
    </td>
  </tr>
</table>`;
}

export function generateSignatureText(fields: SignatureFields): string {
  const f = fields;
  const lines = [f.name, [f.jobTitle, f.company].filter(Boolean).join(" @ "), "", f.email, f.phone, f.website, f.address].filter(
    (line) => line !== undefined && line !== ""
  );
  const socials = [
    f.linkedin && `LinkedIn: ${withProtocol(f.linkedin)}`,
    f.twitter && `Twitter/X: ${withProtocol(f.twitter)}`,
    f.github && `GitHub: ${withProtocol(f.github)}`,
  ].filter(Boolean) as string[];
  return [...lines, ...(socials.length ? ["", ...socials] : [])].join("\n");
}

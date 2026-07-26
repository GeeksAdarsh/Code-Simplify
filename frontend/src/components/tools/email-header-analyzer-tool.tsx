"use client";

import { useMemo, useState } from "react";
import { CodeEditor } from "@/components/code-editor";
import { analyzeEmailHeaders } from "@/lib/email-utils";

const SAMPLE_HEADERS = `Delivered-To: alex@example.com
Received: by 2002:a05:6a20:1234:b0:abc:1234:5678 with SMTP id abc123;
        Wed, 15 Jan 2026 08:15:42 -0800 (PST)
Received: from mail-sor-f41.google.com (mail-sor-f41.google.com. [209.85.220.41])
        by mx.google.com with SMTPS id xyz789
        for <alex@example.com>;
        Wed, 15 Jan 2026 08:15:41 -0800 (PST)
Received: from smtp.sendgrid.net (smtp.sendgrid.net. [167.89.118.20])
        by mail-sor-f41.google.com with SMTP id def456;
        Wed, 15 Jan 2026 08:15:38 -0800 (PST)
Received-SPF: pass (google.com: domain of bounce@sendgrid.net designates 167.89.118.20 as permitted sender)
Authentication-Results: mx.google.com;
       dkim=pass header.i=@sendgrid.info;
       spf=pass (google.com: domain of bounce@sendgrid.net designates 167.89.118.20 as permitted sender) smtp.mailfrom=bounce@sendgrid.net;
       dmarc=pass (p=REJECT sp=REJECT dis=NONE) header.from=example.com
Message-ID: <abc123.def456@sendgrid.net>
Date: Wed, 15 Jan 2026 16:15:35 +0000
From: "Notifications" <notifications@example.com>
To: alex@example.com
Reply-To: support@example.com
Subject: Your weekly summary is ready
Content-Type: multipart/alternative; boundary="boundary-string"`;

export function EmailHeaderAnalyzerTool() {
  const [raw, setRaw] = useState("");
  const analysis = useMemo(() => (raw.trim() ? analyzeEmailHeaders(raw) : undefined), [raw]);

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2 rounded-t-xl border border-b-0 border-border bg-surface px-3 py-2">
        <button onClick={() => setRaw(SAMPLE_HEADERS)} className="btn btn-secondary h-8 px-3 text-xs">
          Load sample headers
        </button>
        <button onClick={() => setRaw("")} className="btn btn-secondary h-8 px-3 text-xs">
          Clear
        </button>
      </div>
      <CodeEditor
        value={raw}
        onChange={setRaw}
        language="plaintext"
        placeholder="Paste the full raw email headers here (View Source / Show Original in your email client)..."
        height="14rem"
        className="rounded-b-xl border border-border"
      />

      {analysis && (
        <div className="mt-4 space-y-4">
          <div className="card grid gap-3 p-4 text-sm sm:grid-cols-2">
            <Field label="From" value={analysis.from} />
            <Field label="To" value={analysis.to} />
            <Field label="Subject" value={analysis.subject} />
            <Field label="Date" value={analysis.date} />
            <Field label="Message-ID" value={analysis.messageId} />
            <Field label="Reply-To" value={analysis.replyTo} />
          </div>

          <div className="card p-4">
            <p className="text-xs font-medium text-muted">Authentication results</p>
            <div className="mt-2 flex flex-wrap gap-2">
              <AuthBadge label="SPF" value={analysis.authResults.spf} />
              <AuthBadge label="DKIM" value={analysis.authResults.dkim} />
              <AuthBadge label="DMARC" value={analysis.authResults.dmarc} />
            </div>
            {!analysis.authResults.spf && !analysis.authResults.dkim && !analysis.authResults.dmarc && (
              <p className="mt-2 text-xs text-muted">
                No Authentication-Results or Received-SPF header found in this header block.
              </p>
            )}
          </div>

          <div className="card p-4">
            <p className="text-xs font-medium text-muted">
              Delivery path ({analysis.receivedHops.length} hop{analysis.receivedHops.length === 1 ? "" : "s"}, origin
              first)
            </p>
            {analysis.receivedHops.length === 0 ? (
              <p className="mt-2 text-xs text-muted">No "Received:" headers found.</p>
            ) : (
              <ol className="mt-3 space-y-3">
                {analysis.receivedHops.map((hop) => (
                  <li key={hop.index} className="rounded border border-border bg-background p-3 text-sm">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="font-medium">Hop {hop.index + 1}</span>
                      {hop.delaySeconds !== undefined && (
                        <span className="text-xs text-muted">
                          +{hop.delaySeconds}s since previous hop
                        </span>
                      )}
                    </div>
                    <div className="mt-1.5 grid gap-1 text-xs text-muted sm:grid-cols-2">
                      <span>From: {hop.from ?? "\u2014"}</span>
                      <span>By: {hop.by ?? "\u2014"}</span>
                      <span className="sm:col-span-2">
                        Timestamp: {hop.timestamp ? hop.timestamp.toUTCString() : "\u2014"}
                      </span>
                    </div>
                  </li>
                ))}
              </ol>
            )}
          </div>

          <div className="card p-4">
            <p className="text-xs font-medium text-muted">All headers ({analysis.headers.length})</p>
            <div className="mt-2 max-h-72 overflow-auto rounded border border-border">
              <table className="w-full text-xs">
                <tbody>
                  {analysis.headers.map((h, i) => (
                    <tr key={i} className="border-b border-border last:border-b-0">
                      <td className="w-40 whitespace-nowrap px-2 py-1.5 align-top font-medium">{h.name}</td>
                      <td className="break-all px-2 py-1.5 text-muted">{h.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      <p className="mt-3 text-xs text-muted">
        Header parsing runs entirely in your browser \u2014 pasted headers are never sent to a server.
      </p>
    </div>
  );
}

function Field({ label, value }: { label: string; value?: string }) {
  return (
    <div className="rounded border border-border bg-background px-3 py-2">
      <p className="text-xs text-muted">{label}</p>
      <p className="mt-0.5 break-all">{value || "\u2014"}</p>
    </div>
  );
}

function AuthBadge({ label, value }: { label: string; value?: string }) {
  const pass = value?.toLowerCase() === "pass";
  const known = value !== undefined;
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium ${
        known ? "border-foreground/30" : "border-border text-muted"
      }`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${pass ? "bg-foreground" : known ? "bg-foreground/40" : "bg-border"}`} />
      {label}: {value ?? "not found"}
    </span>
  );
}

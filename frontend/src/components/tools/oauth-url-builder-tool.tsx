"use client";

import { useMemo, useState } from "react";
import { buildOAuthUrl } from "@/lib/auth-utils";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block text-xs">
      <span className="mb-1 block text-muted">{label}</span>
      {children}
    </label>
  );
}

const inputClass = "w-full rounded border border-border bg-background px-2.5 py-1.5 text-sm outline-none focus:border-foreground";

export function OAuthUrlBuilderTool() {
  const [authorizationEndpoint, setAuthorizationEndpoint] = useState("https://accounts.google.com/o/oauth2/v2/auth");
  const [clientId, setClientId] = useState("your-client-id");
  const [redirectUri, setRedirectUri] = useState("https://myapp.example.com/callback");
  const [responseType, setResponseType] = useState("code");
  const [scope, setScope] = useState("openid email profile");
  const [state, setState] = useState("");
  const [codeChallenge, setCodeChallenge] = useState("");
  const [codeChallengeMethod, setCodeChallengeMethod] = useState("S256");
  const [audience, setAudience] = useState("");
  const [extraParams, setExtraParams] = useState("");
  const [copied, setCopied] = useState(false);

  const result = useMemo(
    () =>
      buildOAuthUrl({
        authorizationEndpoint,
        clientId,
        redirectUri,
        responseType,
        scope,
        state,
        codeChallenge,
        codeChallengeMethod,
        audience,
        extraParams,
      }),
    [authorizationEndpoint, clientId, redirectUri, responseType, scope, state, codeChallenge, codeChallengeMethod, audience, extraParams]
  );

  function copy() {
    if (!result.url) return;
    navigator.clipboard.writeText(result.url);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Authorization endpoint">
          <input value={authorizationEndpoint} onChange={(e) => setAuthorizationEndpoint(e.target.value)} className={inputClass} />
        </Field>
        <Field label="client_id">
          <input value={clientId} onChange={(e) => setClientId(e.target.value)} className={inputClass} />
        </Field>
        <Field label="redirect_uri">
          <input value={redirectUri} onChange={(e) => setRedirectUri(e.target.value)} className={inputClass} />
        </Field>
        <Field label="response_type">
          <select value={responseType} onChange={(e) => setResponseType(e.target.value)} className={inputClass}>
            <option value="code">code</option>
            <option value="token">token</option>
            <option value="id_token">id_token</option>
            <option value="code id_token">code id_token</option>
          </select>
        </Field>
        <Field label="scope">
          <input value={scope} onChange={(e) => setScope(e.target.value)} className={inputClass} />
        </Field>
        <Field label="state">
          <input value={state} onChange={(e) => setState(e.target.value)} placeholder="(optional) random CSRF-protection value" className={inputClass} />
        </Field>
        <Field label="code_challenge (PKCE, optional)">
          <input value={codeChallenge} onChange={(e) => setCodeChallenge(e.target.value)} className={inputClass} />
        </Field>
        <Field label="code_challenge_method">
          <select value={codeChallengeMethod} onChange={(e) => setCodeChallengeMethod(e.target.value)} className={inputClass}>
            <option value="S256">S256</option>
            <option value="plain">plain</option>
          </select>
        </Field>
        <Field label="audience (optional, used by some providers)">
          <input value={audience} onChange={(e) => setAudience(e.target.value)} className={inputClass} />
        </Field>
        <Field label="Extra params (one KEY=value per line)">
          <input value={extraParams} onChange={(e) => setExtraParams(e.target.value)} placeholder="prompt=consent" className={inputClass} />
        </Field>
      </div>

      <div className="mt-6">
        {result.error && (
          <div className="card border-foreground/30 px-4 py-3 text-sm">
            <span className="badge border-foreground text-foreground">Error</span>
            <p className="mt-2 text-muted">{result.error}</p>
          </div>
        )}
        {result.url && (
          <div className="card p-0">
            <div className="flex items-center justify-between border-b border-border px-3 py-1.5 text-xs text-muted">
              <span>Authorization URL</span>
              <button onClick={copy} className="font-medium text-foreground">
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
            <p className="break-all p-3 font-mono text-sm">{result.url}</p>
          </div>
        )}
      </div>
    </div>
  );
}

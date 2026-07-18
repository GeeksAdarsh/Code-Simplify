export interface OAuthUrlParams {
  authorizationEndpoint: string;
  clientId: string;
  redirectUri: string;
  responseType: string;
  scope: string;
  state: string;
  codeChallenge: string;
  codeChallengeMethod: string;
  audience: string;
  extraParams: string;
}

export function buildOAuthUrl(params: OAuthUrlParams): { url?: string; error?: string } {
  if (!params.authorizationEndpoint.trim()) {
    return { error: "An authorization endpoint URL is required." };
  }
  let base: URL;
  try {
    base = new URL(params.authorizationEndpoint.trim());
  } catch {
    return { error: "The authorization endpoint is not a valid URL." };
  }

  if (!params.clientId.trim()) return { error: "A client_id is required." };

  base.searchParams.set("response_type", params.responseType || "code");
  base.searchParams.set("client_id", params.clientId.trim());
  if (params.redirectUri.trim()) base.searchParams.set("redirect_uri", params.redirectUri.trim());
  if (params.scope.trim()) base.searchParams.set("scope", params.scope.trim());
  if (params.state.trim()) base.searchParams.set("state", params.state.trim());
  if (params.codeChallenge.trim()) {
    base.searchParams.set("code_challenge", params.codeChallenge.trim());
    base.searchParams.set("code_challenge_method", params.codeChallengeMethod || "S256");
  }
  if (params.audience.trim()) base.searchParams.set("audience", params.audience.trim());

  if (params.extraParams.trim()) {
    for (const line of params.extraParams.split(/\r?\n/)) {
      const idx = line.indexOf("=");
      if (idx === -1) continue;
      const key = line.slice(0, idx).trim();
      const value = line.slice(idx + 1).trim();
      if (key) base.searchParams.set(key, value);
    }
  }

  return { url: base.toString() };
}

function base64UrlEncode(bytes: Uint8Array): string {
  let binary = "";
  for (const b of bytes) binary += String.fromCharCode(b);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

const PKCE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~";

export function generateCodeVerifier(length = 64): string {
  const bytes = new Uint8Array(length);
  crypto.getRandomValues(bytes);
  let result = "";
  for (const b of bytes) result += PKCE_CHARS[b % PKCE_CHARS.length];
  return result;
}

export async function generateCodeChallenge(verifier: string): Promise<string> {
  const data = new TextEncoder().encode(verifier);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return base64UrlEncode(new Uint8Array(digest));
}

export async function generatePkcePair(length = 64): Promise<{ verifier: string; challenge: string }> {
  const verifier = generateCodeVerifier(length);
  const challenge = await generateCodeChallenge(verifier);
  return { verifier, challenge };
}

const BASE32_ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";

export function base32Decode(input: string): Uint8Array {
  const clean = input.toUpperCase().replace(/[^A-Z2-7]/g, "");
  let bits = "";
  for (const char of clean) {
    const idx = BASE32_ALPHABET.indexOf(char);
    if (idx === -1) continue;
    bits += idx.toString(2).padStart(5, "0");
  }
  const bytes: number[] = [];
  for (let i = 0; i + 8 <= bits.length; i += 8) {
    bytes.push(parseInt(bits.slice(i, i + 8), 2));
  }
  return new Uint8Array(bytes);
}

export function base32Encode(bytes: Uint8Array): string {
  let bits = "";
  for (const b of bytes) bits += b.toString(2).padStart(8, "0");
  let output = "";
  for (let i = 0; i < bits.length; i += 5) {
    const chunk = bits.slice(i, i + 5).padEnd(5, "0");
    output += BASE32_ALPHABET[parseInt(chunk, 2)];
  }
  return output;
}

export function generateTotpSecret(byteLength = 20): string {
  const bytes = new Uint8Array(byteLength);
  crypto.getRandomValues(bytes);
  return base32Encode(bytes);
}

export type TotpAlgorithm = "SHA-1" | "SHA-256" | "SHA-512";

async function hmac(key: Uint8Array, message: Uint8Array, algorithm: TotpAlgorithm): Promise<Uint8Array> {
  const cryptoKey = await crypto.subtle.importKey("raw", key as BufferSource, { name: "HMAC", hash: algorithm }, false, ["sign"]);
  const signature = await crypto.subtle.sign("HMAC", cryptoKey, message as BufferSource);
  return new Uint8Array(signature);
}

export async function generateTotp(
  secretBase32: string,
  options: { digits?: number; period?: number; algorithm?: TotpAlgorithm; timestamp?: number } = {}
): Promise<string> {
  const { digits = 6, period = 30, algorithm = "SHA-1", timestamp = Date.now() } = options;
  const key = base32Decode(secretBase32);
  const counter = Math.floor(timestamp / 1000 / period);

  const counterBytes = new Uint8Array(8);
  let c = counter;
  for (let i = 7; i >= 0; i--) {
    counterBytes[i] = c & 0xff;
    c = Math.floor(c / 256);
  }

  const hash = await hmac(key, counterBytes, algorithm);
  const offset = hash[hash.length - 1] & 0x0f;
  const binCode =
    ((hash[offset] & 0x7f) << 24) | ((hash[offset + 1] & 0xff) << 16) | ((hash[offset + 2] & 0xff) << 8) | (hash[offset + 3] & 0xff);

  const code = (binCode % 10 ** digits).toString().padStart(digits, "0");
  return code;
}

export function secondsRemainingInPeriod(period = 30, timestamp = Date.now()): number {
  return period - Math.floor(timestamp / 1000) % period;
}

export function buildTotpUri(secret: string, label: string, issuer: string, options: { digits?: number; period?: number; algorithm?: TotpAlgorithm } = {}): string {
  const { digits = 6, period = 30, algorithm = "SHA-1" } = options;
  const params = new URLSearchParams({
    secret,
    issuer,
    algorithm: algorithm.replace("-", ""),
    digits: String(digits),
    period: String(period),
  });
  const encodedLabel = encodeURIComponent(issuer ? `${issuer}:${label}` : label);
  return `otpauth://totp/${encodedLabel}?${params.toString()}`;
}

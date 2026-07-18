function base64UrlEncode(bytes: Uint8Array): string {
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function base64UrlDecode(input: string): Uint8Array {
  const padded = input.replace(/-/g, "+").replace(/_/g, "/");
  const padLength = padded.length % 4 === 0 ? 0 : 4 - (padded.length % 4);
  const binary = atob(padded + "=".repeat(padLength));
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

function base64UrlDecodeText(input: string): string {
  return new TextDecoder("utf-8", { fatal: true }).decode(base64UrlDecode(input));
}

export interface DecodedJwt {
  header: Record<string, unknown>;
  payload: Record<string, unknown>;
  signature: string;
  headerRaw: string;
  payloadRaw: string;
}

export interface JwtDecodeResult {
  data?: DecodedJwt;
  error?: string;
}

export function decodeJwt(token: string): JwtDecodeResult {
  const trimmed = token.trim();
  const parts = trimmed.split(".");
  if (parts.length !== 3) {
    return { error: "A JWT must have exactly 3 dot-separated parts: header.payload.signature." };
  }

  const [headerPart, payloadPart, signaturePart] = parts;

  try {
    const header = JSON.parse(base64UrlDecodeText(headerPart));
    const payload = JSON.parse(base64UrlDecodeText(payloadPart));
    return {
      data: {
        header,
        payload,
        signature: signaturePart,
        headerRaw: JSON.stringify(header, null, 2),
        payloadRaw: JSON.stringify(payload, null, 2),
      },
    };
  } catch {
    return { error: "Could not decode this token \u2014 the header or payload is not valid Base64URL-encoded JSON." };
  }
}

export type JwtAlgorithm = "HS256" | "HS384" | "HS512";

const ALGO_TO_SHA: Record<JwtAlgorithm, "SHA-256" | "SHA-384" | "SHA-512"> = {
  HS256: "SHA-256",
  HS384: "SHA-384",
  HS512: "SHA-512",
};

export async function signJwt(
  headerObj: Record<string, unknown>,
  payloadObj: Record<string, unknown>,
  secret: string,
  algorithm: JwtAlgorithm
): Promise<string> {
  const encoder = new TextEncoder();
  const headerB64 = base64UrlEncode(encoder.encode(JSON.stringify(headerObj)));
  const payloadB64 = base64UrlEncode(encoder.encode(JSON.stringify(payloadObj)));
  const signingInput = `${headerB64}.${payloadB64}`;

  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: ALGO_TO_SHA[algorithm] },
    false,
    ["sign"]
  );
  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(signingInput));
  const signatureB64 = base64UrlEncode(new Uint8Array(signature));

  return `${signingInput}.${signatureB64}`;
}

export async function verifyJwtSignature(token: string, secret: string): Promise<boolean> {
  const parts = token.trim().split(".");
  if (parts.length !== 3) return false;
  const [headerPart, payloadPart, signaturePart] = parts;

  try {
    const header = JSON.parse(base64UrlDecodeText(headerPart)) as { alg?: string };
    const algorithm = header.alg as JwtAlgorithm;
    if (!ALGO_TO_SHA[algorithm]) return false;

    const encoder = new TextEncoder();
    const key = await crypto.subtle.importKey(
      "raw",
      encoder.encode(secret),
      { name: "HMAC", hash: ALGO_TO_SHA[algorithm] },
      false,
      ["sign"]
    );
    const signingInput = `${headerPart}.${payloadPart}`;
    const expectedSignature = await crypto.subtle.sign("HMAC", key, encoder.encode(signingInput));
    const expectedB64 = base64UrlEncode(new Uint8Array(expectedSignature));
    return expectedB64 === signaturePart;
  } catch {
    return false;
  }
}

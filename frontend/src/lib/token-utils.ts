export type TokenFormat = "hex" | "base64" | "base64url" | "alphanumeric" | "numeric";

const ALPHANUMERIC = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
const NUMERIC = "0123456789";

export function generateRandomToken(length: number, format: TokenFormat): string {
  if (length <= 0) return "";

  if (format === "hex") {
    const bytes = new Uint8Array(Math.ceil(length / 2));
    crypto.getRandomValues(bytes);
    return Array.from(bytes)
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("")
      .slice(0, length);
  }

  if (format === "base64" || format === "base64url") {
    const bytes = new Uint8Array(Math.ceil((length * 3) / 4) + 3);
    crypto.getRandomValues(bytes);
    let binary = "";
    for (const b of bytes) binary += String.fromCharCode(b);
    let b64 = btoa(binary);
    if (format === "base64url") {
      b64 = b64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
    }
    return b64.slice(0, length);
  }

  const pool = format === "numeric" ? NUMERIC : ALPHANUMERIC;
  const randomValues = new Uint32Array(length);
  crypto.getRandomValues(randomValues);
  let result = "";
  for (let i = 0; i < length; i++) {
    result += pool[randomValues[i] % pool.length];
  }
  return result;
}

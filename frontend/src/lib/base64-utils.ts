export interface Base64Result {
  output: string;
  error?: string;
}

export function encodeBase64(text: string): Base64Result {
  try {
    const bytes = new TextEncoder().encode(text);
    let binary = "";
    for (const byte of bytes) binary += String.fromCharCode(byte);
    return { output: btoa(binary) };
  } catch {
    return { output: "", error: "Could not encode this text to Base64." };
  }
}

export function decodeBase64(base64: string): Base64Result {
  try {
    const cleaned = base64.trim().replace(/\s+/g, "");
    const binary = atob(cleaned);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
    return { output: new TextDecoder("utf-8", { fatal: true }).decode(bytes) };
  } catch {
    return { output: "", error: "Invalid Base64 input \u2014 check for missing characters or invalid padding." };
  }
}

export function encodeUrl(text: string, component = true): Base64Result {
  try {
    return { output: component ? encodeURIComponent(text) : encodeURI(text) };
  } catch {
    return { output: "", error: "Could not URL-encode this text." };
  }
}

export function decodeUrl(text: string, component = true): Base64Result {
  try {
    return { output: component ? decodeURIComponent(text) : decodeURI(text) };
  } catch {
    return { output: "", error: "Invalid percent-encoding \u2014 check for malformed %XX sequences." };
  }
}

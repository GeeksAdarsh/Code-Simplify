export interface SharePayload {
  v: 1;
  /** Writable editor values, in registration order. */
  e: string[];
  /** Native input, textarea, and select values, in DOM order. Checkboxes use "1" or "0". */
  d: string[];
}

const HASH_LIMIT = 150_000;

function bytesToBase64Url(bytes: Uint8Array): string {
  let binary = "";
  const chunk = 0x8000;
  for (let i = 0; i < bytes.length; i += chunk) {
    binary += String.fromCharCode(...bytes.subarray(i, i + chunk));
  }
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function base64UrlToBytes(value: string): Uint8Array {
  const padded = value.replace(/-/g, "+").replace(/_/g, "/") + "===".slice((value.length + 3) % 4);
  const binary = atob(padded);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

type Codec = "gzip" | "deflate-raw";

/** Prefix written into the link for each codec. cs0 means stored uncompressed. */
const CODEC_PREFIX: Record<Codec, string> = { gzip: "cs1", "deflate-raw": "cs2" };

async function compress(text: string, codec: Codec): Promise<Uint8Array> {
  const stream = new Blob([new TextEncoder().encode(text)]).stream().pipeThrough(new CompressionStream(codec));
  return new Uint8Array(await new Response(stream).arrayBuffer());
}

async function decompress(bytes: Uint8Array, codec: Codec): Promise<string> {
  const stream = new Blob([bytes as BlobPart]).stream().pipeThrough(new DecompressionStream(codec));
  return new TextDecoder().decode(await new Response(stream).arrayBuffer());
}

/** deflate-raw skips gzip's header and checksum. Older browsers only have gzip. */
async function compressSmallest(text: string): Promise<{ codec: Codec; bytes: Uint8Array }> {
  try {
    return { codec: "deflate-raw", bytes: await compress(text, "deflate-raw") };
  } catch {
    return { codec: "gzip", bytes: await compress(text, "gzip") };
  }
}

export async function encodeShareHash(payload: SharePayload): Promise<string> {
  const json = JSON.stringify(payload);
  const plain = new TextEncoder().encode(json);
  const { codec, bytes } = await compressSmallest(json);
  const useCompressed = bytes.length < plain.length;
  const body = bytesToBase64Url(useCompressed ? bytes : plain);
  const hash = `${useCompressed ? CODEC_PREFIX[codec] : "cs0"}.${body}`;
  if (hash.length > HASH_LIMIT) {
    throw new Error("too-large");
  }
  return hash;
}

export async function decodeShareHash(hash: string): Promise<SharePayload | null> {
  const raw = hash.replace(/^#/, "");
  const match = /^(cs0|cs1|cs2)\.([A-Za-z0-9_-]+)$/.exec(raw);
  if (!match || raw.length > HASH_LIMIT) return null;
  try {
    const bytes = base64UrlToBytes(match[2]);
    const json =
      match[1] === "cs2"
        ? await decompress(bytes, "deflate-raw")
        : match[1] === "cs1"
          ? await decompress(bytes, "gzip")
          : new TextDecoder().decode(bytes);
    const parsed: unknown = JSON.parse(json);
    if (!parsed || typeof parsed !== "object") return null;
    const record = parsed as Partial<SharePayload>;
    if (record.v !== 1 || !Array.isArray(record.e) || !Array.isArray(record.d)) return null;
    if (!record.e.every((item) => typeof item === "string") || !record.d.every((item) => typeof item === "string")) return null;
    return { v: 1, e: record.e, d: record.d };
  } catch {
    return null;
  }
}

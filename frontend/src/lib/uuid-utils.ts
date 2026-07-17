function bytesToUuidString(bytes: Uint8Array): string {
  const hex = Array.from(bytes).map((b) => b.toString(16).padStart(2, "0"));
  return `${hex.slice(0, 4).join("")}-${hex.slice(4, 6).join("")}-${hex.slice(6, 8).join("")}-${hex.slice(8, 10).join("")}-${hex.slice(10, 16).join("")}`;
}

export function generateUuidV4(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);
  bytes[6] = (bytes[6] & 0x0f) | 0x40;
  bytes[8] = (bytes[8] & 0x3f) | 0x80;
  return bytesToUuidString(bytes);
}

const UUID_V1_EPOCH_OFFSET = BigInt("122192928000000000"); // 100ns intervals between 1582-10-15 and 1970-01-01
let uuidV1Counter = 0;

/**
 * Generates an RFC 4122-compliant UUID v1. Since browsers have no access to a
 * real MAC address, a random 48-bit node ID is used with the multicast bit
 * set, which is the standard privacy-preserving approach used by most modern
 * UUID v1 implementations.
 */
export function generateUuidV1(): string {
  const nowMs = Date.now();
  const intervals = BigInt(nowMs) * BigInt(10000) + UUID_V1_EPOCH_OFFSET + BigInt(uuidV1Counter % 10000);
  uuidV1Counter += 1;

  const timeLow = intervals & BigInt(0xffffffff);
  const timeMid = (intervals >> BigInt(32)) & BigInt(0xffff);
  const timeHi = ((intervals >> BigInt(48)) & BigInt(0x0fff)) | BigInt(0x1000);

  const clockSeqBytes = new Uint8Array(2);
  crypto.getRandomValues(clockSeqBytes);
  const clockSeq = (((clockSeqBytes[0] << 8) | clockSeqBytes[1]) & 0x3fff) | 0x8000;

  const nodeBytes = new Uint8Array(6);
  crypto.getRandomValues(nodeBytes);
  nodeBytes[0] |= 0x01;

  const timeLowHex = timeLow.toString(16).padStart(8, "0");
  const timeMidHex = timeMid.toString(16).padStart(4, "0");
  const timeHiHex = timeHi.toString(16).padStart(4, "0");
  const clockSeqHex = clockSeq.toString(16).padStart(4, "0");
  const nodeHex = Array.from(nodeBytes)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  return `${timeLowHex}-${timeMidHex}-${timeHiHex}-${clockSeqHex}-${nodeHex}`;
}

/** Generates an RFC 9562 UUID v7: a time-ordered UUID with a 48-bit millisecond timestamp prefix. */
export function generateUuidV7(): string {
  const bytes = new Uint8Array(16);
  let timestamp = BigInt(Date.now());

  for (let i = 5; i >= 0; i--) {
    bytes[i] = Number(timestamp & BigInt(0xff));
    timestamp >>= BigInt(8);
  }

  const randomBytes = new Uint8Array(10);
  crypto.getRandomValues(randomBytes);

  bytes[6] = 0x70 | (randomBytes[0] & 0x0f);
  bytes[7] = randomBytes[1];
  bytes[8] = 0x80 | (randomBytes[2] & 0x3f);
  bytes[9] = randomBytes[3];
  bytes[10] = randomBytes[4];
  bytes[11] = randomBytes[5];
  bytes[12] = randomBytes[6];
  bytes[13] = randomBytes[7];
  bytes[14] = randomBytes[8];
  bytes[15] = randomBytes[9];

  return bytesToUuidString(bytes);
}

export interface GuidFormatOptions {
  uppercase?: boolean;
  braces?: boolean;
  hyphens?: boolean;
}

export function formatGuid(uuid: string, options: GuidFormatOptions = {}): string {
  let result = options.hyphens === false ? uuid.replace(/-/g, "") : uuid;
  if (options.uppercase) result = result.toUpperCase();
  if (options.braces) result = `{${result}}`;
  return result;
}

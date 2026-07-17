export type RandomStringCharset = "letters" | "letters-numbers" | "numbers" | "hex" | "custom";

const CHARSETS: Record<Exclude<RandomStringCharset, "custom">, string> = {
  letters: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
  "letters-numbers": "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
  numbers: "0123456789",
  hex: "0123456789abcdef",
};

export function generateRandomString(length: number, charset: RandomStringCharset, customChars = ""): string {
  const pool = charset === "custom" ? customChars : CHARSETS[charset];
  if (!pool || length <= 0) return "";

  const randomValues = new Uint32Array(length);
  crypto.getRandomValues(randomValues);

  let result = "";
  for (let i = 0; i < length; i++) {
    result += pool[randomValues[i] % pool.length];
  }
  return result;
}

export function generateRandomInt(min: number, max: number): number {
  const lo = Math.ceil(Math.min(min, max));
  const hi = Math.floor(Math.max(min, max));
  const range = hi - lo + 1;
  const randomBuffer = new Uint32Array(1);
  crypto.getRandomValues(randomBuffer);
  return lo + (randomBuffer[0] % range);
}

export function generateUniqueRandomInts(min: number, max: number, count: number): number[] {
  const lo = Math.ceil(Math.min(min, max));
  const hi = Math.floor(Math.max(min, max));
  const range = hi - lo + 1;
  const n = Math.min(count, range);

  const pool = Array.from({ length: range }, (_, i) => lo + i);
  for (let i = 0; i < n; i++) {
    const randomBuffer = new Uint32Array(1);
    crypto.getRandomValues(randomBuffer);
    const j = i + (randomBuffer[0] % (pool.length - i));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  return pool.slice(0, n);
}

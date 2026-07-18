export type TokenizerEncoding = "o200k_base" | "cl100k_base";

export interface TokenizerModel {
  id: string;
  label: string;
  encoding: TokenizerEncoding;
  contextWindow?: number;
  maxOutputTokens?: number;
}

export const CHAT_MODELS: TokenizerModel[] = [
  { id: "gpt-5", label: "GPT-5", encoding: "o200k_base", contextWindow: 400000 },
  { id: "gpt-4o", label: "GPT-4o", encoding: "o200k_base", contextWindow: 128000 },
  { id: "gpt-4.1", label: "GPT-4.1", encoding: "o200k_base", contextWindow: 1000000 },
  { id: "o1", label: "o1 / o3 / o4-mini", encoding: "o200k_base", contextWindow: 200000 },
  { id: "gpt-4", label: "GPT-4 / GPT-4 Turbo", encoding: "cl100k_base", contextWindow: 128000 },
  { id: "gpt-3.5-turbo", label: "GPT-3.5 Turbo", encoding: "cl100k_base", contextWindow: 16385 },
];

export const EMBEDDING_MODELS: TokenizerModel[] = [
  { id: "text-embedding-3-small", label: "text-embedding-3-small", encoding: "cl100k_base", maxOutputTokens: 8191 },
  { id: "text-embedding-3-large", label: "text-embedding-3-large", encoding: "cl100k_base", maxOutputTokens: 8191 },
  { id: "text-embedding-ada-002", label: "text-embedding-ada-002 (legacy)", encoding: "cl100k_base", maxOutputTokens: 8191 },
];

type Encoder = { encode: (text: string) => number[] };

const encoderCache = new Map<TokenizerEncoding, Promise<Encoder>>();

function loadEncoder(encoding: TokenizerEncoding): Promise<Encoder> {
  let cached = encoderCache.get(encoding);
  if (cached) return cached;
  cached =
    encoding === "o200k_base"
      ? import("gpt-tokenizer/encoding/o200k_base")
      : import("gpt-tokenizer/encoding/cl100k_base");
  encoderCache.set(encoding, cached);
  return cached;
}

export async function countTokens(text: string, encoding: TokenizerEncoding): Promise<number> {
  if (!text) return 0;
  const encoder = await loadEncoder(encoding);
  return encoder.encode(text).length;
}

export async function encodeTokens(text: string, encoding: TokenizerEncoding): Promise<number[]> {
  if (!text) return [];
  const encoder = await loadEncoder(encoding);
  return encoder.encode(text);
}

export function estimateCost(tokens: number, dollarsPerMillion: number): number {
  return (tokens / 1_000_000) * dollarsPerMillion;
}

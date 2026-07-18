"use client";

import { useCallback } from "react";
import { HashTool } from "@/components/tools/shared/hash-tool";
import { md5, encodeDigest, type DigestEncoding } from "@/lib/hash-utils";

const SAMPLE_TEXT = "The quick brown fox jumps over the lazy dog";

export function Md5GeneratorTool() {
  const digest = useCallback((text: string, encoding: DigestEncoding) => {
    const hex = md5(text);
    if (encoding === "hex") return hex;
    const bytes = new Uint8Array(hex.length / 2);
    for (let i = 0; i < bytes.length; i++) bytes[i] = parseInt(hex.slice(i * 2, i * 2 + 2), 16);
    return encodeDigest(bytes, "base64");
  }, []);

  return <HashTool algorithmName="MD5" sampleInput={SAMPLE_TEXT} digest={digest} />;
}

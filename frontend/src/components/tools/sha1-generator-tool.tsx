"use client";

import { useCallback } from "react";
import { HashTool } from "@/components/tools/shared/hash-tool";
import { sha, encodeDigest, type DigestEncoding } from "@/lib/hash-utils";

const SAMPLE_TEXT = "The quick brown fox jumps over the lazy dog";

export function Sha1GeneratorTool() {
  const digest = useCallback(async (text: string, encoding: DigestEncoding) => {
    const bytes = await sha(text, "SHA-1");
    return encodeDigest(bytes, encoding);
  }, []);

  return <HashTool algorithmName="SHA-1" sampleInput={SAMPLE_TEXT} digest={digest} />;
}

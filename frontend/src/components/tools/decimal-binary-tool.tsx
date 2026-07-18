"use client";

import { BaseConverterTool } from "@/components/tools/shared/base-converter-tool";

export function DecimalBinaryTool() {
  return <BaseConverterTool radix={2} label="Binary (base 2)" placeholder="e.g. 11111111" sampleDecimal={255} />;
}

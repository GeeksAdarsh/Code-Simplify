"use client";

import { BaseConverterTool } from "@/components/tools/shared/base-converter-tool";

export function DecimalOctalTool() {
  return <BaseConverterTool radix={8} label="Octal (base 8)" placeholder="e.g. 377" sampleDecimal={255} />;
}

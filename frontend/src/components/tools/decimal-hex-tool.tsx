"use client";

import { BaseConverterTool } from "@/components/tools/shared/base-converter-tool";

export function DecimalHexTool() {
  return <BaseConverterTool radix={16} label="Hexadecimal (base 16)" placeholder="e.g. ff" sampleDecimal={255} />;
}

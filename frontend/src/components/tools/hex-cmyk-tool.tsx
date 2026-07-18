"use client";

import { parseHexText, parseCmykText, rgbToHex, formatCmyk, rgbToCmyk } from "@/lib/color-utils";
import { TwoWayConverter } from "@/components/tools/shared/color-shared";

export function HexCmykTool() {
  return (
    <TwoWayConverter
      fieldA={{ label: "HEX", placeholder: "#0ea5e9", parse: parseHexText, format: rgbToHex }}
      fieldB={{
        label: "CMYK",
        placeholder: "cmyk(94%, 29%, 0%, 9%)",
        parse: parseCmykText,
        format: (rgb) => formatCmyk(rgbToCmyk(rgb)),
      }}
    />
  );
}

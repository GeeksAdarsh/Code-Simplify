"use client";

import { parseRgbText, parseCmykText, formatRgb, formatCmyk, rgbToCmyk } from "@/lib/color-utils";
import { TwoWayConverter } from "@/components/tools/shared/color-shared";

export function RgbCmykTool() {
  return (
    <TwoWayConverter
      fieldA={{ label: "RGB", placeholder: "rgb(14, 165, 233)", parse: parseRgbText, format: formatRgb }}
      fieldB={{
        label: "CMYK",
        placeholder: "cmyk(94%, 29%, 0%, 9%)",
        parse: parseCmykText,
        format: (rgb) => formatCmyk(rgbToCmyk(rgb)),
      }}
    />
  );
}

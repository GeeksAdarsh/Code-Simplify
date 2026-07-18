"use client";

import { parseHexText, parseRgbText, rgbToHex, formatRgb } from "@/lib/color-utils";
import { TwoWayConverter } from "@/components/tools/shared/color-shared";

export function HexRgbTool() {
  return (
    <TwoWayConverter
      fieldA={{ label: "HEX", placeholder: "#0ea5e9", parse: parseHexText, format: rgbToHex }}
      fieldB={{ label: "RGB", placeholder: "rgb(14, 165, 233)", parse: parseRgbText, format: formatRgb }}
    />
  );
}

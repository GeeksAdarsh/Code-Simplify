"use client";

import { parseHexText, parseHsvText, rgbToHex, formatHsv, rgbToHsv } from "@/lib/color-utils";
import { TwoWayConverter } from "@/components/tools/shared/color-shared";

export function HexHsvTool() {
  return (
    <TwoWayConverter
      fieldA={{ label: "HEX", placeholder: "#0ea5e9", parse: parseHexText, format: rgbToHex }}
      fieldB={{
        label: "HSV",
        placeholder: "hsv(199, 94%, 91%)",
        parse: parseHsvText,
        format: (rgb) => formatHsv(rgbToHsv(rgb)),
      }}
    />
  );
}

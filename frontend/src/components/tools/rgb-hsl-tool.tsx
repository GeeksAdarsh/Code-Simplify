"use client";

import { parseRgbText, parseHslText, formatRgb, formatHsl, rgbToHsl } from "@/lib/color-utils";
import { TwoWayConverter } from "@/components/tools/shared/color-shared";

export function RgbHslTool() {
  return (
    <TwoWayConverter
      fieldA={{ label: "RGB", placeholder: "rgb(14, 165, 233)", parse: parseRgbText, format: formatRgb }}
      fieldB={{
        label: "HSL",
        placeholder: "hsl(199, 89%, 48%)",
        parse: parseHslText,
        format: (rgb) => formatHsl(rgbToHsl(rgb)),
      }}
    />
  );
}

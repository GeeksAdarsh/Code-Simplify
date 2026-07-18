export interface RGB {
  r: number;
  g: number;
  b: number;
}

export interface HSL {
  h: number;
  s: number;
  l: number;
}

export interface HSV {
  h: number;
  s: number;
  v: number;
}

export interface CMYK {
  c: number;
  m: number;
  y: number;
  k: number;
}

export function clamp(n: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, n));
}

function round(n: number): number {
  return Math.round(n);
}

/** Normalizes any hex color (3, 4, 6, or 8 digits, with or without '#') to lowercase "#rrggbb" (alpha dropped). */
export function normalizeHex(input: string): string | null {
  const trimmed = input.trim().replace(/^#/, "");
  if (!/^[0-9a-fA-F]+$/.test(trimmed)) return null;

  if (trimmed.length === 3 || trimmed.length === 4) {
    const [r, g, b] = trimmed.slice(0, 3).split("");
    return `#${r}${r}${g}${g}${b}${b}`.toLowerCase();
  }
  if (trimmed.length === 6 || trimmed.length === 8) {
    return `#${trimmed.slice(0, 6)}`.toLowerCase();
  }
  return null;
}

export function hexToRgb(input: string): RGB | null {
  const hex = normalizeHex(input);
  if (!hex) return null;
  const int = parseInt(hex.slice(1), 16);
  return {
    r: (int >> 16) & 255,
    g: (int >> 8) & 255,
    b: int & 255,
  };
}

export function rgbToHex({ r, g, b }: RGB): string {
  const toHex = (n: number) => clamp(round(n), 0, 255).toString(16).padStart(2, "0");
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

export function rgbToHsl({ r, g, b }: RGB): HSL {
  const rn = r / 255;
  const gn = g / 255;
  const bn = b / 255;
  const max = Math.max(rn, gn, bn);
  const min = Math.min(rn, gn, bn);
  const l = (max + min) / 2;

  if (max === min) return { h: 0, s: 0, l: l * 100 };

  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  let h: number;
  switch (max) {
    case rn:
      h = (gn - bn) / d + (gn < bn ? 6 : 0);
      break;
    case gn:
      h = (bn - rn) / d + 2;
      break;
    default:
      h = (rn - gn) / d + 4;
  }
  h /= 6;

  return { h: h * 360, s: s * 100, l: l * 100 };
}

export function hslToRgb({ h, s, l }: HSL): RGB {
  const hn = ((h % 360) + 360) % 360 / 360;
  const sn = clamp(s, 0, 100) / 100;
  const ln = clamp(l, 0, 100) / 100;

  if (sn === 0) {
    const v = round(ln * 255);
    return { r: v, g: v, b: v };
  }

  const hue2rgb = (p: number, q: number, t: number) => {
    let tt = t;
    if (tt < 0) tt += 1;
    if (tt > 1) tt -= 1;
    if (tt < 1 / 6) return p + (q - p) * 6 * tt;
    if (tt < 1 / 2) return q;
    if (tt < 2 / 3) return p + (q - p) * (2 / 3 - tt) * 6;
    return p;
  };

  const q = ln < 0.5 ? ln * (1 + sn) : ln + sn - ln * sn;
  const p = 2 * ln - q;
  const r = hue2rgb(p, q, hn + 1 / 3);
  const g = hue2rgb(p, q, hn);
  const b = hue2rgb(p, q, hn - 1 / 3);

  return { r: round(r * 255), g: round(g * 255), b: round(b * 255) };
}

export function rgbToHsv({ r, g, b }: RGB): HSV {
  const rn = r / 255;
  const gn = g / 255;
  const bn = b / 255;
  const max = Math.max(rn, gn, bn);
  const min = Math.min(rn, gn, bn);
  const v = max;
  const d = max - min;
  const s = max === 0 ? 0 : d / max;

  let h = 0;
  if (max !== min) {
    switch (max) {
      case rn:
        h = (gn - bn) / d + (gn < bn ? 6 : 0);
        break;
      case gn:
        h = (bn - rn) / d + 2;
        break;
      default:
        h = (rn - gn) / d + 4;
    }
    h /= 6;
  }

  return { h: h * 360, s: s * 100, v: v * 100 };
}

export function hsvToRgb({ h, s, v }: HSV): RGB {
  const hn = ((h % 360) + 360) % 360 / 360;
  const sn = clamp(s, 0, 100) / 100;
  const vn = clamp(v, 0, 100) / 100;

  const i = Math.floor(hn * 6);
  const f = hn * 6 - i;
  const p = vn * (1 - sn);
  const q = vn * (1 - f * sn);
  const t = vn * (1 - (1 - f) * sn);

  let r = 0;
  let g = 0;
  let b = 0;
  switch (i % 6) {
    case 0:
      r = vn; g = t; b = p; break;
    case 1:
      r = q; g = vn; b = p; break;
    case 2:
      r = p; g = vn; b = t; break;
    case 3:
      r = p; g = q; b = vn; break;
    case 4:
      r = t; g = p; b = vn; break;
    default:
      r = vn; g = p; b = q;
  }

  return { r: round(r * 255), g: round(g * 255), b: round(b * 255) };
}

export function rgbToCmyk({ r, g, b }: RGB): CMYK {
  if (r === 0 && g === 0 && b === 0) return { c: 0, m: 0, y: 0, k: 100 };

  const rn = r / 255;
  const gn = g / 255;
  const bn = b / 255;
  const k = 1 - Math.max(rn, gn, bn);
  const c = (1 - rn - k) / (1 - k);
  const m = (1 - gn - k) / (1 - k);
  const y = (1 - bn - k) / (1 - k);

  return { c: c * 100, m: m * 100, y: y * 100, k: k * 100 };
}

export function cmykToRgb({ c, m, y, k }: CMYK): RGB {
  const cn = clamp(c, 0, 100) / 100;
  const mn = clamp(m, 0, 100) / 100;
  const yn = clamp(y, 0, 100) / 100;
  const kn = clamp(k, 0, 100) / 100;

  return {
    r: round(255 * (1 - cn) * (1 - kn)),
    g: round(255 * (1 - mn) * (1 - kn)),
    b: round(255 * (1 - yn) * (1 - kn)),
  };
}

export function formatRgb(rgb: RGB): string {
  return `rgb(${round(rgb.r)}, ${round(rgb.g)}, ${round(rgb.b)})`;
}

export function formatHsl(hsl: HSL): string {
  return `hsl(${round(hsl.h)}, ${round(hsl.s)}%, ${round(hsl.l)}%)`;
}

export function formatHsv(hsv: HSV): string {
  return `hsv(${round(hsv.h)}, ${round(hsv.s)}%, ${round(hsv.v)}%)`;
}

export function formatCmyk(cmyk: CMYK): string {
  return `cmyk(${round(cmyk.c)}%, ${round(cmyk.m)}%, ${round(cmyk.y)}%, ${round(cmyk.k)}%)`;
}

const NAMED_COLORS: Record<string, string> = {
  black: "#000000", white: "#ffffff", red: "#ff0000", lime: "#00ff00", blue: "#0000ff",
  yellow: "#ffff00", cyan: "#00ffff", magenta: "#ff00ff", silver: "#c0c0c0", gray: "#808080",
  grey: "#808080", maroon: "#800000", olive: "#808000", green: "#008000", purple: "#800080",
  teal: "#008080", navy: "#000080", orange: "#ffa500", pink: "#ffc0cb", brown: "#a52a2a",
  gold: "#ffd700", indigo: "#4b0082", violet: "#ee82ee", coral: "#ff7f50", salmon: "#fa8072",
  khaki: "#f0e68c", crimson: "#dc143c", chocolate: "#d2691e", tomato: "#ff6347", orchid: "#da70d6",
  turquoise: "#40e0d0", skyblue: "#87ceeb", slateblue: "#6a5acd", steelblue: "#4682b4",
  royalblue: "#4169e1", forestgreen: "#228b22", seagreen: "#2e8b57", darkgreen: "#006400",
  lightgreen: "#90ee90", darkred: "#8b0000", firebrick: "#b22222", hotpink: "#ff69b4",
  deeppink: "#ff1493", lavender: "#e6e6fa", beige: "#f5f5dc", ivory: "#fffff0", plum: "#dda0dd",
  transparent: "#00000000",
};

/** Parses hex (#rgb/#rrggbb), rgb()/rgba(), hsl()/hsla(), or a small set of CSS named colors. */
export function parseCssColor(input: string): RGB | null {
  const value = input.trim().toLowerCase();
  if (!value) return null;

  if (value.startsWith("#")) return hexToRgb(value);

  if (NAMED_COLORS[value]) return hexToRgb(NAMED_COLORS[value]);

  const rgbMatch = value.match(/^rgba?\(\s*([\d.]+%?)\s*,\s*([\d.]+%?)\s*,\s*([\d.]+%?)/);
  if (rgbMatch) {
    const parse = (v: string) => (v.endsWith("%") ? (parseFloat(v) / 100) * 255 : parseFloat(v));
    return { r: round(parse(rgbMatch[1])), g: round(parse(rgbMatch[2])), b: round(parse(rgbMatch[3])) };
  }

  const hslMatch = value.match(/^hsla?\(\s*([\d.]+)\s*,\s*([\d.]+)%\s*,\s*([\d.]+)%/);
  if (hslMatch) {
    return hslToRgb({ h: parseFloat(hslMatch[1]), s: parseFloat(hslMatch[2]), l: parseFloat(hslMatch[3]) });
  }

  if (/^[a-z]+$/.test(value) && !normalizeHex(value)) return null;
  return hexToRgb(value);
}

function extractNumbers(text: string): number[] {
  const matches = text.match(/-?\d+(\.\d+)?/g);
  return matches ? matches.map(Number) : [];
}

/** Parses free-form "r, g, b" or "rgb(r, g, b)" text into an RGB value. */
export function parseRgbText(text: string): RGB | null {
  const [r, g, b] = extractNumbers(text);
  if (r === undefined || g === undefined || b === undefined) return null;
  if ([r, g, b].some((n) => n < 0 || n > 255)) return null;
  return { r: round(r), g: round(g), b: round(b) };
}

/** Parses free-form "h, s%, l%" or "hsl(h, s%, l%)" text into an RGB value. */
export function parseHslText(text: string): RGB | null {
  const [h, s, l] = extractNumbers(text);
  if (h === undefined || s === undefined || l === undefined) return null;
  if (s < 0 || s > 100 || l < 0 || l > 100) return null;
  return hslToRgb({ h, s, l });
}

/** Parses free-form "h, s%, v%" or "hsv(h, s%, v%)" text into an RGB value. */
export function parseHsvText(text: string): RGB | null {
  const [h, s, v] = extractNumbers(text);
  if (h === undefined || s === undefined || v === undefined) return null;
  if (s < 0 || s > 100 || v < 0 || v > 100) return null;
  return hsvToRgb({ h, s, v });
}

/** Parses free-form "c%, m%, y%, k%" or "cmyk(c%, m%, y%, k%)" text into an RGB value. */
export function parseCmykText(text: string): RGB | null {
  const [c, m, y, k] = extractNumbers(text);
  if (c === undefined || m === undefined || y === undefined || k === undefined) return null;
  if ([c, m, y, k].some((n) => n < 0 || n > 100)) return null;
  return cmykToRgb({ c, m, y, k });
}

/** Parses hex text (delegates to normalizeHex/hexToRgb, kept here for a consistent parser naming scheme). */
export function parseHexText(text: string): RGB | null {
  return hexToRgb(text);
}

export function randomHex(): string {
  const n = Math.floor(Math.random() * 0xffffff);
  return `#${n.toString(16).padStart(6, "0")}`;
}

function srgbToLinear(c: number): number {
  const cs = c / 255;
  return cs <= 0.03928 ? cs / 12.92 : Math.pow((cs + 0.055) / 1.055, 2.4);
}

export function relativeLuminance({ r, g, b }: RGB): number {
  return 0.2126 * srgbToLinear(r) + 0.7152 * srgbToLinear(g) + 0.0722 * srgbToLinear(b);
}

export function contrastRatio(a: RGB, b: RGB): number {
  const l1 = relativeLuminance(a);
  const l2 = relativeLuminance(b);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

export interface WcagResult {
  ratio: number;
  aaNormal: boolean;
  aaLarge: boolean;
  aaaNormal: boolean;
  aaaLarge: boolean;
}

export function evaluateWcag(a: RGB, b: RGB): WcagResult {
  const ratio = contrastRatio(a, b);
  return {
    ratio,
    aaNormal: ratio >= 4.5,
    aaLarge: ratio >= 3,
    aaaNormal: ratio >= 7,
    aaaLarge: ratio >= 4.5,
  };
}

export type ColorBlindnessType = "protanopia" | "deuteranopia" | "tritanopia" | "achromatopsia";

const CVD_MATRICES: Record<Exclude<ColorBlindnessType, "achromatopsia">, number[][]> = {
  protanopia: [
    [0.567, 0.433, 0],
    [0.558, 0.442, 0],
    [0, 0.242, 0.758],
  ],
  deuteranopia: [
    [0.625, 0.375, 0],
    [0.7, 0.3, 0],
    [0, 0.3, 0.7],
  ],
  tritanopia: [
    [0.95, 0.05, 0],
    [0, 0.433, 0.567],
    [0, 0.475, 0.525],
  ],
};

/** Approximate simulation of how a color appears to someone with the given color vision deficiency. */
export function simulateColorBlindness(rgb: RGB, type: ColorBlindnessType): RGB {
  if (type === "achromatopsia") {
    const gray = round(0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b);
    return { r: gray, g: gray, b: gray };
  }

  const m = CVD_MATRICES[type];
  const { r, g, b } = rgb;
  return {
    r: clamp(round(m[0][0] * r + m[0][1] * g + m[0][2] * b), 0, 255),
    g: clamp(round(m[1][0] * r + m[1][1] * g + m[1][2] * b), 0, 255),
    b: clamp(round(m[2][0] * r + m[2][1] * g + m[2][2] * b), 0, 255),
  };
}

/** Mutates raw RGBA image pixel data in place, simulating the given color vision deficiency. */
export function simulateColorBlindnessOnImageData(data: Uint8ClampedArray, type: ColorBlindnessType): void {
  for (let i = 0; i < data.length; i += 4) {
    const rgb = simulateColorBlindness({ r: data[i], g: data[i + 1], b: data[i + 2] }, type);
    data[i] = rgb.r;
    data[i + 1] = rgb.g;
    data[i + 2] = rgb.b;
  }
}

export type HarmonyType = "complementary" | "analogous" | "triadic" | "tetradic" | "split-complementary" | "monochromatic";

/** Generates a small palette of hex colors related to the base color by the given harmony rule. */
export function generateHarmony(baseHex: string, type: HarmonyType): string[] {
  const rgb = hexToRgb(baseHex);
  if (!rgb) return [];
  const hsl = rgbToHsl(rgb);

  const withHue = (deltaH: number, s = hsl.s, l = hsl.l) => rgbToHex(hslToRgb({ h: hsl.h + deltaH, s, l }));

  switch (type) {
    case "complementary":
      return [rgbToHex(rgb), withHue(180)];
    case "analogous":
      return [withHue(-30), rgbToHex(rgb), withHue(30)];
    case "triadic":
      return [rgbToHex(rgb), withHue(120), withHue(240)];
    case "tetradic":
      return [rgbToHex(rgb), withHue(90), withHue(180), withHue(270)];
    case "split-complementary":
      return [rgbToHex(rgb), withHue(150), withHue(210)];
    case "monochromatic":
      return [
        withHue(0, hsl.s, clamp(hsl.l - 30, 0, 100)),
        withHue(0, hsl.s, clamp(hsl.l - 15, 0, 100)),
        rgbToHex(rgb),
        withHue(0, hsl.s, clamp(hsl.l + 15, 0, 100)),
        withHue(0, hsl.s, clamp(hsl.l + 30, 0, 100)),
      ];
  }
}

/** Generates `steps` shades (toward black) and tints (toward white) of a base color, including the base itself. */
export function generateShadesAndTints(baseHex: string, steps = 5): { shades: string[]; tints: string[] } {
  const rgb = hexToRgb(baseHex);
  if (!rgb) return { shades: [], tints: [] };
  const hsl = rgbToHsl(rgb);

  const shades = Array.from({ length: steps }, (_, i) => {
    const l = hsl.l * (1 - (i + 1) / (steps + 1));
    return rgbToHex(hslToRgb({ h: hsl.h, s: hsl.s, l }));
  });

  const tints = Array.from({ length: steps }, (_, i) => {
    const l = hsl.l + (100 - hsl.l) * ((i + 1) / (steps + 1));
    return rgbToHex(hslToRgb({ h: hsl.h, s: hsl.s, l }));
  });

  return { shades, tints };
}

export function percentageOf(percent: number, value: number): number {
  return (percent / 100) * value;
}

export function whatPercent(x: number, y: number): number {
  if (y === 0) return NaN;
  return (x / y) * 100;
}

export function percentageChange(original: number, changed: number): number {
  if (original === 0) return NaN;
  return ((changed - original) / Math.abs(original)) * 100;
}

export function percentageDifference(a: number, b: number): number {
  if (a === 0 && b === 0) return 0;
  return (Math.abs(a - b) / ((Math.abs(a) + Math.abs(b)) / 2)) * 100;
}

export type BmiUnit = "metric" | "imperial";

export interface BmiResult {
  bmi: number;
  category: string;
}

export function calculateBmi(
  weight: number,
  height: number,
  unit: BmiUnit,
): BmiResult {
  let bmi: number;
  if (unit === "metric") {
    const heightM = height / 100;
    bmi = weight / (heightM * heightM);
  } else {
    bmi = (weight / (height * height)) * 703;
  }

  let category: string;
  if (bmi < 18.5) category = "Underweight";
  else if (bmi < 25) category = "Normal weight";
  else if (bmi < 30) category = "Overweight";
  else category = "Obese";

  return { bmi, category };
}

export interface RomanConversionOptions {
  min?: number;
  max?: number;
}

const ROMAN_VALUES: [string, number][] = [
  ["M", 1000], ["CM", 900], ["D", 500], ["CD", 400],
  ["C", 100], ["XC", 90], ["L", 50], ["XL", 40],
  ["X", 10], ["IX", 9], ["V", 5], ["IV", 4], ["I", 1],
];

export function toRoman(num: number): string | null {
  if (!Number.isInteger(num) || num < 1 || num > 3999) return null;
  let n = num;
  let result = "";
  for (const [symbol, value] of ROMAN_VALUES) {
    while (n >= value) {
      result += symbol;
      n -= value;
    }
  }
  return result;
}

export function fromRoman(roman: string): number | null {
  const value = roman.trim().toUpperCase();
  if (!/^[MDCLXVI]+$/.test(value)) return null;

  const map: Record<string, number> = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 };
  let total = 0;
  let prev = 0;

  for (let i = value.length - 1; i >= 0; i--) {
    const current = map[value[i]];
    if (current < prev) total -= current;
    else total += current;
    prev = current;
  }

  return toRoman(total) === value ? total : null;
}

export type UnitCategory = "length" | "weight" | "temperature" | "volume" | "area" | "speed";

interface UnitDef {
  key: string;
  label: string;
  toBase: number;
}

export const UNIT_CATEGORIES: Record<Exclude<UnitCategory, "temperature">, UnitDef[]> = {
  length: [
    { key: "mm", label: "Millimeters", toBase: 0.001 },
    { key: "cm", label: "Centimeters", toBase: 0.01 },
    { key: "m", label: "Meters", toBase: 1 },
    { key: "km", label: "Kilometers", toBase: 1000 },
    { key: "in", label: "Inches", toBase: 0.0254 },
    { key: "ft", label: "Feet", toBase: 0.3048 },
    { key: "yd", label: "Yards", toBase: 0.9144 },
    { key: "mi", label: "Miles", toBase: 1609.344 },
  ],
  weight: [
    { key: "mg", label: "Milligrams", toBase: 0.001 },
    { key: "g", label: "Grams", toBase: 1 },
    { key: "kg", label: "Kilograms", toBase: 1000 },
    { key: "t", label: "Metric tons", toBase: 1_000_000 },
    { key: "oz", label: "Ounces", toBase: 28.349523125 },
    { key: "lb", label: "Pounds", toBase: 453.59237 },
    { key: "st", label: "Stone", toBase: 6350.29318 },
  ],
  volume: [
    { key: "ml", label: "Milliliters", toBase: 0.001 },
    { key: "l", label: "Liters", toBase: 1 },
    { key: "gal", label: "Gallons (US)", toBase: 3.785411784 },
    { key: "qt", label: "Quarts (US)", toBase: 0.946352946 },
    { key: "pt", label: "Pints (US)", toBase: 0.473176473 },
    { key: "cup", label: "Cups (US)", toBase: 0.2365882365 },
    { key: "flOz", label: "Fluid ounces (US)", toBase: 0.0295735295625 },
  ],
  area: [
    { key: "mm2", label: "Sq. millimeters", toBase: 0.000001 },
    { key: "cm2", label: "Sq. centimeters", toBase: 0.0001 },
    { key: "m2", label: "Sq. meters", toBase: 1 },
    { key: "ha", label: "Hectares", toBase: 10000 },
    { key: "km2", label: "Sq. kilometers", toBase: 1_000_000 },
    { key: "ft2", label: "Sq. feet", toBase: 0.09290304 },
    { key: "ac", label: "Acres", toBase: 4046.8564224 },
    { key: "mi2", label: "Sq. miles", toBase: 2_589_988.110336 },
  ],
  speed: [
    { key: "mps", label: "Meters/second", toBase: 1 },
    { key: "kph", label: "Kilometers/hour", toBase: 0.2777777778 },
    { key: "mph", label: "Miles/hour", toBase: 0.44704 },
    { key: "knot", label: "Knots", toBase: 0.5144444444 },
    { key: "fps", label: "Feet/second", toBase: 0.3048 },
  ],
};

export function convertUnit(value: number, category: Exclude<UnitCategory, "temperature">, fromKey: string, toKey: string): number | null {
  const units = UNIT_CATEGORIES[category];
  const from = units.find((u) => u.key === fromKey);
  const to = units.find((u) => u.key === toKey);
  if (!from || !to) return null;
  return (value * from.toBase) / to.toBase;
}

export type TemperatureUnit = "celsius" | "fahrenheit" | "kelvin";

export function convertTemperature(value: number, from: TemperatureUnit, to: TemperatureUnit): number {
  let celsius: number;
  switch (from) {
    case "celsius":
      celsius = value;
      break;
    case "fahrenheit":
      celsius = ((value - 32) * 5) / 9;
      break;
    case "kelvin":
      celsius = value - 273.15;
      break;
  }

  switch (to) {
    case "celsius":
      return celsius;
    case "fahrenheit":
      return (celsius * 9) / 5 + 32;
    case "kelvin":
      return celsius + 273.15;
  }
}

export function parseIntSafe(text: string, radix: number): number | null {
  const trimmed = text.trim();
  if (!trimmed) return null;
  const validChars = "0123456789abcdefghijklmnopqrstuvwxyz".slice(0, radix);
  const pattern = new RegExp(`^[+-]?[${validChars}]+$`, "i");
  if (!pattern.test(trimmed)) return null;
  const value = parseInt(trimmed, radix);
  return Number.isNaN(value) ? null : value;
}

export function toBase(value: number, radix: number): string {
  return value.toString(radix);
}

/** A safe evaluator for arithmetic/scientific expressions (no eval). Supports + - * / ^ % parentheses and common math functions. */
export function evaluateExpression(expression: string): number {
  const tokens = tokenize(expression);
  const { value, index } = parseExpression(tokens, 0);
  if (index !== tokens.length) throw new Error("Unexpected token in expression");
  return value;
}

type Token = { type: "number" | "operator" | "lparen" | "rparen" | "identifier" | "comma"; value: string };

function tokenize(expr: string): Token[] {
  const tokens: Token[] = [];
  let i = 0;
  while (i < expr.length) {
    const ch = expr[i];
    if (/\s/.test(ch)) {
      i++;
    } else if (/[0-9.]/.test(ch)) {
      let num = "";
      while (i < expr.length && /[0-9.]/.test(expr[i])) num += expr[i++];
      tokens.push({ type: "number", value: num });
    } else if (/[a-zA-Z]/.test(ch)) {
      let id = "";
      while (i < expr.length && /[a-zA-Z0-9]/.test(expr[i])) id += expr[i++];
      tokens.push({ type: "identifier", value: id });
    } else if ("+-*/^%".includes(ch)) {
      tokens.push({ type: "operator", value: ch });
      i++;
    } else if (ch === "(") {
      tokens.push({ type: "lparen", value: ch });
      i++;
    } else if (ch === ")") {
      tokens.push({ type: "rparen", value: ch });
      i++;
    } else if (ch === ",") {
      tokens.push({ type: "comma", value: ch });
      i++;
    } else {
      throw new Error(`Unexpected character "${ch}"`);
    }
  }
  return tokens;
}

const CONSTANTS: Record<string, number> = { pi: Math.PI, e: Math.E };
const FUNCTIONS: Record<string, (...args: number[]) => number> = {
  sin: (x) => Math.sin((x * Math.PI) / 180),
  cos: (x) => Math.cos((x * Math.PI) / 180),
  tan: (x) => Math.tan((x * Math.PI) / 180),
  asin: (x) => (Math.asin(x) * 180) / Math.PI,
  acos: (x) => (Math.acos(x) * 180) / Math.PI,
  atan: (x) => (Math.atan(x) * 180) / Math.PI,
  sqrt: Math.sqrt,
  cbrt: Math.cbrt,
  log: Math.log10,
  ln: Math.log,
  abs: Math.abs,
  exp: Math.exp,
  pow: Math.pow,
  round: Math.round,
  floor: Math.floor,
  ceil: Math.ceil,
};

function parseExpression(tokens: Token[], pos: number): { value: number; index: number } {
  return parseAddSub(tokens, pos);
}

function parseAddSub(tokens: Token[], pos: number): { value: number; index: number } {
  let { value: left, index } = parseMulDiv(tokens, pos);
  while (tokens[index] && tokens[index].type === "operator" && (tokens[index].value === "+" || tokens[index].value === "-")) {
    const op = tokens[index].value;
    const rhs = parseMulDiv(tokens, index + 1);
    left = op === "+" ? left + rhs.value : left - rhs.value;
    index = rhs.index;
  }
  return { value: left, index };
}

function parseMulDiv(tokens: Token[], pos: number): { value: number; index: number } {
  let { value: left, index } = parsePow(tokens, pos);
  while (
    tokens[index] &&
    tokens[index].type === "operator" &&
    (tokens[index].value === "*" || tokens[index].value === "/" || tokens[index].value === "%")
  ) {
    const op = tokens[index].value;
    const rhs = parsePow(tokens, index + 1);
    if (op === "*") left *= rhs.value;
    else if (op === "/") left /= rhs.value;
    else left %= rhs.value;
    index = rhs.index;
  }
  return { value: left, index };
}

function parsePow(tokens: Token[], pos: number): { value: number; index: number } {
  const { value: left, index } = parseUnary(tokens, pos);
  if (tokens[index] && tokens[index].type === "operator" && tokens[index].value === "^") {
    const rhs = parsePow(tokens, index + 1);
    return { value: Math.pow(left, rhs.value), index: rhs.index };
  }
  return { value: left, index };
}

function parseUnary(tokens: Token[], pos: number): { value: number; index: number } {
  if (tokens[pos] && tokens[pos].type === "operator" && tokens[pos].value === "-") {
    const operand = parseUnary(tokens, pos + 1);
    return { value: -operand.value, index: operand.index };
  }
  if (tokens[pos] && tokens[pos].type === "operator" && tokens[pos].value === "+") {
    return parseUnary(tokens, pos + 1);
  }
  return parseAtom(tokens, pos);
}

function parseAtom(tokens: Token[], pos: number): { value: number; index: number } {
  const token = tokens[pos];
  if (!token) throw new Error("Unexpected end of expression");

  if (token.type === "number") {
    return { value: parseFloat(token.value), index: pos + 1 };
  }

  if (token.type === "lparen") {
    const inner = parseExpression(tokens, pos + 1);
    if (!tokens[inner.index] || tokens[inner.index].type !== "rparen") throw new Error("Missing closing parenthesis");
    return { value: inner.value, index: inner.index + 1 };
  }

  if (token.type === "identifier") {
    const name = token.value.toLowerCase();
    if (tokens[pos + 1] && tokens[pos + 1].type === "lparen") {
      const args: number[] = [];
      let idx = pos + 2;
      if (tokens[idx] && tokens[idx].type !== "rparen") {
        while (true) {
          const arg = parseExpression(tokens, idx);
          args.push(arg.value);
          idx = arg.index;
          if (tokens[idx] && tokens[idx].type === "comma") {
            idx++;
            continue;
          }
          break;
        }
      }
      if (!tokens[idx] || tokens[idx].type !== "rparen") throw new Error("Missing closing parenthesis");
      const fn = FUNCTIONS[name];
      if (!fn) throw new Error(`Unknown function "${name}"`);
      return { value: fn(...args), index: idx + 1 };
    }
    if (name in CONSTANTS) return { value: CONSTANTS[name], index: pos + 1 };
    throw new Error(`Unknown identifier "${name}"`);
  }

  throw new Error("Unexpected token in expression");
}

export type RandomStringCharset = "letters" | "letters-numbers" | "numbers" | "hex" | "custom";

const CHARSETS: Record<Exclude<RandomStringCharset, "custom">, string> = {
  letters: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
  "letters-numbers": "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
  numbers: "0123456789",
  hex: "0123456789abcdef",
};

export function generateRandomString(length: number, charset: RandomStringCharset, customChars = ""): string {
  const pool = charset === "custom" ? customChars : CHARSETS[charset];
  if (!pool || length <= 0) return "";

  const randomValues = new Uint32Array(length);
  crypto.getRandomValues(randomValues);

  let result = "";
  for (let i = 0; i < length; i++) {
    result += pool[randomValues[i] % pool.length];
  }
  return result;
}

export function generateRandomInt(min: number, max: number): number {
  const lo = Math.ceil(Math.min(min, max));
  const hi = Math.floor(Math.max(min, max));
  const range = hi - lo + 1;
  const randomBuffer = new Uint32Array(1);
  crypto.getRandomValues(randomBuffer);
  return lo + (randomBuffer[0] % range);
}

export function generateUniqueRandomInts(min: number, max: number, count: number): number[] {
  const lo = Math.ceil(Math.min(min, max));
  const hi = Math.floor(Math.max(min, max));
  const range = hi - lo + 1;
  const n = Math.min(count, range);

  const pool = Array.from({ length: range }, (_, i) => lo + i);
  for (let i = 0; i < n; i++) {
    const randomBuffer = new Uint32Array(1);
    crypto.getRandomValues(randomBuffer);
    const j = i + (randomBuffer[0] % (pool.length - i));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  return pool.slice(0, n);
}

export function pickRandom<T>(items: readonly T[]): T {
  return items[generateRandomInt(0, items.length - 1)];
}

// ---------------------------------------------------------------------------
// Random word
// ---------------------------------------------------------------------------

const WORD_LIST = [
  "amber", "anchor", "aspect", "auburn", "banner", "beacon", "blossom", "bramble", "breeze", "bridge",
  "canyon", "cascade", "cedar", "cinder", "cliff", "clover", "comet", "coral", "crimson", "crystal",
  "current", "delta", "dune", "ember", "falcon", "fern", "flint", "forest", "frost", "glacier",
  "grove", "harbor", "haven", "hazel", "horizon", "ivory", "jasper", "juniper", "lagoon", "lantern",
  "lattice", "linen", "lumen", "maple", "marble", "meadow", "mist", "mosaic", "nebula", "nectar",
  "obsidian", "onyx", "opal", "orchid", "pebble", "petal", "phoenix", "pine", "plume", "prairie",
  "quartz", "quill", "ridge", "river", "rustic", "saffron", "sage", "sapphire", "shadow", "shore",
  "silver", "sky", "slate", "sonic", "spark", "spruce", "storm", "summit", "swift", "tangerine",
  "tempest", "thicket", "thunder", "tide", "timber", "topaz", "tundra", "twilight", "umber", "valley",
  "velvet", "vertex", "violet", "vista", "willow", "wisp", "zephyr", "zenith",
];

export function generateRandomWord(): string {
  return pickRandom(WORD_LIST);
}

// ---------------------------------------------------------------------------
// Random letter
// ---------------------------------------------------------------------------

export type LetterCase = "upper" | "lower" | "mixed";

export function generateRandomLetter(letterCase: LetterCase = "mixed"): string {
  const letter = String.fromCharCode(generateRandomInt(65, 90));
  if (letterCase === "upper") return letter;
  if (letterCase === "lower") return letter.toLowerCase();
  return generateRandomInt(0, 1) === 0 ? letter : letter.toLowerCase();
}

// ---------------------------------------------------------------------------
// Random color
// ---------------------------------------------------------------------------

export function generateRandomHexColor(): string {
  const bytes = new Uint8Array(3);
  crypto.getRandomValues(bytes);
  return `#${Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("")}`;
}

// ---------------------------------------------------------------------------
// Random name / username / nickname
// ---------------------------------------------------------------------------

const FIRST_NAMES = [
  "Liam", "Olivia", "Noah", "Emma", "Ava", "Ethan", "Sophia", "Mason", "Isabella", "Lucas",
  "Mia", "Elijah", "Amelia", "James", "Harper", "Benjamin", "Evelyn", "Henry", "Abigail", "Alexander",
  "Ella", "Michael", "Scarlett", "Daniel", "Grace", "Jackson", "Chloe", "Sebastian", "Victoria", "Owen",
  "Riley", "Aiden", "Zoey", "Samuel", "Nora", "Matthew", "Lily", "Joseph", "Hannah", "Levi",
  "Aria", "David", "Layla", "Wyatt", "Nova", "John", "Ellie", "Carter", "Aurora", "Julian",
];

const LAST_NAMES = [
  "Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez",
  "Hernandez", "Lopez", "Gonzalez", "Wilson", "Anderson", "Thomas", "Taylor", "Moore", "Jackson", "Martin",
  "Lee", "Perez", "Thompson", "White", "Harris", "Sanchez", "Clark", "Ramirez", "Lewis", "Robinson",
  "Walker", "Young", "Allen", "King", "Wright", "Scott", "Torres", "Nguyen", "Hill", "Flores",
  "Green", "Adams", "Nelson", "Baker", "Hall", "Rivera", "Campbell", "Mitchell", "Carter", "Roberts",
];

export interface RandomName {
  first: string;
  last: string;
  full: string;
}

export function generateRandomName(): RandomName {
  const first = pickRandom(FIRST_NAMES);
  const last = pickRandom(LAST_NAMES);
  return { first, last, full: `${first} ${last}` };
}

const USERNAME_ADJECTIVES = [
  "swift", "silent", "clever", "brave", "cosmic", "hidden", "lucky", "mighty", "quiet", "quick",
  "royal", "solar", "wild", "witty", "zesty", "bold", "calm", "eager", "fuzzy", "jolly",
];

const USERNAME_NOUNS = [
  "falcon", "otter", "comet", "maple", "raven", "tiger", "pixel", "ranger", "wolf", "nomad",
  "panda", "rocket", "sparrow", "voyager", "wizard", "phoenix", "cobra", "dragon", "yeti", "orbit",
];

export function generateRandomUsername(): string {
  const adjective = pickRandom(USERNAME_ADJECTIVES);
  const noun = pickRandom(USERNAME_NOUNS);
  const number = generateRandomInt(1, 999);
  return `${adjective}${noun.charAt(0).toUpperCase()}${noun.slice(1)}${number}`;
}

const NICKNAME_ANIMALS = [
  "Fox", "Bear", "Wolf", "Hawk", "Otter", "Lynx", "Panda", "Falcon", "Tiger", "Owl",
  "Raven", "Puma", "Cobra", "Moose", "Shark", "Eagle", "Koala", "Badger", "Heron", "Viper",
];

export function generateRandomNickname(): string {
  const adjective = pickRandom(USERNAME_ADJECTIVES);
  const animal = pickRandom(NICKNAME_ANIMALS);
  return `${adjective.charAt(0).toUpperCase()}${adjective.slice(1)}${animal}`;
}

// ---------------------------------------------------------------------------
// Random emoji
// ---------------------------------------------------------------------------

const EMOJI_LIST = [
  "\u{1F600}", "\u{1F602}", "\u{1F60E}", "\u{1F914}", "\u{1F973}", "\u{1F60D}", "\u{1F92F}", "\u{1F644}",
  "\u{1F914}", "\u{1F929}", "\u{1F60A}", "\u{1F643}", "\u{1F609}", "\u{1F638}", "\u{1F63A}", "\u{1F63B}",
  "\u{1F436}", "\u{1F431}", "\u{1F98A}", "\u{1F42F}", "\u{1F42C}", "\u{1F984}", "\u{1F41D}", "\u{1F41C}",
  "\u{1F335}", "\u{1F33B}", "\u{1F340}", "\u{1F34E}", "\u{1F349}", "\u{1F347}", "\u{1F355}", "\u{1F369}",
  "\u26BD", "\u{1F3C0}", "\u{1F3AE}", "\u{1F3B8}", "\u{1F3A8}", "\u{1F680}", "\u2708\uFE0F", "\u{1F30D}",
  "\u{1F31F}", "\u26A1", "\u{1F525}", "\u{1F308}", "\u2728", "\u{1F389}", "\u{1F3AF}", "\u{1F3C6}",
];

export function generateRandomEmoji(): string {
  return pickRandom(EMOJI_LIST);
}

// ---------------------------------------------------------------------------
// Random date / time
// ---------------------------------------------------------------------------

export function generateRandomDate(startYear: number, endYear: number): Date {
  const DAY_MS = 86_400_000;
  // UTC on both ends so formatDate's toISOString never crosses into a neighbouring year.
  const firstDay = Date.UTC(startYear, 0, 1) / DAY_MS;
  const lastDay = Date.UTC(endYear, 11, 31) / DAY_MS;
  return new Date(generateRandomInt(firstDay, lastDay) * DAY_MS);
}

export function formatDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

export function generateRandomTime(): { hours: number; minutes: number; seconds: number } {
  return {
    hours: generateRandomInt(0, 23),
    minutes: generateRandomInt(0, 59),
    seconds: generateRandomInt(0, 59),
  };
}

export function formatTime(time: { hours: number; minutes: number; seconds: number }, use24Hour: boolean): string {
  const pad = (n: number) => String(n).padStart(2, "0");
  if (use24Hour) {
    return `${pad(time.hours)}:${pad(time.minutes)}:${pad(time.seconds)}`;
  }
  const period = time.hours >= 12 ? "PM" : "AM";
  const hour12 = time.hours % 12 === 0 ? 12 : time.hours % 12;
  return `${pad(hour12)}:${pad(time.minutes)}:${pad(time.seconds)} ${period}`;
}

// ---------------------------------------------------------------------------
// Random IP / MAC
// ---------------------------------------------------------------------------

export function generateRandomIPv4(): string {
  return Array.from({ length: 4 }, () => generateRandomInt(0, 255)).join(".");
}

export function generateRandomIPv6(): string {
  const groups = Array.from({ length: 8 }, () => generateRandomInt(0, 0xffff).toString(16).padStart(4, "0"));
  return groups.join(":");
}

export function generateRandomMacAddress(uppercase = false): string {
  const bytes = new Uint8Array(6);
  crypto.getRandomValues(bytes);
  // Set the locally-administered bit and clear the multicast bit on the first octet
  // so the address is clearly a generated one, not a real vendor-assigned MAC.
  bytes[0] = (bytes[0] & 0xfc) | 0x02;
  const hex = Array.from(bytes, (b) => b.toString(16).padStart(2, "0"));
  const mac = hex.join(":");
  return uppercase ? mac.toUpperCase() : mac;
}

// ---------------------------------------------------------------------------
// Random credit card (fake test data only)
// ---------------------------------------------------------------------------

export type CardNetwork = "visa" | "mastercard" | "amex" | "discover";

const CARD_PREFIXES: Record<CardNetwork, { prefixes: string[]; length: number }> = {
  visa: { prefixes: ["4"], length: 16 },
  mastercard: { prefixes: ["51", "52", "53", "54", "55"], length: 16 },
  amex: { prefixes: ["34", "37"], length: 15 },
  discover: { prefixes: ["6011"], length: 16 },
};

/** Expects the number with a placeholder 0 in the check-digit position. */
function luhnCheckDigit(digits: string): number {
  let sum = 0;
  let double = false;
  for (let i = digits.length - 1; i >= 0; i--) {
    let d = Number(digits[i]) * (double ? 2 : 1);
    if (d > 9) d -= 9;
    sum += d;
    double = !double;
  }
  return (10 - (sum % 10)) % 10;
}

export interface FakeCreditCard {
  network: CardNetwork;
  number: string;
  formatted: string;
  expiry: string;
  cvc: string;
}

export function generateRandomCreditCard(network: CardNetwork): FakeCreditCard {
  const { prefixes, length } = CARD_PREFIXES[network];
  const prefix = pickRandom(prefixes);
  let digits = prefix;
  while (digits.length < length - 1) {
    digits += generateRandomInt(0, 9);
  }
  const checkDigit = luhnCheckDigit(digits + "0");
  const number = digits + checkDigit;
  const formatted = network === "amex" ? number.replace(/(\d{4})(\d{6})(\d{5})/, "$1 $2 $3") : number.replace(/(\d{4})(?=\d)/g, "$1 ").trim();

  const month = String(generateRandomInt(1, 12)).padStart(2, "0");
  const year = generateRandomInt(new Date().getFullYear() + 1, new Date().getFullYear() + 5);
  const cvc = network === "amex" ? String(generateRandomInt(0, 9999)).padStart(4, "0") : String(generateRandomInt(0, 999)).padStart(3, "0");

  return { network, number, formatted, expiry: `${month}/${String(year).slice(-2)}`, cvc };
}

// ---------------------------------------------------------------------------
// Random phone number (fake, uses reserved/fictional ranges only)
// ---------------------------------------------------------------------------

export type PhoneCountry = "us" | "uk" | "in" | "generic";

export function generateRandomPhoneNumber(country: PhoneCountry): string {
  switch (country) {
    case "us": {
      // Area codes 200-999 (excluding N11 codes), exchange fixed to 555 which
      // the NANP reserves exclusively for fictional use in media and testing.
      const area = generateRandomInt(2, 9) * 100 + generateRandomInt(0, 99);
      const line = String(generateRandomInt(0, 9999)).padStart(4, "0");
      return `+1 (${area}) 555-${line}`;
    }
    case "uk":
      return `+44 7${generateRandomInt(100, 999)} ${generateRandomInt(100000, 999999)}`;
    case "in":
      return `+91 ${pickRandom(["7", "8", "9"])}${generateRandomInt(100000000, 999999999)}`;
    default:
      return `+${generateRandomInt(1, 99)} ${generateRandomInt(100, 999)} ${generateRandomInt(1000000, 9999999)}`;
  }
}

// ---------------------------------------------------------------------------
// Random address (fake, generic placeholder data only)
// ---------------------------------------------------------------------------

const STREET_NAMES = [
  "Maple", "Oak", "Cedar", "Pine", "Elm", "Birch", "Willow", "Sunset", "Highland", "Lakeview",
  "Meadow", "Riverside", "Hillcrest", "Fairview", "Spring", "Chestnut", "Magnolia", "Aspen", "Cypress", "Brookside",
];

const STREET_TYPES = ["St", "Ave", "Blvd", "Dr", "Ln", "Ct", "Way", "Rd"];

const CITIES_STATES: { city: string; state: string }[] = [
  { city: "Springfield", state: "IL" }, { city: "Riverside", state: "CA" }, { city: "Franklin", state: "TN" },
  { city: "Georgetown", state: "TX" }, { city: "Clinton", state: "OH" }, { city: "Salem", state: "OR" },
  { city: "Fairview", state: "NC" }, { city: "Greenville", state: "SC" }, { city: "Madison", state: "WI" },
  { city: "Arlington", state: "VA" }, { city: "Bristol", state: "CT" }, { city: "Kingston", state: "NY" },
];

export interface FakeAddress {
  street: string;
  city: string;
  state: string;
  zip: string;
  formatted: string;
}

export function generateRandomAddress(): FakeAddress {
  const houseNumber = generateRandomInt(100, 9999);
  const street = `${houseNumber} ${pickRandom(STREET_NAMES)} ${pickRandom(STREET_TYPES)}`;
  const { city, state } = pickRandom(CITIES_STATES);
  const zip = String(generateRandomInt(10000, 99999));
  return { street, city, state, zip, formatted: `${street}, ${city}, ${state} ${zip}` };
}

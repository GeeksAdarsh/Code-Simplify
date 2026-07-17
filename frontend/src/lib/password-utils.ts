export interface PasswordGenOptions {
  length: number;
  uppercase: boolean;
  lowercase: boolean;
  numbers: boolean;
  symbols: boolean;
  excludeAmbiguous: boolean;
}

const LOWER = "abcdefghijklmnopqrstuvwxyz";
const UPPER = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const NUMBERS = "0123456789";
const SYMBOLS = "!@#$%^&*()_+-=[]{}|;:,.<>?";
const AMBIGUOUS = new Set(["i", "l", "1", "L", "o", "0", "O"]);

export function generatePassword(options: PasswordGenOptions): string {
  let pool = "";
  if (options.uppercase) pool += UPPER;
  if (options.lowercase) pool += LOWER;
  if (options.numbers) pool += NUMBERS;
  if (options.symbols) pool += SYMBOLS;

  if (options.excludeAmbiguous) {
    pool = pool
      .split("")
      .filter((c) => !AMBIGUOUS.has(c))
      .join("");
  }

  if (!pool) return "";

  const randomValues = new Uint32Array(options.length);
  crypto.getRandomValues(randomValues);

  let result = "";
  for (let i = 0; i < options.length; i++) {
    result += pool[randomValues[i] % pool.length];
  }
  return result;
}

export interface PasswordStrengthResult {
  score: 0 | 1 | 2 | 3 | 4;
  label: string;
  entropyBits: number;
  crackTimeDisplay: string;
  feedback: string[];
}

const COMMON_PASSWORDS = new Set([
  "password", "123456", "12345678", "123456789", "qwerty", "abc123", "letmein",
  "monkey", "111111", "iloveyou", "admin", "welcome", "password1", "123123",
  "1234567890", "dragon", "sunshine", "master", "football", "shadow", "superman",
  "qwerty123", "trustno1", "batman", "passw0rd",
]);

function formatDuration(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 1) return "instantly";
  const units: [string, number][] = [
    ["century", 60 * 60 * 24 * 365 * 100],
    ["year", 60 * 60 * 24 * 365],
    ["day", 60 * 60 * 24],
    ["hour", 60 * 60],
    ["minute", 60],
    ["second", 1],
  ];
  for (const [name, unitSeconds] of units) {
    if (seconds >= unitSeconds) {
      const value = Math.round(seconds / unitSeconds);
      if (name === "century" && value > 10000) return "essentially forever";
      return `${value.toLocaleString()} ${name}${value === 1 ? "" : "s"}`;
    }
  }
  return "instantly";
}

export function checkPasswordStrength(password: string): PasswordStrengthResult {
  if (!password) {
    return {
      score: 0,
      label: "No password",
      entropyBits: 0,
      crackTimeDisplay: "instantly",
      feedback: ["Enter a password above to check its strength."],
    };
  }

  const feedback: string[] = [];
  const hasLower = /[a-z]/.test(password);
  const hasUpper = /[A-Z]/.test(password);
  const hasDigit = /[0-9]/.test(password);
  const hasSymbol = /[^a-zA-Z0-9]/.test(password);

  let poolSize = 0;
  if (hasLower) poolSize += 26;
  if (hasUpper) poolSize += 26;
  if (hasDigit) poolSize += 10;
  if (hasSymbol) poolSize += 32;
  if (poolSize === 0) poolSize = 1;

  let entropyBits = password.length * Math.log2(poolSize);

  if (COMMON_PASSWORDS.has(password.toLowerCase())) {
    entropyBits = Math.min(entropyBits, 10);
    feedback.push("This is one of the most commonly leaked passwords in the world \u2014 never use it.");
  }

  if (/(.)\1{2,}/.test(password)) {
    entropyBits *= 0.7;
    feedback.push("Avoid repeating the same character three or more times in a row.");
  }

  if (/0123|1234|2345|3456|4567|5678|6789|9876|8765|7654|6543|5432|4321|3210|abcd|bcde|cdef|qwer|asdf|zxcv/i.test(password)) {
    entropyBits *= 0.7;
    feedback.push("Avoid sequential or keyboard-adjacent character patterns.");
  }

  if (password.length < 8) {
    feedback.push("Use at least 8 characters \u2014 every extra character makes a password exponentially harder to crack.");
  }
  if (!hasUpper) feedback.push("Add uppercase letters for extra strength.");
  if (!hasDigit) feedback.push("Add numbers for extra strength.");
  if (!hasSymbol) feedback.push("Add symbols such as !@#$ for extra strength.");

  entropyBits = Math.max(0, entropyBits);

  let score: PasswordStrengthResult["score"];
  let label: string;
  if (entropyBits < 28) {
    score = 0;
    label = "Very Weak";
  } else if (entropyBits < 36) {
    score = 1;
    label = "Weak";
  } else if (entropyBits < 60) {
    score = 2;
    label = "Fair";
  } else if (entropyBits < 80) {
    score = 3;
    label = "Strong";
  } else {
    score = 4;
    label = "Very Strong";
  }

  const guessesPerSecond = 1e10;
  const secondsToCrack = Math.pow(2, entropyBits) / guessesPerSecond;

  if (feedback.length === 0) feedback.push("Great password \u2014 no obvious weaknesses detected.");

  return {
    score,
    label,
    entropyBits: Math.round(entropyBits * 10) / 10,
    crackTimeDisplay: formatDuration(secondsToCrack),
    feedback,
  };
}

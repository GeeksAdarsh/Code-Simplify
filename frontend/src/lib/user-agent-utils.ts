export interface UserAgentInfo {
  raw: string;
  browserName?: string;
  browserVersion?: string;
  engineName?: string;
  engineVersion?: string;
  osName?: string;
  osVersion?: string;
  deviceType: "Desktop" | "Mobile" | "Tablet" | "Bot" | "Unknown";
  isBot: boolean;
  comments: string[];
}

const WINDOWS_VERSION_MAP: Record<string, string> = {
  "10.0": "10 / 11",
  "6.3": "8.1",
  "6.2": "8",
  "6.1": "7",
  "6.0": "Vista",
  "5.2": "XP x64 / Server 2003",
  "5.1": "XP",
};

const BOT_PATTERNS = [
  "bot",
  "spider",
  "crawler",
  "crawling",
  "googlebot",
  "bingbot",
  "slurp",
  "duckduckbot",
  "baiduspider",
  "yandexbot",
  "facebookexternalhit",
  "twitterbot",
  "linkedinbot",
  "slackbot",
  "curl",
  "wget",
  "postmanruntime",
  "python-requests",
  "axios",
  "headlesschrome",
];

function extractComments(ua: string): string[] {
  const match = /\(([^()]*)\)/.exec(ua);
  if (!match) return [];
  return match[1]
    .split(";")
    .map((s) => s.trim())
    .filter(Boolean);
}

function detectOs(ua: string): { osName?: string; osVersion?: string } {
  let match = /Windows NT ([\d.]+)/i.exec(ua);
  if (match) {
    return { osName: "Windows", osVersion: WINDOWS_VERSION_MAP[match[1]] ?? match[1] };
  }
  if (/Windows/i.test(ua)) return { osName: "Windows" };

  match = /iPhone OS ([\d_]+)/i.exec(ua) || /CPU OS ([\d_]+)/i.exec(ua);
  if (match) return { osName: "iOS", osVersion: match[1].replace(/_/g, ".") };

  match = /Mac OS X ([\d_.]+)/i.exec(ua);
  if (match) return { osName: "macOS", osVersion: match[1].replace(/_/g, ".") };
  if (/Macintosh/i.test(ua)) return { osName: "macOS" };

  match = /Android ([\d.]+)/i.exec(ua);
  if (match) return { osName: "Android", osVersion: match[1] };
  if (/Android/i.test(ua)) return { osName: "Android" };

  if (/CrOS/i.test(ua)) return { osName: "Chrome OS" };

  if (/Linux/i.test(ua)) return { osName: "Linux" };

  return {};
}

function detectDeviceType(ua: string, osName?: string): UserAgentInfo["deviceType"] {
  if (BOT_PATTERNS.some((p) => ua.toLowerCase().includes(p))) return "Bot";
  if (/iPad|Tablet(?!.*Mobile)/i.test(ua)) return "Tablet";
  if (/Android/i.test(ua) && !/Mobile/i.test(ua)) return "Tablet";
  if (/Mobi|iPhone|iPod|Android/i.test(ua)) return "Mobile";
  if (osName) return "Desktop";
  return "Unknown";
}

function detectEngine(ua: string): { engineName?: string; engineVersion?: string } {
  let match = /Edg(?:e|A|iOS)?\/([\d.]+)/i.exec(ua);
  if (match && /Edg\//i.test(ua)) return { engineName: "Blink", engineVersion: undefined };

  match = /Gecko\/([\d.]+)/i.exec(ua);
  if (match && /Firefox/i.test(ua)) return { engineName: "Gecko" };

  match = /AppleWebKit\/([\d.]+)/i.exec(ua);
  if (match) {
    const isBlink = /Chrome|Chromium|CriOS|Edg|OPR/i.test(ua);
    return { engineName: isBlink ? "Blink" : "WebKit", engineVersion: match[1] };
  }

  match = /Trident\/([\d.]+)/i.exec(ua);
  if (match) return { engineName: "Trident", engineVersion: match[1] };

  return {};
}

function detectBrowser(ua: string): { browserName?: string; browserVersion?: string } {
  const patterns: { name: string; regex: RegExp }[] = [
    { name: "Edge", regex: /Edg(?:e|A|iOS)?\/([\d.]+)/i },
    { name: "Opera", regex: /(?:OPR|Opera)\/([\d.]+)/i },
    { name: "Samsung Internet", regex: /SamsungBrowser\/([\d.]+)/i },
    { name: "UC Browser", regex: /UCBrowser\/([\d.]+)/i },
    { name: "Vivaldi", regex: /Vivaldi\/([\d.]+)/i },
    { name: "Brave", regex: /Brave\/([\d.]+)/i },
    { name: "Facebook App", regex: /FBAV\/([\d.]+)/i },
    { name: "Instagram App", regex: /Instagram ([\d.]+)/i },
    { name: "Firefox", regex: /Firefox\/([\d.]+)/i },
    { name: "Internet Explorer", regex: /MSIE ([\d.]+)/i },
    { name: "Internet Explorer", regex: /Trident\/.*rv:([\d.]+)/i },
    { name: "Chrome", regex: /(?:Chrome|CriOS)\/([\d.]+)/i },
    { name: "Safari", regex: /Version\/([\d.]+).*Safari/i },
    { name: "Safari", regex: /Safari\/([\d.]+)/i },
  ];

  for (const { name, regex } of patterns) {
    const match = regex.exec(ua);
    if (match) return { browserName: name, browserVersion: match[1] };
  }
  return {};
}

export function parseUserAgent(ua: string): UserAgentInfo {
  const trimmed = ua.trim();
  const isBot = BOT_PATTERNS.some((p) => trimmed.toLowerCase().includes(p));
  const { osName, osVersion } = detectOs(trimmed);
  const { browserName, browserVersion } = detectBrowser(trimmed);
  const { engineName, engineVersion } = detectEngine(trimmed);

  return {
    raw: trimmed,
    browserName: isBot ? undefined : browserName,
    browserVersion: isBot ? undefined : browserVersion,
    engineName,
    engineVersion,
    osName,
    osVersion,
    deviceType: detectDeviceType(trimmed, osName),
    isBot,
    comments: extractComments(trimmed),
  };
}

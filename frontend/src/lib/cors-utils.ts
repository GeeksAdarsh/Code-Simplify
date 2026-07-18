export interface CorsOptions {
  origins: string;
  methods: string;
  headers: string;
  credentials: boolean;
  maxAge: string;
  exposedHeaders: string;
}

export function buildCorsHeaders(opts: CorsOptions): { name: string; value: string }[] {
  const result: { name: string; value: string }[] = [];
  const originList = opts.origins
    .split(/[\n,]/)
    .map((o) => o.trim())
    .filter(Boolean);

  if (originList.length === 0) {
    result.push({ name: "Access-Control-Allow-Origin", value: "*" });
  } else if (originList.length === 1 && originList[0] !== "*") {
    result.push({ name: "Access-Control-Allow-Origin", value: originList[0] });
    result.push({ name: "Vary", value: "Origin" });
  } else if (originList.includes("*")) {
    result.push({ name: "Access-Control-Allow-Origin", value: "*" });
  } else {
    result.push({ name: "Access-Control-Allow-Origin", value: "<reflect request Origin if it matches: " + originList.join(", ") + ">" });
    result.push({ name: "Vary", value: "Origin" });
  }

  if (opts.methods.trim()) {
    result.push({ name: "Access-Control-Allow-Methods", value: opts.methods.trim() });
  }
  if (opts.headers.trim()) {
    result.push({ name: "Access-Control-Allow-Headers", value: opts.headers.trim() });
  }
  if (opts.exposedHeaders.trim()) {
    result.push({ name: "Access-Control-Expose-Headers", value: opts.exposedHeaders.trim() });
  }
  if (opts.credentials) {
    result.push({ name: "Access-Control-Allow-Credentials", value: "true" });
  }
  if (opts.maxAge.trim()) {
    result.push({ name: "Access-Control-Max-Age", value: opts.maxAge.trim() });
  }

  return result;
}

export function corsWarnings(opts: CorsOptions): string[] {
  const warnings: string[] = [];
  const originList = opts.origins
    .split(/[\n,]/)
    .map((o) => o.trim())
    .filter(Boolean);
  if (opts.credentials && (originList.length === 0 || originList.includes("*"))) {
    warnings.push('Access-Control-Allow-Credentials cannot be used together with a wildcard "*" origin \u2014 browsers will reject the response. Specify exact origin(s) instead.');
  }
  if (opts.credentials && originList.length > 1) {
    warnings.push("With credentials enabled, you must reflect a single validated Origin per response (not a static list) \u2014 your server needs matching logic.");
  }
  return warnings;
}

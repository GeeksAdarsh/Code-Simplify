export interface ParsedArn {
  partition: string;
  service: string;
  region: string;
  accountId: string;
  resourceType?: string;
  resourceId: string;
  raw: string;
}

export function parseArn(arn: string): ParsedArn | { error: string } {
  const trimmed = arn.trim();
  if (!trimmed.startsWith("arn:")) {
    return { error: 'ARNs must start with "arn:".' };
  }
  const parts = trimmed.split(":");
  if (parts.length < 6) {
    return { error: "An ARN needs at least 6 colon-separated fields: arn:partition:service:region:account-id:resource." };
  }
  const [, partition, service, region, accountId, ...resourceParts] = parts;
  const resource = resourceParts.join(":");

  let resourceType: string | undefined;
  let resourceId: string;
  if (resource.includes("/")) {
    const slashIdx = resource.indexOf("/");
    resourceType = resource.slice(0, slashIdx);
    resourceId = resource.slice(slashIdx + 1);
  } else if (resource.includes(":")) {
    const colonIdx = resource.indexOf(":");
    resourceType = resource.slice(0, colonIdx);
    resourceId = resource.slice(colonIdx + 1);
  } else {
    resourceId = resource;
  }

  return { partition, service, region, accountId, resourceType, resourceId, raw: trimmed };
}

export function buildArn(opts: { partition: string; service: string; region: string; accountId: string; resourceType?: string; resourceId: string; separator: "/" | ":" }): string {
  const resource = opts.resourceType ? `${opts.resourceType}${opts.separator}${opts.resourceId}` : opts.resourceId;
  return `arn:${opts.partition}:${opts.service}:${opts.region}:${opts.accountId}:${resource}`;
}

const AWS_CRON_FIELDS = ["minute", "hour", "day-of-month", "month", "day-of-week", "year"];

export function unixCronToAwsCron(unixCron: string): { result?: string; error?: string } {
  const fields = unixCron.trim().split(/\s+/);
  if (fields.length !== 5) {
    return { error: "A standard Unix/cron expression needs exactly 5 fields: minute hour day-of-month month day-of-week." };
  }
  const [minute, hour, month] = fields;
  let dom = fields[2];
  let dow = fields[4];

  if (dom !== "*" && dow !== "*") {
    return { error: "AWS cron requires exactly one of day-of-month or day-of-week to be \"?\" \u2014 both cannot be specified at once." };
  }
  if (dom === "*" && dow === "*") {
    dow = "?";
  } else if (dom === "*") {
    dom = "?";
  } else if (dow === "*") {
    dow = "?";
  }

  dow = dow.replace(/\b([0-7])\b/g, (m) => {
    const n = Number(m);
    const map = ["1", "2", "3", "4", "5", "6", "7", "1"];
    return map[n];
  });

  return { result: `cron(${minute} ${hour} ${dom} ${month} ${dow} *)` };
}

export function awsCronToUnixCron(awsCron: string): { result?: string; error?: string } {
  const match = /^cron\((.+)\)$/i.exec(awsCron.trim());
  const body = match ? match[1] : awsCron.trim();
  const fields = body.trim().split(/\s+/);
  if (fields.length !== 6) {
    return { error: "An AWS cron expression needs exactly 6 fields: minute hour day-of-month month day-of-week year (wrapped in cron(...))." };
  }
  const [minute, hour, dom, month, dow] = fields;

  if (dom !== "?" && dow !== "?") {
    return { error: "AWS cron must have \"?\" in either the day-of-month or day-of-week field." };
  }

  const unixDom = dom === "?" ? "*" : dom;
  let unixDow = dow === "?" ? "*" : dow;
  unixDow = unixDow.replace(/\b([1-7])\b/g, (m) => {
    const n = Number(m);
    const map = ["0", "1", "2", "3", "4", "5", "6", "0"];
    return map[n];
  });

  return { result: `${minute} ${hour} ${unixDom} ${month} ${unixDow}` };
}

export { AWS_CRON_FIELDS };

export interface ParsedS3Url {
  bucket: string;
  key: string;
  region?: string;
}

export function parseS3Url(url: string): ParsedS3Url | { error: string } {
  const trimmed = url.trim();

  const s3Proto = /^s3:\/\/([^/]+)\/?(.*)$/i.exec(trimmed);
  if (s3Proto) {
    return { bucket: s3Proto[1], key: decodeURIComponent(s3Proto[2] ?? "") };
  }

  let u: URL;
  try {
    u = new URL(trimmed);
  } catch {
    return { error: "Not a recognized S3 URL. Expected formats: s3://bucket/key, https://bucket.s3.amazonaws.com/key, or https://s3.region.amazonaws.com/bucket/key." };
  }

  const virtualHosted = /^([^.]+)\.s3[.-]([a-z0-9-]+\.amazonaws\.com)$/i.exec(u.hostname) ?? /^([^.]+)\.s3\.amazonaws\.com$/i.exec(u.hostname);
  if (virtualHosted) {
    const bucket = virtualHosted[1];
    const regionPart = /^s3[.-]([a-z0-9-]+)\.amazonaws\.com$/i.exec(u.hostname.slice(bucket.length + 1));
    const region = regionPart && regionPart[1] !== "amazonaws" ? regionPart[1] : undefined;
    return { bucket, key: decodeURIComponent(u.pathname.replace(/^\//, "")), region };
  }

  const pathStyle = /^s3[.-]([a-z0-9-]+)\.amazonaws\.com$/i.exec(u.hostname) ?? /^s3\.amazonaws\.com$/i.exec(u.hostname);
  if (pathStyle) {
    const region = pathStyle[1] && pathStyle[1] !== "amazonaws" ? pathStyle[1] : undefined;
    const pathParts = u.pathname.replace(/^\//, "").split("/");
    const bucket = pathParts.shift() ?? "";
    return { bucket, key: decodeURIComponent(pathParts.join("/")), region };
  }

  return { error: "Not a recognized S3 URL. Expected formats: s3://bucket/key, https://bucket.s3.amazonaws.com/key, or https://s3.region.amazonaws.com/bucket/key." };
}

export function buildS3Urls(bucket: string, key: string, region: string): { label: string; url: string }[] {
  const cleanKey = key.replace(/^\/+/, "");
  const encodedKey = cleanKey.split("/").map(encodeURIComponent).join("/");
  const regionHost = !region || region === "us-east-1" ? "s3.amazonaws.com" : `s3.${region}.amazonaws.com`;
  return [
    { label: "s3:// URI", url: `s3://${bucket}/${cleanKey}` },
    { label: "Virtual-hosted-style URL", url: `https://${bucket}.${regionHost}/${encodedKey}` },
    { label: "Path-style URL", url: `https://${regionHost}/${bucket}/${encodedKey}` },
    {
      label: "Static website endpoint",
      url: `http://${bucket}.s3-website${region && region !== "us-east-1" ? `-${region}` : ""}.amazonaws.com/${encodedKey}`,
    },
  ];
}

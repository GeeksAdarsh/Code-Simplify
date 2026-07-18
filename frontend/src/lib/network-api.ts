/**
 * These lookups need real outbound network access (DNS resolution, a raw
 * WHOIS socket, an HTTP fetch, IP geolocation) that a browser can't perform
 * directly, so they call this app's own Spring Boot backend at /api/network/*
 * (proxied by Next.js in dev via next.config.ts). The backend validates and
 * guards every target before making an outbound connection.
 */

export interface DnsRecord {
  type: string;
  name: string;
  ttl: number;
  value: string;
}

export interface DnsLookupResult {
  domain: string;
  type: string;
  records: DnsRecord[];
}

export interface WhoisResult {
  domain: string;
  whoisServer: string;
  rawText: string;
}

export interface HttpHeaderEntry {
  name: string;
  value: string;
}

export interface HttpHeaderResult {
  url: string;
  statusCode: number;
  statusText: string;
  headers: HttpHeaderEntry[];
  redirectLocation?: string | null;
}

export interface IpLookupResult {
  status: string;
  message?: string | null;
  country?: string;
  countryCode?: string;
  region?: string;
  regionName?: string;
  city?: string;
  zip?: string;
  lat?: number;
  lon?: number;
  timezone?: string;
  isp?: string;
  org?: string;
  as?: string;
  query?: string;
}

async function getJson<T>(path: string): Promise<T> {
  let response: Response;
  try {
    response = await fetch(path);
  } catch {
    throw new Error(
      "Could not reach the CodeSimplify backend. Make sure the Spring Boot server is running (see the project README)."
    );
  }

  const body = await response.json().catch(() => undefined);
  if (!response.ok) {
    const message = body && typeof body === "object" && "error" in body ? String(body.error) : response.statusText;
    throw new Error(message || `Request failed with status ${response.status}`);
  }
  return body as T;
}

export function fetchDnsRecords(domain: string, type: string): Promise<DnsLookupResult> {
  return getJson(`/api/network/dns?domain=${encodeURIComponent(domain)}&type=${encodeURIComponent(type)}`);
}

export function fetchWhois(domain: string): Promise<WhoisResult> {
  return getJson(`/api/network/whois?domain=${encodeURIComponent(domain)}`);
}

export function fetchHttpHeaders(url: string): Promise<HttpHeaderResult> {
  return getJson(`/api/network/http-headers?url=${encodeURIComponent(url)}`);
}

export function fetchIpLookup(ip: string): Promise<IpLookupResult> {
  return getJson(`/api/network/ip-lookup?ip=${encodeURIComponent(ip)}`);
}

const IPV4_RE = /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/;

export function isValidIpv4(value: string): boolean {
  const match = IPV4_RE.exec(value.trim());
  if (!match) return false;
  return match.slice(1).every((octet) => {
    if (!/^\d{1,3}$/.test(octet)) return false;
    const n = Number(octet);
    return n >= 0 && n <= 255 && String(n) === octet;
  });
}

export function ipv4ToLong(ip: string): number {
  const parts = ip.trim().split(".").map(Number);
  return ((parts[0] << 24) | (parts[1] << 16) | (parts[2] << 8) | parts[3]) >>> 0;
}

export function longToIpv4(value: number): string {
  return [24, 16, 8, 0].map((shift) => (value >>> shift) & 0xff).join(".");
}

export function prefixToMaskLong(prefix: number): number {
  if (prefix <= 0) return 0;
  if (prefix >= 32) return 0xffffffff;
  return (0xffffffff << (32 - prefix)) >>> 0;
}

export function prefixToMask(prefix: number): string {
  return longToIpv4(prefixToMaskLong(prefix));
}

export function maskToPrefix(mask: string): number | undefined {
  if (!isValidIpv4(mask)) return undefined;
  const maskLong = ipv4ToLong(mask);
  // A valid subnet mask is a run of 1s followed by a run of 0s (all-ones prefix, then zeros).
  const inverted = ~maskLong >>> 0;
  const isValidMask = (inverted & (inverted + 1)) === 0;
  if (!isValidMask) return undefined;
  let prefix = 0;
  let value = maskLong;
  for (let i = 0; i < 32; i++) {
    if ((value & 0x80000000) !== 0) prefix++;
    value = (value << 1) >>> 0;
  }
  return prefix;
}

export interface Ipv4CidrInfo {
  ip: string;
  prefix: number;
  subnetMask: string;
  wildcardMask: string;
  networkAddress: string;
  broadcastAddress: string;
  firstUsableHost?: string;
  lastUsableHost?: string;
  totalAddresses: number;
  usableHosts: number;
  ipClass: string;
  isPrivate: boolean;
}

export function classifyIpv4(ip: string): string {
  const first = Number(ip.split(".")[0]);
  if (first >= 1 && first <= 126) return "A";
  if (first === 127) return "A (loopback)";
  if (first >= 128 && first <= 191) return "B";
  if (first >= 192 && first <= 223) return "C";
  if (first >= 224 && first <= 239) return "D (multicast)";
  if (first >= 240 && first <= 255) return "E (reserved)";
  return "Unknown";
}

export function isPrivateIpv4(ip: string): boolean {
  const [a, b] = ip.split(".").map(Number);
  return (
    a === 10 ||
    (a === 172 && b >= 16 && b <= 31) ||
    (a === 192 && b === 168) ||
    a === 127 ||
    (a === 169 && b === 254)
  );
}

export function calculateIpv4Cidr(ip: string, prefix: number): Ipv4CidrInfo {
  if (!isValidIpv4(ip)) throw new Error(`"${ip}" is not a valid IPv4 address.`);
  if (!Number.isInteger(prefix) || prefix < 0 || prefix > 32) {
    throw new Error("Prefix length must be an integer between 0 and 32.");
  }

  const ipLong = ipv4ToLong(ip);
  const maskLong = prefixToMaskLong(prefix);
  const networkLong = (ipLong & maskLong) >>> 0;
  const broadcastLong = (networkLong | (~maskLong >>> 0)) >>> 0;
  const wildcardLong = (~maskLong) >>> 0;

  const totalAddresses = 2 ** (32 - prefix);
  const usableHosts = prefix >= 31 ? 0 : totalAddresses - 2;

  return {
    ip,
    prefix,
    subnetMask: longToIpv4(maskLong),
    wildcardMask: longToIpv4(wildcardLong),
    networkAddress: longToIpv4(networkLong),
    broadcastAddress: longToIpv4(broadcastLong),
    firstUsableHost: usableHosts > 0 ? longToIpv4(networkLong + 1) : undefined,
    lastUsableHost: usableHosts > 0 ? longToIpv4(broadcastLong - 1) : undefined,
    totalAddresses,
    usableHosts,
    ipClass: classifyIpv4(ip),
    isPrivate: isPrivateIpv4(ip),
  };
}

export interface SubnetSplit {
  cidr: string;
  networkAddress: string;
  broadcastAddress: string;
  firstUsableHost?: string;
  lastUsableHost?: string;
  usableHosts: number;
}

export function splitIntoSubnets(ip: string, basePrefix: number, newPrefix: number): SubnetSplit[] {
  if (newPrefix < basePrefix) {
    throw new Error("The new prefix must be longer (more bits) than the base network's prefix.");
  }
  if (newPrefix > 32) {
    throw new Error("Prefix length must be 32 or less.");
  }

  const base = calculateIpv4Cidr(ip, basePrefix);
  const baseNetworkLong = ipv4ToLong(base.networkAddress);
  const subnetCount = 2 ** (newPrefix - basePrefix);
  const subnetSize = 2 ** (32 - newPrefix);

  const maxSubnetsToReturn = 4096;
  const count = Math.min(subnetCount, maxSubnetsToReturn);

  const subnets: SubnetSplit[] = [];
  for (let i = 0; i < count; i++) {
    const networkLong = (baseNetworkLong + i * subnetSize) >>> 0;
    const info = calculateIpv4Cidr(longToIpv4(networkLong), newPrefix);
    subnets.push({
      cidr: `${info.networkAddress}/${newPrefix}`,
      networkAddress: info.networkAddress,
      broadcastAddress: info.broadcastAddress,
      firstUsableHost: info.firstUsableHost,
      lastUsableHost: info.lastUsableHost,
      usableHosts: info.usableHosts,
    });
  }
  return subnets;
}

export function smallestPrefixForHosts(hostsNeeded: number): number {
  for (let prefix = 30; prefix >= 0; prefix--) {
    const usable = prefix >= 31 ? 0 : 2 ** (32 - prefix) - 2;
    if (usable >= hostsNeeded) return prefix;
  }
  return 0;
}

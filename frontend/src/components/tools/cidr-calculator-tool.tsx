"use client";

import { useMemo, useState } from "react";
import { calculateIpv4Cidr } from "@/lib/ip-utils";

const SAMPLE = "192.168.1.0/24";

function parseCidrInput(value: string): { ip: string; prefix: number } | undefined {
  const trimmed = value.trim();
  if (!trimmed) return undefined;
  const [ip, prefixStr] = trimmed.split("/");
  const prefix = prefixStr !== undefined ? Number(prefixStr) : 24;
  if (!ip) return undefined;
  return { ip: ip.trim(), prefix };
}

export function CidrCalculatorTool() {
  const [input, setInput] = useState("");

  const result = useMemo(() => {
    const parsed = parseCidrInput(input);
    if (!parsed) return undefined;
    try {
      return { info: calculateIpv4Cidr(parsed.ip, parsed.prefix), error: undefined };
    } catch (e) {
      return { info: undefined, error: e instanceof Error ? e.message : "Invalid input" };
    }
  }, [input]);

  return (
    <div>
      <div className="card p-4">
        <label className="mb-1 block text-xs font-medium text-muted">IPv4 address with CIDR prefix</label>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="192.168.1.0/24"
          spellCheck={false}
          className="w-full rounded border border-border bg-background px-2.5 py-2 font-mono text-sm outline-none"
        />
        <div className="mt-2 flex gap-2">
          <button onClick={() => setInput(SAMPLE)} className="btn btn-secondary h-8 px-3 text-xs">
            Load sample
          </button>
          <button onClick={() => setInput("")} className="btn btn-secondary h-8 px-3 text-xs">
            Clear
          </button>
        </div>
      </div>

      {result?.error && (
        <div className="mt-4 rounded-lg border border-foreground/20 bg-surface px-4 py-3 text-sm">{result.error}</div>
      )}

      {result?.info && (
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <InfoCard label="Network address" value={result.info.networkAddress} />
          <InfoCard label="Broadcast address" value={result.info.broadcastAddress} />
          <InfoCard label="Subnet mask" value={result.info.subnetMask} />
          <InfoCard label="Wildcard mask" value={result.info.wildcardMask} />
          <InfoCard
            label="First usable host"
            value={result.info.firstUsableHost ?? "\u2014 (no usable hosts)"}
          />
          <InfoCard label="Last usable host" value={result.info.lastUsableHost ?? "\u2014 (no usable hosts)"} />
          <InfoCard label="Total addresses" value={result.info.totalAddresses.toLocaleString()} />
          <InfoCard label="Usable hosts" value={result.info.usableHosts.toLocaleString()} />
          <InfoCard label="IP class" value={result.info.ipClass} />
          <InfoCard label="Private/public" value={result.info.isPrivate ? "Private (RFC 1918)" : "Public"} />
        </div>
      )}

      <p className="mt-3 text-xs text-muted">
        Calculations run entirely in your browser. IPv6 CIDR is not yet supported.
      </p>
    </div>
  );
}

function InfoCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-border bg-background px-3 py-2.5">
      <p className="text-xs text-muted">{label}</p>
      <p className="mt-0.5 break-all font-mono text-sm">{value}</p>
    </div>
  );
}

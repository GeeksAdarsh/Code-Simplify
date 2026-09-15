"use client";

import { useMemo, useState } from "react";
import {
  calculateIpv4Cidr,
  isValidIpv4,
  maskToPrefix,
  smallestPrefixForHosts,
  splitIntoSubnets,
} from "@/lib/ip-utils";
import { DataTable } from "@/components/tools/shared/data-table";

type MaskMode = "cidr" | "mask";

export function SubnetCalculatorTool() {
  const [ip, setIp] = useState("192.168.1.0");
  const [maskMode, setMaskMode] = useState<MaskMode>("cidr");
  const [cidrPrefix, setCidrPrefix] = useState("24");
  const [dottedMask, setDottedMask] = useState("255.255.255.0");
  const [splitBy, setSplitBy] = useState<"subnets" | "hosts">("subnets");
  const [splitValue, setSplitValue] = useState("4");

  const prefix = useMemo(() => {
    if (maskMode === "cidr") {
      const n = Number(cidrPrefix);
      return Number.isInteger(n) && n >= 0 && n <= 32 ? n : undefined;
    }
    return maskToPrefix(dottedMask);
  }, [maskMode, cidrPrefix, dottedMask]);

  const base = useMemo(() => {
    if (!isValidIpv4(ip) || prefix === undefined) return undefined;
    try {
      return calculateIpv4Cidr(ip, prefix);
    } catch {
      return undefined;
    }
  }, [ip, prefix]);

  const splitResult = useMemo(() => {
    if (!base || prefix === undefined) return undefined;
    const value = Number(splitValue);
    if (!Number.isInteger(value) || value <= 0) return undefined;

    try {
      const newPrefix =
        splitBy === "subnets"
          ? prefix + Math.ceil(Math.log2(value))
          : smallestPrefixForHosts(value);
      if (newPrefix > 32 || newPrefix < prefix) return undefined;
      return { newPrefix, subnets: splitIntoSubnets(base.networkAddress, prefix, newPrefix) };
    } catch {
      return undefined;
    }
  }, [base, prefix, splitBy, splitValue]);

  return (
    <div>
      <div className="card grid gap-3 p-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-xs font-medium text-muted">IPv4 address</label>
          <input
            value={ip}
            onChange={(e) => setIp(e.target.value)}
            placeholder="192.168.1.0"
            spellCheck={false}
            className="w-full rounded border border-border bg-background px-2.5 py-1.5 font-mono text-sm outline-none"
          />
        </div>

        <div>
          <div className="mb-1 flex items-center justify-between">
            <label className="text-xs font-medium text-muted">Subnet</label>
            <div className="flex gap-1 text-xs">
              <button
                onClick={() => setMaskMode("cidr")}
                className={`rounded px-2 py-0.5 ${maskMode === "cidr" ? "bg-foreground text-background" : "text-muted"}`}
              >
                CIDR
              </button>
              <button
                onClick={() => setMaskMode("mask")}
                className={`rounded px-2 py-0.5 ${maskMode === "mask" ? "bg-foreground text-background" : "text-muted"}`}
              >
                Mask
              </button>
            </div>
          </div>
          {maskMode === "cidr" ? (
            <input
              value={cidrPrefix}
              onChange={(e) => setCidrPrefix(e.target.value)}
              placeholder="24"
              inputMode="numeric"
              className="w-full rounded border border-border bg-background px-2.5 py-1.5 font-mono text-sm outline-none"
            />
          ) : (
            <input
              value={dottedMask}
              onChange={(e) => setDottedMask(e.target.value)}
              placeholder="255.255.255.0"
              spellCheck={false}
              className="w-full rounded border border-border bg-background px-2.5 py-1.5 font-mono text-sm outline-none"
            />
          )}
        </div>
      </div>

      {!base && (
        <div className="mt-4 rounded-lg border border-foreground/20 bg-surface px-4 py-3 text-sm">
          Enter a valid IPv4 address and subnet mask or CIDR prefix.
        </div>
      )}

      {base && (
        <>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <InfoCard label="CIDR notation" value={`${base.networkAddress}/${base.prefix}`} />
            <InfoCard label="Subnet mask" value={base.subnetMask} />
            <InfoCard label="Wildcard mask" value={base.wildcardMask} />
            <InfoCard label="Network address" value={base.networkAddress} />
            <InfoCard label="Broadcast address" value={base.broadcastAddress} />
            <InfoCard label="Usable host range" value={base.usableHosts > 0 ? `${base.firstUsableHost} – ${base.lastUsableHost}` : "None"} />
            <InfoCard label="Total addresses" value={base.totalAddresses.toLocaleString()} />
            <InfoCard label="Usable hosts" value={base.usableHosts.toLocaleString()} />
          </div>

          <div className="mt-6 card p-4">
            <h3 className="text-xs font-semibold uppercase tracking-wide text-muted">Split this network into subnets</h3>
            <div className="mt-3 flex flex-wrap items-end gap-3">
              <div>
                <label className="mb-1 block text-xs text-muted">Split by</label>
                <select
                  value={splitBy}
                  onChange={(e) => setSplitBy(e.target.value as "subnets" | "hosts")}
                  className="rounded border border-border bg-background px-2.5 py-1.5 text-sm"
                >
                  <option value="subnets">Number of equal subnets</option>
                  <option value="hosts">Hosts needed per subnet</option>
                </select>
              </div>
              <div>
                <label className="mb-1 block text-xs text-muted">
                  {splitBy === "subnets" ? "Subnets" : "Hosts"}
                </label>
                <input
                  value={splitValue}
                  onChange={(e) => setSplitValue(e.target.value)}
                  inputMode="numeric"
                  className="w-28 rounded border border-border bg-background px-2.5 py-1.5 font-mono text-sm outline-none"
                />
              </div>
              {splitResult && (
                <span className="pb-2 text-xs text-muted">
                  New prefix: /{splitResult.newPrefix} ({splitResult.subnets.length} subnet
                  {splitResult.subnets.length === 1 ? "" : "s"})
                </span>
              )}
            </div>

            {splitResult && (
              <div className="mt-4 max-h-72 overflow-auto rounded border border-border">
                <DataTable
                  headers={["Subnet", "Network", "Broadcast", "Usable range", "Usable hosts"]}
                  rows={splitResult.subnets.map((s) => [
                    s.cidr,
                    s.networkAddress,
                    s.broadcastAddress,
                    s.usableHosts > 0 ? `${s.firstUsableHost} – ${s.lastUsableHost}` : "None",
                    String(s.usableHosts),
                  ])}
                  maxRows={512}
                />
              </div>
            )}
          </div>
        </>
      )}

      <p className="mt-3 text-xs text-muted">
        All calculations run entirely in your browser. IPv6 subnetting is not yet supported.
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

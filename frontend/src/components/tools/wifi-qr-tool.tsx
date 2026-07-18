"use client";

import { useEffect, useState } from "react";
import { buildWifiQrString, generateQrDataUrl, type WifiSecurity } from "@/lib/qr-barcode-utils";
import { QrPreview } from "@/components/tools/shared/qr-preview";

export function WifiQrTool() {
  const [ssid, setSsid] = useState("MyHomeWiFi");
  const [password, setPassword] = useState("");
  const [security, setSecurity] = useState<WifiSecurity>("WPA");
  const [hidden, setHidden] = useState(false);
  const [dataUrl, setDataUrl] = useState<string | null>(null);

  const wifiString = buildWifiQrString(ssid, password, security, hidden);

  useEffect(() => {
    if (!ssid.trim()) {
      setDataUrl(null);
      return;
    }
    let cancelled = false;
    generateQrDataUrl(wifiString).then((url) => {
      if (!cancelled) setDataUrl(url);
    });
    return () => {
      cancelled = true;
    };
  }, [wifiString, ssid]);

  return (
    <div className="grid gap-6 sm:grid-cols-[1fr_320px]">
      <div className="space-y-4">
        <label className="block text-xs">
          <span className="mb-1 block text-muted">Network name (SSID)</span>
          <input
            value={ssid}
            onChange={(e) => setSsid(e.target.value)}
            className="w-full rounded border border-border bg-background px-2.5 py-1.5 text-sm outline-none focus:border-foreground"
          />
        </label>

        <label className="block text-xs">
          <span className="mb-1 block text-muted">Security type</span>
          <select
            value={security}
            onChange={(e) => setSecurity(e.target.value as WifiSecurity)}
            className="w-full rounded border border-border bg-background px-2.5 py-1.5 text-sm"
          >
            <option value="WPA">WPA/WPA2/WPA3</option>
            <option value="WEP">WEP</option>
            <option value="nopass">No password (open network)</option>
          </select>
        </label>

        {security !== "nopass" && (
          <label className="block text-xs">
            <span className="mb-1 block text-muted">Password</span>
            <input
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded border border-border bg-background px-2.5 py-1.5 font-mono text-sm outline-none focus:border-foreground"
            />
          </label>
        )}

        <label className="flex items-center gap-2 text-xs">
          <input type="checkbox" checked={hidden} onChange={(e) => setHidden(e.target.checked)} />
          Hidden network
        </label>

        <p className="text-xs text-muted">
          Scanning this code with a phone camera will prompt to join the Wi-Fi network automatically, without typing the
          password.
        </p>
      </div>

      <QrPreview dataUrl={dataUrl} filename="wifi-qr-code.png" />
    </div>
  );
}

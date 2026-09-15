"use client";

import { useMemo, useState } from "react";
import { formatMoney } from "@/lib/finance-utils";
import { calculateInvoice, type InvoiceLineItem } from "@/lib/finance-extra-utils";

const GST_RATES = [0, 3, 5, 12, 18, 28];

export function GstInvoiceGeneratorTool() {
  const [businessName, setBusinessName] = useState("Your Business Name");
  const [clientName, setClientName] = useState("Client Name");
  const [invoiceNumber, setInvoiceNumber] = useState("INV-0001");
  const [items, setItems] = useState<InvoiceLineItem[]>([{ description: "Product / service", quantity: 1, unitPrice: 1000 }]);
  const [gstRate, setGstRate] = useState(18);
  const [isInterState, setIsInterState] = useState(false);

  function updateItem(index: number, patch: Partial<InvoiceLineItem>) {
    setItems((prev) => prev.map((item, i) => (i === index ? { ...item, ...patch } : item)));
  }
  function addItem() {
    setItems((prev) => [...prev, { description: "", quantity: 1, unitPrice: 0 }]);
  }
  function removeItem(index: number) {
    setItems((prev) => prev.filter((_, i) => i !== index));
  }

  const result = useMemo(() => calculateInvoice(items, gstRate, 0), [items, gstRate]);
  const cgst = isInterState ? 0 : result.taxAmount / 2;
  const sgst = isInterState ? 0 : result.taxAmount / 2;
  const igst = isInterState ? result.taxAmount : 0;

  return (
    <div>
      <div className="card grid gap-4 p-4 sm:grid-cols-3">
        <label className="block text-xs">
          <span className="mb-1 block text-muted">Your business name</span>
          <input type="text" value={businessName} onChange={(e) => setBusinessName(e.target.value)} className="w-full rounded border border-border bg-background px-2.5 py-1.5 text-sm outline-none" />
        </label>
        <label className="block text-xs">
          <span className="mb-1 block text-muted">Client name</span>
          <input type="text" value={clientName} onChange={(e) => setClientName(e.target.value)} className="w-full rounded border border-border bg-background px-2.5 py-1.5 text-sm outline-none" />
        </label>
        <label className="block text-xs">
          <span className="mb-1 block text-muted">Invoice number</span>
          <input type="text" value={invoiceNumber} onChange={(e) => setInvoiceNumber(e.target.value)} className="w-full rounded border border-border bg-background px-2.5 py-1.5 text-sm outline-none" />
        </label>
      </div>

      <div className="card mt-3 p-4">
        <p className="mb-2 text-xs font-medium text-muted">Line items</p>
        <div className="space-y-2">
          {items.map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <input
                type="text"
                value={item.description}
                onChange={(e) => updateItem(i, { description: e.target.value })}
                placeholder="Description"
                className="w-full rounded border border-border bg-background px-2.5 py-1.5 text-sm outline-none"
              />
              <input
                type="number"
                min={0}
                value={item.quantity}
                onChange={(e) => updateItem(i, { quantity: Number(e.target.value) })}
                placeholder="Qty"
                className="w-20 rounded border border-border bg-background px-2.5 py-1.5 font-mono text-sm outline-none"
              />
              <input
                type="number"
                min={0}
                value={item.unitPrice}
                onChange={(e) => updateItem(i, { unitPrice: Number(e.target.value) })}
                placeholder="Unit price"
                className="w-28 rounded border border-border bg-background px-2.5 py-1.5 font-mono text-sm outline-none"
              />
              {items.length > 1 && (
                <button onClick={() => removeItem(i)} className="shrink-0 text-xs text-muted hover:text-foreground">
                  Remove
                </button>
              )}
            </div>
          ))}
        </div>
        <button onClick={addItem} className="btn btn-secondary mt-3 h-9 px-4 text-sm">
          + Add line item
        </button>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-xs font-medium text-muted">GST rate</label>
            <select value={gstRate} onChange={(e) => setGstRate(Number(e.target.value))} className="w-full rounded border border-border bg-background px-2.5 py-1.5 text-sm">
              {GST_RATES.map((r) => (
                <option key={r} value={r}>{r}%</option>
              ))}
            </select>
          </div>
          <label className="mt-5 flex items-center gap-1.5 text-sm">
            <input type="checkbox" checked={isInterState} onChange={(e) => setIsInterState(e.target.checked)} className="accent-foreground" />
            Inter-state supply (charge IGST instead of CGST + SGST)
          </label>
        </div>
      </div>

      <div className="card mt-4 p-4">
        <div className="flex items-center justify-between border-b border-border pb-2 text-sm text-muted">
          <span>{invoiceNumber}</span>
          <span>{businessName} → {clientName}</span>
        </div>
        <div className="mt-3 flex items-center justify-between text-sm">
          <span className="text-muted">Subtotal</span>
          <span className="font-mono">{formatMoney(result.subtotal)}</span>
        </div>
        {isInterState ? (
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted">IGST ({gstRate}%)</span>
            <span className="font-mono">{formatMoney(igst)}</span>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted">CGST ({gstRate / 2}%)</span>
              <span className="font-mono">{formatMoney(cgst)}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted">SGST ({gstRate / 2}%)</span>
              <span className="font-mono">{formatMoney(sgst)}</span>
            </div>
          </>
        )}
        <div className="mt-2 flex items-center justify-between border-t border-border pt-2 text-base font-semibold">
          <span>Total</span>
          <span className="font-mono">{formatMoney(result.total)}</span>
        </div>
      </div>

      <p className="mt-4 text-xs text-muted">
        For intra-state supply, GST is split equally into CGST + SGST; for inter-state supply, the full rate is
        charged as IGST. This generates a simple invoice preview for reference — for GSTR filing-compliant
        invoices, use accounting software that meets your jurisdiction&apos;s e-invoicing requirements.
      </p>
    </div>
  );
}

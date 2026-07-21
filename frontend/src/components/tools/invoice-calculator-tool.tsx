"use client";

import { useMemo, useState } from "react";
import { formatMoney } from "@/lib/finance-utils";
import { calculateInvoice, type InvoiceLineItem } from "@/lib/finance-extra-utils";

export function InvoiceCalculatorTool() {
  const [items, setItems] = useState<InvoiceLineItem[]>([{ description: "Service / product", quantity: 1, unitPrice: 1000 }]);
  const [taxPercent, setTaxPercent] = useState(10);
  const [discountPercent, setDiscountPercent] = useState(0);

  function updateItem(index: number, patch: Partial<InvoiceLineItem>) {
    setItems((prev) => prev.map((item, i) => (i === index ? { ...item, ...patch } : item)));
  }
  function addItem() {
    setItems((prev) => [...prev, { description: "", quantity: 1, unitPrice: 0 }]);
  }
  function removeItem(index: number) {
    setItems((prev) => prev.filter((_, i) => i !== index));
  }

  const result = useMemo(() => calculateInvoice(items, taxPercent, discountPercent), [items, taxPercent, discountPercent]);

  return (
    <div>
      <div className="card p-4">
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
          <label className="block text-xs">
            <span className="mb-1 block text-muted">Discount: {discountPercent}%</span>
            <input type="range" min={0} max={50} value={discountPercent} onChange={(e) => setDiscountPercent(Number(e.target.value))} className="w-full accent-foreground" />
          </label>
          <label className="block text-xs">
            <span className="mb-1 block text-muted">Tax rate: {taxPercent}%</span>
            <input type="range" min={0} max={30} step={0.5} value={taxPercent} onChange={(e) => setTaxPercent(Number(e.target.value))} className="w-full accent-foreground" />
          </label>
        </div>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-4">
        <div className="card p-4">
          <p className="text-xs text-muted">Subtotal</p>
          <p className="mt-1 font-mono text-xl font-semibold">{formatMoney(result.subtotal)}</p>
        </div>
        <div className="card p-4">
          <p className="text-xs text-muted">Discount</p>
          <p className="mt-1 font-mono text-xl font-semibold">-{formatMoney(result.discountAmount)}</p>
        </div>
        <div className="card p-4">
          <p className="text-xs text-muted">Tax</p>
          <p className="mt-1 font-mono text-xl font-semibold">+{formatMoney(result.taxAmount)}</p>
        </div>
        <div className="card p-4">
          <p className="text-xs text-muted">Total</p>
          <p className="mt-1 font-mono text-xl font-semibold">{formatMoney(result.total)}</p>
        </div>
      </div>

      <p className="mt-4 text-xs text-muted">
        A generic invoice total calculator: add line items, an optional discount, and a tax rate to get your final
        invoice total. For India-specific GST invoices with CGST/SGST split, use the GST Invoice Generator instead.
      </p>
    </div>
  );
}

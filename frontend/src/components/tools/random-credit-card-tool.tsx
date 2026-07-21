"use client";

import { useEffect, useState } from "react";
import { generateRandomCreditCard, type CardNetwork } from "@/lib/random-utils";

const NETWORKS: { value: CardNetwork; label: string }[] = [
  { value: "visa", label: "Visa" },
  { value: "mastercard", label: "Mastercard" },
  { value: "amex", label: "American Express" },
  { value: "discover", label: "Discover" },
];

export function RandomCreditCardTool() {
  const [network, setNetwork] = useState<CardNetwork>("visa");
  const [count, setCount] = useState(3);
  const [cards, setCards] = useState<ReturnType<typeof generateRandomCreditCard>[]>([]);
  const [copied, setCopied] = useState<number | null>(null);

  function regenerate() {
    setCards(Array.from({ length: count }, () => generateRandomCreditCard(network)));
  }

  useEffect(() => {
    regenerate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [network, count]);

  function handleCopy(number: string, index: number) {
    navigator.clipboard.writeText(number);
    setCopied(index);
    setTimeout(() => setCopied(null), 1500);
  }

  return (
    <div>
      <div className="card border-foreground/20 bg-surface p-4 text-sm">
        <p className="font-semibold">\u26A0\uFE0F Fake test data only</p>
        <p className="mt-1 text-muted">
          These numbers pass basic Luhn-checksum validation (like real card numbers do) so they work great for
          testing checkout forms and validators. They are <strong>not real, active, or purchasable</strong> card
          numbers and cannot be used to make a real payment.
        </p>
      </div>

      <div className="card mt-4 flex flex-wrap items-end gap-4 p-4">
        <div>
          <label className="mb-1 block text-xs font-medium text-muted">Card network</label>
          <select
            value={network}
            onChange={(e) => setNetwork(e.target.value as CardNetwork)}
            className="rounded border border-border bg-background px-2.5 py-1.5 text-sm"
          >
            {NETWORKS.map((n) => (
              <option key={n.value} value={n.value}>
                {n.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-muted">How many</label>
          <select
            value={count}
            onChange={(e) => setCount(Number(e.target.value))}
            className="rounded border border-border bg-background px-2.5 py-1.5 text-sm"
          >
            {[1, 3, 5, 10].map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </div>
        <button onClick={regenerate} className="btn btn-primary h-9 px-4 text-sm">
          Regenerate
        </button>
      </div>

      <div className="mt-4 card divide-y divide-border p-0">
        {cards.map((card, i) => (
          <div key={i} className="flex flex-wrap items-center justify-between gap-3 px-4 py-3">
            <div>
              <p className="font-mono text-sm">{card.formatted}</p>
              <p className="mt-0.5 text-xs text-muted">
                Exp {card.expiry} &middot; CVC {card.cvc}
              </p>
            </div>
            <button onClick={() => handleCopy(card.number, i)} className="shrink-0 text-xs font-medium text-foreground">
              {copied === i ? "Copied!" : "Copy number"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

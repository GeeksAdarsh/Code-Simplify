"use client";

import { useEffect, useMemo, useState } from "react";

const FALLBACK_CURRENCIES = ["USD", "EUR", "GBP", "INR", "JPY", "AUD", "CAD", "CHF", "CNY", "SGD"];

export function CurrencyConverterTool() {
  const [currencies, setCurrencies] = useState<Record<string, string>>({});
  const [rates, setRates] = useState<Record<string, number> | null>(null);
  const [base, setBase] = useState("USD");
  const [amount, setAmount] = useState("100");
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("EUR");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updatedAt, setUpdatedAt] = useState<string | null>(null);

  useEffect(() => {
    fetch("https://api.frankfurter.dev/v1/currencies")
      .then((res) => res.json())
      .then((data: Record<string, string>) => setCurrencies(data))
      .catch(() => setCurrencies({}));
  }, []);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    fetch(`https://api.frankfurter.dev/v1/latest?base=${base}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch exchange rates");
        return res.json();
      })
      .then((data: { rates: Record<string, number>; date: string }) => {
        if (cancelled) return;
        setRates({ ...data.rates, [base]: 1 });
        setUpdatedAt(data.date);
        setLoading(false);
      })
      .catch((err) => {
        if (cancelled) return;
        setError(err instanceof Error ? err.message : "Failed to fetch exchange rates");
        setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [base]);

  const currencyList = Object.keys(currencies).length ? Object.keys(currencies).sort() : FALLBACK_CURRENCIES;

  const converted = useMemo(() => {
    const num = parseFloat(amount);
    if (!rates || Number.isNaN(num)) return null;
    const fromRate = rates[from];
    const toRate = rates[to];
    if (fromRate === undefined || toRate === undefined) return null;
    return (num / fromRate) * toRate;
  }, [rates, amount, from, to]);

  function handleFromChange(next: string) {
    setFrom(next);
    setBase(next);
  }

  return (
    <div>
      <div className="grid gap-4 sm:grid-cols-[1fr_1fr_auto_1fr]">
        <label className="block text-xs">
          <span className="mb-1 block text-muted">Amount</span>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full rounded border border-border bg-background px-2.5 py-1.5 font-mono text-sm outline-none focus:border-foreground"
          />
        </label>
        <label className="block text-xs">
          <span className="mb-1 block text-muted">From</span>
          <select
            value={from}
            onChange={(e) => handleFromChange(e.target.value)}
            className="w-full rounded border border-border bg-background px-2.5 py-1.5 text-sm"
          >
            {currencyList.map((c) => (
              <option key={c} value={c}>
                {c} {currencies[c] ? `– ${currencies[c]}` : ""}
              </option>
            ))}
          </select>
        </label>
        <button
          onClick={() => {
            handleFromChange(to);
            setTo(from);
          }}
          title="Swap currencies"
          className="btn btn-secondary h-9 w-9 shrink-0 justify-self-center self-end px-0 text-sm"
        >
          {"⇄"}
        </button>
        <label className="block text-xs">
          <span className="mb-1 block text-muted">To</span>
          <select value={to} onChange={(e) => setTo(e.target.value)} className="w-full rounded border border-border bg-background px-2.5 py-1.5 text-sm">
            {currencyList.map((c) => (
              <option key={c} value={c}>
                {c} {currencies[c] ? `– ${currencies[c]}` : ""}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="card mt-4 p-4">
        <p className="text-xs text-muted">Result</p>
        {loading ? (
          <p className="mt-1 text-sm text-muted">Fetching live exchange rates...</p>
        ) : error ? (
          <p className="mt-1 text-sm text-muted">Could not load exchange rates: {error}</p>
        ) : (
          <>
            <p className="mt-1 font-mono text-3xl font-semibold">
              {converted !== null ? `${converted.toLocaleString(undefined, { maximumFractionDigits: 4 })} ${to}` : "—"}
            </p>
            {rates && (
              <p className="mt-2 text-xs text-muted">
                1 {from} = {(rates[to] / rates[from]).toLocaleString(undefined, { maximumFractionDigits: 6 })} {to}
                {updatedAt && ` · rates as of ${updatedAt}`}
              </p>
            )}
          </>
        )}
      </div>

      <p className="mt-4 text-xs text-muted">
        Exchange rates are provided by the European Central Bank via the free Frankfurter API and refresh once per business day.
        Rates are indicative and shouldn&apos;t be used for financial transactions.
      </p>
    </div>
  );
}

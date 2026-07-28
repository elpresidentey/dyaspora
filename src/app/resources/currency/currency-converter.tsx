"use client";

import { useState, useEffect, useMemo, startTransition } from "react";
import { ArrowRightLeft } from "lucide-react";
import Link from "next/link";

const currencies = [
  { code: "USD", name: "US Dollar" },
  { code: "EUR", name: "Euro" },
  { code: "GBP", name: "British Pound" },
  { code: "NGN", name: "Nigerian Naira" },
  { code: "GHS", name: "Ghanaian Cedi" },
  { code: "KES", name: "Kenyan Shilling" },
  { code: "ZAR", name: "South African Rand" },
  { code: "XOF", name: "West African CFA" },
  { code: "XAF", name: "Central African CFA" },
  { code: "ETB", name: "Ethiopian Birr" },
  { code: "TZS", name: "Tanzanian Shilling" },
  { code: "UGX", name: "Ugandan Shilling" },
  { code: "RWF", name: "Rwandan Franc" },
  { code: "MAD", name: "Moroccan Dirham" },
  { code: "EGP", name: "Egyptian Pound" },
  { code: "AOA", name: "Angolan Kwanza" },
  { code: "MZN", name: "Mozambican Metical" },
  { code: "ZMW", name: "Zambian Kwacha" },
  { code: "BWP", name: "Botswana Pula" },
  { code: "MUR", name: "Mauritian Rupee" },
  { code: "CAD", name: "Canadian Dollar" },
];

const fallbackRates: Record<string, Record<string, number>> = {
  USD: { USD: 1, EUR: 0.92, GBP: 0.79, NGN: 1550, GHS: 12.5, KES: 145, ZAR: 18.5, XOF: 605, XAF: 605, ETB: 57, TZS: 2550, UGX: 3850, RWF: 1320, MAD: 10.1, EGP: 49, AOA: 825, MZN: 63, ZMW: 25, BWP: 13.5, MUR: 46, CAD: 1.37 },
  EUR: { EUR: 1, USD: 1.09, GBP: 0.86, NGN: 1685, GHS: 13.6, KES: 158, ZAR: 20.1, XOF: 658, XAF: 658, ETB: 62, TZS: 2775, UGX: 4185, RWF: 1435, MAD: 11.0, EGP: 53, AOA: 897, MZN: 68.5, ZMW: 27.2, BWP: 14.7, MUR: 50, CAD: 1.49 },
  GBP: { GBP: 1, USD: 1.27, EUR: 1.16, NGN: 1962, GHS: 15.8, KES: 184, ZAR: 23.4, XOF: 766, XAF: 766, ETB: 72, TZS: 3230, UGX: 4875, RWF: 1670, MAD: 12.8, EGP: 62, AOA: 1045, MZN: 79.8, ZMW: 31.7, BWP: 17.1, MUR: 58.4, CAD: 1.74 },
};

export function CurrencyConverter() {
  const [amount, setAmount] = useState("100");
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("NGN");
  const [rates, setRates] = useState<Record<string, number>>({});
  const [usingFallback, setUsingFallback] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(`https://open.er-api.com/v6/latest/${from}`);
        const data = await res.json();
        if (!cancelled) {
          if (data.result === "success" && data.rates) {
            startTransition(() => {
              setRates({ ...data.rates, [from]: 1 });
              setUsingFallback(false);
            });
          } else {
            throw new Error("API error");
          }
        }
      } catch {
        if (!cancelled) {
          startTransition(() => {
            setRates(fallbackRates[from] ?? fallbackRates.USD);
            setUsingFallback(true);
          });
        }
      }
    })();
    return () => { cancelled = true; };
  }, [from]);

  const refreshRates = (base: string) => {
    fetch(`https://open.er-api.com/v6/latest/${base}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.result === "success" && data.rates) {
          startTransition(() => { setRates({ ...data.rates, [base]: 1 }); setUsingFallback(false); });
        }
      })
      .catch(() => {});
  };

  const result = useMemo(() => {
    if (rates[to] && amount) {
      const num = parseFloat(amount);
      return !isNaN(num) ? num * rates[to] : null;
    }
    return null;
  }, [amount, to, rates]);

  const swap = () => {
    setFrom(to);
    setTo(from);
  };

  const formatted = result != null
    ? new Intl.NumberFormat("en-US", { style: "currency", currency: to, minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(result)
    : "";

  return (
    <div className="mt-10 max-w-lg rounded-2xl border border-border bg-background p-6 shadow-sm">
      <div className="flex flex-col gap-4">
        <div>
          <label className="text-xs font-medium uppercase tracking-[0.1em] text-muted-foreground">Amount</label>
          <input
            type="text"
            value={amount}
            onChange={(e) => setAmount(e.target.value.replace(/[^0-9.]/g, ""))}
            className="mt-1.5 w-full rounded-lg border border-border bg-background px-4 py-2.5 text-lg font-medium text-foreground outline-none transition-colors focus:border-gold"
          />
        </div>
        <div className="grid grid-cols-1 items-end gap-3 sm:grid-cols-[1fr_auto_1fr]">
          <div>
            <label className="text-xs font-medium uppercase tracking-[0.1em] text-muted-foreground">From</label>
            <select
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              className="mt-1.5 w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-gold"
            >
              {currencies.map((c) => (
                <option key={c.code} value={c.code}>{c.code} — {c.name}</option>
              ))}
            </select>
          </div>
          <button
            onClick={swap}
            className="mb-0.5 grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-border text-muted-foreground transition-colors hover:border-gold hover:text-gold"
            aria-label="Swap currencies"
          >
            <ArrowRightLeft className="h-4 w-4" />
          </button>
          <div>
            <label className="text-xs font-medium uppercase tracking-[0.1em] text-muted-foreground">To</label>
            <select
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="mt-1.5 w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-gold"
            >
              {currencies.map((c) => (
                <option key={c.code} value={c.code}>{c.code} — {c.name}</option>
              ))}
            </select>
          </div>
        </div>
        {result != null ? (
          <div className="rounded-lg bg-brand-light px-4 py-3.5">
            <p className="text-xs text-muted-foreground">{amount} {from} =</p>
            <p className="text-xl font-bold text-brand">{formatted}</p>
            {usingFallback && (
              <p className="mt-1 text-xs text-muted-foreground">Using cached rates — <button onClick={() => refreshRates(from)} className="underline underline-offset-2 hover:text-foreground">refresh</button></p>
            )}
          </div>
        ) : rates[to] == null ? (
          <div className="rounded-lg bg-muted px-4 py-3.5">
            <p className="text-sm text-muted-foreground">Rate not available for {to}. Try a different currency pair.</p>
          </div>
        ) : null}
        <p className="text-[10px] text-muted-foreground">
          Rates by <Link href="https://www.exchangerate-api.com" className="underline underline-offset-2 hover:text-foreground">ExchangeRate-API</Link>
        </p>
      </div>
    </div>
  );
}

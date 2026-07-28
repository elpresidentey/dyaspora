"use client";

import { Suspense, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Bus, MapPin, Car, Train, Ship } from "lucide-react";
import { transport } from "@/data/transport";

const types = ["All", ...Array.from(new Set(transport.map((t) => t.type)))];

const typeIcons: Record<string, React.ReactNode> = {
  "Ride-hailing": <Car className="h-5 w-5" />,
  "Taxi": <Car className="h-5 w-5" />,
  "Bus": <Bus className="h-5 w-5" />,
  "Train": <Train className="h-5 w-5" />,
  "Ferry": <Ship className="h-5 w-5" />,
  "Rental": <Car className="h-5 w-5" />,
};

function TransportContent() {
  const searchParams = useSearchParams();
  const [type, setType] = useState("All");
  const [city, setCity] = useState(searchParams.get("city") || "");

  const filtered = useMemo(() => {
    let items = type === "All" ? transport : transport.filter((t) => t.type === type);
    if (city) items = items.filter((t) => t.city.toLowerCase().includes(city.toLowerCase()));
    return items;
  }, [type, city]);

  return (
    <main>
      <section className="border-b bg-gradient-to-b from-secondary/60 py-20 md:py-28">
        <div className="container">
          <div className="max-w-3xl">
            <div className="mb-6 flex items-center gap-3"><span className="h-px w-10 bg-gold" /><p className="text-xs font-semibold uppercase tracking-[.24em] text-gold">Getting around</p></div>
            <h1 className="font-serif text-5xl leading-[1.02] tracking-tight md:text-7xl">Transport <span className="italic text-gold">options.</span></h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-muted-foreground">How to get from where you land to where you belong — and everywhere in between.</p>
          </div>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <input type="text" value={city} onChange={e => setCity(e.target.value)} placeholder="Search by city..." className="min-w-[200px] rounded-lg border bg-secondary/50 px-4 py-2.5 text-sm focus:border-gold focus:outline-none" />
            <div className="flex flex-wrap gap-2">
              {types.map((t) => (
                <button key={t} type="button" onClick={() => setType(t)} className={`rounded-lg border px-4 py-1.5 text-xs font-medium transition-colors ${type === t ? "border-gold bg-gold text-white" : "text-muted-foreground hover:border-gold hover:text-gold"}`}>{t}</button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="container py-16 md:py-24">
        <div className="mb-8 flex items-end justify-between">
          <div><p className="text-xs font-semibold uppercase tracking-[.2em] text-gold">Options</p>
            <h2 className="mt-2 font-serif text-3xl md:text-4xl">{filtered.length} option{filtered.length !== 1 ? "s" : ""} found</h2></div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((t) => (
            <Link key={t.slug} href={`/transport?city=${t.city}`} className="flex gap-4 rounded-xl border p-5 transition-colors hover:border-gold/40">
              <span className="mt-1 grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-gold/10 text-gold">
                {typeIcons[t.type] || <Bus className="h-5 w-5" />}
              </span>
              <div className="min-w-0">
                <div className="flex items-center gap-2 text-xs text-muted-foreground"><MapPin className="h-3 w-3 text-gold" /> {t.city}, {t.country}</div>
                <h3 className="mt-0.5 font-semibold leading-tight">{t.provider}</h3>
                <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{t.description}</p>
                <div className="mt-3 flex items-center justify-between">
                  <span className="rounded-full bg-secondary px-2.5 py-0.5 text-[11px] font-medium text-muted-foreground">{t.type}</span>
                  <span className="text-sm font-semibold">{t.price}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}

export default function TransportPage() {
  return (
    <Suspense>
      <TransportContent />
    </Suspense>
  );
}

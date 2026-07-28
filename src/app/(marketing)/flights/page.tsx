"use client";

import { useState, useCallback, useMemo } from "react";
import { useUser } from "@/components/auth/auth-context";
import { Plane, Search, ArrowUpRight, CalendarDays, SlidersHorizontal, Bookmark } from "lucide-react";
import Link from "next/link";

type Flight = {
  id: string; airline: string; flightNumber: string; origin: string; destination: string;
  departureTime: string; arrivalTime: string; duration: number; price: number;
  currency: string; cabinClass: string; availableSeats: number; stops?: number;
};

const popularDestinations = [
  { from: "New York (JFK)", to: "Lagos (LOS)", price: 820, airline: "Delta / Ethiopian" },
  { from: "London (LHR)", to: "Accra (ACC)", price: 580, airline: "British Airways" },
  { from: "Washington (IAD)", to: "Nairobi (NBO)", price: 750, airline: "Kenya Airways" },
  { from: "Paris (CDG)", to: "Dakar (DSS)", price: 490, airline: "Air France" },
];

export default function FlightsPage() {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");
  const [results, setResults] = useState<Flight[]>([]);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [stopsFilter, setStopsFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("price");
  const [savedFlights, setSavedFlights] = useState<Set<string>>(new Set());
  const { user } = useUser();

  const searchFlights = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSearched(true);
    try {
      const params = new URLSearchParams();
      if (origin) params.set("origin", origin);
      if (destination) params.set("destination", destination);
      if (date) params.set("date", date);
      const res = await fetch(`/api/flights/search?${params}`);
      const data = await res.json();
      setResults(data.flights || []);
    } catch { setResults([]); }
    setLoading(false);
  }, [origin, destination, date]);

  const handleToggleSave = async (flight: Flight) => {
    if (!user) return;
    const res = await fetch("/api/saved", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: user.id, itemType: "flight", itemId: flight.id }),
    });
    if (res.ok) {
      setSavedFlights((prev) => {
        const next = new Set(prev);
        if (next.has(flight.id)) next.delete(flight.id); else next.add(flight.id);
        return next;
      });
    }
  };

  const filteredResults = useMemo(() => {
    let filtered = [...results];
    const min = parseFloat(minPrice);
    const max = parseFloat(maxPrice);
    if (min) filtered = filtered.filter((f) => f.price >= min);
    if (max) filtered = filtered.filter((f) => f.price <= max);
    if (stopsFilter === "direct") filtered = filtered.filter((f) => (f.stops ?? 0) === 0);
    if (stopsFilter === "1+") filtered = filtered.filter((f) => (f.stops ?? 0) >= 1);
    if (sortBy === "price") filtered.sort((a, b) => a.price - b.price);
    if (sortBy === "duration") filtered.sort((a, b) => a.duration - b.duration);
    if (sortBy === "departure") filtered.sort((a, b) => new Date(a.departureTime).getTime() - new Date(b.departureTime).getTime());
    return filtered;
  }, [results, minPrice, maxPrice, stopsFilter, sortBy]);

  function formatTime(iso: string) {
    return new Date(iso).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
  }
  function formatDuration(min: number) {
    const h = Math.floor(min / 60); const m = min % 60;
    return `${h}h${m > 0 ? ` ${m}m` : ""}`;
  }

  return (
    <main>
      <section className="border-b bg-gradient-to-b from-secondary/60 py-20 md:py-28">
        <div className="container">
          <div className="max-w-3xl">
            <div className="mb-6 flex items-center gap-3"><span className="h-px w-10 bg-gold" /><p className="text-xs font-semibold uppercase tracking-[.24em] text-gold">Travel</p></div>
            <h1 className="font-serif text-5xl leading-[1.02] tracking-tight md:text-7xl">Book your <span className="italic text-gold">flight home.</span></h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-muted-foreground">Search flights from anywhere in the world to cities across Africa.</p>
          </div>

          <form onSubmit={searchFlights} className="mt-12 rounded-2xl border bg-background p-6 shadow-sm">
            <div className="grid grid-cols-1 gap-4 items-end sm:grid-cols-[1fr_1fr_1fr_auto]">
              <div><label className="block text-xs font-semibold uppercase tracking-[.1em] text-muted-foreground mb-1.5">From</label>
                <input type="text" value={origin} onChange={e => setOrigin(e.target.value)} placeholder="City or airport" className="w-full rounded-lg border bg-secondary/50 px-4 py-3 text-sm focus:border-gold focus:outline-none" /></div>
              <div><label className="block text-xs font-semibold uppercase tracking-[.1em] text-muted-foreground mb-1.5">To</label>
                <input type="text" value={destination} onChange={e => setDestination(e.target.value)} placeholder="City or airport" className="w-full rounded-lg border bg-secondary/50 px-4 py-3 text-sm focus:border-gold focus:outline-none" /></div>
              <div><label className="block text-xs font-semibold uppercase tracking-[.1em] text-muted-foreground mb-1.5">Departure</label>
                <input type="date" value={date} onChange={e => setDate(e.target.value)} className="w-full rounded-lg border bg-secondary/50 px-4 py-3 text-sm focus:border-gold focus:outline-none" /></div>
              <button type="submit" disabled={loading} className="inline-flex h-[46px] w-full items-center justify-center gap-2 rounded-lg bg-gold px-6 text-sm font-semibold text-white transition-all hover:bg-[#b99557] disabled:opacity-50">
                {loading ? "Searching..." : <><Search className="h-4 w-4" /> Search</>}
              </button>
            </div>
          </form>
        </div>
      </section>

      {searched && (
        <section className="container py-16 md:py-24">
          <div className="mb-8 flex items-end justify-between">
            <div><p className="text-xs font-semibold uppercase tracking-[.2em] text-gold">Results</p>
              <h2 className="mt-2 font-serif text-3xl md:text-4xl">
                {loading ? "Searching..." : `${filteredResults.length} flight${filteredResults.length !== 1 ? "s" : ""} found`}
              </h2></div>
            <button onClick={() => setShowFilters(!showFilters)} className="inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:border-gold/40 hover:text-foreground"><SlidersHorizontal className="h-4 w-4" /> Filters</button>
          </div>

          {showFilters && (
            <div className="mb-8 rounded-xl border bg-secondary/30 p-5">
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                <div><label className="block text-xs font-semibold uppercase tracking-[.1em] text-muted-foreground mb-1.5">Min price</label>
                  <input type="number" value={minPrice} onChange={e => setMinPrice(e.target.value)} placeholder="$0" className="w-full rounded-lg border bg-background px-4 py-2.5 text-sm focus:border-gold focus:outline-none" /></div>
                <div><label className="block text-xs font-semibold uppercase tracking-[.1em] text-muted-foreground mb-1.5">Max price</label>
                  <input type="number" value={maxPrice} onChange={e => setMaxPrice(e.target.value)} placeholder="$2000" className="w-full rounded-lg border bg-background px-4 py-2.5 text-sm focus:border-gold focus:outline-none" /></div>
                <div><label className="block text-xs font-semibold uppercase tracking-[.1em] text-muted-foreground mb-1.5">Stops</label>
                  <select value={stopsFilter} onChange={e => setStopsFilter(e.target.value)} className="w-full rounded-lg border bg-background px-4 py-2.5 text-sm focus:border-gold focus:outline-none">
                    <option value="all">All</option>
                    <option value="direct">Direct</option>
                    <option value="1+">1+ stops</option>
                  </select></div>
                <div><label className="block text-xs font-semibold uppercase tracking-[.1em] text-muted-foreground mb-1.5">Sort by</label>
                  <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="w-full rounded-lg border bg-background px-4 py-2.5 text-sm focus:border-gold focus:outline-none">
                    <option value="price">Price (lowest)</option>
                    <option value="duration">Duration (shortest)</option>
                    <option value="departure">Departure (earliest)</option>
                  </select></div>
              </div>
            </div>
          )}

          {!loading && filteredResults.length === 0 && (
            <div className="rounded-2xl border-2 border-dashed py-20 text-center"><Plane className="mx-auto h-8 w-8 text-muted-foreground" /><p className="mt-4 text-muted-foreground">No flights match your search. Try different destinations or dates.</p></div>
          )}
          {!loading && filteredResults.length > 0 && (
            <div className="space-y-3">
              {filteredResults.map((flight) => {
                const stops = flight.stops ?? 0;
                const depDate = new Date(flight.departureTime);
                const depCode = flight.origin.replace(/.*\(([^)]+)\)/, "$1");
                const arrCode = flight.destination.replace(/.*\(([^)]+)\)/, "$1");
                const depCity = flight.origin.replace(/\s*\([^)]*\)\s*$/, "").trim();
                const arrCity = flight.destination.replace(/\s*\([^)]*\)\s*$/, "").trim();
                return (
                <div key={flight.id} className="group rounded-xl border bg-background transition-all hover:border-gold/40 hover:shadow-md">
                  {/* Top: Airline, Route, Price */}
                  <div className="flex flex-col gap-4 p-5 md:flex-row md:items-center md:gap-6">
                    {/* Airline */}
                    <div className="flex items-center gap-3 md:w-44 md:shrink-0">
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-brand/10 text-[11px] font-bold text-brand ring-1 ring-brand/15">
                        {flight.airline.split(" ").map(w => w[0]).slice(0, 2).join("")}
                      </span>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold">{flight.airline}</p>
                        <p className="text-xs text-muted-foreground">{flight.flightNumber}</p>
                      </div>
                    </div>

                    {/* Route */}
                    <div className="flex flex-1 flex-col gap-2">
                      <div className="text-xs font-medium text-muted-foreground">
                        {depCode} <span className="text-gold">→</span> {arrCode}
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-center min-w-[80px]">
                          <div className="text-xl font-bold tracking-tight">{formatTime(flight.departureTime)}</div>
                          <div className="text-xs font-medium text-foreground">{depCity}</div>
                        </div>

                        <div className="flex flex-1 flex-col items-center gap-1 px-2">
                          <span className="text-[11px] font-medium text-muted-foreground">{formatDuration(flight.duration)}</span>
                          <div className="relative flex w-full items-center">
                            <div className={`h-px flex-1 ${stops === 0 ? "bg-gold/50" : "bg-border"}`} />
                            <div className={`grid h-6 w-6 place-items-center rounded-full border-2 ${stops === 0 ? "border-gold/60 bg-gold/10" : "border-border bg-background"}`}>
                              <Plane className={`h-3 w-3 ${stops === 0 ? "text-gold" : "text-muted-foreground"}`} />
                            </div>
                            <div className={`h-px flex-1 ${stops === 0 ? "bg-gold/50" : "bg-border"}`} />
                          </div>
                          <span className={`text-[11px] font-semibold ${stops === 0 ? "text-gold" : "text-muted-foreground"}`}>
                            {stops === 0 ? "Nonstop" : `${stops} stop${stops > 1 ? "s" : ""}`}
                          </span>
                        </div>

                        <div className="text-center min-w-[80px]">
                          <div className="text-xl font-bold tracking-tight">{formatTime(flight.arrivalTime)}</div>
                          <div className="text-xs font-medium text-foreground">{arrCity}</div>
                        </div>
                      </div>
                    </div>

                    {/* Price + CTA */}
                    <div className="flex items-center justify-between gap-3 md:flex-col md:items-end md:w-40 md:shrink-0 md:border-l md:pl-5 md:border-border md:justify-start">
                      <div className="md:w-full">
                        <div className="text-2xl font-bold text-gold md:text-right">${flight.price}</div>
                        <div className="text-[11px] text-muted-foreground md:text-right">per person</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Link href={`/bookings/flight/${flight.id}?airline=${encodeURIComponent(flight.airline)}&flightNumber=${encodeURIComponent(flight.flightNumber)}&origin=${encodeURIComponent(flight.origin)}&destination=${encodeURIComponent(flight.destination)}&departureTime=${encodeURIComponent(flight.departureTime)}&arrivalTime=${encodeURIComponent(flight.arrivalTime)}&duration=${flight.duration}&price=${flight.price}&cabinClass=${encodeURIComponent(flight.cabinClass)}&availableSeats=${flight.availableSeats}`} className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-gold px-4 text-xs font-semibold text-white transition-all hover:bg-[#b99557]">Book <ArrowUpRight className="h-3 w-3" /></Link>
                        {user && <button onClick={() => handleToggleSave(flight)} className={`grid h-9 w-9 place-items-center rounded-lg border transition-colors ${savedFlights.has(flight.id) ? "border-gold bg-gold/10 text-gold" : "border-border text-muted-foreground hover:border-gold/40 hover:text-gold"}`}><Bookmark className={`h-3.5 w-3.5 ${savedFlights.has(flight.id) ? "fill-gold" : ""}`} /></button>}
                      </div>
                    </div>
                  </div>

                  {/* Bottom: date, cabin, seats */}
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 border-t bg-muted/30 px-5 py-2.5 text-[11px] text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                      <CalendarDays className="h-3 w-3" />
                      {depDate.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })}
                    </span>
                    <span className="text-border">|</span>
                    <span className="capitalize">{flight.cabinClass}</span>
                    <span className="text-border">|</span>
                    <span>{flight.availableSeats} seat{flight.availableSeats !== 1 ? "s" : ""} at ${flight.price}/ea</span>
                  </div>
                </div>
                );
              })}
            </div>
          )}
        </section>
      )}

      {!searched && (
        <section className="container pb-24 md:pb-36">
          <div className="mb-8 flex items-end justify-between"><div><p className="text-xs font-semibold uppercase tracking-[.2em] text-gold">Popular routes</p><h2 className="mt-2 font-serif text-3xl md:text-4xl">Diaspora favourites</h2></div></div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {popularDestinations.map((route) => (
              <button key={route.to} type="button" onClick={() => { setOrigin(route.from); setDestination(route.to); }} className="group rounded-xl border p-5 text-left transition-all hover:border-gold/50 hover:shadow-sm">
                <div className="flex items-center justify-between"><Plane className="h-5 w-5 text-gold" /><span className="rounded-full bg-gold/10 px-3 py-1 text-xs font-semibold text-gold">From ${route.price}</span></div>
                <p className="mt-4 font-semibold">{route.from}</p>
                <p className="text-sm text-muted-foreground">→ {route.to}</p>
                <p className="mt-2 text-xs text-muted-foreground">{route.airline}</p>
              </button>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}

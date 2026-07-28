"use client";

import { useState, useMemo } from "react";
import { MapPin, Search, X } from "lucide-react";
import { destinations } from "@/data/destinations";
import { DestinationCard } from "@/components/ui/destination-card";

const regions = ["All", "West Africa", "East Africa", "Southern Africa", "Central Africa", "North Africa"];

export default function CitiesPage() {
  const [query, setQuery] = useState("");
  const [activeRegion, setActiveRegion] = useState("All");

  const filtered = useMemo(() => {
    return destinations.filter((d) => {
      const matchRegion = activeRegion === "All" || d.region === activeRegion;
      const matchQuery = !query ||
        d.city.toLowerCase().includes(query.toLowerCase()) ||
        d.country.toLowerCase().includes(query.toLowerCase());
      return matchRegion && matchQuery;
    });
  }, [query, activeRegion]);

  return (
    <section className="py-28 md:py-36">
      <div className="container">
        <div className="max-w-2xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/10 mb-6">
            <MapPin className="w-3.5 h-3.5 text-gold" />
            <p className="text-gold text-xs font-medium uppercase tracking-[0.2em]">Destinations</p>
          </div>
          <h1 className="font-serif text-4xl md:text-5xl leading-[1.15] tracking-tight">All destinations</h1>
          <p className="mt-4 text-base text-muted-foreground leading-relaxed max-w-lg">
            Explore cities across the continent — from the bustling streets of Lagos to the serene hills of Kigali.
          </p>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-10">
          <div className="flex flex-wrap gap-2">
            {regions.map((region) => (
              <button
                key={region}
                onClick={() => setActiveRegion(region)}
                className={`px-4 py-2 rounded-lg text-xs font-medium uppercase tracking-[0.1em] transition-colors ${
                  activeRegion === region
                    ? "bg-brand text-white"
                    : "bg-secondary text-muted-foreground hover:bg-secondary/80"
                }`}
              >
                {region}
              </button>
            ))}
          </div>
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search city or country..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full h-10 pl-9 pr-8 rounded-lg border border-border bg-background text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-gold/30"
            />
            {query && (
              <button onClick={() => setQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2">
                <X className="h-4 w-4 text-muted-foreground hover:text-foreground" />
              </button>
            )}
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-muted-foreground">No destinations match your search.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map((d) => (
              <DestinationCard
                key={d.slug}
                href={`/cities/${d.slug}`}
                image={d.image || "/images/hero-bg.jpg"}
                eyebrow={d.country}
                title={d.city}
                description={d.tag}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Star } from "lucide-react";
import { restaurants } from "@/data/restaurants";

const cuisines = ["All", ...Array.from(new Set(restaurants.map((r) => r.cuisine)))];

export default function RestaurantsPage() {
  const [cuisine, setCuisine] = useState("All");
  const filtered = useMemo(() => cuisine === "All" ? restaurants : restaurants.filter((r) => r.cuisine === cuisine), [cuisine]);

  return (
    <main>
      <section className="border-b bg-gradient-to-b from-secondary/60 py-20 md:py-28">
        <div className="container">
          <div className="max-w-3xl">
            <div className="mb-6 flex items-center gap-3"><span className="h-px w-10 bg-gold" /><p className="text-xs font-semibold uppercase tracking-[.24em] text-gold">Dining</p></div>
            <h1 className="font-serif text-5xl leading-[1.02] tracking-tight md:text-7xl">Taste the <span className="italic text-gold">continent.</span></h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-muted-foreground">From street food stalls to Michelin-worthy tasting menus — discover Africa&apos;s dining scene.</p>
          </div>
          <div className="mt-14 flex flex-wrap gap-2 border-b pb-0">
            {cuisines.map((c) => (
              <button key={c} type="button" onClick={() => setCuisine(c)} className={`relative px-1 pb-4 mr-5 text-sm transition-colors ${cuisine === c ? "font-semibold text-foreground after:absolute after:inset-x-0 after:-bottom-px after:h-0.5 after:bg-gold" : "text-muted-foreground hover:text-foreground"}`}>{c}</button>
            ))}
          </div>
        </div>
      </section>

      <section className="container py-16 md:py-24">
        <div className="mb-8 flex items-end justify-between">
          <div><p className="text-xs font-semibold uppercase tracking-[.2em] text-gold">Restaurants</p>
            <h2 className="mt-2 font-serif text-3xl md:text-4xl">{filtered.length} place{filtered.length !== 1 ? "s" : ""} to eat</h2></div>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((r) => (
            <Link key={r.slug} href={`/restaurants/${r.slug}`} className="group overflow-hidden rounded-2xl border bg-background transition-shadow hover:shadow-md">
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image src={r.image} alt={r.name} fill sizes="33vw" className="object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <div className="absolute bottom-3 left-3 rounded-full bg-white/90 px-2.5 py-1 text-xs font-semibold">{r.priceRange}</div>
              </div>
              <div className="p-5">
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground"><MapPin className="h-3 w-3 text-gold" /> {r.city}, {r.country}</div>
                <h3 className="mt-1.5 font-serif text-xl font-bold leading-tight">{r.name}</h3>
                <div className="mt-1 flex items-center gap-1"><Star className="h-3 w-3 text-gold" /><span className="text-xs font-semibold">{r.rating}</span><span className="text-xs text-muted-foreground">· {r.cuisine}</span></div>
                <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{r.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}

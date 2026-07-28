"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Clock } from "lucide-react";
import { tours } from "@/data/tours";

const categories = ["All", ...Array.from(new Set(tours.map((t) => t.category)))];

export default function TourismPage() {
  const [category, setCategory] = useState("All");
  const filtered = useMemo(() => category === "All" ? tours : tours.filter((t) => t.category === category), [category]);

  return (
    <main>
      <section className="border-b bg-gradient-to-b from-secondary/60 py-20 md:py-28">
        <div className="container">
          <div className="max-w-3xl">
            <div className="mb-6 flex items-center gap-3"><span className="h-px w-10 bg-gold" /><p className="text-xs font-semibold uppercase tracking-[.24em] text-gold">Experiences</p></div>
            <h1 className="font-serif text-5xl leading-[1.02] tracking-tight md:text-7xl">Tours & <span className="italic text-gold">activities.</span></h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-muted-foreground">Curated experiences that connect you to the culture, landscape, and rhythm of Africa.</p>
          </div>
          <div className="mt-14 flex flex-wrap gap-2 border-b pb-0">
            {categories.map((c) => (
              <button key={c} type="button" onClick={() => setCategory(c)} className={`relative px-1 pb-4 mr-5 text-sm transition-colors ${category === c ? "font-semibold text-foreground after:absolute after:inset-x-0 after:-bottom-px after:h-0.5 after:bg-gold" : "text-muted-foreground hover:text-foreground"}`}>{c}</button>
            ))}
          </div>
        </div>
      </section>

      <section className="container py-16 md:py-24">
        <div className="mb-8 flex items-end justify-between">
          <div><p className="text-xs font-semibold uppercase tracking-[.2em] text-gold">Experiences</p>
            <h2 className="mt-2 font-serif text-3xl md:text-4xl">{filtered.length} tour{filtered.length !== 1 ? "s" : ""} available</h2></div>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((tour) => (
            <Link key={tour.slug} href={`/tourism/${tour.slug}`} className="group overflow-hidden rounded-2xl border bg-background transition-shadow hover:shadow-md">
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image src={tour.image} alt={tour.name} fill sizes="33vw" className="object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <div className="absolute bottom-3 left-3 flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-1 text-xs font-semibold"><Clock className="h-3 w-3" /> {tour.duration}</div>
              </div>
              <div className="p-5">
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground"><MapPin className="h-3 w-3 text-gold" /> {tour.city}, {tour.country}</div>
                <h3 className="mt-1.5 font-serif text-xl font-bold leading-tight">{tour.name}</h3>
                <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{tour.description}</p>
                <div className="mt-4 flex items-center justify-between border-t pt-4">
                  <span className="rounded-full bg-gold/10 px-3 py-1 text-xs font-semibold text-gold">{tour.category}</span>
                  <p className="text-lg font-bold">${tour.price}{tour.price === 0 && <span className="text-xs font-normal text-muted-foreground">Free</span>}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}

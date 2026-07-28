"use client";

import { useMemo, useState } from "react";
import { CalendarDays, MapPin, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { DestinationCard } from "@/components/ui/destination-card";
import { events } from "@/data/events";

const categories = ["All", "Music", "Culture", "Art", "Film", "Design"];

export default function EventsPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const filtered = useMemo(() => activeCategory === "All" ? events : events.filter((event) => event.category === activeCategory), [activeCategory]);
  const featured = events[0];

  return (
    <main className="bg-secondary/40">
      <section className="border-b bg-background py-20 md:py-28">
        <div className="container">
          <div className="max-w-3xl">
            <div className="mb-6 flex items-center gap-3"><span className="h-px w-10 bg-gold" /><p className="text-xs font-semibold uppercase tracking-[.24em] text-gold">The calendar of home</p></div>
            <h1 className="font-serif text-5xl leading-[1.02] tracking-tight md:text-7xl">Make the trip<br /><span className="italic text-gold">worth remembering.</span></h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-muted-foreground">From sold-out concerts to quiet creative gatherings, find the moments worth crossing the ocean for.</p>
          </div>
          <div className="mt-14 flex flex-wrap gap-2 border-b pb-0">
            {categories.map((category) => <button key={category} type="button" onClick={() => setActiveCategory(category)} className={`relative px-1 pb-4 mr-5 text-sm transition-colors ${activeCategory === category ? "font-semibold text-foreground after:absolute after:inset-x-0 after:-bottom-px after:h-0.5 after:bg-gold" : "text-muted-foreground hover:text-foreground"}`}>{category}</button>)}
          </div>
        </div>
      </section>

      <section className="container py-16 md:py-24">
        <div className="mb-8 flex items-end justify-between"><div><p className="text-xs font-semibold uppercase tracking-[.2em] text-gold">Featured this season</p><h2 className="mt-2 font-serif text-3xl md:text-4xl">The big one</h2></div>          <Link href="/cities/lagos" className="hidden items-center gap-2 text-sm text-muted-foreground hover:text-gold sm:flex">Explore Lagos <ArrowUpRight className="h-4 w-4" /></Link></div>
        <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
          <DestinationCard href={`/events/${featured.slug}`} image={featured.image} eyebrow={`${featured.city} · ${featured.category}`} title={featured.title} description={featured.description} meta={`${featured.date}  ·  ${featured.country}`} aspect="aspect-[5/4] md:aspect-[16/9]" />
          <div className="flex flex-col justify-between border-y border-border py-6 lg:border-y-0 lg:border-l lg:pl-8"><div><CalendarDays className="h-6 w-6 text-gold" /><h3 className="mt-5 font-serif text-3xl leading-tight">Your next<br />good story.</h3><p className="mt-4 max-w-sm text-sm leading-6 text-muted-foreground">Save a date, share it with your people, and let Dyaspora handle the rest of the journey.</p></div><Link href="/signup" className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-brand hover:text-gold">Create your travel plan <ArrowUpRight className="h-4 w-4" /></Link></div>
        </div>
      </section>

      <section className="container pb-24 md:pb-36"><div className="mb-8 flex items-end justify-between"><div><p className="text-xs font-semibold uppercase tracking-[.2em] text-gold">Discover more</p><h2 className="mt-2 font-serif text-3xl md:text-4xl">What’s happening</h2></div><p className="hidden items-center gap-2 text-sm text-muted-foreground sm:flex"><MapPin className="h-4 w-4 text-gold" /> Across Africa</p></div><div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{filtered.slice(1).map((event) => <DestinationCard key={event.title} href={`/events/${event.slug}`} image={event.image} eyebrow={`${event.city} · ${event.category}`} title={event.title} description={event.description} meta={`${event.date}  ·  ${event.country}`} />)}</div>{filtered.length === 1 && <p className="border-y py-16 text-center text-muted-foreground">More {activeCategory.toLowerCase()} events are being added soon.</p>}</section>
    </main>
  );
}

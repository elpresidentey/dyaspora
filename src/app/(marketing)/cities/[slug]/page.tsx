import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MapPin, Building2, CalendarDays, UtensilsCrossed, Compass, Bus, ArrowRight } from "lucide-react";
import { destinations } from "@/data/destinations";
import { restaurants } from "@/data/restaurants";
import { tours } from "@/data/tours";
import { transport } from "@/data/transport";
import { events } from "@/data/events";
import { CityWeatherWidget } from "@/components/weather/city-weather-widget";

export function generateStaticParams() {
  return destinations.map((d) => ({ slug: d.slug }));
}

export default async function CityPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const city = destinations.find((d) => d.slug === slug);
  if (!city) notFound();

  const cityEvents = events.filter((e) => e.city === city.city);
  const cityRestaurants = restaurants.filter((r) => r.city === city.city);
  const cityTours = tours.filter((t) => t.city === city.city);
  const cityTransport = transport.filter((t) => t.city === city.city);

  return (
    <main>
      <section className="relative h-[55vh] min-h-[400px] overflow-hidden">
        <Image src={city.image || "/images/hero-bg.jpg"} alt={city.city} fill priority className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10 lg:p-16">
          <div className="mx-auto max-w-[1440px]">
            <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[.2em] text-gold"><MapPin className="h-4 w-4" />{city.country}</div>
            <h1 className="mt-3 font-serif text-5xl font-bold text-white md:text-7xl">{city.city}</h1>
            <p className="mt-3 max-w-xl text-lg text-white/70">{city.tag}</p>
          </div>
        </div>
      </section>

      <section className="container py-16 md:py-24">
        <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
          <div>
            <div className="mb-6 flex items-center gap-3"><span className="h-px w-10 bg-gold" /><p className="text-xs font-semibold uppercase tracking-[.24em] text-gold">Plan your trip</p></div>
            <h2 className="font-serif text-3xl md:text-4xl leading-tight">Getting to <span className="text-gold italic">{city.city}</span></h2>
            <p className="mt-4 max-w-xl text-muted-foreground leading-relaxed">{city.city} is well-connected by air from major hubs. Most visitors fly into the main international airport and arrange local transport from there.</p>

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              <Link href={`/accommodation?city=${city.city}`} className="group flex items-center gap-4 rounded-xl border p-5 transition-colors hover:border-gold/50">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-lg bg-gold/10 text-gold"><Building2 className="h-6 w-6" /></span>
                <div><p className="font-semibold">Hotels & stays</p><p className="mt-0.5 text-sm text-muted-foreground">See places to stay in {city.city}</p></div>
                <ArrowRight className="ml-auto h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1" />
              </Link>
              <Link href="/flights" className="group flex items-center gap-4 rounded-xl border p-5 transition-colors hover:border-gold/50">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-lg bg-gold/10 text-gold"><Compass className="h-6 w-6" /></span>
                <div><p className="font-semibold">Flights</p><p className="mt-0.5 text-sm text-muted-foreground">Book your journey</p></div>
                <ArrowRight className="ml-auto h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1" />
              </Link>
              {cityEvents.length > 0 && (
                <Link href="/events" className="group flex items-center gap-4 rounded-xl border p-5 transition-colors hover:border-gold/50">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-lg bg-gold/10 text-gold"><CalendarDays className="h-6 w-6" /></span>
                  <div><p className="font-semibold">Events</p><p className="mt-0.5 text-sm text-muted-foreground">{cityEvents.length} event{cityEvents.length > 1 ? "s" : ""} in {city.city}</p></div>
                  <ArrowRight className="ml-auto h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1" />
                </Link>
              )}
              {cityRestaurants.length > 0 && (
                <Link href="/restaurants" className="group flex items-center gap-4 rounded-xl border p-5 transition-colors hover:border-gold/50">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-lg bg-gold/10 text-gold"><UtensilsCrossed className="h-6 w-6" /></span>
                  <div><p className="font-semibold">Restaurants</p><p className="mt-0.5 text-sm text-muted-foreground">{cityRestaurants.length} place{cityRestaurants.length > 1 ? "s" : ""} to eat</p></div>
                  <ArrowRight className="ml-auto h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1" />
                </Link>
              )}
              {cityTours.length > 0 && (
                <Link href="/tourism" className="group flex items-center gap-4 rounded-xl border p-5 transition-colors hover:border-gold/50">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-lg bg-gold/10 text-gold"><Compass className="h-6 w-6" /></span>
                  <div><p className="font-semibold">Tours & activities</p><p className="mt-0.5 text-sm text-muted-foreground">{cityTours.length} tour{cityTours.length > 1 ? "s" : ""} available</p></div>
                  <ArrowRight className="ml-auto h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1" />
                </Link>
              )}
              {cityTransport.length > 0 && (
                <Link href="/transport" className="group flex items-center gap-4 rounded-xl border p-5 transition-colors hover:border-gold/50">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-lg bg-gold/10 text-gold"><Bus className="h-6 w-6" /></span>
                  <div><p className="font-semibold">Transport</p><p className="mt-0.5 text-sm text-muted-foreground">Getting around {city.city}</p></div>
                  <ArrowRight className="ml-auto h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1" />
                </Link>
              )}
            </div>

            {cityTours.length > 0 && (
              <div className="mt-16">
                <div className="mb-6 flex items-center gap-3"><span className="h-px w-10 bg-gold" /><p className="text-xs font-semibold uppercase tracking-[.24em] text-gold">Things to do</p></div>
                <h2 className="font-serif text-2xl md:text-3xl leading-tight mb-8">Top tours in {city.city}</h2>
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {cityTours.slice(0, 3).map((tour) => (
                    <Link key={tour.slug} href={`/tourism/${tour.slug}`} className="group relative block overflow-hidden rounded-2xl aspect-[4/5] bg-brand/20">
                      <Image src={tour.image} alt={tour.name} fill sizes="33vw" className="object-cover transition-transform duration-700 ease-out group-hover:scale-110" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent" />
                      <div className="absolute right-4 top-4 grid h-10 w-10 scale-75 place-items-center rounded-full border border-white/25 bg-white/10 text-white opacity-0 backdrop-blur-md transition-all duration-500 group-hover:scale-100 group-hover:opacity-100"><ArrowRight className="h-4 w-4" /></div>
                      <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                        <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[.18em] text-white/70"><span className="h-1.5 w-1.5 rounded-full bg-gold" />{tour.category} · {tour.duration}</div>
                        <h3 className="mt-2 font-serif text-2xl font-bold leading-tight text-white">{tour.name}</h3>
                        <p className="mt-4 border-t border-white/20 pt-3 text-xs font-medium text-white/70">From ${tour.price}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          <aside className="lg:border-l lg:border-border lg:pl-8">
            <div className="sticky top-28 space-y-8">
              <CityWeatherWidget slug={slug} />
              <div><p className="text-xs font-semibold uppercase tracking-[.2em] text-gold">Quick links</p></div>
              <div className="space-y-2">
                <Link href={`/accommodation?city=${city.city}`} className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"><Building2 className="h-4 w-4 text-gold" /> Stays in {city.city}</Link>
                <Link href="/flights" className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"><Compass className="h-4 w-4 text-gold" /> Flights to {city.city}</Link>
                <Link href="/events" className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"><CalendarDays className="h-4 w-4 text-gold" /> Events</Link>
                <Link href="/restaurants" className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"><UtensilsCrossed className="h-4 w-4 text-gold" /> Restaurants</Link>
                <Link href="/tourism" className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"><Compass className="h-4 w-4 text-gold" /> Tours</Link>
                <Link href="/transport" className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"><Bus className="h-4 w-4 text-gold" /> Transport</Link>
              </div>
              {cityTours.length > 0 && (
                <div><p className="text-xs font-semibold uppercase tracking-[.2em] text-gold mb-4">Pricing</p><div className="rounded-xl border p-4"><p className="text-3xl font-bold">${Math.min(...cityTours.map(t => t.price))}</p><p className="mt-1 text-xs text-muted-foreground">Starting price for tours</p></div></div>
              )}
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}

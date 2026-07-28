import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CalendarDays, MapPin, ArrowLeft, Tag } from "lucide-react";
import { events } from "@/data/events";

export function generateStaticParams() {
  return events.map((e) => ({ slug: e.slug }));
}

export default async function EventPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const event = events.find((e) => e.slug === slug);
  if (!event) notFound();

  const related = events.filter((e) => e.city === event.city && e.slug !== event.slug);
  const citySlug = event.city.toLowerCase().replace(/\s+/g, "-");

  return (
    <main>
      <section className="relative h-[55vh] min-h-[400px] overflow-hidden">
        <Image src={event.image} alt={event.title} fill priority className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10 lg:p-16">
          <div className="mx-auto max-w-[1440px]">
            <Link href="/events" className="mb-4 inline-flex items-center gap-1.5 text-xs font-medium text-white/70 hover:text-white transition-colors">
              <ArrowLeft className="h-3 w-3" /> Back to events
            </Link>
            <div className="flex items-center gap-3 mt-2 text-xs font-semibold uppercase tracking-[.2em] text-gold">
              <MapPin className="h-4 w-4" />{event.city}, {event.country}
            </div>
            <h1 className="mt-3 max-w-3xl font-serif text-4xl leading-[1.05] tracking-tight text-white md:text-6xl">{event.title}</h1>
          </div>
        </div>
      </section>

      <section className="container py-16 md:py-24">
        <div className="grid gap-16 lg:grid-cols-[2fr_1fr]">
          <div>
            <h2 className="font-serif text-2xl font-bold">About this event</h2>
            <p className="mt-4 text-base leading-8 text-muted-foreground max-w-xl">{event.description}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <div className="flex items-center gap-2 rounded-full border px-4 py-2 text-sm"><CalendarDays className="h-4 w-4 text-gold" /> {event.date}</div>
              <div className="flex items-center gap-2 rounded-full border px-4 py-2 text-sm"><Tag className="h-4 w-4 text-gold" /> {event.category}</div>
              <div className="flex items-center gap-2 rounded-full border px-4 py-2 text-sm"><MapPin className="h-4 w-4 text-gold" /> {event.city}</div>
            </div>
          </div>

          <div className="rounded-2xl border bg-secondary/50 p-8">
            <p className="text-xs font-semibold uppercase tracking-[.2em] text-gold">Date</p>
            <p className="mt-3 font-serif text-3xl font-bold">{event.date}</p>
            <p className="mt-1 text-sm text-muted-foreground">{event.city}, {event.country}</p>
            <div className="mt-6 space-y-3">
              <Link href="/flights" className="inline-flex h-12 w-full items-center justify-center rounded-lg bg-gold text-sm font-semibold text-white transition-colors hover:bg-[#b99557]">Book flights</Link>
              <Link href={`/cities/${citySlug}`} className="inline-flex h-12 w-full items-center justify-center rounded-lg border text-sm font-semibold transition-colors hover:bg-secondary">Explore {event.city}</Link>
            </div>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="container pb-24 md:pb-36">
          <div className="mb-10 border-b pb-6">
            <p className="text-xs font-semibold uppercase tracking-[.2em] text-gold">More in {event.city}</p>
            <h2 className="mt-2 font-serif text-3xl md:text-4xl">Related events</h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((e) => (
              <Link key={e.slug} href={`/events/${e.slug}`} className="group overflow-hidden rounded-2xl border bg-background transition-shadow hover:shadow-md">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image src={e.image} alt={e.title} fill sizes="33vw" className="object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground"><CalendarDays className="h-3 w-3 text-gold" /> {e.date}</div>
                  <h3 className="mt-1.5 font-serif text-xl font-bold leading-tight">{e.title}</h3>
                  <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{e.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}

import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";
import { destinations } from "@/data/destinations";
import { DestinationCard } from "@/components/ui/destination-card";
import { AnimateIn, AnimateInStagger } from "@/components/ui/animate-in";

const featured = destinations.filter((d) =>
  ["lagos", "accra", "nairobi", "kigali", "cape-town", "marrakech"].includes(d.slug)
);

export function DestinationsSection() {
  return (
    <section className="py-28 md:py-36 bg-secondary relative overflow-hidden">
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />
      <div className="absolute top-0 right-0 w-64 h-64 bg-brand/5 rounded-full blur-3xl" />

      <div className="container relative z-10">
        <AnimateIn animation="fade-in-up">
          <div className="flex items-end justify-between gap-8">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/10 mb-6">
                <MapPin className="w-3.5 h-3.5 text-gold" />
                <p className="text-gold text-xs font-medium uppercase tracking-[0.2em]">
                  Destinations
                </p>
              </div>
              <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.1] tracking-tight">
                Cities that feel like home.
              </h2>
            </div>
            <Link
              href="/cities"
              className="hidden lg:inline-flex items-center gap-2 text-sm font-medium text-foreground hover:text-gold transition-colors group shrink-0"
            >
              View all destinations
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </AnimateIn>

        <AnimateInStagger>
          <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.slice(0, 3).map((destination) => (
              <DestinationCard
                key={destination.slug}
                href={`/cities/${destination.slug}`}
                image={destination.image!}
                eyebrow={destination.country}
                title={destination.city}
                description={destination.tag}
              />
            ))}
          </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.slice(3).map((destination) => (
              <DestinationCard
                key={destination.slug}
                href={`/cities/${destination.slug}`}
                image={destination.image!}
                eyebrow={destination.country}
                title={destination.city}
                description={destination.tag}
              />
            ))}
          </div>

          <div className="mt-12 text-center lg:hidden">
            <Link
              href="/cities"
              className="inline-flex items-center gap-2 text-sm font-medium text-foreground hover:text-gold transition-colors group"
            >
              View all destinations
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </AnimateInStagger>
      </div>
    </section>
  );
}

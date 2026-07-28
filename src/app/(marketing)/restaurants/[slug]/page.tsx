import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MapPin, Star, ArrowLeft, UtensilsCrossed } from "lucide-react";
import { restaurants } from "@/data/restaurants";

export function generateStaticParams() {
  return restaurants.map((r) => ({ slug: r.slug }));
}

export default async function RestaurantPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const restaurant = restaurants.find((r) => r.slug === slug);
  if (!restaurant) notFound();

  const related = restaurants.filter((r) => r.city === restaurant.city && r.slug !== restaurant.slug);

  return (
    <main>
      <section className="relative h-[55vh] min-h-[400px] overflow-hidden">
        <Image src={restaurant.image} alt={restaurant.name} fill priority className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10 lg:p-16">
          <div className="mx-auto max-w-[1440px]">
            <Link href="/restaurants" className="mb-4 inline-flex items-center gap-1.5 text-xs font-medium text-white/70 hover:text-white transition-colors">
              <ArrowLeft className="h-3 w-3" /> Back to restaurants
            </Link>
            <div className="flex items-center gap-3 mt-2 text-xs font-semibold uppercase tracking-[.2em] text-gold">
              <MapPin className="h-4 w-4" />{restaurant.city}, {restaurant.country}
            </div>
            <h1 className="mt-3 max-w-3xl font-serif text-4xl leading-[1.05] tracking-tight text-white md:text-6xl">{restaurant.name}</h1>
          </div>
        </div>
      </section>

      <section className="container py-16 md:py-24">
        <div className="grid gap-16 lg:grid-cols-[2fr_1fr]">
          <div>
            <h2 className="font-serif text-2xl font-bold">About</h2>
            <p className="mt-4 text-base leading-8 text-muted-foreground max-w-xl">{restaurant.description}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <div className="flex items-center gap-2 rounded-full border px-4 py-2 text-sm"><Star className="h-4 w-4 text-gold" /> {restaurant.rating}</div>
              <div className="flex items-center gap-2 rounded-full border px-4 py-2 text-sm"><UtensilsCrossed className="h-4 w-4 text-gold" /> {restaurant.cuisine}</div>
              <div className="flex items-center gap-2 rounded-full border px-4 py-2 text-sm"><MapPin className="h-4 w-4 text-gold" /> {restaurant.city}</div>
            </div>
          </div>

          <div className="rounded-2xl border bg-secondary/50 p-8">
            <p className="text-xs font-semibold uppercase tracking-[.2em] text-gold">Price Range</p>
            <p className="mt-3 font-serif text-5xl font-bold">{restaurant.priceRange}</p>
            <p className="mt-1 text-sm text-muted-foreground">per person (approx)</p>
            <Link href={`/cities/${restaurant.city.toLowerCase().replace(/\s+/g, "-")}`} className="mt-6 inline-flex h-12 w-full items-center justify-center rounded-lg bg-gold text-sm font-semibold text-white transition-colors hover:bg-[#b99557]">Explore {restaurant.city}</Link>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="container pb-24 md:pb-36">
          <div className="mb-10 border-b pb-6">
            <p className="text-xs font-semibold uppercase tracking-[.2em] text-gold">More in {restaurant.city}</p>
            <h2 className="mt-2 font-serif text-3xl md:text-4xl">Related restaurants</h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {restaurants.filter((r) => r.city === restaurant.city && r.slug !== restaurant.slug).map((r) => (
              <Link key={r.slug} href={`/restaurants/${r.slug}`} className="group overflow-hidden rounded-2xl border bg-background transition-shadow hover:shadow-md">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image src={r.image} alt={r.name} fill sizes="33vw" className="object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground"><MapPin className="h-3 w-3 text-gold" /> {r.city}</div>
                  <h3 className="mt-1.5 font-serif text-xl font-bold leading-tight">{r.name}</h3>
                  <div className="mt-1 flex items-center gap-1"><Star className="h-3 w-3 text-gold" /><span className="text-xs font-semibold">{r.rating}</span><span className="text-xs text-muted-foreground"> · {r.cuisine}</span></div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}

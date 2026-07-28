import { MapPin } from "lucide-react";
import Link from "next/link";

const experiences = [
  { city: "Lagos", title: "Jollof Cooking Class with a Local Chef", duration: "3 hours", price: "$45" },
  { city: "Accra", title: "Kente Weaving Workshop in Volta Region", duration: "Full day", price: "$80" },
  { city: "Nairobi", title: "Guided Safari at Nairobi National Park", duration: "Half day", price: "$120" },
  { city: "Cape Town", title: "Table Mountain Sunrise Hike", duration: "4 hours", price: "$55" },
  { city: "Dakar", title: "Île de Gorée Historical Walking Tour", duration: "Half day", price: "$35" },
  { city: "Marrakech", title: "Medina Food & Spice Market Tour", duration: "3 hours", price: "$40" },
  { city: "Kigali", title: "Coffee Plantation Experience", duration: "Full day", price: "$65" },
  { city: "Addis Ababa", title: "Traditional Coffee Ceremony & City Tour", duration: "Half day", price: "$30" },
];

export default function ExperiencesPage() {
  return (
    <section className="py-28 md:py-36">
      <div className="container">
        <div className="max-w-2xl">
          <p className="text-gold text-sm font-medium uppercase tracking-[0.2em] mb-4">Curated by locals</p>
          <h1 className="font-serif text-4xl md:text-5xl leading-[1.15] tracking-tight">Experiences</h1>
          <p className="mt-4 text-base text-muted-foreground leading-relaxed">
            Book authentic experiences hosted by locals — from cooking classes to guided tours.
          </p>
        </div>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {experiences.map(({ city, title, duration, price }) => (
            <div key={title} className="group rounded-2xl border border-border bg-background p-6 transition-colors hover:bg-muted">
              <div className="flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-[0.15em] text-muted-foreground">
                <MapPin className="h-3 w-3 text-gold" />
                {city}
              </div>
              <h2 className="mt-3 font-serif text-lg font-bold text-foreground">{title}</h2>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-xs text-muted-foreground">{duration}</span>
                <span className="text-sm font-semibold text-gold">{price}</span>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-8 text-center text-sm text-muted-foreground">
          Want to host an experience?{" "}
          <Link href="mailto:experiences@dyaspora.com" className="font-medium text-gold underline underline-offset-4">Become a host</Link>
        </p>
      </div>
    </section>
  );
}

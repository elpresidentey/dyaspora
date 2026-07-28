import { CalendarDays } from "lucide-react";

const posts = [
  { title: "A First-Timer's Guide to Lagos", excerpt: "Everything you need to know before your first trip to Nigeria's largest city — from navigating the traffic to finding the best jollof.", date: "2026-06-15", readTime: "6 min" },
  { title: "The Best Time to Visit Accra", excerpt: "Weather, events, and peak seasons — plan your Ghana homecoming around the moments that matter most.", date: "2026-05-28", readTime: "4 min" },
  { title: "5 Must-See Spots in Cape Town", excerpt: "From Table Mountain to the V&A Waterfront, here's your essential Cape Town itinerary.", date: "2026-05-10", readTime: "5 min" },
  { title: "Navigating Airport Transfers in Nairobi", excerpt: "Tips for a smooth arrival at JKIA and getting to your accommodation without the stress.", date: "2026-04-22", readTime: "3 min" },
  { title: "What to Pack for a West African Trip", excerpt: "Climate, culture, and essentials — a practical packing guide for Ghana, Nigeria, Senegal and beyond.", date: "2026-04-05", readTime: "7 min" },
  { title: "Understanding Visa Requirements for Diaspora Travel", excerpt: "A country-by-country breakdown of visa policies for African diaspora travellers.", date: "2026-03-18", readTime: "8 min" },
];

export default function BlogPage() {
  return (
    <section className="py-28 md:py-36">
      <div className="container">
        <div className="max-w-2xl">
          <p className="text-gold text-sm font-medium uppercase tracking-[0.2em] mb-4">Journal</p>
          <h1 className="font-serif text-4xl md:text-5xl leading-[1.15] tracking-tight">Blog</h1>
          <p className="mt-4 text-base text-muted-foreground leading-relaxed">
            Stories, guides, and tips for the diaspora traveller.
          </p>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map(({ title, excerpt, date, readTime }) => (
            <article key={title} className="group rounded-2xl border border-border bg-background p-6 transition-colors hover:bg-muted">
              <div className="flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.15em] text-muted-foreground">
                <CalendarDays className="h-3 w-3 text-gold" />
                {date} · {readTime}
              </div>
              <h2 className="mt-3 font-serif text-lg font-bold text-foreground group-hover:text-gold transition-colors">{title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{excerpt}</p>
              <p className="mt-4 text-xs font-medium text-gold">Read more</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

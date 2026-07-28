import { Globe, Heart, Users, Target } from "lucide-react";

const values = [
  { icon: Heart, title: "Rooted in Community", body: "We're built by Africans, for the diaspora. Every feature is designed with the needs of our people in mind — because we live this experience too." },
  { icon: Globe, title: "Pan-African by Design", body: "50+ cities, 20+ countries, one platform. We believe the continent should be experienced as a whole, not divided by borders." },
  { icon: Users, title: "Built for Connection", body: "Homecoming is about people. We make it easy to plan group trips, share itineraries, and travel with your community." },
  { icon: Target, title: "Trust & Reliability", body: "Verified listings, secure payments, real reviews. Your safety and peace of mind are non-negotiable." },
];

export default function AboutPage() {
  return (
    <section className="py-28 md:py-36">
      <div className="container">
        <div className="max-w-2xl">
          <p className="text-gold text-sm font-medium uppercase tracking-[0.2em] mb-4">Company</p>
          <h1 className="font-serif text-4xl md:text-5xl leading-[1.15] tracking-tight">About Dyaspora</h1>
          <p className="mt-4 text-base text-muted-foreground leading-relaxed">
            Dyaspora is the modern homecoming platform for Africans around the world. We bring together flights, accommodation, events, and experiences — everything you need to plan a return that feels like home.
          </p>
        </div>
        <div className="mt-16 grid gap-8 sm:grid-cols-2">
          {values.map(({ icon: Icon, title, body }) => (
            <div key={title} className="rounded-2xl border border-border bg-background p-6">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-brand-light text-gold">
                <Icon className="h-5 w-5" />
              </span>
              <h2 className="mt-4 font-serif text-lg font-bold text-foreground">{title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{body}</p>
            </div>
          ))}
        </div>
        <div className="mt-16 border-t border-border pt-10">
          <h2 className="font-serif text-2xl font-bold text-foreground">Our Story</h2>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Dyaspora started with a simple observation: planning a trip home to Africa is harder than it should be. Flights are scattered across booking sites, events are announced on social media with no central calendar, and finding reliable accommodation takes hours of research.
          </p>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            We built Dyaspora to change that — one platform that brings everything together so you can focus on what matters: reconnecting with your people, your culture, and your home.
          </p>
        </div>
      </div>
    </section>
  );
}

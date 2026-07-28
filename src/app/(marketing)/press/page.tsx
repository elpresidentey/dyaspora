import { Download, Newspaper, FileText } from "lucide-react";

const mentions = [
  { outlet: "TechCrunch", headline: "Dyaspora Raises $2M to Simplify Diaspora Travel to Africa", date: "Mar 2026" },
  { outlet: "Forbes Africa", headline: "How Dyaspora Is Making Homecoming Easier for Africans Abroad", date: "Feb 2026" },
  { outlet: "Bloomberg", headline: "The Startup Tapping Into the $100B Diaspora Travel Market", date: "Jan 2026" },
];

export default function PressPage() {
  return (
    <section className="py-28 md:py-36">
      <div className="container">
        <div className="max-w-2xl">
          <p className="text-gold text-sm font-medium uppercase tracking-[0.2em] mb-4">Media</p>
          <h1 className="font-serif text-4xl md:text-5xl leading-[1.15] tracking-tight">Press</h1>
          <p className="mt-4 text-base text-muted-foreground leading-relaxed">
            Press releases, media kit, and coverage of Dyaspora in the news.
          </p>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          <div className="rounded-2xl border border-border bg-background p-6">
            <Download className="h-6 w-6 text-gold" />
            <h3 className="mt-3 font-serif text-lg font-bold text-foreground">Press Kit</h3>
            <p className="mt-1 text-sm text-muted-foreground">Logos, screenshots, brand guidelines.</p>
            <p className="mt-4 text-xs font-medium text-gold">Download (ZIP)</p>
          </div>
          <div className="rounded-2xl border border-border bg-background p-6">
            <FileText className="h-6 w-6 text-gold" />
            <h3 className="mt-3 font-serif text-lg font-bold text-foreground">Fact Sheet</h3>
            <p className="mt-1 text-sm text-muted-foreground">Key metrics, milestones, and background.</p>
            <p className="mt-4 text-xs font-medium text-gold">View PDF</p>
          </div>
          <div className="rounded-2xl border border-border bg-background p-6">
            <Newspaper className="h-6 w-6 text-gold" />
            <h3 className="mt-3 font-serif text-lg font-bold text-foreground">Contact</h3>
            <p className="mt-1 text-sm text-muted-foreground">Reach our press team.</p>
            <p className="mt-4 text-xs font-medium text-gold">press@dyaspora.com</p>
          </div>
        </div>
        <div className="mt-16">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">In the news</p>
          <div className="mt-4 divide-y divide-border rounded-2xl border border-border">
            {mentions.map(({ outlet, headline, date }) => (
              <div key={headline} className="p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.15em] text-gold">{outlet}</p>
                <p className="mt-1 text-sm font-medium text-foreground">{headline}</p>
                <p className="mt-1 text-xs text-muted-foreground">{date}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

import { MapPin, Clock } from "lucide-react";
import Link from "next/link";

const roles = [
  { title: "Senior Full-Stack Engineer", dept: "Engineering", location: "Lagos / Remote", type: "Full-time" },
  { title: "Product Designer", dept: "Design", location: "Accra / Remote", type: "Full-time" },
  { title: "Community Manager", dept: "Marketing", location: "Nairobi / Remote", type: "Full-time" },
  { title: "Growth Lead", dept: "Business", location: "Remote", type: "Full-time" },
];

export default function CareersPage() {
  return (
    <section className="py-28 md:py-36">
      <div className="container">
        <div className="max-w-2xl">
          <p className="text-gold text-sm font-medium uppercase tracking-[0.2em] mb-4">Join Us</p>
          <h1 className="font-serif text-4xl md:text-5xl leading-[1.15] tracking-tight">Careers</h1>
          <p className="mt-4 text-base text-muted-foreground leading-relaxed">
            Help us build the future of diaspora travel. We&apos;re looking for passionate people who believe in reconnecting Africa with its people.
          </p>
        </div>
        <div className="mt-12 max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Open roles</p>
          <div className="mt-4 divide-y divide-border rounded-2xl border border-border">
            {roles.map(({ title, dept, location, type }) => (
              <div key={title} className="flex flex-col gap-2 p-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="font-medium text-foreground">{title}</h2>
                  <p className="text-xs text-muted-foreground">{dept}</p>
                </div>
                <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><MapPin className="h-3 w-3 text-gold" />{location}</span>
                  <span className="flex items-center gap-1"><Clock className="h-3 w-3 text-gold" />{type}</span>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-6 text-sm text-muted-foreground">
            Don&apos;t see a role that fits?{" "}
            <Link href="mailto:careers@dyaspora.com" className="font-medium text-gold underline underline-offset-4">Send us your CV</Link>
          </p>
        </div>
      </div>
    </section>
  );
}

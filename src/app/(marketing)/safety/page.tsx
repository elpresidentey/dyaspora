import { ShieldCheck, AlertTriangle, Phone, FileText, Hotel, Car, Wifi, MapPin } from "lucide-react";
import Link from "next/link";

const tips = [
  {
    icon: ShieldCheck,
    title: "Booking & Scam Safety",
    body: "Book flights, accommodation, and transport only through trusted platforms. Avoid wire transfers to strangers. Verify event tickets through official vendors. If a deal seems too good to be true, it probably is.",
  },
  {
    icon: AlertTriangle,
    title: "Personal Safety",
    body: "Share your itinerary with someone back home. Keep digital and physical copies of your passport and visa. Stay in well-lit, populated areas at night. Trust your instincts — if a situation feels off, remove yourself.",
  },
  {
    icon: Phone,
    title: "Emergency Contacts",
    body: "Save local emergency numbers for your destination before you arrive. Know your country's embassy or consulate contact. Dyaspora also provides in-app emergency assistance for verified bookings.",
  },
  {
    icon: FileText,
    title: "Document Safety",
    body: "Carry photocopies of your passport, visa, and travel insurance. Store digital copies in a secure cloud folder. Leave a copy with a trusted contact at home. Keep originals in a hotel safe when exploring.",
  },
  {
    icon: Hotel,
    title: "Accommodation Safety",
    body: "Choose hotels or lodgings with 24/7 front desk and secure entry. Read recent reviews mentioning safety. Check that doors and windows lock properly. Know fire escape routes upon check-in.",
  },
  {
    icon: Car,
    title: "Transportation Safety",
    body: "Use registered taxis or ride-hailing apps with tracking. Agree on fares before starting unmetered trips. Avoid travelling alone late at night in unfamiliar areas. Keep your phone charged and accessible.",
  },
  {
    icon: Wifi,
    title: "Digital Security",
    body: "Buy a local SIM card for reliable internet rather than relying on public WiFi. Use a VPN when accessing banking or personal accounts. Avoid logging into sensitive accounts on shared devices.",
  },
  {
    icon: MapPin,
    title: "Cultural Awareness",
    body: "Research local customs, dress codes, and greetings before arrival. Respect religious practices and photography restrictions. Learn a few basic phrases in the local language — it builds goodwill.",
  },
];

export default function SafetyPage() {
  return (
    <section className="py-28 md:py-36">
      <div className="container">
        <div className="max-w-2xl">
          <p className="text-gold text-sm font-medium uppercase tracking-[0.2em] mb-4">
            Trust &amp; Safety
          </p>
          <h1 className="font-serif text-4xl md:text-5xl leading-[1.15] tracking-tight">
            Safety
          </h1>
          <p className="mt-4 text-base text-muted-foreground leading-relaxed">
            Travel informed and stay safe on your homecoming journey. Practical advice for navigating Africa with confidence.
          </p>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {tips.map(({ icon: Icon, title, body }) => (
            <div key={title} className="rounded-2xl border border-border bg-background p-6">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-brand-light text-gold">
                <Icon className="h-5 w-5" />
              </span>
              <h2 className="mt-4 font-serif text-lg font-bold text-foreground">{title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{body}</p>
            </div>
          ))}
        </div>
        <div className="mt-10 rounded-2xl border border-border bg-muted p-6">
          <p className="text-sm leading-relaxed text-muted-foreground">
            <strong className="text-foreground">Emergency Tip:</strong> Before you travel, register with your country&apos;s embassy or consulate in your destination country. Many offer SMS alerts and emergency assistance for citizens abroad.
          </p>
        </div>
        <p className="mt-6 text-sm text-muted-foreground">
          Need more help?{" "}
          <Link href="/help" className="font-medium text-brand underline underline-offset-4 hover:text-gold">
            Visit our help centre
          </Link>
        </p>
      </div>
    </section>
  );
}

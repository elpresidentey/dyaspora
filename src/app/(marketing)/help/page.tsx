import { Mail, MessageCircle, BookOpen } from "lucide-react";
import Link from "next/link";

const faqs = [
  { q: "How do I book a flight?", a: "Search for your route on the flights page, select a flight, and follow the booking steps. You'll need to create an account or sign in to complete your booking." },
  { q: "Can I cancel or modify a booking?", a: "Cancellation and modification policies vary by provider. Check your booking details in the dashboard for specific terms. Contact our support team for assistance." },
  { q: "Is my payment information secure?", a: "Yes. All payments are processed securely. We use industry-standard encryption and never store full payment details on our servers." },
  { q: "How do I contact a host or provider?", a: "Once you have a confirmed booking, you can message the provider directly through your dashboard's messages section." },
  { q: "What cities are supported?", a: "We currently support 50+ cities across Africa, including Lagos, Accra, Nairobi, Cape Town, Dakar, Kigali, Marrakech, and more. New cities are added regularly." },
  { q: "Do I need a visa to travel?", a: "Visa requirements depend on your nationality and destination. Check with the embassy of your destination country. We recommend doing this at least 4-6 weeks before travel." },
];

export default function HelpPage() {
  return (
    <section className="py-28 md:py-36">
      <div className="container">
        <div className="max-w-2xl">
          <p className="text-gold text-sm font-medium uppercase tracking-[0.2em] mb-4">Support</p>
          <h1 className="font-serif text-4xl md:text-5xl leading-[1.15] tracking-tight">Help Center</h1>
          <p className="mt-4 text-base text-muted-foreground leading-relaxed">
            Find answers to common questions or get in touch with our team.
          </p>
        </div>
        <div className="mt-12 max-w-3xl">
          {faqs.map(({ q, a }) => (
            <details key={q} className="group border-b border-border py-5">
              <summary className="flex cursor-pointer items-center justify-between text-sm font-semibold text-foreground list-none">
                {q}
                <span className="text-gold transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{a}</p>
            </details>
          ))}
        </div>
        <div className="mt-16 grid gap-6 sm:grid-cols-3">
          <div className="rounded-2xl border border-border bg-background p-6">
            <MessageCircle className="h-6 w-6 text-gold" />
            <h3 className="mt-3 font-serif text-lg font-bold text-foreground">Live Chat</h3>
            <p className="mt-1 text-sm text-muted-foreground">Chat with our support team in real time.</p>
            <p className="mt-3 text-xs text-muted-foreground">Available 24/7</p>
          </div>
          <div className="rounded-2xl border border-border bg-background p-6">
            <Mail className="h-6 w-6 text-gold" />
            <h3 className="mt-3 font-serif text-lg font-bold text-foreground">Email Us</h3>
            <p className="mt-1 text-sm text-muted-foreground">We&apos;ll get back to you within 24 hours.</p>
            <Link href="mailto:hello@dyaspora.com" className="mt-3 inline-block text-sm font-medium text-gold underline underline-offset-4">hello@dyaspora.com</Link>
          </div>
          <div className="rounded-2xl border border-border bg-background p-6">
            <BookOpen className="h-6 w-6 text-gold" />
            <h3 className="mt-3 font-serif text-lg font-bold text-foreground">Guides</h3>
            <p className="mt-1 text-sm text-muted-foreground">Travel tips and destination guides.</p>
            <Link href="/safety" className="mt-3 inline-block text-sm font-medium text-gold underline underline-offset-4">Safety guide</Link>
          </div>
        </div>
      </div>
    </section>
  );
}

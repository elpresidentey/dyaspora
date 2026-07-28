import Link from "next/link";
import { ArrowUpRight, Globe, Mail, MessageCircle } from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { siteConfig } from "@/config/site";

const footerLinks = [
  { title: "Explore", links: [{ label: "Flights", href: "/flights" }, { label: "Stays", href: "/accommodation" }, { label: "Events", href: "/events" }, { label: "Cities", href: "/cities" }] },
  { title: "The world of Dyaspora", links: [{ label: "Experiences", href: "/experiences" }, { label: "Restaurants", href: "/restaurants" }, { label: "Transport", href: "/transport" }, { label: "Tourism", href: "/tourism" }] },
  { title: "About", links: [{ label: "Our story", href: "/about" }, { label: "Journal", href: "/blog" }, { label: "Careers", href: "/careers" }, { label: "Help center", href: "/help" }] },
];

export function Footer() {
  return (
    <footer className="overflow-hidden bg-brand text-white">
      <div className="relative mx-auto max-w-[1440px] px-6 pb-8 pt-20 sm:px-10 lg:px-16 lg:pt-24">
        <div className="pointer-events-none absolute -right-20 -top-32 h-96 w-96 rounded-full bg-gold/10 blur-3xl" />
        <div className="relative grid grid-cols-1 gap-16 border-b border-white/15 pb-16 lg:grid-cols-[1.25fr_1fr] lg:gap-24">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[.24em] text-gold">Your homecoming starts here</p>
            <h2 className="mt-5 max-w-xl font-serif text-4xl leading-[1.05] tracking-[-.03em] sm:text-6xl">Take the long way back.</h2>
            <p className="mt-6 max-w-md text-sm leading-7 text-white/60">Plan a return that feels like you. Discover the places, people, and moments waiting on the other side.</p>
            <Link href="/flights" className="group mt-8 inline-flex items-center gap-3 rounded-lg bg-gold px-6 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#b99557]">Start planning <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></Link>
          </div>
          <div className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-3">
            {footerLinks.map((group) => <div key={group.title}><h3 className="text-[10px] font-semibold uppercase tracking-[.2em] text-white/45">{group.title}</h3><ul className="mt-5 space-y-3.5">{group.links.map((link) => <li key={link.href}><Link href={link.href} className="text-sm text-white/70 transition-colors hover:text-gold">{link.label}</Link></li>)}</ul></div>)}
          </div>
        </div>
        <div className="relative flex flex-col gap-6 pt-7 text-xs text-white/45 md:flex-row md:items-center md:justify-between">
          <Logo variant="light" />
          <div className="flex flex-wrap items-center gap-x-5 gap-y-3"><span>© {new Date().getFullYear()} {siteConfig.name}</span><Link href="/privacy" className="transition-colors hover:text-white">Privacy</Link><Link href="/terms" className="transition-colors hover:text-white">Terms</Link></div>
          <div className="flex items-center gap-2"><span>Follow the journey</span><Link href={siteConfig.links.twitter} aria-label="Dyaspora on Twitter" className="transition-colors hover:text-gold"><MessageCircle className="h-4 w-4" /></Link><Link href="mailto:hello@dyaspora.com" aria-label="Email Dyaspora" className="transition-colors hover:text-gold"><Mail className="h-4 w-4" /></Link><Link href={siteConfig.links.github} aria-label="Dyaspora online" className="transition-colors hover:text-gold"><Globe className="h-4 w-4" /></Link></div>
        </div>
        <div className="relative mt-8 flex flex-col items-start gap-3 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[11px] leading-relaxed text-white/35">Built by <span className="font-medium text-white/60">IEL Web Services</span> <span className="text-white/20">—</span> for the diasporan.</p>
          <p className="text-[11px] text-white/25">crafted with purpose <span className="text-white/15">·</span> rooted in culture</p>
        </div>
      </div>
    </footer>
  );
}

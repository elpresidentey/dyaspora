"use client";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, Building2, CalendarDays, Compass, Globe, HeartPulse, House, Menu, Plane, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { siteConfig } from "@/config/site";

const navItems = [
  { label: "Home", href: "/", icon: House },
  { label: "Flights", href: "/flights", icon: Plane },
  { label: "Stays", href: "/accommodation", icon: Building2 },
  { label: "Events", href: "/events", icon: CalendarDays },
  { label: "Discover", href: "/cities", icon: Compass },
];

export function MobileNav() {
  return (
    <Sheet>
      <SheetTrigger
        render={

        <Button variant="ghost" size="icon" className="lg:hidden rounded-lg text-muted-foreground hover:text-foreground" />
        }
      >
        <Menu className="h-5 w-5" />
        <span className="sr-only">Toggle menu</span>
      </SheetTrigger>
      <SheetContent side="right" className="w-full max-w-sm border-l border-border bg-background p-6">
        <nav className="flex flex-col gap-8">
          <Link href="/" className="flex items-center gap-3">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-brand text-white text-sm font-serif font-bold">D</span>
            <span className="font-serif text-lg font-bold tracking-[-.03em] text-foreground">{siteConfig.name}</span>
          </Link>
          <div className="flex flex-col gap-1">
            {navItems.map(({ label, href, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <Icon className="h-4 w-4 text-brand" />
                {label}
              </Link>
            ))}
          </div>
          <div className="flex flex-col gap-1 border-t border-border pt-5">
            <span className="px-3 pb-1 text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground">Resources</span>
            {[
              { label: "Currency Converter", href: "/resources/currency", icon: Globe },
              { label: "Safety", href: "/safety", icon: ShieldCheck },
              { label: "Health Advice", href: "/resources/health", icon: HeartPulse },
            ].map(({ label, href, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <Icon className="h-4 w-4 text-brand" />
                {label}
              </Link>
            ))}
          </div>
          <div className="flex flex-col gap-3 pt-2">
            <Button asChild variant="outline" className="w-full">
              <Link href="/login">Sign in</Link>
            </Button>
            <Button asChild className="w-full bg-brand text-white hover:bg-brand/90">
              <Link href="/flights">Plan a trip <ArrowUpRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  );
}

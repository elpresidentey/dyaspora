"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Building2, CalendarDays, Compass, Globe, ShieldCheck, HeartPulse, ChevronDown, House, Plane, LayoutDashboard } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { siteConfig } from "@/config/site";
import { useUser } from "@/components/auth/auth-context";
import { MobileNav } from "./mobile-nav";
import { useOnClickOutside } from "@/hooks/use-on-click-outside";

const navItems = [
  { label: "Home", href: "/", icon: House },
  { label: "Flights", href: "/flights", icon: Plane },
  { label: "Stays", href: "/accommodation", icon: Building2 },
  { label: "Events", href: "/events", icon: CalendarDays },
  { label: "Discover", href: "/cities", icon: Compass },
];

const moreItems = [
  { label: "Currency Converter", href: "/resources/currency", icon: Globe },
  { label: "Safety", href: "/safety", icon: ShieldCheck },
  { label: "Health Advice", href: "/resources/health", icon: HeartPulse },
];

function MoreDropdown() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useOnClickOutside(ref, () => setOpen(false));

  const isMoreActive = moreItems.some((item) => pathname.startsWith(item.href));

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className={`flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
          isMoreActive || open
            ? "bg-brand/10 text-brand"
            : "text-muted-foreground hover:bg-brand/5 hover:text-foreground"
        }`}
      >
        More
        <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="absolute right-0 top-full mt-1.5 w-56 rounded-xl border border-border bg-background p-1.5 shadow-lg">
          {moreItems.map(({ label, href, icon: Icon }) => {
            const isActive = pathname === href || pathname.startsWith(href + "/");
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-brand/10 text-brand"
                    : "text-muted-foreground hover:bg-brand/5 hover:text-foreground"
                }`}
              >
                <Icon className="h-4 w-4 text-brand" />
                {label}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

export function Header() {
  const pathname = usePathname();
  const { user, loading } = useUser();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${
      scrolled
        ? "border-b border-border bg-background/80 shadow-sm backdrop-blur-xl"
        : "border-b border-transparent bg-background/60 backdrop-blur-sm"
    }`}>
      <div className="mx-auto flex h-[68px] max-w-[1440px] items-center justify-between px-6 sm:px-10 lg:px-16">
        <div className="flex items-center gap-10">
          <Link href="/" className="flex items-center gap-3" aria-label={`${siteConfig.name} home`}>
            <span className="grid h-9 w-9 place-items-center rounded-full bg-brand text-white shadow-sm transition-transform duration-300 hover:rotate-[-8deg]">
              <span className="font-serif text-sm font-bold">D</span>
            </span>
            <span className="font-serif text-lg font-bold tracking-[-.03em] text-foreground">{siteConfig.name}</span>
          </Link>
          <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Primary navigation">
            {navItems.map(({ label, href, icon: Icon }) => {
              const isActive = pathname === href || pathname.startsWith(href + "/");
              return (
                <Link
                  key={href}
                  href={href}
                  className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-brand/10 text-brand"
                      : "text-muted-foreground hover:bg-brand/5 hover:text-foreground"
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  {label}
                </Link>
              );
            })}
            <MoreDropdown />
          </nav>
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          {!loading && (
            user ? (
              <Link href="/dashboard" className="hidden items-center gap-2 rounded-lg border border-border px-3.5 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:border-brand/30 hover:bg-brand/5 hover:text-foreground sm:inline-flex">
                <LayoutDashboard className="h-3.5 w-3.5" />
                {user.name.split(" ")[0]}
              </Link>
            ) : (
              <Link href="/login" className="hidden px-3.5 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground sm:inline-flex">Sign in</Link>
            )
          )}
          <Link href="/flights" className="group inline-flex h-9 items-center gap-2 rounded-lg bg-brand px-5 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-light hover:shadow-md">
            <span className="hidden sm:inline">Plan a trip</span><span className="sm:hidden">Plan</span><ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}

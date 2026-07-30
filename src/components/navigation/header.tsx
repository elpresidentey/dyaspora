"use client";

import { Logo } from "@/components/brand/logo";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ArrowUpRight, Building2, CalendarDays, Compass, Globe, ShieldCheck, HeartPulse, ChevronDown, House, Plane, LayoutDashboard, CloudSun, ArrowLeft } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useUser } from "@/components/auth/auth-context";
import { useTheme } from "@/components/theme-provider";
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
  { label: "Weather", href: "/weather", icon: CloudSun },
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
  const router = useRouter();
  const { user, loading } = useUser();
  const { theme, toggle } = useTheme();
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
        <div className="flex items-center gap-3 sm:gap-10">
          {pathname !== "/" && (
            <button onClick={() => router.back()} className="hidden shrink-0 items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground sm:flex" title="Go back">
              <ArrowLeft className="h-4 w-4" />
              <span className="hidden lg:inline">Back</span>
            </button>
          )}
          <Logo />
          <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Primary navigation">
            {navItems.map(({ label, href, icon: Icon }) => {
              const isActive = pathname === href || pathname.startsWith(href + "/");
              return (
                <div key={href} className="group/link">
                  <Link
                    href={href}
                    className={`relative flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? "bg-brand/10 text-brand"
                        : "text-muted-foreground hover:bg-brand/5 hover:text-foreground"
                    }`}
                  >
                    <Icon className={`h-3.5 w-3.5 transition-transform duration-200 ${isActive ? "" : "group-hover/link:scale-110"}`} />
                    <span className="relative">{label}<span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-brand/40 transition-transform duration-300 group-hover/link:scale-x-100" /></span>
                  </Link>
                </div>
              );
            })}
            <MoreDropdown />
          </nav>
        </div>
        <div className="flex items-center gap-1 sm:gap-2">
          <button
            onClick={toggle}
            className="grid h-9 w-9 place-items-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
          >
            {theme === "light" ? (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
            )}
          </button>
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

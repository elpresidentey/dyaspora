"use client";

import Link from "next/link";
import Image from "next/image";
import {
  ArrowUpRight,
  Building2,
  CalendarDays,
  MapPin,
  Plane,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

const slides = [
  {
    image: "/images/hero-slide-1.jpg",
    alt: "African landscape at golden hour",

    headline: (
      <>
        Go where your
        <br />
        <span className="italic text-gold">heart remembers.</span>
      </>
    ),
    tagline:
      "Flights, stays, and the moments in between — thoughtfully planned for the way you come home.",
    featured: {
      city: "Lagos, Nigeria",
      description: "Where the Atlantic breeze meets a city that never stops moving.",
    },
  },
  {
    image: "/images/hero-slide-2.jpg",
    alt: "Dakar waterfront",

    headline: (
      <>
        From diaspora.
        <br />
        <span className="italic text-gold">To home.</span>
      </>
    ),
    tagline:
      "Every journey back is a homecoming. We make it seamless, from booking to arrival.",
    featured: {
      city: "Dakar, Senegal",
      description: "Where the Atlantic meets vibrant culture on the edge of West Africa.",
    },
  },
  {
    image: "/images/hero-slide-3.jpg",
    alt: "Coastal view of Accra",

    headline: (
      <>
        Rediscover the
        <br />
        <span className="italic text-gold">rhythm of home.</span>
      </>
    ),
    tagline:
      "Plan your return with flights, stays, events, and adventures crafted for the African diaspora.",
    featured: {
      city: "Accra, Ghana",
      description: "Warm shores, rich culture, and the heartbeat of West Africa.",
    },
  },
];

export function HeroSection() {
  const [current, setCurrent] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  const goTo = useCallback((index: number) => {
    setCurrent(index);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6500);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const slide = slides[current];
  const parallaxOffset = Math.min(scrollY * 0.35, 300);

  return (
    <section ref={sectionRef} className="relative isolate flex min-h-[100svh] items-end overflow-hidden bg-[#0c1410] text-white">
      {/* Parallax background layers */}
      {slides.map((s, i) => (
        <Image
          key={s.image}
          src={s.image}
          alt={s.alt}
          fill
          priority={i === 0}
          sizes="100vw"
          className={`absolute inset-0 object-cover object-center transition-opacity duration-[1100ms] ease-out will-change-transform ${
            i === current
              ? "opacity-100"
              : "opacity-0"
          }`}
          style={{
            transform: i === current ? `translateY(${parallaxOffset * 0.15}px) scale(${1 + parallaxOffset * 0.0003})` : undefined,
            transition: "opacity 1100ms ease-out",
          }}
        />
      ))}

      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-black/50" style={{ transform: `translateY(${-parallaxOffset * 0.05}px)` }} />
      <div className="absolute inset-0 bg-[linear-gradient(0deg,#000_0%,transparent_45%,transparent_75%,#000_100%)]" />
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_30%,rgba(168,133,74,0.12),transparent_55%)]"
        style={{ transform: `translateY(${-parallaxOffset * 0.08}px)` }}
      />

      {/* Content */}
      <div
        className="relative z-10 w-full px-5 pb-12 pt-20 sm:px-8 sm:pb-14 lg:px-14 lg:pb-16"
        style={{ transform: `translateY(${-parallaxOffset * 0.06}px)` }}
      >
        <div className="mx-auto max-w-[1400px]">
          <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(260px,0.42fr)] lg:gap-14">
            {/* Main copy */}
            <div className="text-center lg:text-left">
              <h1
                key={`h1-${current}`}
                className="mx-auto max-w-3xl animate-[hero-rise_.6s_ease-out_forwards] font-serif text-[clamp(2.6rem,6.2vw,5.25rem)] leading-[0.94] tracking-[-0.04em] text-white lg:mx-0"
              >
                {slide.headline}
              </h1>

              <p
                key={`p-${current}`}
                className="mx-auto mt-5 max-w-md animate-[hero-rise_.6s_.08s_ease-out_forwards] text-[15px] leading-relaxed text-white/72 opacity-0 sm:text-base lg:mx-0"
              >
                {slide.tagline}
              </p>

              <div
                key={`cta-${current}`}
                className="mt-8 flex animate-[hero-rise_.6s_.16s_ease-out_forwards] flex-wrap items-center justify-center gap-3 opacity-0 sm:gap-4 lg:justify-start"
              >
                <Link
                  href="/flights"
                  className="group inline-flex h-12 items-center gap-2 rounded-lg bg-gold px-6 text-sm font-semibold text-white shadow-[0_12px_40px_rgba(168,133,74,0.35)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#b99557] hover:shadow-[0_16px_48px_rgba(168,133,74,0.45)]"
                >
                  Start planning
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
                <Link
                  href="/accommodation"
                  className="group inline-flex h-12 items-center gap-2.5 rounded-lg border border-white/25 bg-white/10 px-5 text-sm font-medium text-white/90 transition-all duration-300 hover:border-white/45 hover:bg-white/15"
                >
                  <Building2 className="h-3.5 w-3.5 text-gold" />
                  Find a stay
                </Link>
              </div>
            </div>

            {/* Featured destination card */}
            <div
              key={`side-${current}`}
              className="hidden animate-[hero-rise_.65s_.2s_ease-out_forwards] opacity-0 lg:block"
            >
              <div className="rounded-2xl border border-white/15 bg-black/40 p-5 shadow-lg backdrop-blur-sm">
                <p className="flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.2em] text-white/55">
                  <MapPin className="h-3 w-3 text-gold" />
                  Featured homecoming
                </p>
                <p className="mt-4 font-serif text-2xl leading-snug tracking-tight text-white">
                  {slide.featured.city}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-white/60">
                  {slide.featured.description}
                </p>
                <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4">
                  <span className="text-[10px] uppercase tracking-[0.18em] text-white/40">
                    {String(current + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
                  </span>
                  <Link
                    href="/accommodation"
                    className="group inline-flex items-center gap-1.5 text-sm font-medium text-gold transition-colors hover:text-white"
                  >
                    Explore
                    <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Quick links strip */}
          <div className="mt-10 animate-[hero-rise_.7s_.28s_ease-out_forwards] opacity-0 sm:mt-12">
            <div className="overflow-hidden rounded-2xl border border-white/12 bg-black/35 shadow-lg backdrop-blur-sm sm:rounded-full">
              <div className="grid grid-cols-1 sm:grid-cols-[1.15fr_1fr_1fr_auto]">
                <Link
                  href="/flights"
                  className="group flex items-center gap-3 border-b border-white/10 px-5 py-4 transition-colors hover:bg-white/[0.06] sm:border-b-0 sm:border-r sm:py-3.5"
                >
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-gold/15 text-gold ring-1 ring-gold/25">
                    <Plane className="h-4 w-4" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[10px] font-medium uppercase tracking-[0.16em] text-white/45">
                      Travel
                    </span>
                    <span className="mt-0.5 block truncate text-sm font-medium text-white">
                      Find a flight
                    </span>
                  </span>
                </Link>

                <Link
                  href="/accommodation"
                  className="group flex items-center gap-3 border-b border-white/10 px-5 py-4 transition-colors hover:bg-white/[0.06] sm:border-b-0 sm:border-r sm:py-3.5"
                >
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white/8 text-gold ring-1 ring-white/15">
                    <Building2 className="h-4 w-4" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[10px] font-medium uppercase tracking-[0.16em] text-white/45">
                      Stay
                    </span>
                    <span className="mt-0.5 block truncate text-sm font-medium text-white">
                      Where are you staying?
                    </span>
                  </span>
                </Link>

                <Link
                  href="/events"
                  className="group flex items-center gap-3 border-b border-white/10 px-5 py-4 transition-colors hover:bg-white/[0.06] sm:border-b-0 sm:border-r sm:py-3.5"
                >
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white/8 text-gold ring-1 ring-white/15">
                    <CalendarDays className="h-4 w-4" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[10px] font-medium uppercase tracking-[0.16em] text-white/45">
                      Discover
                    </span>
                    <span className="mt-0.5 block truncate text-sm font-medium text-white">
                      What&apos;s happening?
                    </span>
                  </span>
                </Link>

                <Link
                  href="/flights"
                  className="flex items-center justify-center gap-2 bg-gold px-6 py-4 text-xs font-semibold uppercase tracking-[0.16em] text-white transition-colors hover:bg-[#b99557] sm:rounded-r-full sm:py-3.5"
                >
                  Search
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>

            {/* Slide dots */}
            <div className="mt-5 flex items-center justify-center gap-2 sm:justify-start">
              {slides.map((s, i) => (
                <button
                  key={s.image}
                  type="button"
                  onClick={() => goTo(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  aria-current={i === current}
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    i === current
                      ? "w-8 bg-gold"
                      : "w-1.5 bg-white/35 hover:bg-white/60"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 animate-[scroll-indicator_2.5s_ease-in-out_infinite] flex-col items-center gap-2 opacity-40 transition-opacity hover:opacity-70 sm:flex">
        <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-white">Scroll</span>
        <div className="h-8 w-[1px] bg-gradient-to-b from-white/60 to-transparent" />
      </div>
    </section>
  );
}

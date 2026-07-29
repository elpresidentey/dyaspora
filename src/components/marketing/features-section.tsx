"use client";

import { Plane, Building2, Calendar, Utensils, Car, Compass, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { AnimateIn } from "@/components/ui/animate-in";

const features = [
  {
    title: "Flights",
    description: "Search and book flights across the continent with ease.",
    href: "/flights",
    icon: Plane,
  },
  {
    title: "Stays",
    description: "Hotels, short-lets, and homes in every major city.",
    href: "/accommodation",
    icon: Building2,
  },
  {
    title: "Events",
    description: "Concerts, festivals, and cultural gatherings.",
    href: "/events",
    icon: Calendar,
  },
  {
    title: "Food",
    description: "Local cuisine and dining experiences.",
    href: "/restaurants",
    icon: Utensils,
  },
  {
    title: "Transport",
    description: "Rides and inter-city travel made simple.",
    href: "/transport",
    icon: Car,
  },
  {
    title: "Tourism",
    description: "Landmarks and hidden gems across Africa.",
    href: "/tourism",
    icon: Compass,
  },
];

export function FeaturesSection() {
  return (
    <section className="py-28 md:py-36 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand/5 rounded-full blur-3xl" />
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-gold/10 rounded-full blur-2xl animate-float" />
      <div className="absolute -bottom-16 -left-16 w-32 h-32 bg-brand/10 rounded-full blur-2xl animate-float-delayed" />

      <div className="container relative z-10">
        <AnimateIn animation="blur-in" duration={800}>
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/10 mb-6">
              <div className="w-1.5 h-1.5 rounded-full bg-gold" />
              <p className="text-gold text-xs font-medium uppercase tracking-[0.2em]">
                Everything you need
              </p>
            </div>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.1] tracking-tight">
              Plan your entire journey, from arrival to return.
            </h2>
          </div>
        </AnimateIn>

        <div className="mt-14 grid grid-cols-1 gap-x-10 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => (
            <AnimateIn key={feature.title} animation="blur-in" delay={100 + i * 80} duration={700}>
              <Link
                href={feature.href}
                className="group flex min-h-[190px] flex-col border-t border-border py-7 transition-colors duration-500 hover:border-gold"
              >
                <div className="flex items-start justify-between">
                  <div className="grid h-11 w-11 place-items-center rounded-full bg-gold/10 text-gold transition-all duration-500 group-hover:bg-gold group-hover:text-white group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-gold/25">
                    <feature.icon className="h-5 w-5 transition-transform duration-500 group-hover:scale-110" />
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground/50 transition-all duration-500 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-gold" />
                </div>
                <h3 className="mt-7 font-serif text-2xl tracking-tight">{feature.title}</h3>
                <p className="mt-2 max-w-xs text-sm leading-6 text-muted-foreground">{feature.description}</p>
              </Link>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Plane } from "lucide-react";
import { AnimateIn } from "@/components/ui/animate-in";

export function CtaSection() {
  return (
    <section className="py-28 md:py-40 border-t relative overflow-hidden">
      {/* Cinematic background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold/10 rounded-full blur-3xl" />

      {/* Floating decorative elements */}
      <div className="absolute top-20 right-10 text-gold/8 hidden lg:block animate-float">
        <Plane className="h-16 w-16 rotate-45" />
      </div>
      <div className="absolute bottom-20 left-10 text-brand/8 hidden lg:block animate-float-delayed">
        <Plane className="h-12 w-12 -rotate-12" />
      </div>
      <div className="absolute top-1/3 left-1/4 w-2 h-2 rounded-full bg-gold/20 animate-float" style={{ animationDelay: "1s" }} />
      <div className="absolute bottom-1/3 right-1/4 w-3 h-3 rounded-full bg-brand/20 animate-float-delayed" style={{ animationDelay: "0.8s" }} />
      <div className="absolute top-1/2 right-1/5 w-1.5 h-1.5 rounded-full bg-gold/30 animate-float" style={{ animationDelay: "2.5s" }} />

      <div className="container relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <AnimateIn animation="scale-out-in" duration={800}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 mb-8">
              <Sparkles className="w-4 h-4 text-gold" />
              <p className="text-gold text-xs font-medium uppercase tracking-[0.2em]">
                Get started
              </p>
            </div>
          </AnimateIn>

          <AnimateIn animation="blur-in" delay={100} duration={900}>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.1] tracking-tight">
              Ready to come home?
            </h2>
          </AnimateIn>

          <AnimateIn animation="blur-in" delay={200} duration={800}>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-xl mx-auto">
              Join thousands of Africans planning their next visit to the continent.
              Your journey begins with a single click.
            </p>
          </AnimateIn>

          <AnimateIn animation="scale-out-in" delay={300} duration={700}>
            <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                size="lg"
                asChild
                className="w-full sm:w-auto px-8 h-[56px] bg-gold text-white hover:bg-gold/90 shadow-xl shadow-gold/20 hover:shadow-gold/30 transition-all duration-500 group"
              >
                <Link href="/signup" className="flex items-center gap-2">
                  Create free account
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="w-full sm:w-auto px-8 h-[56px] border-gold/30 text-gold bg-gold/5 hover:bg-gold/10 hover:border-gold/50 transition-all duration-500 group"
              >
                <Link href="/flights" className="flex items-center gap-2">
                  <Plane className="w-4 h-4" />
                  Search flights
                </Link>
              </Button>
            </div>
          </AnimateIn>

          <AnimateIn animation="fade-in-up" delay={500} duration={600}>
            <div className="mt-16 flex flex-wrap items-center justify-center gap-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse-subtle" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse-subtle" />
                <span>Free to join</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse-subtle" />
                <span>Cancel anytime</span>
              </div>
            </div>
          </AnimateIn>
        </div>
      </div>
    </section>
  );
}

"use client";

import { Quote } from "lucide-react";
import { AnimateIn } from "@/components/ui/animate-in";

export function QuoteSection() {
  return (
    <section className="border-t border-b bg-gradient-to-b from-background via-secondary/50 to-background relative overflow-hidden">
      {/* Floating decorative elements */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gold/5 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-brand/5 rounded-full blur-3xl animate-float-delayed" />
      <div className="absolute top-1/3 right-1/3 w-4 h-4 rounded-full bg-gold/20 animate-float" style={{ animationDelay: "1s" }} />
      <div className="absolute bottom-1/3 left-1/3 w-3 h-3 rounded-full bg-brand/20 animate-float-delayed" style={{ animationDelay: "0.5s" }} />
      <div className="absolute top-1/2 left-1/5 w-2 h-2 rounded-full bg-gold/30 animate-float" style={{ animationDelay: "2s" }} />

      <div className="container py-28 md:py-40 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <AnimateIn animation="scale-out-in" duration={800}>
            <div className="flex justify-center mb-8">
              <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center">
                <Quote className="w-8 h-8 text-gold" />
              </div>
            </div>
          </AnimateIn>

          <AnimateIn animation="blur-in" delay={150} duration={900}>
            <blockquote className="relative">
              <div className="absolute -top-8 -left-8 text-8xl font-serif text-gold/20 leading-none">&ldquo;</div>
              <p className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.2] text-foreground italic relative z-10">
                The continent calls,
                <br />
                and we answer.
              </p>
              <div className="absolute -bottom-12 -right-8 text-8xl font-serif text-gold/20 leading-none">&rdquo;</div>
            </blockquote>
          </AnimateIn>

          <AnimateIn animation="scale-out-in" delay={300} duration={700}>
            <div className="mt-12 flex items-center justify-center gap-3">
              <div className="w-12 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
              <div className="w-2 h-2 rounded-full bg-gold" />
              <div className="w-12 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
            </div>
          </AnimateIn>
        </div>
      </div>
    </section>
  );
}

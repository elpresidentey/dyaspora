import { Quote } from "lucide-react";

export function QuoteSection() {
  return (
    <section className="border-t border-b bg-gradient-to-b from-background via-secondary/50 to-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gold/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-brand/5 rounded-full blur-3xl" />
      
      <div className="container py-28 md:py-40 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-8">
            <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center">
              <Quote className="w-8 h-8 text-gold" />
            </div>
          </div>
          
          <blockquote className="relative">
            <div className="absolute -top-8 -left-8 text-8xl font-serif text-gold/20 leading-none">&ldquo;</div>
            <p className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.2] text-foreground italic relative z-10">
              The continent calls,
              <br />
              and we answer.
            </p>
            <div className="absolute -bottom-12 -right-8 text-8xl font-serif text-gold/20 leading-none">&rdquo;</div>
          </blockquote>
          
          <div className="mt-12 flex items-center justify-center gap-3">
            <div className="w-12 h-px bg-gold" />
            <div className="w-2 h-2 rounded-full bg-gold" />
            <div className="w-12 h-px bg-gold" />
          </div>
        </div>
      </div>
    </section>
  );
}

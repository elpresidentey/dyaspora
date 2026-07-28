import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Plane } from "lucide-react";
import { AnimateIn } from "@/components/ui/animate-in";

export function CtaSection() {
  return (
    <section className="py-28 md:py-40 border-t relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold/10 rounded-full blur-3xl" />
      
      <div className="container relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <AnimateIn>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 mb-8">
              <Sparkles className="w-4 h-4 text-gold" />
              <p className="text-gold text-xs font-medium uppercase tracking-[0.2em]">
                Get started
              </p>
            </div>
          </AnimateIn>
          
          <AnimateIn delay={100}>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.1] tracking-tight">
              Ready to come home?
            </h2>
          </AnimateIn>
          
          <AnimateIn delay={200}>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-xl mx-auto">
              Join thousands of Africans planning their next visit to the continent.
              Your journey begins with a single click.
            </p>
          </AnimateIn>
          
          <AnimateIn delay={300}>
            <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button 
                size="lg" 
                asChild 
                className="w-full sm:w-auto px-8 h-[56px] bg-gold text-white hover:bg-gold/90 shadow-xl shadow-gold/20 hover:shadow-gold/30 transition-all duration-300 group"
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
                className="w-full sm:w-auto px-8 h-[56px] border-gold/30 text-gold bg-gold/5 hover:bg-gold/10 hover:border-gold/50 transition-all duration-300 group"
              >
                <Link href="/flights" className="flex items-center gap-2">
                  <Plane className="w-4 h-4" />
                  Search flights
                </Link>
              </Button>
            </div>
          </AnimateIn>
          
          <AnimateIn delay={400}>
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

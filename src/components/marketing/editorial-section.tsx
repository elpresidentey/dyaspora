import { Heart, Globe, Calendar } from "lucide-react";
import Link from "next/link";
import { AnimateIn } from "@/components/ui/animate-in";

export function EditorialSection() {
  return (
    <section className="border-t bg-secondary relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand/5 rounded-full blur-3xl" />
      
      <div className="container py-28 md:py-36 relative z-10">
        <div className="max-w-3xl">
          <AnimateIn>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-16 h-px bg-gold" />
              <p className="text-sm text-muted-foreground uppercase tracking-[0.2em] font-medium">
                About Dyaspora
              </p>
            </div>
          </AnimateIn>
          
          <AnimateIn delay={100}>
            <blockquote className="font-serif text-3xl sm:text-4xl md:text-5xl leading-[1.2] text-foreground">
              Home isn&apos;t just a place. It&apos;s the feeling of familiar
              air, the taste of a meal you grew up with, the sound of a language
              that needs no translation.
            </blockquote>
          </AnimateIn>
          
          <AnimateIn delay={200}>
            <p className="mt-10 text-lg text-muted-foreground leading-relaxed max-w-2xl">
              Dyaspora brings together flights, accommodation, events, and
              experiences — everything you need to plan your return, whether
              it&apos;s for a wedding, a holiday, or simply to reconnect.
            </p>
          </AnimateIn>
          
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6">
            <AnimateIn delay={200}>
              <Link href="/about" className="group flex items-start gap-4 rounded-xl p-3 transition-colors hover:bg-muted hover:shadow-sm">
                <div className="w-12 h-12 rounded-lg bg-gold/10 flex items-center justify-center flex-shrink-0 group-hover:bg-gold/20 transition-all duration-300 group-hover:scale-110">
                  <Heart className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <p className="font-medium text-foreground group-hover:text-gold transition-colors">Made with love</p>
                  <p className="text-sm text-muted-foreground mt-1">Built by Africans, for Africans</p>
                </div>
              </Link>
            </AnimateIn>
            <AnimateIn delay={300}>
              <Link href="/cities" className="group flex items-start gap-4 rounded-xl p-3 transition-colors hover:bg-muted hover:shadow-sm">
                <div className="w-12 h-12 rounded-lg bg-brand/10 flex items-center justify-center flex-shrink-0 group-hover:bg-brand/20 transition-all duration-300 group-hover:scale-110">
                  <Globe className="w-5 h-5 text-brand" />
                </div>
                <div>
                  <p className="font-medium text-foreground group-hover:text-brand transition-colors">Pan-African</p>
                  <p className="text-sm text-muted-foreground mt-1">50+ cities across the continent</p>
                </div>
              </Link>
            </AnimateIn>
            <AnimateIn delay={400}>
              <Link href="/help" className="group flex items-start gap-4 rounded-xl p-3 transition-colors hover:bg-muted hover:shadow-sm">
                <div className="w-12 h-12 rounded-lg bg-gold/10 flex items-center justify-center flex-shrink-0 group-hover:bg-gold/20 transition-all duration-300 group-hover:scale-110">
                  <Calendar className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <p className="font-medium text-foreground group-hover:text-gold transition-colors">Always here</p>
                  <p className="text-sm text-muted-foreground mt-1">24/7 support wherever you are</p>
                </div>
              </Link>
            </AnimateIn>
          </div>
          
          <AnimateIn delay={400}>
            <div className="w-16 h-px bg-gold mt-12" />
          </AnimateIn>
        </div>
      </div>
    </section>
  );
}

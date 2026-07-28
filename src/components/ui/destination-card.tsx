import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

type DestinationCardProps = {
  href: string;
  image: string;
  eyebrow: string;
  title: string;
  description?: string;
  meta?: string;
  aspect?: string;
};

export function DestinationCard({
  href,
  image,
  eyebrow,
  title,
  description,
  meta,
  aspect = "aspect-[4/5]",
}: DestinationCardProps) {
  return (
    <Link href={href} className={`group relative block overflow-hidden rounded-2xl ${aspect} bg-brand/20 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-xl`}>
      <Image src={image} alt={title} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover transition-all duration-700 ease-out group-hover:scale-110" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 via-50% to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-100" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent" />
      <div className="absolute right-4 top-4 grid h-10 w-10 translate-y-1 place-items-center rounded-xl border border-white/30 bg-white/10 text-white opacity-0 backdrop-blur-md transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
        <ArrowUpRight className="h-4 w-4" />
      </div>
      <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
        <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[.18em] text-white/70">
          <span className="h-1.5 w-1.5 rounded-full bg-gold shadow-[0_0_6px_rgba(168,133,74,0.6)]" />
          {eyebrow}
        </div>
        <h3 className="mt-2 font-serif text-2xl font-bold leading-tight text-white sm:text-3xl">{title}</h3>
        {description && <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-white/65">{description}</p>}
        {meta && <p className="mt-4 border-t border-white/15 pt-3 text-xs font-medium text-white/70">{meta}</p>}
      </div>
    </Link>
  );
}

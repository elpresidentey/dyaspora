import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/config/site";

interface LogoProps {
  showLabel?: boolean;
  variant?: "light" | "dark";
  className?: string;
}

export function Logo({ showLabel = true, variant = "dark", className = "" }: LogoProps) {
  const textColor = variant === "light" ? "text-white" : "text-foreground";

  return (
    <Link href="/" className={`flex items-center gap-3 ${className}`} aria-label={`${siteConfig.name} home`}>
      <span className="relative block h-9 w-9 overflow-hidden rounded-full shadow-sm transition-transform duration-300 hover:rotate-[-8deg]">
        <Image
          src="/images/dyaspora-logo.png"
          alt={`${siteConfig.name} logo`}
          fill
          sizes="36px"
          className="object-cover"
          priority
        />
      </span>
      {showLabel && <span className={`font-serif text-lg font-bold tracking-[-.03em] ${textColor}`}>{siteConfig.name}</span>}
    </Link>
  );
}

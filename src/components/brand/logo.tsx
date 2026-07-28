import Link from "next/link";
import { siteConfig } from "@/config/site";

interface LogoProps {
  showLabel?: boolean;
  variant?: "light" | "dark";
  className?: string;
}

export function Logo({ showLabel = true, variant = "dark", className = "" }: LogoProps) {
  const markFill = variant === "light" ? "#ffffff" : "#1e3a5f";
  const textColor = variant === "light" ? "text-white" : "text-foreground";
  const accentFill = variant === "light" ? "#c9a96e" : "#c9a96e";

  return (
    <Link href="/" className={`flex items-center gap-3 ${className}`} aria-label={`${siteConfig.name} home`}>
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="transition-transform duration-300 hover:rotate-[-8deg]">
        <rect width="36" height="36" rx="18" fill={markFill} />
        <path d="M18 8c-3 0-5.5.8-5.5 3.5v3c0 .8.5 1.5 1.2 1.8l-1 2.7h-2.2V22h2.2v2.5h3V22h2.8l1.6-3.8c1.5.2 4.4.3 5.9-1.5 1-1.2 1-2.8 1-3.7 0-2.5-2.5-5-5.5-5h-3.5z" fill={accentFill} />
        <path d="M19.5 14.5h-2v-3h2c1 0 2 .5 2 1.5s-1 1.5-2 1.5z" fill={markFill} />
        <circle cx="23" cy="25" r="3" fill={accentFill} opacity="0.5" />
        <circle cx="10" cy="27" r="2" fill={accentFill} opacity="0.3" />
      </svg>
      {showLabel && <span className={`font-serif text-lg font-bold tracking-[-.03em] ${textColor}`}>{siteConfig.name}</span>}
    </Link>
  );
}

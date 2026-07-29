"use client";

import { type ReactNode } from "react";
import { useInView } from "@/hooks/use-in-view";

interface AnimateInProps {
  children: ReactNode;
  animation?: "fade-in" | "fade-in-up" | "fade-in-down" | "scale-in" | "slide-in-right" | "blur-in" | "scale-out-in";
  delay?: number;
  duration?: number;
  className?: string;
  as?: "div" | "span" | "section" | "article";
}

const animClasses: Record<string, string> = {
  "fade-in": "opacity-0",
  "fade-in-up": "opacity-0 translate-y-6",
  "fade-in-down": "opacity-0 -translate-y-3",
  "scale-in": "opacity-0 scale-95",
  "slide-in-right": "opacity-0 translate-x-6",
  "blur-in": "opacity-0 blur-sm translate-y-4",
  "scale-out-in": "opacity-0 scale-90",
};

const animActive: Record<string, string> = {
  "fade-in": "opacity-100",
  "fade-in-up": "opacity-100 translate-y-0",
  "fade-in-down": "opacity-100 translate-y-0",
  "scale-in": "opacity-100 scale-100",
  "slide-in-right": "opacity-100 translate-x-0",
  "blur-in": "opacity-100 blur-none translate-y-0",
  "scale-out-in": "opacity-100 scale-100",
};

export function AnimateIn({ children, animation = "fade-in-up", delay = 0, duration = 700, className = "", as: Tag = "div" }: AnimateInProps) {
  const { ref, inView } = useInView({ threshold: 0.05 });

  return (
    <Tag
      ref={ref}
      className={`transition-all ease-out ${inView ? animActive[animation] || "opacity-100 translate-y-0" : animClasses[animation] || "opacity-0"} ${className}`}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </Tag>
  );
}

export function AnimateInStagger({ children, className = "" }: { children: ReactNode; className?: string }) {
  const { ref, inView } = useInView({ threshold: 0.05 });

  return (
    <div ref={ref} className={className}>
      <div className={`${inView ? "[&>*]:opacity-100 [&>*]:translate-y-0 [&>*]:blur-none [&>*]:scale-100" : "[&>*]:opacity-0 [&>*]:translate-y-6 [&>*]:blur-sm [&>*]:scale-[0.97]"} [&>*]:transition-all [&>*]:duration-700 [&>*]:ease-out [&>*:nth-child(1)]:delay-0 [&>*:nth-child(2)]:delay-100 [&>*:nth-child(3)]:delay-200 [&>*:nth-child(4)]:delay-300 [&>*:nth-child(5)]:delay-400 [&>*:nth-child(6)]:delay-500`}>
        {children}
      </div>
    </div>
  );
}

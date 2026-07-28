"use client";

import { type ReactNode } from "react";
import { useInView } from "@/hooks/use-in-view";

interface AnimateInProps {
  children: ReactNode;
  animation?: "fade-in" | "fade-in-up" | "fade-in-down" | "scale-in" | "slide-in-right";
  delay?: number;
  className?: string;
  as?: "div" | "span" | "section";
}

export function AnimateIn({ children, animation = "fade-in-up", delay = 0, className = "", as: Tag = "div" }: AnimateInProps) {
  const { ref, inView } = useInView({ threshold: 0.05 });

  return (
    <Tag
      ref={ref}
      className={`transition-all duration-700 ease-out ${inView ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-6 scale-[0.97]"} ${delay ? `delay-${delay}` : ""} ${className}`}
    >
      {children}
    </Tag>
  );
}

export function AnimateInStagger({ children, className = "" }: { children: ReactNode; className?: string }) {
  const { ref, inView } = useInView({ threshold: 0.05 });

  return (
    <div ref={ref} className={className}>
      <div className={`${inView ? "[&>*]:opacity-100 [&>*]:translate-y-0" : "[&>*]:opacity-0 [&>*]:translate-y-6"} [&>*]:transition-all [&>*]:duration-600 [&>*]:ease-out [&>*:nth-child(1)]:delay-0 [&>*:nth-child(2)]:delay-100 [&>*:nth-child(3)]:delay-200 [&>*:nth-child(4)]:delay-300 [&>*:nth-child(5)]:delay-400`}>
        {children}
      </div>
    </div>
  );
}

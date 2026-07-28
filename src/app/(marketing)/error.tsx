"use client";

import { Button } from "@/components/ui/button";

export default function MarketingError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="container py-24 text-center">
      <p className="text-gold text-xs font-medium uppercase tracking-[0.2em]">Error</p>
      <h2 className="mt-4 font-serif text-4xl font-bold">Something went wrong</h2>
      <p className="mt-2 text-sm text-muted-foreground">
        {error.message || "An unexpected error occurred"}
      </p>
      <Button onClick={reset} className="mt-8">
        Try again
      </Button>
    </div>
  );
}

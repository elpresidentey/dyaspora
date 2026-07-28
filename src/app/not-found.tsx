import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="container py-24 text-center">
      <p className="text-gold text-xs font-medium uppercase tracking-[0.2em]">404</p>
      <h1 className="mt-4 font-serif text-4xl font-bold">Page not found</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        The page you&apos;re looking for doesn&apos;t exist.
      </p>
      <Button asChild className="mt-8">
        <Link href="/">Go home</Link>
      </Button>
    </div>
  );
}

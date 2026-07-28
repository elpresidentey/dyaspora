import Link from "next/link";

export default function PrivacyPage() {
  return (
    <section className="py-28 md:py-36">
      <div className="container">
        <div className="max-w-2xl">
          <p className="text-gold text-sm font-medium uppercase tracking-[0.2em] mb-4">
            Legal
          </p>
          <h1 className="font-serif text-4xl md:text-5xl leading-[1.15] tracking-tight">
            Privacy Policy
          </h1>
          <p className="mt-4 text-base text-muted-foreground leading-relaxed">
            Coming soon.
          </p>
          <Link
            href="/"
            className="mt-8 inline-flex text-sm text-muted-foreground hover:text-foreground underline underline-offset-4"
          >
            &larr; Back to home
          </Link>
        </div>
      </div>
    </section>
  );
}

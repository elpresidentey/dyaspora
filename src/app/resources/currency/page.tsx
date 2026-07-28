import { CurrencyConverter } from "./currency-converter";

export default function CurrencyPage() {
  return (
    <section className="py-28 md:py-36">
      <div className="container">
        <div className="max-w-2xl">
          <p className="text-gold text-sm font-medium uppercase tracking-[0.2em] mb-4">
            Travel Tools
          </p>
          <h1 className="font-serif text-4xl md:text-5xl leading-[1.15] tracking-tight">
            Currency Converter
          </h1>
          <p className="mt-4 text-base text-muted-foreground leading-relaxed">
            Convert between major African currencies and global currencies for your homecoming trip.
          </p>
        </div>
        <CurrencyConverter />
      </div>
    </section>
  );
}

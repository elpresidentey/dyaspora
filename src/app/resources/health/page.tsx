import { Syringe, Bug, Sun, Droplets, ShieldCheck, Stethoscope } from "lucide-react";

const tips = [
  {
    icon: Syringe,
    title: "Vaccinations",
    body: "Check requirements for your destination at least 6–8 weeks before travel. Yellow fever vaccination is mandatory for most African countries. Hepatitis A & B, typhoid, and meningitis vaccines are commonly recommended.",
  },
  {
    icon: Bug,
    title: "Malaria Prevention",
    body: "Many parts of Africa are malaria-endemic. Speak to your doctor about prophylactic medication (atovaquone-proguanil, doxycycline, or mefloquine). Use mosquito nets, DEET repellent, and wear long sleeves after dusk.",
  },
  {
    icon: Sun,
    title: "Sun & Heat Safety",
    body: "Stay hydrated with bottled or filtered water. Wear SPF 30+ sunscreen, a hat, and light long-sleeved clothing. Limit outdoor activity between 12–3 PM in hot climates. Watch for heat exhaustion symptoms.",
  },
  {
    icon: Droplets,
    title: "Water & Food Safety",
    body: "Drink only bottled or sterilised water — avoid tap water and ice. Eat freshly cooked, hot food. Avoid raw salads and unpeeled fruit. Street food is fine if cooked in front of you and served hot.",
  },
  {
    icon: ShieldCheck,
    title: "Travel Insurance",
    body: "Get comprehensive travel insurance that covers medical evacuation, hospital stays, and repatriation. Confirm your policy covers the specific countries on your itinerary. Keep emergency numbers saved offline.",
  },
  {
    icon: Stethoscope,
    title: "First-Aid Kit",
    body: "Pack a kit with: antimalarials, oral rehydration salts, antiseptic wipes, plasters, pain relievers (ibuprofen/paracetamol), antihistamines, diarrhoea medication, and any prescription medicines in original packaging with a doctor's note.",
  },
];

export default function HealthPage() {
  return (
    <section className="py-28 md:py-36">
      <div className="container">
        <div className="max-w-2xl">
          <p className="text-gold text-sm font-medium uppercase tracking-[0.2em] mb-4">
            Wellness &amp; Travel Health
          </p>
          <h1 className="font-serif text-4xl md:text-5xl leading-[1.15] tracking-tight">
            Health Advice
          </h1>
          <p className="mt-4 text-base text-muted-foreground leading-relaxed">
            Stay healthy and prepared on your homecoming journey with practical health guidance for travel across Africa.
          </p>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {tips.map(({ icon: Icon, title, body }) => (
            <div key={title} className="rounded-2xl border border-border bg-background p-6">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-brand-light text-gold">
                <Icon className="h-5 w-5" />
              </span>
              <h2 className="mt-4 font-serif text-lg font-bold text-foreground">{title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{body}</p>
            </div>
          ))}
        </div>
        <div className="mt-10 rounded-2xl border border-border bg-muted p-6">
          <p className="text-sm leading-relaxed text-muted-foreground">
            <strong className="text-foreground">Disclaimer:</strong> This information is for general guidance only and does not replace professional medical advice. Always consult a healthcare provider or travel clinic before your trip. Check your government&apos;s travel health advisories for the most current recommendations.
          </p>
        </div>
      </div>
    </section>
  );
}

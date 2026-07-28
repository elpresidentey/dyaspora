"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/components/auth/auth-context";
import { CalendarDays, Plane, Building2, ArrowUpRight } from "lucide-react";
import Link from "next/link";

type Booking = {
  id: string;
  type: "FLIGHT" | "HOTEL";
  status: string;
  createdAt: string;
  flight?: { airline: string; flightNumber: string; origin: string; destination: string; departureTime: string };
  hotel?: { name: string; city: string; country: string };
};

export default function BookingsPage() {
  const { user, loading } = useUser();
  const router = useRouter();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    if (!loading && !user) { router.push("/login"); return; }
    if (!user) return;
    fetch("/api/bookings")
      .then((r) => r.json())
      .then((data) => { setBookings(data.bookings ?? []); setFetching(false); })
      .catch(() => setFetching(false));
  }, [user, loading, router]);

  return (
    <div className="p-6">
      <h1 className="font-serif text-3xl tracking-tight">Bookings</h1>
      <p className="mt-2 text-sm text-muted-foreground">Your upcoming and past trips.</p>
      <div className="mt-8">
        {fetching ? (
          <p className="text-sm text-muted-foreground">Loading bookings...</p>
        ) : bookings.length === 0 ? (
          <div className="rounded-2xl border border-border bg-background p-8 text-center">
            <CalendarDays className="mx-auto h-8 w-8 text-gold" />
            <h2 className="mt-3 font-serif text-lg font-bold">No bookings yet</h2>
            <p className="mt-1 text-sm text-muted-foreground">Start planning your homecoming trip.</p>
            <div className="mt-5 flex justify-center gap-3">
              <Link href="/flights" className="inline-flex items-center gap-1.5 rounded-lg bg-brand px-5 py-2 text-sm font-medium text-white">Search flights <ArrowUpRight className="h-3.5 w-3.5" /></Link>
              <Link href="/accommodation" className="inline-flex items-center gap-1.5 rounded-lg border border-border px-5 py-2 text-sm font-medium text-muted-foreground">Find a stay <ArrowUpRight className="h-3.5 w-3.5" /></Link>
            </div>
          </div>
        ) : (
          <div className="grid gap-4">
            {bookings.map((b) => (
              <div key={b.id} className="rounded-2xl border border-border bg-background p-5">
                <div className="flex items-center gap-3">
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-brand-light text-gold">
                    {b.type === "FLIGHT" ? <Plane className="h-4 w-4" /> : <Building2 className="h-4 w-4" />}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-foreground">
                      {b.type === "FLIGHT" ? `${b.flight?.origin} → ${b.flight?.destination}` : b.hotel?.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {b.type === "FLIGHT" ? `${b.flight?.airline} · ${b.flight?.flightNumber}` : `${b.hotel?.city}, ${b.hotel?.country}`}
                    </p>
                  </div>
                  <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-[0.1em] ${b.status === "CONFIRMED" ? "bg-green-100 text-green-700" : "bg-muted text-muted-foreground"}`}>{b.status}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

"use client";

import Link from "next/link";
import { Suspense, useEffect, useMemo, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, CalendarDays, Check, ChevronDown, Crown, Home, ShieldCheck, Sparkles, Star, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUser } from "@/components/auth/auth-context";
import { StripeCheckout } from "@/components/payment/stripe-checkout";

type RoomType = {
  id: string; name: string; description: string; price: number;
  capacity: number; available: number; amenities: string;
};

type Hotel = {
  id: string; name: string; description: string; city: string; country: string;
  address: string; images: string; amenities: string; rating: number;
  pricePerNight: number; currency: string; rooms: number; roomTypes?: RoomType[];
};

const roomIcons: Record<string, typeof Crown> = {
  "Standard Room": Home,
  "Deluxe Room": Home,
  "Executive Suite": Sparkles,
  "VIP Suite": Crown,
  "Presidential Suite": Crown,
};

const roomColors: Record<string, string> = {
  "Standard Room": "bg-blue-100 text-blue-700 border-blue-200",
  "Deluxe Room": "bg-indigo-100 text-indigo-700 border-indigo-200",
  "Executive Suite": "bg-amber-100 text-amber-700 border-amber-200",
  "VIP Suite": "bg-purple-100 text-purple-700 border-purple-200",
  "Presidential Suite": "bg-rose-100 text-rose-700 border-rose-200",
};

function HotelBookingPage() {
  const { user } = useUser();
  const { id } = useParams<{ id: string }>();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [hotel, setHotel] = useState<Hotel | null>(null);
  const [checkIn, setCheckIn] = useState(searchParams.get("checkIn") || "");
  const [checkOut, setCheckOut] = useState(searchParams.get("checkOut") || "");

  useEffect(() => { window.scrollTo(0, 0); }, []);
  const [guests, setGuests] = useState(searchParams.get("guests") || "2");
  const [rooms, setRooms] = useState("1");
  const [selectedRoomType, setSelectedRoomType] = useState<RoomType | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [bookingId, setBookingId] = useState<string | null>(null);
  const [showPayment, setShowPayment] = useState(false);
  const [error, setError] = useState("");
  const [showAllAmenities, setShowAllAmenities] = useState(false);

  useEffect(() => {
    fetch(`/api/hotels/${id}`).then((r) => r.json()).then((data) => {
      setHotel(data.hotel);
      if (data.hotel?.roomTypes?.length) {
        setSelectedRoomType(data.hotel.roomTypes[0]);
      }
    });
  }, [id]);

  const roomPrice = selectedRoomType?.price ?? hotel?.pricePerNight ?? 0;
  const nights = useMemo(() => {
    if (!checkIn || !checkOut) return 0;
    return Math.max(0, Math.ceil((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / 86400000));
  }, [checkIn, checkOut]);
  const total = roomPrice * nights * Number(rooms || 1);

  async function reserve() {
    setError("");
    if (!checkIn || !checkOut || nights < 1) return setError("Choose a valid check-in and check-out date.");
    setSubmitting(true);
    try {
      const response = await fetch("/api/bookings", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user?.id || "demo-user", type: "hotel", itemId: id, total, currency: "USD",
          checkIn, checkOut, guests: Number(guests), rooms: Number(rooms),
          roomTypeName: selectedRoomType?.name,
          roomTypePrice: selectedRoomType?.price,
        }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Unable to complete booking");
      setBookingId(data.booking.id);
      setShowPayment(true);
    } catch (bookingError) { setError(bookingError instanceof Error ? bookingError.message : "Unable to complete booking"); }
    finally { setSubmitting(false); }
  }

  if (!hotel) return <div className="min-h-screen grid place-items-center text-muted-foreground">Loading stay details…</div>;

  if (confirmed) return (
    <main className="min-h-screen bg-secondary/30 px-6 py-16"><div className="mx-auto max-w-xl text-center">
      <div className="mx-auto mb-6 grid h-16 w-16 place-items-center rounded-full bg-brand text-white"><Check /></div>
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold">Reservation confirmed</p>
      <h1 className="mt-3 font-serif text-4xl">You&apos;re going to {hotel.city}.</h1>
      <p className="mt-4 text-muted-foreground">Your stay at {hotel.name} ({selectedRoomType?.name || "Standard"}) is reserved for {nights} night{nights === 1 ? "" : "s"}. A confirmation has been added to your travel plans.</p>
      <div className="mt-8 flex justify-center gap-3"><Button onClick={() => router.push("/dashboard")} className="bg-gold text-white hover:bg-gold/90">View my bookings</Button><Button variant="outline" asChild><Link href="/accommodation">Find another stay</Link></Button></div>
    </div></main>
  );

  return <main className="min-h-screen bg-secondary/30 pb-16">
    <div className="relative overflow-hidden bg-gradient-to-br from-brand via-brand/95 to-[#0f2740] py-16 md:py-24">
      <div className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full bg-gold/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-gold/5 blur-3xl" />
      <div className="mx-auto max-w-6xl px-6">
        <button onClick={() => router.back()} className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors"><ArrowLeft className="h-4 w-4" /> Back to stays</button>
        <div className="mt-6 md:mt-10">
          <div className="flex flex-wrap items-start justify-between gap-6">
            <div className="max-w-2xl">
              <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-gold">
                <Star className="h-3.5 w-3.5 fill-gold" /> {hotel.rating} &middot; {hotel.city}, {hotel.country}
              </div>
              <h1 className="mt-3 font-serif text-5xl leading-[1.02] tracking-tight text-white md:text-7xl">{hotel.name}</h1>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-white/65">{hotel.description}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {hotel.amenities.split(", ").slice(0, 6).map((a) => (
                  <span key={a} className="rounded-full border border-white/15 bg-white/8 px-3 py-1 text-[11px] font-medium text-white/75 backdrop-blur-sm">{a}</span>
                ))}
              </div>
            </div>
            <div className="rounded-2xl border border-white/15 bg-white/5 p-5 backdrop-blur-xl text-center min-w-[180px]">
              <div className="text-4xl font-bold text-gold">${roomPrice}</div>
              <div className="mt-1 text-sm text-white/60">per night</div>
              {selectedRoomType && <div className="mt-2 border-t border-white/10 pt-2 text-xs text-white/50">{selectedRoomType.name}</div>}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="mx-auto grid grid-cols-1 gap-10 px-6 pt-10 lg:grid-cols-[1fr_380px]">
      <section>
        <p className="text-lg leading-relaxed text-muted-foreground">{hotel.description}</p>
        {hotel.roomTypes && hotel.roomTypes.length > 0 && (
          <div className="mt-8">
            <h2 className="font-serif text-2xl mb-4">Choose your room type</h2>
            <div className="space-y-3">
              {hotel.roomTypes.map((rt) => {
                const isSelected = selectedRoomType?.id === rt.id;
                const Icon = roomIcons[rt.name] || Home;
                const colorClasses = roomColors[rt.name] || "bg-muted text-muted-foreground border-border";
                return (
                  <div
                    key={rt.id}
                    onClick={() => rt.available > 0 && setSelectedRoomType(rt)}
                    className={`rounded-xl border-2 p-4 cursor-pointer transition-all ${
                      isSelected ? "border-gold bg-gold/5 shadow-sm" : rt.available > 0 ? "border-border hover:border-gold/40 hover:bg-muted/30" : "border-border/50 opacity-50 cursor-not-allowed"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-3 min-w-0">
                        <div className={`grid h-10 w-10 shrink-0 place-items-center rounded-lg ${colorClasses}`}>
                          <Icon className="h-5 w-5" />
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold">{rt.name}</span>
                            {rt.name === "VIP Suite" && <span className="rounded-full bg-purple-100 px-2 py-0.5 text-[10px] font-semibold text-purple-700">Popular</span>}
                            {rt.name === "Presidential Suite" && <span className="rounded-full bg-rose-100 px-2 py-0.5 text-[10px] font-semibold text-rose-700">Best</span>}
                          </div>
                          <p className="mt-0.5 text-sm text-muted-foreground line-clamp-2">{rt.description}</p>
                          <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted-foreground">
                            <span>Up to {rt.capacity} guests</span>
                            <span>{rt.available} left</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <div className="text-lg font-bold text-gold">${rt.price}</div>
                        <div className="text-xs text-muted-foreground">/ night</div>
                        {isSelected && <Check className="mt-1 ml-auto h-4 w-4 text-gold" />}
                      </div>
                    </div>
                    {isSelected && rt.amenities && (
                      <div className="mt-3 flex flex-wrap gap-1.5 border-t pt-3">
                        {rt.amenities.split(", ").map((a) => (
                          <span key={a} className="rounded-full bg-background border px-2 py-0.5 text-[10px] text-muted-foreground">{a}</span>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
        <div className="mt-8 border-y py-6">
          <h2 className="font-serif text-2xl">What this stay offers</h2>
          <div className="mt-4 flex flex-wrap gap-x-6 gap-y-3 text-sm text-muted-foreground">
            {(showAllAmenities ? hotel.amenities.split(", ") : hotel.amenities.split(", ").slice(0, 8)).map((amenity) => (
              <span className="flex items-center gap-2" key={amenity}><Check className="h-4 w-4 text-brand" /> {amenity}</span>
            ))}
            {hotel.amenities.split(", ").length > 8 && (
              <button onClick={() => setShowAllAmenities(!showAllAmenities)} className="flex items-center gap-1 text-xs font-medium text-gold hover:underline">
                {showAllAmenities ? "Show less" : `+${hotel.amenities.split(", ").length - 8} more`} <ChevronDown className={`h-3 w-3 transition-transform ${showAllAmenities ? "rotate-180" : ""}`} />
              </button>
            )}
          </div>
        </div>
        <div className="mt-8 flex gap-3 text-sm text-muted-foreground"><ShieldCheck className="h-5 w-5 text-brand" /><span>Free cancellation up to 48 hours before check-in · Secure reservation</span></div>
      </section>
      <Card className="h-fit p-6 shadow-xl shadow-black/5">
        <div className="flex items-end justify-between border-b pb-5">
          <div>
            <span className="text-3xl font-semibold text-gold">${roomPrice}</span>
            <span className="text-sm text-muted-foreground"> / night</span>
          </div>
          <span className="text-sm text-muted-foreground">{selectedRoomType?.name || "Standard"}</span>
        </div>
        <div className="mt-5 space-y-4">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="space-y-2"><Label htmlFor="check-in">Check-in</Label><div className="relative"><CalendarDays className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" /><Input id="check-in" type="date" className="pl-9" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} /></div></div>
            <div className="space-y-2"><Label htmlFor="check-out">Check-out</Label><div className="relative"><CalendarDays className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" /><Input id="check-out" type="date" className="pl-9" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} /></div></div>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="space-y-2"><Label htmlFor="guests">Guests</Label><div className="relative"><Users className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" /><Input id="guests" type="number" min="1" max="10" className="pl-9" value={guests} onChange={(e) => setGuests(e.target.value)} /></div></div>
            <div className="space-y-2"><Label htmlFor="rooms">Rooms</Label><Input id="rooms" type="number" min="1" max="5" value={rooms} onChange={(e) => setRooms(e.target.value)} /></div>
          </div>
          {nights > 0 && (
            <div className="space-y-2 border-t pt-4">
              <div className="flex justify-between text-sm"><span>{selectedRoomType?.name || "Room"} × {nights} night{nights === 1 ? "" : "s"}</span><span>${roomPrice * nights}</span></div>
              {Number(rooms) > 1 && <div className="flex justify-between text-sm text-muted-foreground"><span>Rooms: {rooms}</span><span>×{rooms}</span></div>}
              <div className="flex justify-between border-t pt-2 text-base font-semibold"><span>Total</span><span className="text-gold">${total}</span></div>
            </div>
          )}
          {error && <p className="text-sm text-destructive">{error}</p>}
          {showPayment && bookingId ? (
            <StripeCheckout bookingId={bookingId} amount={total} onSuccess={() => setConfirmed(true)} />
          ) : (
            <Button onClick={reserve} disabled={submitting} className="h-12 w-full bg-gold text-white hover:bg-gold/90">{submitting ? "Reserving…" : "Reserve this stay"}</Button>
          )}
          <p className="text-center text-xs text-muted-foreground">You won&apos;t be charged today</p>
        </div>
      </Card>
    </div>
  </main>;
}

export default function HotelBookingPageWrapper() {
  return (
    <Suspense fallback={<div className="min-h-screen grid place-items-center text-muted-foreground">Loading stay details…</div>}>
      <HotelBookingPage />
    </Suspense>
  );
}

"use client";

import { useState, Suspense, useEffect } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useUser } from "@/components/auth/auth-context";
import { StripeCheckout } from "@/components/payment/stripe-checkout";
import { ArrowLeft, Plane, Building2, Calendar, Lock, Plus, Check, MapPin } from "lucide-react";

type Hotel = {
  id: string; name: string; city: string; country: string;
  pricePerNight: number; rating: number; images: string;
};

function BookingForm() {
  const { user } = useUser();
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => { window.scrollTo(0, 0); }, []);
  const [, setLoading] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [bookingId, setBookingId] = useState<string | null>(null);
  const [passengers, setPassengers] = useState(1);
  const [confirmed, setConfirmed] = useState(false);
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);
  const [hotelNights, setHotelNights] = useState(2);
  const [loadingHotels, setLoadingHotels] = useState(true);

  const airline = searchParams.get("airline") || "Unknown Airline";
  const flightNumber = searchParams.get("flightNumber") || "";
  const origin = searchParams.get("origin") || "";
  const destination = searchParams.get("destination") || "";
  const departureTime = searchParams.get("departureTime") || "";
  const arrivalTime = searchParams.get("arrivalTime") || "";
  const duration = parseInt(searchParams.get("duration") || "120");
  const price = parseInt(searchParams.get("price") || "350");
  const cabinClass = searchParams.get("cabinClass") || "economy";
  const availableSeats = parseInt(searchParams.get("availableSeats") || "0");

  const destinationCity = destination.replace(/\s*\(.*?\)\s*$/, "").trim();

  useEffect(() => {
    if (!destinationCity) return;
    fetch(`/api/accommodation/search?city=${encodeURIComponent(destinationCity)}&checkIn=&checkOut=`)
      .then((r) => r.json())
      .then((d) => { if (d.hotels) setHotels(d.hotels.slice(0, 4)); })
      .catch(() => {})
      .finally(() => setLoadingHotels(false));
  }, [destinationCity]);

  const depDate = new Date(departureTime);
  const arrDate = new Date(arrivalTime);
  const dateStr = depDate.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", year: "numeric" });
  const depTimeStr = depDate.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
  const arrTimeStr = arrDate.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
  const hotelTotal = selectedHotel ? selectedHotel.pricePerNight * hotelNights : 0;
  const total = price * passengers + hotelTotal;

  const handleBookNow = async () => {
    setShowPayment(true);
    setLoading(true);

    try {
      if (!user) {
        router.push("/login");
        return;
      }

      const bookingResponse = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.id,
          type: selectedHotel ? "combined" : "flight",
          itemId: params.id,
          total,
          currency: "USD",
          passengers,
          cabinClass,
          airline,
          flightNumber,
          origin,
          destination,
          departureTime,
          arrivalTime,
          duration,
          price,
          ...(selectedHotel && {
            hotelId: selectedHotel.id,
            hotelName: selectedHotel.name,
            hotelCity: selectedHotel.city,
            hotelPricePerNight: selectedHotel.pricePerNight,
            hotelNights,
          }),
        }),
      });

      const bookingData = await bookingResponse.json();
      if (!bookingResponse.ok) {
        throw new Error(bookingData.error || "Booking failed");
      }

      setBookingId(bookingData.booking.id);
    } catch (error) {
      console.error("Booking error:", error);
      alert(error instanceof Error ? error.message : "Booking failed");
      setShowPayment(false);
    } finally {
      setLoading(false);
    }
  };

  if (confirmed) {
    return (
      <div className="min-h-screen bg-secondary/30">
        <div className="container pt-8">
          <button onClick={() => router.back()} className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-4 w-4" /> Back
          </button>
        </div>
        <div className="container py-20 text-center">
          <div className="mx-auto max-w-md">
            <div className="mx-auto mb-6 grid h-16 w-16 place-items-center rounded-full bg-green-100">
              <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
            </div>
            <h1 className="font-serif text-4xl tracking-tight">Booking confirmed!</h1>
            <p className="mt-3 text-muted-foreground">Your flight {flightNumber} from {origin} to {destination} is confirmed{selectedHotel ? `, along with your stay at ${selectedHotel.name}` : ""}. Check your dashboard for details.</p>
            <div className="mt-8 flex justify-center gap-4">
              <Button onClick={() => router.push("/dashboard")} className="bg-gold hover:bg-gold/90 text-white">View Dashboard</Button>
              <Button variant="outline" onClick={() => router.push("/flights")}>Book another flight</Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary/30">
      <div className="border-b bg-background">
        <div className="container py-8">
          <button onClick={() => router.back()} className="mb-3 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-4 w-4" /> Back to flights
          </button>
          <h1 className="font-serif text-4xl md:text-5xl tracking-tight">Book Your Flight</h1>
        </div>
      </div>

      <div className="container py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="p-6">
            <h2 className="font-serif text-2xl mb-6">Flight Details</h2>

            <div className="space-y-4">
              <div className="flex items-center gap-3 pb-4 border-b">
                <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
                  <Plane className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <div className="font-semibold">{airline}</div>
                  <div className="text-sm text-muted-foreground">{flightNumber}</div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold">{depTimeStr}</div>
                    <div className="text-sm text-muted-foreground">{origin}</div>
                  </div>
                  <div className="flex-1 flex items-center gap-2 px-4">
                    <div className="h-px flex-1 bg-border" />
                    <div className="text-xs text-muted-foreground whitespace-nowrap">{Math.floor(duration / 60)}h {duration % 60 > 0 ? `${duration % 60}m` : ""}</div>
                    <div className="h-px flex-1 bg-border" />
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold">{arrTimeStr}</div>
                    <div className="text-sm text-muted-foreground">{destination}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  <span>{dateStr}</span>
                </div>
              </div>

              <div className="pt-4 border-t">
                <div className="flex items-center justify-between mb-4">
                  <Label htmlFor="passengers">Passengers</Label>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" onClick={() => setPassengers(Math.max(1, passengers - 1))}>-</Button>
                    <span className="w-8 text-center">{passengers}</span>
                    <Button variant="outline" size="sm" onClick={() => setPassengers(Math.min(availableSeats || 9, passengers + 1))}>+</Button>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Cabin class</span>
                  <span className="font-medium capitalize">{cabinClass}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Price per passenger</span>
                  <span className="font-semibold">${price}</span>
                </div>
                {selectedHotel && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{selectedHotel.name} ({hotelNights} night{hotelNights === 1 ? "" : "s"})</span>
                    <span className="font-semibold">${hotelTotal}</span>
                  </div>
                )}
                <div className="flex items-center justify-between text-lg font-bold mt-2">
                  <span>Total</span>
                  <span className="text-gold">${total}</span>
                </div>
              </div>
            </div>
          </Card>

          <Card className={`p-6 ${!selectedHotel ? "" : ""}`}>
            <h2 className="font-serif text-2xl mb-6">Add a Stay? <span className="text-sm font-sans font-normal text-muted-foreground">— {destinationCity}</span></h2>
            {loadingHotels ? (
              <div className="rounded-lg bg-muted p-4 text-center text-sm text-muted-foreground">Loading hotels...</div>
            ) : hotels.length > 0 ? (
              <div className="space-y-3">
                {hotels.map((hotel) => {
                  const isSelected = selectedHotel?.id === hotel.id;
                  return (
                    <div
                      key={hotel.id}
                      onClick={() => setSelectedHotel(isSelected ? null : hotel)}
                      className={`flex cursor-pointer items-center gap-3 rounded-lg border p-3 transition-all ${
                        isSelected ? "border-gold bg-gold/5 shadow-sm" : "border-border hover:border-gold/50"
                      }`}
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-md bg-blue-100">
                        <Building2 className="h-5 w-5 text-blue-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="truncate font-medium text-sm">{hotel.name}</div>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <MapPin className="h-3 w-3" /> {hotel.city}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-sm">${hotel.pricePerNight}</div>
                        <div className="text-xs text-muted-foreground">/ night</div>
                      </div>
                      <div className={`grid h-6 w-6 place-items-center rounded-full border transition-colors ${
                        isSelected ? "border-gold bg-gold text-white" : "border-muted-foreground/30"
                      }`}>
                        {isSelected ? <Check className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5 text-muted-foreground" />}
                      </div>
                    </div>
                  );
                })}
                {selectedHotel && (
                  <div className="flex items-center justify-between border-t pt-3 text-sm">
                    <label className="text-muted-foreground">Nights</label>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" onClick={() => setHotelNights(Math.max(1, hotelNights - 1))} disabled={hotelNights <= 1}>-</Button>
                      <span className="w-8 text-center font-medium">{hotelNights}</span>
                      <Button variant="outline" size="sm" onClick={() => setHotelNights(hotelNights + 1)}>+</Button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No hotels found for this destination.</p>
            )}
          </Card>

          <Card className="p-6">
            <h2 className="font-serif text-2xl mb-6">Payment Details</h2>

            {!showPayment ? (
              <div className="space-y-4">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <Lock className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div>
                      <div className="font-medium text-blue-900">Secure Payment</div>
                      <div className="text-sm text-blue-700 mt-1">Your payment information is encrypted and secure</div>
                    </div>
                  </div>
                </div>
                {!airline && (
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-sm text-amber-800">
                    Flight details not available. Please go back and search for a flight.
                  </div>
                )}
                <Button onClick={handleBookNow} className="w-full bg-gold hover:bg-gold/90 text-white h-12" disabled={!airline}>
                  Proceed to Payment
                </Button>
              </div>
            ) : bookingId ? (
              <StripeCheckout bookingId={bookingId} amount={total} onSuccess={() => setConfirmed(true)} />
            ) : (
              <div className="rounded-lg bg-muted p-4 text-center text-sm text-muted-foreground">
                Creating booking...
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}

export default function FlightBookingPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-secondary/30 flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    }>
      <BookingForm />
    </Suspense>
  );
}

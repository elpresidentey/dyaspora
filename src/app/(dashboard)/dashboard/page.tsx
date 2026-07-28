"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useUser } from "@/components/auth/auth-context";
import { Plane, Building2, Calendar, MapPin, Luggage, Star } from "lucide-react";

interface Booking {
  id: string;
  status: string;
  total: number;
  currency: string;
  createdAt: string;
  flightBooking?: {
    flight: {
      airline: string;
      flightNumber: string;
      origin: string;
      destination: string;
      departureTime: string;
      arrivalTime: string;
    };
    passengers: number;
    cabinClass: string;
  };
  hotelBooking?: {
    hotel: {
      name: string;
      city: string;
      address: string;
    };
    checkIn: string;
    checkOut: string;
    rooms: number;
    guests: number;
  };
  eventBooking?: {
    event: {
      title: string;
      venue: string;
      city: string;
      startDate: string;
    };
    tickets: number;
  };
}

export default function DashboardPage() {
  const { user, loading: authLoading } = useUser();
  const router = useRouter();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [cancelling, setCancelling] = useState<string | null>(null);
  const [confirmCancel, setConfirmCancel] = useState<string | null>(null);
  const [reviewing, setReviewing] = useState<string | null>(null);
  const [reviewRating, setReviewRating] = useState(0);
  const [reviewComment, setReviewComment] = useState("");
  const [submittingReview, setSubmittingReview] = useState(false);
  const [reviewedBookings, setReviewedBookings] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (authLoading) return;
    if (!user) { router.push("/login"); return; }
    (async () => {
      try {
        const response = await fetch(`/api/bookings?userId=${user.id}`);
        const data = await response.json();
        setBookings(data.bookings || []);
      } catch (error) {
        console.error("Failed to fetch bookings:", error);
      } finally {
        setLoading(false);
      }
    })();
  }, [user, authLoading, router]);

  async function handleCancel(bookingId: string) {
    setCancelling(bookingId);
    try {
      const res = await fetch(`/api/bookings/${bookingId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "cancel" }),
      });
      if (!res.ok) {
        const data = await res.json();
        alert(data.error || "Failed to cancel");
        return;
      }
      setBookings((prev) => prev.map((b) => b.id === bookingId ? { ...b, status: "CANCELLED" } : b));
    } catch {
      alert("Failed to cancel booking");
    } finally {
      setCancelling(null);
      setConfirmCancel(null);
    }
  };

  const handleReview = async (bookingId: string) => {
    if (reviewRating === 0) return;
    setSubmittingReview(true);
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user!.id, bookingId, rating: reviewRating, comment: reviewComment || undefined }),
      });
      if (!res.ok) { const d = await res.json(); alert(d.error || "Failed to submit review"); return; }
      setReviewedBookings((prev) => new Set(prev).add(bookingId));
      setReviewing(null);
      setReviewRating(0);
      setReviewComment("");
    } catch { alert("Failed to submit review"); }
    finally { setSubmittingReview(false); }
  };

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

  const formatTime = (dateString: string) =>
    new Date(dateString).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "CONFIRMED": return "text-green-600 bg-green-50";
      case "PENDING": return "text-yellow-600 bg-yellow-50";
      case "CANCELLED": return "text-red-600 bg-red-50";
      default: return "text-gray-600 bg-gray-50";
    }
  };

  const isCombined = (b: Booking) => b.flightBooking && b.hotelBooking;
  const getTripName = (b: Booking) => {
    if (isCombined(b)) return `Trip to ${b.hotelBooking!.hotel.city || b.flightBooking!.flight.destination}`;
    if (b.flightBooking) return `${b.flightBooking.flight.origin} → ${b.flightBooking.flight.destination}`;
    if (b.hotelBooking) return `Stay at ${b.hotelBooking.hotel.name}`;
    if (b.eventBooking) return b.eventBooking.event.title;
    return "Booking";
  };
  const getTripDate = (b: Booking): string => {
    if (b.flightBooking) return formatDate(b.flightBooking.flight.departureTime);
    if (b.hotelBooking) return formatDate(b.hotelBooking.checkIn);
    if (b.eventBooking) return formatDate(b.eventBooking.event.startDate);
    return formatDate(b.createdAt);
  };
  const getTripIcon = (b: Booking) => {
    if (isCombined(b)) return <Luggage className="w-5 h-5" />;
    if (b.flightBooking) return <Plane className="w-5 h-5" />;
    if (b.hotelBooking) return <Building2 className="w-5 h-5" />;
    if (b.eventBooking) return <Calendar className="w-5 h-5" />;
    return <MapPin className="w-5 h-5" />;
  };
  const getTripIconBg = (b: Booking) => {
    if (isCombined(b)) return "bg-indigo-100 text-indigo-600";
    if (b.flightBooking) return "bg-blue-100 text-blue-600";
    if (b.hotelBooking) return "bg-purple-100 text-purple-600";
    return "bg-orange-100 text-orange-600";
  };

  const confirmedBookings = bookings.filter((b) => b.status === "CONFIRMED");
  const pendingBookings = bookings.filter((b) => b.status === "PENDING");
  const pastBookings = bookings.filter((b) => b.status === "CANCELLED");

  return (
    <div className="min-h-screen bg-secondary/30">
      <div className="border-b bg-background">
        <div className="container py-8">
          <h1 className="font-serif text-4xl md:text-5xl tracking-tight">Dashboard</h1>
          <p className="mt-2 text-muted-foreground">Manage your bookings and travel plans</p>
        </div>
      </div>

      <div className="container py-8">
        {loading ? (
          <div className="py-12 text-center"><div className="text-muted-foreground">Loading your trips...</div></div>
        ) : bookings.length === 0 ? (
          <Card className="p-12 text-center">
            <Plane className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
            <h3 className="mb-2 font-serif text-xl">No trips yet</h3>
            <p className="mb-6 text-muted-foreground">Start exploring flights and book your first trip to Africa.</p>
            <Button className="bg-gold text-white hover:bg-gold/90" asChild>
              <Link href="/flights">Search flights</Link>
            </Button>
          </Card>
        ) : (
          <div className="space-y-8">
            {confirmedBookings.length > 0 && (
              <section>
                <h2 className="mb-5 font-serif text-2xl">Upcoming Trips</h2>
                <div className="grid gap-5">
                  {confirmedBookings.map((booking) => (
                    <Card key={booking.id} className="overflow-hidden">
                      <div className="bg-gradient-to-r from-brand to-brand/80 px-6 py-5 text-white">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="grid h-10 w-10 place-items-center rounded-lg bg-white/20">
                              {isCombined(booking) ? <Luggage className="h-5 w-5" /> : <Plane className="h-5 w-5" />}
                            </div>
                            <div>
                              <h3 className="text-lg font-semibold">{getTripName(booking)}</h3>
                              <p className="text-sm text-white/70">{getTripDate(booking)}{isCombined(booking) && booking.flightBooking ? ` — ${booking.flightBooking.passengers} traveler${booking.flightBooking.passengers > 1 ? "s" : ""}` : ""}</p>
                            </div>
                          </div>
                          <div className={`rounded-full px-3 py-1 text-xs font-medium ${booking.status === "CONFIRMED" ? "bg-green-400/20 text-green-100" : getStatusColor(booking.status)}`}>
                            {booking.status}
                          </div>
                        </div>
                      </div>
                      <div className="space-y-4 p-5">
                        {booking.flightBooking && (
                          <div className="rounded-xl border border-blue-100 bg-white p-4 shadow-sm">
                            <div className="flex items-start gap-3">
                              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-blue-500 to-blue-700 text-white shadow-sm">
                                <Plane className="h-5 w-5" />
                              </div>
                              <div className="min-w-0 flex-1">
                                <div className="text-base font-semibold text-foreground">
                                  {booking.flightBooking.flight.origin} → {booking.flightBooking.flight.destination}
                                </div>
                                <div className="mt-0.5 flex items-center gap-1.5 text-xs text-muted-foreground">
                                  <Plane className="h-3 w-3 shrink-0 text-blue-400" />
                                  <span>{booking.flightBooking.flight.airline} &middot; {booking.flightBooking.flight.flightNumber}</span>
                                </div>
                              </div>
                            </div>
                            <div className="mt-3 grid grid-cols-2 gap-3 rounded-lg bg-blue-50/60 p-3">
                              <div>
                                <div className="text-[10px] font-medium uppercase tracking-wider text-blue-500">Departure</div>
                                <div className="mt-0.5 text-sm font-semibold text-foreground">{formatDate(booking.flightBooking.flight.departureTime)}</div>
                                <div className="text-xs text-muted-foreground">{formatTime(booking.flightBooking.flight.departureTime)}</div>
                              </div>
                              <div>
                                <div className="text-[10px] font-medium uppercase tracking-wider text-blue-500">Arrival</div>
                                <div className="mt-0.5 text-sm font-semibold text-foreground">{formatDate(booking.flightBooking.flight.arrivalTime)}</div>
                                <div className="text-xs text-muted-foreground">{formatTime(booking.flightBooking.flight.arrivalTime)}</div>
                              </div>
                            </div>
                            <div className="mt-2 text-xs text-muted-foreground">
                              {booking.flightBooking.passengers} traveler{booking.flightBooking.passengers > 1 ? "s" : ""} &middot; {booking.flightBooking.cabinClass}
                            </div>
                          </div>
                        )}
                        {booking.hotelBooking && (
                          <div className="rounded-xl border border-purple-100 bg-white p-4 shadow-sm">
                            <div className="flex items-start gap-3">
                              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-purple-500 to-purple-700 text-white shadow-sm">
                                <Building2 className="h-5 w-5" />
                              </div>
                              <div className="min-w-0 flex-1">
                                <div className="text-base font-semibold text-foreground">{booking.hotelBooking.hotel.name}</div>
                                <div className="mt-0.5 flex items-center gap-1.5 text-xs text-muted-foreground">
                                  <MapPin className="h-3 w-3 shrink-0 text-purple-400" />
                                  <span className="truncate">{booking.hotelBooking.hotel.city}</span>
                                </div>
                              </div>
                            </div>
                            <div className="mt-3 grid grid-cols-2 gap-3 rounded-lg bg-purple-50/60 p-3">
                              <div>
                                <div className="text-[10px] font-medium uppercase tracking-wider text-purple-500">Check in</div>
                                <div className="mt-0.5 text-sm font-semibold text-foreground">{formatDate(booking.hotelBooking.checkIn)}</div>
                              </div>
                              <div>
                                <div className="text-[10px] font-medium uppercase tracking-wider text-purple-500">Check out</div>
                                <div className="mt-0.5 text-sm font-semibold text-foreground">{formatDate(booking.hotelBooking.checkOut)}</div>
                              </div>
                            </div>
                            <div className="mt-2 flex items-center gap-4 text-xs text-muted-foreground">
                              <span>{booking.hotelBooking.rooms} room{booking.hotelBooking.rooms > 1 ? "s" : ""}</span>
                              <span>&middot;</span>
                              <span>{booking.hotelBooking.guests} guest{booking.hotelBooking.guests > 1 ? "s" : ""}</span>
                            </div>
                          </div>
                        )}
                        <div className="flex items-center justify-between border-t pt-4">
                          <div className="flex items-center gap-3">
                            <span className="text-sm text-muted-foreground">Booked {formatDate(booking.createdAt)}</span>
                            {confirmCancel === booking.id ? (
                              <div className="flex items-center gap-1.5">
                                <Button size="sm" variant="destructive" className="h-7 text-xs px-2" disabled={cancelling === booking.id} onClick={() => handleCancel(booking.id)}>{cancelling === booking.id ? "..." : "Confirm cancel"}</Button>
                                <Button size="sm" variant="outline" className="h-7 text-xs px-2" onClick={() => setConfirmCancel(null)}>Keep</Button>
                              </div>
                            ) : (
                              <button onClick={() => setConfirmCancel(booking.id)} className="text-xs text-destructive hover:underline">Cancel booking</button>
                            )}
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-xs text-muted-foreground">{booking.currency}</span>
                            <span className="text-xl font-bold text-gold">${booking.total}</span>
                          </div>
                        </div>

                        {!reviewedBookings.has(booking.id) && (
                          <div className="border-t pt-3">
                            {reviewing === booking.id ? (
                              <div className="space-y-3">
                                <div className="flex items-center gap-1">
                                  {[1, 2, 3, 4, 5].map((star) => (
                                    <button key={star} type="button" onClick={() => setReviewRating(star)} className={`h-6 w-6 transition-colors ${star <= reviewRating ? "text-gold" : "text-muted-foreground/30"}`}>
                                      <svg viewBox="0 0 20 20" fill="currentColor"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                                    </button>
                                  ))}
                                  <span className="ml-2 text-xs text-muted-foreground">{reviewRating > 0 ? `${reviewRating}/5` : "Tap to rate"}</span>
                                </div>
                                <textarea value={reviewComment} onChange={(e) => setReviewComment(e.target.value)} placeholder="Share your experience (optional)" rows={2} className="w-full rounded-lg border bg-secondary/30 px-3 py-2 text-sm focus:border-gold focus:outline-none resize-none" />
                                <div className="flex gap-2">
                                  <Button size="sm" className="bg-gold text-white hover:bg-gold/90 text-xs h-8" disabled={reviewRating === 0 || submittingReview} onClick={() => handleReview(booking.id)}>{submittingReview ? "..." : "Submit review"}</Button>
                                  <Button size="sm" variant="outline" className="text-xs h-8" onClick={() => { setReviewing(null); setReviewRating(0); setReviewComment(""); }}>Cancel</Button>
                                </div>
                              </div>
                            ) : (
                              <button onClick={() => setReviewing(booking.id)} className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-gold transition-colors">
                                <Star className="h-3.5 w-3.5" /> Leave a review
                              </button>
                            )}
                          </div>
                        )}
                      </div>
                    </Card>
                  ))}
                </div>
              </section>
            )}

            {pendingBookings.length > 0 && (
              <section>
                <h2 className="mb-5 font-serif text-2xl">Pending</h2>
                <div className="grid gap-4">
                  {pendingBookings.map((booking) => (
                    <Card key={booking.id} className="flex items-center gap-4 p-5">
                      <div className={`grid h-10 w-10 place-items-center rounded-lg ${getTripIconBg(booking)}`}>
                        {getTripIcon(booking)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium">{getTripName(booking)}</div>
                        <div className="text-xs text-muted-foreground">{getTripDate(booking)}</div>
                      </div>
                      <div className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusColor(booking.status)}`}>Pending</div>
                      <div className="text-right">
                        <div className="font-semibold text-gold">${booking.total}</div>
                        {confirmCancel === booking.id ? (
                          <div className="mt-2 flex items-center gap-1.5">
                            <Button size="sm" variant="destructive" className="h-7 text-xs px-2" disabled={cancelling === booking.id} onClick={() => handleCancel(booking.id)}>{cancelling === booking.id ? "..." : "Confirm"}</Button>
                            <Button size="sm" variant="outline" className="h-7 text-xs px-2" onClick={() => setConfirmCancel(null)}>Keep</Button>
                          </div>
                        ) : (
                          <button onClick={() => setConfirmCancel(booking.id)} className="mt-1.5 text-xs text-destructive hover:underline">Cancel</button>
                        )}
                      </div>
                    </Card>
                  ))}
                </div>
              </section>
            )}

            {pastBookings.length > 0 && (
              <section>
                <h2 className="mb-5 font-serif text-2xl text-muted-foreground">Past Trips</h2>
                <div className="grid gap-3">
                  {pastBookings.map((booking) => (
                    <Card key={booking.id} className="flex items-center gap-4 p-4 opacity-70">
                      <div className={`grid h-9 w-9 place-items-center rounded-lg ${getTripIconBg(booking)}`}>
                        {getTripIcon(booking)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium">{getTripName(booking)}</div>
                        <div className="text-xs text-muted-foreground">{getTripDate(booking)}</div>
                      </div>
                      <div className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-500">Cancelled</div>
                    </Card>
                  ))}
                </div>
              </section>
            )}

            <div className="flex flex-wrap gap-3 pt-4">
              <Button variant="outline" asChild><Link href="/flights"><Plane className="mr-2 h-4 w-4" /> Search flights</Link></Button>
              <Button variant="outline" asChild><Link href="/accommodation"><Building2 className="mr-2 h-4 w-4" /> Find stays</Link></Button>
              <Button variant="outline" asChild><Link href="/bookings"><Calendar className="mr-2 h-4 w-4" /> All bookings</Link></Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

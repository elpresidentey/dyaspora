"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Building2, Calendar, Search, MapPin, Star, Users, Heart, SlidersHorizontal } from "lucide-react";

interface Hotel {
  id: string;
  name: string;
  description: string;
  city: string;
  country: string;
  address: string;
  images: string;
  amenities: string;
  rating: number;
  pricePerNight: number;
  currency: string;
  rooms: number;
  roomTypes?: RoomType[];
}

interface RoomType {
  id: string;
  name: string;
  description: string;
  price: number;
  capacity: number;
  available: number;
  amenities: string;
}

export default function HotelsPage() {
  const [searchParams, setSearchParams] = useState({
    city: "",
    checkIn: "",
    checkOut: "",
    guests: "1",
  });
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [sort, setSort] = useState("recommended");
  const [saved, setSaved] = useState<string[]>([]);
  const [error, setError] = useState("");

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (searchParams.checkIn && searchParams.checkOut && searchParams.checkOut <= searchParams.checkIn) {
      setError("Check-out must be after check-in.");
      return;
    }
    setLoading(true);
    setSearched(true);

    try {
      const params = new URLSearchParams();
      if (searchParams.city) params.append("city", searchParams.city);
      if (searchParams.guests) params.append("guests", searchParams.guests);

      const response = await fetch(`/api/hotels/search?${params.toString()}`);
      const data = await response.json();
      setHotels(data.hotels || []);
    } catch (error) {
      console.error("Search error:", error);
      setError(error instanceof Error ? error.message : "Search failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const visibleHotels = [...hotels].sort((a, b) => sort === "price" ? a.pricePerNight - b.pricePerNight : sort === "rating" ? b.rating - a.rating : b.rating * 2 + (1000 / (b.pricePerNight || 1)) - (a.rating * 2 + (1000 / (a.pricePerNight || 1))));
  const imageFor = (hotel: Hotel) => {
    if (hotel.images && hotel.images.startsWith("/images/")) return hotel.images;
    return "/images/Lagos.jpg";
  };

  return (
    <div className="min-h-screen bg-secondary/30">
      {/* Header */}
      <div className="border-b bg-background">
        <div className="container py-8">
          <h1 className="font-serif text-4xl md:text-5xl tracking-tight">
            Find hotels in Africa
          </h1>
          <p className="mt-2 text-muted-foreground">
            Discover luxury accommodations across the continent
          </p>
        </div>
      </div>

      <div className="container py-8">
        {/* Search Form */}
        <Card className="p-6 mb-8">
          <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-[1fr_1fr_1fr_1fr_auto] gap-4">
            <div className="space-y-2">
              <Label htmlFor="city">Destination</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="city"
                  placeholder="City or country"
                  className="pl-10"
                  value={searchParams.city}
                  onChange={(e) =>
                    setSearchParams({ ...searchParams, city: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="checkIn">Check-in</Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="checkIn"
                  type="date"
                  className="pl-10"
                  value={searchParams.checkIn}
                  onChange={(e) =>
                    setSearchParams({ ...searchParams, checkIn: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="checkOut">Check-out</Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="checkOut"
                  type="date"
                  className="pl-10"
                  value={searchParams.checkOut}
                  onChange={(e) =>
                    setSearchParams({ ...searchParams, checkOut: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="guests">Guests</Label>
              <div className="relative">
                <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="guests"
                  type="number"
                  min="1"
                  max="10"
                  className="pl-10"
                  value={searchParams.guests}
                  onChange={(e) =>
                    setSearchParams({ ...searchParams, guests: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="hidden sm:block invisible">Search</Label>
              <Button
                type="submit"
                className="w-full sm:w-auto bg-gold hover:bg-gold/90 text-white"
                disabled={loading}
              >
                {loading ? "Searching..." : (
                  <>
                    <Search className="w-4 h-4 mr-2" />
                    Search Hotels
                  </>
                )}
              </Button>
            </div>
          </form>
        </Card>

        {error && <p className="mb-6 text-sm text-destructive">{error}</p>}

        {/* Results */}
        {searched && (
          <div>
            <div className="mb-4 flex flex-col justify-between gap-3 sm:flex-row sm:items-center"><h2 className="font-serif text-2xl">{hotels.length} {hotels.length === 1 ? "hotel" : "hotels"} found</h2><label className="flex items-center gap-2 text-sm text-muted-foreground"><SlidersHorizontal className="h-4 w-4" /><select className="rounded-md border bg-background px-3 py-2 text-foreground" value={sort} onChange={(e) => setSort(e.target.value)}><option value="recommended">Recommended</option><option value="rating">Top rated</option><option value="price">Lowest price</option></select></label></div>

            {hotels.length === 0 ? (
              <Card className="p-12 text-center">
                <Building2 className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No hotels found. Try different search criteria.</p>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {visibleHotels.map((hotel) => (
                  <Card key={hotel.id} className="group relative overflow-hidden rounded-2xl bg-card p-0 ring-0 shadow-sm transition-all duration-300 hover:shadow-lg">
                    <div className="relative h-48 overflow-hidden">
                      <Image src={imageFor(hotel)} alt={`${hotel.name} in ${hotel.city}`} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-cover transition-transform duration-700 group-hover:scale-110" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      <div className="absolute top-3 right-3 bg-background/80 text-foreground backdrop-blur-sm px-2.5 py-1 rounded-lg flex items-center gap-1 shadow-sm">
                        <Star className="w-3.5 h-3.5 text-gold fill-gold" />
                        <span className="text-xs font-bold">{hotel.rating}</span>
                      </div>
                      <button type="button" aria-label={`Save ${hotel.name}`} onClick={() => setSaved((items) => items.includes(hotel.id) ? items.filter((item) => item !== hotel.id) : [...items, hotel.id])} className="absolute left-3 top-3 grid h-8 w-8 place-items-center rounded-lg bg-background/80 text-foreground shadow-sm transition-colors hover:bg-background"><Heart className={`h-4 w-4 ${saved.includes(hotel.id) ? "fill-gold text-gold" : ""}`} /></button>
                      <div className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-lg bg-background/80 px-2.5 py-1 text-xs font-semibold text-foreground shadow-sm">
                        <MapPin className="w-3 h-3 text-gold" />
                        {hotel.city}
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-foreground truncate">{hotel.name}</h3>
                      <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
                        {hotel.description}
                      </p>
                      {hotel.roomTypes && hotel.roomTypes.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-1.5">
                          {hotel.roomTypes.slice(0, 3).map((rt) => (
                            <span key={rt.id} className="rounded-md bg-secondary px-2 py-0.5 text-[10px] font-medium text-muted-foreground">{rt.name}</span>
                          ))}
                          {hotel.roomTypes.length > 3 && (
                            <span className="rounded-md bg-secondary px-2 py-0.5 text-[10px] font-medium text-muted-foreground">+{hotel.roomTypes.length - 3}</span>
                          )}
                        </div>
                      )}
                      <div className="mt-4 flex items-center justify-between border-t border-border pt-3">
                        <div>
                          {hotel.roomTypes ? (
                            <div className="text-lg font-bold text-gold">${Math.min(...hotel.roomTypes.map((r) => r.price))}<span className="text-xs font-normal text-muted-foreground">/night</span></div>
                          ) : (
                            <div className="text-lg font-bold text-gold">${hotel.pricePerNight}<span className="text-xs font-normal text-muted-foreground">/night</span></div>
                          )}
                        </div>
                        <Link href={`/bookings/hotel/${hotel.id}?checkIn=${searchParams.checkIn}&checkOut=${searchParams.checkOut}&guests=${searchParams.guests}`}>
                          <Button className="h-8 rounded-lg bg-gold text-xs font-semibold text-white hover:bg-gold/90 px-4">
                            Book Now
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

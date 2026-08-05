import { NextRequest, NextResponse } from "next/server";
import { mockHotels } from "@/data/hotels";

const roomTypeTemplates = [
  { name: "Standard Room", desc: "Comfortable room with essential amenities", capacity: 2, priceFactor: 0.7, amenities: "WiFi, TV, Mini Bar, Air Conditioning" },
  { name: "Deluxe Room", desc: "Spacious room with premium furnishings and city views", capacity: 2, priceFactor: 1.0, amenities: "WiFi, TV, Mini Bar, Air Conditioning, City View, Bathrobe" },
  { name: "Executive Suite", desc: "Large suite with separate living area and executive perks", capacity: 3, priceFactor: 1.5, amenities: "WiFi, TV, Mini Bar, Air Conditioning, Living Area, Lounge Access, Bathrobe, Slippers" },
  { name: "VIP Suite", desc: "Premium suite with butler service and exclusive amenities", capacity: 4, priceFactor: 2.2, amenities: "WiFi, TV, Mini Bar, Air Conditioning, Living Area, Lounge Access, Butler Service, Jacuzzi, Panoramic View" },
  { name: "Presidential Suite", desc: "Ultimate luxury with panoramic views and private concierge", capacity: 6, priceFactor: 3.5, amenities: "WiFi, TV, Mini Bar, Air Conditioning, Living & Dining Area, Private Concierge, Butler Service, Jacuzzi, Panoramic View, Private Terrace" },
];

function generateRoomTypes(basePrice: number) {
  return roomTypeTemplates.map((t, i) => ({
    id: `rt-${i}`,
    name: t.name,
    description: t.desc,
    price: Math.round(basePrice * t.priceFactor / 10) * 10,
    capacity: t.capacity,
    available: Math.floor(Math.random() * 8) + 2,
    amenities: t.amenities,
  }));
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const city = searchParams.get("city");
    const country = searchParams.get("country");
    const query = searchParams.get("q");

    let filteredHotels = [...mockHotels];

    if (city) {
      filteredHotels = filteredHotels.filter((hotel) =>
        hotel.city.toLowerCase().includes(city.toLowerCase())
      );
    }

    if (country) {
      filteredHotels = filteredHotels.filter((hotel) =>
        hotel.country.toLowerCase().includes(country.toLowerCase())
      );
    }

    if (query) {
      const q = query.toLowerCase();
      filteredHotels = filteredHotels.filter(
        (hotel) =>
          hotel.name.toLowerCase().includes(q) ||
          hotel.city.toLowerCase().includes(q) ||
          hotel.country.toLowerCase().includes(q) ||
          hotel.description.toLowerCase().includes(q)
      );
    }

    const hotelsWithRoomTypes = filteredHotels.map((hotel) => ({
      ...hotel,
      roomTypes: generateRoomTypes(hotel.pricePerNight),
    }));

    return NextResponse.json({
      hotels: hotelsWithRoomTypes,
      count: hotelsWithRoomTypes.length,
    });
  } catch (error) {
    console.error("Hotels search error:", error);
    return NextResponse.json(
      { error: "Failed to search hotels" },
      { status: 500 }
    );
  }
}

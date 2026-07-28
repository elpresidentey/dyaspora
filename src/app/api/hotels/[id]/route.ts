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

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const hotel = mockHotels.find((item) => item.id === id);

  if (!hotel) {
    return NextResponse.json({ error: "Hotel not found" }, { status: 404 });
  }

  return NextResponse.json({ hotel: { ...hotel, roomTypes: generateRoomTypes(hotel.pricePerNight) } });
}

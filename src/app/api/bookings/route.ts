import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { z } from "zod";
import { mockHotels } from "@/data/hotels";
import { supabaseAdmin } from "@/lib/supabase/admin";

const bookingSchema = z.object({
  userId: z.string().min(1, "User ID is required"),
  type: z.enum(["flight", "hotel", "event", "combined"]),
  itemId: z.string(),
  total: z.number(),
  currency: z.string().default("USD"),
  // Flight specific
  passengers: z.number().optional(),
  cabinClass: z.string().optional(),
  airline: z.string().optional(),
  flightNumber: z.string().optional(),
  origin: z.string().optional(),
  destination: z.string().optional(),
  departureTime: z.string().optional(),
  arrivalTime: z.string().optional(),
  duration: z.number().optional(),
  price: z.number().optional(),
  // Hotel specific
  checkIn: z.string().optional(),
  checkOut: z.string().optional(),
  rooms: z.number().optional(),
  guests: z.number().optional(),
  roomTypeId: z.string().optional(),
  roomTypeName: z.string().optional(),
  roomTypePrice: z.number().optional(),
  // Event specific
  tickets: z.number().optional(),
  // Combined trip specific
  hotelId: z.string().optional(),
  hotelName: z.string().optional(),
  hotelCity: z.string().optional(),
  hotelPricePerNight: z.number().optional(),
  hotelNights: z.number().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = bookingSchema.parse(body);

    const existingUser = await prisma.user.findUnique({ where: { id: validatedData.userId } });
    if (!existingUser) {
      const { data: authUser } = await supabaseAdmin.auth.admin.getUserById(validatedData.userId);
      if (!authUser.user?.email) return NextResponse.json({ error: "Authenticated profile not found" }, { status: 401 });
      await prisma.user.create({ data: { id: validatedData.userId, email: authUser.user.email, name: authUser.user.user_metadata?.full_name || authUser.user.email.split("@")[0], password: "supabase-managed" } });
    }
    const userId = validatedData.userId;

    const booking = await prisma.booking.create({
      data: {
        userId,
        total: validatedData.total,
        currency: validatedData.currency,
        status: "PENDING",
      },
    });

    if (validatedData.type === "flight") {
      const flightId = validatedData.itemId;
      const flightData = {
        airline: validatedData.airline || "Unknown Airline",
        flightNumber: validatedData.flightNumber || flightId,
        origin: validatedData.origin || "",
        destination: validatedData.destination || "",
        departureTime: new Date(validatedData.departureTime || new Date()),
        arrivalTime: new Date(validatedData.arrivalTime || new Date()),
        duration: validatedData.duration || 120,
        price: validatedData.price || validatedData.total,
        currency: "USD",
        cabinClass: validatedData.cabinClass || "economy",
        availableSeats: 50,
      };
      await prisma.flight.upsert({
        where: { id: flightId },
        update: flightData,
        create: { id: flightId, ...flightData },
      });
      await prisma.flightBooking.create({
        data: {
          bookingId: booking.id,
          flightId,
          passengers: validatedData.passengers || 1,
          cabinClass: validatedData.cabinClass || "economy",
        },
      });
    }

    if (validatedData.type === "hotel") {
      if (!validatedData.checkIn || !validatedData.checkOut) {
        return NextResponse.json({ error: "Hotel dates are required" }, { status: 400 });
      }
      const catalogHotel = mockHotels.find((hotel) => hotel.id === validatedData.itemId);
      if (!catalogHotel) {
        return NextResponse.json({ error: "Hotel is no longer available" }, { status: 404 });
      }
      await prisma.hotel.upsert({
        where: { id: catalogHotel.id },
        update: {},
        create: catalogHotel,
      });
      await prisma.hotelBooking.create({
        data: {
          bookingId: booking.id,
          hotelId: validatedData.itemId,
          checkIn: new Date(validatedData.checkIn),
          checkOut: new Date(validatedData.checkOut),
          rooms: validatedData.rooms || 1,
          guests: validatedData.guests || 1,
        },
      });
    }

    if (validatedData.type === "combined") {
      const flightId = validatedData.itemId;
      const flightData = {
        airline: validatedData.airline || "Unknown Airline",
        flightNumber: validatedData.flightNumber || flightId,
        origin: validatedData.origin || "",
        destination: validatedData.destination || "",
        departureTime: new Date(validatedData.departureTime || new Date()),
        arrivalTime: new Date(validatedData.arrivalTime || new Date()),
        duration: validatedData.duration || 120,
        price: validatedData.price || validatedData.total,
        currency: "USD",
        cabinClass: validatedData.cabinClass || "economy",
        availableSeats: 50,
      };
      await prisma.flight.upsert({
        where: { id: flightId },
        update: flightData,
        create: { id: flightId, ...flightData },
      });
      await prisma.flightBooking.create({
        data: {
          bookingId: booking.id,
          flightId,
          passengers: validatedData.passengers || 1,
          cabinClass: validatedData.cabinClass || "economy",
        },
      });

      const destCity = validatedData.destination?.replace(/\s*\(.*?\)\s*$/, "").trim() || "";
      const hId = validatedData.hotelId || `${destCity}-hotel-1`;
      const existingHotel = await prisma.hotel.findUnique({ where: { id: hId } });
      if (!existingHotel) {
        await prisma.hotel.create({
          data: {
            id: hId,
            name: validatedData.hotelName || "City Hotel",
            description: "",
            city: validatedData.hotelCity || destCity,
            country: validatedData.destination || "",
            address: validatedData.hotelCity || destCity,
            pricePerNight: validatedData.hotelPricePerNight || 120,
            rating: 4.0,
            amenities: "Free WiFi, Pool, Restaurant",
            images: "/images/hotel-placeholder.jpg",
            rooms: 10,
          },
        });
      }
      await prisma.hotelBooking.create({
        data: {
          bookingId: booking.id,
          hotelId: hId,
          checkIn: new Date(Date.now() + 86400000),
          checkOut: new Date(Date.now() + 86400000 * (1 + (validatedData.hotelNights || 2))),
          rooms: 1,
          guests: validatedData.passengers || 1,
        },
      });
    }

    return NextResponse.json(
      { booking, message: "Booking created successfully" },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      const missingUserId = error.issues.some((issue) => issue.path.includes("userId"));
      if (missingUserId) {
        return NextResponse.json({ error: "You must be logged in to make a booking" }, { status: 401 });
      }
      return NextResponse.json(
        { error: "Validation error", details: error.issues },
        { status: 400 }
      );
    }

    console.error("Booking error:", error);
    return NextResponse.json(
      { error: "Failed to create booking" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    const bookings = await prisma.booking.findMany({
      where: { userId },
      include: {
        flightBooking: {
          include: { flight: true },
        },
        hotelBooking: {
          include: { hotel: true },
        },
        eventBooking: {
          include: { event: true },
        },
        payment: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ bookings });
  } catch (error) {
    console.error("Get bookings error:", error);
    return NextResponse.json(
      { error: "Failed to fetch bookings" },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { z } from "zod";

const reviewSchema = z.object({
  userId: z.string(),
  bookingId: z.string(),
  rating: z.number().min(1).max(5),
  comment: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, bookingId, rating, comment } = reviewSchema.parse(body);

    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
      include: { flightBooking: true, hotelBooking: true },
    });
    if (!booking) return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    if (booking.status !== "CONFIRMED") return NextResponse.json({ error: "Only confirmed bookings can be reviewed" }, { status: 400 });
    if (booking.userId !== userId) return NextResponse.json({ error: "Not your booking" }, { status: 403 });

    const existing = await prisma.review.findFirst({ where: { userId, bookingId } });
    if (existing) return NextResponse.json({ error: "Already reviewed" }, { status: 400 });

    const review = await prisma.review.create({
      data: {
        userId,
        bookingId,
        rating,
        comment,
        hotelId: booking.hotelBooking?.hotelId,
        flightId: booking.flightBooking?.flightId,
      },
    });

    return NextResponse.json({ review }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) return NextResponse.json({ error: "Validation error", details: error.issues }, { status: 400 });
    console.error("Review error:", error);
    return NextResponse.json({ error: "Failed to create review" }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const hotelId = searchParams.get("hotelId");
    const flightId = searchParams.get("flightId");
    const userId = searchParams.get("userId");

    const where: Record<string, string> = {};
    if (hotelId) where.hotelId = hotelId;
    if (flightId) where.flightId = flightId;
    if (userId) where.userId = userId;

    const reviews = await prisma.review.findMany({
      where,
      include: { user: { select: { name: true, image: true } } },
      orderBy: { createdAt: "desc" },
      take: 20,
    });

    return NextResponse.json({ reviews });
  } catch (error) {
    console.error("Get reviews error:", error);
    return NextResponse.json({ error: "Failed to fetch reviews" }, { status: 500 });
  }
}

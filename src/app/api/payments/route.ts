import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { z } from "zod";

const paymentSchema = z.object({
  bookingId: z.string(),
  amount: z.number(),
  currency: z.string().default("USD"),
  provider: z.string().default("mock"),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = paymentSchema.parse(body);

    // Mock payment processing - in production, this would integrate with Stripe/Paystack
    await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate payment processing

    // Create payment record
    const payment = await prisma.payment.create({
      data: {
        bookingId: validatedData.bookingId,
        amount: validatedData.amount,
        currency: validatedData.currency,
        status: "COMPLETED",
        provider: validatedData.provider,
        providerRef: `mock_${Date.now()}`,
      },
    });

    // Update booking status to CONFIRMED
    await prisma.booking.update({
      where: { id: validatedData.bookingId },
      data: { status: "CONFIRMED" },
    });

    return NextResponse.json(
      { payment, message: "Payment successful" },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation error", details: error.issues },
        { status: 400 }
      );
    }

    console.error("Payment error:", error);
    return NextResponse.json(
      { error: "Payment failed" },
      { status: 500 }
    );
  }
}

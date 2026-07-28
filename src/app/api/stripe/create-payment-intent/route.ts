import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe/server";

export async function POST(request: NextRequest) {
  try {
    const { amount, bookingId, currency = "usd" } = await request.json();

    if (!amount || !bookingId) {
      return NextResponse.json({ error: "Missing amount or bookingId" }, { status: 400 });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency,
      metadata: { bookingId },
      automatic_payment_methods: { enabled: true },
    });

    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error("Create payment intent error:", error);
    return NextResponse.json({ error: "Failed to create payment intent" }, { status: 500 });
  }
}

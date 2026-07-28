import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe/server";
import { prisma } from "@/lib/db/prisma";
import { sendBookingConfirmation } from "@/lib/email";

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const signature = request.headers.get("stripe-signature") ?? "";

    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    if (!webhookSecret) {
      return NextResponse.json({ error: "Webhook secret not configured" }, { status: 500 });
    }

    let event;
    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch {
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    if (event.type === "payment_intent.succeeded") {
      const paymentIntent = event.data.object;
      const bookingId = paymentIntent.metadata?.bookingId;

      if (bookingId) {
        await prisma.booking.update({
          where: { id: bookingId },
          data: { status: "CONFIRMED" },
        });

        await prisma.payment.create({
          data: {
            bookingId,
            amount: (paymentIntent.amount as number) / 100,
            currency: (paymentIntent.currency as string).toUpperCase(),
            status: "COMPLETED",
            provider: "stripe",
            providerRef: paymentIntent.id,
          },
        });

        await sendBookingConfirmation(bookingId);
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json({ error: "Webhook handling failed" }, { status: 500 });
  }
}

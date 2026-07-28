import { Resend } from "resend";
import { prisma } from "@/lib/db/prisma";

const resend = new Resend(process.env.RESEND_API_KEY ?? "");

export async function sendBookingConfirmation(bookingId: string) {
  if (!process.env.RESEND_API_KEY) return;

  try {
    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
      include: {
        user: true,
        flightBooking: { include: { flight: true } },
        hotelBooking: { include: { hotel: true } },
      },
    });

    if (!booking?.user?.email) return;

    const isFlight = !!booking.flightBooking;
    const flight = booking.flightBooking?.flight;
    const hotel = booking.hotelBooking?.hotel;

    const details = isFlight && flight
      ? `${flight.airline} ${flight.flightNumber} · ${flight.origin} → ${flight.destination}`
      : hotel
        ? `${hotel.name} · ${hotel.city}, ${hotel.country}`
        : "Booking confirmed";

    await resend.emails.send({
      from: "Dyaspora <onboarding@resend.dev>",
      to: booking.user.email,
      subject: `Booking confirmed — ${details}`,
      html: `
        <div style="font-family:Inter,sans-serif;max-width:480px;margin:0 auto;padding:24px">
          <div style="text-align:center;margin-bottom:32px">
            <div style="width:40px;height:40px;background:#1e3a5f;border-radius:50%;display:inline-flex;align-items:center;justify-content:center;color:white;font-family:Georgia,serif;font-weight:bold;font-size:18px">D</div>
            <div style="font-family:Georgia,serif;font-size:20px;font-weight:bold;color:#1e3a5f;margin-top:8px">Dyaspora</div>
          </div>

          <div style="background:#faf8f5;border-radius:12px;padding:24px;margin-bottom:24px">
            <div style="width:48px;height:48px;background:#d4edda;border-radius:50%;display:inline-flex;align-items:center;justify-content:center;margin-bottom:16px">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#155724" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
            </div>
            <h1 style="font-family:Georgia,serif;font-size:22px;margin:0;color:#1a1a1a">Booking confirmed!</h1>
            <p style="color:#7d7a77;margin:8px 0 0;font-size:14px">${details}</p>
          </div>

          <table style="width:100%;border-collapse:collapse;margin-bottom:24px">
            <tr><td style="padding:8px 0;font-size:12px;color:#7d7a77">Name</td><td style="padding:8px 0;font-size:14px;text-align:right">${booking.user.name}</td></tr>
            <tr><td style="padding:8px 0;font-size:12px;color:#7d7a77;border-top:1px solid #e3e0db">Status</td><td style="padding:8px 0;font-size:14px;text-align:right;border-top:1px solid #e3e0db">${booking.status}</td></tr>
            <tr><td style="padding:8px 0;font-size:12px;color:#7d7a77;border-top:1px solid #e3e0db">Total</td><td style="padding:8px 0;font-size:14px;text-align:right;border-top:1px solid #e3e0db;font-weight:600">$${booking.total}</td></tr>
          </table>

          <a href="${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/dashboard" style="display:block;text-align:center;background:#1e3a5f;color:white;text-decoration:none;padding:12px;border-radius:999px;font-size:14px;font-weight:600">View in dashboard</a>

          <p style="text-align:center;color:#7d7a77;font-size:12px;margin-top:32px">Need help? <a href="mailto:hello@dyaspora.com" style="color:#a8854a">hello@dyaspora.com</a></p>
        </div>
      `,
    });
  } catch (error) {
    console.error("Email send error:", error);
  }
}

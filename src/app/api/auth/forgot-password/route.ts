import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();
    if (!email || typeof email !== "string") {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const normalizedEmail = email.toLowerCase().trim();

    const user = await prisma.user.findUnique({ where: { email: normalizedEmail } });
    if (user) {
      const token = crypto.randomUUID();
      const expires = new Date(Date.now() + 60 * 60 * 1000);
      await prisma.verificationToken.create({
        data: { identifier: user.email, token, expires },
      });

      if (process.env.RESEND_API_KEY) {
        const { Resend } = await import("resend");
        const resetUrl = `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/reset-password?token=${token}&email=${encodeURIComponent(user.email)}`;
        const resend = new Resend(process.env.RESEND_API_KEY);
        await resend.emails.send({
          from: "Dyaspora <onboarding@resend.dev>",
          to: user.email,
          subject: "Reset your Dyaspora password",
          html: `<div style="font-family:Inter,sans-serif;max-width:480px;margin:0 auto;padding:24px"><div style="text-align:center;margin-bottom:32px"><div style="width:40px;height:40px;background:#1e3a5f;border-radius:50%;display:inline-flex;align-items:center;justify-content:center;color:white;font-family:Georgia,serif;font-weight:bold;font-size:18px">D</div><div style="font-family:Georgia,serif;font-size:20px;font-weight:bold;color:#1e3a5f;margin-top:8px">Dyaspora</div></div><h1 style="font-family:Georgia,serif;font-size:22px;color:#1a1a1a">Reset your password</h1><p style="color:#7d7a77;font-size:14px;margin:16px 0">Click the button below to reset your password. This link expires in 1 hour.</p><a href="${resetUrl}" style="display:block;text-align:center;background:#1e3a5f;color:white;text-decoration:none;padding:12px;border-radius:999px;font-size:14px;font-weight:600">Reset password</a><p style="color:#7d7a77;font-size:12px;margin-top:32px;text-align:center">If you didn't request this, you can safely ignore this email.</p></div>`,
        });
      }
    }

    return NextResponse.json({ message: "If an account with that email exists, a reset link has been sent." });
  } catch (error) {
    console.error("Forgot password error:", error);
    return NextResponse.json({ message: "If an account with that email exists, a reset link has been sent." });
  }
}

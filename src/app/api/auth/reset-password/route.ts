import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { hash } from "bcryptjs";

export async function POST(request: NextRequest) {
  try {
    const { token, email, password } = await request.json();

    if (!token || !email || !password) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    if (password.length < 6) {
      return NextResponse.json({ error: "Password must be at least 6 characters" }, { status: 400 });
    }

    const normalizedEmail = email.toLowerCase().trim();

    const verificationToken = await prisma.verificationToken.findUnique({
      where: { token },
    });

    if (!verificationToken || verificationToken.identifier !== normalizedEmail) {
      return NextResponse.json({ error: "Invalid or expired reset token" }, { status: 400 });
    }

    if (new Date() > verificationToken.expires) {
      await prisma.verificationToken.delete({ where: { token } });
      return NextResponse.json({ error: "Reset token has expired. Please request a new one." }, { status: 400 });
    }

    const hashedPassword = await hash(password, 10);

    await prisma.user.update({
      where: { email: normalizedEmail },
      data: { password: hashedPassword },
    });

    await prisma.verificationToken.delete({ where: { token } });

    return NextResponse.json({ message: "Password reset successfully. You can now sign in." });
  } catch (error) {
    console.error("Reset password error:", error);
    return NextResponse.json({ error: "Failed to reset password" }, { status: 500 });
  }
}

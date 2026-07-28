import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { z } from "zod";

const saveSchema = z.object({
  userId: z.string(),
  itemType: z.enum(["flight", "hotel", "event"]),
  itemId: z.string(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, itemType, itemId } = saveSchema.parse(body);

    const existing = await prisma.savedItem.findUnique({
      where: { userId_itemType_itemId: { userId, itemType, itemId } },
    });
    if (existing) {
      await prisma.savedItem.delete({ where: { id: existing.id } });
      return NextResponse.json({ saved: false, message: "Removed from saved" });
    }

    const saved = await prisma.savedItem.create({
      data: { userId, itemType, itemId },
    });

    return NextResponse.json({ saved: true, savedItem: saved, message: "Saved" }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) return NextResponse.json({ error: "Validation error", details: error.issues }, { status: 400 });
    console.error("Save error:", error);
    return NextResponse.json({ error: "Failed to save item" }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const userId = searchParams.get("userId");
    if (!userId) return NextResponse.json({ error: "User ID required" }, { status: 400 });

    const savedItems = await prisma.savedItem.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ savedItems });
  } catch (error) {
    console.error("Get saved error:", error);
    return NextResponse.json({ error: "Failed to fetch saved items" }, { status: 500 });
  }
}

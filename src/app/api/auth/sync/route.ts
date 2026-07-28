import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { supabaseAdmin } from "@/lib/supabase/admin";

export async function POST(request: NextRequest) {
  const token = request.headers.get("authorization")?.replace("Bearer ", "");
  if (!token) return NextResponse.json({ error: "Missing Supabase session" }, { status: 401 });

  const { data: { user }, error } = await supabaseAdmin.auth.getUser(token);
  if (error || !user || !user.email) return NextResponse.json({ error: "Invalid Supabase session" }, { status: 401 });

  const profile = await prisma.user.upsert({
    where: { id: user.id },
    update: { email: user.email, name: user.user_metadata?.full_name || user.user_metadata?.name || undefined },
    create: { id: user.id, email: user.email, name: user.user_metadata?.full_name || user.user_metadata?.name || user.email.split("@")[0], password: "supabase-managed" },
    select: { id: true, name: true, email: true, role: true },
  });

  return NextResponse.json({ user: profile });
}

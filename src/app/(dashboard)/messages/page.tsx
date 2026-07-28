"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/components/auth/auth-context";
import { MessageCircle } from "lucide-react";

export default function MessagesPage() {
  const { user, loading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) router.push("/login");
  }, [user, loading, router]);

  return (
    <div className="p-6">
      <h1 className="font-serif text-3xl tracking-tight">Messages</h1>
      <p className="mt-2 text-sm text-muted-foreground">Your conversations with hosts and providers.</p>
      <div className="mt-8 rounded-2xl border border-border bg-background p-12 text-center">
        <MessageCircle className="mx-auto h-8 w-8 text-gold" />
        <h2 className="mt-3 font-serif text-lg font-bold">No messages yet</h2>
        <p className="mt-1 text-sm text-muted-foreground">Messages about your bookings will appear here.</p>
      </div>
    </div>
  );
}

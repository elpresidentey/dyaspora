"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/components/auth/auth-context";
import { Bookmark, Plane, Building2, CalendarDays, Trash2 } from "lucide-react";
import Link from "next/link";
import { Card } from "@/components/ui/card";

interface SavedItem {
  id: string;
  itemType: string;
  itemId: string;
  createdAt: string;
}

const suggestions = [
  { icon: Plane, label: "Browse flights", href: "/flights" },
  { icon: Building2, label: "Explore stays", href: "/accommodation" },
  { icon: CalendarDays, label: "Discover events", href: "/events" },
];

const typeLabels: Record<string, string> = {
  flight: "Flight",
  hotel: "Stay",
  event: "Event",
};

const typeIcons: Record<string, typeof Plane> = {
  flight: Plane,
  hotel: Building2,
  event: CalendarDays,
};

const typeHref: Record<string, string> = {
  flight: "/bookings/flight/",
  hotel: "/bookings/hotel/",
  event: "/events/",
};

export default function SavedPage() {
  const { user, loading } = useUser();
  const router = useRouter();
  const [savedItems, setSavedItems] = useState<SavedItem[]>([]);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    if (!loading && !user) router.push("/login");
  }, [user, loading, router]);

  useEffect(() => {
    if (!user) return;
    fetch(`/api/saved?userId=${user.id}`)
      .then((r) => r.json())
      .then((d) => setSavedItems(d.savedItems || []))
      .catch(() => {})
      .finally(() => setFetching(false));
  }, [user]);

  const handleRemove = async (item: SavedItem) => {
    const res = await fetch("/api/saved", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: user!.id, itemType: item.itemType, itemId: item.itemId }),
    });
    if (res.ok) setSavedItems((prev) => prev.filter((s) => s.id !== item.id));
  };

  return (
    <div className="p-6">
      <h1 className="font-serif text-3xl tracking-tight">Saved</h1>
      <p className="mt-2 text-sm text-muted-foreground">Your bookmarked flights, stays, and events.</p>

      {fetching ? (
        <div className="mt-8 text-center text-sm text-muted-foreground">Loading...</div>
      ) : savedItems.length === 0 ? (
        <div className="mt-8 rounded-2xl border border-border bg-background p-12 text-center">
          <Bookmark className="mx-auto h-8 w-8 text-gold" />
          <h2 className="mt-3 font-serif text-lg font-bold">Nothing saved yet</h2>
          <p className="mt-1 text-sm text-muted-foreground">Items you save will appear here for easy access.</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            {suggestions.map(({ icon: Icon, label, href }) => (
              <Link key={href} href={href} className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
                <Icon className="h-3.5 w-3.5 text-gold" />
                {label}
              </Link>
            ))}
          </div>
        </div>
      ) : (
        <div className="mt-6 grid gap-3">
          {savedItems.map((item) => {
            const Icon = typeIcons[item.itemType] || Bookmark;
            const bgColor = item.itemType === "flight" ? "bg-blue-100 text-blue-600" : item.itemType === "hotel" ? "bg-purple-100 text-purple-600" : "bg-orange-100 text-orange-600";
            return (
              <Card key={item.id} className="flex items-center gap-4 p-4">
                <div className={`grid h-10 w-10 place-items-center rounded-lg ${bgColor}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium capitalize">{typeLabels[item.itemType] || item.itemType}</div>
                  <div className="text-xs text-muted-foreground truncate">{item.itemId}</div>
                </div>
                <div className="flex items-center gap-2">
                  <Link href={`${typeHref[item.itemType]}${item.itemId}`} className="text-xs font-medium text-gold hover:underline">View</Link>
                  <button onClick={() => handleRemove(item)} className="rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive">
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}

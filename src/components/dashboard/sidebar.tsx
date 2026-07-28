"use client";

import Link from "next/link";
import { Building2, LayoutDashboard, MessageSquare, Settings, User, Heart, LogOut } from "lucide-react";
import { useUser } from "@/components/auth/auth-context";

const sidebarItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Bookings", href: "/bookings", icon: Building2 },
  { label: "Saved", href: "/saved", icon: Heart },
  { label: "Messages", href: "/messages", icon: MessageSquare },
  { label: "Profile", href: "/profile", icon: User },
  { label: "Settings", href: "/settings", icon: Settings },
];

export function Sidebar() {
  const { user, logout } = useUser();

  return (
    <aside className="hidden w-64 shrink-0 border-r bg-background p-6 lg:flex lg:flex-col">
      <div className="mb-8 flex items-center gap-3">
        <span className="grid h-9 w-9 place-items-center rounded-full bg-brand text-white font-serif font-bold text-sm">D</span>
        <span className="font-serif text-lg font-bold">Dashboard</span>
      </div>
      <nav className="flex-1 space-y-1">
        {sidebarItems.map(({ label, href, icon: Icon }) => (
          <Link key={href} href={href} className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground">
            <Icon className="h-4 w-4 text-gold" />
            {label}
          </Link>
        ))}
      </nav>
      <div className="border-t pt-4">
        {user && (
          <div className="mb-3 px-3 text-xs text-muted-foreground truncate">{user.email}</div>
        )}
        <button onClick={logout} className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive">
          <LogOut className="h-4 w-4" />
          Sign out
        </button>
      </div>
    </aside>
  );
}

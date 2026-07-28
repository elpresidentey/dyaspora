"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/components/auth/auth-context";
import { User, Mail } from "lucide-react";

export default function ProfilePage() {
  const { user, loading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) router.push("/login");
  }, [user, loading, router]);

  if (!user) return null;

  return (
    <div className="p-6">
      <h1 className="font-serif text-3xl tracking-tight">Profile</h1>
      <p className="mt-2 text-sm text-muted-foreground">Your account details.</p>
      <div className="mt-8 max-w-md rounded-2xl border border-border bg-background p-6">
        <div className="grid h-16 w-16 place-items-center rounded-full bg-brand text-xl font-bold text-white font-serif">
          {user.name.charAt(0)}
        </div>
        <div className="mt-5 space-y-4">
          <div className="flex items-center gap-3">
            <User className="h-4 w-4 text-gold" />
            <div>
              <p className="text-xs text-muted-foreground">Name</p>
              <p className="text-sm font-medium text-foreground">{user.name}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Mail className="h-4 w-4 text-gold" />
            <div>
              <p className="text-xs text-muted-foreground">Email</p>
              <p className="text-sm font-medium text-foreground">{user.email}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

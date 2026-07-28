"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/components/auth/auth-context";
import { Bell, Globe, Lock, Moon } from "lucide-react";

const sections = [
  { icon: Bell, title: "Notifications", description: "Manage email and push notification preferences." },
  { icon: Globe, title: "Language & Region", description: "Set your preferred language and currency." },
  { icon: Lock, title: "Security", description: "Password, two-factor authentication, and sessions." },
  { icon: Moon, title: "Appearance", description: "Toggle between light and dark mode." },
];

export default function SettingsPage() {
  const { user, loading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) router.push("/login");
  }, [user, loading, router]);

  return (
    <div className="p-6">
      <h1 className="font-serif text-3xl tracking-tight">Settings</h1>
      <p className="mt-2 text-sm text-muted-foreground">Manage your preferences.</p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {sections.map(({ icon: Icon, title, description }) => (
          <div key={title} className="rounded-2xl border border-border bg-background p-5">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-brand-light text-gold">
              <Icon className="h-4 w-4" />
            </span>
            <h2 className="mt-3 font-medium text-foreground">{title}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

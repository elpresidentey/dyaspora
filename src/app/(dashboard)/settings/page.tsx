"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/components/auth/auth-context";
import { useTheme } from "@/components/theme-provider";
import { Bell, Globe, Lock, Moon, Sun, Check } from "lucide-react";

export default function SettingsPage() {
  const { user, loading } = useUser();
  const { theme, setTheme } = useTheme();
  const router = useRouter();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [pwError, setPwError] = useState("");
  const [pwSuccess, setPwSuccess] = useState("");
  const [pwSaving, setPwSaving] = useState(false);

  useEffect(() => {
    if (!loading && !user) router.push("/login");
  }, [user, loading, router]);

  async function handlePasswordChange(e: React.FormEvent) {
    e.preventDefault();
    setPwError("");
    setPwSuccess("");
    if (newPassword.length < 6) { setPwError("Password must be at least 6 characters"); return; }
    setPwSaving(true);
    try {
      const res = await fetch("/api/auth/me", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to update password");
      setPwSuccess("Password updated");
      setCurrentPassword("");
      setNewPassword("");
    } catch (err) {
      setPwError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setPwSaving(false);
    }
  }

  if (!user) return null;

  return (
    <div className="p-6">
      <h1 className="font-serif text-3xl tracking-tight">Settings</h1>
      <p className="mt-2 text-sm text-muted-foreground">Manage your preferences.</p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-border bg-background p-5">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-brand-light text-gold">
            <Bell className="h-4 w-4" />
          </span>
          <h2 className="mt-3 font-medium text-foreground">Notifications</h2>
          <p className="mt-1 text-sm text-muted-foreground">Manage email and push notification preferences.</p>
        </div>

        <div className="rounded-2xl border border-border bg-background p-5">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-brand-light text-gold">
            <Globe className="h-4 w-4" />
          </span>
          <h2 className="mt-3 font-medium text-foreground">Language & Region</h2>
          <p className="mt-1 text-sm text-muted-foreground">Set your preferred language and currency.</p>
        </div>

        <div className="rounded-2xl border border-border bg-background p-5">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-brand-light text-gold">
            <Lock className="h-4 w-4" />
          </span>
          <h2 className="mt-3 font-medium text-foreground">Security</h2>
          <p className="mt-1 text-sm text-muted-foreground">Update your password.</p>
          <form onSubmit={handlePasswordChange} className="mt-4 space-y-3">
            <input type="password" placeholder="Current password" value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} required className="w-full rounded-lg border bg-secondary/50 px-3 py-2 text-sm focus:border-gold focus:outline-none" />
            <input type="password" placeholder="New password (min. 6 chars)" value={newPassword} onChange={e => setNewPassword(e.target.value)} required minLength={6} className="w-full rounded-lg border bg-secondary/50 px-3 py-2 text-sm focus:border-gold focus:outline-none" />
            {pwError && <p className="text-xs text-destructive">{pwError}</p>}
            {pwSuccess && <p className="flex items-center gap-1 text-xs text-green-600"><Check className="h-3 w-3" /> {pwSuccess}</p>}
            <button type="submit" disabled={pwSaving} className="w-full rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand/90 disabled:opacity-50">
              {pwSaving ? "Updating..." : "Update password"}
            </button>
          </form>
        </div>

        <div className="rounded-2xl border border-border bg-background p-5">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-brand-light text-gold">
            <Moon className="h-4 w-4" />
          </span>
          <h2 className="mt-3 font-medium text-foreground">Appearance</h2>
          <p className="mt-1 text-sm text-muted-foreground">Toggle between light and dark mode.</p>
          <div className="mt-4 flex items-center gap-3">
            <button onClick={() => setTheme("light")} className={`flex flex-1 items-center justify-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-medium transition-all ${theme === "light" ? "border-gold bg-gold/5 text-gold" : "border-border text-muted-foreground hover:bg-muted"}`}>
              <Sun className="h-4 w-4" /> Light
            </button>
            <button onClick={() => setTheme("dark")} className={`flex flex-1 items-center justify-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-medium transition-all ${theme === "dark" ? "border-gold bg-gold/5 text-gold" : "border-border text-muted-foreground hover:bg-muted"}`}>
              <Moon className="h-4 w-4" /> Dark
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

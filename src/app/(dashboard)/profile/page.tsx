"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/components/auth/auth-context";
import { User, Mail, Pencil } from "lucide-react";

export default function ProfilePage() {
  const { user: ctxUser, loading } = useUser();
  const router = useRouter();
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (!loading && !ctxUser) router.push("/login");
  }, [ctxUser, loading, router]);

  useEffect(() => {
    if (ctxUser) { setName(ctxUser.name); setDisplayName(ctxUser.name); }
  }, [ctxUser]);

  if (!ctxUser) return null;

  async function handleSave() {
    setError("");
    setSuccess("");
    if (!name.trim()) { setError("Name is required"); return; }
    setSaving(true);
    try {
      const res = await fetch("/api/auth/me", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim() }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to update");
      setDisplayName(name.trim());
      setSuccess("Profile updated");
      setEditing(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="p-6">
      <h1 className="font-serif text-3xl tracking-tight">Profile</h1>
      <p className="mt-2 text-sm text-muted-foreground">Your account details.</p>
      <div className="mt-8 max-w-md rounded-2xl border border-border bg-background p-6">
        <div className="flex items-start justify-between">
          <div className="grid h-16 w-16 place-items-center rounded-full bg-brand text-xl font-bold text-white font-serif">
            {displayName.charAt(0)}
          </div>
          <button onClick={() => setEditing(!editing)} className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors">
            <Pencil className="h-3 w-3" />
            {editing ? "Cancel" : "Edit"}
          </button>
        </div>
        <div className="mt-5 space-y-4">
          <div className="flex items-center gap-3">
            <User className="h-4 w-4 text-gold" />
            <div className="flex-1">
              <p className="text-xs text-muted-foreground">Name</p>
              {editing ? (
                <input type="text" value={name} onChange={e => setName(e.target.value)} className="mt-0.5 w-full rounded-lg border bg-secondary/50 px-3 py-2 text-sm focus:border-gold focus:outline-none" />
              ) : (
                <p className="text-sm font-medium text-foreground">{displayName}</p>
              )}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Mail className="h-4 w-4 text-gold" />
            <div>
              <p className="text-xs text-muted-foreground">Email</p>
              <p className="text-sm font-medium text-foreground">{ctxUser.email}</p>
            </div>
          </div>
        </div>
        {editing && (
          <div className="mt-5 space-y-2">
            {error && <p className="text-xs text-destructive">{error}</p>}
            {success && <p className="text-xs text-green-600">{success}</p>}
            <button onClick={handleSave} disabled={saving} className="w-full rounded-lg bg-brand px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand/90 disabled:opacity-50">
              {saving ? "Saving..." : "Save changes"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

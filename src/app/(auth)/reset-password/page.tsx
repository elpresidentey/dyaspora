"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";

function ResetForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token") || "";
  const email = searchParams.get("email") || "";

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (password !== confirm) {
      setError("Passwords do not match");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to reset password");
      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  if (!token || !email) {
    return (
      <div className="w-full max-w-sm">
        <div className="mb-10">
          <h1 className="font-serif text-3xl font-bold">Invalid link</h1>
          <p className="mt-2 text-sm text-muted-foreground">This reset link is missing required information.</p>
        </div>
        <Link href="/forgot-password" className="block text-center rounded-lg bg-brand px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand/90">Request a new link</Link>
      </div>
    );
  }

  if (success) {
    return (
      <div className="w-full max-w-sm">
        <div className="mb-10">
          <h1 className="font-serif text-3xl font-bold">Password reset</h1>
          <p className="mt-2 text-sm text-muted-foreground">Your password has been updated successfully.</p>
        </div>
        <Link href="/login" className="block text-center rounded-lg bg-brand px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand/90">Sign in</Link>
      </div>
    );
  }

  return (
    <div className="w-full max-w-sm">
      <div className="mb-10">
        <p className="text-gold text-xs font-medium uppercase tracking-[0.2em] mb-3">Security</p>
        <h1 className="font-serif text-3xl font-bold">Reset password</h1>
        <p className="mt-2 text-sm text-muted-foreground">Choose a new password for your account.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="password" className="block text-xs font-semibold uppercase tracking-[.1em] text-muted-foreground mb-1.5">New password</label>
          <input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Min. 6 characters" required minLength={6} className="w-full rounded-lg border bg-secondary/50 px-4 py-3 text-sm focus:border-gold focus:outline-none" />
        </div>
        <div>
          <label htmlFor="confirm" className="block text-xs font-semibold uppercase tracking-[.1em] text-muted-foreground mb-1.5">Confirm password</label>
          <input id="confirm" type="password" value={confirm} onChange={e => setConfirm(e.target.value)} placeholder="Repeat your password" required className="w-full rounded-lg border bg-secondary/50 px-4 py-3 text-sm focus:border-gold focus:outline-none" />
        </div>
        {error && <p className="text-xs text-destructive">{error}</p>}
        <button type="submit" className="w-full rounded-lg bg-brand px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand/90">Reset password</button>
      </form>

      <p className="mt-8 text-center text-sm text-muted-foreground">
        <Link href="/login" className="font-medium text-brand hover:text-brand/80 underline underline-offset-4">Back to sign in</Link>
      </p>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={
      <div className="w-full max-w-sm text-center text-muted-foreground">Loading...</div>
    }>
      <ResetForm />
    </Suspense>
  );
}

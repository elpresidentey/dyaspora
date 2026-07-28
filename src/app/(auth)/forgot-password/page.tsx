"use client";

import { useState } from "react";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong");
      setSent(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  return (
    <div className="w-full max-w-sm">
      <div className="mb-10">
        <p className="text-gold text-xs font-medium uppercase tracking-[0.2em] mb-3">Help</p>
        <h1 className="font-serif text-3xl font-bold">Forgot password</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {sent ? "Check your email for a reset link." : "Enter your email and we&apos;ll send you a reset link."}
        </p>
      </div>

      {!sent ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-[.1em] text-muted-foreground mb-1.5">Email</label>
            <input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" required className="w-full rounded-lg border bg-secondary/50 px-4 py-3 text-sm focus:border-gold focus:outline-none" />
          </div>
          {error && <p className="text-xs text-destructive">{error}</p>}
          <button type="submit" className="w-full rounded-lg bg-brand px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand/90">Send reset link</button>
        </form>
      ) : (
        <div className="rounded-lg bg-brand-light px-4 py-6 text-center">
          <p className="text-sm text-brand">Email sent! Check your inbox (and spam folder).</p>
        </div>
      )}

      <p className="mt-8 text-center text-sm text-muted-foreground">
        Remember your password?{" "}
        <Link href="/login" className="font-medium text-brand hover:text-brand/80 underline underline-offset-4">Sign in</Link>
      </p>
    </div>
  );
}

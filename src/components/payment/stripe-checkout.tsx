"use client";

import { useEffect, useState } from "react";
import { loadStripe, type StripeElementsOptions } from "@stripe/stripe-js";
import { Elements, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

const stripeKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? "";

function CheckoutForm({ total, onSuccess }: { total: number; onSuccess: () => void }) {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    setError(null);

    const { error: submitError } = await stripe.confirmPayment({
      elements,
      confirmParams: { return_url: window.location.origin + "/bookings/confirmation" },
      redirect: "if_required",
    });

    if (submitError) {
      setError(submitError.message ?? "Payment failed");
      setLoading(false);
    } else {
      onSuccess();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <PaymentElement />
      {error && <p className="text-sm text-red-600">{error}</p>}
      <div className="pt-4 border-t">
        <div className="flex items-center justify-between mb-4">
          <span className="text-muted-foreground">Total to pay</span>
          <span className="text-2xl font-bold text-gold">${total}</span>
        </div>
      </div>
      <Button type="submit" className="w-full bg-gold hover:bg-gold/90 text-white h-12" disabled={!stripe || loading}>
        {loading ? "Processing..." : `Pay $${total}`}
      </Button>
    </form>
  );
}

export function StripeCheckout({ bookingId, amount, onSuccess }: { bookingId: string; amount: number; onSuccess: () => void }) {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [stripeError, setStripeError] = useState<string | null>(
    !stripeKey ? "Stripe is not configured. Add NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY to .env.local" : null
  );
  const [stripePromise, setStripePromise] = useState<ReturnType<typeof loadStripe> | null>(null);

  useEffect(() => {
    if (!stripeKey) return;
    loadStripe(stripeKey).then((s) => {
      if (s) setStripePromise(Promise.resolve(s));
      else setStripeError("Failed to initialize Stripe. Check your publishable key.");
    }).catch(() => setStripeError("Failed to load Stripe.js."));
  }, []);

  useEffect(() => {
    fetch("/api/stripe/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount, bookingId, currency: "usd" }),
    })
      .then((r) => r.json())
      .then((data) => setClientSecret(data.clientSecret))
      .catch(() => {});
  }, [amount, bookingId]);

  if (stripeError) {
    return (
      <div className="rounded-lg border border-destructive/20 bg-destructive/5 p-4 text-center">
        <AlertCircle className="mx-auto mb-2 h-5 w-5 text-destructive" />
        <p className="text-sm text-destructive">{stripeError}</p>
      </div>
    );
  }

  if (!stripePromise) {
    return (
      <div className="rounded-lg bg-muted p-4 text-center text-sm text-muted-foreground">
        Loading payment...
      </div>
    );
  }

  if (!clientSecret) {
    return (
      <div className="rounded-lg bg-muted p-4 text-center text-sm text-muted-foreground">
        Initializing payment...
      </div>
    );
  }

  const options: StripeElementsOptions = {
    clientSecret,
    appearance: {
      theme: "stripe",
      variables: { colorPrimary: "#a8854a", borderRadius: "8px" },
    },
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      <CheckoutForm total={amount} onSuccess={onSuccess} />
    </Elements>
  );
}

import Link from "next/link";

export default function ForgotPasswordPage() {
  return (
    <div className="w-full max-w-sm">
      <div className="mb-10">
        <p className="text-gold text-xs font-medium uppercase tracking-[0.2em] mb-3">
          Help
        </p>
        <h1 className="font-serif text-3xl font-bold">Forgot password</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Enter your email and we&apos;ll send you a reset link.
        </p>
      </div>
      <p className="mt-8 text-center text-sm text-muted-foreground">
        Remember your password?{" "}
        <Link href="/login" className="font-medium text-brand hover:text-brand/80 underline underline-offset-4">
          Sign in
        </Link>
      </p>
    </div>
  );
}

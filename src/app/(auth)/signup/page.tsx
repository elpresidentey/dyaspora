import { SignupForm } from "@/features/auth/signup-form";
import Link from "next/link";

export default function SignupPage() {
  return (
    <div className="w-full max-w-sm">
      <div className="mb-10">
        <p className="text-gold text-xs font-medium uppercase tracking-[0.2em] mb-3">
          Get started
        </p>
        <h1 className="font-serif text-3xl font-bold">Create an account</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Start your Dyaspora journey.
        </p>
      </div>
      <SignupForm />
      <p className="mt-8 text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link href="/login" className="font-medium text-brand hover:text-brand/80 underline underline-offset-4">
          Sign in
        </Link>
      </p>
    </div>
  );
}

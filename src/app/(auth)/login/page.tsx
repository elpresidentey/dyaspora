import { LoginForm } from "@/features/auth/login-form";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="w-full max-w-sm">
      <div className="mb-10">
        <h1 className="font-serif text-3xl font-bold">Sign in</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Enter your email and password to continue.
        </p>
      </div>
      <LoginForm />
      <p className="mt-8 text-center text-sm text-muted-foreground">
        Don&apos;t have an account?{" "}
        <Link href="/signup" className="font-medium text-brand hover:text-brand/80 underline underline-offset-4">
          Sign up
        </Link>
      </p>
    </div>
  );
}

"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/shared/Button";
import type { AccountType } from "@/db/schema";

type SignUpFormProps = {
  defaultType?: AccountType | null;
};

export function SignUpForm({ defaultType = null }: SignUpFormProps) {
  const router = useRouter();
  const [accountType, setAccountType] = useState<AccountType | null>(
    defaultType,
  );
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  if (!accountType) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="font-display text-3xl font-bold text-ink">
            Join as…
          </h1>
          <p className="mt-2 text-ink/70">
            Pick how you&apos;ll use the site. You can&apos;t switch later
            without a new account.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <button
            type="button"
            onClick={() => setAccountType("candidate")}
            className="rounded-2xl border border-ink/15 bg-card-white p-6 text-left shadow-card transition hover:-translate-y-0.5 hover:border-signal-orange hover:shadow-lift"
          >
            <p className="font-display text-xl font-bold">I&apos;m looking for work</p>
            <p className="mt-2 text-sm text-ink/65">
              Build a profile employers can browse and message.
            </p>
          </button>
          <button
            type="button"
            onClick={() => setAccountType("employer")}
            className="rounded-2xl border border-ink/15 bg-card-white p-6 text-left shadow-card transition hover:-translate-y-0.5 hover:border-steel-blue hover:shadow-lift"
          >
            <p className="font-display text-xl font-bold">I&apos;m hiring</p>
            <p className="mt-2 text-sm text-ink/65">
              Search young tradespeople and reach out directly.
            </p>
          </button>
        </div>
      </div>
    );
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!accountType) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, accountType }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data.error ?? "Could not create account");
      }

      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      if (result?.error) {
        throw new Error("Account created, but sign-in failed. Try signing in.");
      }

      router.push(
        accountType === "candidate"
          ? "/candidate/onboarding"
          : "/employer/onboarding",
      );
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div>
        <button
          type="button"
          className="text-sm font-medium text-steel-blue hover:underline"
          onClick={() => setAccountType(null)}
        >
          ← Change account type
        </button>
        <h1 className="mt-2 font-display text-3xl font-bold text-ink">
          {accountType === "candidate"
            ? "Create your candidate account"
            : "Create your employer account"}
        </h1>
        <p className="mt-2 text-ink/70">
          Already have an account?{" "}
          <Link href="/sign-in" className="font-medium text-steel-blue hover:underline">
            Sign in
          </Link>
        </p>
      </div>

      <label className="block space-y-1.5">
        <span className="text-sm font-medium">Email</span>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={inputClass}
        />
      </label>

      <label className="block space-y-1.5">
        <span className="text-sm font-medium">Password</span>
        <input
          type="password"
          required
          minLength={8}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={inputClass}
        />
        <span className="text-xs text-ink/50">At least 8 characters.</span>
      </label>

      {error ? <p className="text-sm text-signal-orange">{error}</p> : null}

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Creating account…" : "Create account"}
      </Button>

      <div className="relative py-2 text-center text-xs uppercase tracking-wide text-ink/40">
        <span className="relative z-10 bg-workshop-white px-2">or</span>
        <span className="absolute inset-x-0 top-1/2 h-px bg-ink/10" />
      </div>

      <Button
        type="button"
        variant="outline"
        className="w-full"
        onClick={() =>
          signIn("google", {
            callbackUrl:
              accountType === "candidate"
                ? "/candidate/onboarding"
                : "/employer/onboarding",
          })
        }
      >
        Continue with Google
      </Button>
      <p className="text-xs text-ink/50">
        Google sign-up still needs an account type. We&apos;ll finish wiring
        that once OAuth credentials are set.
      </p>
    </form>
  );
}

export function SignInForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      if (result?.error) {
        throw new Error("Wrong email or password");
      }
      router.push("/after-login");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div>
        <h1 className="font-display text-3xl font-bold text-ink">Sign in</h1>
        <p className="mt-2 text-ink/70">
          New here?{" "}
          <Link href="/sign-up" className="font-medium text-steel-blue hover:underline">
            Create an account
          </Link>
        </p>
      </div>

      <label className="block space-y-1.5">
        <span className="text-sm font-medium">Email</span>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={inputClass}
        />
      </label>

      <label className="block space-y-1.5">
        <span className="text-sm font-medium">Password</span>
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={inputClass}
        />
      </label>

      {error ? <p className="text-sm text-signal-orange">{error}</p> : null}

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Signing in…" : "Sign in"}
      </Button>

      <Button
        type="button"
        variant="outline"
        className="w-full"
        onClick={() => signIn("google", { callbackUrl: "/after-login" })}
      >
        Continue with Google
      </Button>
    </form>
  );
}

const inputClass =
  "w-full rounded-md border border-ink/15 bg-card-white px-3 py-2.5 text-sm outline-none focus:border-steel-blue";

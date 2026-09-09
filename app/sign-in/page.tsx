import { SignInForm } from "@/components/shared/AuthForms";
import { isDemoMode } from "@/lib/demo-data";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign in",
};

export const dynamic = "force-dynamic";

export default function SignInPage() {
  return (
    <div className="mx-auto max-w-lg px-4 py-12 sm:px-6">
      <SignInForm showDemoHints={isDemoMode()} />
    </div>
  );
}

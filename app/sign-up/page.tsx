import { SignUpForm } from "@/components/shared/AuthForms";
import type { AccountType } from "@/db/schema";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign up",
};

export default function SignUpPage({
  searchParams,
}: {
  searchParams: { type?: string };
}) {
  const typeParam = searchParams.type;
  const defaultType: AccountType | null =
    typeParam === "candidate" || typeParam === "employer" ? typeParam : null;

  return (
    <div className="mx-auto max-w-lg px-4 py-12 sm:px-6">
      <SignUpForm defaultType={defaultType} />
    </div>
  );
}

import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";

export default async function AfterLoginPage() {
  const session = await getSession();
  if (!session?.user) {
    redirect("/sign-in");
  }

  if (session.user.accountType === "employer") {
    redirect("/employer/dashboard");
  }

  redirect("/candidate/dashboard");
}

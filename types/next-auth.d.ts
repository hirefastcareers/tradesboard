import type { DefaultSession } from "next-auth";
import type { AccountType } from "@/db/schema";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      accountType: AccountType;
    } & DefaultSession["user"];
  }

  interface User {
    accountType?: AccountType;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    accountType?: AccountType;
  }
}

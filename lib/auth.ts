import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { compare } from "bcryptjs";
import { eq } from "drizzle-orm";
import { getDb, hasDatabase } from "@/db";
import { users } from "@/db/schema";
import type { AccountType } from "@/db/schema";

const providers: NextAuthOptions["providers"] = [
  CredentialsProvider({
    name: "Email and password",
    credentials: {
      email: { label: "Email", type: "email" },
      password: { label: "Password", type: "password" },
    },
    async authorize(credentials) {
      if (!credentials?.email || !credentials.password) {
        return null;
      }
      if (!hasDatabase()) {
        throw new Error("Database is not configured");
      }

      const db = getDb();
      const [user] = await db
        .select()
        .from(users)
        .where(eq(users.email, credentials.email.toLowerCase()))
        .limit(1);

      if (!user?.passwordHash) {
        return null;
      }

      const valid = await compare(credentials.password, user.passwordHash);
      if (!valid) {
        return null;
      }

      return {
        id: user.id,
        email: user.email,
        accountType: user.accountType,
      };
    },
  }),
];

if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  providers.push(
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),
  );
}

export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt" },
  pages: {
    signIn: "/sign-in",
    newUser: "/sign-up",
  },
  providers,
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider !== "google") return true;
      if (!hasDatabase() || !user.email) return false;

      const db = getDb();
      const [existing] = await db
        .select()
        .from(users)
        .where(eq(users.email, user.email.toLowerCase()))
        .limit(1);

      // New Google users must pick an account type via /sign-up first
      if (!existing) {
        return "/sign-up?oauth=google&email=" + encodeURIComponent(user.email);
      }

      user.id = existing.id;
      (user as { accountType?: AccountType }).accountType =
        existing.accountType;
      return true;
    },
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id;
        token.accountType =
          (user as { accountType?: AccountType }).accountType ??
          (token.accountType as AccountType | undefined);
      }

      if (trigger === "update" && session?.accountType) {
        token.accountType = session.accountType as AccountType;
      }

      // Refresh accountType from DB when missing (e.g. Google returning users)
      if (!token.accountType && token.email && hasDatabase()) {
        const db = getDb();
        const [row] = await db
          .select({
            id: users.id,
            accountType: users.accountType,
          })
          .from(users)
          .where(eq(users.email, String(token.email).toLowerCase()))
          .limit(1);
        if (row) {
          token.id = row.id;
          token.accountType = row.accountType;
        }
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.accountType = token.accountType as AccountType;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

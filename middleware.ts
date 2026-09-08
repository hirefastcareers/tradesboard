import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const accountType = req.nextauth.token?.accountType as
      | "candidate"
      | "employer"
      | undefined;
    const path = req.nextUrl.pathname;

    if (
      path.startsWith("/candidate/dashboard") ||
      path.startsWith("/candidate/onboarding")
    ) {
      if (accountType === "employer") {
        return NextResponse.redirect(new URL("/employer/dashboard", req.url));
      }
    }

    if (path.startsWith("/employer") && accountType === "candidate") {
      return NextResponse.redirect(new URL("/candidate/dashboard", req.url));
    }

    if ((path === "/sign-in" || path === "/sign-up") && accountType) {
      return NextResponse.redirect(
        new URL(
          accountType === "employer"
            ? "/employer/dashboard"
            : "/candidate/dashboard",
          req.url,
        ),
      );
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const path = req.nextUrl.pathname;

        if (path === "/sign-in" || path === "/sign-up") {
          return true;
        }

        // Public candidate profiles: /candidate/<uuid-or-slug>
        if (
          /^\/candidate\/[^/]+$/.test(path) &&
          path !== "/candidate/dashboard" &&
          path !== "/candidate/onboarding"
        ) {
          return true;
        }

        return !!token;
      },
    },
  },
);

export const config = {
  matcher: [
    "/candidate/:path*",
    "/employer/:path*",
    "/messages/:path*",
    "/after-login",
    "/sign-in",
    "/sign-up",
  ],
};

import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  async function middleware(req) {
    const { token } = req.nextauth;
    // console.log("Token:", token);
    // console.log("Pathname:", req.nextUrl.pathname);
    // console.log(token)

    if (token) {
      if (typeof token.role === "string") {
        if (
          token.role === "DOCTOR" &&
          req.nextUrl.pathname.startsWith("/patients")
        ) {
          return NextResponse.redirect(new URL("/dashboard", req.url));
        } else if (
          token.role === "PATIENT" &&
          req.nextUrl.pathname.startsWith("/dashboard")
        ) {
          return NextResponse.redirect(
            new URL(
              `/patients/${token.id}/profile#informations-personnelles`,
              req.url
            )
          );
        } else if (!["DOCTOR", "PATIENT"].includes(token.role)) {
          return NextResponse.redirect(new URL("/", req.url));
        }
      } else {
        return NextResponse.redirect(new URL("/", req.url));
      }
    } else {
      if (
        req.nextUrl.pathname !== "/" &&
        req.nextUrl.pathname !== "/register"
      ) {
        return NextResponse.redirect(new URL("/", req.url));
      }
    }
  },
  {
    pages: {
      signIn: "/",
      signOut: "/",
      error: "/",
      newUser: "/register",
    },
  }
);

export const config = {
  matcher: ["/patients/:path*", "/dashboard/:path*"],
};

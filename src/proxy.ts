// middleware.ts
import { NextRequest, NextResponse } from "next/server";
import { userService } from "./app/services/user.service";
import { Roles } from "./constants/role";


const publicPaths = ["/", "/public", "/login"];
const privatePaths = ["/private"];

export async function proxy(request: NextRequest) {
  const pathName = request.nextUrl.pathname;
  const isPrivatePath = privatePaths.some(
    (path) => pathName === path || pathName.startsWith(path + "/"),
  );

  if (isPrivatePath) {
    const token =
      request.cookies.get("__Secure-session_token")?.value ??
      request.cookies.get("session_token")?.value;

    if (!token) {
      return NextResponse.redirect(
        new URL(`/login?redirect=${encodeURIComponent(pathName)}`, request.url),
      );
    }
  }

  const { data } = await userService.getSession();


  

  if (!data || !data.user) {
    return NextResponse.redirect(
      new URL(`/login?redirect=${encodeURIComponent(pathName)}`, request.url),
    );
  }

  const userRole = data.user.role;

  if (pathName.startsWith("/admin") && userRole !== Roles.admin) {
    return NextResponse.redirect(new URL(`/unauthorized`, request.url));
  }

  // Provider profile page
  if (pathName.startsWith("/provider") && userRole !== Roles.provider) {
    return NextResponse.redirect(new URL(`/unauthorized`, request.url));
  }

  // Customer profile page
  if (
    (pathName.startsWith("/dashboard") ||
      pathName.startsWith("/profile") ||
      pathName.startsWith("/orders") ||
      pathName.startsWith("/reviews") ||
      (pathName.startsWith("/meals/") && pathName.endsWith("/checkout"))) &&
    userRole !== Roles.customer
  ) {
    return NextResponse.redirect(new URL(`/unauthorized`, request.url));
  }

  

  // ✅ Authorized → continue
  return NextResponse.next();
}

// Middleware paths
export const config = {
  matcher: [
    "/admin",
    "/admin/:path*",
    "/provider",
    "/provider/:path*",
    "/dashboard",
    "/dashboard/:path*",
    "/profile",
    "/profile/:path*",
    "/orders",
    "/reviews",
    "/meals/:id/checkout",
  ],
};

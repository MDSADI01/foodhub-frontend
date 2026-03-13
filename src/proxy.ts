import { NextRequest, NextResponse } from "next/server";
import { userService } from "./app/services/user.service";
import { Roles } from "./constants/role";

export async function proxy(request: NextRequest) {

    const pathName = request.nextUrl.pathname;

  let isAuthenticated = false;
  let isAdmin = false;

  const { data } = await userService.getSession();

  if (!data) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const userRole = data.user.role;

  if (pathName === "/adminProfile" && userRole !== Roles.admin) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (pathName === "/providerProfile" && userRole !== Roles.provider) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (pathName === "/customerProfile" && userRole !== Roles.customer) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

 
  return NextResponse.next();
}


export const config = {
  matcher: ["/customerProfile",
    "/customerProfile/:path*",
    "/providerProfile",
    "/providerProfile/:path*",
    "/adminProfile",
    "/adminProfile/:path*"
],
};

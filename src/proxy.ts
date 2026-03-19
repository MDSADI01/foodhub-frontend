import { NextRequest, NextResponse } from "next/server";
import { userService } from "./app/services/user.service";
import { Roles } from "./constants/role";

export async function proxy(request: NextRequest) {

    const pathName = request.nextUrl.pathname;

 

  const { data } = await userService.getSession();

  if (!data) {
    return NextResponse.redirect(new URL(`/login?redirect=${encodeURIComponent(pathName)}`, request.url));
  }

  const userRole = data.user.role;

  if (pathName === "/adminProfile" && userRole !== Roles.admin) {
    return NextResponse.redirect(new URL(`/login?redirect=${encodeURIComponent(pathName)}`, request.url));
  }

  if (pathName === "/providerProfile" && userRole !== Roles.provider) {
    return NextResponse.redirect(new URL(`/login?redirect=${encodeURIComponent(pathName)}`, request.url));
  }

  if (pathName === "/customerProfile" && userRole !== Roles.customer) {
    return NextResponse.redirect(new URL(`/login?redirect=${encodeURIComponent(pathName)}`, request.url));
  }

  if (pathName.startsWith("/meals/") && pathName.endsWith("/checkout")) {
    if (userRole !== Roles.customer) {
      return NextResponse.redirect(new URL(`/login?redirect=${encodeURIComponent(pathName)}`, request.url));
    }
  }

 
  return NextResponse.next();
}


export const config = {
  matcher: ["/customerProfile",
    "/customerProfile/:path*",
    "/providerProfile",
    "/providerProfile/:path*",
    "/adminProfile",
    "/adminProfile/:path*",
    "/meals/:id/checkout"
],
};

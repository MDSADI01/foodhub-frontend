// /app/api/session/route.ts
import { NextRequest, NextResponse } from "next/server";
import { userService } from "@/app/services/user.service";

export async function GET(req: NextRequest) {
  const { data, error } = await userService.getSession();
  return NextResponse.json({ data, error });
}
import { NextResponse } from "next/server";
import { adminCookieOptions, COOKIE_NAME } from "@/lib/admin/auth";

export const runtime = "nodejs";

export async function POST() {
  const response = NextResponse.json({ ok: true });
  response.cookies.set(COOKIE_NAME, "", { ...adminCookieOptions(), maxAge: 0 });
  return response;
}

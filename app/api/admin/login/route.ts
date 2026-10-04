import { NextResponse } from "next/server";
import { adminCookieOptions, COOKIE_NAME, createAdminSession, isAdminConfigured, verifyAdminPassword } from "@/lib/admin/auth";

export const runtime = "nodejs";

export async function POST(request: Request) {
  if (!isAdminConfigured()) {
    return NextResponse.json({ error: "Admin authentication is not configured." }, { status: 503 });
  }

  const body = await request.json().catch(() => ({})) as { password?: unknown };
  if (typeof body.password !== "string" || !verifyAdminPassword(body.password)) {
    return NextResponse.json({ error: "Incorrect password." }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(COOKIE_NAME, createAdminSession(), adminCookieOptions());
  return response;
}

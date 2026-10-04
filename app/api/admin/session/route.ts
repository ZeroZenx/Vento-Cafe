import { NextResponse } from "next/server";
import { hasAdminSession, isAdminConfigured } from "@/lib/admin/auth";

export const runtime = "nodejs";

export async function GET() {
  return NextResponse.json({ authenticated: await hasAdminSession(), configured: isAdminConfigured() });
}

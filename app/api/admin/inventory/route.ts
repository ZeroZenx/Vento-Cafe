import { NextResponse } from "next/server";
import { hasAdminSession } from "@/lib/admin/auth";
import { getInventoryData } from "@/lib/inventory/store";

export const runtime = "nodejs";

export async function GET() {
  if (!(await hasAdminSession())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    return NextResponse.json(await getInventoryData());
  } catch (error) {
    const message = error instanceof Error ? error.message : "Inventory service unavailable";
    return NextResponse.json({ error: message }, { status: 503 });
  }
}

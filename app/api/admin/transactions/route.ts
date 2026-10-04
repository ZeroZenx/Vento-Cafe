import { NextResponse } from "next/server";
import { hasAdminSession } from "@/lib/admin/auth";
import { recordTransaction } from "@/lib/inventory/store";
import type { InventoryTransactionType } from "@/lib/inventory/types";

export const runtime = "nodejs";

export async function POST(request: Request) {
  if (!(await hasAdminSession())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const body = await request.json() as Record<string, unknown>;
    const type = String(body.type || "sale") as InventoryTransactionType;
    if (!["sale", "restock", "adjustment"].includes(type)) throw new Error("Invalid transaction type");
    const productId = String(body.productId || "");
    const quantity = Number(body.quantity);
    if (!productId || !Number.isInteger(quantity)) throw new Error("Product and whole-number quantity are required");
    const transaction = await recordTransaction({ productId, type, quantity, note: String(body.note || "").trim() });
    return NextResponse.json({ transaction }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to record inventory transaction";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

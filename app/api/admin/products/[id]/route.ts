import { NextResponse } from "next/server";
import { hasAdminSession } from "@/lib/admin/auth";
import { archiveProduct, updateProduct } from "@/lib/inventory/store";
import type { ProductCategory } from "@/data/products";
import type { UpsertInventoryProductInput } from "@/lib/inventory/types";

export const runtime = "nodejs";

const categories: ProductCategory[] = ["coffee", "hair", "body", "lotions", "household"];

function cents(value: unknown, nullable = true): number | null {
  if (value === null && nullable) return null;
  const parsed = typeof value === "number" ? value : Number(value);
  if (!Number.isInteger(parsed) || parsed < 0) throw new Error("Money fields must use non-negative integer cents");
  return parsed;
}

function wholeNumber(value: unknown, fallback = 0): number {
  const parsed = value === undefined ? fallback : Number(value);
  if (!Number.isInteger(parsed) || parsed < 0) throw new Error("Quantity fields must use whole numbers");
  return parsed;
}

function parseInput(body: Record<string, unknown>): UpsertInventoryProductInput {
  const category = String(body.category || "household") as ProductCategory;
  if (!categories.includes(category)) throw new Error("Invalid product category");
  const nameEs = String(body.nameEs || "").trim();
  const nameEn = String(body.nameEn || "").trim();
  if (!nameEs || !nameEn) throw new Error("Spanish and English product names are required");
  return {
    nameEs,
    nameEn,
    category,
    image: String(body.image || "").trim(),
    descriptionEs: String(body.descriptionEs || "").trim(),
    descriptionEn: String(body.descriptionEn || "").trim(),
    stock: wholeNumber(body.stock),
    lowStockThreshold: wholeNumber(body.lowStockThreshold, 2),
    costTtdCents: cents(body.costTtdCents),
    vatRateBps: wholeNumber(body.vatRateBps, 1200),
    exchangeRate: Number(body.exchangeRate || 6.8),
    shippingUsdCents: cents(body.shippingUsdCents, false) || 0,
    inlandShippingUsdCents: cents(body.inlandShippingUsdCents, false) || 0,
    roundProductCostUp: body.roundProductCostUp !== false,
    salePriceUsdCents: cents(body.salePriceUsdCents),
    publicVisible: body.publicVisible !== false
  };
}

export async function PATCH(request: Request, context: { params: Promise<{ id: string }> }) {
  if (!(await hasAdminSession())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const { id } = await context.params;
    const body = await request.json() as Record<string, unknown>;
    return NextResponse.json({ product: await updateProduct(id, parseInput(body)) });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to update product";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

export async function DELETE(_request: Request, context: { params: Promise<{ id: string }> }) {
  if (!(await hasAdminSession())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const { id } = await context.params;
    await archiveProduct(id);
    return NextResponse.json({ ok: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to archive product";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

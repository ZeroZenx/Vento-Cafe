import { calculateProductCost } from "./costing";
import type { InventoryProduct, InventoryTransaction } from "./types";

export type OpeningEntry = { product: InventoryProduct; transaction: InventoryTransaction };

export function validateOpeningEntries(value: unknown): OpeningEntry[] {
  if (!Array.isArray(value) || !value.length || value.length > 200) throw new Error("Invalid opening stock entries");
  const ids = new Set<string>();
  return value.map((entry: OpeningEntry) => {
    const p = entry.product;
    const t = entry.transaction;
    if (!p || !t || !/^[a-z0-9-]+$/.test(p.id) || ids.has(p.id)) throw new Error("Invalid or duplicate product ID");
    ids.add(p.id);
    if (!t.id.startsWith("opening-") || !/^[a-z0-9-]+$/.test(t.id) || t.productId !== p.id) throw new Error("Invalid import reference");
    if (!["coffee", "hair", "body", "lotions", "household"].includes(p.category)) throw new Error("Invalid category");
    if (![p.nameEs, p.nameEn, p.image].every(v => typeof v === "string" && v.length > 0 && v.length < 1000)) throw new Error("Product names and image required");
    if ((!p.image.startsWith("/products/") && !p.image.startsWith("/brand/")) || p.image.includes("..")) throw new Error("Local catalog image required");
    const costUnits = p.costUnits ?? 1;
    if (!Number.isSafeInteger(costUnits) || costUnits < 1) throw new Error("Invalid supplier pack quantity");
    for (const n of [p.stock, p.costTtdCents, p.vatRateBps, p.shippingUsdCents, p.salePriceUsdCents, p.lowStockThreshold]) {
      if (!Number.isSafeInteger(n) || n === null || n < 0) throw new Error("Invalid quantity or cost");
    }
    if (p.stock < 1 || !Number.isFinite(p.inlandShippingUsdCents) || p.inlandShippingUsdCents < 0) throw new Error("Invalid opening stock or transport cost");
    if (typeof p.roundProductCostUp !== "boolean" || typeof p.publicVisible !== "boolean") throw new Error("Invalid product flags");
    const unitCost = calculateProductCost(p).landedCostUsdCents;
    const timestamp = new Date().toISOString();
    return {
      product: { ...p, costUnits, active: true, createdAt: timestamp, updatedAt: timestamp },
      transaction: {
        id: t.id, productId: p.id, productName: p.nameEn, type: "restock", quantity: p.stock,
        unitCostUsdCents: unitCost, unitPriceUsdCents: null,
        totalCostUsdCents: unitCost === null ? null : Math.round(unitCost * p.stock),
        totalRevenueUsdCents: null, profitUsdCents: null,
        note: String(t.note || "Opening stock import").slice(0, 1000), createdAt: timestamp
      }
    };
  });
}

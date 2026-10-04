import type { InventoryProduct, InventoryTransaction } from "./types";
import type { OpeningEntry } from "./opening-stock";

export function validateOpeningCostCorrection(product: InventoryProduct, transactions: InventoryTransaction[], entry: OpeningEntry) {
  const opening = transactions.find(transaction => transaction.id === entry.transaction.id);
  if (!opening || opening.type !== "restock" || opening.quantity !== entry.product.stock) throw new Error("Opening shipment reference or quantity mismatch");
  if (transactions.length !== 1 || product.stock !== opening.quantity) throw new Error("Sales or other stock activity prevent opening cost correction");
  for (const field of ["costTtdCents", "vatRateBps", "exchangeRate", "roundProductCostUp", "salePriceUsdCents"] as const) {
    if (product[field] !== entry.product[field]) throw new Error("Supplier or retail figures differ from the source: " + field);
  }
  if ((product.costUnits ?? 1) !== (entry.product.costUnits ?? 1)) throw new Error("Supplier pack quantity differs from the source");
  return opening;
}

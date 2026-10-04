import type { InventoryProduct } from "@/lib/inventory/types";

type CostInputs = Pick<InventoryProduct, "costTtdCents" | "vatRateBps" | "exchangeRate" | "roundProductCostUp" | "shippingUsdCents" | "inlandShippingUsdCents">;

export function calculateProductCost(product: CostInputs) {
  if (product.costTtdCents === null) {
    return { costWithVatTtdCents: null, exactProductCostUsdCents: null, roundedProductCostUsdCents: null, landedCostUsdCents: null };
  }
  if (!Number.isFinite(product.exchangeRate) || product.exchangeRate <= 0) {
    throw new Error("Exchange rate must be positive");
  }
  // Retain shared transport fractions until the shipment or sale total is rounded.
  const costWithVatTtdCents = product.costTtdCents * (10000 + product.vatRateBps) / 10000;
  const exactProductCostUsdCents = costWithVatTtdCents / product.exchangeRate;
  const roundedProductCostUsdCents = product.roundProductCostUp
    ? Math.ceil(exactProductCostUsdCents / 100) * 100
    : exactProductCostUsdCents;
  const landedCostUsdCents = roundedProductCostUsdCents + product.shippingUsdCents + product.inlandShippingUsdCents;
  return { costWithVatTtdCents, exactProductCostUsdCents, roundedProductCostUsdCents, landedCostUsdCents };
}

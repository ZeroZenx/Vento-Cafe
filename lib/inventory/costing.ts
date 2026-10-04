import type { InventoryProduct } from "@/lib/inventory/types";

type CostInputs = Pick<InventoryProduct, "costTtdCents" | "costUnits" | "vatRateBps" | "exchangeRate" | "roundProductCostUp" | "shippingUsdCents" | "inlandShippingUsdCents">;

export function calculateProductCost(product: CostInputs) {
  if (product.costTtdCents === null) {
    return { costWithVatTtdCents: null, exactProductCostUsdCents: null, roundedProductCostUsdCents: null, landedCostUsdCents: null };
  }
  if (!Number.isFinite(product.exchangeRate) || product.exchangeRate <= 0) {
    throw new Error("Exchange rate must be positive");
  }
  const costUnits = product.costUnits ?? 1;
  if (!Number.isSafeInteger(costUnits) || costUnits < 1) throw new Error("Supplier pack quantity must be a positive whole number");
  // Retain shared transport fractions until the shipment or sale total is rounded.
  const costWithVatTtdCents = product.costTtdCents * (10000 + product.vatRateBps) / 10000 / costUnits;
  const exactProductCostUsdCents = costWithVatTtdCents / product.exchangeRate;
  const roundedProductCostUsdCents = product.roundProductCostUp
    ? Math.ceil(exactProductCostUsdCents / 100) * 100
    : exactProductCostUsdCents;
  const landedCostUsdCents = roundedProductCostUsdCents + product.shippingUsdCents + product.inlandShippingUsdCents;
  return { costWithVatTtdCents, exactProductCostUsdCents, roundedProductCostUsdCents, landedCostUsdCents };
}

export function calculateInventoryValuation(products: InventoryProduct[]) {
  let supplier = 0;
  let wholesale = 0;
  let vat = 0;
  let international = 0;
  let inland = 0;
  let allowance = 0;
  let unpricedUnits = 0;
  let potentialRevenue = 0;
  let potentialCost = 0;
  let forecastUnits = 0;
  let unpricedRetailUnits = 0;
  for (const product of products) {
    if (!product.active) continue;
    if (product.salePriceUsdCents === null) unpricedRetailUnits += product.stock;
    const cost = calculateProductCost(product);
    if (cost.exactProductCostUsdCents === null || cost.roundedProductCostUsdCents === null) {
      unpricedUnits += product.stock;
      continue;
    }
    supplier += cost.exactProductCostUsdCents * product.stock;
    const wholesaleUsd = product.costTtdCents! / (product.costUnits ?? 1) / product.exchangeRate * product.stock;
    wholesale += wholesaleUsd;
    vat += cost.exactProductCostUsdCents * product.stock - wholesaleUsd;
    international += product.shippingUsdCents * product.stock;
    inland += product.inlandShippingUsdCents * product.stock;
    allowance += (cost.roundedProductCostUsdCents - cost.exactProductCostUsdCents) * product.stock;
    if (product.salePriceUsdCents !== null) {
      forecastUnits += product.stock;
      potentialRevenue += product.salePriceUsdCents * product.stock;
      potentialCost += cost.landedCostUsdCents! * product.stock;
    }
  }
  return {
    supplierUsdCents: Math.round(supplier),
    wholesaleUsdCents: Math.round(wholesale),
    vatUsdCents: Math.round(vat),
    internationalShippingUsdCents: Math.round(international),
    inlandShippingUsdCents: Math.round(inland),
    roundingAllowanceUsdCents: Math.round(allowance),
    unroundedLandedUsdCents: Math.round(supplier + international + inland),
    inventoryValueUsdCents: Math.round(supplier + international + inland + allowance),
    potentialRevenueUsdCents: Math.round(potentialRevenue),
    potentialGrossProfitUsdCents: Math.round(potentialRevenue - potentialCost),
    forecastUnits,
    unpricedRetailUnits,
    unpricedUnits
  };
}

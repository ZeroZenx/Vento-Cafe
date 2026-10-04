import assert from "node:assert/strict";
import test from "node:test";
import { calculateInventoryValuation } from "../lib/inventory/costing.ts";
import { allocatedTransportCents, transportUsdToCents } from "../lib/inventory/money.ts";
import { validateOpeningCostCorrection } from "../lib/inventory/corrections.ts";

const product = {
  id: "example", active: true, stock: 3, costTtdCents: 1000, vatRateBps: 1000,
  exchangeRate: 5, roundProductCostUp: true, shippingUsdCents: 200,
  inlandShippingUsdCents: 100 / 3, salePriceUsdCents: 1000
};

test("stock valuation includes wholesale, VAT, both transport legs and pricing allowance", () => {
  const result = calculateInventoryValuation([product]);
  assert.equal(result.wholesaleUsdCents, 600);
  assert.equal(result.vatUsdCents, 60);
  assert.equal(result.supplierUsdCents, 660);
  assert.equal(result.internationalShippingUsdCents, 600);
  assert.equal(result.inlandShippingUsdCents, 100);
  assert.equal(result.roundingAllowanceUsdCents, 240);
  assert.equal(result.unroundedLandedUsdCents, 1360);
  assert.equal(result.inventoryValueUsdCents, 1600);
  assert.equal(result.potentialRevenueUsdCents, 3000);
  assert.equal(result.potentialGrossProfitUsdCents, 1400);
  assert.equal(result.forecastUnits, 3);
});

test("unknown costs and prices never generate a false profit forecast", () => {
  const result = calculateInventoryValuation([
    product,
    { ...product, stock: 7, costTtdCents: null },
    { ...product, stock: 2, salePriceUsdCents: null },
    { ...product, active: false, stock: 100 }
  ]);
  assert.equal(result.unpricedUnits, 7);
  assert.equal(result.unpricedRetailUnits, 2);
  assert.equal(result.forecastUnits, 3);
  assert.equal(result.potentialRevenueUsdCents, 3000);
});

test("valuation rounds aggregate transport once, not each unit", () => {
  const result = calculateInventoryValuation([{ ...product, stock: 7, inlandShippingUsdCents: 100 / 7 }]);
  assert.equal(result.inlandShippingUsdCents, 100);
});

test("supplier multipacks retain exact per-unit cost until the total is rounded", () => {
  const result = calculateInventoryValuation([{ ...product, stock: 7, costTtdCents: 1000, costUnits: 6, vatRateBps: 0, roundProductCostUp: false, shippingUsdCents: 0, inlandShippingUsdCents: 0 }]);
  assert.equal(result.wholesaleUsdCents, Math.round(1000 / 6 / 5 * 7));
  assert.equal(result.inventoryValueUsdCents, result.wholesaleUsdCents);
  assert.equal(result.roundingAllowanceUsdCents, 0);
  assert.throws(() => calculateInventoryValuation([{ ...product, costUnits: 0 }]), /Supplier pack quantity/);
});

test("editing transport retains fractional cents and rejects invalid money", () => {
  const allocation = allocatedTransportCents(10000 / 31);
  assert.equal(transportUsdToCents(String(allocation / 100)), allocation);
  for (const value of [-1, NaN, Infinity, "invalid"]) assert.throws(() => allocatedTransportCents(value));
});

const opening = { id: "opening-example", productId: "example", type: "restock", quantity: 3 };
const entry = { product: { ...product, inlandShippingUsdCents: 50 }, transaction: opening };

test("opening cost reconciliation validates source quantity and pricing", () => {
  assert.equal(validateOpeningCostCorrection(product, [opening], entry), opening);
  assert.throws(() => validateOpeningCostCorrection({ ...product, costTtdCents: 1200 }, [opening], entry), /Supplier or retail/);
  assert.throws(() => validateOpeningCostCorrection(product, [{ ...opening, quantity: 4 }], entry), /quantity mismatch/);
});

test("opening cost reconciliation never rewrites costs after sales or adjustments", () => {
  assert.throws(() => validateOpeningCostCorrection(product, [opening, { ...opening, id: "sale", type: "sale" }], entry), /activity prevent/);
  assert.throws(() => validateOpeningCostCorrection({ ...product, stock: 2 }, [opening], entry), /activity prevent/);
});

import assert from "node:assert/strict";
import test from "node:test";
import { calculateProductCost } from "../lib/inventory/costing.ts";

const base = { costTtdCents: 2500, vatRateBps: 1200, exchangeRate: 6.8, roundProductCostUp: true, shippingUsdCents: 300, inlandShippingUsdCents: 0 };

test("supplier conversion rounds up only when requested", () => {
  assert.equal(calculateProductCost(base).landedCostUsdCents, 800);
  const exact = calculateProductCost({ ...base, roundProductCostUp: false });
  assert.equal(exact.exactProductCostUsdCents, 2800 / 6.8);
});

test("transport allocation preserves the full shipment charge", () => {
  for (const quantity of [31, 48]) {
    const cost = calculateProductCost({ ...base, inlandShippingUsdCents: 10000 / quantity }).landedCostUsdCents;
    assert.equal(Math.round((cost - 800) * quantity), 10000);
  }
});

test("exact costing matches the second shipment before display rounding", () => {
  const cost = calculateProductCost({ ...base, costTtdCents: 1059, vatRateBps: 1250, roundProductCostUp: false, inlandShippingUsdCents: 10000 / 48 });
  assert.equal(Math.round(cost.landedCostUsdCents), 684);
});

test("invalid conversion rates fail instead of generating profit figures", () => {
  for (const exchangeRate of [0, -1, NaN, Infinity]) {
    assert.throws(() => calculateProductCost({ ...base, exchangeRate }), /Exchange rate/);
  }
  assert.equal(calculateProductCost({ ...base, costTtdCents: null }).landedCostUsdCents, null);
});

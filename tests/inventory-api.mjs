import assert from "node:assert/strict";
import nextEnv from "@next/env";
import { readFile, writeFile, rename } from "node:fs/promises";

nextEnv.loadEnvConfig(process.cwd(), true);
const base = process.env.VENTO_TEST_URL || "http://localhost:3001";
assert(["localhost", "127.0.0.1"].includes(new URL(base).hostname), "Mutation tests require a local server");
let cookie = "";
async function request(route, method = "GET", body, authenticated = true) {
  const response = await fetch(new URL(route, base), {
    method, headers: { "Content-Type": "application/json", ...(authenticated ? { Cookie: cookie } : {}) },
    ...(body === undefined ? {} : { body: JSON.stringify(body) })
  });
  return { status: response.status, body: await response.json(), response };
}

assert.equal((await request("/api/admin/inventory", "GET", undefined, false)).status, 401);
assert.equal((await request("/api/admin/opening-stock", "PATCH", { entries: [] }, false)).status, 401);
const login = await request("/api/admin/login", "POST", { password: process.env.VENTO_ADMIN_PASSWORD }, false);
assert.equal(login.status, 200);
cookie = login.response.headers.get("set-cookie").split(";")[0];
let id;
try {
  const input = {
    nameEs: "Producto de prueba local", nameEn: "Local test product", category: "household",
    image: "/brand/vento-cup-counter.jpg", descriptionEs: "", descriptionEn: "", stock: 3,
    lowStockThreshold: 2, costTtdCents: 1000, costUnits: 6, vatRateBps: 1000, exchangeRate: 5,
    shippingUsdCents: 200, inlandShippingUsdCents: 100 / 3, roundProductCostUp: false,
    salePriceUsdCents: 1000, publicVisible: false
  };
  const created = await request("/api/admin/products", "POST", input);
  assert.equal(created.status, 201);
  id = created.body.product.id;
  assert.equal(created.body.product.costUnits, 6);
  const sale = await request("/api/admin/transactions", "POST", { productId: id, type: "sale", quantity: 2, note: "Local verification" });
  assert.equal(sale.status, 201);
  assert.equal(sale.body.transaction.totalRevenueUsdCents, 2000);
  assert.equal(sale.body.transaction.profitUsdCents, 2000 - sale.body.transaction.totalCostUsdCents);
  assert.equal((await request("/api/admin/transactions", "POST", { productId: id, type: "sale", quantity: 2 })).status, 400);
  assert.equal((await request("/api/admin/transactions", "POST", { productId: id, type: "restock", quantity: -1 })).status, 400);
  const edited = await request(`/api/admin/products/${id}`, "PATCH", { ...input, nameEn: "Edited local test product" });
  assert.equal(edited.status, 200);
  assert.equal(edited.body.product.stock, 1, "Editing a stale product must not reset sold stock");
  assert(Math.abs(edited.body.product.inlandShippingUsdCents - 100 / 3) < 0.00000001);
  assert.equal((await request(`/api/admin/products/${id}`, "PATCH", { ...input, exchangeRate: 0 })).status, 400);
  const restock = await request("/api/admin/transactions", "POST", { productId: id, type: "restock", quantity: 2 });
  assert.equal(restock.status, 201);
  assert.equal(restock.body.transaction.totalRevenueUsdCents, null);
  assert.equal(restock.body.transaction.profitUsdCents, null);
  const inventory = (await request("/api/admin/inventory")).body;
  assert.equal(inventory.products.find(product => product.id === id).stock, 3);
  console.log("Passed: authorization, multipack costs, fractional transport, sale accounting, overselling prevention, restock accounting, and stale-edit stock protection.");
} finally {
  if (id) assert.equal((await request(`/api/admin/products/${id}`, "DELETE")).status, 200);
  await request("/api/admin/logout", "POST");
  if (id && !process.env.DATABASE_URL) {
    const file = process.env.VENTO_INVENTORY_FILE || ".data/inventory.json";
    const state = JSON.parse(await readFile(file, "utf8"));
    state.products = state.products.filter(product => product.id !== id);
    state.transactions = state.transactions.filter(transaction => transaction.productId !== id);
    await writeFile(file + ".tmp", JSON.stringify(state, null, 2));
    await rename(file + ".tmp", file);
  }
}

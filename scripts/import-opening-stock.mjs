import assert from "node:assert/strict";
import { readFile, writeFile, mkdir, rename } from "node:fs/promises";
import path from "node:path";
import nextEnv from "@next/env";
import pg from "pg";
import { products as catalogProducts } from "../data/products.ts";
import { calculateProductCost } from "../lib/inventory/costing.ts";

const args = process.argv.slice(2);
const dryRun = args.includes("--dry-run");
const local = args.includes("--local");
const remoteIndex = args.indexOf("--remote");
const remote = remoteIndex >= 0 ? args[remoteIndex + 1] : null;
const sourceIndex = args.indexOf("--source");
const sourcePath = sourceIndex >= 0 ? args[sourceIndex + 1] : ".data/opening-stock.json";
nextEnv.loadEnvConfig(process.cwd(), local);

const source = JSON.parse(await readFile(sourcePath, "utf8"));
assert(Array.isArray(source.shipments) && source.shipments.length, "Shipment source required");
const timestamp = new Date().toISOString();
const entries = [];
const totals = [];
const productIds = new Set();

function catalogRecord(product) {
  return {
    id: product.id, nameEs: product.name.es, nameEn: product.name.en, category: product.category,
    image: product.image, descriptionEs: product.description.es, descriptionEn: product.description.en,
    stock: 0, lowStockThreshold: 2, costTtdCents: null, vatRateBps: 1200, exchangeRate: 6.8,
    shippingUsdCents: 0, inlandShippingUsdCents: 0, roundProductCostUp: true,
    salePriceUsdCents: null, active: true, publicVisible: true, createdAt: timestamp, updatedAt: timestamp
  };
}

for (const shipment of source.shipments) {
  assert(/^[a-z0-9-]+$/.test(shipment.reference), "Shipment reference required");
  const unitCount = shipment.items.reduce((sum, item) => sum + item.quantity, 0);
  assert.equal(unitCount, shipment.expectedUnits, "Shipment quantity mismatch");
  assert(Number.isFinite(shipment.exchangeRate) && shipment.exchangeRate > 0, "Invalid exchange rate");
  let supplierCents = 0;
  let landedCents = 0;
  let salesCents = 0;
  for (const item of shipment.items) {
    assert(!productIds.has(item.id), "Duplicate product in import source");
    productIds.add(item.id);
    for (const field of ["quantity", "costTtdCents", "salePriceUsdCents"]) {
      assert(Number.isSafeInteger(item[field]) && item[field] > 0, "Invalid " + field);
    }
    const catalog = catalogProducts.find(product => product.id === item.id);
    const product = catalog ? catalogRecord(catalog) : {
      id: item.id, nameEs: item.nameEs, nameEn: item.nameEn, category: item.category || "hair",
      image: item.image, descriptionEs: item.nameEs, descriptionEn: item.nameEn,
      lowStockThreshold: 2, publicVisible: false, active: true, createdAt: timestamp, updatedAt: timestamp
    };
    assert(product.nameEs && product.nameEn && product.image, "Product name and image required");
    assert(["coffee", "hair", "body", "lotions", "household"].includes(product.category), "Invalid category");
    assert(product.image.startsWith("/products/"), "Local catalog image required");
    await readFile(path.join("public", product.image));
    Object.assign(product, {
      stock: item.quantity, costTtdCents: item.costTtdCents, vatRateBps: shipment.vatRateBps,
      exchangeRate: shipment.exchangeRate, roundProductCostUp: shipment.roundProductCostUp,
      shippingUsdCents: shipment.shippingPerUnitUsdCents,
      inlandShippingUsdCents: shipment.inlandShippingTotalUsdCents / unitCount,
      salePriceUsdCents: item.salePriceUsdCents
    });
    const unitCost = calculateProductCost(product).landedCostUsdCents;
    const transaction = {
      id: `opening-${shipment.reference}-${item.id}`, productId: product.id, productName: product.nameEn,
      type: "restock", quantity: item.quantity, unitCostUsdCents: unitCost, unitPriceUsdCents: null,
      totalCostUsdCents: Math.round(unitCost * item.quantity), totalRevenueUsdCents: null, profitUsdCents: null,
      note: `Opening stock: ${shipment.reference}; ${shipment.source}`, createdAt: timestamp
    };
    entries.push({ product, transaction });
    supplierCents += item.costTtdCents * item.quantity;
    landedCents += unitCost * item.quantity;
    salesCents += item.salePriceUsdCents * item.quantity;
  }
  assert.equal(supplierCents, shipment.expectedSupplierTtdCents, "Supplier subtotal mismatch");
  assert.equal(Math.round(landedCents), shipment.expectedLandedUsdCents, "Landed cost mismatch");
  assert.equal(salesCents, shipment.expectedSalesUsdCents, "Retail total mismatch");
  totals.push({ reference: shipment.reference, units: unitCount, landedUsdCents: Math.round(landedCents), salesUsdCents: salesCents });
}

console.log(JSON.stringify({ shipments: totals, totalUnits: totals.reduce((sum, s) => sum + s.units, 0), totalLandedUsdCents: totals.reduce((sum, s) => sum + s.landedUsdCents, 0), totalSalesUsdCents: totals.reduce((sum, s) => sum + s.salesUsdCents, 0) }, null, 2));
if (dryRun) process.exit(0);

if (remote) {
  const url = new URL(remote);
  assert(url.protocol === "https:" || ["localhost", "127.0.0.1"].includes(url.hostname), "HTTPS required for remote import");
  assert(process.env.VENTO_ADMIN_PASSWORD, "Admin password required for remote import");
  const login = await fetch(new URL("/api/admin/login", url), { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ password: process.env.VENTO_ADMIN_PASSWORD }) });
  assert.equal(login.status, 200, "Admin login failed");
  const cookie = login.headers.get("set-cookie")?.split(";")[0];
  assert(cookie, "Admin session required");
  try {
    const response = await fetch(new URL("/api/admin/opening-stock", url), { method: "POST", headers: { "Content-Type": "application/json", Cookie: cookie }, body: JSON.stringify({ entries }) });
    const result = await response.json();
    assert.equal(response.status, 200, result.error || "Remote import failed");
    console.log("Opening units imported remotely: " + result.importedUnits);
  } finally {
    await fetch(new URL("/api/admin/logout", url), { method: "POST", headers: { Cookie: cookie } });
  }
} else if (local) {
  const file = process.env.VENTO_INVENTORY_FILE || ".data/inventory.json";
  let state;
  try { state = JSON.parse(await readFile(file, "utf8")); }
  catch (error) {
    if (error.code !== "ENOENT") throw error;
    state = { products: catalogProducts.map(catalogRecord), transactions: [] };
  }
  let imported = 0;
  for (const entry of entries) {
    if (state.transactions.some(t => t.id === entry.transaction.id)) continue;
    const current = state.products.find(product => product.id === entry.product.id);
    if (current) {
      assert(current.stock === 0 && current.costTtdCents === null && !state.transactions.some(t => t.productId === current.id), "Existing activity prevents opening-stock replacement: " + current.id);
      Object.assign(current, entry.product, { createdAt: current.createdAt });
    } else state.products.push(entry.product);
    state.transactions.push(entry.transaction);
    imported += entry.product.stock;
  }
  await mkdir(path.dirname(file), { recursive: true });
  await writeFile(file + ".tmp", JSON.stringify(state, null, 2));
  await rename(file + ".tmp", file);
  console.log("Opening units imported locally: " + imported);
} else {
  assert(process.env.DATABASE_URL, "DATABASE_URL required for production import");
  const client = new pg.Client({ connectionString: process.env.DATABASE_URL, ssl: process.env.DATABASE_SSL === "false" ? false : { rejectUnauthorized: false } });
  await client.connect();
  try {
    await client.query("BEGIN");
    await client.query("SELECT pg_advisory_xact_lock(hashtext($1))", ["vento-opening-stock"]);
    await client.query(await readFile("db/schema.sql", "utf8"));
    let imported = 0;
    for (const { product: p, transaction: t } of entries) {
      const prior = await client.query("SELECT id FROM vento_inventory_transactions WHERE id=$1", [t.id]);
      if (prior.rowCount) continue;
      const current = await client.query("SELECT stock, cost_ttd_cents FROM vento_inventory_products WHERE id=$1 FOR UPDATE", [p.id]);
      if (current.rowCount) {
        const activity = await client.query("SELECT 1 FROM vento_inventory_transactions WHERE product_id=$1 LIMIT 1", [p.id]);
        assert(Number(current.rows[0].stock) === 0 && current.rows[0].cost_ttd_cents === null && activity.rowCount === 0, "Existing activity prevents opening-stock replacement: " + p.id);
      }
      await client.query(`INSERT INTO vento_inventory_products
        (id,name_es,name_en,category,image,description_es,description_en,stock,low_stock_threshold,cost_ttd_cents,vat_rate_bps,exchange_rate,shipping_usd_cents,inland_shipping_usd_cents,round_product_cost_up,sale_price_usd_cents,active,public_visible,created_at,updated_at)
        VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$19)
        ON CONFLICT (id) DO UPDATE SET stock=EXCLUDED.stock,cost_ttd_cents=EXCLUDED.cost_ttd_cents,vat_rate_bps=EXCLUDED.vat_rate_bps,exchange_rate=EXCLUDED.exchange_rate,shipping_usd_cents=EXCLUDED.shipping_usd_cents,inland_shipping_usd_cents=EXCLUDED.inland_shipping_usd_cents,round_product_cost_up=EXCLUDED.round_product_cost_up,sale_price_usd_cents=EXCLUDED.sale_price_usd_cents,updated_at=EXCLUDED.updated_at`,
        [p.id,p.nameEs,p.nameEn,p.category,p.image,p.descriptionEs,p.descriptionEn,p.stock,p.lowStockThreshold,p.costTtdCents,p.vatRateBps,p.exchangeRate,p.shippingUsdCents,p.inlandShippingUsdCents,p.roundProductCostUp,p.salePriceUsdCents,p.active,p.publicVisible,p.createdAt]);
      await client.query(`INSERT INTO vento_inventory_transactions
        (id,product_id,product_name,type,quantity,unit_cost_usd_cents,unit_price_usd_cents,total_cost_usd_cents,total_revenue_usd_cents,profit_usd_cents,note,created_at)
        VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)`,
        [t.id,t.productId,t.productName,t.type,t.quantity,t.unitCostUsdCents,t.unitPriceUsdCents,t.totalCostUsdCents,t.totalRevenueUsdCents,t.profitUsdCents,t.note,t.createdAt]);
      imported += p.stock;
    }
    await client.query("COMMIT");
    console.log("Opening units imported into PostgreSQL: " + imported);
  } catch (error) { await client.query("ROLLBACK"); throw error; }
  finally { await client.end(); }
}

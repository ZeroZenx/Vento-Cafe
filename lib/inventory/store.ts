import { randomUUID } from "node:crypto";
import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import path from "node:path";
import { Pool, type PoolClient } from "pg";
import { products as catalogProducts } from "@/data/products";
import type { Product, ProductCategory } from "@/data/products";
import { calculateProductCost as productCost } from "@/lib/inventory/costing";
import type { OpeningEntry } from "@/lib/inventory/opening-stock";
import { validateOpeningCostCorrection } from "@/lib/inventory/corrections";
import type {
  InventoryData,
  InventoryProduct,
  InventoryProductView,
  InventorySummary,
  InventoryTransaction,
  InventoryTransactionType,
  UpsertInventoryProductInput
} from "@/lib/inventory/types";

type CostCorrection = { productId: string; transactionId: string; before: unknown; after: unknown; reason: string; createdAt: string };
type LocalState = { products: InventoryProduct[]; transactions: InventoryTransaction[]; costCorrections?: CostCorrection[] };

const localPath = process.env.VENTO_INVENTORY_FILE || path.join(process.cwd(), ".data", "inventory.json");
let pool: Pool | null = null;
let databaseReady: Promise<void> | null = null;

const schemaSql = `
CREATE TABLE IF NOT EXISTS vento_inventory_products (
  id TEXT PRIMARY KEY,
  name_es TEXT NOT NULL,
  name_en TEXT NOT NULL,
  category TEXT NOT NULL,
  image TEXT NOT NULL,
  description_es TEXT NOT NULL DEFAULT '',
  description_en TEXT NOT NULL DEFAULT '',
  stock INTEGER NOT NULL DEFAULT 0,
  low_stock_threshold INTEGER NOT NULL DEFAULT 2,
  cost_ttd_cents INTEGER,
  vat_rate_bps INTEGER NOT NULL DEFAULT 1200,
  exchange_rate NUMERIC(10, 4) NOT NULL DEFAULT 6.8,
  shipping_usd_cents INTEGER NOT NULL DEFAULT 0,
  inland_shipping_usd_cents NUMERIC(18, 8) NOT NULL DEFAULT 0,
  round_product_cost_up BOOLEAN NOT NULL DEFAULT TRUE,
  sale_price_usd_cents INTEGER,
  active BOOLEAN NOT NULL DEFAULT TRUE,
  public_visible BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE TABLE IF NOT EXISTS vento_inventory_transactions (
  id TEXT PRIMARY KEY,
  product_id TEXT NOT NULL REFERENCES vento_inventory_products(id),
  product_name TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('sale', 'restock', 'adjustment')),
  quantity INTEGER NOT NULL,
  unit_cost_usd_cents NUMERIC(18, 8),
  unit_price_usd_cents INTEGER,
  total_cost_usd_cents INTEGER,
  total_revenue_usd_cents INTEGER,
  profit_usd_cents INTEGER,
  note TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS vento_inventory_transactions_created_idx ON vento_inventory_transactions(created_at DESC);
ALTER TABLE vento_inventory_products ALTER COLUMN inland_shipping_usd_cents TYPE NUMERIC(18, 8);
ALTER TABLE vento_inventory_transactions ALTER COLUMN unit_cost_usd_cents TYPE NUMERIC(18, 8);
ALTER TABLE vento_inventory_products ADD COLUMN IF NOT EXISTS cost_units INTEGER NOT NULL DEFAULT 1 CHECK (cost_units > 0);
CREATE TABLE IF NOT EXISTS vento_inventory_cost_corrections (
  id TEXT PRIMARY KEY,
  product_id TEXT NOT NULL REFERENCES vento_inventory_products(id),
  transaction_id TEXT NOT NULL REFERENCES vento_inventory_transactions(id),
  before_values JSONB NOT NULL,
  after_values JSONB NOT NULL,
  reason TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
`;

function now(): string {
  return new Date().toISOString();
}

function seedProduct(product: Product, timestamp: string): InventoryProduct {
  return {
    id: product.id,
    nameEs: product.name.es,
    nameEn: product.name.en,
    category: product.category,
    image: product.image,
    descriptionEs: product.description.es,
    descriptionEn: product.description.en,
    stock: 0,
    lowStockThreshold: 2,
    costTtdCents: null,
    vatRateBps: 1200,
    exchangeRate: 6.8,
    shippingUsdCents: 0,
    inlandShippingUsdCents: 0,
    roundProductCostUp: true,
    salePriceUsdCents: null,
    active: true,
    publicVisible: true,
    createdAt: timestamp,
    updatedAt: timestamp
  };
}

function seedState(): LocalState {
  const timestamp = now();
  return { products: catalogProducts.map((product) => seedProduct(product, timestamp)), transactions: [] };
}

async function readLocalState(): Promise<LocalState> {
  try {
    const parsed = JSON.parse(await readFile(localPath, "utf8")) as LocalState;
    const existingIds = new Set(parsed.products.map((product) => product.id));
    const additions = catalogProducts.filter((product) => !existingIds.has(product.id)).map((product) => seedProduct(product, now()));
    if (additions.length) {
      parsed.products.push(...additions);
      await writeLocalState(parsed);
    }
    return parsed;
  } catch {
    const initial = seedState();
    await writeLocalState(initial);
    return initial;
  }
}

async function writeLocalState(state: LocalState): Promise<void> {
  await mkdir(path.dirname(localPath), { recursive: true });
  const tempPath = `${localPath}.tmp`;
  await writeFile(tempPath, JSON.stringify(state, null, 2), "utf8");
  await rename(tempPath, localPath);
}

function hasDatabaseConnection(): boolean {
  return Boolean(process.env.DATABASE_URL);
}

function getPool(): Pool {
  if (!pool) {
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      max: 3,
      ssl: process.env.DATABASE_SSL === "false" ? false : { rejectUnauthorized: false }
    });
  }
  return pool;
}

async function ensureDatabase(): Promise<void> {
  if (!hasDatabaseConnection()) return;
  if (!databaseReady) {
    databaseReady = getPool().query(schemaSql).then(() => undefined);
  }
  await databaseReady;
  await seedDatabaseProducts();
}

async function seedDatabaseProducts(): Promise<void> {
  const client = getPool();
  for (const product of catalogProducts) {
    const seed = seedProduct(product, now());
    await client.query(
      `INSERT INTO vento_inventory_products
        (id, name_es, name_en, category, image, description_es, description_en, stock, low_stock_threshold, cost_ttd_cents,
         vat_rate_bps, exchange_rate, shipping_usd_cents, inland_shipping_usd_cents, round_product_cost_up, sale_price_usd_cents,
         active, public_visible, created_at, updated_at)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20)
       ON CONFLICT (id) DO NOTHING`,
      [seed.id, seed.nameEs, seed.nameEn, seed.category, seed.image, seed.descriptionEs, seed.descriptionEn, seed.stock, seed.lowStockThreshold, seed.costTtdCents,
        seed.vatRateBps, seed.exchangeRate, seed.shippingUsdCents, seed.inlandShippingUsdCents, seed.roundProductCostUp, seed.salePriceUsdCents,
        seed.active, seed.publicVisible, seed.createdAt, seed.updatedAt]
    );
  }
}

function mapProductRow(row: Record<string, unknown>): InventoryProduct {
  return {
    id: String(row.id),
    nameEs: String(row.name_es),
    nameEn: String(row.name_en),
    category: String(row.category) as ProductCategory,
    image: String(row.image),
    descriptionEs: String(row.description_es || ""),
    descriptionEn: String(row.description_en || ""),
    stock: Number(row.stock),
    lowStockThreshold: Number(row.low_stock_threshold),
    costTtdCents: row.cost_ttd_cents === null ? null : Number(row.cost_ttd_cents),
    costUnits: Number(row.cost_units ?? 1),
    vatRateBps: Number(row.vat_rate_bps),
    exchangeRate: Number(row.exchange_rate),
    shippingUsdCents: Number(row.shipping_usd_cents),
    inlandShippingUsdCents: Number(row.inland_shipping_usd_cents),
    roundProductCostUp: Boolean(row.round_product_cost_up),
    salePriceUsdCents: row.sale_price_usd_cents === null ? null : Number(row.sale_price_usd_cents),
    active: Boolean(row.active),
    publicVisible: Boolean(row.public_visible),
    createdAt: new Date(String(row.created_at)).toISOString(),
    updatedAt: new Date(String(row.updated_at)).toISOString()
  };
}

function mapTransactionRow(row: Record<string, unknown>): InventoryTransaction {
  return {
    id: String(row.id),
    productId: String(row.product_id),
    productName: String(row.product_name),
    type: String(row.type) as InventoryTransactionType,
    quantity: Number(row.quantity),
    unitCostUsdCents: row.unit_cost_usd_cents === null ? null : Number(row.unit_cost_usd_cents),
    unitPriceUsdCents: row.unit_price_usd_cents === null ? null : Number(row.unit_price_usd_cents),
    totalCostUsdCents: row.total_cost_usd_cents === null ? null : Number(row.total_cost_usd_cents),
    totalRevenueUsdCents: row.total_revenue_usd_cents === null ? null : Number(row.total_revenue_usd_cents),
    profitUsdCents: row.profit_usd_cents === null ? null : Number(row.profit_usd_cents),
    note: String(row.note || ""),
    createdAt: new Date(String(row.created_at)).toISOString()
  };
}

function viewProduct(product: InventoryProduct, hasInventoryActivity: boolean): InventoryProductView {
  const cost = productCost(product);
  return {
    ...product,
    ...cost,
    grossProfitPerUnitUsdCents: cost.landedCostUsdCents !== null && product.salePriceUsdCents !== null
      ? product.salePriceUsdCents - cost.landedCostUsdCents
      : null,
    hasInventoryActivity,
    lowStock: hasInventoryActivity && product.stock <= product.lowStockThreshold
  };
}

function summary(products: InventoryProduct[], transactions: InventoryTransaction[]): InventorySummary {
  const visibleProducts = products.filter((product) => product.active);
  const activityProductIds = new Set(transactions.map((transaction) => transaction.productId));
  const saleTransactions = transactions.filter((transaction) => transaction.type === "sale");
  return {
    productCount: visibleProducts.length,
    unitsInStock: visibleProducts.reduce((total, product) => total + product.stock, 0),
    lowStockCount: visibleProducts.filter((product) => activityProductIds.has(product.id) && product.stock <= product.lowStockThreshold).length,
    inventoryValueUsdCents: Math.round(visibleProducts.reduce((total, product) => total + (productCost(product).landedCostUsdCents || 0) * product.stock, 0)),
    salesCount: saleTransactions.length,
    unitsSold: saleTransactions.reduce((total, transaction) => total + transaction.quantity, 0),
    revenueUsdCents: saleTransactions.reduce((total, transaction) => total + (transaction.totalRevenueUsdCents || 0), 0),
    costOfGoodsUsdCents: saleTransactions.reduce((total, transaction) => total + (transaction.totalCostUsdCents || 0), 0),
    grossProfitUsdCents: saleTransactions.reduce((total, transaction) => total + (transaction.profitUsdCents || 0), 0)
  };
}

async function databaseData(): Promise<{ products: InventoryProduct[]; transactions: InventoryTransaction[] }> {
  await ensureDatabase();
  const [productsResult, transactionsResult] = await Promise.all([
    getPool().query("SELECT * FROM vento_inventory_products ORDER BY created_at ASC"),
    getPool().query("SELECT * FROM vento_inventory_transactions ORDER BY created_at DESC LIMIT 200")
  ]);
  return {
    products: productsResult.rows.map(mapProductRow),
    transactions: transactionsResult.rows.map(mapTransactionRow)
  };
}

async function baseData(): Promise<{ products: InventoryProduct[]; transactions: InventoryTransaction[] }> {
  if (hasDatabaseConnection()) return databaseData();
  if (process.env.NODE_ENV === "production") throw new Error("DATABASE_URL is required for hosted inventory persistence");
  return readLocalState();
}

export function formatUsd(cents: number | null): string {
  if (cents === null) return "Not set";
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(cents / 100);
}

export function formatTtd(cents: number | null): string {
  if (cents === null) return "Not set";
  return `TT$${(cents / 100).toFixed(2)}`;
}

export async function getInventoryData(): Promise<InventoryData> {
  const data = await baseData();
  const activityProductIds = new Set(data.transactions.map((transaction) => transaction.productId));
  return {
    products: data.products.filter((product) => product.active).map((product) => viewProduct(product, activityProductIds.has(product.id))),
    transactions: data.transactions,
    summary: summary(data.products, data.transactions)
  };
}

export async function getPublicProducts(): Promise<Product[]> {
  try {
    const data = await baseData();
    return data.products.filter((product) => product.active && product.publicVisible).map((product) => ({
      ...(catalogProducts.find((catalogProduct) => catalogProduct.id === product.id) || {
        id: product.id,
        category: product.category,
        name: { es: product.nameEs, en: product.nameEn },
        image: product.image,
        description: { es: product.descriptionEs, en: product.descriptionEn },
        highlights: { es: [], en: [] },
        details: { es: [], en: [] },
        price: "Precio por WhatsApp"
      }),
      id: product.id,
      category: product.category,
      name: { es: product.nameEs, en: product.nameEn },
      image: product.image,
      description: { es: product.descriptionEs, en: product.descriptionEn },
      price: product.salePriceUsdCents === null ? "Precio por WhatsApp" : formatUsd(product.salePriceUsdCents)
    }));
  } catch {
    return catalogProducts;
  }
}

export async function createProduct(input: UpsertInventoryProductInput): Promise<InventoryProduct> {
  const timestamp = now();
  const product: InventoryProduct = {
    ...input,
    id: input.id || randomUUID(),
    active: true,
    createdAt: timestamp,
    updatedAt: timestamp
  };
  if (hasDatabaseConnection()) {
    await ensureDatabase();
    const result = await getPool().query(
      `INSERT INTO vento_inventory_products
        (id,name_es,name_en,category,image,description_es,description_en,stock,low_stock_threshold,cost_ttd_cents,vat_rate_bps,exchange_rate,shipping_usd_cents,inland_shipping_usd_cents,round_product_cost_up,sale_price_usd_cents,active,public_visible,created_at,updated_at,cost_units)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,TRUE,$17,$18,$18,$19)
       RETURNING *`,
      [product.id, product.nameEs, product.nameEn, product.category, product.image, product.descriptionEs, product.descriptionEn, product.stock, product.lowStockThreshold, product.costTtdCents, product.vatRateBps, product.exchangeRate, product.shippingUsdCents, product.inlandShippingUsdCents, product.roundProductCostUp, product.salePriceUsdCents, product.publicVisible, timestamp, product.costUnits ?? 1]
    );
    return mapProductRow(result.rows[0]);
  }
  const state = await readLocalState();
  state.products.push(product);
  await writeLocalState(state);
  return product;
}

export async function updateProduct(id: string, input: UpsertInventoryProductInput): Promise<InventoryProduct> {
  const timestamp = now();
  if (hasDatabaseConnection()) {
    await ensureDatabase();
    const result = await getPool().query(
      `UPDATE vento_inventory_products SET name_es=$2,name_en=$3,category=$4,image=$5,description_es=$6,description_en=$7,low_stock_threshold=$8,cost_ttd_cents=$9,vat_rate_bps=$10,exchange_rate=$11,shipping_usd_cents=$12,inland_shipping_usd_cents=$13,round_product_cost_up=$14,sale_price_usd_cents=$15,public_visible=$16,updated_at=$17,cost_units=$18 WHERE id=$1 RETURNING *`,
      [id, input.nameEs, input.nameEn, input.category, input.image, input.descriptionEs, input.descriptionEn, input.lowStockThreshold, input.costTtdCents, input.vatRateBps, input.exchangeRate, input.shippingUsdCents, input.inlandShippingUsdCents, input.roundProductCostUp, input.salePriceUsdCents, input.publicVisible, timestamp, input.costUnits ?? 1]
    );
    if (!result.rows[0]) throw new Error("Product not found");
    return mapProductRow(result.rows[0]);
  }
  const state = await readLocalState();
  const index = state.products.findIndex((product) => product.id === id);
  if (index === -1) throw new Error("Product not found");
  const current = state.products[index];
  const updated = { ...current, ...input, id, stock: current.stock, createdAt: current.createdAt, updatedAt: timestamp };
  state.products[index] = updated;
  await writeLocalState(state);
  return updated;
}

export async function archiveProduct(id: string): Promise<void> {
  if (hasDatabaseConnection()) {
    await ensureDatabase();
    await getPool().query("UPDATE vento_inventory_products SET active=FALSE, public_visible=FALSE, updated_at=NOW() WHERE id=$1", [id]);
    return;
  }
  const state = await readLocalState();
  const product = state.products.find((item) => item.id === id);
  if (!product) throw new Error("Product not found");
  product.active = false;
  product.publicVisible = false;
  product.updatedAt = now();
  await writeLocalState(state);
}

export async function recordTransaction(input: { productId: string; type: InventoryTransactionType; quantity: number; note: string }): Promise<InventoryTransaction> {
  if (!Number.isInteger(input.quantity) || input.quantity === 0) throw new Error("Quantity must be a non-zero whole number");
  if (input.type !== "adjustment" && input.quantity < 0) throw new Error("Sales and restocks require a positive quantity");

  if (hasDatabaseConnection()) {
    await ensureDatabase();
    const client = await getPool().connect();
    try {
      await client.query("BEGIN");
      const result = await client.query("SELECT * FROM vento_inventory_products WHERE id=$1 FOR UPDATE", [input.productId]);
      if (!result.rows[0]) throw new Error("Product not found");
      const product = mapProductRow(result.rows[0]);
      const cost = productCost(product).landedCostUsdCents;
      const price = product.salePriceUsdCents;
      const delta = input.type === "sale" ? -input.quantity : input.quantity;
      if (product.stock + delta < 0) throw new Error("Not enough stock for this sale");
      if (input.type === "sale" && price === null) throw new Error("Set a sale price before recording a sale");
      const totalCost = cost === null ? null : Math.round(cost * input.quantity);
      const totalRevenue = input.type === "sale" && price !== null ? price * input.quantity : null;
      const profit = totalRevenue === null || totalCost === null ? null : totalRevenue - totalCost;
      const transaction = {
        id: randomUUID(), productId: product.id, productName: product.nameEn, type: input.type, quantity: input.quantity,
        unitCostUsdCents: cost, unitPriceUsdCents: input.type === "sale" ? price : null, totalCostUsdCents: totalCost,
        totalRevenueUsdCents: totalRevenue, profitUsdCents: profit, note: input.note || ""
      };
      await client.query("UPDATE vento_inventory_products SET stock=$2,updated_at=NOW() WHERE id=$1", [product.id, product.stock + delta]);
      const inserted = await client.query(
        `INSERT INTO vento_inventory_transactions (id,product_id,product_name,type,quantity,unit_cost_usd_cents,unit_price_usd_cents,total_cost_usd_cents,total_revenue_usd_cents,profit_usd_cents,note)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) RETURNING *`,
        [transaction.id, transaction.productId, transaction.productName, transaction.type, transaction.quantity, transaction.unitCostUsdCents, transaction.unitPriceUsdCents, transaction.totalCostUsdCents, transaction.totalRevenueUsdCents, transaction.profitUsdCents, transaction.note]
      );
      await client.query("COMMIT");
      return mapTransactionRow(inserted.rows[0]);
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }
  }

  const state = await readLocalState();
  const product = state.products.find((item) => item.id === input.productId);
  if (!product) throw new Error("Product not found");
  const cost = productCost(product).landedCostUsdCents;
  const price = product.salePriceUsdCents;
  const delta = input.type === "sale" ? -input.quantity : input.quantity;
  if (product.stock + delta < 0) throw new Error("Not enough stock for this sale");
  if (input.type === "sale" && price === null) throw new Error("Set a sale price before recording a sale");
  const totalCost = cost === null ? null : Math.round(cost * input.quantity);
  const totalRevenue = input.type === "sale" && price !== null ? price * input.quantity : null;
  const transaction: InventoryTransaction = {
    id: randomUUID(), productId: product.id, productName: product.nameEn, type: input.type, quantity: input.quantity,
    unitCostUsdCents: cost, unitPriceUsdCents: input.type === "sale" ? price : null, totalCostUsdCents: totalCost,
    totalRevenueUsdCents: totalRevenue, profitUsdCents: totalRevenue === null || totalCost === null ? null : totalRevenue - totalCost,
    note: input.note || "", createdAt: now()
  };
  product.stock += delta;
  product.updatedAt = now();
  state.transactions.unshift(transaction);
  await writeLocalState(state);
  return transaction;
}

export function calculateProductCost(product: InventoryProduct) {
  return productCost(product);
}

export async function importOpeningStock(entries: OpeningEntry[]): Promise<number> {
  if (!hasDatabaseConnection()) {
    if (process.env.NODE_ENV === "production") throw new Error("DATABASE_URL is required for hosted inventory persistence");
    const state = await readLocalState();
    let imported = 0;
    for (const { product, transaction } of entries) {
      if (state.transactions.some(t => t.id === transaction.id)) continue;
      const current = state.products.find(p => p.id === product.id);
      if (current && (current.stock !== 0 || current.costTtdCents !== null || state.transactions.some(t => t.productId === current.id))) throw new Error("Existing activity prevents opening stock replacement: " + product.id);
      if (current) Object.assign(current, product, { createdAt: current.createdAt });
      else state.products.push(product);
      state.transactions.push(transaction);
      imported += product.stock;
    }
    await writeLocalState(state);
    return imported;
  }
  await ensureDatabase();
  const client = await getPool().connect();
  try {
    await client.query("BEGIN");
    await client.query("SELECT pg_advisory_xact_lock(hashtext($1))", ["vento-opening-stock"]);
    let imported = 0;
    for (const { product: p, transaction: t } of entries) {
      const prior = await client.query("SELECT id FROM vento_inventory_transactions WHERE id=$1", [t.id]);
      if (prior.rowCount) continue;
      const current = await client.query("SELECT stock,cost_ttd_cents FROM vento_inventory_products WHERE id=$1 FOR UPDATE", [p.id]);
      if (current.rowCount) {
        const activity = await client.query("SELECT 1 FROM vento_inventory_transactions WHERE product_id=$1 LIMIT 1", [p.id]);
        if (Number(current.rows[0].stock) !== 0 || current.rows[0].cost_ttd_cents !== null || activity.rowCount) throw new Error("Existing activity prevents opening stock replacement: " + p.id);
      }
      await client.query(`INSERT INTO vento_inventory_products
        (id,name_es,name_en,category,image,description_es,description_en,stock,low_stock_threshold,cost_ttd_cents,vat_rate_bps,exchange_rate,shipping_usd_cents,inland_shipping_usd_cents,round_product_cost_up,sale_price_usd_cents,active,public_visible,created_at,updated_at,cost_units)
        VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,TRUE,$17,$18,$18,$19)
        ON CONFLICT (id) DO UPDATE SET stock=EXCLUDED.stock,cost_ttd_cents=EXCLUDED.cost_ttd_cents,vat_rate_bps=EXCLUDED.vat_rate_bps,exchange_rate=EXCLUDED.exchange_rate,shipping_usd_cents=EXCLUDED.shipping_usd_cents,inland_shipping_usd_cents=EXCLUDED.inland_shipping_usd_cents,round_product_cost_up=EXCLUDED.round_product_cost_up,sale_price_usd_cents=EXCLUDED.sale_price_usd_cents,cost_units=EXCLUDED.cost_units,updated_at=EXCLUDED.updated_at`,
        [p.id,p.nameEs,p.nameEn,p.category,p.image,p.descriptionEs,p.descriptionEn,p.stock,p.lowStockThreshold,p.costTtdCents,p.vatRateBps,p.exchangeRate,p.shippingUsdCents,p.inlandShippingUsdCents,p.roundProductCostUp,p.salePriceUsdCents,p.publicVisible,p.createdAt,p.costUnits ?? 1]);
      await client.query(`INSERT INTO vento_inventory_transactions
        (id,product_id,product_name,type,quantity,unit_cost_usd_cents,unit_price_usd_cents,total_cost_usd_cents,total_revenue_usd_cents,profit_usd_cents,note,created_at)
        VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)`,
        [t.id,t.productId,t.productName,t.type,t.quantity,t.unitCostUsdCents,t.unitPriceUsdCents,t.totalCostUsdCents,t.totalRevenueUsdCents,t.profitUsdCents,t.note,t.createdAt]);
      imported += p.stock;
    }
    await client.query("COMMIT");
    return imported;
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally { client.release(); }
}

export async function reconcileOpeningCosts(entries: OpeningEntry[]): Promise<number> {
  const fields = (p: InventoryProduct) => ({ shippingUsdCents: p.shippingUsdCents, inlandShippingUsdCents: p.inlandShippingUsdCents });
  const correctionFor = (p: InventoryProduct, t: InventoryTransaction, entry: OpeningEntry): CostCorrection => ({
    productId: p.id, transactionId: t.id,
    before: { ...fields(p), unitCostUsdCents: t.unitCostUsdCents, totalCostUsdCents: t.totalCostUsdCents },
    after: { ...fields(entry.product), unitCostUsdCents: entry.transaction.unitCostUsdCents, totalCostUsdCents: entry.transaction.totalCostUsdCents },
    reason: entry.transaction.note, createdAt: now()
  });
  if (hasDatabaseConnection()) {
    await ensureDatabase();
    const client = await getPool().connect();
    try {
      await client.query("BEGIN");
      await client.query("SELECT pg_advisory_xact_lock(hashtext($1))", ["vento-opening-stock"]);
      let corrected = 0;
      for (const entry of entries) {
        const result = await client.query("SELECT * FROM vento_inventory_products WHERE id=$1 FOR UPDATE", [entry.product.id]);
        if (!result.rows[0]) throw new Error("Opening product not found");
        const product = mapProductRow(result.rows[0]);
        const activity = await client.query("SELECT * FROM vento_inventory_transactions WHERE product_id=$1 FOR UPDATE", [product.id]);
        const opening = validateOpeningCostCorrection(product, activity.rows.map(mapTransactionRow), entry);
        if (product.shippingUsdCents === entry.product.shippingUsdCents && Math.abs(product.inlandShippingUsdCents - entry.product.inlandShippingUsdCents) < 0.00000001) continue;
        const correction = correctionFor(product, opening, entry);
        await client.query("INSERT INTO vento_inventory_cost_corrections (id,product_id,transaction_id,before_values,after_values,reason) VALUES ($1,$2,$3,$4,$5,$6)", [randomUUID(), product.id, opening.id, JSON.stringify(correction.before), JSON.stringify(correction.after), correction.reason]);
        await client.query("UPDATE vento_inventory_products SET shipping_usd_cents=$2,inland_shipping_usd_cents=$3,updated_at=NOW() WHERE id=$1", [product.id, entry.product.shippingUsdCents, entry.product.inlandShippingUsdCents]);
        await client.query("UPDATE vento_inventory_transactions SET unit_cost_usd_cents=$2,total_cost_usd_cents=$3,note=$4 WHERE id=$1", [opening.id, entry.transaction.unitCostUsdCents, entry.transaction.totalCostUsdCents, entry.transaction.note]);
        corrected += 1;
      }
      await client.query("COMMIT");
      return corrected;
    } catch (error) { await client.query("ROLLBACK"); throw error; }
    finally { client.release(); }
  }
  const state = await readLocalState();
  let corrected = 0;
  for (const entry of entries) {
    const product = state.products.find(p => p.id === entry.product.id);
    if (!product) throw new Error("Opening product not found");
    const opening = validateOpeningCostCorrection(product, state.transactions.filter(t => t.productId === product.id), entry);
    if (product.shippingUsdCents === entry.product.shippingUsdCents && Math.abs(product.inlandShippingUsdCents - entry.product.inlandShippingUsdCents) < 0.00000001) continue;
    (state.costCorrections ||= []).push(correctionFor(product, opening, entry));
    Object.assign(product, fields(entry.product), { updatedAt: now() });
    Object.assign(opening, { unitCostUsdCents: entry.transaction.unitCostUsdCents, totalCostUsdCents: entry.transaction.totalCostUsdCents, note: entry.transaction.note });
    corrected += 1;
  }
  await writeLocalState(state);
  return corrected;
}

export type { PoolClient };

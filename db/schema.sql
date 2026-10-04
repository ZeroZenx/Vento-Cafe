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
  inland_shipping_usd_cents INTEGER NOT NULL DEFAULT 0,
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
  unit_cost_usd_cents INTEGER,
  unit_price_usd_cents INTEGER,
  total_cost_usd_cents INTEGER,
  total_revenue_usd_cents INTEGER,
  profit_usd_cents INTEGER,
  note TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS vento_inventory_transactions_created_idx
  ON vento_inventory_transactions(created_at DESC);

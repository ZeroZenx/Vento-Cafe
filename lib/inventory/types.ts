import type { ProductCategory } from "@/data/products";

export type InventoryTransactionType = "sale" | "restock" | "adjustment";

export type InventoryProduct = {
  id: string;
  nameEs: string;
  nameEn: string;
  category: ProductCategory;
  image: string;
  descriptionEs: string;
  descriptionEn: string;
  stock: number;
  lowStockThreshold: number;
  costTtdCents: number | null;
  costUnits?: number;
  vatRateBps: number;
  exchangeRate: number;
  shippingUsdCents: number;
  inlandShippingUsdCents: number;
  roundProductCostUp: boolean;
  salePriceUsdCents: number | null;
  active: boolean;
  publicVisible: boolean;
  createdAt: string;
  updatedAt: string;
};

export type InventoryProductView = InventoryProduct & {
  costWithVatTtdCents: number | null;
  exactProductCostUsdCents: number | null;
  roundedProductCostUsdCents: number | null;
  landedCostUsdCents: number | null;
  grossProfitPerUnitUsdCents: number | null;
  hasInventoryActivity: boolean;
  lowStock: boolean;
};

export type InventoryTransaction = {
  id: string;
  productId: string;
  productName: string;
  type: InventoryTransactionType;
  quantity: number;
  unitCostUsdCents: number | null;
  unitPriceUsdCents: number | null;
  totalCostUsdCents: number | null;
  totalRevenueUsdCents: number | null;
  profitUsdCents: number | null;
  note: string;
  createdAt: string;
};

export type InventorySummary = {
  productCount: number;
  unitsInStock: number;
  lowStockCount: number;
  inventoryValueUsdCents: number;
  salesCount: number;
  unitsSold: number;
  revenueUsdCents: number;
  costOfGoodsUsdCents: number;
  grossProfitUsdCents: number;
};

export type InventoryData = {
  products: InventoryProductView[];
  transactions: InventoryTransaction[];
  summary: InventorySummary;
};

export type UpsertInventoryProductInput = {
  id?: string;
  nameEs: string;
  nameEn: string;
  category: ProductCategory;
  image: string;
  descriptionEs: string;
  descriptionEn: string;
  stock: number;
  lowStockThreshold: number;
  costTtdCents: number | null;
  costUnits?: number;
  vatRateBps: number;
  exchangeRate: number;
  shippingUsdCents: number;
  inlandShippingUsdCents: number;
  roundProductCostUp: boolean;
  salePriceUsdCents: number | null;
  publicVisible: boolean;
};

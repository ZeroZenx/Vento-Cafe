"use client";

import Link from "next/link";
import { ArrowUpRight, AlertTriangle, Boxes, Check, ChevronDown, CircleDollarSign, Edit3, LayoutDashboard, LogOut, Plus, ReceiptText, RefreshCw, Search, ShoppingCart, TrendingUp, X } from "lucide-react";
import { FormEvent, ReactNode, useEffect, useId, useMemo, useRef, useState } from "react";
import type { ProductCategory } from "@/data/products";
import type { InventoryData, InventoryProductView, InventoryTransactionType } from "@/lib/inventory/types";
import { calculateInventoryValuation } from "@/lib/inventory/costing";
import { transportUsdToCents } from "@/lib/inventory/money";
import { SafeImage } from "@/components/SafeImage";
import { useLanguage } from "@/components/LanguageProvider";
import { AdminLanguageSwitch, useAdminText } from "@/components/admin/AdminLanguageSwitch";

const categoryLabels: Record<ProductCategory, string> = {
  coffee: "Coffee", hair: "Hair care", body: "Body care", lotions: "Lotions", household: "Household"
};
const tabs = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "products", label: "Products", icon: Boxes },
  { id: "transactions", label: "Transactions", icon: ReceiptText }
] as const;
type Tab = typeof tabs[number]["id"];
type ProductFormState = {
  id?: string;
  nameEs: string; nameEn: string; category: ProductCategory; image: string;
  descriptionEs: string; descriptionEn: string; stock: string; lowStockThreshold: string;
  costTtd: string; costUnits: string; vatRate: string; exchangeRate: string; shippingUsd: string;
  inlandShippingUsd: string; roundProductCostUp: boolean; salePriceUsd: string; publicVisible: boolean;
};
const emptyProduct: ProductFormState = {
  nameEs: "", nameEn: "", category: "household", image: "/brand/vento-cup-counter.jpg",
  descriptionEs: "", descriptionEn: "", stock: "0", lowStockThreshold: "2", costTtd: "",
  costUnits: "1", vatRate: "12", exchangeRate: "6.8", shippingUsd: "0", inlandShippingUsd: "0",
  roundProductCostUp: true, salePriceUsd: "", publicVisible: true
};

function formatMoney(cents: number | null): string {
  if (cents === null) return "Not set";
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(cents / 100);
}
function cents(value: string): number | null {
  return value.trim() ? Math.round(Number(value) * 100) : null;
}
function formFromProduct(product: InventoryProductView): ProductFormState {
  return {
    id: product.id, nameEs: product.nameEs, nameEn: product.nameEn, category: product.category,
    image: product.image, descriptionEs: product.descriptionEs, descriptionEn: product.descriptionEn,
    stock: String(product.stock), lowStockThreshold: String(product.lowStockThreshold),
    costTtd: product.costTtdCents === null ? "" : String(product.costTtdCents / 100),
    costUnits: String(product.costUnits ?? 1),
    vatRate: String(product.vatRateBps / 100), exchangeRate: String(product.exchangeRate),
    shippingUsd: String(product.shippingUsdCents / 100), inlandShippingUsd: String(product.inlandShippingUsdCents / 100),
    roundProductCostUp: product.roundProductCostUp,
    salePriceUsd: product.salePriceUsdCents === null ? "" : String(product.salePriceUsdCents / 100), publicVisible: product.publicVisible
  };
}
function apiPayload(form: ProductFormState) {
  return {
    id: form.id, nameEs: form.nameEs, nameEn: form.nameEn, category: form.category,
    image: form.image, descriptionEs: form.descriptionEs, descriptionEn: form.descriptionEn,
    stock: Number(form.stock), lowStockThreshold: Number(form.lowStockThreshold),
    costTtdCents: cents(form.costTtd), costUnits: Number(form.costUnits), vatRateBps: Math.round(Number(form.vatRate) * 100),
    exchangeRate: Number(form.exchangeRate), shippingUsdCents: cents(form.shippingUsd) || 0,
    inlandShippingUsdCents: transportUsdToCents(form.inlandShippingUsd),
    roundProductCostUp: form.roundProductCostUp, salePriceUsdCents: cents(form.salePriceUsd), publicVisible: form.publicVisible
  };
}
function Stat({ label, value, icon: Icon }: { label: string; value: string; icon: typeof Boxes }) {
  const t = useAdminText();
  return <div className="min-w-0 border-b border-gray-200 py-3 md:border-b-0 md:border-r md:px-4 md:last:border-r-0">
    <p className="flex items-center gap-2 text-xs font-medium text-gray-500"><Icon className="h-4 w-4 shrink-0 text-forest" />{t(label)}</p>
    <p className="mt-2 text-xl font-semibold tabular-nums text-gray-900 sm:text-2xl">{t(String(value))}</p>
  </div>;
}
function ErrorMessage({ message }: { message: string }) {
  const t = useAdminText();
  return message ? <p role="alert" className="flex items-start gap-2 rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-800"><AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />{t(message)}</p> : null;
}

export function AdminDashboard() {
  const t = useAdminText();
  const { language } = useLanguage();
  const productName = (product: InventoryProductView) => language === "es" ? product.nameEs : product.nameEn;
  const money = (amount: number | null) => amount === null ? t("Not set") : formatMoney(amount);
  const [data, setData] = useState<InventoryData | null>(null);
  const [tab, setTab] = useState<Tab>("overview");
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<"all" | ProductCategory>("all");
  const [lowOnly, setLowOnly] = useState(false);
  const [form, setForm] = useState<ProductFormState | null>(null);
  const [transactionProduct, setTransactionProduct] = useState<InventoryProductView | null>(null);
  const [transactionType, setTransactionType] = useState<InventoryTransactionType>("sale");
  const [transactionQuantity, setTransactionQuantity] = useState("1");
  const [transactionNote, setTransactionNote] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const tabPrefix = useId();

  async function loadData() {
    const response = await fetch("/api/admin/inventory", { cache: "no-store" });
    const payload = await response.json().catch(() => ({})) as InventoryData & { error?: string };
    if (!response.ok) throw new Error(payload.error || "Inventory unavailable");
    setData(payload); setError("");
  }
  useEffect(() => {
    let cancelled = false;
    fetch("/api/admin/inventory", { cache: "no-store" }).then(async response => {
      const payload = await response.json().catch(() => ({})) as InventoryData & { error?: string };
      if (!response.ok) throw new Error(payload.error || "Inventory unavailable");
      if (!cancelled) setData(payload);
    }).catch((e: unknown) => { if (!cancelled) setError(e instanceof Error ? e.message : "Inventory unavailable"); });
    return () => { cancelled = true; };
  }, []);
  const filteredProducts = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase();
    return data?.products.filter(product =>
      (!normalized || `${product.nameEs} ${product.nameEn}`.toLocaleLowerCase().includes(normalized)) &&
      (category === "all" || product.category === category) && (!lowOnly || product.lowStock)
    ) || [];
  }, [category, data, lowOnly, query]);
  const valuation = data ? calculateInventoryValuation(data.products) : null;
  const activeTab = tabs.find(item => item.id === tab)!;

  function openMovement(product: InventoryProductView, type: InventoryTransactionType) {
    setError(""); setTransactionProduct(product); setTransactionType(type);
    setTransactionQuantity("1"); setTransactionNote("");
  }
  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" }); window.location.reload();
  }
  async function saveProduct(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); if (!form) return;
    setBusy(true); setError("");
    try {
      const response = await fetch(form.id ? `/api/admin/products/${form.id}` : "/api/admin/products", {
        method: form.id ? "PATCH" : "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(apiPayload(form))
      });
      const payload = await response.json().catch(() => ({})) as { error?: string };
      if (!response.ok) throw new Error(payload.error || "Unable to save product");
      await loadData(); setForm(null);
    } catch (e) { setError(e instanceof Error ? e.message : "Unable to save product"); }
    finally { setBusy(false); }
  }
  async function saveTransaction(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); if (!transactionProduct) return;
    setBusy(true); setError("");
    try {
      const response = await fetch("/api/admin/transactions", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: transactionProduct.id, type: transactionType, quantity: Number(transactionQuantity), note: transactionNote })
      });
      const payload = await response.json().catch(() => ({})) as { error?: string };
      if (!response.ok) throw new Error(payload.error || "Unable to record transaction");
      await loadData(); setTransactionProduct(null);
    } catch (e) { setError(e instanceof Error ? e.message : "Unable to record transaction"); }
    finally { setBusy(false); }
  }

  return <div className="min-h-screen bg-[#f7f8fa] text-gray-900">
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white">
      <div className="mx-auto flex min-h-16 max-w-7xl items-center justify-between gap-2 px-3 sm:px-6">
        <div className="flex min-w-0 items-center gap-2"><Boxes className="h-6 w-6 shrink-0 text-forest" /><span className="hidden text-base font-semibold sm:inline">Vento<span className="font-normal text-gray-500">{t(" / Inventory")}</span></span></div>
        <div className="flex shrink-0 gap-1">
          <AdminLanguageSwitch />
          <Link href="/products" aria-label={t("Open storefront")} title={t("Open storefront")} className="grid h-11 w-11 place-items-center rounded-md hover:bg-gray-100"><ArrowUpRight className="h-5 w-5" /></Link>
          <button type="button" aria-label={t("Refresh inventory")} title={t("Refresh inventory")} onClick={() => loadData().catch((e: unknown) => setError(e instanceof Error ? e.message : "Inventory unavailable"))} className="hidden h-11 w-11 place-items-center rounded-md hover:bg-gray-100 sm:grid"><RefreshCw className="h-5 w-5" /></button>
          <button type="button" aria-label={t("Add product")} title={t("Add product")} onClick={() => { setError(""); setForm({ ...emptyProduct }); }} className="grid h-11 w-11 place-items-center rounded-md bg-forest text-white hover:bg-espresso"><Plus className="h-5 w-5" /></button>
          <button type="button" aria-label={t("Sign out")} title={t("Sign out")} onClick={logout} className="grid h-11 w-11 place-items-center rounded-md hover:bg-gray-100"><LogOut className="h-5 w-5" /></button>
        </div>
      </div>
    </header>
    <nav role="tablist" aria-label={t("Inventory views")} className="fixed inset-x-0 bottom-0 z-50 grid grid-cols-3 border-t border-gray-200 bg-white px-2 pb-[calc(0.5rem+env(safe-area-inset-bottom))] pt-2 md:sticky md:top-16 md:mx-auto md:flex md:max-w-7xl md:gap-2 md:border-t-0 md:border-b md:bg-[#f7f8fa] md:px-6 md:pb-2">
      {tabs.map((item, index) => <button key={item.id} id={`${tabPrefix}-${item.id}`} type="button" role="tab" aria-selected={tab === item.id} aria-controls={`${tabPrefix}-panel`} tabIndex={tab === item.id ? 0 : -1} onClick={() => setTab(item.id)} onKeyDown={event => {
        const next = event.key === "ArrowRight" ? (index + 1) % tabs.length : event.key === "ArrowLeft" ? (index + tabs.length - 1) % tabs.length : event.key === "Home" ? 0 : event.key === "End" ? tabs.length - 1 : null;
        if (next !== null) { event.preventDefault(); setTab(tabs[next].id); document.getElementById(`${tabPrefix}-${tabs[next].id}`)?.focus(); }
      }} className={`flex min-h-12 min-w-0 flex-col items-center justify-center gap-1 rounded-md px-2 text-xs font-semibold md:min-h-11 md:flex-row md:gap-2 md:px-4 md:text-sm ${tab === item.id ? "bg-forest text-white" : "text-gray-600 hover:bg-gray-100"}`}><item.icon className="h-5 w-5 shrink-0" />{t(item.label)}</button>)}
    </nav>
    <main className="mx-auto max-w-7xl px-4 pb-[calc(6rem+env(safe-area-inset-bottom))] pt-5 sm:px-6 md:pb-10">
      <h1 className="text-xl font-semibold">{t(activeTab.label)}</h1>
      {!form && !transactionProduct && error && <div className="mt-4"><ErrorMessage message={error} /></div>}
      {!data && !error && <p role="status" className="mt-6 text-sm text-gray-500">{t("Loading inventory...")}</p>}
      {data && <>
        <section aria-label={t("Inventory totals")} className={`${tab === "overview" ? "grid" : "hidden md:grid"} mt-3 grid-cols-2 gap-x-5 md:grid-cols-5 md:gap-x-0 md:border-b md:border-gray-200 md:pb-4`}>
          <Stat label="Products" value={String(data.summary.productCount)} icon={Boxes} />
          <Stat label="Units in stock" value={String(data.summary.unitsInStock)} icon={ShoppingCart} />
          <Stat label="Inventory value" value={money(data.summary.inventoryValueUsdCents)} icon={CircleDollarSign} />
          <Stat label="Gross sales" value={money(data.summary.revenueUsdCents)} icon={TrendingUp} />
          <Stat label="Gross profit" value={money(data.summary.grossProfitUsdCents)} icon={CircleDollarSign} />
        </section>
        <div id={`${tabPrefix}-panel`} role="tabpanel" aria-labelledby={`${tabPrefix}-${tab}`} className="mt-6">
          {tab === "overview" && <>
            {valuation && <section aria-label={t("Inventory cost breakdown")} className="border-b border-gray-200 pb-6">
              <h2 className="text-base font-semibold">{t("Stock cost breakdown")}</h2>
              <dl className="mt-3 grid gap-x-8 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
                {([
                  ["Wholesale goods, before VAT", valuation.wholesaleUsdCents],
                  ["VAT paid", valuation.vatUsdCents],
                  ["Goods including VAT", valuation.supplierUsdCents],
                  ["International shipping", valuation.internationalShippingUsdCents],
                  ["Inland transport", valuation.inlandShippingUsdCents],
                  ["Landed cost before rounding", valuation.unroundedLandedUsdCents],
                  ["Whole-dollar rounding allowance", valuation.roundingAllowanceUsdCents],
                  ["Inventory value", valuation.inventoryValueUsdCents]
                ] as const).map(([label, amount]) => <div key={t(label)} className="flex items-center justify-between gap-3 text-sm"><dt className="text-gray-500">{t(label)}</dt><dd className="shrink-0 font-semibold tabular-nums">{money(amount)}</dd></div>)}
              </dl>
              {valuation.unpricedUnits > 0 && <p className="mt-3 text-sm text-red-800">{t("Uncosted units: ")}{valuation.unpricedUnits}</p>}
            </section>}
            {valuation && <section aria-label={t("Sales forecast")} className="mt-6 border-b border-gray-200 pb-6">
              <h2 className="text-base font-semibold">{t("Sales forecast")}</h2>
              <dl className="mt-3 grid gap-4 sm:grid-cols-3">
                {([["Priced units in stock", String(valuation.forecastUnits)], ["Potential revenue", money(valuation.potentialRevenueUsdCents)], ["Potential gross profit", money(valuation.potentialGrossProfitUsdCents)]] as const).map(([label, value]) => <div key={t(label)}><dt className="text-sm text-gray-500">{t(label)}</dt><dd className="mt-1 text-xl font-semibold tabular-nums">{t(String(value))}</dd></div>)}
              </dl>
              {(valuation.unpricedUnits > 0 || valuation.unpricedRetailUnits > 0) && <p className="mt-3 text-sm text-red-800">{t("Forecast excludes units without a cost or selling price.")}</p>}
              <p className="mt-3 text-xs text-gray-500">{t("Unrecorded expenses excluded from projected profit.")}</p>
              <details className="mt-4"><summary className="cursor-pointer py-3 text-sm font-medium text-forest">{t("Forecast by product")}</summary>
                <div className="divide-y divide-gray-200">{data.products.filter(product => product.stock > 0).map(product => <div key={product.id} className="py-3">
                  <p className="break-words text-sm font-medium">{productName(product)}</p>
                  <dl className="mt-2 grid grid-cols-3 gap-2 text-xs">{([["Stock cost", product.landedCostUsdCents === null ? null : product.landedCostUsdCents * product.stock], ["Potential sales", product.salePriceUsdCents === null ? null : product.salePriceUsdCents * product.stock], ["Potential profit", product.grossProfitPerUnitUsdCents === null ? null : product.grossProfitPerUnitUsdCents * product.stock]] as const).map(([label, amount]) => <div key={t(label)}><dt className="text-gray-500">{t(label)}</dt><dd className="mt-1 font-semibold tabular-nums">{money(amount)}</dd></div>)}</dl>
                  <p className="mt-2 text-xs text-gray-500">{product.stock}{t(" units / ")}{money(product.salePriceUsdCents)}{t(" retail per unit")}</p>
                </div>)}</div>
              </details>
            </section>}
            <div className="mt-6 grid gap-8 lg:grid-cols-2">
              <section><h2 className="text-base font-semibold">{t("Low stock ")}<span className="font-normal text-gray-500">({data.summary.lowStockCount})</span></h2>
                <div className="mt-3 divide-y divide-gray-200">{data.products.filter(p => p.lowStock).slice(0, 8).map(product => <div key={product.id} className="flex items-center gap-3 py-3">
                  <Thumbnail product={product} small />
                  <div className="min-w-0 flex-1"><p className="break-words text-sm font-medium">{productName(product)}</p><p className="mt-1 text-xs text-gray-500">{product.stock}{t(" in stock / low at ")}{product.lowStockThreshold}</p></div>
                  <button type="button" onClick={() => openMovement(product, "restock")} className="min-h-11 shrink-0 rounded-md border border-gray-300 bg-white px-3 text-xs font-semibold hover:bg-gray-100">{t("Restock")}</button>
                </div>)}</div>
                {!data.summary.lowStockCount && <p className="py-5 text-sm text-gray-500">{t("No low-stock items.")}</p>}
                <button type="button" onClick={() => { setLowOnly(true); setTab("products"); }} className="mt-3 min-h-11 text-sm font-semibold text-forest">{t("View products")}</button>
              </section>
              <section><h2 className="text-base font-semibold">{t("Recent transactions")}</h2><div className="mt-3 divide-y divide-gray-200">{data.transactions.slice(0, 7).map(transaction => <div key={transaction.id} className="py-3">
                <p className="break-words text-sm font-medium">{language === "es" ? data.products.find(p => p.id === transaction.productId)?.nameEs || transaction.productName : transaction.productName}</p>
                <p className="mt-1 flex justify-between gap-2 text-xs text-gray-500"><span className="capitalize">{t(transaction.type)} / {transaction.quantity}{t(" units")}</span>{transaction.type === "sale" && <span>{money(transaction.profitUsdCents)}{t(" profit")}</span>}</p>
              </div>)}</div>{!data.transactions.length && <p className="py-5 text-sm text-gray-500">{t("No transactions recorded.")}</p>}</section>
            </div>
          </>}
          {tab === "products" && <section aria-label={t("Inventory products")}>
            <div className="grid gap-3 sm:grid-cols-[1fr_12rem_auto]">
              <label className="relative block"><Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" /><span className="sr-only">{t("Search inventory products")}</span><input value={query} onChange={e => setQuery(e.target.value)} placeholder={t("Search products")} className="min-h-11 w-full rounded-md border border-gray-300 bg-white pl-9 pr-3 text-base outline-none focus:border-forest sm:text-sm" /></label>
              <label className="relative block"><span className="sr-only">{t("Category")}</span><select value={category} onChange={e => setCategory(e.target.value as "all" | ProductCategory)} className="min-h-11 w-full appearance-none rounded-md border border-gray-300 bg-white px-3 pr-9 text-base sm:text-sm"><option value="all">{t("All categories")}</option>{Object.entries(categoryLabels).map(([value, label]) => <option key={t(String(value))} value={t(String(value))}>{t(label)}</option>)}</select><ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" /></label>
              <label className="flex min-h-11 items-center gap-2 text-sm"><input type="checkbox" checked={lowOnly} onChange={e => setLowOnly(e.target.checked)} className="h-5 w-5 accent-forest" />{t("Low stock only")}</label>
            </div>
            <p className="mt-4 text-xs text-gray-500">{filteredProducts.length}{t(" products")}</p>
            <div className="mt-3 grid gap-3 md:grid-cols-2 xl:grid-cols-3">{filteredProducts.map(product => <article key={product.id} data-testid="inventory-product" className="flex min-w-0 flex-col rounded-md border border-gray-200 bg-white">
              <div className="flex gap-3 p-4"><Thumbnail product={product} /><div className="min-w-0 flex-1"><p className="text-xs text-gray-500">{t(categoryLabels[product.category])}</p><h2 className="mt-1 break-words text-sm font-semibold leading-5">{productName(product)}</h2><p className={`mt-2 flex items-center gap-1 text-xs font-medium ${product.lowStock ? "text-red-700" : "text-forest"}`}>{product.lowStock && <AlertTriangle className="h-3.5 w-3.5 shrink-0" />}{product.stock}{t(" in stock")}</p></div></div>
              <dl className="grid grid-cols-3 gap-2 border-t border-gray-100 px-4 py-3 text-xs">{([["Landed", product.landedCostUsdCents], ["Retail", product.salePriceUsdCents], ["Unit profit", product.grossProfitPerUnitUsdCents]] as const).map(([label, amount]) => <div key={t(label)}><dt className="text-gray-500">{t(label)}</dt><dd className="mt-1 font-semibold tabular-nums">{money(amount)}</dd></div>)}</dl>
              <div className="mt-auto flex gap-2 border-t border-gray-100 px-4 py-3">
                <button type="button" onClick={() => openMovement(product, "sale")} className="inline-flex min-h-11 flex-1 items-center justify-center gap-1.5 rounded-md bg-forest px-2 text-xs font-semibold text-white hover:bg-espresso"><ShoppingCart className="h-4 w-4" />{t("Sale")}</button>
                <button type="button" onClick={() => openMovement(product, "restock")} className="inline-flex min-h-11 flex-1 items-center justify-center gap-1.5 rounded-md border border-gray-300 px-2 text-xs font-semibold hover:bg-gray-100"><Plus className="h-4 w-4" />{t("Restock")}</button>
                <button type="button" aria-label={`Edit ${productName(product)}`} title={`Edit ${productName(product)}`} onClick={() => { setError(""); setForm(formFromProduct(product)); }} className="grid h-11 w-11 shrink-0 place-items-center rounded-md border border-gray-300 hover:bg-gray-100"><Edit3 className="h-4 w-4" /></button>
              </div>
            </article>)}</div>
            {!filteredProducts.length && <p className="py-10 text-center text-sm text-gray-500">{t("No products match this view.")}</p>}
          </section>}
          {tab === "transactions" && <section aria-label={t("Inventory transactions")}>
            <div className="divide-y divide-gray-200 md:hidden">{data.transactions.map(transaction => <article key={transaction.id} className="py-4 first:pt-0">
              <h2 className="break-words text-sm font-semibold">{language === "es" ? data.products.find(p => p.id === transaction.productId)?.nameEs || transaction.productName : transaction.productName}</h2><p className="mt-1 text-xs text-gray-500">{new Date(transaction.createdAt).toLocaleDateString(language === "es" ? "es-VE" : "en-US")}</p>
              <p className="mt-2 text-xs font-medium capitalize">{t(transaction.id.startsWith("opening-") ? "Opening stock" : transaction.type)} / {transaction.quantity}{t(" units")}</p>
              <dl className="mt-3 grid grid-cols-3 gap-2 text-xs">{([["Stock cost", money(transaction.totalCostUsdCents)], ["Revenue", transaction.type === "sale" ? money(transaction.totalRevenueUsdCents) : "No sale"], ["Profit", transaction.type === "sale" ? money(transaction.profitUsdCents) : "No sale"]] as const).map(([label, value]) => <div key={t(label)}><dt className="text-gray-500">{t(label)}</dt><dd className="mt-1 break-words font-medium tabular-nums">{t(String(value))}</dd></div>)}</dl>
              {transaction.note && <details className="mt-2 text-xs text-gray-500"><summary className="cursor-pointer py-2">{t("Source / note")}</summary><p className="break-words leading-5">{transaction.note}</p></details>}
            </article>)}</div>
            <div className="hidden overflow-x-auto md:block"><table className="w-full text-left text-sm"><thead className="border-b border-gray-300 text-xs text-gray-500"><tr>{["Date", "Product", "Type", "Qty", "Stock cost", "Revenue", "Profit"].map(label => <th key={t(label)} className="px-3 py-3 font-medium">{t(label)}</th>)}</tr></thead><tbody className="divide-y divide-gray-200">{data.transactions.map(transaction => <tr key={transaction.id}><td className="whitespace-nowrap px-3 py-4 text-gray-500">{new Date(transaction.createdAt).toLocaleDateString(language === "es" ? "es-VE" : "en-US")}</td><td className="px-3 py-4 font-medium">{language === "es" ? data.products.find(p => p.id === transaction.productId)?.nameEs || transaction.productName : transaction.productName}{transaction.note && <details className="mt-2 text-xs font-normal text-gray-500"><summary className="cursor-pointer py-2">{t("Source / note")}</summary><p className="break-words leading-5">{transaction.note}</p></details>}</td><td className="px-3 py-4 capitalize">{t(transaction.id.startsWith("opening-") ? "Opening stock" : transaction.type)}</td><td className="px-3 py-4 tabular-nums">{transaction.quantity}</td><td className="whitespace-nowrap px-3 py-4 tabular-nums">{money(transaction.totalCostUsdCents)}</td><td className="whitespace-nowrap px-3 py-4 tabular-nums">{transaction.type === "sale" ? money(transaction.totalRevenueUsdCents) : "No sale"}</td><td className="whitespace-nowrap px-3 py-4 font-semibold tabular-nums">{transaction.type === "sale" ? money(transaction.profitUsdCents) : "No sale"}</td></tr>)}</tbody></table></div>
            {!data.transactions.length && <p className="py-10 text-center text-sm text-gray-500">{t("No transactions recorded.")}</p>}
          </section>}
        </div>
      </>}
    </main>
    {form && <AdminDialog title={form.id ? "Edit product" : "Add product"} onClose={() => setForm(null)} wide>
      <form onSubmit={saveProduct} className="grid gap-4 p-4 sm:grid-cols-2 sm:p-6">
        {error && <div className="sm:col-span-2"><ErrorMessage message={error} /></div>}
        <Field label="Name in Spanish" value={form.nameEs} onChange={value => setForm({ ...form, nameEs: value })} required />
        <Field label="Name in English" value={form.nameEn} onChange={value => setForm({ ...form, nameEn: value })} required />
        <label className="block text-sm font-medium">{t("Category")}<select value={form.category} onChange={e => setForm({ ...form, category: e.target.value as ProductCategory })} className="mt-2 min-h-11 w-full rounded-md border border-gray-300 bg-white px-3 text-base sm:text-sm">{Object.entries(categoryLabels).map(([value, label]) => <option key={t(String(value))} value={t(String(value))}>{t(label)}</option>)}</select></label>
        <Field label="Image path or URL" value={form.image} onChange={value => setForm({ ...form, image: value })} />
        <Field label={form.id ? "Current stock" : "Opening stock"} type="number" disabled={Boolean(form.id)} value={form.stock} onChange={value => setForm({ ...form, stock: value })} />
        <Field label="Low-stock threshold" type="number" value={form.lowStockThreshold} onChange={value => setForm({ ...form, lowStockThreshold: value })} />
        <h3 className="border-t border-gray-200 pt-4 text-sm font-semibold sm:col-span-2">{t("Supplier costs and pricing")}</h3>
        <Field label="Supplier pack cost before VAT, TT$" type="number" step="0.01" value={form.costTtd} onChange={value => setForm({ ...form, costTtd: value })} />
        <Field label="Selling units per supplier pack" type="number" value={form.costUnits} onChange={value => setForm({ ...form, costUnits: value })} required />
        <Field label="VAT rate, %" type="number" step="0.01" value={form.vatRate} onChange={value => setForm({ ...form, vatRate: value })} />
        <Field label="Exchange rate, TT$ per US$" type="number" step="0.01" value={form.exchangeRate} onChange={value => setForm({ ...form, exchangeRate: value })} />
        <Field label="International shipping, US$" type="number" step="0.01" value={form.shippingUsd} onChange={value => setForm({ ...form, shippingUsd: value })} />
        <Field label="Inland transport allocation, US$" type="number" step="any" value={form.inlandShippingUsd} onChange={value => setForm({ ...form, inlandShippingUsd: value })} />
        <Field label="Selling price, US$" type="number" step="0.01" value={form.salePriceUsd} onChange={value => setForm({ ...form, salePriceUsd: value })} />
        <label className="flex min-h-11 items-center gap-3 text-sm"><input type="checkbox" checked={form.roundProductCostUp} onChange={e => setForm({ ...form, roundProductCostUp: e.target.checked })} className="h-5 w-5 shrink-0 accent-forest" />{t("Round supplier cost up to whole US$")}</label>
        <label className="flex min-h-11 items-center gap-3 text-sm"><input type="checkbox" checked={form.publicVisible} onChange={e => setForm({ ...form, publicVisible: e.target.checked })} className="h-5 w-5 shrink-0 accent-forest" />{t("Show in public catalog")}</label>
        <Field label="Description in Spanish" value={form.descriptionEs} onChange={value => setForm({ ...form, descriptionEs: value })} />
        <Field label="Description in English" value={form.descriptionEn} onChange={value => setForm({ ...form, descriptionEn: value })} />
        <div className="sticky bottom-0 -mx-4 -mb-4 flex justify-end gap-2 border-t border-gray-200 bg-white p-4 sm:col-span-2 sm:-mx-6 sm:-mb-6">
          <button type="button" onClick={() => setForm(null)} className="min-h-11 rounded-md border border-gray-300 px-4 text-sm font-semibold">{t("Cancel")}</button>
          <button type="submit" disabled={busy} className="inline-flex min-h-11 items-center gap-2 rounded-md bg-forest px-4 text-sm font-semibold text-white disabled:opacity-50"><Check className="h-4 w-4" />{t(busy ? "Saving..." : "Save product")}</button>
        </div>
      </form>
    </AdminDialog>}
    {transactionProduct && <AdminDialog title={transactionType === "sale" ? "Record sale" : transactionType === "restock" ? "Add stock" : "Stock adjustment"} onClose={() => setTransactionProduct(null)}>
      <form onSubmit={saveTransaction} className="space-y-4 p-4 sm:p-6">
        <p className="break-words text-sm font-semibold">{productName(transactionProduct)}</p><ErrorMessage message={error} />
        <label className="block text-sm font-medium">{t("Movement")}<select value={transactionType} onChange={e => setTransactionType(e.target.value as InventoryTransactionType)} className="mt-2 min-h-11 w-full rounded-md border border-gray-300 bg-white px-3 text-base sm:text-sm"><option value="sale">{t("Record sale")}</option><option value="restock">{t("Add stock")}</option><option value="adjustment">{t("Stock adjustment")}</option></select></label>
        <Field label={transactionType === "adjustment" ? "Quantity (+/-)" : "Quantity"} type="number" value={transactionQuantity} onChange={setTransactionQuantity} required />
        <Field label="Note" value={transactionNote} onChange={setTransactionNote} />
        <dl className="grid grid-cols-2 gap-4 border-y border-gray-200 py-4 text-sm">
          <div><dt className="text-gray-500">{t("Current stock")}</dt><dd className="mt-1 font-semibold">{transactionProduct.stock}</dd></div>
          <div><dt className="text-gray-500">{t("After movement")}</dt><dd className="mt-1 font-semibold">{transactionProduct.stock + (transactionType === "sale" ? -Number(transactionQuantity || 0) : Number(transactionQuantity || 0))}</dd></div>
          <div><dt className="text-gray-500">{t("Unit landed cost")}</dt><dd className="mt-1 font-semibold">{money(transactionProduct.landedCostUsdCents)}</dd></div>
          <div><dt className="text-gray-500">{t("Unit profit")}</dt><dd className="mt-1 font-semibold">{money(transactionProduct.grossProfitPerUnitUsdCents)}</dd></div>
        </dl>
        <div className="flex justify-end gap-2"><button type="button" onClick={() => setTransactionProduct(null)} className="min-h-11 rounded-md border border-gray-300 px-4 text-sm font-semibold">{t("Cancel")}</button><button type="submit" disabled={busy} className="min-h-11 rounded-md bg-forest px-4 text-sm font-semibold text-white disabled:opacity-50">{t(busy ? "Saving..." : "Save movement")}</button></div>
      </form>
    </AdminDialog>}
  </div>;
}
function Thumbnail({ product, small = false }: { product: InventoryProductView; small?: boolean }) {
  const { language } = useLanguage();
  return <div data-testid="inventory-thumbnail" className={`relative isolate shrink-0 overflow-hidden rounded-md border border-gray-100 bg-gray-50 ${small ? "h-11 w-11" : "h-24 w-20"}`}><SafeImage src={product.image} alt={language === "es" ? product.nameEs : product.nameEn} variant="thumbnail" sizes={small ? "44px" : "80px"} /></div>;
}
function AdminDialog({ title, onClose, children, wide = false }: { title: string; onClose: () => void; children: ReactNode; wide?: boolean }) {
  const t = useAdminText();
  const ref = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  useEffect(() => {
    const dialog = ref.current;
    const previousOverflow = document.body.style.overflow;
    dialog?.showModal(); document.body.style.overflow = "hidden";
    return () => { dialog?.close(); document.body.style.overflow = previousOverflow; };
  }, []);
  return <dialog ref={ref} aria-labelledby={titleId} onCancel={event => { event.preventDefault(); onClose(); }} className={`m-auto max-h-[calc(100dvh_-_1.5rem)] w-[calc(100%_-_1.5rem)] overflow-y-auto rounded-lg border border-gray-200 bg-white p-0 text-gray-900 shadow-xl backdrop:bg-black/40 ${wide ? "max-w-2xl" : "max-w-md"}`}>
    <header className="sticky top-0 z-10 flex items-center justify-between gap-3 border-b border-gray-200 bg-white px-4 py-3 sm:px-6"><h2 id={titleId} className="min-w-0 break-words text-lg font-semibold">{t(title)}</h2><button type="button" aria-label={`${t("Close")} ${t(title)}`} title={t("Close")} onClick={onClose} className="grid h-11 w-11 shrink-0 place-items-center rounded-md hover:bg-gray-100"><X className="h-5 w-5" /></button></header>{children}
  </dialog>;
}
function Field({ label, value, onChange, type = "text", step, required = false, disabled = false }: { label: string; value: string; onChange: (value: string) => void; type?: string; step?: string; required?: boolean; disabled?: boolean }) {
  const t = useAdminText();
  return <label className="block min-w-0 text-sm font-medium">{t(label)}<input type={type} step={step} required={required} disabled={disabled} value={t(String(value))} onChange={e => onChange(e.target.value)} className="mt-2 min-h-11 w-full rounded-md border border-gray-300 bg-white px-3 text-base font-normal outline-none focus:border-forest disabled:bg-gray-100 disabled:text-gray-500 sm:text-sm" /></label>;
}

"use client";

import Link from "next/link";
import { AlertTriangle, ArrowUpRight, Boxes, Check, ChevronDown, CircleDollarSign, Edit3, LogOut, Plus, RefreshCw, Search, ShoppingCart, TrendingUp, X } from "lucide-react";
import { FormEvent, useEffect, useMemo, useState } from "react";
import type { ProductCategory } from "@/data/products";
import type { InventoryData, InventoryProductView, InventoryTransactionType } from "@/lib/inventory/types";
import { SafeImage } from "@/components/SafeImage";

const categoryLabels: Record<ProductCategory, string> = {
  coffee: "Coffee",
  hair: "Hair care",
  body: "Body care",
  lotions: "Lotions",
  household: "Household"
};

type ProductFormState = {
  id?: string;
  nameEs: string;
  nameEn: string;
  category: ProductCategory;
  image: string;
  descriptionEs: string;
  descriptionEn: string;
  stock: string;
  lowStockThreshold: string;
  costTtd: string;
  vatRate: string;
  exchangeRate: string;
  shippingUsd: string;
  inlandShippingUsd: string;
  roundProductCostUp: boolean;
  salePriceUsd: string;
  publicVisible: boolean;
};

const emptyProduct: ProductFormState = {
  nameEs: "",
  nameEn: "",
  category: "household",
  image: "/brand/vento-cup-counter.jpg",
  descriptionEs: "",
  descriptionEn: "",
  stock: "0",
  lowStockThreshold: "2",
  costTtd: "",
  vatRate: "12",
  exchangeRate: "6.8",
  shippingUsd: "0",
  inlandShippingUsd: "0",
  roundProductCostUp: true,
  salePriceUsd: "",
  publicVisible: true
};

function money(cents: number | null): string {
  if (cents === null) return "Not set";
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(cents / 100);
}

function cents(value: string): number | null {
  if (!value.trim()) return null;
  return Math.round(Number(value) * 100);
}

function formFromProduct(product: InventoryProductView): ProductFormState {
  return {
    id: product.id,
    nameEs: product.nameEs,
    nameEn: product.nameEn,
    category: product.category,
    image: product.image,
    descriptionEs: product.descriptionEs,
    descriptionEn: product.descriptionEn,
    stock: String(product.stock),
    lowStockThreshold: String(product.lowStockThreshold),
    costTtd: product.costTtdCents === null ? "" : String(product.costTtdCents / 100),
    vatRate: String(product.vatRateBps / 100),
    exchangeRate: String(product.exchangeRate),
    shippingUsd: String(product.shippingUsdCents / 100),
    inlandShippingUsd: String(product.inlandShippingUsdCents / 100),
    roundProductCostUp: product.roundProductCostUp,
    salePriceUsd: product.salePriceUsdCents === null ? "" : String(product.salePriceUsdCents / 100),
    publicVisible: product.publicVisible
  };
}

function apiPayload(form: ProductFormState) {
  return {
    id: form.id,
    nameEs: form.nameEs,
    nameEn: form.nameEn,
    category: form.category,
    image: form.image,
    descriptionEs: form.descriptionEs,
    descriptionEn: form.descriptionEn,
    stock: Number(form.stock),
    lowStockThreshold: Number(form.lowStockThreshold),
    costTtdCents: cents(form.costTtd),
    vatRateBps: Math.round(Number(form.vatRate) * 100),
    exchangeRate: Number(form.exchangeRate),
    shippingUsdCents: cents(form.shippingUsd) || 0,
    inlandShippingUsdCents: cents(form.inlandShippingUsd) || 0,
    roundProductCostUp: form.roundProductCostUp,
    salePriceUsdCents: cents(form.salePriceUsd),
    publicVisible: form.publicVisible
  };
}

function Stat({ label, value, icon: Icon, accent = "forest" }: { label: string; value: string; icon: typeof Boxes; accent?: "forest" | "clay" | "espresso" }) {
  const colors = { forest: "bg-forest text-cream", clay: "bg-clay text-cream", espresso: "bg-espresso text-cream" };
  return <div className="border border-espresso/10 bg-white p-4 shadow-soft sm:p-5"><div className={`grid h-9 w-9 place-items-center rounded-lg ${colors[accent]}`}><Icon className="h-4 w-4" /></div><p className="mt-5 text-xs font-bold uppercase tracking-[0.14em] text-matte/50">{label}</p><p className="mt-2 text-2xl font-semibold text-espresso">{value}</p></div>;
}

export function AdminDashboard() {
  const [data, setData] = useState<InventoryData | null>(null);
  const [tab, setTab] = useState<"overview" | "products" | "transactions">("overview");
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

  async function loadData() {
    setError("");
    const response = await fetch("/api/admin/inventory", { cache: "no-store" });
    const payload = await response.json().catch(() => ({})) as InventoryData & { error?: string };
    if (!response.ok) throw new Error(payload.error || "Inventory unavailable");
    setData(payload);
  }

  useEffect(() => {
    let cancelled = false;
    fetch("/api/admin/inventory", { cache: "no-store" })
      .then(async (response) => {
        const payload = await response.json().catch(() => ({})) as InventoryData & { error?: string };
        if (!response.ok) throw new Error(payload.error || "Inventory unavailable");
        if (!cancelled) setData(payload);
      })
      .catch((loadError: unknown) => {
        if (!cancelled) setError(loadError instanceof Error ? loadError.message : "Inventory unavailable");
      });
    return () => { cancelled = true; };
  }, []);

  const filteredProducts = useMemo(() => {
    if (!data) return [];
    const normalized = query.trim().toLocaleLowerCase();
    return data.products.filter((product) => {
      const matchesQuery = !normalized || `${product.nameEs} ${product.nameEn}`.toLocaleLowerCase().includes(normalized);
      const matchesCategory = category === "all" || product.category === category;
      return matchesQuery && matchesCategory && (!lowOnly || product.lowStock);
    });
  }, [category, data, lowOnly, query]);

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.reload();
  }

  async function saveProduct(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!form) return;
    setBusy(true);
    setError("");
    const response = await fetch(form.id ? `/api/admin/products/${form.id}` : "/api/admin/products", {
      method: form.id ? "PATCH" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(apiPayload(form))
    });
    const payload = await response.json().catch(() => ({})) as { error?: string };
    if (!response.ok) {
      setError(payload.error || "Unable to save product");
      setBusy(false);
      return;
    }
    setForm(null);
    setBusy(false);
    await loadData();
  }

  async function saveTransaction(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!transactionProduct) return;
    setBusy(true);
    setError("");
    const response = await fetch("/api/admin/transactions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId: transactionProduct.id, type: transactionType, quantity: Number(transactionQuantity), note: transactionNote })
    });
    const payload = await response.json().catch(() => ({})) as { error?: string };
    if (!response.ok) {
      setError(payload.error || "Unable to record transaction");
      setBusy(false);
      return;
    }
    setTransactionProduct(null);
    setTransactionQuantity("1");
    setTransactionNote("");
    setBusy(false);
    await loadData();
  }

  if (!data && !error) return <main className="min-h-screen bg-[#f6f0e6] px-4 py-12 text-espresso"><p className="mx-auto max-w-7xl text-sm font-semibold">Loading inventory...</p></main>;

  return (
    <main className="min-h-screen bg-[#f6f0e6] px-4 py-7 text-espresso sm:px-8 sm:py-10">
      <div className="mx-auto max-w-7xl">
        <header className="flex flex-col gap-5 border-b border-espresso/10 pb-7 sm:flex-row sm:items-end sm:justify-between">
          <div><p className="text-xs font-bold uppercase tracking-[0.2em] text-forest">Private workspace</p><h1 className="mt-2 font-serif text-4xl font-semibold">Vento inventory</h1><p className="mt-2 text-sm text-matte/60">Products, stock, costs, sales, and margins.</p></div>
          <div className="flex flex-wrap gap-2"><Link href="/products" className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-espresso/15 bg-white px-3 py-2 text-sm font-bold hover:bg-beige"><ArrowUpRight className="h-4 w-4" /> Storefront</Link><button type="button" onClick={() => loadData().catch((loadError: unknown) => setError(loadError instanceof Error ? loadError.message : "Inventory unavailable"))} className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-espresso/15 bg-white px-3 py-2 text-sm font-bold hover:bg-beige"><RefreshCw className="h-4 w-4" /> Refresh</button><button type="button" onClick={logout} className="inline-flex min-h-10 items-center gap-2 rounded-lg bg-espresso px-3 py-2 text-sm font-bold text-cream hover:bg-forest"><LogOut className="h-4 w-4" /> Sign out</button></div>
        </header>

        {error && <div className="mt-5 flex items-start gap-3 rounded-lg border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-900"><AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" /> <span>{error}</span><button type="button" aria-label="Close error" onClick={() => setError("")} className="ml-auto"><X className="h-4 w-4" /></button></div>}

        {data && <>
          <section className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            <Stat label="Products" value={String(data.summary.productCount)} icon={Boxes} />
            <Stat label="Units in stock" value={String(data.summary.unitsInStock)} icon={ShoppingCart} accent="clay" />
            <Stat label="Inventory value" value={money(data.summary.inventoryValueUsdCents)} icon={CircleDollarSign} accent="espresso" />
            <Stat label="Gross sales" value={money(data.summary.revenueUsdCents)} icon={TrendingUp} />
            <Stat label="Gross profit" value={money(data.summary.grossProfitUsdCents)} icon={CircleDollarSign} accent="clay" />
          </section>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-b border-espresso/10 pb-3">
            <div className="flex gap-1 rounded-lg border border-espresso/10 bg-white p-1">
              {(["overview", "products", "transactions"] as const).map((item) => <button key={item} type="button" onClick={() => setTab(item)} className={`min-h-10 rounded-md px-3 text-sm font-bold capitalize ${tab === item ? "bg-forest text-cream" : "text-matte/60 hover:bg-beige"}`}>{item}</button>)}
            </div>
            <button type="button" onClick={() => setForm({ ...emptyProduct })} className="inline-flex min-h-10 items-center gap-2 rounded-lg bg-forest px-4 py-2 text-sm font-bold text-cream hover:bg-espresso"><Plus className="h-4 w-4" /> Add product</button>
          </div>

          {tab === "overview" && <section className="mt-7 grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="border border-espresso/10 bg-white p-5 shadow-soft"><div className="flex items-center justify-between"><div><p className="text-xs font-bold uppercase tracking-[0.16em] text-forest">Attention</p><h2 className="mt-2 font-serif text-2xl font-semibold">Low stock</h2></div><AlertTriangle className="h-5 w-5 text-clay" /></div><div className="mt-5 divide-y divide-espresso/10">{data.products.filter((product) => product.lowStock).slice(0, 8).map((product) => <div key={product.id} className="flex items-center justify-between gap-3 py-3"><div className="min-w-0"><p className="truncate text-sm font-bold">{product.nameEn}</p><p className="mt-1 text-xs text-matte/55">{product.stock} in stock · threshold {product.lowStockThreshold}</p></div><button type="button" onClick={() => { setTransactionProduct(product); setTransactionType("restock"); }} className="shrink-0 rounded-md border border-espresso/15 px-3 py-2 text-xs font-bold hover:bg-beige">Restock</button></div>)}{!data.summary.lowStockCount && <p className="py-6 text-sm text-matte/60">No low-stock items.</p>}</div></div>
            <div className="border border-espresso/10 bg-white p-5 shadow-soft"><p className="text-xs font-bold uppercase tracking-[0.16em] text-forest">Recent activity</p><h2 className="mt-2 font-serif text-2xl font-semibold">Latest transactions</h2><div className="mt-5 divide-y divide-espresso/10">{data.transactions.slice(0, 7).map((transaction) => <div key={transaction.id} className="py-3"><div className="flex items-center justify-between gap-3"><p className="truncate text-sm font-bold">{transaction.productName}</p><span className="text-xs font-bold uppercase text-matte/45">{transaction.type}</span></div><p className="mt-1 text-xs text-matte/55">{transaction.quantity} units · {transaction.profitUsdCents === null ? "Profit pending" : `${money(transaction.profitUsdCents)} profit`}</p></div>)}{!data.transactions.length && <p className="py-6 text-sm text-matte/60">Transactions appear here after the first sale or restock.</p>}</div></div>
          </section>}

          {tab === "products" && <section className="mt-7">
            <div className="flex flex-col gap-3 border border-espresso/10 bg-white p-4 shadow-soft sm:flex-row sm:items-center"><label className="relative block min-w-0 flex-1"><Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-matte/40" /><span className="sr-only">Search products</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search products" className="min-h-11 w-full rounded-lg border border-espresso/15 pl-9 pr-3 text-sm outline-none focus:border-forest" /></label><label className="relative block sm:w-48"><span className="sr-only">Category</span><select value={category} onChange={(event) => setCategory(event.target.value as "all" | ProductCategory)} className="min-h-11 w-full appearance-none rounded-lg border border-espresso/15 bg-white px-3 pr-9 text-sm font-semibold outline-none focus:border-forest"><option value="all">All categories</option>{Object.entries(categoryLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select><ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-matte/45" /></label><button type="button" onClick={() => setLowOnly((value) => !value)} className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border px-3 text-sm font-bold ${lowOnly ? "border-clay bg-clay text-cream" : "border-espresso/15 hover:bg-beige"}`}><AlertTriangle className="h-4 w-4" /> Low stock</button></div>
            <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">{filteredProducts.map((product) => <article key={product.id} className="flex flex-col border border-espresso/10 bg-white shadow-soft"><div className="flex gap-4 border-b border-espresso/10 p-4"><div className="h-24 w-20 shrink-0 overflow-hidden rounded-lg bg-beige"><SafeImage src={product.image} alt="" variant="product" sizes="80px" /></div><div className="min-w-0 flex-1"><div className="flex items-start justify-between gap-2"><div><p className="text-[10px] font-bold uppercase tracking-[0.14em] text-forest">{categoryLabels[product.category]}</p><h2 className="mt-1 line-clamp-2 font-serif text-xl font-semibold">{product.nameEn}</h2></div>{product.lowStock && <AlertTriangle className="h-5 w-5 shrink-0 text-clay" />}</div><p className="mt-2 text-xs text-matte/55">{product.stock} in stock · low at {product.lowStockThreshold}</p></div></div><div className="grid grid-cols-3 gap-2 px-4 py-4 text-xs"><div><p className="text-matte/45">Landed</p><p className="mt-1 font-bold">{money(product.landedCostUsdCents)}</p></div><div><p className="text-matte/45">Retail</p><p className="mt-1 font-bold">{money(product.salePriceUsdCents)}</p></div><div><p className="text-matte/45">Profit</p><p className={`mt-1 font-bold ${product.grossProfitPerUnitUsdCents !== null && product.grossProfitPerUnitUsdCents < 0 ? "text-red-700" : "text-forest"}`}>{money(product.grossProfitPerUnitUsdCents)}</p></div></div><div className="mt-auto flex flex-wrap gap-2 border-t border-espresso/10 px-4 py-3"><button type="button" onClick={() => { setTransactionProduct(product); setTransactionType("sale"); }} className="inline-flex min-h-10 flex-1 items-center justify-center gap-1 rounded-md bg-forest px-3 py-2 text-xs font-bold text-cream hover:bg-espresso"><ShoppingCart className="h-3.5 w-3.5" /> Sale</button><button type="button" onClick={() => { setTransactionProduct(product); setTransactionType("restock"); }} className="inline-flex min-h-10 flex-1 items-center justify-center gap-1 rounded-md border border-espresso/15 px-3 py-2 text-xs font-bold hover:bg-beige"><Plus className="h-3.5 w-3.5" /> Restock</button><button type="button" aria-label={`Edit ${product.nameEn}`} onClick={() => setForm(formFromProduct(product))} className="grid min-h-10 w-10 place-items-center rounded-md border border-espresso/15 hover:bg-beige"><Edit3 className="h-4 w-4" /></button></div></article>)}</div>
            {!filteredProducts.length && <p className="mt-6 border border-dashed border-espresso/20 bg-white px-5 py-10 text-center text-sm text-matte/60">No products match this view.</p>}
          </section>}

          {tab === "transactions" && <section className="mt-7 border border-espresso/10 bg-white shadow-soft"><div className="overflow-x-auto"><table className="min-w-full text-left text-sm"><thead className="border-b border-espresso/10 bg-beige/40 text-xs uppercase tracking-[0.12em] text-matte/50"><tr><th className="px-4 py-3">Date</th><th className="px-4 py-3">Product</th><th className="px-4 py-3">Type</th><th className="px-4 py-3">Qty</th><th className="px-4 py-3">Revenue</th><th className="px-4 py-3">Profit</th></tr></thead><tbody className="divide-y divide-espresso/10">{data.transactions.map((transaction) => <tr key={transaction.id}><td className="whitespace-nowrap px-4 py-3 text-matte/55">{new Date(transaction.createdAt).toLocaleDateString()}</td><td className="px-4 py-3 font-semibold">{transaction.productName}</td><td className="px-4 py-3 capitalize">{transaction.type}</td><td className="px-4 py-3">{transaction.quantity}</td><td className="px-4 py-3">{money(transaction.totalRevenueUsdCents)}</td><td className="px-4 py-3 font-bold text-forest">{money(transaction.profitUsdCents)}</td></tr>)}</tbody></table></div>{!data.transactions.length && <p className="px-5 py-10 text-center text-sm text-matte/60">No transactions recorded.</p>}</section>}
        </>}
      </div>

          {form && <div className="fixed inset-0 z-[70] overflow-y-auto bg-matte/55 px-4 py-8"><div className="mx-auto max-w-2xl border border-espresso/10 bg-[#fbf6ec] shadow-2xl"><div className="flex items-center justify-between border-b border-espresso/10 px-5 py-4"><div><p className="text-xs font-bold uppercase tracking-[0.16em] text-forest">Catalog control</p><h2 className="mt-1 font-serif text-2xl font-semibold">{form.id ? "Edit product" : "Add product"}</h2></div><button type="button" aria-label="Close product form" onClick={() => setForm(null)} className="grid h-10 w-10 place-items-center rounded-md border border-espresso/15 hover:bg-beige"><X className="h-5 w-5" /></button></div><form onSubmit={saveProduct} className="grid gap-4 p-5 sm:grid-cols-2"><Field label="Name in Spanish" value={form.nameEs} onChange={(value) => setForm({ ...form, nameEs: value })} required /><Field label="Name in English" value={form.nameEn} onChange={(value) => setForm({ ...form, nameEn: value })} required /><label className="block text-sm font-semibold">Category<select value={form.category} onChange={(event) => setForm({ ...form, category: event.target.value as ProductCategory })} className="mt-2 min-h-11 w-full rounded-lg border border-espresso/15 bg-white px-3 text-sm font-normal outline-none focus:border-forest">{Object.entries(categoryLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></label><Field label="Image path or URL" value={form.image} onChange={(value) => setForm({ ...form, image: value })} /><Field label={form.id ? "Current stock (use movements)" : "Opening stock"} type="number" disabled={Boolean(form.id)} value={form.stock} onChange={(value) => setForm({ ...form, stock: value })} /><Field label="Low-stock threshold" type="number" value={form.lowStockThreshold} onChange={(value) => setForm({ ...form, lowStockThreshold: value })} /><div className="sm:col-span-2 border-y border-espresso/10 py-4"><p className="text-xs font-bold uppercase tracking-[0.16em] text-forest">Costing inputs</p><p className="mt-1 text-xs text-matte/55">Use the supplier currency and shipping values from your costing sheets.</p></div><Field label="Cost before VAT, TT$" type="number" step="0.01" value={form.costTtd} onChange={(value) => setForm({ ...form, costTtd: value })} /><Field label="VAT rate, %" type="number" step="0.01" value={form.vatRate} onChange={(value) => setForm({ ...form, vatRate: value })} /><Field label="Exchange rate, TT$ per US$" type="number" step="0.01" value={form.exchangeRate} onChange={(value) => setForm({ ...form, exchangeRate: value })} /><Field label="International shipping, US$" type="number" step="0.01" value={form.shippingUsd} onChange={(value) => setForm({ ...form, shippingUsd: value })} /><Field label="Inland shipping, US$" type="number" step="0.01" value={form.inlandShippingUsd} onChange={(value) => setForm({ ...form, inlandShippingUsd: value })} /><Field label="Selling price, US$" type="number" step="0.01" value={form.salePriceUsd} onChange={(value) => setForm({ ...form, salePriceUsd: value })} /><label className="flex items-center gap-3 text-sm font-semibold"><input type="checkbox" checked={form.roundProductCostUp} onChange={(event) => setForm({ ...form, roundProductCostUp: event.target.checked })} className="h-4 w-4 accent-forest" /> Round product cost up to whole US$</label><label className="flex items-center gap-3 text-sm font-semibold"><input type="checkbox" checked={form.publicVisible} onChange={(event) => setForm({ ...form, publicVisible: event.target.checked })} className="h-4 w-4 accent-forest" /> Show in public catalog</label><div className="sm:col-span-2 grid gap-4 sm:grid-cols-2"><Field label="Description in Spanish" value={form.descriptionEs} onChange={(value) => setForm({ ...form, descriptionEs: value })} /><Field label="Description in English" value={form.descriptionEn} onChange={(value) => setForm({ ...form, descriptionEn: value })} /></div><div className="sm:col-span-2 flex justify-end gap-2 border-t border-espresso/10 pt-4"><button type="button" onClick={() => setForm(null)} className="min-h-11 rounded-lg border border-espresso/15 px-4 py-2 text-sm font-bold hover:bg-beige">Cancel</button><button type="submit" disabled={busy} className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-forest px-5 py-2 text-sm font-bold text-cream hover:bg-espresso disabled:opacity-50"><Check className="h-4 w-4" /> {busy ? "Saving..." : "Save product"}</button></div></form></div></div>}

      {transactionProduct && <div className="fixed inset-0 z-[70] overflow-y-auto bg-matte/55 px-4 py-8"><div className="mx-auto max-w-md border border-espresso/10 bg-[#fbf6ec] shadow-2xl"><div className="flex items-center justify-between border-b border-espresso/10 px-5 py-4"><div><p className="text-xs font-bold uppercase tracking-[0.16em] text-forest">Inventory movement</p><h2 className="mt-1 font-serif text-2xl font-semibold">{transactionProduct.nameEn}</h2></div><button type="button" aria-label="Close transaction form" onClick={() => setTransactionProduct(null)} className="grid h-10 w-10 place-items-center rounded-md border border-espresso/15 hover:bg-beige"><X className="h-5 w-5" /></button></div><form onSubmit={saveTransaction} className="space-y-5 p-5"><label className="block text-sm font-semibold">Movement<select value={transactionType} onChange={(event) => setTransactionType(event.target.value as InventoryTransactionType)} className="mt-2 min-h-11 w-full rounded-lg border border-espresso/15 bg-white px-3 text-sm font-normal outline-none focus:border-forest"><option value="sale">Record sale</option><option value="restock">Add stock</option><option value="adjustment">Stock adjustment</option></select></label><Field label={transactionType === "adjustment" ? "Quantity, negative removes stock" : "Quantity"} type="number" value={transactionQuantity} onChange={setTransactionQuantity} /><Field label="Note" value={transactionNote} onChange={setTransactionNote} /><div className="grid grid-cols-2 gap-3 border-y border-espresso/10 py-4 text-sm"><div><p className="text-matte/50">Current stock</p><p className="mt-1 font-bold">{transactionProduct.stock}</p></div><div><p className="text-matte/50">After movement</p><p className="mt-1 font-bold">{transactionProduct.stock + (transactionType === "sale" ? -Number(transactionQuantity || 0) : Number(transactionQuantity || 0))}</p></div><div><p className="text-matte/50">Unit landed cost</p><p className="mt-1 font-bold">{money(transactionProduct.landedCostUsdCents)}</p></div><div><p className="text-matte/50">Unit profit</p><p className="mt-1 font-bold text-forest">{money(transactionProduct.grossProfitPerUnitUsdCents)}</p></div></div><div className="flex justify-end gap-2"><button type="button" onClick={() => setTransactionProduct(null)} className="min-h-11 rounded-lg border border-espresso/15 px-4 py-2 text-sm font-bold hover:bg-beige">Cancel</button><button type="submit" disabled={busy} className="min-h-11 rounded-lg bg-forest px-5 py-2 text-sm font-bold text-cream hover:bg-espresso disabled:opacity-50">{busy ? "Saving..." : "Save movement"}</button></div></form></div></div>}
    </main>
  );
}

function Field({ label, value, onChange, type = "text", step, required = false, disabled = false }: { label: string; value: string; onChange: (value: string) => void; type?: string; step?: string; required?: boolean; disabled?: boolean }) {
  return <label className="block text-sm font-semibold">{label}<input type={type} step={step} required={required} disabled={disabled} value={value} onChange={(event) => onChange(event.target.value)} className="mt-2 min-h-11 w-full rounded-lg border border-espresso/15 bg-white px-3 text-sm font-normal outline-none focus:border-forest disabled:cursor-not-allowed disabled:bg-beige/60 disabled:text-matte/50" /></label>;
}

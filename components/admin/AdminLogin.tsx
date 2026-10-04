"use client";

import { LockKeyhole, ShieldCheck } from "lucide-react";
import { FormEvent, useState } from "react";

export function AdminLogin({ configured }: { configured: boolean }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setError("");
    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password })
    });
    const payload = await response.json().catch(() => ({})) as { error?: string };
    if (!response.ok) {
      setError(payload.error || "Login failed.");
      setBusy(false);
      return;
    }
    window.location.reload();
  }

  return (
    <main className="min-h-[calc(100vh-72px)] bg-matte px-4 py-16 text-cream sm:px-8 sm:py-24">
      <div className="mx-auto max-w-md">
        <div className="mb-8 flex items-center gap-3 text-cream/70">
          <ShieldCheck className="h-5 w-5 text-beige" />
          <span className="text-xs font-bold uppercase tracking-[0.2em]">Private workspace</span>
        </div>
        <h1 className="font-serif text-4xl font-semibold">Vento inventory</h1>
        <p className="mt-4 leading-7 text-cream/65">Manage products, stock, costs, sales, and margins in one private place.</p>
        <form onSubmit={submit} className="mt-8 space-y-5 rounded-2xl border border-cream/10 bg-cream/[0.06] p-6">
          <label className="block text-sm font-semibold">
            Admin password
            <span className="relative mt-2 block">
              <LockKeyhole className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-cream/40" />
              <input
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="min-h-12 w-full rounded-lg border border-cream/15 bg-black/20 pl-10 pr-3 text-cream outline-none focus:border-beige"
                required
              />
            </span>
          </label>
          {error && <p className="rounded-lg border border-red-300/30 bg-red-950/30 px-3 py-2 text-sm text-red-100">{error}</p>}
          {!configured && <p className="rounded-lg border border-amber-200/30 bg-amber-950/30 px-3 py-2 text-sm text-amber-100">Set VENTO_ADMIN_PASSWORD and VENTO_ADMIN_SESSION_SECRET before signing in.</p>}
          <button type="submit" disabled={busy || !configured} className="min-h-12 w-full rounded-lg bg-beige px-4 py-3 text-sm font-bold text-matte transition hover:bg-cream disabled:cursor-not-allowed disabled:opacity-45">
            {busy ? "Checking..." : "Sign in"}
          </button>
        </form>
        <p className="mt-6 text-xs text-cream/45">Public storefront access stays separate from this workspace.</p>
      </div>
    </main>
  );
}

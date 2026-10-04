"use client";

import Link from "next/link";
import { LockKeyhole, ShieldCheck } from "lucide-react";
import { FormEvent, useState } from "react";
import { AdminLanguageSwitch, useAdminText } from "@/components/admin/AdminLanguageSwitch";

export function AdminLogin({ configured }: { configured: boolean }) {
  const t = useAdminText();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setBusy(true); setError("");
    try {
      const response = await fetch("/api/admin/login", {
        method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ password })
      });
      const payload = await response.json().catch(() => ({})) as { error?: string };
      if (!response.ok) throw new Error(payload.error || "Login failed.");
      window.location.reload();
    } catch (e) { setError(e instanceof Error ? e.message : "Login failed."); }
    finally { setBusy(false); }
  }
  return <main className="min-h-screen bg-[#f7f8fa] px-4 py-8 text-gray-900">
    <div className="mx-auto max-w-sm">
      <div className="flex items-center justify-between gap-4"><Link href="/products" className="text-sm font-semibold text-forest">Vento</Link><AdminLanguageSwitch /></div>
      <div className="mt-16 flex items-center gap-2 text-sm text-gray-500"><ShieldCheck className="h-5 w-5 text-forest" />{t("Private workspace")}</div>
      <h1 className="mt-3 text-2xl font-semibold">{t("Vento inventory")}</h1>
      <form onSubmit={submit} className="mt-6 space-y-5 rounded-md border border-gray-200 bg-white p-5">
        <label className="block text-sm font-medium">{t("Admin password")}<span className="relative mt-2 block"><LockKeyhole className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" /><input type="password" autoComplete="current-password" value={password} onChange={e => setPassword(e.target.value)} className="min-h-12 w-full rounded-md border border-gray-300 bg-white pl-10 pr-3 text-base outline-none focus:border-forest" required /></span></label>
        {error && <p role="alert" className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-800">{t(error)}</p>}
        {!configured && <p role="alert" className="text-sm text-red-800">{t("Admin access unavailable")}</p>}
        <button type="submit" disabled={busy || !configured} className="min-h-12 w-full rounded-md bg-forest px-4 text-sm font-semibold text-white disabled:opacity-50">{t(busy ? "Checking..." : "Sign in")}</button>
      </form>
    </div>
  </main>;
}

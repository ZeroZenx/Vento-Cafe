"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Coffee, Languages, Menu, X } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "@/components/LanguageProvider";

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const navLinks = [
    { label: t.nav.home, href: "/" },
    { label: t.nav.story, href: "/our-story" },
    { label: t.nav.coffee, href: "/our-coffee" },
    { label: t.nav.pay, href: "/pay" },
    { label: t.nav.contact, href: "/contact" }
  ];
  const isPayPage = pathname === "/pay";

  return (
    <header className="sticky top-0 z-50 border-b border-espresso/10 bg-[#fbf6ec]/90 backdrop-blur-xl">
      <nav className="mx-auto flex h-[72px] w-full max-w-7xl items-center justify-between px-4 sm:px-8">
        <Link href="/" className="group inline-flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <span className="grid h-9 w-9 place-items-center rounded-full bg-espresso text-cream transition-transform group-hover:-rotate-6">
            <Coffee className="h-4 w-4" strokeWidth={1.8} />
          </span>
          <span className="text-lg font-semibold tracking-[-0.02em] text-espresso">Vento Cafe</span>
        </Link>

        <ul className={`${isPayPage ? "hidden" : "hidden lg:flex"} items-center gap-6`}>
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="text-sm font-medium text-matte/70 transition hover:text-forest">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <div className="flex items-center rounded-full border border-espresso/15 bg-white/70 p-1" aria-label="Language selector">
            <Languages className="mx-1 h-4 w-4 text-forest" aria-hidden="true" />
            {(["es", "en"] as const).map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setLanguage(option)}
                aria-pressed={language === option}
                className={`min-h-8 rounded-full px-2.5 text-xs font-bold uppercase transition ${
                  language === option ? "bg-forest text-cream" : "text-matte/55 hover:text-espresso"
                }`}
              >
                {option}
              </button>
            ))}
          </div>
          {!isPayPage && <button
            type="button"
            aria-label={open ? t.nav.close : t.nav.menu}
            aria-expanded={open}
            className="grid h-11 w-11 place-items-center rounded-full border border-espresso/15 text-espresso lg:hidden"
            onClick={() => setOpen((current) => !current)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>}
        </div>
      </nav>

      <AnimatePresence>
        {open && !isPayPage && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-t border-espresso/10 bg-[#fbf6ec] lg:hidden"
          >
            <ul className="mx-auto grid max-w-7xl gap-1 px-4 py-4 sm:px-8">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-2xl px-4 py-3 text-base font-medium text-matte/85 transition hover:bg-beige/70"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

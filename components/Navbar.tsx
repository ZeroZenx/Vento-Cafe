"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { navContent } from "@/data/content";
import { useLanguage } from "@/lib/i18n";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const { language, setLanguage } = useLanguage();
  const navLinks = navContent[language];

  return (
    <header className="sticky top-0 z-50 border-b border-espresso/10 bg-cream/85 backdrop-blur-xl">
      <nav className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-5 sm:px-8">
        <Link href="/" className="text-lg font-semibold tracking-wide text-espresso">
          Vento Café
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-sm font-medium text-matte/80 transition hover:text-forest"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-2 rounded-full border border-espresso/15 bg-white/55 p-1 md:flex">
          {(["es", "en"] as const).map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setLanguage(item)}
              className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                language === item ? "bg-forest text-cream" : "text-espresso hover:bg-beige"
              }`}
              aria-pressed={language === item}
            >
              {item.toUpperCase()}
            </button>
          ))}
        </div>

        <button
          type="button"
          aria-label="Toggle menu"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-espresso/15 text-espresso md:hidden"
          onClick={() => setOpen((prev) => !prev)}
        >
          <span className="text-sm">{language === "es" ? "Menú" : "Menu"}</span>
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="border-t border-espresso/10 bg-cream px-5 py-4 md:hidden"
          >
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-xl px-3 py-2 text-sm font-medium text-matte/90 transition hover:bg-beige"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-4 flex items-center gap-2 rounded-full border border-espresso/15 bg-white/55 p-1">
              {(["es", "en"] as const).map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setLanguage(item)}
                  className={`flex-1 rounded-full px-3 py-2 text-xs font-semibold transition ${
                    language === item ? "bg-forest text-cream" : "text-espresso hover:bg-beige"
                  }`}
                  aria-pressed={language === item}
                >
                  {item.toUpperCase()}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

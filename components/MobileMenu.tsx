"use client";

import Link from "next/link";
import { useState } from "react";

type MobileMenuProps = {
  slug: string;
  fullName?: string;
  active?: "dashboard" | "card";
};

export default function MobileMenu({
  slug,
  fullName,
  active = "dashboard",
}: MobileMenuProps) {
  const [open, setOpen] = useState(false);

  const items = [
    {
      label: "Dashboard",
      href: `/admin/${slug}/analytics`,
      active: active === "dashboard",
    },
    {
      label: "Configurações",
      href: `/admin/${slug}`,
      active: active === "card",
    },
  ];

  return (
    <div className="mb-6 md:hidden">
      <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-[#0d1424] px-4 py-3">
        <div>
          <p className="text-xs text-slate-400">Smart Card</p>
          <p className="text-sm font-bold text-white">
            {fullName || "Administrador"}
          </p>
        </div>

        <button
          type="button"
          onClick={() => setOpen(true)}
          className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm font-bold text-white"
        >
          ☰
        </button>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 bg-black/60">
          <div className="h-full w-72 border-r border-white/10 bg-[#0d1424] p-5">
            <div className="mb-8 flex items-center justify-between">
              <p className="font-bold text-white">SMART CARD</p>

              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white"
              >
                ✕
              </button>
            </div>

            <nav className="space-y-2">
              {items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`block rounded-xl px-4 py-3 text-sm font-medium ${
                    item.active
                      ? "bg-blue-600/20 text-blue-300"
                      : "text-slate-300 hover:bg-white/5"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </div>
  );
}
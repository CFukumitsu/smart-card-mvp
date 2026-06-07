"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { supabaseClient } from "../src/lib/supabaseClient";

export default function AdminSidebar({
  fullName = "Usuário",
}: {
  fullName?: string;
}) {
  const pathname = usePathname();

  const active = pathname.includes("/admin/analytics")
    ? "dashboard"
    : "card";

  const [pinned, setPinned] = useState(false);
  const [hovered, setHovered] = useState(false);

  const expanded = pinned || hovered;

  const itemClass = (item: "dashboard" | "card") =>
    `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition ${
      active === item
        ? "bg-blue-600/15 text-blue-400 font-semibold"
        : "text-slate-300 hover:bg-white/5"
    }`;

  async function handleLogout() {
    await supabaseClient.auth.signOut();
    window.location.href = "/login";
  }

  return (
    <aside
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`
        sticky top-0 z-40 h-screen shrink-0 overflow-visible
        transition-all duration-300 ease-in-out
        ${expanded ? "w-[230px]" : "w-[16px]"}
      `}
    >
      <div
        className={`
          h-full overflow-hidden p-3 transition-all duration-300 ease-in-out
          ${
            expanded
              ? "w-[230px] border-r border-white/10 bg-[#0d1424]"
              : "w-[16px] border-r-0 bg-transparent p-0"
          }
        `}
      >
        {!expanded && (
          <div className="mt-4 h-12 w-[16px] cursor-pointer rounded-r-xl bg-blue-600/20" />
        )}

        {expanded && (
          <>
            <div className="mb-10 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-blue-500/40 bg-blue-500/10 text-blue-400">
                  ◈
                </div>

                <h1 className="whitespace-nowrap text-lg font-bold tracking-tight text-white">
                  SMART CARD
                </h1>
              </div>

              <button
                type="button"
                onClick={() => setPinned(!pinned)}
                className="rounded-lg border border-white/10 bg-white/5 px-2 py-1 text-xs text-slate-300 hover:text-white"
                title={pinned ? "Desafixar menu" : "Fixar menu"}
              >
                {pinned ? "◧" : "📌"}
              </button>
            </div>

            <nav className="space-y-2">
              <Link href="/admin/analytics" className={itemClass("dashboard")}>
                <span className="w-5 shrink-0 text-center">📊</span>
                <span>Dashboard</span>
              </Link>

              <Link href="/admin/card" className={itemClass("card")}>
                <span className="w-5 shrink-0 text-center">⚙️</span>
                <span>Configurações</span>
              </Link>
            </nav>

            <button
              type="button"
              onClick={handleLogout}
              className="mt-4 flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-red-300 transition hover:bg-red-500/10"
            >
              <span className="w-5 shrink-0 text-center">🚪</span>
              <span>Sair</span>
            </button>

            <div className="mt-10 flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-cyan-300 to-yellow-300 text-sm font-bold text-white">
                {fullName?.charAt(0) || "C"}
              </div>

              <div className="min-w-0">
                <p className="truncate text-sm font-bold text-white">
                  {fullName || "Usuário"}
                </p>
                <p className="text-xs text-slate-400">Cliente</p>
              </div>
            </div>
          </>
        )}
      </div>
    </aside>
  );
}
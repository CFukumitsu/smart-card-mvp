import Link from "next/link";

export default function AdminSidebar({
  slug,
  active,
  fullName,
}: {
  slug: string;
  active: "dashboard" | "card";
  fullName?: string;
}) {
  const itemClass = (item: "dashboard" | "card") =>
    `block rounded-xl px-3 py-2.5 text-sm ${
      active === item
        ? "bg-blue-600/15 text-blue-400 font-semibold"
        : "text-slate-300 hover:bg-white/5"
    }`;

  return (
    <aside className="sticky top-0 h-screen w-[230px] border-r border-white/10 bg-[#0d1424]">
      <div className="mb-10 flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-blue-500/40 bg-blue-500/10 text-blue-400">
          ◈
        </div>
        <h1 className="text-lg font-bold tracking-tight">SMART CARD</h1>
      </div>

      <nav className="space-y-2">
        <Link href={`/admin/${slug}/analytics`} className={itemClass("dashboard")}>
          Dashboard
        </Link>

        <Link href={`/admin/${slug}`} className={itemClass("card")}>
          Configurações
        </Link>
      </nav>

      <div className="mt-10 flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-cyan-300 to-yellow-300 text-sm font-bold text-white">
          {fullName?.charAt(0) || "C"}
        </div>

        <div className="min-w-0">
          <p className="truncate text-sm font-bold text-white">
            {fullName || "Usuário"}
          </p>
          <p className="text-xs text-slate-400">Administrador</p>
        </div>
      </div>
    </aside>
  );
}
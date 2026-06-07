import { redirect } from "next/navigation";
import { createClient } from "../../src/lib/supabaseServer";

export default async function AnalyticsPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("client_id")
    .eq("id", user.id)
    .single();

  if (!profile?.client_id) {
    return <main className="p-8 text-white">Perfil sem cliente vinculado.</main>;
  }

  const { data: card } = await supabase
    .from("cards")
    .select("*")
    .eq("client_id", profile.client_id)
    .single();

  if (!card) {
    return <main className="p-8 text-white">Nenhum cartão encontrado.</main>;
  }

  const { data: events } = await supabase
    .from("card_events")
    .select("event_type, created_at")
    .eq("card_slug", card.slug);

  const count = (type: string) =>
    events?.filter((event) => event.event_type === type).length || 0;

  const views = count("view");

  const totalClicks =
    count("click_whatsapp") +
    count("click_email") +
    count("click_instagram") +
    count("click_linkedin") +
    count("click_website") +
    count("click_vcard");

  const conversionRate =
    views > 0 ? ((totalClicks / views) * 100).toFixed(1) : "0.0";

  const last7Days = Array.from({ length: 7 }).map((_, index) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - index));

    const key = date.toISOString().split("T")[0];

    const label = date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
    });

    const value =
      events?.filter((event) => {
        const eventDate = new Date(event.created_at).toISOString().split("T")[0];
        return event.event_type === "view" && eventDate === key;
      }).length || 0;

    return { label, value };
  });

  const maxViews = Math.max(...last7Days.map((day) => day.value), 1);

  const stats = [
    { label: "Visualizações", value: count("view"), icon: "👁" },
    { label: "WhatsApp", value: count("click_whatsapp"), icon: "💬" },
    { label: "E-mail", value: count("click_email"), icon: "✉️" },
    { label: "Instagram", value: count("click_instagram"), icon: "📸" },
    { label: "LinkedIn", value: count("click_linkedin"), icon: "💼" },
    { label: "Website", value: count("click_website"), icon: "🌐" },
    { label: "Salvar contato", value: count("click_vcard"), icon: "💾" },
  ];

  return (
    <>
      <div className="mb-8">
        <p className="text-sm text-slate-400">
          Smart Card &gt; Dashboard &gt;{" "}
          <span className="text-white">{card.full_name}</span>
        </p>

        <h1 className="mt-2 text-3xl font-bold">Dashboard</h1>
      </div>

      <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-blue-600/20 to-blue-900/20 p-6">
          <p className="text-sm text-slate-400">Visualizações</p>
          <p className="mt-3 text-4xl font-bold">{views}</p>
        </div>

        <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-yellow-500/20 to-yellow-900/20 p-6">
          <p className="text-sm text-slate-400">Cliques totais</p>
          <p className="mt-3 text-4xl font-bold">{totalClicks}</p>
        </div>

        <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-emerald-500/20 to-emerald-900/20 p-6">
          <p className="text-sm text-slate-400">Taxa de conversão</p>
          <p className="mt-3 text-4xl font-bold">{conversionRate}%</p>
        </div>
      </div>

      <section className="mb-6 rounded-3xl border border-white/10 bg-[#0d1424]/90 p-5 shadow-[0_20px_60px_rgba(0,0,0,0.35)] md:p-6">
        <div className="mb-6">
          <h2 className="text-lg font-bold">
            Visualizações nos últimos 7 dias
          </h2>
          <p className="mt-1 text-sm text-slate-400">
            Evolução diária de acessos ao cartão digital.
          </p>
        </div>

        <div className="flex h-64 items-end gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4 md:gap-4 md:p-5">
          {last7Days.map((day) => {
            const height = Math.max((day.value / maxViews) * 100, 6);

            return (
              <div
                key={day.label}
                className="flex flex-1 flex-col items-center gap-3"
              >
                <div className="text-sm font-semibold text-white">
                  {day.value}
                </div>

                <div className="flex h-40 w-full items-end">
                  <div
                    className="w-full rounded-t-xl bg-gradient-to-t from-blue-700 to-cyan-400"
                    style={{ height: `${height}%` }}
                  />
                </div>

                <div className="text-xs text-slate-400">{day.label}</div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="rounded-3xl border border-white/10 bg-[#0d1424]/90 p-5 shadow-[0_20px_60px_rgba(0,0,0,0.35)] md:p-6">
        <h2 className="text-lg font-bold">Resumo de desempenho</h2>
        <p className="mt-1 text-sm text-slate-400">
          Métricas reais de visualizações e cliques do cartão digital.
        </p>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border border-white/10 bg-white/[0.04] p-5"
            >
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10 text-xl">
                {item.icon}
              </div>

              <p className="text-4xl font-bold text-white">{item.value}</p>

              <p className="mt-2 text-sm text-slate-400">{item.label}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
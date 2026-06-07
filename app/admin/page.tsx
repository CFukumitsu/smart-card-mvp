import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "../src/lib/supabaseServer";

export default async function AdminHomePage() {
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
    return <div>Perfil sem cliente vinculado.</div>;
  }

  const { data: card } = await supabase
    .from("cards")
    .select("slug, full_name, title, company, photo_url")
    .eq("client_id", profile.client_id)
    .single();

  if (!card) {
    return <div>Nenhum cartão encontrado.</div>;
  }

  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-10 flex items-center justify-between">
        <div>
          <p className="text-sm text-blue-300">Smart Card</p>
          <h1 className="mt-2 text-3xl font-bold">Meu Cartão</h1>
          <p className="mt-2 text-sm text-slate-400">
            Gerencie seu cartão digital vinculado à sua plaqueta QR Code/NFC.
          </p>
        </div>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-cyan-300 to-yellow-300 text-lg font-bold">
              {card.photo_url ? (
                <img
                  src={card.photo_url}
                  alt={card.full_name}
                  className="h-full w-full object-cover"
                />
              ) : (
                card.full_name?.charAt(0) || "C"
              )}
            </div>

            <div>
              <h2 className="text-lg font-bold">{card.full_name}</h2>
              <p className="text-sm text-slate-400">
                {card.title || "Cargo não informado"}
              </p>
              <p className="text-xs text-slate-500">
                {card.company || "Empresa não informada"}
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <Link
              href={`/card/${card.slug}`}
              target="_blank"
              className="rounded-xl border border-white/10 px-4 py-2 text-sm text-slate-300 hover:bg-white/5"
            >
              Ver cartão
            </Link>

            <Link
              href="/admin/card"
              className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-bold text-white hover:bg-blue-500"
            >
              Editar
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
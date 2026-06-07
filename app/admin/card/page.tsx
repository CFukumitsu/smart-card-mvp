import { redirect } from "next/navigation";
import { createClient } from "../../src/lib/supabaseServer";
import { updateCard } from "../actions";
import AdminCardEditor from "../AdminCardEditor";

export default async function AdminCardPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string }>;
}) {
  const params = await searchParams;
  const saved = params.saved === "true";

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
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-8 text-white">
          Perfil sem cliente vinculado
        </div>
      </div>
    );
  }

  const { data: card } = await supabase
    .from("cards")
    .select("*")
    .eq("client_id", profile.client_id)
    .single();

  if (!card) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-8 text-white">
          Cartão não encontrado
        </div>
      </div>
    );
  }

  const { data: analytics } = await supabase
    .from("card_events")
    .select("event_type")
    .eq("card_slug", card.slug);

  const count = (type: string) =>
    analytics?.filter((event) => event.event_type === type).length || 0;

  const stats = {
    views: count("view"),
    whatsapp: count("click_whatsapp"),
    email: count("click_email"),
    instagram: count("click_instagram"),
    linkedin: count("click_linkedin"),
    website: count("click_website"),
    vcard: count("click_vcard"),
  };

  return (
    <div className="w-full">
      {saved && (
        <div className="mb-6 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm font-medium text-emerald-300">
          ✅ Alterações salvas com sucesso.
        </div>
      )}

      <AdminCardEditor
        card={card}
        stats={stats}
        action={updateCard.bind(null, card.slug)}
      />
    </div>
  );
}
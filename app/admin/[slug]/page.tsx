import { supabase } from "../../src/lib/supabase";
import { updateCard } from "./actions";
import AdminCardEditor from "./AdminCardEditor";

export default async function AdminCardPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const { data: card } = await supabase
    .from("cards")
    .select("*")
    .eq("slug", slug)
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
    .eq("card_slug", slug);

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
      <AdminCardEditor
        card={card}
        stats={stats}
        action={updateCard.bind(null, slug)}
      />
    </div>
  );
}
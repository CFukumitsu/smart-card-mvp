import { redirect } from "next/navigation";
import { supabase } from "../../src/lib/supabase";

export default async function NfcRedirectPage({
  params,
}: {
  params: Promise<{ tagCode: string }>;
}) {
  const { tagCode } = await params;

  const { data: tag, error: tagError } = await supabase
    .from("nfc_tags")
    .select("tag_code, status, card_id")
    .eq("tag_code", tagCode)
    .single();

  if (tagError || !tag || tag.status !== "linked" || !tag.card_id) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-950 px-6 text-white">
        <div className="max-w-md rounded-3xl border border-white/10 bg-white/5 p-8 text-center shadow-2xl">
          <p className="text-sm uppercase tracking-[0.3em] text-yellow-400">
            SOLUTION NFC
          </p>

          <h1 className="mt-4 text-2xl font-bold">
            Plaqueta não vinculada
          </h1>

          <p className="mt-3 text-sm text-slate-300">
            Esta plaqueta NFC ainda não está associada a nenhum cartão digital.
          </p>

          <p className="mt-6 text-xs text-slate-500">
            Código: {tagCode}
          </p>
        </div>
      </main>
    );
  }

  const { data: card, error: cardError } = await supabase
    .from("cards")
    .select("slug")
    .eq("id", tag.card_id)
    .single();

  if (cardError || !card?.slug) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-950 px-6 text-white">
        <div className="max-w-md rounded-3xl border border-white/10 bg-white/5 p-8 text-center shadow-2xl">
          <p className="text-sm uppercase tracking-[0.3em] text-yellow-400">
            SOLUTION NFC
          </p>

          <h1 className="mt-4 text-2xl font-bold">
            Cartão não encontrado
          </h1>

          <p className="mt-3 text-sm text-slate-300">
            A plaqueta existe, mas o cartão vinculado não foi encontrado.
          </p>

          <p className="mt-6 text-xs text-slate-500">
            Código: {tagCode}
          </p>
        </div>
      </main>
    );
  }

  redirect(`/${card.slug}`);
}
import { supabase } from "../../src/lib/supabase";
import { createNfcTag, linkNfcTag } from "./actions";

export default async function AdminNfcPage() {
  const { data: tags } = await supabase
    .from("nfc_tags")
    .select(`
      id,
      tag_code,
      status,
      linked_at,
      cards (
        id,
        slug,
        full_name,
        company
      )
    `)
    .order("created_at", { ascending: false });

  const { data: cards } = await supabase
    .from("cards")
    .select("id, slug, full_name, company, client_id")
    .order("full_name", { ascending: true });

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="min-h-screen px-6 py-8 md:pl-24">
        <div className="mx-auto max-w-6xl space-y-8">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-yellow-400">
              SOLUTION SMART CARD
            </p>

            <h1 className="mt-3 text-3xl font-bold">
              NFC / Plaquetas
            </h1>

            <p className="mt-2 max-w-2xl text-sm text-slate-400">
              Cadastre, vincule e gerencie plaquetas NFC associadas aos cartões digitais.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl">
            <h2 className="text-lg font-semibold">
              Cadastrar nova plaqueta
            </h2>

            <form action={createNfcTag}>
              <button
                type="submit"
                className="rounded-2xl bg-yellow-400 px-6 py-3 text-sm font-bold text-slate-950 hover:bg-yellow-300"
              >
                + Nova Plaqueta NFC
              </button>
            </form>
          </div>

          <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-2xl">
            <div className="border-b border-white/10 p-6">
              <h2 className="text-lg font-semibold">
                Plaquetas cadastradas
              </h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[900px] text-left text-sm">
                <thead className="bg-white/5 text-xs uppercase tracking-wider text-slate-400">
                  <tr>
                    <th className="px-6 py-4">Código</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Cartão vinculado</th>
                    <th className="px-6 py-4">URL NFC</th>
                    <th className="px-6 py-4">Vincular</th>
                  </tr>
                </thead>

                <tbody>
                  {tags?.map((tag: any) => (
                    <tr key={tag.id} className="border-t border-white/10">
                      <td className="px-6 py-4 font-medium text-white">
                        {tag.tag_code}
                      </td>

                      <td className="px-6 py-4">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${
                            tag.status === "linked"
                              ? "bg-green-500/15 text-green-300"
                              : "bg-yellow-500/15 text-yellow-300"
                          }`}
                        >
                          {tag.status === "linked" ? "Vinculada" : "Disponível"}
                        </span>
                      </td>

                      <td className="px-6 py-4 text-slate-300">
                        {tag.cards?.full_name ? (
                          <div>
                            <p className="font-medium text-white">
                              {tag.cards.full_name}
                            </p>
                            <p className="text-xs text-slate-500">
                              /{tag.cards.slug}
                            </p>
                          </div>
                        ) : (
                          "Nenhum"
                        )}
                      </td>

                      <td className="px-6 py-4 text-xs text-slate-400">
                        /n/{tag.tag_code}
                      </td>

                      <td className="px-6 py-4">
                        {tag.status === "linked" ? (
                          <div className="rounded-xl border border-green-500/20 bg-green-500/10 px-4 py-2 text-xs font-semibold text-green-300">
                            ✓ Vinculada
                          </div>
                        ) : (
                          <form action={linkNfcTag} className="flex gap-2">
                            <input type="hidden" name="tag_id" value={tag.id} />

                            <select
                              name="card_id"
                              className="rounded-xl border border-white/10 bg-slate-900 px-3 py-2 text-xs text-white outline-none"
                              defaultValue=""
                            >
                              <option value="" disabled>
                                Selecione
                              </option>

                              {cards?.map((card) => (
                                <option key={card.id} value={card.id}>
                                  {card.full_name} / {card.slug}
                                </option>
                              ))}
                            </select>

                            <button className="rounded-xl bg-white px-4 py-2 text-xs font-bold text-slate-950 hover:bg-slate-200">
                              Vincular
                            </button>
                          </form>
                        )}
                      </td>
                    </tr>
                  ))}

                  {!tags?.length && (
                    <tr>
                      <td colSpan={5} className="px-6 py-10 text-center text-slate-400">
                        Nenhuma plaqueta NFC cadastrada.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
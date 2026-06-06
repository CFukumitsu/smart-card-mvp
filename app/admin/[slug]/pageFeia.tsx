import { supabase } from "../../src/lib/supabase";
import { updateCard } from "./actions";

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
    return <main className="p-8">Cartão não encontrado</main>;
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white p-6">
      <div className="max-w-7xl mx-auto grid grid-cols-[220px_1fr_360px] gap-6">
        <aside className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
          <h1 className="text-xl font-bold mb-8">SMART CARD</h1>

          <nav className="space-y-3 text-sm text-slate-300">
            <p className="text-blue-400 font-semibold">Dashboard</p>
            <p>Cartões</p>
            <p>Aparência</p>
            <p>Analytics</p>
            <p>Configurações</p>
          </nav>
        </aside>

        <form action={updateCard.bind(null, slug)} className="space-y-6">
          <div>
            <p className="text-sm text-slate-400">
              Smart Card &gt; Cartões &gt; {card.full_name}
            </p>
            <h2 className="text-3xl font-bold mt-2">
              Editar Cartão
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
              <h3 className="font-bold mb-4">Dados Básicos</h3>

              <label className="text-sm text-slate-400">Nome</label>
              <input name="full_name" className="w-full mt-1 mb-3 bg-slate-800 border border-slate-700 rounded-lg p-3" defaultValue={card.full_name} />

              <label className="text-sm text-slate-400">Cargo</label>
              <input name="title" className="w-full mt-1 mb-3 bg-slate-800 border border-slate-700 rounded-lg p-3" defaultValue={card.title} />

              <label className="text-sm text-slate-400">Empresa</label>
              <input name="company" className="w-full mt-1 mb-3 bg-slate-800 border border-slate-700 rounded-lg p-3" defaultValue={card.company} />

              <label className="text-sm text-slate-400">Slug</label>
              <input name="slug" className="w-full mt-1 bg-slate-800 border border-slate-700 rounded-lg p-3" defaultValue={card.slug} />
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
              <h3 className="font-bold mb-4">Contato</h3>

              <label className="text-sm text-slate-400">Telefone</label>
              <input name="phone" className="w-full mt-1 mb-3 bg-slate-800 border border-slate-700 rounded-lg p-3" defaultValue={card.phone} />

              <label className="text-sm text-slate-400">E-mail</label>
              <input name="email" className="w-full mt-1 mb-3 bg-slate-800 border border-slate-700 rounded-lg p-3" defaultValue={card.email} />

              <label className="text-sm text-slate-400">Instagram</label>
              <input name="instagram" className="w-full mt-1 bg-slate-800 border border-slate-700 rounded-lg p-3" defaultValue={card.instagram} />

              <label className="text-sm text-slate-400">Linkedin</label>
              <input name="linkedin" className="w-full mt-1 bg-slate-800 border border-slate-700 rounded-lg p-3" defaultValue={card.linkedin} />

              <label className="text-sm text-slate-400">Website</label>
              <input name="website" className="w-full mt-1 bg-slate-800 border border-slate-700 rounded-lg p-3" defaultValue={card.website} />
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
            <h3 className="font-bold mb-4">Botões da Home</h3>

            <div className="grid grid-cols-3 gap-4 text-sm">
              <label><input name="show_whatsapp" type="checkbox" defaultChecked={card.show_whatsapp} /> WhatsApp</label>
              <label><input name="show_email" type="checkbox" defaultChecked={card.show_email} /> E-mail</label>
              <label><input name="show_instagram" type="checkbox" defaultChecked={card.show_instagram} /> Instagram</label>
              <label><input name="show_linkedin" type="checkbox" defaultChecked={card.show_linkedin} /> LinkedIn</label>
              <label><input name="show_website" type="checkbox" defaultChecked={card.show_website} /> Website</label>
            </div>
          </div>

          <div className="flex gap-4">
            <button type="submit" className="bg-blue-600 hover:bg-blue-500 px-6 py-3 rounded-xl font-bold">
              Salvar alterações
            </button>

            <a
              href={`/${card.slug}`}
              target="_blank"
              className="bg-slate-800 hover:bg-slate-700 px-6 py-3 rounded-xl font-bold"
            >
              Visualizar cartão
            </a>
          </div>
        </form>

        <aside className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <h3 className="font-bold mb-6">Preview do Cartão</h3>

          <div className="mx-auto w-64 bg-slate-950 border border-slate-700 rounded-[2rem] p-5 text-center shadow-2xl">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-yellow-400 mx-auto mb-4 flex items-center justify-center text-3xl font-bold">
              {card.full_name?.charAt(0)}
            </div>

            <h2 className="text-xl font-bold">{card.full_name}</h2>
            <p className="text-slate-400 text-sm">{card.title}</p>
            <p className="text-yellow-400 font-bold text-sm">{card.company}</p>

            <div className="mt-5 space-y-2">
              {card.show_whatsapp && (
                <div className="border border-yellow-500 rounded-lg py-2 text-sm">
                  WhatsApp
                </div>
              )}

              {card.show_email && (
                <div className="border border-yellow-500 rounded-lg py-2 text-sm">
                  E-mail
                </div>
              )}

              {card.show_instagram && (
                <div className="border border-yellow-500 rounded-lg py-2 text-sm">
                  Instagram
                </div>
              )}

              {card.show_linkedin && (
                <div className="border border-yellow-500 rounded-lg py-2 text-sm">
                  LinkedIn
                </div>
              )}
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
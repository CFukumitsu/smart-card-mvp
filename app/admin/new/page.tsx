import { redirect } from "next/navigation";
import { createClient } from "../../src/lib/supabaseServer";
import { createCard } from "./actions";

export default async function NewCardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <main className="flex-1 bg-slate-950 p-8 text-white">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-2 text-3xl font-bold">Novo Cartão</h1>
        <p className="mb-8 text-slate-400">
          Crie um novo cartão digital vinculado ao seu cliente.
        </p>

        <form action={createCard} className="space-y-5 rounded-2xl border border-white/10 bg-white/5 p-6">
          <div>
            <label className="mb-2 block text-sm text-slate-300">Nome completo</label>
            <input
              name="full_name"
              required
              className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 outline-none"
              placeholder="Ex: César Fukumitsu"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-slate-300">Slug do cartão</label>
            <input
              name="slug"
              required
              className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 outline-none"
              placeholder="Ex: cesar"
            />
            <p className="mt-1 text-xs text-slate-500">
              Será usado na URL pública do cartão.
            </p>
          </div>

          <div>
            <label className="mb-2 block text-sm text-slate-300">Cargo</label>
            <input
              name="title"
              className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 outline-none"
              placeholder="Ex: Diretor Comercial"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-slate-300">Empresa</label>
            <input
              name="company"
              className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 outline-none"
              placeholder="Ex: SOLUTION"
            />
          </div>

          <button
            type="submit"
            className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-500"
          >
            Criar cartão
          </button>
        </form>
      </div>
    </main>
  );
}
import Link from "next/link";
import { registerUser } from "./actions";

export default function RegisterPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-4 text-white">
      <div className="w-full max-w-xl rounded-3xl border border-white/10 bg-white/[0.04] p-8 shadow-2xl">
        <div className="mb-8 text-center">
          <p className="text-sm font-semibold text-blue-300">SMART CARD</p>
          <h1 className="mt-2 text-3xl font-bold">Criar conta</h1>
          <p className="mt-2 text-sm text-slate-400">
            Crie sua conta e configure seu cartão digital QR Code/NFC.
          </p>
        </div>

        <form action={registerUser} className="space-y-4">
          <input
            name="full_name"
            required
            placeholder="Nome completo"
            className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 outline-none focus:border-blue-500"
          />

          <input
            name="company"
            required
            placeholder="Empresa"
            className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 outline-none focus:border-blue-500"
          />

          <input
            name="email"
            type="email"
            required
            placeholder="E-mail"
            className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 outline-none focus:border-blue-500"
          />

          <input
            name="phone"
            placeholder="Telefone / WhatsApp"
            className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 outline-none focus:border-blue-500"
          />

          <input
            name="password"
            type="password"
            required
            minLength={6}
            placeholder="Senha"
            className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 outline-none focus:border-blue-500"
          />

          <button
            type="submit"
            className="mt-4 w-full rounded-xl bg-blue-600 px-5 py-3 font-bold text-white hover:bg-blue-500"
          >
            Criar conta
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-400">
          Já tem conta?{" "}
          <Link href="/login" className="font-semibold text-blue-300">
            Entrar
          </Link>
        </p>
      </div>
    </main>
  );
}
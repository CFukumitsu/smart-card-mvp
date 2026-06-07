"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabaseClient } from "../src/lib/supabaseClient";

export default function LoginPage() {
  const router = useRouter();
  const [resetMessage, setResetMessage] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function handleLogin(
    event: React.SubmitEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setLoading(true);
    setErrorMessage("");

    const { error } = await supabaseClient.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setErrorMessage("E-mail ou senha inválidos.");
      return;
    }

    window.location.href = "/admin/analytics";
  }
  async function handleForgotPassword() {
    try {
      const { error } = await supabaseClient.auth.resetPasswordForEmail(
        email,
        {
          redirectTo: `${window.location.origin}/reset-password`,
        }
      );
  
      if (error) {
        console.error(error);
        throw error;
      }
  
      setResetMessage("E-mail enviado.");
    } catch (err: any) {
      console.error("RESET ERROR:", err);
  
      setErrorMessage(
        err?.message || "Não foi possível enviar o e-mail de recuperação."
      );
    }
  }
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-6 text-white">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md rounded-3xl border border-white/10 bg-white/[0.03] p-8 shadow-2xl"
      >
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-blue-500/40 bg-blue-500/10 text-blue-400">
            ◈
          </div>

          <h1 className="text-2xl font-bold">Smart Card</h1>
          <p className="mt-2 text-sm text-slate-400">
            Acesse seu painel administrativo
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="mb-2 block text-sm text-slate-300">E-mail</label>
            <input
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-sm outline-none focus:border-blue-500"
              placeholder="seu@email.com"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-slate-300">Senha</label>
            <input
              type="password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-sm outline-none focus:border-blue-500"
              placeholder="Digite sua senha"
            />
          </div>

          {errorMessage && (
            <p className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
              {errorMessage}
            </p>
          )}

          {resetMessage && (
            <p className="rounded-xl border border-green-500/30 bg-green-500/10 px-4 py-3 text-sm text-green-300">
              {resetMessage}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-blue-600 px-4 py-3 text-sm font-bold text-white hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>

          <button
            type="button"
            onClick={handleForgotPassword}
            className="w-full text-center text-sm text-blue-300 hover:text-blue-200"
          >
            Esqueci minha senha
          </button>
        </div>
      </form>
    </main>
  );
}
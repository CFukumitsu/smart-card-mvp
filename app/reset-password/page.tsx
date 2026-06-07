"use client";

import { useEffect, useState } from "react";
import { supabaseClient } from "../src/lib/supabaseClient";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [sessionReady, setSessionReady] = useState(false);

  useEffect(() => {
    async function loadSessionFromUrl() {
      const { data } = await supabaseClient.auth.getSession();

      if (data.session) {
        setSessionReady(true);
        return;
      }

      const hash = window.location.hash;

      if (!hash) {
        setErrorMessage("Link inválido ou expirado. Gere um novo link de recuperação.");
        return;
      }

      const params = new URLSearchParams(hash.replace("#", ""));
      const accessToken = params.get("access_token");
      const refreshToken = params.get("refresh_token");

      if (!accessToken || !refreshToken) {
        setErrorMessage("Link inválido ou expirado. Gere um novo link de recuperação.");
        return;
      }

      const { error } = await supabaseClient.auth.setSession({
        access_token: accessToken,
        refresh_token: refreshToken,
      });

      if (error) {
        setErrorMessage("Não foi possível validar o link. Gere um novo link de recuperação.");
        return;
      }

      setSessionReady(true);
    }

    loadSessionFromUrl();
  }, []);

  async function handleUpdatePassword(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    setLoading(true);
    setMessage("");
    setErrorMessage("");

    const { error } = await supabaseClient.auth.updateUser({
      password,
    });

    setLoading(false);

    if (error) {
      setErrorMessage("Não foi possível alterar a senha. Tente gerar um novo link.");
      return;
    }

    setMessage("Senha alterada com sucesso. Redirecionando para o login...");

    await supabaseClient.auth.signOut();

    setTimeout(() => {
      window.location.href = "/login";
    }, 1500);
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-6 text-white">
      <form
        onSubmit={handleUpdatePassword}
        className="w-full max-w-md rounded-3xl border border-white/10 bg-white/[0.03] p-8 shadow-2xl"
      >
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-blue-500/40 bg-blue-500/10 text-blue-400">
            ◈
          </div>

          <h1 className="text-2xl font-bold">Nova senha</h1>
          <p className="mt-2 text-sm text-slate-400">
            Defina uma nova senha para acessar seu painel.
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="mb-2 block text-sm text-slate-300">
              Nova senha
            </label>
            <input
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              disabled={!sessionReady || loading}
              className="w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-sm outline-none focus:border-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
              placeholder="Digite sua nova senha"
            />
          </div>

          {errorMessage && (
            <p className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
              {errorMessage}
            </p>
          )}

          {message && (
            <p className="rounded-xl border border-green-500/30 bg-green-500/10 px-4 py-3 text-sm text-green-300">
              {message}
            </p>
          )}

          <button
            type="submit"
            disabled={!sessionReady || loading}
            className="w-full rounded-xl bg-blue-600 px-4 py-3 text-sm font-bold text-white hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Alterando..." : "Alterar senha"}
          </button>
        </div>
      </form>
    </main>
  );
}
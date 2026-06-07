"use server";

import { redirect } from "next/navigation";
import { createClient } from "../../src/lib/supabaseServer";

function normalizeSlug(value: string) {
  return value
    .toLowerCase()
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export async function createCard(formData: FormData) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("client_id")
    .eq("id", user.id)
    .single();

  if (profileError || !profile?.client_id) {
    throw new Error("Perfil do usuário não encontrado ou sem client_id.");
  }

  const full_name = String(formData.get("full_name") || "").trim();
  const slug = normalizeSlug(String(formData.get("slug") || ""));
  const title = String(formData.get("title") || "").trim();
  const company = String(formData.get("company") || "").trim();

  if (!full_name || !slug) {
    throw new Error("Nome e slug são obrigatórios.");
  }

  const { error } = await supabase.from("cards").insert({
    client_id: profile.client_id,
    full_name,
    slug,
    title,
    company,
    theme_primary: "#0f172a",
    theme_secondary: "#2563eb",
  });

  if (error) {
    throw new Error(error.message);
  }

  redirect(`/admin/${slug}`);
}
"use server";

import { redirect } from "next/navigation";
import { createClient } from "../src/lib/supabaseServer";

function normalizeSlug(value: string) {
  return value
    .toLowerCase()
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export async function registerUser(formData: FormData) {
  const supabase = await createClient();

  const fullName = String(formData.get("full_name") || "").trim();
  const company = String(formData.get("company") || "").trim();
  const email = String(formData.get("email") || "").trim();
  const phone = String(formData.get("phone") || "").trim();
  const password = String(formData.get("password") || "");

  const slug = normalizeSlug(fullName);

  if (!fullName || !company || !email || !password) {
    throw new Error("Preencha todos os campos obrigatórios.");
  }

  console.log("CRIANDO USUARIO...");

  const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
      },
    },
  });

  console.log(signUpData);
  console.log(signUpError);
  
  if (signUpError) {
    throw new Error(signUpError.message);
  }

  const user = signUpData.user;

  if (!user) {
    throw new Error("Usuário não criado.");
  }

  const { data: client, error: clientError } = await supabase
  .from("clients")
  .insert({
    name: company,
  })
  .select("id")
  .single();
  
    console.log(client);
    console.log(clientError);
    
  if (clientError || !client) {
    throw new Error(clientError?.message || "Erro ao criar cliente.");
  }

  const { error: profileError } = await supabase.from("profiles").insert({
    id: user.id,
    client_id: client.id,
    full_name: fullName,
    role: "owner",
  });

  if (profileError) {
    throw new Error(profileError.message);
  }

  const { error: cardError } = await supabase.from("cards").insert({
    client_id: client.id,
    slug,
    full_name: fullName,
    company,
    phone,
    email,
    theme: "dark",
    show_whatsapp: true,
    show_email: true,
    show_instagram: true,
    show_linkedin: true,
    show_website: true,
  });

  if (cardError) {
    throw new Error(cardError.message);
  }

  redirect("/admin/card");
}
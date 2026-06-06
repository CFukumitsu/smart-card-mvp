"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { supabase } from "../../src/lib/supabase";

export async function updateCard(slugAtual: string, formData: FormData) {
  const full_name = String(formData.get("full_name") || "");
  const title = String(formData.get("title") || "");
  const company = String(formData.get("company") || "");
  const slug = String(formData.get("slug") || "");
  const phone = String(formData.get("phone") || "");
  const email = String(formData.get("email") || "");
  const instagram = String(formData.get("instagram") || "");
  const linkedin = String(formData.get("linkedin") || "");
  const website = String(formData.get("website") || "");
  const photo_url = String(formData.get("photo_url") || "");

  const show_whatsapp = formData.get("show_whatsapp") === "on";
  const show_email = formData.get("show_email") === "on";
  const show_instagram = formData.get("show_instagram") === "on";
  const show_linkedin = formData.get("show_linkedin") === "on";
  const show_website = formData.get("show_website") === "on";
  const theme = String(formData.get("theme") || "dark");

  const { error } = await supabase
    .from("cards")
    .update({
      photo_url,
      full_name,
      title,
      company,
      slug,
      phone,
      email,
      instagram,
      linkedin,
      website,
      show_whatsapp,
      show_email,
      show_instagram,
      show_linkedin,
      show_website,
      theme
    })
    .eq("slug", slugAtual);

  if (error) {
    console.error("Erro ao salvar cartão:", error);
    throw new Error("Erro ao salvar cartão");
  }

  revalidatePath(`/admin/${slug}`);
  revalidatePath(`/${slug}`);

  redirect(`/admin/${slug}`);
}
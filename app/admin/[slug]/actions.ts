"use server";

import { supabase } from "../../src/lib/supabase";
import { revalidatePath } from "next/cache";

export async function updateCard(slug: string, formData: FormData) {

  console.log("SALVANDO...");
  console.log("SLUG:", slug);
  
  const data = {
    full_name: String(formData.get("full_name") || ""),
    title: String(formData.get("title") || ""),
    company: String(formData.get("company") || ""),
    phone: String(formData.get("phone") || ""),
    email: String(formData.get("email") || ""),
    instagram: String(formData.get("instagram") || ""),
    linkedin: String(formData.get("linkedin") || ""),
    website: String(formData.get("website") || ""),
    bio: String(formData.get("bio") || ""),
    whatsapp_label: String(formData.get("whatsapp_label") || "WhatsApp"),
    email_label: String(formData.get("email_label") || "E-mail"),
    instagram_label: String(formData.get("instagram_label") || "Instagram"),
    linkedin_label: String(formData.get("linkedin_label") || "LinkedIn"),
    website_label: String(formData.get("website_label") || "Website"),
    show_whatsapp: formData.get("show_whatsapp") === "on",
    show_email: formData.get("show_email") === "on",
    show_instagram: formData.get("show_instagram") === "on",
    show_linkedin: formData.get("show_linkedin") === "on",
    show_website: formData.get("show_website") === "on",
    theme: String(formData.get("theme") || "premium"),
  };

  const { error } = await supabase
    .from("cards")
    .update(data)
    .eq("slug", slug);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath(`/${slug}`);
  revalidatePath(`/admin/${slug}`);
}
"use server";

import { revalidatePath } from "next/cache";
import { supabaseAdmin } from "../../src/lib/supabaseAdmin";

export async function createNfcTag() {
  const { data: tags, error: selectError } = await supabaseAdmin
    .from("nfc_tags")
    .select("tag_code")
    .like("tag_code", "SOL-%")
    .order("tag_code", { ascending: false })
    .limit(1);

  if (selectError) {
    console.error("Erro ao buscar última NFC:", selectError.message);
    return;
  }

  let nextNumber = 1;

  if (tags && tags.length > 0) {
    const lastCode = tags[0].tag_code;
    const currentNumber = Number(lastCode.replace("SOL-", ""));

    if (!Number.isNaN(currentNumber)) {
      nextNumber = currentNumber + 1;
    }
  }

  const tagCode = `SOL-${String(nextNumber).padStart(6, "0")}`;

  const { error: insertError } = await supabaseAdmin.from("nfc_tags").insert({
    tag_code: tagCode,
    status: "available",
  });

  if (insertError) {
    console.error("Erro ao criar NFC:", insertError.message);
    return;
  }

  revalidatePath("/admin/nfc");
}

export async function linkNfcTag(formData: FormData) {
  const tagId = String(formData.get("tag_id") || "");
  const cardId = String(formData.get("card_id") || "");

  if (!tagId || !cardId) return;

  const { data: card, error: cardError } = await supabaseAdmin
    .from("cards")
    .select("id, client_id")
    .eq("id", cardId)
    .single();

  if (cardError || !card) {
    console.error("Erro ao buscar card:", cardError?.message);
    return;
  }

  const { error: updateError } = await supabaseAdmin
    .from("nfc_tags")
    .update({
      card_id: card.id,
      client_id: card.client_id,
      status: "linked",
      linked_at: new Date().toISOString(),
    })
    .eq("id", tagId);

  if (updateError) {
    console.error("Erro ao vincular NFC:", updateError.message);
    return;
  }

  revalidatePath("/admin/nfc");
}
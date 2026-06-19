import { supabaseAdmin } from "../../../src/lib/supabaseAdmin";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  const { data: card, error } = await supabaseAdmin
    .from("cards")
    .select("full_name, company, title, phone, email, website, bio")
    .eq("slug", slug)
    .single();

  if (error || !card) {
    return new Response("Contato não encontrado", { status: 404 });
  }

  const fullName = card.full_name || "Contato";
  const nameParts = fullName.trim().split(" ");
  const firstName = nameParts[0] || "";
  const lastName = nameParts.slice(1).join(" ") || "";

  const vcard = `BEGIN:VCARD
VERSION:3.0
N:${lastName};${firstName};;;
FN:${fullName}
ORG:${card.company || ""}
TITLE:${card.title || ""}
TEL;TYPE=CELL:${card.phone || ""}
EMAIL:${card.email || ""}
URL:${card.website || ""}
NOTE:${card.bio || ""}
END:VCARD`;

  return new Response(vcard, {
    headers: {
      "Content-Type": "text/vcard; charset=utf-8",
      "Content-Disposition": `attachment; filename="${slug}.vcf"`,
    },
  });
}
import QRCode from "react-qr-code";
import { supabase } from "../src/lib/supabase";

export default async function CardPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const { data: contact } = await supabase
    .from("cards")
    .select("*")
    .eq("slug", slug)
    .single();

  if (!contact || contact.is_active === false) {
    return (
      <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-6">
        <p>Cartão não encontrado ou inativo.</p>
      </main>
    );
  }

  const cardUrl = `https://smart-card-mvp.vercel.app/${slug}`;
  const whatsappUrl = `https://wa.me/${contact.phone?.replace(/\D/g, "")}`;

  return (
    <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-6">
      <section className="w-full max-w-md bg-slate-900 rounded-3xl shadow-2xl p-6 border border-slate-700 text-center">
        <div className="w-28 h-28 mx-auto rounded-full bg-gradient-to-br from-blue-500 to-yellow-400 flex items-center justify-center text-4xl font-bold">
          {contact.photo_url ? (
            <img
              src={contact.photo_url}
              alt={contact.full_name}
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            contact.full_name?.charAt(0)
          )}
        </div>

        <h1 className="mt-5 text-3xl font-bold">{contact.full_name}</h1>
        <p className="text-slate-300 mt-1">{contact.title}</p>
        <p className="text-yellow-400 font-semibold">{contact.company}</p>

        {contact.bio && (
          <p className="mt-4 text-sm text-slate-300 leading-relaxed">
            {contact.bio}
          </p>
        )}

        <div className="mt-6 space-y-3">
          {contact.show_whatsapp && contact.phone && (
            <a
              href={whatsappUrl}
              target="_blank"
              className="block w-full bg-green-500 py-3 rounded-xl font-bold"
            >
              {contact.whatsapp_label || "WhatsApp"}
            </a>
          )}

          {contact.show_email && contact.email && (
            <a
              href={`mailto:${contact.email}`}
              className="block w-full bg-slate-700 py-3 rounded-xl font-bold"
            >
              {contact.email_label || "E-mail"}
            </a>
          )}

          {contact.show_instagram && contact.instagram && (
            <a
              href={`https://instagram.com/${contact.instagram}`}
              target="_blank"
              className="block w-full bg-pink-500 py-3 rounded-xl font-bold"
            >
              {contact.instagram_label || "Instagram"}
            </a>
          )}

          {contact.show_linkedin && contact.linkedin && (
            <a
            href={`https://linkedin.com/in/${contact.linkedin}`}
              target="_blank"
              className="block w-full bg-blue-600 py-3 rounded-xl font-bold"
            >
              {contact.linkedin_label || "LinkedIn"}
            </a>
          )}

          {contact.show_website && contact.website && (
            <a
              href={contact.website}
              target="_blank"
              className="block w-full bg-yellow-400 text-slate-950 py-3 rounded-xl font-bold"
            >
              {contact.website_label || "Website"}
            </a>
          )}

          <a
            href={`/api/vcard/${slug}`}
            className="block w-full border border-yellow-400 text-yellow-400 py-3 rounded-xl font-bold"
          >
            Salvar contato
          </a>
        </div>

        <div className="mt-8 bg-slate-800 rounded-2xl p-4">
          <p className="text-xs text-slate-400 mb-3">
            Compartilhe este cartão
          </p>

          <div className="bg-white p-3 rounded-xl inline-block">
            <QRCode value={cardUrl} size={120} />
          </div>

          <p className="text-xs text-slate-400 mt-3 break-all">{cardUrl}</p>
        </div>
      </section>
    </main>
  );
}
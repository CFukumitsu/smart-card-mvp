import QRCode from "react-qr-code";
import { supabase } from "../src/lib/supabase";
import TrackEvent from "./TrackEvent";
import TrackedLink from "./TrackedLink";

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
  const currentTheme = contact.theme || "dark";

  const themeClass =
    currentTheme === "light"
      ? "bg-white text-slate-950 border-slate-200"
      : currentTheme === "blue"
      ? "bg-gradient-to-br from-[#071a3d] via-[#0b2f70] to-[#020617] text-white border-blue-400/30"
      : currentTheme === "gold"
      ? "bg-gradient-to-br from-[#3a2800] via-[#8a6500] to-[#111827] text-white border-yellow-400/30"
      : "bg-[#080d17] text-white border-white/10";

  const mutedText =
    currentTheme === "light" ? "text-slate-600" : "text-slate-300";

  const pageBg =
    currentTheme === "light"
      ? "bg-slate-100"
      : "bg-[#050814]";

  return (
    <main className={`min-h-screen flex items-center justify-center p-6 ${pageBg}`}>
      <TrackEvent slug={slug} />
      <section
        className={`relative w-full max-w-md overflow-hidden rounded-3xl border p-6 text-center shadow-2xl ${themeClass}`}
      >
        <div className="absolute left-[-80px] top-28 h-24 w-[520px] rotate-[-18deg] border-t border-yellow-500/50" />
        <div className="absolute right-[-80px] top-40 h-20 w-[420px] rotate-[-18deg] border-t border-yellow-500/30" />

        <div className="relative w-28 h-28 mx-auto rounded-full bg-gradient-to-br from-blue-500 to-yellow-400 flex items-center justify-center text-4xl font-bold overflow-hidden border-2 border-white/70">
          {contact.photo_url ? (
            <img
              src={contact.photo_url}
              alt={contact.full_name}
              className="w-full h-full object-cover"
            />
          ) : (
            contact.full_name?.charAt(0)
          )}
        </div>

        <h1 className="relative mt-5 text-3xl font-bold">
          {contact.full_name}
        </h1>

        <p className={`relative mt-1 ${mutedText}`}>{contact.title}</p>

        <p className="relative mt-2 text-yellow-400 font-semibold">
          {contact.company}
        </p>

        {contact.bio && (
          <p className={`relative mt-4 text-sm leading-relaxed ${mutedText}`}>
            {contact.bio}
          </p>
        )}

        <div className="relative mt-6 space-y-3">
          {contact.show_whatsapp && contact.phone && (
            <TrackedLink
              slug={slug}
              eventType="click_whatsapp"
              href={whatsappUrl}
              className="block w-full rounded-xl border border-yellow-400/80 py-3 font-bold text-inherit"
            >
              {contact.whatsapp_label || "WhatsApp"}
            </TrackedLink>
          )}

          {contact.show_email && contact.email && (
            <TrackedLink
              slug={slug}
              eventType="click_email"
              href={`mailto:${contact.email}`}
              className="block w-full rounded-xl border border-yellow-400/80 py-3 font-bold text-inherit"
            >
              {contact.email_label || "E-mail"}
            </TrackedLink>
          )}

          {contact.show_instagram && contact.instagram && (
            <TrackedLink
              slug={slug}
              eventType="click_instagram"
              href={`https://instagram.com/${contact.instagram}`}
              target="_blank"
              className="block w-full rounded-xl border border-yellow-400/80 py-3 font-bold text-inherit"
            >
              {contact.instagram_label || "Instagram"}
            </TrackedLink>
          )}

          {contact.show_linkedin && contact.linkedin && (
            <TrackedLink
              slug={slug}
              eventType="click_linkedin"
              href={`https://linkedin.com/in/${contact.linkedin}`}
              target="_blank"
              className="block w-full rounded-xl border border-yellow-400/80 py-3 font-bold text-inherit"
            >
              {contact.linkedin_label || "LinkedIn"}
            </TrackedLink>
          )}

          {contact.show_website && contact.website && (
            <TrackedLink
              slug={slug}
              eventType="click_website"
              href={contact.website}
              target="_blank"
              className="block w-full rounded-xl border border-yellow-400/80 py-3 font-bold text-inherit"
            >
              {contact.website_label || "Website"}
            </TrackedLink>
          )} 

          <TrackedLink
            slug={slug}
            eventType="click_vcard"
            href={`/api/vcard/${slug}`}
            className="block w-full rounded-xl border border-yellow-400/80 py-3 font-bold text-yellow-400"
          >
            Salvar contato
          </TrackedLink>
        </div>

        <div className="relative mt-8 rounded-2xl border border-white/10 bg-black/15 p-4">
          <p className={`mb-3 text-xs ${mutedText}`}>
            Compartilhe este cartão
          </p>

          <div className="inline-block rounded-xl bg-white p-3">
            <QRCode value={cardUrl} size={120} />
          </div>

          <p className={`mt-3 break-all text-xs ${mutedText}`}>{cardUrl}</p>
        </div>
      </section>
    </main>
  );
}
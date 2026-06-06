"use client";

import { QRCodeSVG } from "qrcode.react";
import { CardTools } from "./CardTools";

type CardPreviewProps = {
  card: {
    full_name?: string;
    title?: string;
    company?: string;
    slug?: string;
    photo_url?: string;
    theme?: string;
    show_whatsapp?: boolean;
    show_email?: boolean;
    show_instagram?: boolean;
    show_linkedin?: boolean;
    show_website?: boolean;
  };
};

export default function CardPreview({ card }: CardPreviewProps) {
  const currentTheme = card.theme || "dark";

  const previewThemeClass =
    currentTheme === "light"
      ? "bg-white text-slate-950"
      : currentTheme === "blue"
      ? "bg-gradient-to-br from-[#071a3d] via-[#0b2f70] to-[#020617] text-white"
      : currentTheme === "gold"
      ? "bg-gradient-to-br from-[#3a2800] via-[#8a6500] to-[#111827] text-white"
      : "bg-[#080d17] text-white";

  return (
    <aside className="border-l border-white/10 bg-[#08101f] p-6">
      <h3 className="mb-5 text-sm font-bold">Preview do Cartão</h3>

      <div className="mx-auto w-[285px] rounded-[2.4rem] border border-white/20 bg-black p-3 shadow-[0_30px_90px_rgba(0,0,0,0.65)]">
        <div
          className={`relative overflow-hidden rounded-[2rem] px-5 py-7 text-center ${previewThemeClass}`}
        >
          <div className="absolute left-[-50px] top-20 h-24 w-80 rotate-[-18deg] border-t border-yellow-500/60" />
          <div className="absolute right-[-40px] top-28 h-20 w-64 rotate-[-18deg] border-t border-yellow-500/40" />

          <div className="relative mx-auto mb-5 flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border-2 border-white/70 bg-gradient-to-br from-blue-500 to-yellow-400 text-4xl font-bold">
            {card.photo_url ? (
              <img
                src={card.photo_url}
                alt={card.full_name || "Foto do cartão"}
                className="h-full w-full object-cover"
              />
            ) : (
              card.full_name?.charAt(0)
            )}
          </div>

          <h2 className="relative text-xl font-bold">{card.full_name}</h2>
          <p className="relative mt-1 text-sm text-slate-400">{card.title}</p>
          <p className="relative mt-2 text-sm font-bold text-yellow-400">
            {card.company}
          </p>

          <div className="relative mt-6 space-y-2">
            {card.show_whatsapp && (
              <div className="rounded-lg border border-yellow-500/80 py-2 text-sm">
                WhatsApp
              </div>
            )}

            {card.show_email && (
              <div className="rounded-lg border border-yellow-500/80 py-2 text-sm">
                E-mail
              </div>
            )}

            {card.show_instagram && (
              <div className="rounded-lg border border-yellow-500/80 py-2 text-sm">
                Instagram
              </div>
            )}

            {card.show_linkedin && (
              <div className="rounded-lg border border-yellow-500/80 py-2 text-sm">
                LinkedIn
              </div>
            )}

            {card.show_website && (
              <div className="rounded-lg border border-yellow-500/80 py-2 text-sm">
                Visitar Website
              </div>
            )}
          </div>

          <div className="relative mt-5 text-xs text-yellow-400">
            Salvar contato
          </div>

          <div className="relative mx-auto mt-4 flex w-fit justify-center rounded-xl bg-white p-3">
            <QRCodeSVG
              value={`https://seudominio.com/${card.slug}`}
              size={92}
              bgColor="#ffffff"
              fgColor="#000000"
              level="H"
            />
          </div>
        </div>

        <div className="relative mx-auto mt-4 flex w-fit justify-center rounded-xl">
          <CardTools slug={card.slug || ""} />
        </div>
      </div>
    </aside>
  );
}
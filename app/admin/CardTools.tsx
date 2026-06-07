"use client";

import QRCode from "qrcode";
import { useEffect, useState } from "react";

export function CardTools({ slug }: { slug: string }) {
  const [copied, setCopied] = useState(false);
  const [cardUrl, setCardUrl] = useState("");

  useEffect(() => {
    setCardUrl(`${window.location.origin}/${slug}`);
  }, [slug]);

  async function copyLink() {
    if (!cardUrl) return;

    await navigator.clipboard.writeText(cardUrl);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1800);
  }

  async function downloadQrCode() {
    if (!cardUrl) return;

    const qrImage = await QRCode.toDataURL(cardUrl, {
      width: 1200,
      margin: 2,
      errorCorrectionLevel: "H",
    });

    const link = document.createElement("a");

    link.href = qrImage;
    link.download = `qr-code-${slug}.png`;

    link.click();
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
      <p className="text-sm font-semibold text-white">
        Compartilhamento
      </p>

      <div className="mt-3 rounded-xl border border-white/10 bg-[#070b16] px-3 py-2 text-xs text-slate-300 break-all">
        {cardUrl || "Carregando link..."}
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={copyLink}
          className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-white transition hover:bg-white/10"
        >
          {copied ? "Link copiado!" : "Copiar link"}
        </button>

        <button
          type="button"
          onClick={downloadQrCode}
          className="rounded-xl bg-yellow-400 px-4 py-2 text-xs font-bold text-slate-950 transition hover:bg-yellow-300"
        >
          Baixar QR PNG
        </button>
      </div>
    </div>
  );
}
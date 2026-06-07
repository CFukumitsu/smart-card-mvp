"use client";

import { useRef, useState } from "react";
import { supabase } from "../src/lib/supabase";

export default function PhotoUploader({
  onUpload,
  currentPhotoUrl,
  fullName,
}: {
  onUpload: (url: string) => void;
  currentPhotoUrl?: string;
  fullName?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];

    if (!file) return;

    setUploading(true);

    const fileName = `${Date.now()}-${file.name}`;

    const { error } = await supabase.storage
      .from("avatars")
      .upload(fileName, file);

    if (error) {
      console.error(error);
      alert("Erro ao enviar imagem");
      setUploading(false);
      return;
    }

    const { data } = supabase.storage.from("avatars").getPublicUrl(fileName);

    onUpload(data.publicUrl);
    setUploading(false);
  }

  return (
    <div>
      <label className="mb-2 block text-xs font-medium text-slate-400">
        Foto
      </label>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
        <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-2xl border border-white/15 bg-gradient-to-br from-blue-500/30 to-yellow-400/30 text-2xl font-bold text-white">
          {currentPhotoUrl ? (
            <img
              src={currentPhotoUrl}
              alt="Foto do cartão"
              className="h-full w-full object-cover"
            />
          ) : (
            <span>{fullName?.charAt(0) || "?"}</span>
          )}
        </div>

        <div className="flex-1">
          <p className="text-sm font-semibold text-white">Foto do cartão</p>
          <p className="mt-1 text-xs text-slate-400">
            Recomendo uma foto quadrada para melhor encaixe.
          </p>

          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={uploading}
            className="mt-3 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10 disabled:opacity-60"
          >
            {uploading
              ? "Enviando..."
              : currentPhotoUrl
              ? "Alterar foto"
              : "Enviar foto"}
          </button>
        </div>
      </div>
    </div>
  );
}
"use client";

import { useState } from "react";
import CardPreview from "./CardPreview";
import ThemeSelector from "./ThemeSelector";
import PhotoUploader from "./PhotoUploader";

export default function AdminCardEditor({
  card,
  action,
}: {
  card: any;
  action: (formData: FormData) => void;
}) {
  const [liveCard, setLiveCard] = useState(card);

  function updateField(field: string, value: any) {
    setLiveCard((prev: any) => ({
      ...prev,
      [field]: value,
    }));
  }

  const fieldClass =
    "w-full h-11 rounded-xl border border-white/10 bg-[#121a2b] px-4 text-sm text-white outline-none transition focus:border-blue-500/70 focus:ring-2 focus:ring-blue-500/20";

  const labelClass = "mb-1.5 block text-xs font-medium text-slate-400";

  const cardBox =
    "rounded-2xl border border-white/10 bg-[#0d1424]/90 shadow-[0_20px_60px_rgba(0,0,0,0.35)]";

  return (
    <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_460px]">
      <div>
        <form action={action}>
          <div className="mb-5 flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-400">
                Smart Card &gt; Cartões &gt;{" "}
                <span className="text-white">{liveCard.full_name}</span>
              </p>
              <h2 className="mt-2 text-2xl font-bold">Editar Cartão</h2>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <section className={`${cardBox} p-5`}>
              <h3 className="mb-5 text-sm font-bold">Dados Básicos</h3>

              <PhotoUploader
                currentPhotoUrl={liveCard.photo_url}
                fullName={liveCard.full_name}
                onUpload={(url) =>
                  setLiveCard({
                    ...liveCard,
                    photo_url: url,
                  })
                }
              />

              <input
                type="hidden"
                name="photo_url"
                value={liveCard.photo_url || ""}
              />

              <div className="mt-4">
                <label className={labelClass}>Nome</label>
                <input
                  name="full_name"
                  className={fieldClass}
                  defaultValue={card.full_name}
                  onChange={(e) => updateField("full_name", e.target.value)}
                />
              </div>

              <div className="mt-4">
                <label className={labelClass}>Cargo</label>
                <input
                  name="title"
                  className={fieldClass}
                  defaultValue={card.title}
                  onChange={(e) => updateField("title", e.target.value)}
                />
              </div>

              <div className="mt-4">
                <label className={labelClass}>Empresa</label>
                <input
                  name="company"
                  className={fieldClass}
                  defaultValue={card.company}
                  onChange={(e) => updateField("company", e.target.value)}
                />
              </div>

              <div className="mt-4">
                <label className={labelClass}>Slug do cartão</label>
                <input
                  name="slug"
                  className={fieldClass}
                  defaultValue={card.slug}
                  onChange={(e) => updateField("slug", e.target.value)}
                />
              </div>
            </section>

            <section className={`${cardBox} p-5`}>
              <h3 className="mb-5 text-sm font-bold">Contato</h3>

              <label className={labelClass}>Telefone</label>
              <input
                name="phone"
                className={fieldClass}
                defaultValue={card.phone}
                onChange={(e) => updateField("phone", e.target.value)}
              />

              <div className="mt-4">
                <label className={labelClass}>E-mail</label>
                <input
                  name="email"
                  className={fieldClass}
                  defaultValue={card.email}
                  onChange={(e) => updateField("email", e.target.value)}
                />
              </div>

              <div className="mt-4">
                <label className={labelClass}>Instagram</label>
                <input
                  name="instagram"
                  className={fieldClass}
                  defaultValue={card.instagram}
                  onChange={(e) => updateField("instagram", e.target.value)}
                />
              </div>

              <div className="mt-4">
                <label className={labelClass}>LinkedIn</label>
                <input
                  name="linkedin"
                  className={fieldClass}
                  defaultValue={card.linkedin}
                  onChange={(e) => updateField("linkedin", e.target.value)}
                />
              </div>

              <div className="mt-4">
                <label className={labelClass}>Website</label>
                <input
                  name="website"
                  className={fieldClass}
                  defaultValue={card.website}
                  onChange={(e) => updateField("website", e.target.value)}
                />
              </div>
            </section>

            <section className={`${cardBox} p-5 lg:col-span-2`}>
              <h3 className="mb-1 text-sm font-bold">Botões da Home</h3>
              <p className="mb-5 text-xs text-slate-400">
                Selecione quais botões serão exibidos no cartão.
              </p>

              <div className="grid grid-cols-1 gap-3 text-sm sm:grid-cols-2 lg:grid-cols-5">
                {[
                  ["show_whatsapp", "WhatsApp"],
                  ["show_email", "E-mail"],
                  ["show_instagram", "Instagram"],
                  ["show_linkedin", "LinkedIn"],
                  ["show_website", "Website"],
                ].map(([name, label]) => (
                  <label
                    key={name}
                    className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-slate-200"
                  >
                    <input
                      name={name}
                      type="checkbox"
                      defaultChecked={card[name]}
                      className="h-4 w-4 accent-blue-600"
                      onChange={(e) => updateField(name, e.target.checked)}
                    />
                    {label}
                  </label>
                ))}
              </div>
            </section>

            <section className={`${cardBox} p-5 lg:col-span-2`}>
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <h3 className="text-sm font-bold">Tema</h3>
                  <p className="mt-1 text-xs text-slate-400">
                    Aparência visual aplicada ao cartão digital.
                  </p>
                </div>

                <ThemeSelector
                  currentTheme={liveCard.theme || "dark"}
                  onThemeChange={(theme: string) => updateField("theme", theme)}
                />
              </div>
            </section>
          </div>

          <div className="mt-5 flex flex-col gap-4 sm:flex-row">
            <button
              type="submit"
              className="flex-1 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 py-3 text-sm font-bold shadow-lg shadow-blue-600/20 hover:from-blue-500 hover:to-blue-400"
            >
              Salvar alterações
            </button>

            <a
              href={`/${liveCard.slug}`}
              target="_blank"
              className="flex-1 rounded-xl border border-white/10 bg-white/5 py-3 text-center text-sm font-bold hover:bg-white/10"
            >
              Visualizar cartão
            </a>
          </div>
        </form>
      </div>

      <div className="xl:sticky xl:top-8 xl:self-start">
        <CardPreview card={liveCard} />
      </div>
    </div>
  );
}
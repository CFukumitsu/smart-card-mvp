import QRCode from "react-qr-code";
import { contacts } from "../src/data/contacts";

export default async function CardPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const contact = contacts[slug as keyof typeof contacts];

  if (!contact) {
    return <main>Contato não encontrado</main>;
  }

  const cardUrl = `https://smart-card-mvp.vercel.app/${slug}`;

  return (
    <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-6">
      <section className="w-full max-w-md bg-slate-900 rounded-3xl shadow-2xl p-6 border border-slate-700 text-center">
        <h1 className="text-4xl font-bold">
          {contact.fullName}
        </h1>

        <p className="mt-3 text-slate-300">
          Cartão Digital Smart Card
        </p>

        <p className="mt-2 text-yellow-400 font-semibold">
          Página dinâmica funcionando 🚀
        </p>
      
        <div className="mt-6 bg-slate-800 rounded-2xl p-4">
          <p className="text-sm text-slate-300 mb-3">
            Aproxime o NFC ou escaneie o QR Code
          </p>

          <div className="bg-white p-3 rounded-xl inline-block">
            <QRCode value={cardUrl} size={150} />
          </div>

          <a
            href={`/api/vcard/${slug}`}
            className="mt-4 block w-full text-center bg-yellow-400 text-slate-950 py-3 rounded-xl font-bold"
          >
            Salvar contato
          </a>
          <p className="text-xs text-slate-400 mt-3 break-all">
            {cardUrl}
          </p>
        </div>
      </section>
    </main>
  );
}
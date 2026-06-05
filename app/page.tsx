export default function Home() {
  const cardUrl = "https://smart-card-mvp.vercel.app/rachel";

  return (
    <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-6">
      <section className="w-full max-w-md bg-slate-900 rounded-3xl shadow-2xl p-6 border border-slate-700">
        <div className="text-center">
          <div className="w-28 h-28 mx-auto rounded-full bg-gradient-to-br from-blue-500 to-yellow-400 flex items-center justify-center text-4xl font-bold">
            R
          </div>

          <h1 className="mt-5 text-3xl font-bold">Rachel FKT</h1>
          <p className="text-slate-300 mt-1">Consultora Comercial</p>
          <p className="text-yellow-400 font-semibold">Smart Card Digital</p>
        </div>

        <div className="mt-6 bg-slate-800 rounded-2xl p-4 text-center">
          <p className="text-sm text-slate-300 mb-2">
            Aproxime o NFC ou escaneie o QR Code
          </p>

          <div className="w-40 h-40 mx-auto bg-white rounded-xl flex items-center justify-center text-slate-900 font-bold">
            QR CODE
          </div>

          <p className="text-xs text-slate-400 mt-3 break-all">
            {cardUrl}
          </p>
        </div>

        <div className="mt-6 space-y-3">
          <a
            href="https://wa.me/5511999999999"
            className="block w-full text-center bg-green-500 text-white py-3 rounded-xl font-semibold"
          >
            Chamar no WhatsApp
          </a>

          <a
            href="https://www.instagram.com/solution.gestao/"
            className="block w-full text-center bg-pink-500 text-white py-3 rounded-xl font-semibold"
          >
            Ver Instagram
          </a>

          <a
            href="https://www.linkedin.com/"
            className="block w-full text-center bg-blue-600 text-white py-3 rounded-xl font-semibold"
          >
            Ver LinkedIn
          </a>

          <a
            href={`mailto:contato@solution.com.br`}
            className="block w-full text-center bg-slate-700 text-white py-3 rounded-xl font-semibold"
          >
            Enviar E-mail
          </a>
        </div>

        <div className="mt-6 border-t border-slate-700 pt-4 text-center">
          <p className="text-xs text-slate-400">
            Cartão digital com QR Code e NFC
          </p>
          <p className="text-sm font-semibold text-yellow-400">
            Smart Card MVP
          </p>
        </div>
      </section>
    </main>
  );
}
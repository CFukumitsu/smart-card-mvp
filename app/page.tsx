"use client";

export default function Home() {
  function salvarContato() {
    const vcard = `BEGIN:VCARD
VERSION:3.0
N:Smart;Rachel;;;
FN:Rachel Smart
ORG:Smart Card
TITLE:Consultora de Networking Digital
TEL;TYPE=CELL,VOICE:+5511999998888
TEL;TYPE=WHATSAPP:+5511999998888
EMAIL:rachel@smartcard.com.br
URL:https://instagram.com/rachel.smartcard
URL:https://linkedin.com/in/rachel-smartcard
NOTE:Contato criado pelo Smart Card MVP
END:VCARD`;

    const blob = new Blob([vcard], { type: "text/vcard;charset=utf-8" });
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "rachel-smart.vcf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    window.URL.revokeObjectURL(url);
  }

  return (
    <main className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8 text-center">

        <div className="w-24 h-24 mx-auto rounded-full bg-blue-900 text-white flex items-center justify-center text-4xl font-bold">
          R
        </div>

        <h1 className="mt-6 text-3xl font-bold text-slate-800">
          Rachel Smart
        </h1>

        <p className="text-slate-500 mt-2">
          Consultora de Networking Digital
        </p>

        <p className="text-blue-900 font-semibold mt-1">
          Smart Card
        </p>

        <button
          onClick={salvarContato}
          className="mt-8 w-full bg-blue-900 text-white py-3 rounded-xl font-semibold hover:bg-blue-800 transition"
        >
          Salvar Contato
        </button>

        <div className="mt-8 flex flex-col gap-3">

          <a
            href="https://wa.me/5511999998888"
            target="_blank"
            rel="noopener noreferrer"
            className="border rounded-xl py-3 hover:bg-slate-50"
          >
            💬 WhatsApp
          </a>

          <a
            href="https://instagram.com/rachel.smartcard"
            target="_blank"
            rel="noopener noreferrer"
            className="border rounded-xl py-3 hover:bg-slate-50"
          >
            📷 Instagram
          </a>

          <a
            href="https://linkedin.com/in/rachel-smartcard"
            target="_blank"
            rel="noopener noreferrer"
            className="border rounded-xl py-3 hover:bg-slate-50"
          >
            💼 LinkedIn
          </a>

        </div>

        <p className="mt-8 text-xs text-slate-400">
          Powered by Smart Card MVP
        </p>

      </div>
    </main>
  );
}
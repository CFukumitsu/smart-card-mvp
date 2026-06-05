"use client";

export default function Home() {
  function salvarContato() {
    const vcard = `BEGIN:VCARD
VERSION:3.0
N:Fukumitsu;César;;;
FN:César Fukumitsu
ORG:SOLUTION
TITLE:Gerente Comercial
TEL;TYPE=CELL,VOICE:+5511982050026
TEL;TYPE=WHATSAPP:+5511982050026
EMAIL:cfukumitsu@solutionrt.com.br
URL:https://instagram.com/cfukumitsu
URL:https://linkedin.com/in/cfukumitsu
NOTE:Contato criado pelo Smart Card MVP
END:VCARD`;

    const blob = new Blob([vcard], { type: "text/vcard;charset=utf-8" });
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "cesar-fukumitsu.vcf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    window.URL.revokeObjectURL(url);
  }

  return (
    <main className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8 text-center">
        <div className="w-24 h-24 mx-auto rounded-full bg-blue-900 text-white flex items-center justify-center text-4xl font-bold">
          C
        </div>

        <h1 className="mt-6 text-3xl font-bold text-slate-800">
          César Fukumitsu
        </h1>

        <p className="text-slate-500 mt-2">Gerente Comercial</p>

        <p className="text-blue-900 font-semibold mt-1">SOLUTION</p>

        <button
          onClick={salvarContato}
          className="mt-8 w-full bg-blue-900 text-white py-3 rounded-xl font-semibold hover:bg-blue-800 transition"
        >
          Salvar Contato
        </button>

        <div className="mt-8 flex flex-col gap-3">
          <a
            href="https://wa.me/5511982050026"
            target="_blank"
            className="border rounded-xl py-3 hover:bg-slate-50"
          >
            💬 WhatsApp
          </a>

          <a
            href="https://instagram.com/cfukumitsu"
            target="_blank"
            className="border rounded-xl py-3 hover:bg-slate-50"
          >
            📷 Instagram
          </a>

          <a
            href="https://linkedin.com/in/cfukumitsu"
            target="_blank"
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
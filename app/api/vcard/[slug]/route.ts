const contacts: Record<string, any> = {
    thiago: {
      firstName: "Thiago",
      lastName: "Barba",
      fullName: "Thiago Barba",
      company: "Smart Card MVP",
      title: "Consultor Comercial",
      phone: "+5511999999999",
      email: "thiago@email.com",
      url: "https://smart-card-mvp.vercel.app/thiago",
    },
    cesar: {
      firstName: "César",
      lastName: "Fukumitsu",
      fullName: "César Fukumitsu",
      company: "SOLUTION",
      title: "Consultor Comercial",
      phone: "+5511999999999",
      email: "cesar@email.com",
      url: "https://smart-card-mvp.vercel.app/cesar",
    },
  };
  
  export async function GET(
    request: Request,
    { params }: { params: Promise<{ slug: string }> }
  ) {
    const { slug } = await params;
    const contact = contacts[slug];
  
    if (!contact) {
      return new Response("Contato não encontrado", { status: 404 });
    }
  
    const vcard = `BEGIN:VCARD
  VERSION:3.0
  N:${contact.lastName};${contact.firstName};;;
  FN:${contact.fullName}
  ORG:${contact.company}
  TITLE:${contact.title}
  TEL;TYPE=CELL:${contact.phone}
  EMAIL:${contact.email}
  URL:${contact.url}
  END:VCARD`;
  
    return new Response(vcard, {
      headers: {
        "Content-Type": "text/vcard; charset=utf-8",
        "Content-Disposition": `attachment; filename="${slug}.vcf"`,
      },
    });
  }
export const contacts = {
    thiago: {
      firstName: "Thiago",
      lastName: "Barba",
      fullName: "Thiago Barba",
      company: "Smart Card MVP",
      title: "Consultor Comercial",
      phone: "+5511999999999",
      email: "thiago@email.com",
      instagram: "solution.gestao",
      linkedin: "https://www.linkedin.com/",
    },
    cesar: {
      firstName: "César",
      lastName: "Fukumitsu",
      fullName: "César Fukumitsu",
      company: "SOLUTION",
      title: "Gerente Comercial",
      phone: "+5511982050026",
      email: "cfukumitsu@solutionrt.com.br",
      instagram: "CFukumitsu",
      linkedin: "https://www.linkedin.com/in/CFukumitsu",
    },
  };
  
  export type ContactSlug = keyof typeof contacts;
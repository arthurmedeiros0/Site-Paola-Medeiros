/** Conteúdo fornecido pela família. Revisar dados profissionais antes da publicação oficial. */
export const professional = {
  name: "Dra. Paola Medeiros",
  fullName: "Dra. Paola Michele Medeiros",
  role: "Cirurgiã-dentista",
  registration: "CRO-PR 15593",
  whatsapp: "5541985136349",
  whatsappLabel: "(41) 98513-6349",
  message: "Olá! Gostaria de agendar uma consulta com a Dra. Paola.",
  instagram: "https://www.instagram.com/drapaollamedeiros/",
  linkedin: "https://www.linkedin.com/in/paola-michele-medeiros-80888967/",
  regions: ["Curitiba", "Araucária", "Colombo", "Sítio Cercado, Curitiba"],
  images: {
    main: "/images/paola-principal.png",
    professional: "/images/paola-profissional.png",
    portrait: "/images/paola-retrato.jpg",
    graduation: "/images/paola-formatura.png",
  },
  hero: {
    eyebrow: "Odontologia com excelência e acolhimento",
    title: { firstLine: "Cada sorriso", secondLine: "tem uma", emphasis: "história." },
    subtitle: "Cada paciente merece um cuidado único.",
    description:
      "Desde 2003, dedicando sua trajetória à odontologia, com atenção individualizada e compromisso com a saúde, a função e a estética do sorriso.",
  },
  about: {
    title: "Mais do que cuidar de sorrisos, cuidar de pessoas.",
    paragraphs: [
      "Formada em Odontologia pela Pontifícia Universidade Católica do Paraná, em 2003, a Dra. Paola Medeiros construiu sua trajetória profissional unindo conhecimento, dedicação e um olhar atento às necessidades de cada paciente.",
      "Com atuação em Ortodontia e Reabilitação Oral, valoriza a combinação entre técnica, estética e funcionalidade, sempre buscando um atendimento individualizado e acolhedor.",
      "Sua filosofia de trabalho parte de uma ideia simples: cada sorriso é único e merece um cuidado igualmente especial.",
    ],
  },
  specialties: [
    {
      title: "Ortodontia",
      label: "Alinhamento e equilíbrio",
      description:
        "A Ortodontia atua na avaliação e correção do posicionamento dentário e das relações entre os dentes e a mordida, considerando aspectos funcionais e estéticos.",
    },
    {
      title: "Prótese Dentária e Reabilitação Oral",
      label: "Função e harmonia",
      description:
        "Tratamentos voltados à recuperação de estruturas dentárias, buscando restabelecer função, conforto e harmonia estética, conforme as necessidades de cada paciente.",
    },
    {
      title: "Atendimento individualizado",
      label: "Um olhar para cada pessoa",
      description:
        "Cada planejamento considera as características, necessidades e objetivos do paciente, valorizando uma relação de confiança e acompanhamento cuidadoso.",
    },
  ],
  timeline: [
    {
      label: "2003",
      title: "O início de uma dedicação",
      description:
        "Graduação em Odontologia pela Pontifícia Universidade Católica do Paraná — PUCPR.",
    },
    {
      label: "Formação contínua",
      title: "Conhecimento que se aprofunda",
      description:
        "Pós-graduação em Ortodontia pela Uningá e formação de especialização em Reabilitação Oral pela Universidade Federal do Rio de Janeiro — UFRJ.",
    },
    {
      label: "Força Aérea Brasileira",
      title: "Responsabilidade e compromisso",
      description:
        "Atuação como Primeiro-Tenente e cirurgiã-dentista no Departamento de Controle do Espaço Aéreo — DECEA. Uma experiência marcada pela disciplina e pelo compromisso profissional.",
    },
    {
      label: "Hoje",
      title: "Cada paciente, uma nova história",
      description:
        "Atendimento odontológico com foco em ortodontia, cuidado individualizado e saúde bucal na região de Curitiba.",
    },
  ],
  differences: [
    {
      title: "Experiência",
      description: "Mais de duas décadas de dedicação à odontologia.",
    },
    {
      title: "Acolhimento",
      description: "Atenção, escuta e respeito à individualidade.",
    },
    {
      title: "Planejamento",
      description: "Cuidado e acompanhamento das etapas do tratamento.",
    },
    {
      title: "Estética e função",
      description:
        "Busca pelo equilíbrio entre saúde bucal, funcionalidade e harmonia do sorriso.",
    },
  ],
  care: [
    "Gentileza em cada encontro.",
    "Clareza para entender cada etapa.",
    "Cuidado para construir confiança.",
  ],
  contact: {
    title: { firstLine: "Seu sorriso merece", emphasis: "atenção especial." },
    description:
      "Entre em contato para saber mais sobre os atendimentos e agendar sua consulta.",
  },
};

export const whatsappUrl = `https://wa.me/${professional.whatsapp}?text=${encodeURIComponent(professional.message)}`;

export const navigation = [
  { label: "Início", href: "#inicio" },
  { label: "Sobre", href: "#sobre" },
  { label: "Especialidades", href: "#especialidades" },
  { label: "Trajetória", href: "#trajetoria" },
  { label: "Contato", href: "#contato" },
];

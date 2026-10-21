export type Testimonial = {
  id: string;
  text: string;
  /** Rótulo genérico, sem nome ou dados pessoais do paciente. */
  publicLabel:
    | "Relato de paciente"
    | "Avaliação de paciente"
    | "Experiência compartilhada";
  authorized: boolean;
  published: boolean;
  /** Preencher somente quando a nota constar no material autorizado. */
  rating?: 5;
  source?: "WhatsApp" | "Google";
  /** Opinião de outra pessoa transmitida por quem enviou a mensagem. */
  indirect?: boolean;
};

/** Inserir apenas texto real revisado, com autorização documentada.
 * Textos sem autorização ficam somente em .local/testimonials.json (ignorado).
 * Os prints originais ficam em .local/depoimentos, fora da pasta public.
 * Cada entrada depende de authorized E published para aparecer.
 */
export const testimonials: Testimonial[] = [
  {
    id: "depoimento-1",
    text: "",
    publicLabel: "Relato de paciente",
    authorized: false,
    published: false,
    source: "WhatsApp",
  },
  {
    id: "depoimento-2",
    text: "",
    publicLabel: "Relato de paciente",
    authorized: false,
    published: false,
    source: "WhatsApp",
  },
  {
    id: "depoimento-3",
    text: "",
    publicLabel: "Avaliação de paciente",
    authorized: false,
    published: false,
    source: "Google",
    rating: 5,
  },
  {
    id: "depoimento-4",
    text: "",
    publicLabel: "Experiência compartilhada",
    authorized: false,
    published: false,
    source: "WhatsApp",
    indirect: true,
  },
];

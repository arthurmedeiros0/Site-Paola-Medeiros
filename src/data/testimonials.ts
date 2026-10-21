export type Testimonial = {
  id: string;
  text: string;
  /** Identificação pública revisada, sem nome ou dados pessoais do paciente. */
  publicLabel: string;
  authorized: boolean;
  published: boolean;
};

/** Inserir apenas texto real revisado, com autorização documentada.
 * Os prints originais não são usados pelo componente e suas rotas são bloqueadas.
 * Cada entrada depende de authorized E published para aparecer.
 */
export const testimonials: Testimonial[] = [
  {
    id: "depoimento-1",
    text: "",
    publicLabel: "Relato autorizado",
    authorized: false,
    published: false,
  },
  {
    id: "depoimento-2",
    text: "",
    publicLabel: "Relato autorizado",
    authorized: false,
    published: false,
  },
  {
    id: "depoimento-3",
    text: "",
    publicLabel: "Relato autorizado",
    authorized: false,
    published: false,
  },
  {
    id: "depoimento-4",
    text: "",
    publicLabel: "Relato autorizado",
    authorized: false,
    published: false,
  },
];

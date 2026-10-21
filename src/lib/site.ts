export function getSiteUrl(): URL | undefined {
  const value = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!value) return undefined;
  const url = new URL(value);
  if (!["https:", "http:"].includes(url.protocol))
    throw new Error("NEXT_PUBLIC_SITE_URL deve ser uma URL HTTP(S).");
  return new URL(url.origin);
}

export const seo = {
  title: "Dra. Paola Medeiros | Ortodontia em Curitiba",
  description:
    "Conheça a Dra. Paola Medeiros, cirurgiã-dentista com atuação em Ortodontia e Reabilitação Oral. Atendimento na região de Curitiba, Araucária e Colombo.",
};

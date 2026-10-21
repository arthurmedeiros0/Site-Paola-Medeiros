import "server-only";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { testimonials, type Testimonial } from "@/data/testimonials";

/** Nunca importar o JSON privado: leitura em runtime, somente no desenvolvimento. */
export async function loadTestimonialPreview(): Promise<Testimonial[]> {
  if (process.env.NODE_ENV !== "development") return [];
  let value: unknown;
  try {
    value = JSON.parse(
      await readFile(
        path.join(process.cwd(), ".local", "testimonials.json"),
        "utf8",
      ),
    );
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return [];
    throw new Error(
      "Não foi possível ler .local/testimonials.json. Confira o formato JSON.",
    );
  }
  if (!Array.isArray(value))
    throw new Error("A prévia local deve conter uma lista de depoimentos.");
  return testimonials.flatMap((template) => {
    const local = value.find(
      (entry: unknown) =>
        typeof entry === "object" &&
        entry !== null &&
        "id" in entry &&
        entry.id === template.id,
    );
    if (!local || typeof local.text !== "string" || !local.text.trim())
      return [];
    // A prévia não altera os controles de autorização ou os metadados revisados.
    return [
      { ...template, text: local.text, authorized: false, published: false },
    ];
  });
}

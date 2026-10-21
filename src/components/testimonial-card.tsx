import { Star } from "lucide-react";
import type { Testimonial } from "@/data/testimonials";

export function TestimonialCard({
  testimonial,
  preview = false,
}: {
  testimonial: Testimonial;
  preview?: boolean;
}) {
  return (
    <figure className="testimonial-card">
      {testimonial.rating === 5 && (
        <div
          className="testimonial-stars"
          role="img"
          aria-label="Avaliação de 5 de 5 estrelas"
        >
          {Array.from({ length: 5 }, (_, index) => (
            <Star key={index} size={16} strokeWidth={1.4} aria-hidden="true" />
          ))}
        </div>
      )}
      <blockquote>
        <p>{testimonial.text}</p>
      </blockquote>
      <figcaption>
        <span className="testimonial-label">{testimonial.publicLabel}</span>
        {testimonial.source && (
          <span className="testimonial-authorization">
            {testimonial.source === "Google"
              ? "Origem: avaliação no Google"
              : "Origem: mensagem de WhatsApp"}
          </span>
        )}
        {testimonial.indirect && (
          <span className="testimonial-authorization">
            Relato indireto: opinião de outra pessoa compartilhada por mensagem.
          </span>
        )}
        <span className="testimonial-authorization">
          {preview
            ? "Prévia local · Aguardando autorização"
            : "Relato autorizado"}
        </span>
      </figcaption>
    </figure>
  );
}

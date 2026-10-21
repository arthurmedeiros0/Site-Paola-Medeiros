import { Quote } from "lucide-react";
import { professional } from "@/data/professional";
import { testimonials } from "@/data/testimonials";
import { SectionLabel } from "./ui";
import { Reveal } from "./reveal";

export function Care() {
  const published = testimonials.filter(
    (item) => item.authorized && item.published && item.text.trim(),
  );
  return (
    <section
      className="care-section section-space"
      aria-labelledby="care-heading"
    >
      <div className="container">
        <Reveal>
          <SectionLabel>
            {published.length
              ? "Experiências compartilhadas"
              : "A essência do atendimento"}
          </SectionLabel>
          <h2 id="care-heading">
            {published.length
              ? "Histórias de cuidado e confiança."
              : "Nossa forma de cuidar"}
          </h2>
        </Reveal>
        {published.length ? (
          <div className="testimonials">
            {published.map((item) => (
              <Reveal key={item.id}>
                <figure>
                  <Quote size={26} aria-hidden="true" />
                  <blockquote>{item.text}</blockquote>
                  <figcaption>{item.publicLabel}</figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        ) : (
          <div className="care-values">
            {professional.care.map((text, index) => (
              <Reveal key={text} delay={index * 0.06}>
                <span className="care-number">0{index + 1}</span>
                <h3>{text}</h3>
              </Reveal>
            ))}
          </div>
        )}
        <p className="care-note">
          Uma relação construída com escuta, respeito e atenção à sua
          individualidade.
        </p>
      </div>
    </section>
  );
}

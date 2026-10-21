import { professional } from "@/data/professional";
import { testimonials, type Testimonial } from "@/data/testimonials";
import { SectionLabel } from "./ui";
import { Reveal } from "./reveal";
import { TestimonialCard } from "./testimonial-card";

export function Care({
  previewTestimonials,
}: { previewTestimonials?: Testimonial[] } = {}) {
  const preview =
    process.env.NODE_ENV === "development" && previewTestimonials !== undefined;
  const published = (preview ? previewTestimonials : testimonials).filter(
    (item) =>
      item.text.trim() && (preview || (item.authorized && item.published)),
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
              <Reveal key={item.id} fade={false}>
                <TestimonialCard testimonial={item} preview={preview} />
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

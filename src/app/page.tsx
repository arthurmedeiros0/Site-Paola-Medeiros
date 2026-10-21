import Image from "next/image";
import {
  ArrowDown,
  ArrowUpRight,
  Check,
  Heart,
  Instagram,
  Layers3,
  Linkedin,
  MapPin,
  MessageCircle,
  MoveUpRight,
  ScanLine,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { Header } from "@/components/header";
import { Reveal } from "@/components/reveal";
import { ContactButton, SectionLabel } from "@/components/ui";
import { Care } from "@/components/care";
import {
  navigation,
  professional as p,
  whatsappUrl,
} from "@/data/professional";

const specialtyIcons = [ScanLine, Layers3, Heart];
const differenceIcons = [ShieldCheck, Heart, Layers3, Sparkles];

export default function Home() {
  return (
    <>
      <Header />
      <main id="conteudo">
        <section id="inicio" className="hero" aria-labelledby="hero-heading">
          <div className="container hero-grid">
            <Reveal className="hero-copy">
              <SectionLabel>{p.hero.eyebrow}</SectionLabel>
              <h1 id="hero-heading">
                {p.hero.title.firstLine}
                <br />
                {p.hero.title.secondLine} <em>{p.hero.title.emphasis}</em>
                <span>{p.hero.subtitle}</span>
              </h1>
              <p className="hero-name">{p.name}</p>
              <p className="hero-description">{p.hero.description}</p>
              <div className="hero-actions">
                <ContactButton>Agendar minha consulta</ContactButton>
                <a className="text-link" href="#sobre">
                  Conheça minha história
                  <ArrowUpRight size={16} aria-hidden="true" />
                </a>
              </div>
              <div className="hero-location">
                <MapPin size={14} aria-hidden="true" />
                <span>Curitiba, Araucária e Colombo</span>
              </div>
            </Reveal>
            <div className="hero-visual">
              <span className="hero-orbit" aria-hidden="true" />
              <div className="portrait-arch">
                <span className="arch-label" aria-hidden="true">
                  CUIDADO QUE VALORIZA A SUA ESSÊNCIA
                </span>
                <Image
                  src={p.images.main}
                  alt="Dra. Paola Medeiros, cirurgiã-dentista"
                  width={425}
                  height={641}
                  sizes="(max-width: 374px) 265px, (max-width: 767px) 290px, (max-width: 1023px) 285px, (max-width: 1199px) 330px, (min-width: 1440px) 380px, 360px"
                  quality={90}
                  preload
                  className="hero-portrait"
                />
              </div>
              <div className="experience-seal">
                <span className="seal-symbol" aria-hidden="true">
                  ✳
                </span>
                <span>
                  Mais de duas décadas
                  <br />
                  <strong>dedicadas à odontologia</strong>
                </span>
              </div>
              <span className="visual-caption">
                DRA. PAOLA MEDEIROS · CRO-PR 15593
              </span>
            </div>
          </div>
          <div className="container hero-bottom">
            <span>Saúde, confiança e um cuidado só seu.</span>
            <a href="#sobre" aria-label="Explore a história da Dra. Paola">
              Explore
              <ArrowDown size={15} aria-hidden="true" />
            </a>
          </div>
        </section>

        <div className="intro-strip">
          <div className="container">
            <span>Um olhar humano.</span>
            <span className="strip-star" aria-hidden="true">
              ✳
            </span>
            <span>Uma trajetória de dedicação.</span>
            <span className="strip-star" aria-hidden="true">
              ✳
            </span>
            <span>Um cuidado único.</span>
          </div>
        </div>

        <section
          id="sobre"
          className="about-section section-space"
          aria-labelledby="about-heading"
        >
          <div className="container about-grid">
            <Reveal className="about-visual" fade={false}>
              <div className="about-photo">
                <Image
                  src={p.images.professional}
                  alt="Dra. Paola em seu vestuário de atendimento odontológico"
                  width={483}
                  height={641}
                  sizes="(max-width: 767px) 85vw, 400px"
                  quality={90}
                />
              </div>
              <div className="about-caption">
                <span>
                  Conhecimento que acolhe.
                  <br />
                  <em>Cuidado que aproxima.</em>
                </span>
                <span className="mini-monogram" aria-hidden="true">
                  PM
                </span>
              </div>
            </Reveal>
            <Reveal className="about-copy">
              <SectionLabel>Conheça a Dra. Paola</SectionLabel>
              <h2 id="about-heading">{p.about.title}</h2>
              <div className="body-copy">
                {p.about.paragraphs.map((text) => (
                  <p key={text}>{text}</p>
                ))}
              </div>
              <div className="signature">
                <Image
                  src={p.images.portrait}
                  alt="Retrato da Dra. Paola Medeiros"
                  width={64}
                  height={64}
                />
                <div>
                  <span>{p.name}</span>
                  <small>
                    {p.role} · {p.registration}
                  </small>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <section
          id="especialidades"
          className="specialties-section section-space"
          aria-labelledby="specialties-heading"
        >
          <div className="container">
            <Reveal className="section-heading-row">
              <div>
                <SectionLabel>Especialidades e áreas de atuação</SectionLabel>
                <h2 id="specialties-heading">
                  Cuidado especializado
                  <br />
                  para o seu <em>sorriso</em>
                </h2>
              </div>
              <p>
                Técnica e sensibilidade se encontram em um planejamento pensado
                para você.
              </p>
            </Reveal>
            <div className="specialties-grid">
              {p.specialties.map((item, index) => {
                const Icon = specialtyIcons[index];
                return (
                  <Reveal
                    key={item.title}
                    delay={index * 0.07}
                    className="specialty"
                  >
                    <div className="specialty-top">
                      <Icon size={29} strokeWidth={1.2} aria-hidden="true" />
                      <span>0{index + 1}</span>
                    </div>
                    <p className="specialty-label">{item.label}</p>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-link"
                      aria-label={`Vamos conversar sobre ${item.title}`}
                    >
                      Vamos conversar
                      <MoveUpRight size={16} aria-hidden="true" />
                    </a>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        <section
          id="trajetoria"
          className="journey-section section-space"
          aria-labelledby="journey-heading"
        >
          <div className="container journey-grid">
            <Reveal className="journey-intro" fade={false}>
              <SectionLabel light>Uma vida dedicada ao cuidado</SectionLabel>
              <h2 id="journey-heading">
                Uma história de
                <br />
                conhecimento e<br />
                <em>compromisso.</em>
              </h2>
              <figure className="graduation-photo">
                <Image
                  src={p.images.graduation}
                  alt="Registro da formatura da Dra. Paola em Odontologia pela PUCPR"
                  width={647}
                  height={834}
                  sizes="(max-width: 767px) 80vw, 330px"
                  quality={90}
                />
                <figcaption>
                  O começo de uma trajetória. PUCPR, 2003.
                </figcaption>
              </figure>
            </Reveal>
            <div className="timeline">
              {p.timeline.map((item) => (
                <Reveal key={item.label} className="timeline-item">
                  <span className="timeline-dot" aria-hidden="true" />
                  <p className="timeline-label">{item.label}</p>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section
          className="differences-section section-space"
          aria-labelledby="differences-heading"
        >
          <div className="container">
            <Reveal className="center-heading">
              <SectionLabel>Atenção em cada detalhe</SectionLabel>
              <h2 id="differences-heading">Um atendimento pensado para você</h2>
            </Reveal>
            <div className="differences-grid">
              {p.differences.map((item, index) => {
                const Icon = differenceIcons[index];
                return (
                  <Reveal key={item.title} delay={index * 0.05}>
                    <Icon size={27} strokeWidth={1.3} aria-hidden="true" />
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        <Care />

        <section
          className="regions-section section-space"
          aria-labelledby="regions-heading"
        >
          <div className="container regions-grid">
            <Reveal>
              <SectionLabel>Perto de você</SectionLabel>
              <h2 id="regions-heading">
                Atendimento na
                <br />
                região de Curitiba
              </h2>
              <p>
                Para informações sobre os locais de atendimento e a
                disponibilidade de agenda, converse diretamente pelo WhatsApp.
              </p>
              <a
                href={whatsappUrl}
                className="text-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                Consultar local de atendimento
                <ArrowUpRight size={16} aria-hidden="true" />
              </a>
            </Reveal>
            <Reveal className="regions-list">
              {p.regions.map((region, index) => (
                <div key={region}>
                  <MapPin size={19} strokeWidth={1.3} aria-hidden="true" />
                  <span>{region}</span>
                  <span className="region-index">0{index + 1}</span>
                </div>
              ))}
            </Reveal>
          </div>
        </section>

        <section
          id="contato"
          className="contact-section"
          aria-labelledby="contact-heading"
        >
          <div className="container">
            <Reveal className="contact-content">
              <span className="contact-flower" aria-hidden="true">
                ✳
              </span>
              <SectionLabel>Vamos conversar?</SectionLabel>
              <h2 id="contact-heading">
                {p.contact.title.firstLine}
                <br />
                <em>{p.contact.title.emphasis}</em>
              </h2>
              <p>{p.contact.description}</p>
              <ContactButton>
                <MessageCircle size={19} aria-hidden="true" />
                Agendar pelo WhatsApp
              </ContactButton>
              <a
                className="phone-link"
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {p.whatsappLabel}
              </a>
              <div className="social-links">
                <a href={p.instagram} target="_blank" rel="noopener noreferrer">
                  <Instagram size={17} aria-hidden="true" />
                  Instagram
                  <ArrowUpRight size={13} aria-hidden="true" />
                </a>
                <a href={p.linkedin} target="_blank" rel="noopener noreferrer">
                  <Linkedin size={17} aria-hidden="true" />
                  LinkedIn
                  <ArrowUpRight size={13} aria-hidden="true" />
                </a>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div>
              <a className="footer-brand" href="#inicio">
                {p.fullName}
              </a>
              <p>
                {p.role}
                <br />
                {p.registration}
              </p>
              <p>Curitiba | Araucária | Colombo</p>
            </div>
            <nav aria-label="Navegação do rodapé">
              {navigation.map((item) => (
                <a href={item.href} key={item.href}>
                  {item.label}
                </a>
              ))}
            </nav>
            <div className="footer-contact">
              <span>Será um prazer cuidar de você.</span>
              <ContactButton>Entre em contato</ContactButton>
              <div className="footer-social">
                <a
                  href={p.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram da Dra. Paola"
                >
                  <Instagram size={19} />
                </a>
                <a
                  href={p.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn da Dra. Paola"
                >
                  <Linkedin size={19} />
                </a>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>
              © {new Date().getFullYear()} {p.name}. Todos os direitos
              reservados.
            </p>
            <span>
              <Check size={13} aria-hidden="true" />
              Cuidado, respeito e individualidade.
            </span>
          </div>
        </div>
      </footer>
      <a
        className="floating-contact"
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Agendar consulta pelo WhatsApp"
      >
        <MessageCircle size={24} aria-hidden="true" />
      </a>
    </>
  );
}

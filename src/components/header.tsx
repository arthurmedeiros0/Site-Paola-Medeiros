"use client";
import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { navigation, professional } from "@/data/professional";
import { ContactButton } from "./ui";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const links = panel.current?.querySelectorAll<HTMLAnchorElement>("a");
    links?.[0]?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggle.current?.focus();
      }
      if (event.key === "Tab" && links?.length) {
        const first = links[0];
        const last = links[links.length - 1];
        if (
          event.shiftKey &&
          (document.activeElement === first ||
            document.activeElement === toggle.current)
        ) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          toggle.current?.focus();
        }
      }
    };
    const media = window.matchMedia("(min-width: 1024px)");
    const onResize = () => {
      if (media.matches) setOpen(false);
    };
    media.addEventListener("change", onResize);
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", onKey);
      media.removeEventListener("change", onResize);
    };
  }, [open]);
  function close() {
    setOpen(false);
  }
  return (
    <header className={`header${scrolled ? " scrolled" : ""}`}>
      <div className="container header-inner">
        <a
          className="brand"
          href="#inicio"
          onClick={close}
        >
          <span className="monogram" aria-hidden="true">
            PM<span>·</span>
          </span>
          <span>
            <span className="brand-name">{professional.name}</span>
            <span className="brand-subtitle">
              Odontologia <span aria-hidden="true">|</span>{" "}
              {professional.registration}
            </span>
          </span>
        </a>
        <nav className="desktop-nav" aria-label="Navegação principal">
          {navigation.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
        <div className="header-contact">
          <ContactButton />
        </div>
        <button
          ref={toggle}
          className="menu-toggle"
          type="button"
          aria-expanded={open}
          aria-controls="mobile-navigation"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <div className="mobile-menu" id="mobile-navigation" ref={panel}>
          <nav aria-label="Navegação mobile">
            {navigation.map((item, index) => (
              <a key={item.href} href={item.href} onClick={close}>
                <span>0{index + 1}</span>
                {item.label}
              </a>
            ))}
          </nav>
          <div onClick={close}>
            <ContactButton>Agendar minha consulta</ContactButton>
          </div>
          <p>
            {professional.role} · {professional.registration}
          </p>
        </div>
      )}
    </header>
  );
}

import { ArrowUpRight } from "lucide-react";
import { whatsappUrl } from "@/data/professional";

export function ContactButton({
  children = "Agendar consulta",
  className = "",
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <a
      className={`button ${className}`}
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
      <ArrowUpRight size={17} aria-hidden="true" />
    </a>
  );
}

export function SectionLabel({
  children,
  light = false,
}: {
  children: React.ReactNode;
  light?: boolean;
}) {
  return (
    <p className={`section-label${light ? " light" : ""}`}>
      <span aria-hidden="true" />
      {children}
    </p>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { Care } from "@/components/care";
import { loadTestimonialPreview } from "@/lib/testimonial-preview";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Prévia local de depoimentos | Dra. Paola Medeiros",
  robots: { index: false, follow: false, noarchive: true },
};

export default async function TestimonialPreviewPage() {
  if (process.env.NODE_ENV !== "development") notFound();
  const requestHeaders = await headers();
  const host = requestHeaders.get("host") ?? "";
  if (!/^(localhost|127\.0\.0\.1|\[::1\])(:\d+)?$/i.test(host)) notFound();
  const testimonials = await loadTestimonialPreview();
  return (
    <main id="conteudo">
      <div className="container" style={{ paddingBlock: 32 }}>
        <h1 style={{ fontSize: 36, marginBottom: 16 }}>
          Prévia de depoimentos
        </h1>
        <p role="note">
          <strong>Prévia local — não publicada.</strong> Estes relatos aguardam
          autorização e revisão. As estrelas aparecem somente na avaliação com
          nota confirmada.
        </p>
        <Link className="text-link" href="/">
          Voltar ao site
        </Link>
        {!testimonials.length && (
          <p>
            Preencha o arquivo local .local/testimonials.json para visualizar os
            relatos.
          </p>
        )}
      </div>
      <Care previewTestimonials={testimonials} />
    </main>
  );
}

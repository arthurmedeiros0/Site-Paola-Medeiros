import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import { getSiteUrl, seo } from "@/lib/site";
import "./globals.css";

const serif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-editorial",
  display: "swap",
});
const sans = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});
const siteUrl = getSiteUrl();
export const metadata: Metadata = {
  title: seo.title,
  description: seo.description,
  ...(siteUrl ? { metadataBase: siteUrl, alternates: { canonical: "/" } } : {}),
  applicationName: "Dra. Paola Medeiros",
  openGraph: {
    title: seo.title,
    description: seo.description,
    type: "website",
    locale: "pt_BR",
    siteName: "Dra. Paola Medeiros",
    ...(siteUrl
      ? {
          url: siteUrl,
          images: [
            {
              url: "/social-image",
              width: 1200,
              height: 630,
              alt: "Dra. Paola Medeiros — Odontologia com excelência e acolhimento",
            },
          ],
        }
      : {}),
  },
  twitter: {
    card: "summary_large_image",
    title: seo.title,
    description: seo.description,
    ...(siteUrl ? { images: ["/social-image"] } : {}),
  },
  robots: { index: true, follow: true },
};
export const viewport: Viewport = { themeColor: "#355347" };
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={`${serif.variable} ${sans.variable}`}>
      <body>
        <a className="skip-link" href="#conteudo">
          Ir para o conteúdo
        </a>
        {children}
      </body>
    </html>
  );
}

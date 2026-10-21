import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site";
export default function robots(): MetadataRoute.Robots {
  const url = getSiteUrl();
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/depoimentos/", "/images/depoimentos/"],
    },
    ...(url ? { sitemap: new URL("/sitemap.xml", url).href } : {}),
  };
}

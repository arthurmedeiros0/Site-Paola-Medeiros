import type { NextConfig } from "next";
const config: NextConfig = {
  poweredByHeader: false,
  outputFileTracingExcludes: { "/*": ["./.local/**/*"] },
  images: { formats: ["image/avif", "image/webp"], qualities: [75, 90] },
};
export default config;

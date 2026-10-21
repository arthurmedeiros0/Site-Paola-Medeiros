import { NextRequest, NextResponse } from "next/server";

/** Preserva os arquivos da família sem expor prints de pacientes na web.
 * Protege também o endpoint de otimização do Next/Image.
 */
export function proxy(request: NextRequest) {
  let path = request.nextUrl.pathname;
  if (path === "/_next/image")
    path = request.nextUrl.searchParams.get("url") ?? "";
  try {
    path = decodeURIComponent(path);
  } catch {
    return new NextResponse(null, { status: 400 });
  }
  if (/(^|\/)depoimentos(\/|$)/i.test(path)) {
    return new NextResponse(null, {
      status: 404,
      headers: { "Cache-Control": "no-store", "X-Robots-Tag": "noindex" },
    });
  }
  return NextResponse.next();
}
export const config = {
  matcher: [
    "/depoimentos/:path*",
    "/images/depoimentos/:path*",
    "/_next/image",
  ],
};

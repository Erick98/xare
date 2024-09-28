import { NextResponse } from "next/server";

export const config = {
  matcher: ["/((?!api/|_next/|_static/|_vercel|[\\w-]+\\.\\w+).*)"],
};

export function middleware(req) {
  const hostname = req.headers.get("host") || "";

  // Obtén el dominio raíz desde las variables de entorno
  const rootDomain = process.env.NEXT_PUBLIC_ROOT_DOMAIN || "localhost:3000";

  // Extrae el subdominio, si lo hay
  const subdomain = hostname.replace(`.${rootDomain}`, "");

  // Si el hostname no contiene un subdominio (por ejemplo, www o cualquier otro)
  if (hostname === rootDomain || hostname === `www.${rootDomain}`) {
    // Redirige a la carpeta raíz
    return NextResponse.next();
  }

  // Si hay un subdominio, redirige a /[subdomain]
  if (subdomain && subdomain !== hostname) {
    const url = req.nextUrl.clone();
    url.pathname = `/${subdomain}${req.nextUrl.pathname}`;
    return NextResponse.rewrite(url);
  }

  // Si no cumple ninguna condición, simplemente continúa con la ruta original
  return NextResponse.next();
}

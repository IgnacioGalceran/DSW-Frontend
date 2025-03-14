import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { headerList } from "./constants/paths";
import { HeaderList } from "./types/headerList";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token");
  const rol = request.cookies.get("rol");
  const verificado = request.cookies.get("verificado");
  const url = request.nextUrl;

  if (url.pathname === "/landing" || url.pathname.startsWith("/auth")) {
    return NextResponse.next();
  }

  if (
    verificado &&
    !JSON.parse(verificado?.value) &&
    token !== null &&
    rol?.value === "Paciente"
  ) {
    return NextResponse.redirect(new URL("/auth/firebase-action", request.url));
  }

  if (
    url.pathname === "/" &&
    verificado &&
    JSON.parse(verificado?.value) &&
    token !== null
  ) {
    if (rol?.value === "Paciente") {
      return NextResponse.redirect(new URL("/paciente/turnos", request.url));
    } else if (rol?.value === "Medico") {
      return NextResponse.redirect(new URL("/medico/turnos", request.url));
    } else if (rol?.value === "Administrador") {
      return NextResponse.redirect(new URL("/pages/perfil", request.url));
    }
  }

  if (!token) {
    return NextResponse.redirect(new URL("/landing", request.url));
  }

  let permission = rol?.value
    ? hasPermission(headerList, url.pathname, rol.value)
    : false;

  if (!permission) {
    return NextResponse.redirect(new URL("/landing", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/auth",
    "/pages/:path*",
    "/paciente/:path*",
    "/medico/:path*",
    "/landing",
    "/",
  ],
};

const hasPermission = (
  header: HeaderList[],
  urlPathname: string,
  rol: string
): boolean => {
  let access = header.some((h) => {
    let permission: boolean = false;
    if (h.path === urlPathname) {
      permission = h.rol.some((r) => r === rol);
    }

    return permission;
  });

  if (!access) return false;

  return true;
};

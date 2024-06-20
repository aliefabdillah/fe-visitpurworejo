import { NextRequest, NextResponse } from "next/server";
import { decryptUserId } from "./components/lib/crypto";
import { cookies } from "next/headers";

const protectedRoutes = [
  /^\/profil$/,
  /^\/profil\/edit-artikel\/[^/]+$/,
  /^\/profil\/edit-profil\/[^/]+$/,
  /^\/artikel\/preview\/[^/]+$/,
];
const publicRoutes = [
  "/auth/login",
  "/auth/register",
  "/home",
  "/akomodasi",
  "/destinasi",
  "/kuliner",
  "/tentang-kami",
  "/artikel",
];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const queryParams = req.nextUrl.searchParams;
  const isProtectedRoute = protectedRoutes.some(route => route.test(path));
  const isPublicRoute = publicRoutes.includes(path);

  const decryptedId = cookies().get("id")?.value

  if (isProtectedRoute && !decryptedId) {
    const redirectUrl = new URL("/auth/login", req.nextUrl);
    const params = new URLSearchParams(redirectUrl.search);

    const langQuery = queryParams.get("lang") || "id";
    params.set("lang", langQuery);
  
    redirectUrl.search = params.toString();

    return NextResponse.redirect(redirectUrl);
  }

  if (
    decryptedId &&
    req.nextUrl.pathname.startsWith("/auth")
  ) {
    const redirectUrl = new URL("/home", req.nextUrl);
    const params = new URLSearchParams(redirectUrl.search);
    
    const langQuery = queryParams.get("lang") || "id";
    params.set("lang", langQuery);
  
    redirectUrl.search = params.toString();

    return NextResponse.redirect(redirectUrl);
    // return NextResponse.redirect(new URL("/home", req.nextUrl));
  }
}

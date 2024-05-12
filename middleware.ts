import { NextRequest, NextResponse } from "next/server";
import { decryptUserId } from "./components/lib/crypto";
import { cookies } from "next/headers";

const protectedRoutes = [
  "/profil",
  "/profil/edit-artikel",
  "/profil/edit-profil",
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
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);

  const decryptedId = await decryptUserId(cookies().get("id")?.value);

  if (isProtectedRoute && !decryptedId) {
    const redirectUrl = new URL("/auth/login", req.nextUrl);
    const params = new URLSearchParams(redirectUrl.search);
    if (queryParams.has("lang")) {
      const langQuery = queryParams.get("lang")
      params.append("lang", langQuery ? langQuery : "id"); // Tambahkan query params sesuai kebutuhan
    } else  {
      params.append("lang", "id")
    }
  
    redirectUrl.search = params.toString();

    return NextResponse.redirect(redirectUrl);
  }

  if (
    decryptedId &&
    req.nextUrl.pathname.startsWith("/auth")
  ) {
    const redirectUrl = new URL("/home", req.nextUrl);
    const params = new URLSearchParams(redirectUrl.search);
    if (queryParams.has("lang")) {
      const langQuery = queryParams.get("lang")
      params.append("lang", langQuery ? langQuery : "id"); // Tambahkan query params sesuai kebutuhan
    } else  {
      params.append("lang", "id")
    }
  
    redirectUrl.search = params.toString();

    return NextResponse.redirect(redirectUrl);
    // return NextResponse.redirect(new URL("/home", req.nextUrl));
  }
}

import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  // 1. Yanıt (Response) nesnesini hazırlıyoruz
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  // 2. Supabase İstemcisini Oluşturuyoruz (Token Yenileme İçin Şart)
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value,
            ...options,
          });
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          response.cookies.set({
            name,
            value,
            ...options,
          });
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value: "",
            ...options,
          });
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          response.cookies.set({
            name,
            value: "",
            ...options,
          });
        },
      },
    }
  );

  // 3. Kullanıcıyı Kontrol Et (Güvenli getUser metodu ile)
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // 4. KORUNACAK ROTALAR (Buralara sadece giriş yapanlar girebilir)
  const protectedPaths = [
    "/dashboard",
    "/clients",
    "/projects",
    "/tasks",
    "/finance",
    "/settings",
  ];

  const path = request.nextUrl.pathname;

  // Kullanıcı bu korumalı yollardan birine girmeye çalışıyor mu?
  const isProtectedRoute = protectedPaths.some((route) =>
    path.startsWith(route)
  );

  // SENARYO A: Giriş yapmamış biri korumalı alana girmeye çalışıyor
  if (isProtectedRoute && !user) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = "/auth";
    // Giriş yaptıktan sonra kaldığı yere dönsün diye not alıyoruz
    redirectUrl.searchParams.set("next", path);
    return NextResponse.redirect(redirectUrl);
  }

  // SENARYO B: Zaten giriş yapmış biri tekrar Login sayfasına (/auth) girmeye çalışıyor
  if (user && path.startsWith("/auth")) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = "/dashboard"; // Onu panele geri at
    return NextResponse.redirect(redirectUrl);
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Aşağıdaki yollar HARİÇ tüm sayfalarda çalışsın:
     * - _next/static (resimler, css vs)
     * - _next/image
     * - favicon.ico
     * - public klasöründeki görseller
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};

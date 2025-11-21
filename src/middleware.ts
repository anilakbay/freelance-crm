import { NextResponse, type NextRequest } from "next/server";
import { createServerClient, type CookieOptions } from "@supabase/ssr";
import type { Database } from "@/types/database";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const protectedPrefixes = [
  "/clients",
  "/new-client",
  "/projects",
  "/new-project",
];

export async function middleware(request: NextRequest) {
  if (!supabaseUrl || !supabaseKey) {
    throw new Error(
      "Supabase API keys are missing. Please check your environment variables."
    );
  }

  const requestHeaders = new Headers(request.headers);
  const response = NextResponse.next({
    request: { headers: requestHeaders },
  });

  const supabase = createServerClient<Database>(supabaseUrl, supabaseKey, {
    cookies: {
      get(name: string) {
        return request.cookies.get(name)?.value;
      },
      set(name: string, value: string, options?: CookieOptions) {
        response.cookies.set({
          name,
          value,
          ...options,
        });
      },
      remove(name: string, options?: CookieOptions) {
        response.cookies.set({
          name,
          value: "",
          ...options,
          maxAge: 0,
        });
      },
    },
  });

  const path = request.nextUrl.pathname;
  const isProtectedRoute = protectedPrefixes.some((prefix) =>
    path.startsWith(prefix)
  );

  if (!isProtectedRoute) {
    return response;
  }

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = "/auth";
    redirectUrl.searchParams.set("redirectedFrom", path);
    return NextResponse.redirect(redirectUrl);
  }

  return response;
}

// Middleware'in çalışacağı yolların konfigürasyonu
export const config = {
  matcher: [
    /*
     * API rotaları, statik dosyalar ve görseller hariç tüm yollarda çalışır.
     */
    '/((?!api|_next/static|_next/image|favicon.ico|logo.svg).*)',
  ],
}
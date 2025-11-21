import {
  createBrowserClient,
  createServerClient,
  type CookieOptions,
} from "@supabase/ssr";
import { cookies } from "next/headers";
import type { Database } from "@/types/database";

type CookieStore = Awaited<ReturnType<typeof cookies>>;

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error(
    "Supabase API anahtarları eksik! Lütfen .env.local dosyasını kontrol et."
  );
}

const withCookieAdapter = (cookieStore: CookieStore) => ({
  get(name: string) {
    return cookieStore.get(name)?.value;
  },
  set(name: string, value: string, options?: CookieOptions) {
    // Server Component'larda cookie yazılamadığı için hata almamak adına try/catch
    try {
      cookieStore.set(name, value, options);
    } catch {
      // no-op
    }
  },
  remove(name: string, options?: CookieOptions) {
    try {
      if (options) {
        cookieStore.delete({
          name,
          ...options,
        });
      } else {
        cookieStore.delete(name);
      }
    } catch {
      // no-op
    }
  },
});

export const createSupabaseServerClient = async () => {
  const cookieStore = await cookies();

  return createServerClient<Database>(supabaseUrl, supabaseKey, {
    cookies: withCookieAdapter(cookieStore),
  });
};

export const createSupabaseBrowserClient = () =>
  createBrowserClient<Database>(supabaseUrl, supabaseKey);

import {
  createBrowserClient,
  createServerClient,
  type CookieOptions,
} from "@supabase/ssr";
import { cookies } from "next/headers";
import type { Database } from "@/types/database";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseKey) {
  throw new Error(
    "Supabase URL veya ANON KEY bulunamadı! .env.local dosyasını kontrol edin."
  );
}

const cookieAdapter = (cookieStore: Awaited<ReturnType<typeof cookies>>) => ({
  get: (name: string) => cookieStore.get(name)?.value ?? null,
  set: (name: string, value: string, options?: CookieOptions) => {
    try {
      cookieStore.set(name, value, options);
    } catch {}
  },
  remove: (name: string, options?: CookieOptions) => {
    try {
      cookieStore.delete(name);
    } catch {}
  },
});

export const createSupabaseServerClient = async () => {
  const cookieStore = await cookies();
  return createServerClient<Database>(supabaseUrl, supabaseKey, {
    cookies: cookieAdapter(cookieStore),
  });
};

export const createSupabaseBrowserClient = () => {
  return createBrowserClient<Database>(supabaseUrl, supabaseKey);
};

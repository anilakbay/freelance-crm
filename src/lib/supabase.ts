// --------------------------------------------------------
// KÜTÜPHANE: Supabase İstemcisi (Client)
// DOSYA: src/lib/supabase.ts
// GÖREV: Sunucu (Server) ve Tarayıcı (Browser) tarafında Supabase bağlantısını kurar.
// --------------------------------------------------------

import { createBrowserClient, createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import type { Database } from "@/types/database";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Ortam değişkenleri kontrolü (Hata yapmamak için)
if (!supabaseUrl || !supabaseKey) {
  throw new Error(
    "Supabase URL veya ANON KEY eksik! .env.local dosyasını kontrol edin."
  );
}

// --- SERVER CLIENT (Sunucu Tarafı) ---
// Server Actions, API Routes ve Server Components içinde kullanılır.
export const createSupabaseServerClient = async () => {
  const cookieStore = await cookies();

  return createServerClient<Database>(supabaseUrl, supabaseKey, {
    cookies: {
      // Tüm çerezleri tek seferde okur
      getAll() {
        return cookieStore.getAll();
      },
      // Çerezleri toplu olarak yazar (Oturum yenileme vs.)
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          );
        } catch {
          // Server Component içinden çerez yazılamaz hatasını yutuyoruz.
          // Bu normaldir, çünkü yazma işlemini Middleware halleder.
        }
      },
    },
  });
};

// --- BROWSER CLIENT (Tarayıcı Tarafı) ---
// useEffect, onClick gibi istemci taraflı işlemlerde kullanılır.
export const createSupabaseBrowserClient = () => {
  return createBrowserClient<Database>(supabaseUrl, supabaseKey);
};

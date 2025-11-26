// src/actions/user.ts
"use server";

import { createSupabaseServerClient } from "@/lib/supabase";
import { revalidatePath } from "next/cache";

export async function updateProfile(formData: FormData) {
  const supabase = await createSupabaseServerClient();

  // 1. GÜVENLİK: Oturum Kontrolü (getUser kullanıyoruz, güvenli)
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return { success: false, message: "Oturum doğrulanamadı." };
  }

  // 2. Veriyi Al
  const fullName = (formData.get("name") as string)?.trim();

  if (!fullName) {
    return { success: false, message: "Ad soyad boş bırakılamaz." };
  }

  // 3. Supabase Auth Güncelleme
  const { error: updateError } = await supabase.auth.updateUser({
    data: {
      full_name: fullName, // Supabase Auth tablosunda 'full_name' olarak geçer
    },
  });

  if (updateError) {
    console.error("Profil Güncelleme Hatası:", updateError);
    return {
      success: false,
      message: "Güncelleme başarısız: " + updateError.message,
    };
  }

  // 4. Sayfaları Yenile (Anında görünmesi için)
  revalidatePath("/settings");
  return { success: true, message: "Profil başarıyla güncellendi!" };
}

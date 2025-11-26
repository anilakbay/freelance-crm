// --------------------------------------------------------
// SERVER ACTION: Müşteri İşlemleri
// DOSYA: src/actions/client.ts
// GÖREV: Supabase veritabanında müşteri ekleme ve silme işlemlerini yapar.
// GÜVENLİK: Her işlemde oturum (session) kontrolü yapar.
// --------------------------------------------------------

"use server";

import { revalidatePath } from "next/cache";
import { createSupabaseServerClient } from "@/lib/supabase";
import type { Database } from "@/types/database";

// Müşteri durumu için tip tanımı
type ClientStatus = Database["public"]["Tables"]["clients"]["Insert"]["status"];

// --- YENİ MÜŞTERİ KAYDI ---
export async function saveClient(formData: FormData) {
  const supabase = await createSupabaseServerClient();

  // 1. GÜVENLİK: Kullanıcı oturum açmış mı?
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return { success: false, message: "İşlem yapmak için giriş yapmalısınız." };
  }

  // 2. VERİ ALMA: Formdan gelen verileri al
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;
  const statusValue = formData.get("status");

  // 3. DOĞRULAMA: Status geçerli mi?
  if (
    !statusValue ||
    !["active", "passive", "pending"].includes(statusValue as string)
  ) {
    return {
      success: false,
      message: "Geçersiz müşteri durumu seçildi.",
    };
  }

  const status = statusValue as ClientStatus;

  // 4. KAYIT: Veritabanına ekle (user_id İLE BERABER)
  const { error } = await supabase.from("clients").insert({
    name,
    email: email || null, // Boşsa null gönder
    phone: phone || null, // Boşsa null gönder
    status,
    user_id: session.user.id, // KRİTİK: Müşteriyi ekleyen kullanıcıyı belirtiyoruz
  });

  if (error) {
    console.error("Supabase Kayıt Hatası:", error.message);
    return { success: false, message: "Kayıt başarısız: " + error.message };
  }

  // 5. GÜNCELLEME: Müşteri listesi sayfasını yenile
  revalidatePath("/clients");

  return { success: true, message: "Müşteri başarıyla kaydedildi." };
}

// --- MÜŞTERİ SİLME ---
export async function deleteClient(formData: FormData) {
  const supabase = await createSupabaseServerClient();

  // 1. GÜVENLİK: Oturum kontrolü
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) return;

  // 2. VERİ: ID'yi al
  const idValue = formData.get("id");
  if (!idValue) return;

  const id = Number(idValue);
  if (Number.isNaN(id)) {
    console.error("Geçersiz ID değeri:", idValue);
    return;
  }

  // 3. SİLME: Sadece kendi eklediği müşteriyi silebilir (RLS varsa user_id kontrolüne gerek kalmayabilir ama garanti olsun)
  const { error } = await supabase
    .from("clients")
    .delete()
    .eq("id", id)
    .eq("user_id", session.user.id); // Ekstra güvenlik: Başkasının müşterisini silemez

  if (error) {
    console.error("Silme Hatası:", error);
    return;
  }

  // 4. GÜNCELLEME
  revalidatePath("/clients");
}

// --------------------------------------------------------
// SERVER ACTION: Proje İşlemleri
// DOSYA: src/actions/project.ts
// GÖREV: Proje Ekleme, Güncelleme ve Silme işlemlerini yönetir.
// --------------------------------------------------------

"use server";

import { revalidatePath } from "next/cache";
import { createSupabaseServerClient } from "@/lib/supabase";
import type { Database } from "@/types/database";

// Proje durum tiplerini veritabanından alıyoruz
type ProjectStatus =
  Database["public"]["Tables"]["projects"]["Insert"]["status"];

// Geçerli durum listesi
const PROJECT_STATUSES: ProjectStatus[] = [
  "active",
  "completed",
  "cancelled",
  "pending",
];

// --- 1. PROJE KAYDETME VE GÜNCELLEME ---
export async function saveProject(formData: FormData) {
  const supabase = await createSupabaseServerClient();

  // A. Oturum Kontrolü
  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.getSession();

  if (sessionError || !session) {
    return {
      success: false,
      message: "Oturum doğrulanamadı. Lütfen yeniden giriş yapın.",
    };
  }

  // B. Verileri Formdan Al
  const projectIdValue = formData.get("projectId");
  const title = (formData.get("title") as string)?.trim();
  const clientIdValue = formData.get("client_id");
  const priceValue = formData.get("price");
  const deadlineValue = formData.get("deadline");
  const statusValue = formData.get("status");

  // C. Doğrulamalar (Validations)
  if (!title) {
    return { success: false, message: "Proje başlığı zorunludur." };
  }

  if (!clientIdValue) {
    return { success: false, message: "Bir müşteri seçmelisiniz." };
  }

  const client_id = Number(clientIdValue);
  if (Number.isNaN(client_id)) {
    return { success: false, message: "Geçersiz müşteri kimliği." };
  }

  const price =
    priceValue && priceValue.toString().length > 0 ? Number(priceValue) : null;

  if (priceValue && Number.isNaN(price)) {
    return { success: false, message: "Geçersiz bütçe değeri." };
  }

  if (
    !statusValue ||
    !PROJECT_STATUSES.includes(statusValue as ProjectStatus)
  ) {
    return { success: false, message: "Geçersiz proje durumu." };
  }

  // D. Veritabanına Gönderilecek Veriyi Hazırla
  const baseData = {
    title,
    client_id,
    price,
    deadline: deadlineValue ? (deadlineValue as string) : null,
    status: statusValue as ProjectStatus,
    user_id: session.user.id, // Güvenlik: Projeyi ekleyen kişi
  };

  const projectId = projectIdValue ? Number(projectIdValue) : null;

  // E. İşlem Türünü Seç (Ekleme mi Güncelleme mi?)
  const query = projectId
    ? supabase.from("projects").update(baseData).eq("id", projectId) // Güncelle
    : supabase
        .from("projects")
        .insert({ ...baseData, created_at: new Date().toISOString() }); // Ekle

  const { error } = await query;

  if (error) {
    console.error("Proje İşlemi Hatası:", error);
    return {
      success: false,
      message: error.message || "İşlem sırasında bir hata oluştu.",
    };
  }

  // F. Sayfayı Yenile
  revalidatePath("/projects");

  return {
    success: true,
    message: projectId
      ? "Proje başarıyla güncellendi."
      : "Proje başarıyla kaydedildi.",
  };
}

// --- 2. PROJE SİLME ---
export async function deleteProject(formData: FormData) {
  const supabase = await createSupabaseServerClient();

  // A. Oturum Kontrolü
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) return;

  // B. ID Kontrolü
  const idValue = formData.get("id");
  if (!idValue) return;

  const id = Number(idValue);
  if (Number.isNaN(id)) return;

  // C. Silme İşlemi (Sadece kendi projesini silebilir)
  const { error } = await supabase
    .from("projects")
    .delete()
    .eq("id", id)
    .eq("user_id", session.user.id); // Güvenlik

  if (error) {
    console.error("Silme Hatası:", error);
    return;
  }

  // D. Sayfayı Yenile
  revalidatePath("/projects");
}

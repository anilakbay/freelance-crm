// --------------------------------------------------------
// SERVER ACTION: Proje İşlemleri ve Dashboard Verileri (GÜVENLİK YÜKSELTMESİ)
// DOSYA: src/actions/project.ts
// GÖREV: Proje CRUD işlemlerini ve Dashboard için veri çekmeyi yönetir.
// --------------------------------------------------------

"use server";

import { revalidatePath } from "next/cache";
import { createSupabaseServerClient } from "@/lib/supabase";
import { redirect } from "next/navigation";
import type { Database } from "@/types/database";

// Proje durum tipleri
type ProjectStatus =
  Database["public"]["Tables"]["projects"]["Insert"]["status"];

const PROJECT_STATUSES: ProjectStatus[] = [
  "active",
  "completed",
  "cancelled",
  "pending",
];

// Güvenli kullanıcı bilgisini çeken yardımcı fonksiyon (Tekrar etmemek için)
async function getUser() {
  const supabase = await createSupabaseServerClient();
  // GÜVENLİK FİX: session yerine getUser kullanılıyor
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  return { user, error };
}

// --- A. PROJE KAYDETME VE GÜNCELLEME ---
export async function saveProject(formData: FormData) {
  const supabase = await createSupabaseServerClient();

  // 1. GÜVENLİK KONTROLÜ (YENİ)
  const { user, error: authError } = await getUser();

  if (authError || !user) {
    return {
      success: false,
      message: "Oturum doğrulanamadı. Lütfen giriş yapın.",
    };
  }

  // 2. Verileri Formdan Al
  const projectIdValue = formData.get("projectId");
  const title = (formData.get("title") as string)?.trim();
  const clientIdValue = formData.get("client_id");
  const priceValue = formData.get("price");
  const deadlineValue = formData.get("deadline");
  const statusValue = formData.get("status");

  // 3. Validasyonlar
  if (!title) return { success: false, message: "Proje başlığı zorunludur." };
  if (!clientIdValue)
    return { success: false, message: "Bir müşteri seçmelisiniz." };
  const client_id = Number(clientIdValue);
  if (Number.isNaN(client_id))
    return { success: false, message: "Geçersiz müşteri kimliği." };
  const price =
    priceValue && priceValue.toString().length > 0 ? Number(priceValue) : null;
  if (priceValue && Number.isNaN(price))
    return { success: false, message: "Geçersiz bütçe değeri." };
  if (!statusValue || !PROJECT_STATUSES.includes(statusValue as ProjectStatus))
    return { success: false, message: "Geçersiz proje durumu." };

  // 4. Veritabanına Hazırlık
  const baseData = {
    title,
    client_id,
    price,
    deadline: deadlineValue ? (deadlineValue as string) : null,
    status: statusValue as ProjectStatus,
    user_id: user.id, // Güvenli UID kullanıldı
  };

  const projectId = projectIdValue ? Number(projectIdValue) : null;
  if (projectIdValue && (projectId === null || Number.isNaN(projectId)))
    return { success: false, message: "Geçersiz proje kimliği." };

  // 5. Ekleme mi, Güncelleme mi?
  const query = projectId
    ? supabase.from("projects").update(baseData).eq("id", projectId)
    : supabase
        .from("projects")
        .insert({ ...baseData, created_at: new Date().toISOString() });

  const { error } = await query;
  if (error) {
    console.error("Proje İşlemi Hatası:", error);
    return {
      success: false,
      message: error.message || "İşlem sırasında bir hata oluştu.",
    };
  }

  revalidatePath("/projects");
  return {
    success: true,
    message: projectId
      ? "Proje başarıyla güncellendi."
      : "Proje başarıyla kaydedildi.",
  };
}

// --- B. PROJE SİLME ---
export async function deleteProject(formData: FormData) {
  const supabase = await createSupabaseServerClient();
  const { user } = await getUser(); // Güvenli kullanıcı kontrolü
  if (!user) return;

  const idValue = formData.get("id");
  if (!idValue) return;

  const id = Number(idValue);
  if (Number.isNaN(id)) return;

  const { error } = await supabase
    .from("projects")
    .delete()
    .eq("id", id)
    .eq("user_id", user.id); // Güvenlik

  if (error) console.error("Silme Hatası:", error);

  revalidatePath("/projects");
}

// --- C. DASHBOARD VERİ ÇEKME (YENİ FONKSİYON) ---
/**
 * Dashboard için gerekli tüm projeleri çeker.
 * @returns Kullanıcının tüm proje verilerini içeren dizi.
 */
export async function getDashboardData() {
  const supabase = await createSupabaseServerClient();
  const { user } = await getUser();

  // Eğer oturum yoksa, ana sayfaya (auth) yönlendir
  if (!user) {
    redirect("/auth");
  }

  // 1. Kullanıcının tüm projelerini çek
  const { data: projects, error } = await supabase
    .from("projects")
    .select("id, title, status, price, created_at") // Grafik ve hesaplama için gerekli sütunları çektik
    .eq("user_id", user.id) // Güvenlik: Sadece kendi verilerini çeker
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Dashboard Veri Çekme Hatası:", error);
    return { projects: [] };
  }

  return { projects: projects || [] };
}

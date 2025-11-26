// --------------------------------------------------------
// SERVER ACTION: Görev İşlemleri
// DOSYA: src/actions/task.ts
// GÖREV: Görev ekleme ve durum güncelleme işlemlerini yönetir.
// --------------------------------------------------------

"use server";

import { revalidatePath } from "next/cache";
import { createSupabaseServerClient } from "@/lib/supabase";

// --- 1. YENİ GÖREV KAYDI ---
export async function saveTask(formData: FormData) {
  const supabase = await createSupabaseServerClient();

  // A. Oturum Kontrolü
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return { success: false, message: "Oturum açmanız gerekiyor." };
  }

  // B. Verileri Al
  const title = formData.get("title") as string;
  const project_id = formData.get("project_id");
  const priority = formData.get("priority") as string;
  const due_date = formData.get("due_date") as string;

  // C. Zorunlu Alan Kontrolü
  if (!title || !project_id) {
    return {
      success: false,
      message: "Görev başlığı ve proje seçimi zorunludur.",
    };
  }

  // D. Kayıt İşlemi
  const { error } = await supabase.from("tasks").insert({
    title,
    project_id: Number(project_id),
    priority,
    due_date: due_date || null,
    status: "pending", // Varsayılan durum
    user_id: session.user.id, // Sahiplik
  });

  if (error) {
    console.error("Görev Kayıt Hatası:", error);
    return { success: false, message: "Hata: " + error.message };
  }

  // E. Listeyi Yenile
  revalidatePath("/tasks");
  return { success: true, message: "Görev başarıyla eklendi." };
}

// --- 2. DURUM GÜNCELLEME (Toggle Status) ---
export async function toggleTaskStatus(id: number, currentStatus: string) {
  const supabase = await createSupabaseServerClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) return;

  // Durumu tersine çevir (done <-> pending)
  const newStatus = currentStatus === "done" ? "pending" : "done";

  const { error } = await supabase
    .from("tasks")
    .update({ status: newStatus })
    .eq("id", id)
    .eq("user_id", session.user.id); // Güvenlik kontrolü

  if (error) {
    console.error("Durum Güncelleme Hatası:", error);
    return;
  }

  revalidatePath("/tasks");
}

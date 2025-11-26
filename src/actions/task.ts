// --------------------------------------------------------
// SERVER ACTION: Görev İşlemleri
// DOSYA: src/actions/task.ts
// GÖREV: Yeni görev ekleme ve silme işlemlerini yapar.
// --------------------------------------------------------

"use server";

import { revalidatePath } from "next/cache";
import { createSupabaseServerClient } from "@/lib/supabase";

export async function saveTask(formData: FormData) {
  const supabase = await createSupabaseServerClient();

  // 1. Oturum Kontrolü
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return { success: false, message: "Oturum açmanız gerekiyor." };
  }

  // 2. Verileri Formdan Al
  const title = formData.get("title") as string;
  const project_id = formData.get("project_id");
  const priority = formData.get("priority") as string;
  const due_date = formData.get("due_date") as string;
  // Status varsayılan olarak 'pending' gidecek

  // 3. Zorunlu Alan Kontrolü
  if (!title || !project_id) {
    return {
      success: false,
      message: "Görev başlığı ve proje seçimi zorunludur.",
    };
  }

  // 4. Kayıt İşlemi
  const { error } = await supabase.from("tasks").insert({
    title,
    project_id: Number(project_id),
    priority,
    due_date: due_date || null, // Tarih seçilmediyse boş gönder
    status: "pending", // İlk açılışta hep "beklemede" olur
    user_id: session.user.id, // Görevi ekleyen kişi
  });

  if (error) {
    console.error("Görev Kayıt Hatası:", error);
    return { success: false, message: "Hata: " + error.message };
  }

  // 5. Listeyi Yenile
  revalidatePath("/tasks");
  return { success: true, message: "Görev başarıyla eklendi." };
}

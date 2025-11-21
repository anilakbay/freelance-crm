"use server";

import { revalidatePath } from "next/cache";
import { createSupabaseServerClient } from "@/lib/supabase";
import type { Database } from "@/types/database";

type ProjectStatus =
  Database["public"]["Tables"]["projects"]["Insert"]["status"];

const PROJECT_STATUSES: ProjectStatus[] = [
  "active",
  "completed",
  "cancelled",
  "pending",
];

export async function saveProject(formData: FormData) {
  const supabase = await createSupabaseServerClient();
  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.getSession();

  if (sessionError || !session) {
    return {
      success: false,
      message:
        "Oturum doğrulanamadı. Lütfen yeniden giriş yaptıktan sonra tekrar deneyin.",
    };
  }

  const projectIdValue = formData.get("projectId");
  const title = (formData.get("title") as string)?.trim();
  const clientIdValue = formData.get("client_id");
  const priceValue = formData.get("price");
  const deadlineValue = formData.get("deadline");
  const statusValue = formData.get("status");

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
    priceValue && priceValue.toString().length > 0
      ? Number(priceValue)
      : null;
  if (priceValue && Number.isNaN(price)) {
    return { success: false, message: "Geçersiz bütçe değeri." };
  }

  if (!statusValue || !PROJECT_STATUSES.includes(statusValue as ProjectStatus)) {
    return { success: false, message: "Geçersiz proje durumu." };
  }

  const baseData = {
    title,
    client_id,
    price,
    deadline: deadlineValue ? (deadlineValue as string) : null,
    status: statusValue as ProjectStatus,
  };

  const projectId = projectIdValue ? Number(projectIdValue) : null;
  if (projectIdValue && (projectId === null || Number.isNaN(projectId))) {
    return { success: false, message: "Geçersiz proje kimliği." };
  }

  const query = projectId
    ? supabase.from("projects").update(baseData).eq("id", projectId)
    : supabase
        .from("projects")
        .insert({
          ...baseData,
          created_at: new Date().toISOString(),
        });

  const { error } = await query;

  if (error) {
    console.error("Proje İşlemi Hatası:", error);
    return {
      success: false,
      message: error.message || "Proje kaydı/güncellemesi sırasında bir hata oluştu.",
    };
  }

  revalidatePath("/projects");

  return {
    success: true,
    message: projectId ? "Proje başarıyla güncellendi." : "Proje başarıyla kaydedildi.",
  };
}

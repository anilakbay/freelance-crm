"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase";
import type { Database } from "@/types/database";

type ProjectStatus = Database["public"]["Tables"]["projects"]["Insert"]["status"];

interface ActionResponse {
  success: boolean;
  message: string;
}

const PROJECT_STATUSES: ProjectStatus[] = ["active", "completed", "cancelled", "pending"];

async function getAuthenticatedUser() {
  const supabase = await createSupabaseServerClient();
  const { data: { user }, error } = await supabase.auth.getUser();
  return { user, error };
}

export async function saveProject(formData: FormData): Promise<ActionResponse> {
  const supabase = await createSupabaseServerClient();
  const { user, error: authError } = await getAuthenticatedUser();

  if (authError || !user) {
    return { success: false, message: "Oturum doğrulanamadı" };
  }

  const projectIdValue = formData.get("projectId");
  const title = (formData.get("title") as string)?.trim();
  const clientIdValue = formData.get("client_id");
  const priceValue = formData.get("price");
  const deadlineValue = formData.get("deadline");
  const statusValue = formData.get("status");

  if (!title) {
    return { success: false, message: "Proje başlığı zorunludur" };
  }

  if (!clientIdValue) {
    return { success: false, message: "Müşteri seçmelisiniz" };
  }

  const client_id = Number(clientIdValue);
  if (isNaN(client_id)) {
    return { success: false, message: "Geçersiz müşteri" };
  }

  const price = priceValue && priceValue.toString().length > 0 ? Number(priceValue) : null;
  if (priceValue && (isNaN(price!) || price! < 0)) {
    return { success: false, message: "Geçersiz fiyat" };
  }

  if (!statusValue || !PROJECT_STATUSES.includes(statusValue as ProjectStatus)) {
    return { success: false, message: "Geçersiz durum" };
  }

  const status = statusValue as ProjectStatus;

  const baseData = {
    title,
    client_id,
    price,
    deadline: deadlineValue ? (deadlineValue as string) : null,
    status,
    user_id: user.id,
  };

  const projectId = projectIdValue ? Number(projectIdValue) : null;
  if (projectIdValue && (projectId === null || isNaN(projectId))) {
    return { success: false, message: "Geçersiz proje ID" };
  }

  const query = projectId
    ? supabase.from("projects").update(baseData).eq("id", projectId)
    : supabase.from("projects").insert({ ...baseData, created_at: new Date().toISOString() });

  const { error } = await query;
  
  if (error) {
    console.error("Project save error:", error);
    return { success: false, message: `İşlem başarısız: ${error.message}` };
  }

  revalidatePath("/projects");
  return {
    success: true,
    message: projectId ? "Proje güncellendi" : "Proje kaydedildi",
  };
}

export async function deleteProject(formData: FormData): Promise<void> {
  const supabase = await createSupabaseServerClient();
  const { user } = await getAuthenticatedUser();
  if (!user) return;

  const idValue = formData.get("id");
  if (!idValue) return;

  const id = Number(idValue);
  if (isNaN(id)) {
    console.error("Invalid project ID:", idValue);
    return;
  }

  const { error } = await supabase
    .from("projects")
    .delete()
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) {
    console.error("Project delete error:", error);
    return;
  }

  revalidatePath("/projects");
}

export async function getDashboardData() {
  const supabase = await createSupabaseServerClient();
  const { user } = await getAuthenticatedUser();

  if (!user) {
    redirect("/auth");
  }

  const { data: projects, error } = await supabase
    .from("projects")
    .select("id, title, status, price, created_at")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Dashboard data fetch error:", error);
    return { projects: [] };
  }

  return { projects: projects || [] };
}

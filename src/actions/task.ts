"use server";

import { revalidatePath } from "next/cache";
import { createSupabaseServerClient } from "@/lib/supabase";

interface ActionResponse {
  success: boolean;
  message: string;
}

export async function saveTask(formData: FormData): Promise<ActionResponse> {
  const supabase = await createSupabaseServerClient();

  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    return { success: false, message: "Oturum gerekli" };
  }

  const title = (formData.get("title") as string)?.trim();
  const project_id = formData.get("project_id");
  const priority = formData.get("priority") as string;
  const due_date = formData.get("due_date") as string;

  if (!title) {
    return { success: false, message: "Görev başlığı zorunludur" };
  }

  if (!project_id) {
    return { success: false, message: "Proje seçmelisiniz" };
  }

  const projectIdNum = Number(project_id);
  if (isNaN(projectIdNum)) {
    return { success: false, message: "Geçersiz proje" };
  }

  const { error } = await supabase.from("tasks").insert({
    title,
    project_id: projectIdNum,
    priority: priority || "medium",
    due_date: due_date || null,
    status: "pending",
    user_id: session.user.id,
  });

  if (error) {
    console.error("Task insert error:", error);
    return { success: false, message: `Kayıt başarısız: ${error.message}` };
  }

  revalidatePath("/tasks");
  return { success: true, message: "Görev başarıyla eklendi" };
}

export async function toggleTaskStatus(
  id: number,
  currentStatus: string
): Promise<void> {
  const supabase = await createSupabaseServerClient();

  const { data: { session } } = await supabase.auth.getSession();
  if (!session) return;

  const newStatus = currentStatus === "done" ? "pending" : "done";

  const { error } = await supabase
    .from("tasks")
    .update({ status: newStatus })
    .eq("id", id)
    .eq("user_id", session.user.id);

  if (error) {
    console.error("Task status update error:", error);
    return;
  }

  revalidatePath("/tasks");
}

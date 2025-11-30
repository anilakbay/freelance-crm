"use server";

import { revalidatePath } from "next/cache";
import { createSupabaseServerClient } from "@/lib/supabase";
import type { Database } from "@/types/database";

type ClientStatus = Database["public"]["Tables"]["clients"]["Insert"]["status"];

interface ActionResponse {
  success: boolean;
  message: string;
}

export async function saveClient(formData: FormData): Promise<ActionResponse> {
  const supabase = await createSupabaseServerClient();

  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    return { success: false, message: "Oturum gerekli" };
  }

  const name = (formData.get("name") as string)?.trim();
  const email = (formData.get("email") as string)?.trim();
  const phone = (formData.get("phone") as string)?.trim();
  const company = (formData.get("company") as string)?.trim();
  const statusValue = formData.get("status");

  if (!name) {
    return { success: false, message: "Müşteri adı zorunludur" };
  }

  if (!statusValue || !["active", "passive", "pending"].includes(statusValue as string)) {
    return { success: false, message: "Geçersiz durum" };
  }

  const status = statusValue as ClientStatus;

  const { error } = await supabase.from("clients").insert({
    name,
    email: email || null,
    phone: phone || null,
    company: company || null,
    status,
    user_id: session.user.id,
  });

  if (error) {
    console.error("Client insert error:", error);
    return { success: false, message: `Kayıt başarısız: ${error.message}` };
  }

  revalidatePath("/clients");
  return { success: true, message: "Müşteri başarıyla kaydedildi" };
}

export async function deleteClient(formData: FormData): Promise<void> {
  const supabase = await createSupabaseServerClient();
  
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) return;

  const idValue = formData.get("id");
  if (!idValue) return;

  const id = Number(idValue);
  if (isNaN(id)) {
    console.error("Invalid client ID:", idValue);
    return;
  }

  const { error } = await supabase
    .from("clients")
    .delete()
    .eq("id", id)
    .eq("user_id", session.user.id);

  if (error) {
    console.error("Client delete error:", error);
    return;
  }

  revalidatePath("/clients");
}

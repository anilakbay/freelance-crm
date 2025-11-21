"use server";

import { revalidatePath } from "next/cache";
import { createSupabaseServerClient } from "@/lib/supabase";
import type { Database } from "@/types/database";

type ClientStatus = Database["public"]["Tables"]["clients"]["Insert"]["status"];

// Yeni müşteri kaydı
export async function saveClient(formData: FormData) {
  const supabase = await createSupabaseServerClient();
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;
  const statusValue = formData.get("status");

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

  const { error } = await supabase.from("clients").insert({
    name,
    email: email || null,
    phone: phone || null,
    status,
  });

  if (error) {
    return { success: false, message: "Kayıt başarısız: " + error.message };
  }

  revalidatePath("/clients");
  return { success: true, message: "Müşteri başarıyla kaydedildi." };
}

// Müşteri silme işlemi
export async function deleteClient(formData: FormData) {
  const supabase = await createSupabaseServerClient();
  const idValue = formData.get("id");

  if (!idValue) return;

  const id = Number(idValue);
  if (Number.isNaN(id)) {
    console.error("Geçersiz ID değeri:", idValue);
    return;
  }

  const { error } = await supabase.from("clients").delete().eq("id", id);

  if (error) {
    console.error("Silme Hatası:", error);
    return;
  }

  revalidatePath("/clients");
}

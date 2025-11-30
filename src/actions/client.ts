// --------------------------------------------------------
// SERVER ACTION: Müşteri İşlemleri
// DOSYA: src/actions/client.ts
// GÖREV: Supabase veritabanında müşteri ekleme ve silme işlemlerini yapar.
// GÜVENLİK: Her işlemde oturum kontrolü yapar.
// --------------------------------------------------------

"use server";

import { revalidatePath } from "next/cache";
import { createSupabaseServerClient } from "@/lib/supabase";
import type { Database } from "@/types/database";

type ClientStatus = Database["public"]["Tables"]["clients"]["Insert"]["status"];

export async function saveClient(formData: FormData) {
  const supabase = await createSupabaseServerClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return { success: false, message: "İşlem yapmak için giriş yapmalısınız." };
  }

  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;
  const company = formData.get("company") as string;
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
    company: company || null,
    status,
    user_id: session.user.id,
  });

  if (error) {
    console.error("Supabase Kayıt Hatası:", error.message);
    return { success: false, message: "Kayıt başarısız: " + error.message };
  }

  revalidatePath("/clients");

  return { success: true, message: "Müşteri başarıyla kaydedildi." };
}

export async function deleteClient(formData: FormData) {
  const supabase = await createSupabaseServerClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) return;

  const idValue = formData.get("id");
  if (!idValue) return;

  const id = Number(idValue);
  if (Number.isNaN(id)) {
    console.error("Geçersiz ID değeri:", idValue);
    return;
  }

  const { error } = await supabase
    .from("clients")
    .delete()
    .eq("id", id)
    .eq("user_id", session.user.id);

  if (error) {
    console.error("Silme Hatası:", error);
    return;
  }

  revalidatePath("/clients");
}

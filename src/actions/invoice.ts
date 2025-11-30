// --------------------------------------------------------
// SERVER ACTION: Fatura İşlemleri
// DOSYA: src/actions/invoice.ts
// GÖREV: Fatura Ekleme ve Silme işlemlerini güvenli şekilde yönetir.
// --------------------------------------------------------

"use server";

import { revalidatePath } from "next/cache";
import { createSupabaseServerClient } from "@/lib/supabase";

export async function saveInvoice(formData: FormData) {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return {
      success: false,
      message: "Oturum doğrulanamadı. Lütfen yeniden giriş yapın.",
    };
  }

  const client_id = formData.get("client_id");
  const amount = formData.get("amount");
  const invoice_date = formData.get("invoice_date") as string;
  const due_date = formData.get("due_date") as string;
  const status = formData.get("status") as string;
  const description = formData.get("description") as string;

  if (!client_id || !amount || !invoice_date || !due_date) {
    return { success: false, message: "Tüm alanlar zorunludur." };
  }

  const { error } = await supabase.from("invoices").insert({
    client_id: Number(client_id),
    amount: Number(amount),
    invoice_date,
    due_date,
    status,
    description: description || null,
    user_id: user.id,
  });

  if (error) {
    console.error("Fatura Kayıt Hatası:", error);
    return { success: false, message: "Kayıt başarısız: " + error.message };
  }

  revalidatePath("/finance");
  return { success: true, message: "Fatura başarıyla kaydedildi!" };
}

export async function deleteInvoice(formData: FormData) {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return;

  const idValue = formData.get("id");
  if (!idValue) return;

  const id = Number(idValue);

  const { error } = await supabase
    .from("invoices")
    .delete()
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) {
    console.error("Fatura Silme Hatası:", error);
    return;
  }

  revalidatePath("/finance");
}

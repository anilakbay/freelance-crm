// --------------------------------------------------------
// SERVER ACTION: Fatura İşlemleri
// DOSYA: src/actions/invoice.ts
// GÖREV: Fatura Ekleme ve Silme işlemlerini güvenli şekilde yönetir.
// --------------------------------------------------------

"use server";

import { revalidatePath } from "next/cache";
import { createSupabaseServerClient } from "@/lib/supabase";

// --- 1. FATURA KAYDETME ---
export async function saveInvoice(formData: FormData) {
  const supabase = await createSupabaseServerClient();

  // A. Güvenlik Kontrolü
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

  // B. Verileri Al
  const client_id = formData.get("client_id");
  const amount = formData.get("amount");
  const invoice_date = formData.get("invoice_date") as string;
  const due_date = formData.get("due_date") as string;
  const status = formData.get("status") as string;

  // C. Zorunlu Alan Kontrolü
  if (!client_id || !amount || !invoice_date || !due_date) {
    return { success: false, message: "Tüm alanlar zorunludur." };
  }

  // D. Kayıt İşlemi
  const { error } = await supabase.from("invoices").insert({
    client_id: Number(client_id),
    amount: Number(amount),
    invoice_date,
    due_date,
    status,
    user_id: user.id, // Faturayı kesen kişi (Sahiplik)
  });

  if (error) {
    console.error("Fatura Kayıt Hatası:", error);
    return { success: false, message: "Kayıt başarısız: " + error.message };
  }

  // E. Listeyi Yenile
  revalidatePath("/finance");
  return { success: true, message: "Fatura başarıyla kaydedildi!" };
}

// --- 2. FATURA SİLME ---
export async function deleteInvoice(formData: FormData) {
  const supabase = await createSupabaseServerClient();

  // A. Oturum Kontrolü
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return;

  // B. ID'yi Al ve Sayıya Çevir
  const idValue = formData.get("id");
  if (!idValue) return;

  const id = Number(idValue); // String -> Number dönüşümü

  // C. Silme İşlemi
  const { error } = await supabase
    .from("invoices")
    .delete()
    .eq("id", id)
    .eq("user_id", user.id); // Sadece kendi faturasını silebilir

  if (error) {
    console.error("Fatura Silme Hatası:", error);
    return;
  }

  // D. Sayfayı Yenile
  revalidatePath("/finance");
}

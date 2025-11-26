// --------------------------------------------------------
// SERVER ACTION: Fatura İşlemleri
// DOSYA: src/actions/invoice.ts
// GÖREV: Yeni fatura kaydını güvenli bir şekilde veritabanına ekler.
// --------------------------------------------------------

"use server";

import { revalidatePath } from "next/cache";
import { createSupabaseServerClient } from "@/lib/supabase";

export async function saveInvoice(formData: FormData) {
  const supabase = await createSupabaseServerClient();

  // 1. GÜVENLİK KONTROLÜ: getSession yerine getUser kullanıyoruz (Daha güvenli ve doğrulanmış kullanıcı)
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

  // Kullanıcı ID'sini user objesinden alıyoruz
  const user_id = user.id;

  // 2. Verileri Al
  const client_id = formData.get("client_id");
  const amount = formData.get("amount");
  const invoice_date = formData.get("invoice_date") as string;
  const due_date = formData.get("due_date") as string;
  const status = formData.get("status") as string;

  // 3. Zorunlu Alan Kontrolü
  if (!client_id || !amount || !invoice_date || !due_date) {
    return { success: false, message: "Tüm alanlar zorunludur." };
  }

  // 4. Kayıt İşlemi
  const { error: insertError } = await supabase.from("invoices").insert({
    client_id: Number(client_id),
    amount: Number(amount),
    invoice_date,
    due_date,
    status,
    user_id, // Doğrulanmış kullanıcı ID'si
  });

  if (insertError) {
    console.error("Fatura Kayıt Hatası:", insertError);
    return {
      success: false,
      message: "Kayıt başarısız: " + insertError.message,
    };
  }

  revalidatePath("/finance");
  return { success: true, message: "Fatura başarıyla kaydedildi!" };
}

"use server";

import { revalidatePath } from "next/cache";
import { createSupabaseServerClient } from "@/lib/supabase";

interface ActionResponse {
  success: boolean;
  message: string;
}

export async function saveInvoice(formData: FormData): Promise<ActionResponse> {
  const supabase = await createSupabaseServerClient();

  const { data: { user }, error: authError } = await supabase.auth.getUser();

  if (authError || !user) {
    return { success: false, message: "Oturum doğrulanamadı" };
  }

  const client_id = formData.get("client_id");
  const amount = formData.get("amount");
  const invoice_date = formData.get("invoice_date") as string;
  const due_date = formData.get("due_date") as string;
  const status = formData.get("status") as string;
  const description = (formData.get("description") as string)?.trim();

  if (!client_id || !amount || !invoice_date || !due_date) {
    return { success: false, message: "Zorunlu alanları doldurun" };
  }

  const clientIdNum = Number(client_id);
  const amountNum = Number(amount);

  if (isNaN(clientIdNum) || isNaN(amountNum)) {
    return { success: false, message: "Geçersiz değerler" };
  }

  if (amountNum <= 0) {
    return { success: false, message: "Tutar sıfırdan büyük olmalı" };
  }

  const { error } = await supabase.from("invoices").insert({
    client_id: clientIdNum,
    amount: amountNum,
    invoice_date,
    due_date,
    status: status || "pending",
    description: description || null,
    user_id: user.id,
  });

  if (error) {
    console.error("Invoice insert error:", error);
    return { success: false, message: `Kayıt başarısız: ${error.message}` };
  }

  revalidatePath("/finance");
  return { success: true, message: "Fatura başarıyla kaydedildi" };
}

export async function deleteInvoice(formData: FormData): Promise<void> {
  const supabase = await createSupabaseServerClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return;

  const idValue = formData.get("id");
  if (!idValue) return;

  const id = Number(idValue);
  if (isNaN(id)) {
    console.error("Invalid invoice ID:", idValue);
    return;
  }

  const { error } = await supabase
    .from("invoices")
    .delete()
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) {
    console.error("Invoice delete error:", error);
    return;
  }

  revalidatePath("/finance");
}

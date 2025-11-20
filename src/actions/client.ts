// src/actions/client.ts

"use server"; // Bu pragma, bu kodun sadece sunucuda çalışacağını garanti eder.

import { supabase } from "@/lib/supabase";
import { revalidatePath } from "next/cache";

// Müşteri kaydetme asenkron fonksiyonu
export async function saveClient(formData: FormData) {

    // Form verilerini alıyoruz
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const status = formData.get("status") as string;

    // Supabase'e kayıt işlemi
    const { data, error } = await supabase.from("clients").insert({
        name: name,
        email: email || null,
        phone: phone || null,
        status: status,
    });

    if (error) {
        console.error("Supabase'e kayıt hatası:", error);
        return { success: false, message: "Kayıt sırasında bir hata oluştu." };
    }

    // Veri başarıyla güncellendiği için '/clients' sayfasının önbelleğini temizle
    revalidatePath("/clients");

    return { success: true, message: "Müşteri başarıyla kaydedildi." };
}
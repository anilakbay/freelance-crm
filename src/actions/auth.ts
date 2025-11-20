// src/actions/auth.ts
"use server";

import { supabase } from "@/lib/supabase";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// 1. Giriş Yapma Fonksiyonu
export async function login(formData: FormData) {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (error) {
        return { success: false, message: "Giriş başarısız: " + error.message };
    }

    // Başarılıysa yönlendir
    redirect("/clients");
}

// 2. Kayıt Olma Fonksiyonu
export async function signup(formData: FormData) {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const { error } = await supabase.auth.signUp({
        email,
        password,
    });

    if (error) {
        return { success: false, message: "Kayıt başarısız: " + error.message };
    }

    return { success: true, message: "Kayıt başarılı! Lütfen e-postanızı onaylayın." };
}

// 3. ÇIKIŞ YAPMA (LOGOUT)
export async function logout() {
    // Supabase oturumunu kapat
    await supabase.auth.signOut();
    
    // Ana sayfaya veya giriş sayfasına yönlendir
    redirect("/auth");
  }
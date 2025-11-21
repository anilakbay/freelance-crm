// src/actions/auth.ts
"use server";

import { supabase } from "@/lib/supabase";
import { redirect } from "next/navigation";

// 1. GİRİŞ YAPMA (LOGIN)
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

    // Başarılıysa Müşteri Listesine yönlendir
    redirect("/clients");
}

// 2. KAYIT OLMA (SIGNUP)
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

    return { success: true, message: "Kayıt başarılı! Giriş yapabilirsiniz." };
}

// 3. ÇIKIŞ YAPMA (LOGOUT)
export async function logout() {
    // Supabase oturumunu kapat
    await supabase.auth.signOut();

    // Giriş sayfasına geri gönder
    redirect("/auth");
}
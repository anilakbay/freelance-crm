"use server";

import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase";

interface AuthResponse {
  success: boolean;
  message: string;
}

export async function login(formData: FormData): Promise<AuthResponse | never> {
  const supabase = await createSupabaseServerClient();
  
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { success: false, message: "E-posta ve şifre gereklidir" };
  }

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { success: false, message: error.message };
  }

  redirect("/dashboard");
}

export async function signup(formData: FormData): Promise<AuthResponse> {
  const supabase = await createSupabaseServerClient();
  
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { success: false, message: "E-posta ve şifre gereklidir" };
  }

  if (password.length < 6) {
    return { success: false, message: "Şifre en az 6 karakter olmalıdır" };
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    return { success: false, message: error.message };
  }

  if (data.session) {
    redirect("/dashboard");
  }

  return {
    success: true,
    message: "Kayıt başarılı! E-posta doğrulamasını tamamlayın.",
  };
}

export async function logout(): Promise<never> {
  const supabase = await createSupabaseServerClient();
  await supabase.auth.signOut();
  redirect("/auth");
}

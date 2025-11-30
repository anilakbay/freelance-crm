"use server";

import { revalidatePath } from "next/cache";
import { createSupabaseServerClient } from "@/lib/supabase";

interface ActionResponse {
  success: boolean;
  message: string;
}

export async function updateProfile(formData: FormData): Promise<ActionResponse> {
  const supabase = await createSupabaseServerClient();

  const { data: { user }, error: authError } = await supabase.auth.getUser();

  if (authError || !user) {
    return { success: false, message: "Oturum doğrulanamadı" };
  }

  const fullName = (formData.get("name") as string)?.trim();

  if (!fullName) {
    return { success: false, message: "Ad soyad boş bırakılamaz" };
  }

  if (fullName.length < 2) {
    return { success: false, message: "Ad soyad en az 2 karakter olmalı" };
  }

  const { error: updateError } = await supabase.auth.updateUser({
    data: {
      full_name: fullName,
    },
  });

  if (updateError) {
    console.error("Profile update error:", updateError);
    return { success: false, message: `Güncelleme başarısız: ${updateError.message}` };
  }

  revalidatePath("/settings");
  return { success: true, message: "Profil başarıyla güncellendi" };
}

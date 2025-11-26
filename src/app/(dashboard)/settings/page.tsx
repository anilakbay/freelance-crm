// src/app/(dashboard)/settings/page.tsx
import { createSupabaseServerClient } from "@/lib/supabase";
import { redirect } from "next/navigation";
import ProfileForm from "@/components/forms/ProfileForm";

export default async function SettingsPage() {
  const supabase = await createSupabaseServerClient();

  // 1. Kullanıcı Bilgilerini Çekme (Güvenli Yol)
  // Server Component olduğu için getUser() kullanmak zorundayız.
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth");
  }

  // 2. Arayüz
  return (
    <div className="max-w-xl mx-auto py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6 border-b pb-3">
        Ayarlar
      </h1>

      <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Profil Bilgileri
        </h2>
        <ProfileForm
          initialName={
            user.user_metadata?.full_name ||
            user.email?.split("@")[0] ||
            "Kullanıcı"
          }
          initialEmail={user.email || "bilinmiyor@ornek.com"}
        />
      </div>
    </div>
  );
}

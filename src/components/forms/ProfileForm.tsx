// --------------------------------------------------------
// BİLEŞEN: Profil Güncelleme Formu
// DOSYA: src/components/forms/ProfileForm.tsx
// GÖREV: Kullanıcının ad soyadını Supabase Auth servisinde günceller.
// --------------------------------------------------------

"use client";

import { useState, useTransition } from "react";
import { updateProfile } from "@/actions/user";

interface ProfileFormProps {
  initialName: string;
  initialEmail: string;
}

export default function ProfileForm({
  initialName,
  initialEmail,
}: ProfileFormProps) {
  const [isPending, startTransition] = useTransition();
  const [feedback, setFeedback] = useState({ type: "", text: "" });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFeedback({ type: "", text: "" });

    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      const result = await updateProfile(formData);

      if (result.success) {
        setFeedback({ type: "success", text: result.message });
      } else {
        setFeedback({ type: "error", text: result.message });
      }
    });
  };

  // Tekrarlanan stil sınıfı
  const inputClass =
    "w-full p-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 shadow-sm font-medium focus:ring-2 focus:ring-blue-600 focus:border-transparent transition";

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Geri Bildirim */}
        {feedback.text && (
          <div
            className={`p-3 rounded-lg text-sm font-semibold border ${
              feedback.type === "success"
                ? "bg-green-50 text-green-700 border-green-200"
                : "bg-red-50 text-red-700 border-red-200"
            }`}
          >
            {feedback.text}
          </div>
        )}

        {/* Ad Soyad */}
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-bold text-gray-700 mb-1.5"
          >
            Adınız Soyadınız
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            defaultValue={initialName}
            className={inputClass}
          />
        </div>

        {/* E-posta (Disabled) */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-bold text-gray-700 mb-1.5"
          >
            E-posta Adresi (Değiştirilemez)
          </label>
          <input
            type="email"
            id="email"
            name="email"
            disabled
            defaultValue={initialEmail}
            className={`${inputClass} bg-gray-200! text-gray-500 cursor-not-allowed`}
          />
          <p className="text-xs text-gray-400 mt-1">
            E-posta, güvenlik nedeniyle buradan değiştirilemez.
          </p>
        </div>

        {/* Buton */}
        <button
          type="submit"
          disabled={isPending}
          className={`w-full py-3.5 text-white font-bold rounded-lg transition-all shadow-md ${
            isPending
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {isPending ? "Kaydediliyor..." : "Profili Güncelle"}
        </button>
      </form>
    </div>
  );
}

// --------------------------------------------------------
// BİLEŞEN: Kimlik Doğrulama Formu
// DOSYA: src/components/forms/AuthForm.tsx
// --------------------------------------------------------

"use client";

import { useState } from "react";
import { login, signup } from "@/actions/auth";

export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Ortak stil tanımı (DRY Prensibi - İnsan Dokunuşu)
  const inputClass =
    "w-full p-3 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition outline-none";

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setMessage(null); // Önceki mesajı temizle

    const formData = new FormData(event.currentTarget);
    const action = isLogin ? login : signup;

    try {
      const result = await action(formData);

      if (result) {
        setMessage({
          type: result.success ? "success" : "error",
          text: result.message,
        });
        // Sadece işlem başarısızsa loading'i durdur, başarılıysa yönlendirme beklenir
        if (!result.success) setIsLoading(false);
      }
    } catch (error) {
      const msg = error instanceof Error ? error.message : String(error);
      // Next.js redirect hatasını yutma, fırlat
      if (msg.includes("NEXT_REDIRECT")) {
        throw error;
      }
      setMessage({ type: "error", text: "Beklenmedik bir hata oluştu." });
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg border border-gray-100">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {isLogin ? "Tekrar Hoşgeldiniz" : "Hesap Oluşturun"}
        </h2>
        <p className="text-gray-500 text-sm">
          {isLogin
            ? "Hesabınıza giriş yapın"
            : "Hızlıca yeni bir üyelik başlatın"}
        </p>
      </div>

      {/* Mesaj Kutusu */}
      {message && (
        // DÜZELTME: 'break-words' yerine 'break-all' kullanıldı (Uzun hataları kırar)
        <div
          className={`mb-4 p-3 rounded-lg text-sm font-medium break-all ${
            message.type === "success"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {message.text}
        </div>
      )}

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            E-posta
          </label>
          <input
            type="email"
            name="email"
            placeholder="ornek@sirket.com"
            className={inputClass}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Şifre
          </label>
          <input
            type="password"
            name="password"
            placeholder="••••••••"
            className={inputClass}
            required
            minLength={6}
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-3 text-white font-bold rounded-lg transition duration-200 shadow-md ${
            isLoading
              ? "bg-blue-400 cursor-wait"
              : "bg-blue-600 hover:bg-blue-700 hover:-translate-y-0.5"
          }`}
        >
          {isLoading
            ? isLogin
              ? "Giriş Yapılıyor..."
              : "Kaydediliyor..."
            : isLogin
            ? "Giriş Yap"
            : "Kayıt Ol"}
        </button>
      </form>

      <div className="mt-6 text-center text-sm text-gray-600">
        {isLogin ? "Hesabınız yok mu? " : "Zaten hesabınız var mı? "}
        <button
          type="button"
          onClick={() => {
            setIsLogin(!isLogin);
            setMessage(null);
          }}
          className="text-blue-600 font-bold hover:underline focus:outline-none"
        >
          {isLogin ? "Kayıt Olun" : "Giriş Yapın"}
        </button>
      </div>
    </div>
  );
}

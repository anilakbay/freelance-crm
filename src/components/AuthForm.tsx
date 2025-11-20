// src/components/AuthForm.tsx
"use client";

import { useState } from 'react';
import { login, signup } from '@/actions/auth'; // Backend motorunu çağırdık

export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(true); // Giriş mi? Kayıt mı? Modu
  const [message, setMessage] = useState({ type: '', text: '' }); // Hata/Başarı mesajı
  const [isLoading, setIsLoading] = useState(false); // Yükleniyor durumu

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setMessage({ type: '', text: '' });

    const formData = new FormData(event.currentTarget);

    // Hangi moddaysak (Giriş/Kayıt) o fonksiyonu seç
    const action = isLogin ? login : signup;
    
    try {
      // Server Action'ı çalıştır (Backend'e git-gel)
      const result = await action(formData);
      
      // Sonucu ekrana bas
      if (result) {
        setMessage({ 
          type: result.success ? 'success' : 'error', 
          text: result.message 
        });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Bir hata oluştu.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg border border-gray-100">
      
      {/* Başlık ve Mod Bilgisi */}
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {isLogin ? 'Tekrar Hoşgeldiniz' : 'Hesap Oluşturun'}
        </h2>
        <p className="text-gray-500 text-sm">
          {isLogin ? 'Hesabınıza giriş yapın' : 'Yeni bir üyelik başlatın'}
        </p>
      </div>

      {/* Hata/Başarı Mesaj Kutusu */}
      {message.text && (
        <div className={`mb-4 p-3 rounded-lg text-sm ${
          message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {message.text}
        </div>
      )}

      {/* FORM */}
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">E-posta</label>
          <input 
            type="email" 
            name="email"
            placeholder="ornek@sirket.com" 
            className="w-full p-3 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            required 
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Şifre</label>
          <input 
            type="password" 
            name="password"
            placeholder="••••••••" 
            className="w-full p-3 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            required 
            minLength={6}
          />
        </div>

        <button 
          type="submit" 
          disabled={isLoading}
          className={`w-full py-3 text-white font-semibold rounded-lg transition duration-200 ${
            isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {isLoading ? 'İşleniyor...' : (isLogin ? 'Giriş Yap' : 'Kayıt Ol')}
        </button>
      </form>

      {/* Alt Link (Geçiş) */}
      <div className="mt-6 text-center text-sm text-gray-600">
        {isLogin ? "Hesabınız yok mu? " : "Zaten hesabınız var mı? "}
        <button 
          type="button"
          onClick={() => { setIsLogin(!isLogin); setMessage({ type: '', text: '' }); }} 
          className="text-blue-600 font-semibold hover:underline"
        >
          {isLogin ? 'Kayıt Olun' : 'Giriş Yapın'}
        </button>
      </div>

    </div>
  );
}
import Link from "next/link";
import Features from "@/components/Features";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-6">
      
      {/* 1. UYGULAMANIN ANA BAŞLIĞI VE HAREKETE GEÇİREN BUTONLAR (HERO) */}
      <div className="text-center max-w-2xl">
        <h1 className="mb-6 text-5xl font-extrabold text-gray-900 tracking-tight">
          Freelance <span className="text-blue-600">CRM</span>
        </h1>
        
        <p className="mb-10 text-xl text-gray-600 leading-relaxed">
          Müşterilerini, projelerini ve ödemelerini tek bir yerden yönet. 
          Excel tablolarından kurtul, işine odaklan.
        </p>
        
        {/* Kullanıcıyı Harekete Geçiren Butonlar (Giriş ve GitHub) */}
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          
          {/* Hemen Başla Butonu - /clients rotasına yönlendirildi */}
          <Link 
            href="/clients" 
            className="px-8 py-4 bg-blue-600 text-white rounded-xl font-semibold shadow-lg hover:bg-blue-700 hover:shadow-xl transition-all transform hover:-translate-y-1"
          >
            Hemen Başla
          </Link>
          
          {/* GitHub Reposu Linki */}
          <Link 
            href="https://github.com/anilakbay/freelance-crm" 
            target="_blank"
            className="px-8 py-4 bg-white text-gray-800 border border-gray-200 rounded-xl font-semibold shadow-sm hover:bg-gray-50 hover:border-gray-300 transition-all"
          >
            GitHub Reposu
          </Link>
        </div>
      </div>

      {/* 2. İKİNCİ DEĞER TEKLİFİ METNİ (EK AÇIKLAMA BÖLÜMÜ) */}
      <section className="py-12 px-6 max-w-6xl mx-auto text-center">
        <h3 className="text-2xl font-bold text-gray-700 mb-4">
          Kayıtlı kalabalık e-postalardan kurtulun.
        </h3>
        <p className="text-lg text-gray-500">
          Artık her müşteri için ayrı notlar tutmanıza gerek yok. Tüm verileriniz tek, güvenli bir PostgreSQL veritabanında.
        </p>
      </section>

      {/* 3. ÜRÜNÜN TEMEL YETENEKLERİ (FEATURES BÖLÜMÜ) */}
      <Features /> 

      {/* 4. TELİF HAKKI VE ALT YAPI BİLGİSİ (FOOTER) */}
      <div className="mt-20 text-gray-400 text-sm">
        © 2025 Freelance CRM • Next.js 16 & Supabase ile geliştirildi.
      </div>
    </main>
  );
}
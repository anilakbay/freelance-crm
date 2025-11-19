import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-6">
      {/* Hero Alanı (Karşılama) */}
      <div className="text-center max-w-2xl">
        <h1 className="mb-6 text-5xl font-extrabold text-gray-900 tracking-tight">
          Freelance <span className="text-blue-600">CRM</span>
        </h1>
        
        <p className="mb-10 text-xl text-gray-600 leading-relaxed">
          Müşterilerini, projelerini ve ödemelerini tek bir yerden yönet. 
          Excel tablolarından kurtul, işine odaklan.
        </p>
        
        {/* Butonlar */}
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button className="px-8 py-4 bg-blue-600 text-white rounded-xl font-semibold shadow-lg hover:bg-blue-700 hover:shadow-xl transition-all transform hover:-translate-y-1">
            Hemen Başla
          </button>
          
          <Link 
            href="https://github.com/anilakbay/freelance-crm" 
            target="_blank"
            className="px-8 py-4 bg-white text-gray-800 border border-gray-200 rounded-xl font-semibold shadow-sm hover:bg-gray-50 hover:border-gray-300 transition-all"
          >
            GitHub Reposu
          </Link>
        </div>
      </div>

      {/* Alt Bilgi */}
      <div className="mt-20 text-gray-400 text-sm">
        © 2025 Freelance CRM • Next.js 16 & Supabase ile geliştirildi.
      </div>
    </main>
  );
}
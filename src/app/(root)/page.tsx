import Link from "next/link";
import Features from "@/components/Features";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center bg-white overflow-hidden">
      {/* --- HERO SECTION --- */}
      {/* DÜZELTME: 'bg-gradient-to-b' -> 'bg-linear-to-b' (v4 Standardı) */}
      <div className="w-full bg-linear-to-b from-slate-50 to-white pt-24 pb-12 px-6 text-center lg:pt-32">
        <div className="max-w-5xl mx-auto">
          {/* Ana Başlık */}
          <h1 className="mb-6 text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Freelance İşlerinizi <br className="hidden md:block" />
            {/* DÜZELTME: 'bg-gradient-to-r' -> 'bg-linear-to-r' (v4 Standardı) */}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-indigo-600">
              Profesyonelce Yönetin
            </span>
          </h1>

          {/* Alt Açıklama */}
          <p className="mb-10 text-lg md:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Müşterilerinizi, projelerinizi ve ödemelerinizi tek bir yerden takip
            edin. Karmaşık Excel tablolarından kurtulun, işinize odaklanın.
          </p>

          {/* Aksiyon Butonları */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
            <Link
              href="/auth"
              className="px-8 py-4 bg-blue-600 text-white text-base font-bold rounded-full shadow-xl hover:shadow-2xl hover:bg-blue-700 transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2"
            >
              Hemen Ücretsiz Başla
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </Link>

            <Link
              href="https://github.com/anilakbay/freelance-crm"
              target="_blank"
              className="px-8 py-4 bg-white text-slate-700 border border-slate-200 text-base font-bold rounded-full shadow-sm hover:shadow-md hover:border-slate-300 hover:text-slate-900 transition-all"
            >
              GitHub'da İncele
            </Link>
          </div>

          {/* --- DASHBOARD ÖNİZLEME --- */}
          <div className="relative mx-auto max-w-5xl rounded-xl bg-slate-900/5 p-2 ring-1 ring-inset ring-slate-900/10 lg:rounded-2xl lg:p-4">
            <div className="rounded-md bg-white shadow-2xl ring-1 ring-slate-900/10 overflow-hidden">
              <Image
                src="/img/anasayfa.png"
                alt="Freelance CRM Yönetim Paneli"
                width={1200}
                height={675}
                priority
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>

      {/* --- ARA METİN --- */}
      <section className="w-full bg-slate-50 border-y border-slate-200 py-20 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <h3 className="text-2xl md:text-3xl font-bold text-slate-800 mb-4">
            Kaos yerine düzeni seçin.
          </h3>
          <p className="text-lg text-slate-600 leading-relaxed">
            Artık her müşteri için ayrı not defterleri veya e-postalar arasında
            kaybolmanıza gerek yok. Tüm verileriniz{" "}
            <span className="font-semibold text-blue-600">
              tek, güvenli ve hızlı
            </span>{" "}
            bir veritabanında.
          </p>
        </div>
      </section>

      {/* --- ÖZELLİKLER BÖLÜMÜ --- */}
      <Features />
    </main>
  );
}

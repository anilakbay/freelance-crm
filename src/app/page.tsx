import Link from "next/link";
import Features from "@/components/Features";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center bg-white">
      <div className="w-full bg-gradient-to-b from-blue-50 via-white to-white border-b border-blue-100 pt-24 pb-20 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="mb-6 text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Freelance İşlerinizi <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
              Profesyonelce Yönetin
            </span>
          </h1>

          <p className="mb-10 text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Müşterilerinizi, projelerinizi ve ödemelerinizi tek bir yerden takip
            edin. Karmaşık Excel tablolarından kurtulun, işinize odaklanın.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/auth"
              className="px-8 py-3.5 bg-blue-600 text-white text-base font-bold rounded-xl shadow-lg hover:shadow-blue-500/30 hover:bg-blue-700 transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2"
            >
              Hemen Ücretsiz Başla
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
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
              className="px-8 py-3.5 bg-white text-slate-700 border border-slate-200 text-base font-bold rounded-xl shadow-sm hover:shadow-md hover:border-slate-300 hover:text-slate-900 transition-all"
            >
              GitHub&#39;da İncele
            </Link>
          </div>

          <p className="mt-8 text-xs text-slate-400 font-medium uppercase tracking-wider">
            Açık Kaynak • Güvenli • Modern Altyapı
          </p>
        </div>
      </div>

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

      <Features />
      <Footer />
    </main>
  );
}

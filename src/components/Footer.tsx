// --------------------------------------------------------
// BİLEŞEN: Footer (Alt Bilgi)
// DOSYA: src/components/Footer.tsx
// --------------------------------------------------------

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200 pt-16 pb-8 mt-auto">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* --- ÜST KISIM (GRID YAPISI) --- */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* 1. Kolon: Marka Hikayesi */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4 group w-fit">
              {/* DÜZELTME: Düz renk yerine Gradient (Linear) kullanıldı, daha modern duruyor */}
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-linear-to-br from-blue-600 to-indigo-600 text-white shadow-md group-hover:scale-105 transition-transform">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                  stroke="currentColor"
                  className="h-5 w-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
                  />
                </svg>
              </div>
              <span className="text-xl font-bold tracking-tight text-slate-900">
                Freelance<span className="text-blue-600">CRM</span>
              </span>
            </Link>
            <p className="text-slate-500 text-sm leading-relaxed max-w-sm">
              İşlerinizi yönetmek hiç bu kadar keyifli olmamıştı. Modern
              freelancerlar için tasarlanan yeni nesil yönetim paneli.
            </p>
          </div>

          {/* 2. Kolon: Hızlı Erişim */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900 tracking-wider uppercase mb-4">
              Keşfet
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="#features"
                  className="text-sm text-slate-600 hover:text-blue-600 transition-colors"
                >
                  Özellikler
                </Link>
              </li>
              <li>
                <Link
                  href="/auth"
                  className="text-sm text-slate-600 hover:text-blue-600 transition-colors"
                >
                  Hesap Oluştur
                </Link>
              </li>
              <li>
                <Link
                  href="/auth"
                  className="text-sm text-slate-600 hover:text-blue-600 transition-colors"
                >
                  Giriş Yap
                </Link>
              </li>
            </ul>
          </div>

          {/* 3. Kolon: Kurumsal */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900 tracking-wider uppercase mb-4">
              Yasal
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="#"
                  className="text-sm text-slate-600 hover:text-blue-600 transition-colors"
                >
                  Gizlilik & Güvenlik
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-slate-600 hover:text-blue-600 transition-colors"
                >
                  Kullanım Koşulları
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-slate-600 hover:text-blue-600 transition-colors"
                >
                  Bize Ulaşın
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* --- ALT KISIM (İMZA ALANI) --- */}
        <div className="border-t border-slate-100 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-400 font-medium">
            &copy; {new Date().getFullYear()} Freelance CRM. İstanbul'da
            geliştirildi.
          </p>

          <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
            <span>Powered by</span>
            <span className="text-slate-600 hover:text-slate-900 transition-colors cursor-default">
              Next.js 16
            </span>
            <span className="w-1 h-1 rounded-full bg-slate-300"></span>
            <span className="text-slate-600 hover:text-slate-900 transition-colors cursor-default">
              Supabase
            </span>
            <span className="w-1 h-1 rounded-full bg-slate-300"></span>
            <span className="text-slate-600 hover:text-slate-900 transition-colors cursor-default">
              Tailwind
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

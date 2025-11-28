// --------------------------------------------------------
// BİLEŞEN: Navbar (Üst Menü) - FİNAL
// DOSYA: src/components/Navbar.tsx
// --------------------------------------------------------

"use client";

import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Sayfa içi kaydırma (Smooth Scroll)
  const handleScroll = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    id: string
  ) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <header className="fixed top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* LOGO */}
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2.5"
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
          <Link
            href="/"
            className="text-xl font-bold tracking-tight text-slate-900"
          >
            Freelance<span className="text-blue-600">CRM</span>
          </Link>
        </div>

        {/* MASAÜSTÜ MENÜ */}
        <nav className="hidden md:flex items-center gap-8">
          {/* Özellikler bölümüne kaydır */}
          <Link
            href="#features"
            onClick={(e) => handleScroll(e, "features")}
            className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors"
          >
            Özellikler
          </Link>
          <Link
            href="/auth"
            className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors"
          >
            Giriş Yap
          </Link>
          <Link
            href="/auth"
            className="rounded-full bg-slate-900 px-5 py-2 text-sm font-medium text-white transition hover:bg-slate-800"
          >
            Ücretsiz Dene
          </Link>
        </nav>

        {/* MOBİL MENÜ BUTONU */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden rounded-md p-2 text-slate-600 transition hover:bg-slate-100"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </button>
      </div>

      {/* MOBİL MENÜ AÇILIR ALAN */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white p-4 shadow-lg">
          <nav className="flex flex-col space-y-4">
            <Link
              href="#features"
              onClick={(e) => handleScroll(e, "features")}
              className="text-base font-medium text-slate-600 hover:text-blue-600"
            >
              Özellikler
            </Link>
            <div className="flex flex-col gap-2 pt-4 border-t border-slate-100">
              <Link
                href="/auth"
                className="w-full rounded-lg bg-slate-100 px-4 py-2 text-center text-sm font-medium text-slate-700"
              >
                Giriş Yap
              </Link>
              <Link
                href="/auth"
                className="w-full rounded-lg bg-blue-600 px-4 py-2 text-center text-sm font-medium text-white"
              >
                Kayıt Ol
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

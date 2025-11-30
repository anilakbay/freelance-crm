"use client";

import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 z-50 w-full border-b border-gray-200 bg-white/95 backdrop-blur-sm shadow-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 shadow-md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2.5"
              stroke="currentColor"
              className="h-5 w-5 text-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
              />
            </svg>
          </div>
          <Link href="/" className="text-xl font-bold tracking-tight text-gray-900">
            TaskPilot<span className="text-blue-600">CRM</span>
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/auth"
            className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
          >
            Giriş Yap
          </Link>
          <Link
            href="/auth"
            className="btn btn-primary"
          >
            Ücretsiz Başla
          </Link>
        </nav>

        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden rounded-lg p-2 text-gray-600 hover:bg-gray-100 transition-colors"
        >
          {isMobileMenuOpen ? (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white shadow-lg">
          <nav className="flex flex-col p-4 space-y-3">
            <Link
              href="/auth"
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full rounded-lg px-4 py-3 text-center text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Giriş Yap
            </Link>
            <Link
              href="/auth"
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full btn btn-primary"
            >
              Kayıt Ol
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

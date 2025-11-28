// --------------------------------------------------------
// BİLEŞEN: Genel Buton (UI Component)
// DOSYA: src/components/Button.tsx
// GÖREV: Tüm projede kullanılacak standart, yükleme animasyonlu buton.
// --------------------------------------------------------

"use client";

import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary" | "danger" | "outline";
  disabled?: boolean;
  isLoading?: boolean; // YENİ: Yükleme durumu
  className?: string; // YENİ: Dışarıdan ekstra stil alabilme
}

export default function Button({
  children,
  onClick,
  type = "button",
  variant = "primary",
  disabled = false,
  isLoading = false,
  className = "",
}: ButtonProps) {
  // Temel Stiller (Flexbox ile içeriği ortaladık)
  const baseStyle =
    "flex items-center justify-center px-4 py-2.5 rounded-lg font-semibold transition-all duration-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95";

  // Renk Varyasyonları
  const variantStyles = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
    secondary:
      "bg-slate-800 text-white hover:bg-slate-900 focus:ring-slate-500",
    danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
    outline:
      "bg-white text-slate-700 border border-gray-300 hover:bg-gray-50 focus:ring-gray-200",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      // Dışarıdan gelen className'i en sona ekliyoruz ki ezebilsin
      className={`${baseStyle} ${variantStyles[variant]} ${className}`}
    >
      {isLoading ? (
        // Yükleniyor Animasyonu (Spinner)
        <div className="flex items-center gap-2">
          <svg
            className="animate-spin h-4 w-4 text-current"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          <span>İşleniyor...</span>
        </div>
      ) : (
        children
      )}
    </button>
  );
}

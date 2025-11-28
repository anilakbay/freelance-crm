// --------------------------------------------------------
// BİLEŞEN: Genel Kart Yapısı
// DOSYA: src/components/Card.tsx
// --------------------------------------------------------

import { ReactNode } from "react";
import { cn } from "@/lib/utils"; // Class birleştirme yardımcısı

interface CardProps {
  title: string;
  subtitle?: string;
  footer?: ReactNode;
  children?: ReactNode;
  className?: string;
}

export default function Card({
  title,
  subtitle,
  footer,
  children,
  className,
}: CardProps) {
  return (
    <div
      className={cn(
        // Temel Stiller
        "bg-white rounded-xl shadow-sm border border-gray-200 transition-all duration-200 hover:shadow-md",
        // Mobil Uyumlu Padding (Telefonda p-4, PC'de p-6)
        "p-4 sm:p-6",
        className
      )}
    >
      {/* Başlık Alanı */}
      <div className="mb-4">
        <h3 className="text-lg font-bold text-gray-900 tracking-tight">
          {title}
        </h3>
        {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
      </div>

      {/* İçerik Alanı */}
      {children && <div className="text-gray-700">{children}</div>}

      {/* Alt Bilgi (Varsa Çizgi Çekip Göster) */}
      {footer && (
        <div className="mt-5 pt-4 border-t border-gray-100 text-sm text-gray-500">
          {footer}
        </div>
      )}
    </div>
  );
}

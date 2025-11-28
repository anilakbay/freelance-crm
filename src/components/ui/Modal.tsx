// --------------------------------------------------------
// BİLEŞEN: Genel Modal (Popup)
// DOSYA: src/components/Modal.tsx
// --------------------------------------------------------

"use client";

import { ReactNode, useEffect } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
}

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
}: ModalProps) {
  // ESC tuşu ve Scroll Kilidi
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    if (isOpen) {
      window.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden"; // Arkadaki sayfayı kilitle
    }

    return () => {
      window.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "unset"; // Kilidi aç
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 transition-opacity animate-in fade-in duration-200"
      onClick={onClose}
    >
      {/* MOBİL İÇİN KRİTİK AYARLAR:
         - w-full: Mobilde tam genişlik
         - max-w-lg: PC'de 512px ile sınırla
         - max-h-[90vh]: Ekran boyunu asla geçme
         - flex flex-col: İçerik taşarsa kaydırma yapabilsin diye yapı
      */}
      <div
        className="bg-white rounded-xl shadow-2xl w-full max-w-lg max-h-[90vh] flex flex-col relative animate-in zoom-in-95 duration-200 border border-gray-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Başlık (Sabit Kalır) */}
        <div className="flex justify-between items-center p-5 border-b border-gray-100 shrink-0">
          {title && (
            <h2 className="text-lg font-bold text-gray-900">{title}</h2>
          )}
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-1 rounded-full transition-colors"
            aria-label="Kapat"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* İçerik (Uzunsa Kayar - Scrollable) */}
        <div className="p-6 overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}

"use client";

import { ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
}

export default function Modal({ isOpen, onClose, title, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-xl shadow-xl max-w-lg w-full p-6 relative">
        {/* Başlık ve Kapat Butonu */}
        <div className="flex justify-between items-center mb-4">
          {title && <h2 className="text-xl font-bold text-gray-900">{title}</h2>}
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-700 transition text-lg font-bold"
            aria-label="Kapat"
          >
            &times;
          </button>
        </div>

        {/* Modal İçeriği */}
        <div>{children}</div>
      </div>
    </div>
  );
}

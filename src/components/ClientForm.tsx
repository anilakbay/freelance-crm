"use client";

import { useState, useTransition } from 'react';
import { saveClient } from '@/actions/client';

export default function ClientForm() {
  const [isPending, startTransition] = useTransition();
  const [responseMessage, setResponseMessage] = useState({ type: '', text: '' });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setResponseMessage({ type: '', text: '' });

    const formElement = event.currentTarget;
    const formData = new FormData(formElement);

    startTransition(async () => {
      const result = await saveClient(formData);
      
      if (result.success) {
        setResponseMessage({ type: 'success', text: result.message });
        formElement.reset();
      } else {
        setResponseMessage({ type: 'error', text: result.message });
      }
    });
  };

  const inputClass = "w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder:text-gray-600 focus:ring-2 focus:ring-blue-600 focus:border-transparent transition shadow-sm font-medium";

  return (
    <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg border border-gray-200 max-w-lg mx-auto">
      <form className="space-y-6" onSubmit={handleSubmit} method="post">
        
        <div className="border-b border-gray-200 pb-4 mb-4">
            <h2 className="text-2xl font-bold text-gray-900">
            Yeni Müşteri Kaydı
            </h2>
            <p className="text-sm text-gray-500 mt-1">
                Müşteri bilgilerini eksiksiz doldurunuz.
            </p>
        </div>

        {/* Mesaj Kutusu */}
        {responseMessage.text && (
          <div className={`p-4 rounded-lg text-sm font-semibold border ${
            responseMessage.type === 'success' 
              ? 'bg-green-50 text-green-700 border-green-200' 
              : 'bg-red-50 text-red-700 border-red-200'
          }`}>
            {responseMessage.text}
          </div>
        )}
        
        {/* Müşteri Adı */}
        <div>
          <label htmlFor="name" className="block text-sm font-bold text-gray-700 mb-1.5">
            Müşteri Adı Soyadı
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className={inputClass}
            placeholder="Örn: Mehmet Yılmaz"
          />
        </div>

        {/* E-posta */}
        <div>
          <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-1.5">
            E-posta Adresi
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className={inputClass}
            placeholder="Örn: mehmet@sirket.com"
          />
        </div>

        {/* Telefon ve Durum */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="phone" className="block text-sm font-bold text-gray-700 mb-1.5">
              Telefon Numarası
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              className={inputClass}
              placeholder="0555..."
            />
          </div>
          <div>
            <label htmlFor="status" className="block text-sm font-bold text-gray-700 mb-1.5">
              Durum
            </label>
            <select
              id="status"
              name="status"
              defaultValue="active"
              className={inputClass}
            >
              <option value="active">Aktif</option>
              <option value="pending">Beklemede</option>
              <option value="passive">Pasif</option>
            </select>
          </div>
        </div>

        {/* Kaydet Butonu */}
        <button
          type="submit"
          disabled={isPending}
          className={`w-full py-3.5 text-white font-bold rounded-lg transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 ${
            isPending ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {isPending ? 'Kaydediliyor...' : 'Müşteriyi Kaydet'}
        </button>
      </form>
    </div>
  );
}
// src/components/ProjectForm.tsx
"use client";

import { useState } from 'react';
import { Client } from '@/types/client'; // Müşteri tipini kullandık

interface ProjectFormProps {
  // Page.tsx'ten gelen müşterilerin listesi
  clients: Client[]; 
}

export default function ProjectForm({ clients }: ProjectFormProps) {
  // Logic'ler (kaydetme, yüklenme) 16. committe eklenecek.
  const [isPending, setIsPending] = useState(false); 
  const [responseMessage, setResponseMessage] = useState({ type: '', text: '' });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setResponseMessage({ type: '', text: 'Backend mantığı 16. committe eklenecek...' });
  };

  // Input stillerini tekrar kullanmak için değişkene aldık
  const inputClass = "w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder:text-gray-600 focus:ring-2 focus:ring-blue-600 focus:border-transparent transition shadow-sm font-medium";

  return (
    <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg border border-gray-200 max-w-lg mx-auto">
      
      {/* Mesaj Kutusu */}
      {responseMessage.text && (
        <div className={`mb-4 p-3 rounded-lg text-sm font-semibold border ${
          responseMessage.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {responseMessage.text}
        </div>
      )}

      <form className="space-y-5" onSubmit={handleSubmit} method="post">
        <h2 className="text-2xl font-bold text-gray-900 border-b pb-3 mb-4">
          Yeni Proje Kaydı
        </h2>

        {/* 1. Proje Başlığı */}
        <div>
          <label htmlFor="title" className="block text-sm font-bold text-gray-700 mb-1.5">Proje Başlığı</label>
          <input
            type="text"
            id="title"
            name="title"
            required
            className={inputClass}
            placeholder="Örn: Mobil Uygulama UI/UX"
          />
        </div>

        {/* 2. Müşteri Seçimi (CLIENT ID) */}
        <div>
          <label htmlFor="client_id" className="block text-sm font-bold text-gray-700 mb-1.5">Müşteri Seçin</label>
          <select
            id="client_id"
            name="client_id"
            required
            className={inputClass}
          >
            <option value="">-- Müşteri Seçiniz --</option>
            {/* Müşteri Listesi MAP ile buraya gelecek */}
            {clients.map((client) => (
              <option key={client.id} value={client.id}>
                {client.name}
              </option>
            ))}
          </select>
        </div>

        {/* 3. Fiyat ve Teslim Tarihi */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="price" className="block text-sm font-bold text-gray-700 mb-1.5">Fiyat (₺)</label>
            <input type="number" id="price" name="price" className={inputClass} placeholder="Örn: 25000" />
          </div>
          <div>
            <label htmlFor="deadline" className="block text-sm font-bold text-gray-700 mb-1.5">Teslim Tarihi</label>
            <input type="date" id="deadline" name="deadline" className={inputClass} />
          </div>
        </div>

        {/* 4. Durum (Status) */}
        <div>
          <label htmlFor="status" className="block text-sm font-bold text-gray-700 mb-1.5">Proje Durumu</label>
          <select id="status" name="status" defaultValue="active" className={inputClass}>
            <option value="active">Aktif</option>
            <option value="completed">Tamamlandı</option>
            <option value="cancelled">İptal Edildi</option>
            <option value="pending">Beklemede</option>
          </select>
        </div>

        {/* Buton */}
        <button type="submit" disabled={isPending} className={`w-full py-3.5 text-white font-bold rounded-lg transition-all shadow-md hover:shadow-lg transform ${isPending ? 'bg-gray-400' : 'bg-green-600 hover:bg-green-700'}`}>
          {isPending ? 'İşleniyor...' : 'Projeyi Kaydet'}
        </button>
      </form>
    </div>
  );
}
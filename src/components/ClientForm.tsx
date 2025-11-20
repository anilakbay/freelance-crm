"use client";

import { useState, useTransition } from 'react';
import { saveClient } from '@/actions/client';

export default function ClientForm() {
    const [isPending, startTransition] = useTransition();
    const [responseMessage, setResponseMessage] = useState({ type: '', text: '' });

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setResponseMessage({ type: '', text: '' });

        // SÜPER GÜVENLİ FİX: Form elementini HİÇBİR await'ten ÖNCE yakala.
        const formElement = event.currentTarget;
        const formData = new FormData(formElement);

        startTransition(async () => {
            const result = await saveClient(formData);

            if (result.success) {
                setResponseMessage({ type: 'success', text: result.message });
                // Güvenli reset, async'ten önce yakaladığımız element ile yapılır.
                formElement.reset();
            } else {
                setResponseMessage({ type: 'error', text: result.message });
            }
        });
    };

    return (
        <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg border border-gray-100 max-w-lg mx-auto">
            {/* Formun ID'si artık gereksiz, onSubmit mantığına geri döndük */}
            <form className="space-y-6" onSubmit={handleSubmit} method="post">
                <h2 className="text-2xl font-bold text-gray-800 border-b pb-3 mb-4">
                    Yeni Müşteri Kaydı
                </h2>

                {/* Mesaj Kutusu */}
                {responseMessage.text && (
                    <div className={`p-3 rounded-lg text-sm font-medium ${responseMessage.type === 'success'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                        }`}>
                        {responseMessage.text}
                    </div>
                )}

                {/* Müşteri Adı */}
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Müşteri Adı Soyadı
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition"
                        placeholder="Örn: Mehmet Yılmaz"
                    />
                </div>

                {/* E-posta */}
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        E-posta Adresi
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition"
                        placeholder="Örn: mehmet@sirket.com"
                    />
                </div>

                {/* Telefon ve Durum */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                            Telefon Numarası
                        </label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition"
                        />
                    </div>
                    <div>
                        <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                            Durum
                        </label>
                        <select
                            id="status"
                            name="status"
                            defaultValue="active"
                            className="w-full p-3 border border-gray-300 rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500 transition"
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
                    className={`w-full py-3 text-white font-semibold rounded-lg transition duration-150 ${isPending ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'
                        }`}
                >
                    {isPending ? 'Kaydediliyor...' : 'Müşteriyi Kaydet'}
                </button>
            </form>
        </div>
    );
}
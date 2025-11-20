// src/components/ClientForm.tsx
// Bu bileşen sadece formun HTML/Tailwind tasarımını içerir.

export default function ClientForm() {
    return (
        <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg border border-gray-100 max-w-lg mx-auto">
            <form className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-800 border-b pb-3 mb-4">
                    Yeni Müşteri Kaydı
                </h2>

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
                    className="w-full py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition duration-150"
                >
                    Müşteriyi Kaydet
                </button>
            </form>
        </div>
    );
}